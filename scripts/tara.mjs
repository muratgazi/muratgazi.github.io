// HABER SAV günlük tarama: RSS -> Gemini -> taslak (onay bekliyor)
import { writeFileSync, mkdirSync } from 'node:fs';

const KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
if (!KEY) {
  console.error('GEMINI_API_KEY bulunamadı.');
  process.exit(1);
}

const KATEGORILER = ['Dünya Basını', 'Ekonomi', 'Diplomasi', 'Spor', 'Teknoloji', 'Analiz'];
const ANAHTAR = /turkey|türkiye|turkiye|turkish|erdogan|erdoğan|ankara|istanbul|bosphorus|lira/i;

const KAYNAKLAR = [
  { ad: 'Google Haberler', url: 'https://news.google.com/rss/search?q=Turkey+OR+T%C3%BCrkiye+when:1d&hl=en&gl=US&ceid=US:en', hepsi: true },
  { ad: 'Google Haberler', url: 'https://news.google.com/rss/search?q=Turkey+economy+OR+Turkish+lira+when:1d&hl=en&gl=US&ceid=US:en', hepsi: true },
  { ad: 'Hürriyet Daily News', url: 'https://www.hurriyetdailynews.com/rss', hepsi: true },
  { ad: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { ad: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
  { ad: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  { ad: 'DW', url: 'https://rss.dw.com/rdf/rss-en-all' },
  { ad: 'France 24', url: 'https://www.france24.com/en/rss' },
];

const temiz = (s = '') =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

const etiket = (blok, ad) => {
  const m = blok.match(new RegExp(`<${ad}[^>]*>([\\s\\S]*?)</${ad}>`, 'i'));
  return m ? temiz(m[1]) : '';
};

async function oku(kaynak) {
  try {
    const res = await fetch(kaynak.url, { headers: { 'User-Agent': 'HaberSavBot/1.0' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const xml = await res.text();
    const bloklar = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
    return bloklar.slice(0, 40).map((b) => ({
      baslik: etiket(b, 'title'),
      link: etiket(b, 'link') || (b.match(/<link>([^<]+)</i) || [])[1] || '',
      aciklama: etiket(b, 'description').slice(0, 300),
      kaynak: kaynak.ad,
      hepsi: !!kaynak.hepsi,
    }));
  } catch (e) {
    console.warn(`Kaynak okunamadı (${kaynak.ad}): ${e.message}`);
    return [];
  }
}

async function gemini(istem) {
  for (let deneme = 1; deneme <= 4; deneme++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify({
        contents: [{ parts: [{ text: istem }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.4 },
      }),
    });
    if (res.ok) {
      const j = await res.json();
      const metin = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('');
      return JSON.parse(metin.replace(/```json|```/g, '').trim());
    }
    const hata = await res.text();
    if ((res.status === 429 || res.status >= 500) && deneme < 4) {
      console.warn(`Gemini ${res.status}, tekrar deneniyor...`);
      await new Promise((r) => setTimeout(r, 15000 * deneme));
      continue;
    }
    throw new Error(`Gemini hatası ${res.status}: ${hata.slice(0, 300)}`);
  }
}

const tum = (await Promise.all(KAYNAKLAR.map(oku))).flat();
const goruldu = new Set();
const adaylar = tum
  .filter((x) => x.baslik && x.link && (x.hepsi || ANAHTAR.test(x.baslik + ' ' + x.aciklama)))
  .filter((x) => {
    const k = x.baslik.toLowerCase().slice(0, 60);
    if (goruldu.has(k)) return false;
    goruldu.add(k);
    return true;
  })
  .slice(0, 40);

console.log(`Toplam ${tum.length} kayıt, ${adaylar.length} aday.`);
if (adaylar.length < 3) {
  console.error('Yeterli aday bulunamadı, çıkılıyor.');
  process.exit(1);
}

const liste = adaylar.map((a, i) => `${i}. [${a.kaynak}] ${a.baslik} | ${a.aciklama}`).join('\n');

const haberIstem = `Sen HABER SAV'ın editörüsün. Site, Türkiye'nin dünya medyasındaki yansımasını izler.
Aşağıdaki başlıklardan Türkiye ile ilgili ve en önemli 10 tanesini seç. Aynı olayı anlatanları teke indir.
Her biri için SADECE aşağıdaki başlık ve açıklamaya dayanarak, kendi cümlelerinle Türkçe yaz.
Kaynağın cümlelerini kopyalama, bilgi uydurma, kesin olmayan şeyi kesinmiş gibi yazma.
JSON dizisi döndür. Her öğe: {"index": sayı, "baslik": "en fazla 90 karakter Türkçe başlık", "ozet": "2-3 cümle özgün Türkçe özet", "kategori": "${KATEGORILER.join(' | ')} içinden biri", "ikon": "tek emoji"}

Aday başlıklar:
${liste}`;

const secilen = await gemini(haberIstem);
const haberler = (Array.isArray(secilen) ? secilen : [])
  .filter((h) => adaylar[h.index])
  .slice(0, 10)
  .map((h) => ({
    baslik: h.baslik,
    ozet: h.ozet,
    kategori: KATEGORILER.includes(h.kategori) ? h.kategori : 'Dünya Basını',
    ikon: h.ikon || '📰',
    kaynak: adaylar[h.index].kaynak,
    kaynak_link: adaylar[h.index].link,
    onay: false,
  }));

const analizIstem = `Sen HABER SAV'ın analiz editörüsün. Aşağıdaki günün haber özetlerine dayanarak Türkiye'nin dünya medyasındaki yansıması hakkında 4 kısa analiz yazısı yaz.
Her yazı özgün, dengeli ve Türkçe olsun; yalnızca verilen bilgilere dayansın, yorumlarını yorum olarak belirt, bilgi uydurma.
JSON dizisi döndür. Her öğe: {"baslik": "...", "ozet": "tek cümle", "metin": "3 paragraf, toplam yaklaşık 200 kelime"}

Günün haberleri:
${haberler.map((h, i) => `${i + 1}. ${h.baslik}: ${h.ozet}`).join('\n')}`;

const analizSonuc = await gemini(analizIstem);
const analizler = (Array.isArray(analizSonuc) ? analizSonuc : []).slice(0, 4).map((a, i) => ({
  baslik: a.baslik,
  ozet: a.ozet,
  metin: a.metin,
  yazar: `Köşe yazarı ${i + 1}`,
  uretim: 'yapay zeka taslağı',
  onay: false,
}));

const tarih = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' });
mkdirSync('taslaklar', { recursive: true });
writeFileSync(
  `taslaklar/${tarih}.json`,
  JSON.stringify({ tarih, model: MODEL, durum: 'onay-bekliyor', haberler, analizler }, null, 2),
  'utf-8'
);
console.log(`Hazır: ${haberler.length} haber, ${analizler.length} analiz -> taslaklar/${tarih}.json`);
