import {
  CustomBlendFormula,
  ElementType,
  NoteTier,
  OccasionType,
  PerfumeNote,
  ZodiacSignId,
} from '../types';
import { PERFUME_NOTES } from '../data/perfumeNotes';
import { ZODIAC_SIGNS } from '../data/astrologyData';
import { OCCASIONS_DATA } from '../data/occasionsData';

export function getNoteById(id: string): PerfumeNote | undefined {
  return PERFUME_NOTES.find((n) => n.id === id);
}

export function getZodiacById(id: ZodiacSignId) {
  return ZODIAC_SIGNS.find((z) => z.id === id);
}

export function getOccasionById(id: OccasionType) {
  return OCCASIONS_DATA.find((o) => o.id === id);
}

/**
 * Calculates the total percentage of notes currently in a formula
 */
export function calculateTierPercentages(
  notes: { noteId: string; percentage: number; tier: NoteTier }[]
): { top: number; heart: number; base: number; total: number } {
  let top = 0;
  let heart = 0;
  let base = 0;

  notes.forEach((item) => {
    const note = getNoteById(item.noteId);
    if (!note) return;
    if (item.tier === 'top') top += item.percentage;
    else if (item.tier === 'heart') heart += item.percentage;
    else if (item.tier === 'base') base += item.percentage;
  });

  return { top, heart, base, total: top + heart + base };
}

/**
 * Calculates astrological & occasion harmony score (0 - 100)
 */
export function calculateHarmonyScore(
  notes: { noteId: string; percentage: number; tier: NoteTier }[],
  signId?: ZodiacSignId,
  occasion?: OccasionType,
  concentration: string = 'EDP'
): {
  score: number;
  pyramidBalance: 'Ideal' | 'Needs Top' | 'Needs Heart' | 'Needs Base' | 'Empty';
  elementMix: Record<ElementType, number>;
  sillage: number;
  longevityHours: number;
} {
  if (notes.length === 0) {
    return {
      score: 50,
      pyramidBalance: 'Empty',
      elementMix: { fire: 25, earth: 25, air: 25, water: 25 },
      sillage: 2,
      longevityHours: 4,
    };
  }

  const { top, heart, base, total } = calculateTierPercentages(notes);
  const sign = signId ? getZodiacById(signId) : undefined;
  const occ = occasion ? getOccasionById(occasion) : undefined;

  let astrologicalPoints = 0;
  let occasionPoints = 0;

  const elementCounts: Record<ElementType, number> = {
    fire: 0,
    earth: 0,
    air: 0,
    water: 0,
  };

  let totalWeight = 0;

  notes.forEach((item) => {
    const note = getNoteById(item.noteId);
    if (!note) return;

    totalWeight += item.percentage;
    elementCounts[note.element] += item.percentage;

    // Check sign element affinity
    if (sign) {
      if (note.element === sign.element) astrologicalPoints += 15 * (item.percentage / 20);
      if (note.rulingPlanet === sign.rulingPlanet) astrologicalPoints += 20 * (item.percentage / 20);
    } else {
      astrologicalPoints += 8 * (item.percentage / 20);
    }

    // Check occasion affinity
    if (occ && note.bestOccasions.includes(occ.id)) {
      occasionPoints += 15 * (item.percentage / 20);
    } else {
      occasionPoints += 5 * (item.percentage / 20);
    }
  });

  // Normalize element mix to 100%
  const divisor = totalWeight || 1;
  const elementMix: Record<ElementType, number> = {
    fire: Math.round((elementCounts.fire / divisor) * 100),
    earth: Math.round((elementCounts.earth / divisor) * 100),
    air: Math.round((elementCounts.air / divisor) * 100),
    water: Math.round((elementCounts.water / divisor) * 100),
  };

  // Check classical French perfumery pyramid ratio:
  // Ideal: Top 20-35%, Heart 40-55%, Base 25-40%
  let pyramidPoints = 30;
  let pyramidBalance: 'Ideal' | 'Needs Top' | 'Needs Heart' | 'Needs Base' | 'Empty' = 'Ideal';

  if (total > 0) {
    const topRatio = top / total;
    const heartRatio = heart / total;
    const baseRatio = base / total;

    if (topRatio < 0.15) {
      pyramidPoints -= 10;
      pyramidBalance = 'Needs Top';
    } else if (heartRatio < 0.25) {
      pyramidPoints -= 10;
      pyramidBalance = 'Needs Heart';
    } else if (baseRatio < 0.2) {
      pyramidPoints -= 10;
      pyramidBalance = 'Needs Base';
    }
  }

  const rawScore = Math.min(100, Math.round(40 + (astrologicalPoints * 0.3) + (occasionPoints * 0.3) + pyramidPoints));

  // Compute Longevity and Sillage based on concentration and Base tier ratio
  let concentrationMultiplier = 1.0;
  if (concentration === 'Cologne') concentrationMultiplier = 0.6;
  if (concentration === 'EDT') concentrationMultiplier = 0.8;
  if (concentration === 'EDP') concentrationMultiplier = 1.1;
  if (concentration === 'Extrait') concentrationMultiplier = 1.5;

  const baseRatio = total > 0 ? base / total : 0.3;
  const longevityHours = Math.min(18, Math.round((4 + baseRatio * 8) * concentrationMultiplier));
  const sillage = Math.min(5, Math.max(1, Math.round((top / (total || 1) * 3 + baseRatio * 2) * concentrationMultiplier)));

  return {
    score: Math.max(55, Math.min(99, rawScore)),
    pyramidBalance,
    elementMix,
    sillage,
    longevityHours,
  };
}

/**
 * Generate liquid colors for the animated bottle
 */
export function getLiquidGradient(notes: { noteId: string }[]): {
  gradient: string;
  primaryColor: string;
} {
  if (notes.length === 0) {
    return {
      gradient: 'linear-gradient(180deg, #38bdf8 0%, #8b5cf6 50%, #fbbf24 100%)',
      primaryColor: '#fbbf24',
    };
  }

  const noteObjects = notes.map((n) => getNoteById(n.noteId)).filter(Boolean) as PerfumeNote[];
  const colors = noteObjects.map((n) => n.color);

  if (colors.length === 1) {
    return {
      gradient: `linear-gradient(180deg, ${colors[0]}88 0%, ${colors[0]} 100%)`,
      primaryColor: colors[0],
    };
  }

  const topColor = colors[0] || '#38bdf8';
  const midColor = colors[Math.floor(colors.length / 2)] || '#8b5cf6';
  const botColor = colors[colors.length - 1] || '#fbbf24';

  return {
    gradient: `linear-gradient(180deg, ${topColor} 0%, ${midColor} 50%, ${botColor} 100%)`,
    primaryColor: midColor,
  };
}

const STORAGE_KEY = 'astra_parfum_saved_formulas_v1';

export function loadSavedFormulas(): CustomBlendFormula[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial starter celestial master blends
      const initial: CustomBlendFormula[] = [
        {
          id: 'blend-aurora-solis',
          name: 'Aura Solis Imperial',
          createdAt: Date.now() - 86400000,
          zodiacSign: 'leo',
          occasion: 'special_occasion',
          concentration: 'Extrait',
          notes: [
            { noteId: 'bergamot', percentage: 25, tier: 'top' },
            { noteId: 'frankincense', percentage: 45, tier: 'heart' },
            { noteId: 'golden_amber', percentage: 30, tier: 'base' },
          ],
          harmonyScore: 98,
          customColor: '#fbbf24',
          creatorSign: '♌ Leo',
        },
        {
          id: 'blend-nocturne-cygnus',
          name: 'Nocturne de Cygnus',
          createdAt: Date.now() - 43200000,
          zodiacSign: 'scorpio',
          occasion: 'night',
          concentration: 'EDP',
          notes: [
            { noteId: 'pink_pepper', percentage: 20, tier: 'top' },
            { noteId: 'jasmine_sambac', percentage: 40, tier: 'heart' },
            { noteId: 'bourbon_vanilla', percentage: 40, tier: 'base' },
          ],
          harmonyScore: 96,
          customColor: '#8b5cf6',
          creatorSign: '♏ Scorpio',
        },
        {
          id: 'blend-zephyr-athletic',
          name: 'Zephyr Oceanus',
          createdAt: Date.now() - 21600000,
          zodiacSign: 'aquarius',
          occasion: 'outdoor_sport',
          concentration: 'EDT',
          notes: [
            { noteId: 'marine_ozone', percentage: 35, tier: 'top' },
            { noteId: 'crisp_mint', percentage: 15, tier: 'top' },
            { noteId: 'blue_lotus', percentage: 30, tier: 'heart' },
            { noteId: 'haiti_vetiver', percentage: 20, tier: 'base' },
          ],
          harmonyScore: 94,
          customColor: '#38bdf8',
          creatorSign: '♒ Aquarius',
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveFormulaToStorage(formula: CustomBlendFormula): CustomBlendFormula[] {
  try {
    const existing = loadSavedFormulas();
    const updated = [formula, ...existing.filter((f) => f.id !== formula.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteFormulaFromStorage(id: string): CustomBlendFormula[] {
  try {
    const existing = loadSavedFormulas();
    const updated = existing.filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

/**
 * Loads the signature alchemical notes for a given Zodiac sign
 */
export function loadSignatureNotesForZodiac(signId: ZodiacSignId): {
  notes: { noteId: string; percentage: number; tier: NoteTier }[];
  name: string;
  recommendedOccasion: OccasionType;
} {
  const sign = getZodiacById(signId) || ZODIAC_SIGNS[0];
  const { top, heart, base, name, recommendedOccasion } = sign.signatureFormula;

  const result: { noteId: string; percentage: number; tier: NoteTier }[] = [];

  const topPct = Math.round(25 / Math.max(1, top.length));
  top.forEach((id, i) => {
    result.push({
      noteId: id,
      percentage: i === 0 ? 25 - topPct * (top.length - 1) : topPct,
      tier: 'top',
    });
  });

  const heartPct = Math.round(45 / Math.max(1, heart.length));
  heart.forEach((id, i) => {
    result.push({
      noteId: id,
      percentage: i === 0 ? 45 - heartPct * (heart.length - 1) : heartPct,
      tier: 'heart',
    });
  });

  const basePct = Math.round(30 / Math.max(1, base.length));
  base.forEach((id, i) => {
    result.push({
      noteId: id,
      percentage: i === 0 ? 30 - basePct * (base.length - 1) : basePct,
      tier: 'base',
    });
  });

  return { notes: result, name, recommendedOccasion };
}

/**
 * Safe clipboard helper that works inside sandboxed iframes
 */
export async function copyToClipboardSafe(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback to execCommand
  }
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch {
    return false;
  }
}
