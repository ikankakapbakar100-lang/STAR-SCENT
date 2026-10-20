import { OccasionInfo } from '../types';

export const OCCASIONS_DATA: OccasionInfo[] = [
  {
    id: 'special_occasion',
    title: 'Special Occasion',
    symbol: '👑',
    tagline: 'Gala, Pernikahan, Acara Resmi & Momentum Bersejarah',
    idealConcentration: 'Extrait de Parfum (25-35%)',
    sillageRating: 5,
    longevityRating: 5,
    temperatureAffinity: 'Any',
    perfumerRule:
      'Gunakan konsentrasi tinggi dengan piramida dasar berat (Oud, Amber, Saffron, Frankincense). Formula ini menciptakan aura megah tak terlupakan (sillage d\'or) dengan jejak aroma hingga lebih dari 12 jam.',
    keyNotes: ['Royal Cambodian Oud', 'Solar Golden Ambergris', 'Damask Rose Absolute', 'Golden Frankincense'],
    accentColor: '#fbbf24', // Celestial Gold
  },
  {
    id: 'outdoor_sport',
    title: 'Outdoor Sport',
    symbol: '🏃',
    tagline: 'Lari Terbuka, Golf, Panjat Tebing & Aktivitas Panas Angin',
    idealConcentration: 'Eau de Toilette Sport (12-15%)',
    sillageRating: 4,
    longevityRating: 3,
    temperatureAffinity: 'Hot',
    perfumerRule:
      'Wajib menggunakan molekul ozonic aquatic dan citrus yang tahan angin terbuka. Hindari vanila pekat atau musk berat yang bisa menjadi memuakkan saat terpapar keringat dan terik matahari.',
    keyNotes: ['Marine Ozone & Sea Salt', 'Glacial Crisp Mint', 'Blood Orange', 'Haitian Roots Vetiver'],
    accentColor: '#38bdf8', // Azure Blue
  },
  {
    id: 'indoor_sport',
    title: 'Indoor Sport',
    symbol: '🧘',
    tagline: 'Gym, Pilates, Yoga Studio & Ruang Latihan Ber-AC',
    idealConcentration: 'Eau Fraîche / Light EDT (6-10%)',
    sillageRating: 1,
    longevityRating: 2,
    temperatureAffinity: 'Cool',
    perfumerRule:
      'Hukum etika perfumery: Intimate Skin Scent. Jangan pernah memakai wewangian yang menyengat di ruang tertutup. Gunakan White Musk, White Tea murni, dan Bambu untuk menyegarkan tanpa mengganggu pernapasan orang lain.',
    keyNotes: ['Celestial White Musk', 'Fujian White Tea', 'Bergamot Calabria', 'Grasse French Lavender'],
    accentColor: '#818cf8', // Soft Indigo Blue
  },
  {
    id: 'day',
    title: 'Day / Everyday',
    symbol: '☀️',
    tagline: 'Kantor, Pertemuan Bisnis, Kuliah & Keseharian Cerah',
    idealConcentration: 'Eau de Parfum Fresh (15-18%)',
    sillageRating: 3,
    longevityRating: 4,
    temperatureAffinity: 'Warm',
    perfumerRule:
      'Keseimbangan dinamis antara keceriaan nada atas (Citrus, Pink Pepper) dan ketenangan nada kayu lembut. Memberikan impresi bersih, profesional, approachable, dan membangkitkan fokus kerja.',
    keyNotes: ['Bergamot Calabria', 'Pink Pepper Berry', 'Mediterranean Fig Leaf', 'Atlas Mountain Cedar'],
    accentColor: '#eab308', // Amber Gold
  },
  {
    id: 'evening',
    title: 'Evening / Sunset',
    symbol: '🌆',
    tagline: 'Golden Hour, Fine Dining, Casual Date & Sunset Lounge',
    idealConcentration: 'Eau de Parfum (18-22%)',
    sillageRating: 4,
    longevityRating: 4,
    temperatureAffinity: 'Breeze',
    perfumerRule:
      'Transisi dramatis saat matahari terbenam. Memadukan kehangatan rempah bangsawan (Cardamom, Iris) dengan dasar vanila dan tonka yang memikat dari jarak dekat saat bersosialisasi.',
    keyNotes: ['Green Cardamom Pod', 'Florentine Iris Orris', 'Amazonian Tonka Bean', 'Ceylon Cinnamon Bark'],
    accentColor: '#a855f7', // Violet Purple
  },
  {
    id: 'night',
    title: 'Night / Intimate',
    symbol: '🌙',
    tagline: 'Midnight Rendezvous, Pesta Eksklusif & Momen Intim',
    idealConcentration: 'Extrait / Concentrated EDP (22-30%)',
    sillageRating: 5,
    longevityRating: 5,
    temperatureAffinity: 'Cool',
    perfumerRule:
      'Afrodisiak alami semesta. Piramida berporos pada nada dasar yang gelap, manis berasap, dan memabukkan (Bourbon Vanilla, Dark Patchouli, Oud). Menempel erat di kain dan kulit sepanjang malam.',
    keyNotes: ['Madagascar Bourbon Vanilla', 'Aged Sumatra Patchouli', 'Nocturnal Jasmine', 'Royal Cambodian Oud'],
    accentColor: '#6366f1', // Midnight Blue-Violet
  },
];
