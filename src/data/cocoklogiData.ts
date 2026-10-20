export interface FamousPerfumeMatch {
  id: string;
  name: string;
  house: string;
  symbol: string;
  family: string;
  iconicNotes: string[];
  keyNoteIds: string[];
  vibe: string;
  idealOccasion: string;
  priceTier: 'Designer' | 'Niche Luxury' | 'Haute Parfumerie';
}

export const FAMOUS_BRAND_PERFUMES: FamousPerfumeMatch[] = [
  {
    id: 'dior-sauvage',
    name: 'Sauvage',
    house: 'Dior',
    symbol: '👑',
    family: 'Aromatic Fougère / Fresh Spicy',
    iconicNotes: ['Calabrian Bergamot', 'Pink Pepper', 'Atlas Cedar', 'Vetiver', 'Ambroxan'],
    keyNoteIds: ['bergamot', 'pink_pepper', 'atlas_cedar', 'haiti_vetiver'],
    vibe: 'Magnetis maskulin segar, liar, percaya diri tinggi dan tahan banting sepanjang hari.',
    idealOccasion: 'Day / Everyday & Outdoor',
    priceTier: 'Designer',
  },
  {
    id: 'bleu-de-chanel',
    name: 'Bleu de Chanel',
    house: 'Chanel',
    symbol: '🌊',
    family: 'Woody Aromatic / Citrus',
    iconicNotes: ['Grapefruit', 'Pink Pepper', 'Mint', 'Cedar', 'Sandalwood', 'Frankincense'],
    keyNoteIds: ['bergamot', 'pink_pepper', 'crisp_mint', 'atlas_cedar', 'mysore_sandalwood', 'frankincense'],
    vibe: 'Karisma biru abadi, bersih berkelas, sangat versatile untuk rapat maupun malam hari.',
    idealOccasion: 'Special Occasion & Evening',
    priceTier: 'Designer',
  },
  {
    id: 'baccarat-rouge-540',
    name: 'Baccarat Rouge 540',
    house: 'Maison Francis Kurkdjian',
    symbol: '💎',
    family: 'Amber Floral / Radiant Crystal',
    iconicNotes: ['Saffron', 'Jasmine Sambac', 'Ambergris', 'Cedarwood'],
    keyNoteIds: ['jasmine_sambac', 'golden_amber', 'atlas_cedar', 'frankincense'],
    vibe: 'Kemewahan kristal surgawi yang manis mineral, sillage emas yang mengisi seisi ruangan.',
    idealOccasion: 'Special Occasion & Night',
    priceTier: 'Haute Parfumerie',
  },
  {
    id: 'creed-aventus',
    name: 'Aventus',
    house: 'Creed',
    symbol: '⚔️',
    family: 'Chypre Fruity / Smoky Birch',
    iconicNotes: ['Blackcurrant', 'Bergamot', 'Birch Wood', 'Patchouli', 'Oakmoss', 'Ambergris'],
    keyNoteIds: ['bergamot', 'blood_orange', 'dark_patchouli', 'golden_amber', 'haiti_vetiver'],
    vibe: 'Aroma sang penakluk kaisar, segar buah berpadu asap kayu maskulin yang legendaris.',
    idealOccasion: 'Special Occasion & Day',
    priceTier: 'Niche Luxury',
  },
  {
    id: 'tom-ford-oud-wood',
    name: 'Oud Wood',
    house: 'Tom Ford',
    symbol: '🪵',
    family: 'Woody Amber / Exotic Resin',
    iconicNotes: ['Rare Oud', 'Rosewood', 'Cardamom', 'Sandalwood', 'Tonka Bean', 'Amber'],
    keyNoteIds: ['cambodian_oud', 'cardamom', 'mysore_sandalwood', 'tonka_bean', 'golden_amber'],
    vibe: 'Misterius bangsawan privat, eksotis berasap, hangat dan sangat elegan.',
    idealOccasion: 'Evening & Night',
    priceTier: 'Niche Luxury',
  },
  {
    id: 'ysl-la-nuit',
    name: "La Nuit de L'Homme",
    house: 'Yves Saint Laurent',
    symbol: '🌙',
    family: 'Woody Spicy / Seductive',
    iconicNotes: ['Cardamom', 'French Lavender', 'Cedarwood', 'Coumarin'],
    keyNoteIds: ['cardamom', 'french_lavender', 'atlas_cedar', 'tonka_bean'],
    vibe: 'Daya pikat intim temaram lilin, menggoda dari jarak dekat, kehangatan romantis.',
    idealOccasion: 'Night & Evening',
    priceTier: 'Designer',
  },
  {
    id: 'jo-malone-wood-sage',
    name: 'Wood Sage & Sea Salt',
    house: 'Jo Malone London',
    symbol: '🐚',
    family: 'Mineral Aquatic / Aromatic',
    iconicNotes: ['Ambrette Seed', 'Sea Salt', 'Sage', 'Red Algae', 'Grapefruit'],
    keyNoteIds: ['marine_ozone', 'white_tea', 'white_musk', 'bergamot'],
    vibe: 'Hembusan angin tebing karang laut inggris, tenang, bebas, alami tanpa beban.',
    idealOccasion: 'Outdoor Sport & Day',
    priceTier: 'Niche Luxury',
  },
  {
    id: 'le-labo-santal-33',
    name: 'Santal 33',
    house: 'Le Labo',
    symbol: '🌾',
    family: 'Woody Leather / Smoky Papyrus',
    iconicNotes: ['Violet Accord', 'Cardamom', 'Iris', 'Papyrus', 'Cedarwood', 'Sandalwood'],
    keyNoteIds: ['cardamom', 'florentine_iris', 'mysore_sandalwood', 'atlas_cedar'],
    vibe: 'Artisan New York kontemporer, aroma api unggun berangin dan buku tua eksklusif.',
    idealOccasion: 'Day & Evening',
    priceTier: 'Niche Luxury',
  },
  {
    id: 'tom-ford-tobacco-vanille',
    name: 'Tobacco Vanille',
    house: 'Tom Ford',
    symbol: '🧁',
    family: 'Amber Spicy / Opulent Gourmand',
    iconicNotes: ['Tobacco Leaf', 'Ginger', 'Bourbon Vanilla', 'Cacao', 'Tonka Bean'],
    keyNoteIds: ['bourbon_vanilla', 'tonka_bean', 'cinnamon_bark', 'dark_patchouli'],
    vibe: 'Klub pria bangsawan inggris klasik, aroma vanila bourbon hangat dan tembakau manis.',
    idealOccasion: 'Night & Special Occasion',
    priceTier: 'Niche Luxury',
  },
  {
    id: 'acqua-di-gio',
    name: 'Acqua Di Giò Profondo',
    house: 'Giorgio Armani',
    symbol: '🏊',
    family: 'Aquatic Aromatic / Marine Mineral',
    iconicNotes: ['Marine Notes', 'Green Mandarin', 'Rosemary', 'Lavender', 'Patchouli', 'Musk'],
    keyNoteIds: ['marine_ozone', 'crisp_mint', 'french_lavender', 'white_musk', 'blood_orange'],
    vibe: 'Terjun ke laut mediterania terdalam, segar menyengat adrenalin, sangat bersih.',
    idealOccasion: 'Outdoor Sport & Indoor Sport',
    priceTier: 'Designer',
  },
];

/**
 * Calculates match percentage and returns top brand twins for user's blend
 */
export function findBrandTwins(
  userNoteIds: string[]
): { perfume: FamousPerfumeMatch; matchPercentage: number; sharedNotesCount: number }[] {
  if (userNoteIds.length === 0) {
    return FAMOUS_BRAND_PERFUMES.slice(0, 3).map((p) => ({
      perfume: p,
      matchPercentage: 70,
      sharedNotesCount: 1,
    }));
  }

  const results = FAMOUS_BRAND_PERFUMES.map((perfume) => {
    let matchCount = 0;
    perfume.keyNoteIds.forEach((keyId) => {
      if (userNoteIds.includes(keyId)) {
        matchCount++;
      }
    });

    const unionCount = Math.max(
      1,
      new Set([...perfume.keyNoteIds, ...userNoteIds]).size
    );
    const jaccard = matchCount / unionCount;

    // Calculate realistic similarity percentage (65% - 98%)
    const rawScore = 60 + (matchCount * 12) + (jaccard * 25);
    const matchPercentage = Math.min(98, Math.max(68, Math.round(rawScore)));

    return {
      perfume,
      matchPercentage,
      sharedNotesCount: matchCount,
    };
  });

  return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
