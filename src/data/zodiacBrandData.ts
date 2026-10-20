import { ZodiacSignId } from '../types';

export interface ZodiacBrandRecommendation {
  zodiacId: ZodiacSignId;
  zodiacName: string;
  zodiacSymbol: string;
  elementSymbol: string;
  element: string;
  curatedPerfumes: {
    brand: string;
    perfumeName: string;
    symbol: string;
    character: string;
    astrologicalHarmonyReason: string;
    keyNotes: string[];
  }[];
}

export const ZODIAC_BRAND_RECOMMENDATIONS: ZodiacBrandRecommendation[] = [
  {
    zodiacId: 'aries',
    zodiacName: 'Aries',
    zodiacSymbol: '♈',
    elementSymbol: '🔥',
    element: 'Api',
    curatedPerfumes: [
      {
        brand: 'Dior',
        perfumeName: 'Sauvage Elixir',
        symbol: '🔥',
        character: 'Spicy Hot Lavender & Licorice',
        astrologicalHarmonyReason: 'Aura Mars yang membara, memancarkan keberanian pionir dan energi tanpa kompromi.',
        keyNotes: ['Cinnamon', 'Cardamom', 'Nutmeg', 'Lavender'],
      },
      {
        brand: 'Creed',
        perfumeName: 'Viking',
        symbol: '⚔️',
        character: 'Fiery Peppercorn & Cedar',
        astrologicalHarmonyReason: 'Membangkitkan semangat penakluk petualang api sejati Aries.',
        keyNotes: ['Pink Pepper', 'Calabrian Bergamot', 'Rose', 'Sandalwood'],
      },
    ],
  },
  {
    zodiacId: 'taurus',
    zodiacName: 'Taurus',
    zodiacSymbol: '♉',
    elementSymbol: '🌍',
    element: 'Tanah',
    curatedPerfumes: [
      {
        brand: 'Tom Ford',
        perfumeName: 'Santal Blush',
        symbol: '🪵',
        character: 'Creamy Exotic Sandalwood',
        astrologicalHarmonyReason: 'Venus tanah mendambakan tekstur kayu mewah yang menenangkan indera raga.',
        keyNotes: ['Indian Sandalwood', 'Cinnamon Bark', 'Ylang-Ylang', 'Musk'],
      },
      {
        brand: 'Diptyque',
        perfumeName: 'Eau Rose Eau de Parfum',
        symbol: '🌹',
        character: 'Artisanal Damask Rose & Chamomile',
        astrologicalHarmonyReason: 'Menghormati cinta Taurus terhadap keindahan alam murni dan kenikmatan hidup.',
        keyNotes: ['Damask Rose', 'Centifolia Rose', 'Artichoke', 'Cedar'],
      },
    ],
  },
  {
    zodiacId: 'gemini',
    zodiacName: 'Gemini',
    zodiacSymbol: '♊',
    elementSymbol: '💨',
    element: 'Udara',
    curatedPerfumes: [
      {
        brand: 'Byredo',
        perfumeName: "Bal d'Afrique",
        symbol: '✨',
        character: 'Sparkling Citrus & Vetiver',
        astrologicalHarmonyReason: 'Merkurius yang lincah dan cepat, berubah dinamis mengikuti percakapan cerdas Gemini.',
        keyNotes: ['Marigold', 'Bergamot', 'Bucchu', 'Violet', 'Vetiver'],
      },
      {
        brand: 'Jo Malone',
        perfumeName: 'Lime Basil & Mandarin',
        symbol: '🌿',
        character: 'Zesty Herbaceous Citrus',
        astrologicalHarmonyReason: 'Aroma udara segar yang menstimulasi rasa ingin tahu dan kreativitas tanpa batas.',
        keyNotes: ['Mandarin', 'Basil', 'White Thyme', 'Amberwood'],
      },
    ],
  },
  {
    zodiacId: 'cancer',
    zodiacName: 'Cancer',
    zodiacSymbol: '♋',
    elementSymbol: '💧',
    element: 'Air',
    curatedPerfumes: [
      {
        brand: 'Maison Francis Kurkdjian',
        perfumeName: 'Aqua Celestia',
        symbol: '🌊',
        character: 'Crystal Marine Water & Mimosa',
        astrologicalHarmonyReason: 'Pengaruh Rembulan yang menyejukkan batin emosional dan membawa ketenangan mutlak.',
        keyNotes: ['Lime', 'Cool Mint', 'Blackcurrant Blossom', 'White Musk'],
      },
      {
        brand: 'Kilian',
        perfumeName: 'Moonlight in Heaven',
        symbol: '☽',
        character: 'Milky Coconut & Mango Rice',
        astrologicalHarmonyReason: 'Pelukan hangat malam hari yang intim dan penuh perasaan protektif khas Cancer.',
        keyNotes: ['Mango', 'Coconut Milk', 'Rice Accord', 'Vetiver'],
      },
    ],
  },
  {
    zodiacId: 'leo',
    zodiacName: 'Leo',
    zodiacSymbol: '♌',
    elementSymbol: '🔥',
    element: 'Api',
    curatedPerfumes: [
      {
        brand: 'Tom Ford',
        perfumeName: 'Soleil Blanc',
        symbol: '☀️',
        character: 'Solar Amber & Golden Pistachio',
        astrologicalHarmonyReason: 'Kemilau matahari emas murni, memancarkan aura raja dan pusat perhatian di setiap pesta.',
        keyNotes: ['Pistachio', 'Bergamot', 'Cardamom', 'Tuberose', 'Amber'],
      },
      {
        brand: 'Creed',
        perfumeName: 'Royal Oud',
        symbol: '👑',
        character: 'Imperial Smoky Cedar & Oud',
        astrologicalHarmonyReason: 'Kemegahan istana kerajaan untuk jiwa pemimpin kharismatik Leo.',
        keyNotes: ['Lemon', 'Pink Berry', 'Cedar', 'Galbanum', 'Indian Oud'],
      },
    ],
  },
  {
    zodiacId: 'virgo',
    zodiacName: 'Virgo',
    zodiacSymbol: '♍',
    elementSymbol: '🌍',
    element: 'Tanah',
    curatedPerfumes: [
      {
        brand: 'Le Labo',
        perfumeName: 'Thé Matcha 26',
        symbol: '🍵',
        character: 'Noble Green Matcha & Fig',
        astrologicalHarmonyReason: 'Kesempurnaan dan kemurnian detail, menenangkan pikiran analitis Virgo.',
        keyNotes: ['Matcha Tea Accord', 'Fig', 'Cedarwood', 'Bitter Orange'],
      },
      {
        brand: 'Hermès',
        perfumeName: "Terre d'Hermès",
        symbol: '🌍',
        character: 'Mineral Flint, Orange & Vetiver',
        astrologicalHarmonyReason: 'Struktur tanah yang kokoh dan presisi tinggi dari akar alam.',
        keyNotes: ['Orange', 'Grapefruit', 'Flint', 'Vetiver', 'Benzoin'],
      },
    ],
  },
  {
    zodiacId: 'libra',
    zodiacName: 'Libra',
    zodiacSymbol: '♎',
    elementSymbol: '💨',
    element: 'Udara',
    curatedPerfumes: [
      {
        brand: 'Maison Francis Kurkdjian',
        perfumeName: 'Baccarat Rouge 540',
        symbol: '💎',
        character: 'Radiant Crystal Ambergris',
        astrologicalHarmonyReason: 'Venus estetika tinggi Libra, menghasilkan proporsi keindahan yang tiada tanding.',
        keyNotes: ['Saffron', 'Jasmine', 'Amberwood', 'Ambergris', 'Cedar'],
      },
      {
        brand: 'Parfums de Marly',
        perfumeName: 'Delina',
        symbol: '🌸',
        character: 'Sophisticated Lychee & Turkish Rose',
        astrologicalHarmonyReason: 'Keanggunan diplomatik yang manis, memikat tanpa pernah terasa memaksa.',
        keyNotes: ['Lychee', 'Rhubarb', 'Turkish Rose', 'Vanilla', 'Cashmeran'],
      },
    ],
  },
  {
    zodiacId: 'scorpio',
    zodiacName: 'Scorpio',
    zodiacSymbol: '♏',
    elementSymbol: '💧',
    element: 'Air',
    curatedPerfumes: [
      {
        brand: 'Tom Ford',
        perfumeName: 'Black Orchid',
        symbol: '🖤',
        character: 'Dark Truffle & Sensual Patchouli',
        astrologicalHarmonyReason: 'Misteri Pluto yang intens, magnetis, tak tertebak dan memiliki daya tarik berbahaya.',
        keyNotes: ['Black Truffle', 'Dark Florals', 'Patchouli', 'Incense', 'Vanilla'],
      },
      {
        brand: 'YSL',
        perfumeName: 'Tuxedo',
        symbol: '👔',
        character: 'Smoked Ambergris & Black Pepper',
        astrologicalHarmonyReason: 'Karisma bayangan malam Scorpio yang elegan sekaligus penuh gairah rahasia.',
        keyNotes: ['Black Pepper', 'Cardamom', 'Ambergris', 'Patchouli'],
      },
    ],
  },
  {
    zodiacId: 'sagittarius',
    zodiacName: 'Sagittarius',
    zodiacSymbol: '♐',
    elementSymbol: '🔥',
    element: 'Api',
    curatedPerfumes: [
      {
        brand: 'Byredo',
        perfumeName: 'Gypsy Water',
        symbol: '🌲',
        character: 'Pine Needles, Incense & Vanilla',
        astrologicalHarmonyReason: 'Jiwa pengembara Jupiter yang merindukan hutan liar, api unggun, dan kebebasan mutlak.',
        keyNotes: ['Juniper Berries', 'Lemon', 'Pine Needle', 'Incense', 'Vanilla'],
      },
      {
        brand: 'Creed',
        perfumeName: 'Aventus',
        symbol: '🏹',
        character: 'Bold Pineapple & Birch Smoke',
        astrologicalHarmonyReason: 'Visi masa depan yang optimis dan keberanian menjelajahi benua baru.',
        keyNotes: ['Bergamot', 'Apple', 'Birch Wood', 'Patchouli', 'Oakmoss'],
      },
    ],
  },
  {
    zodiacId: 'capricorn',
    zodiacName: 'Capricorn',
    zodiacSymbol: '♑',
    elementSymbol: '🌍',
    element: 'Tanah',
    curatedPerfumes: [
      {
        brand: 'Tom Ford',
        perfumeName: 'Grey Vetiver',
        symbol: '🏛️',
        character: 'Cold Vetiver & Platinum Citrus',
        astrologicalHarmonyReason: 'Wibawa Saturnus sang arsitek abadi, sangat profesional, bersih, dan berintegritas tinggi.',
        keyNotes: ['Vetiver', 'Orange Flower', 'Grapefruit', 'Pimento', 'Oakmoss'],
      },
      {
        brand: 'Chanel',
        perfumeName: 'Sycomore',
        symbol: '🌲',
        character: 'Smoky Autumn Vetiver & Juniper',
        astrologicalHarmonyReason: 'Keteguhan batu karang yang tahan uji oleh waktu dan zaman.',
        keyNotes: ['Vetiver', 'Cypress', 'Juniper', 'Pink Pepper', 'Sandalwood'],
      },
    ],
  },
  {
    zodiacId: 'aquarius',
    zodiacName: 'Aquarius',
    zodiacSymbol: '♒',
    elementSymbol: '💨',
    element: 'Udara',
    curatedPerfumes: [
      {
        brand: 'Maison Francis Kurkdjian',
        perfumeName: 'Gentle Fluidity Silver',
        symbol: '⚡',
        character: 'Metallic Juniper & Nutmeg Ozone',
        astrologicalHarmonyReason: 'Uranus sang visioner futuristik, dingin, avant-garde, dan mendahului eranya.',
        keyNotes: ['Juniper Berries', 'Nutmeg', 'Coriander', 'Musk', 'Ambery Woods'],
      },
      {
        brand: 'Comme des Garçons',
        perfumeName: '2',
        symbol: '🛸',
        character: 'Japanese Sumi Ink & Aldehydes',
        astrologicalHarmonyReason: 'Keunikan tak konvensional yang merombak aturan baku wewangian klasik.',
        keyNotes: ['Ink Accord', 'Aldehydes', 'Magnolia', 'Cedar', 'Incense'],
      },
    ],
  },
  {
    zodiacId: 'pisces',
    zodiacName: 'Pisces',
    zodiacSymbol: '♓',
    elementSymbol: '💧',
    element: 'Air',
    curatedPerfumes: [
      {
        brand: 'Giorgio Armani',
        perfumeName: 'Acqua Di Giò Profondo',
        symbol: '🌊',
        character: 'Abyssal Marine Salt & Mineral Blue',
        astrologicalHarmonyReason: 'Neptunus samudera tak bertepi, menyatukan jiwa mimpi mistis Pisces ke kedalaman laut.',
        keyNotes: ['Marine Notes', 'Aquozone', 'Green Mandarin', 'Patchouli', 'Musk'],
      },
      {
        brand: 'Maison Margiela',
        perfumeName: 'Replica Sailing Day',
        symbol: '🪷',
        character: 'Aquatic Breeze & Red Seaweed',
        astrologicalHarmonyReason: 'Sentuhan mimpi terapeutik yang melarutkan stres menjadi kedamaian air surgawi.',
        keyNotes: ['Aquatic Accord', 'Aldehydes', 'Juniper', 'Coriander', 'Iris', 'Ambergris'],
      },
    ],
  },
];
