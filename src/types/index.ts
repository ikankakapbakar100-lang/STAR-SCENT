export type ZodiacSignId =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

export type ElementType = 'fire' | 'earth' | 'air' | 'water';

export type OccasionType =
  | 'special_occasion'
  | 'outdoor_sport'
  | 'indoor_sport'
  | 'day'
  | 'evening'
  | 'night';

export type NoteTier = 'top' | 'heart' | 'base';

export type ScentFamily =
  | 'citrus'
  | 'floral'
  | 'woody'
  | 'oriental'
  | 'fresh'
  | 'spicy'
  | 'aquatic'
  | 'gourmand';

export interface PerfumeNote {
  id: string;
  name: string;
  latinName: string;
  tier: NoteTier;
  family: ScentFamily;
  symbol: string;
  color: string; // Hex for bottle visualization
  volatility: 'high' | 'medium' | 'low';
  element: ElementType;
  rulingPlanet: string;
  planetSymbol: string;
  bestOccasions: OccasionType[];
  vibe: string;
}

export interface ZodiacSignInfo {
  id: ZodiacSignId;
  name: string;
  symbol: string;
  dates: string;
  element: ElementType;
  elementSymbol: string;
  rulingPlanet: string;
  planetSymbol: string;
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  signatureAccords: string[];
  signatureFormula: {
    top: string[];
    heart: string[];
    base: string[];
    name: string;
    description: string;
    recommendedOccasion: OccasionType;
  };
}

export interface OccasionInfo {
  id: OccasionType;
  title: string;
  symbol: string;
  tagline: string;
  idealConcentration: string;
  sillageRating: number; // 1 to 5
  longevityRating: number; // 1 to 5
  temperatureAffinity: 'Cool' | 'Warm' | 'Any' | 'Hot' | 'Breeze';
  perfumerRule: string;
  keyNotes: string[];
  accentColor: string;
}

export interface CustomBlendFormula {
  id: string;
  name: string;
  createdAt: number;
  zodiacSign?: ZodiacSignId;
  occasion: OccasionType;
  concentration: 'Cologne' | 'EDT' | 'EDP' | 'Extrait';
  notes: {
    noteId: string;
    percentage: number;
    tier: NoteTier;
  }[];
  harmonyScore: number;
  customColor?: string;
  creatorSign?: string;
}
