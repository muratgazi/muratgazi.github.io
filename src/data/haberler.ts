// DEMO: 25 Ekim 2026 tarihli gerçek haber başlıklarının kısa, özgün özetleri.
// Görseller gerçek fotoğraf değil, otomatik üretilmiş grafiklerdir.
export type Haber = {
  baslik: string;
  ozet: string;
  kategori: string;
  kaynak: string;
  ikon: string;
  renk: [string, string];
};

export const manset: Haber = {
  baslik: 'Avrupa sokakta: Paris, Roma, Madrid ve Milano’da yüz binlerce kişi yürüdü',
  ozet:
    'Yaşam pahalılığı ve emeklilik protestoları Cumartesi günü birçok Avrupa şehrine yayıldı. Fransa’da polisle çatışmalar yaşandı ve yaklaşık bin gözaltı bildirildi; Milano’da askerler devriye gezdi.',
  kategori: 'Dünya Basını',
  kaynak: 'Euronews, NPR',
  ikon: '✊',
  renk: ['#0f3d0a', '#0b0b0b'],
};

export const yanHaberler: Haber[] = [
  { baslik: 'Brezilya’da ikinci tur: Lula, aşırı sağcı rakibine karşı sandıkta', ozet: '', kategori: 'Dünya Basını', kaynak: 'The Guardian', ikon: '🗳️', renk: ['#0a3d1f', '#111'] },
  { baslik: 'İsrail bu hafta genel seçime gidiyor, Batı Şeria geçişleri seçim günü kapanacak', ozet: '', kategori: 'Diplomasi', kaynak: 'NPR, Euronews', ikon: '🕊️', renk: ['#0a2a3d', '#111'] },
  { baslik: 'Musk, Ukrayna’yı Starlink şartlarını ihlalle suçladı; Kiev itiraz etti', ozet: '', kategori: 'Teknoloji', kaynak: 'Associated Press', ikon: '🛰️', renk: ['#2a0a3d', '#111'] },
  { baslik: 'Yunanistan’da basketbol federasyonu başkanı şike soruşturması sürerken istifa etti', ozet: '', kategori: 'Spor', kaynak: 'Euronews', ikon: '🏀', renk: ['#3d2a0a', '#111'] },
];

export const sonDakika: string[] = [
  'Florida’da silahlı saldırıda 12 kişi yaralandı',
  'Bulgaristan’da cumhurbaşkanlığı seçiminin ilk turu başladı',
  'Papa Leo, ameliyatından iki hafta sonra Yemen’de şiddetin bitmesini istedi',
  'Fransa’da protestolar sonrası yüzlerce gözaltı',
];

export const kategoriler = ['Dünya Basını', 'Ekonomi', 'Diplomasi', 'Spor', 'Teknoloji', 'Analiz'];

export const bolumler: { ad: string; haberler: Haber[] }[] = [
  {
    ad: 'Dünya',
    haberler: [
      { baslik: 'Bulgaristan cumhurbaşkanını seçiyor', ozet: 'Ülke bugün cumhurbaşkanlığı seçiminin ilk turu için sandık başına gitti.', kategori: 'Dünya Basını', kaynak: 'Euronews', ikon: '🏛️', renk: ['#3d0a14', '#111'] },
      { baslik: 'British Columbia’da Muhafazakârlar yaklaşık bir asır sonra kazandı', ozet: 'Kanada’nın eyaletinde Muhafazakâr Parti, çok uzun bir aradan sonra ilk kez seçim zaferi elde etti.', kategori: 'Dünya Basını', kaynak: 'Reuters', ikon: '🍁', renk: ['#3d0a0a', '#111'] },
      { baslik: 'Papa Leo’dan Yemen çağrısı', ozet: 'Papa, cerrahi müdahalenin ardından yaptığı ilk büyük konuşmada çatışmaların son bulması gerektiğini söyledi.', kategori: 'Diplomasi', kaynak: 'Reuters', ikon: '🕊️', renk: ['#0a2a3d', '#111'] },
    ],
  },
  {
    ad: 'Ekonomi ve Teknoloji',
    haberler: [
      { baslik: 'Merkez bankaları altında ayrıştı', ozet: 'Rusya altın satarken Çin alımlarını sürdürüyor; iki büyük ekonomi rezerv stratejisinde zıt yönde ilerliyor.', kategori: 'Ekonomi', kaynak: 'Euronews', ikon: '🪙', renk: ['#3d330a', '#111'] },
      { baslik: 'Yapay zekâda blok rekabeti: ülkeler taraf seçmeye zorlanıyor', ozet: 'ABD öncülüğündeki Pax Silica ile Çin’in kurduğu WAICO, ülkeleri iki kampa ayırıyor.', kategori: 'Teknoloji', kaynak: 'Associated Press', ikon: '🤖', renk: ['#2a0a3d', '#111'] },
    ],
  },
];

export const yazarlar = [
  { ad: 'Köşe yazarı 1', konu: 'Avrupa’da sokaklar neden kaynıyor?' },
  { ad: 'Köşe yazarı 2', konu: 'Altın üzerinden yeni dünya düzeni' },
  { ad: 'Köşe yazarı 3', konu: 'Seçim haftası: Brezilya, Bulgaristan, İsrail' },
  { ad: 'Köşe yazarı 4', konu: 'Yapay zekâda iki kutuplu dünya' },
];
