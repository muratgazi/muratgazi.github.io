// ÖRNEK içerik. Gerçek haberler onay sisteminden gelecek.
export type Haber = {
  baslik: string;
  ozet: string;
  kategori: string;
};

export const manset: Haber = {
  baslik: 'Örnek manşet: Türkiye uluslararası basında nasıl yer aldı?',
  ozet: 'Bu alan günün en önemli haberi için ayrıldı. Onayladığın haber burada büyük başlıkla görünecek.',
  kategori: 'Dünya Basını',
};

export const yanHaberler: Haber[] = [
  { baslik: 'Örnek haber başlığı bir', ozet: '', kategori: 'Ekonomi' },
  { baslik: 'Örnek haber başlığı iki', ozet: '', kategori: 'Diplomasi' },
  { baslik: 'Örnek haber başlığı üç', ozet: '', kategori: 'Spor' },
  { baslik: 'Örnek haber başlığı dört', ozet: '', kategori: 'Teknoloji' },
];

export const sonDakika: string[] = [
  'Örnek son dakika başlığı bir',
  'Örnek son dakika başlığı iki',
  'Örnek son dakika başlığı üç',
];

export const kategoriler = ['Dünya Basını', 'Ekonomi', 'Diplomasi', 'Spor', 'Teknoloji', 'Analiz'];

export const bolumler: { ad: string; haberler: Haber[] }[] = [
  {
    ad: 'Ekonomi',
    haberler: [
      { baslik: 'Örnek ekonomi haberi bir', ozet: 'Kısa özet buraya gelir.', kategori: 'Ekonomi' },
      { baslik: 'Örnek ekonomi haberi iki', ozet: 'Kısa özet buraya gelir.', kategori: 'Ekonomi' },
      { baslik: 'Örnek ekonomi haberi üç', ozet: 'Kısa özet buraya gelir.', kategori: 'Ekonomi' },
    ],
  },
  {
    ad: 'Spor',
    haberler: [
      { baslik: 'Örnek spor haberi bir', ozet: 'Kısa özet buraya gelir.', kategori: 'Spor' },
      { baslik: 'Örnek spor haberi iki', ozet: 'Kısa özet buraya gelir.', kategori: 'Spor' },
      { baslik: 'Örnek spor haberi üç', ozet: 'Kısa özet buraya gelir.', kategori: 'Spor' },
    ],
  },
];

export const yazarlar = [
  { ad: 'Köşe yazarı 1', konu: 'Örnek analiz başlığı' },
  { ad: 'Köşe yazarı 2', konu: 'Örnek analiz başlığı' },
  { ad: 'Köşe yazarı 3', konu: 'Örnek analiz başlığı' },
  { ad: 'Köşe yazarı 4', konu: 'Örnek analiz başlığı' },
];
