import React, { useState } from 'react';
import { CustomBlendFormula, NoteTier, OccasionType, ZodiacSignId } from '../types';
import { PERFUME_NOTES } from '../data/perfumeNotes';
import { ZODIAC_SIGNS } from '../data/astrologyData';
import { OCCASIONS_DATA } from '../data/occasionsData';
import {
  calculateHarmonyScore,
  calculateTierPercentages,
  getNoteById,
  getZodiacById,
} from '../utils/alchemicalEngine';
import { BottleVisualizer } from './BottleVisualizer';

interface MobileBlendViewProps {
  selectedSign: ZodiacSignId;
  onChangeSign: (signId: ZodiacSignId) => void;
  selectedOccasion: OccasionType;
  onChangeOccasion: (occ: OccasionType) => void;
  formulaNotes: { noteId: string; percentage: number; tier: NoteTier }[];
  setFormulaNotes: React.Dispatch<
    React.SetStateAction<{ noteId: string; percentage: number; tier: NoteTier }[]>
  >;
  blendName: string;
  setBlendName: (name: string) => void;
  concentration: 'Cologne' | 'EDT' | 'EDP' | 'Extrait';
  setConcentration: (conc: 'Cologne' | 'EDT' | 'EDP' | 'Extrait') => void;
  onTriggerBlendAnimation: () => void;
  onOpenCocoklogi: () => void;
  onOpenAstroRecommender: () => void;
  onOpenGrimoire: () => void;
}

export const MobileBlendView: React.FC<MobileBlendViewProps> = ({
  selectedSign,
  onChangeSign,
  selectedOccasion,
  onChangeOccasion,
  formulaNotes,
  setFormulaNotes,
  blendName,
  setBlendName,
  concentration,
  setConcentration,
  onTriggerBlendAnimation,
  onOpenCocoklogi,
  onOpenAstroRecommender,
  onOpenGrimoire,
}) => {
  const [activeTierTab, setActiveTierTab] = useState<NoteTier>('top');
  const currentZodiac = getZodiacById(selectedSign) || ZODIAC_SIGNS[0];
  const currentOccasion = OCCASIONS_DATA.find((o) => o.id === selectedOccasion) || OCCASIONS_DATA[0];

  const { top, heart, base, total } = calculateTierPercentages(formulaNotes);
  const harmony = calculateHarmonyScore(formulaNotes, selectedSign, selectedOccasion, concentration);

  const addNote = (noteId: string, tier: NoteTier) => {
    const existingIndex = formulaNotes.findIndex((n) => n.noteId === noteId);
    if (existingIndex >= 0) {
      const updated = [...formulaNotes];
      updated[existingIndex].percentage = Math.min(60, updated[existingIndex].percentage + 5);
      setFormulaNotes(updated);
    } else {
      setFormulaNotes([...formulaNotes, { noteId, percentage: 15, tier }]);
    }
  };

  const removeNote = (noteId: string) => {
    setFormulaNotes(formulaNotes.filter((n) => n.noteId !== noteId));
  };

  const updatePercentage = (noteId: string, delta: number) => {
    const updated = formulaNotes
      .map((item) => {
        if (item.noteId === noteId) {
          const next = item.percentage + delta;
          return { ...item, percentage: Math.max(5, Math.min(60, next)) };
        }
        return item;
      })
      .filter((item) => item.percentage > 0);
    setFormulaNotes(updated);
  };

  // Golden ratio auto-balance
  const autoBalance = () => {
    if (formulaNotes.length === 0) return;
    const topItems = formulaNotes.filter((n) => n.tier === 'top');
    const heartItems = formulaNotes.filter((n) => n.tier === 'heart');
    const baseItems = formulaNotes.filter((n) => n.tier === 'base');

    const balanced: { noteId: string; percentage: number; tier: NoteTier }[] = [];

    if (topItems.length > 0) {
      const perItem = Math.round(25 / topItems.length);
      topItems.forEach((item, i) => {
        balanced.push({
          ...item,
          percentage: i === 0 ? 25 - perItem * (topItems.length - 1) : perItem,
        });
      });
    }

    if (heartItems.length > 0) {
      const perItem = Math.round(45 / heartItems.length);
      heartItems.forEach((item, i) => {
        balanced.push({
          ...item,
          percentage: i === 0 ? 45 - perItem * (heartItems.length - 1) : perItem,
        });
      });
    }

    if (baseItems.length > 0) {
      const perItem = Math.round(30 / baseItems.length);
      baseItems.forEach((item, i) => {
        balanced.push({
          ...item,
          percentage: i === 0 ? 30 - perItem * (baseItems.length - 1) : perItem,
        });
      });
    }

    if (balanced.length > 0) {
      setFormulaNotes(balanced);
    }
  };

  const availableNotesForTier = PERFUME_NOTES.filter((n) => n.tier === activeTierTab);

  return (
    <div className="w-full max-w-md mx-auto space-y-3 pb-4 select-none">
      {/* Quick Icon Toolbar (Cocoklogi, Astro Recommender, Grimoire) */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-white/90 border border-amber-300 shadow-sm">
        {/* Zodiac Indicator */}
        <div className="flex items-center gap-1.5 px-2">
          <span className="text-xl text-amber-500 font-bold">{currentZodiac.symbol}</span>
          <span className="text-xs font-mono font-bold text-blue-950">
            {currentZodiac.elementSymbol} {currentOccasion.symbol}
          </span>
        </div>

        {/* Feature Icon Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Cocoklogi Brand Ternama */}
          <button
            type="button"
            onClick={onOpenCocoklogi}
            className="h-9 px-2.5 rounded-xl bg-blue-50 border border-blue-400 text-blue-800 text-xs font-mono font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Cocoklogi Brand Ternama"
          >
            <span>🪞</span>
            <span className="text-[11px] font-cinzel">Cocoklogi</span>
          </button>

          {/* Astro Recommender */}
          <button
            type="button"
            onClick={onOpenAstroRecommender}
            className="h-9 px-2.5 rounded-xl bg-amber-50 border border-amber-400 text-amber-900 text-xs font-mono font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Rekomendasi Astrologi Pribadi"
          >
            <span>🔮</span>
            <span className="text-[11px] font-cinzel">Astro</span>
          </button>

          {/* Saved Grimoire */}
          <button
            type="button"
            onClick={onOpenGrimoire}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 flex items-center justify-center text-base shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Grimoire Koleksi"
          >
            📜
          </button>
        </div>
      </div>

      {/* Main Flacon Stage Card (Bright Golden Blue Aesthetic) */}
      <div className="rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-white via-[#f0f7ff] to-[#fcfaff] p-3 shadow-xl relative">
        <div className="flex items-center justify-between px-2 pt-1">
          <input
            type="text"
            value={blendName}
            onChange={(e) => setBlendName(e.target.value)}
            className="bg-transparent border-b border-amber-300 text-blue-950 font-cinzel font-bold text-sm focus:outline-none w-36"
            placeholder="Nama Parfum..."
          />
          <div className="flex items-center gap-1">
            {(['EDT', 'EDP', 'Extrait'] as const).map((conc) => (
              <button
                key={conc}
                type="button"
                onClick={() => setConcentration(conc)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                  concentration === conc
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-500 bg-slate-100'
                }`}
              >
                {conc}
              </button>
            ))}
          </div>
        </div>

        {/* Flacon Visualizer */}
        <BottleVisualizer
          notes={formulaNotes}
          concentration={concentration}
          name={blendName}
          harmonyScore={harmony.score}
        />

        {/* Pyramid Ratio Bar */}
        <div className="mt-1 px-2 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold">
            <span className="text-amber-700">▲ {top}%</span>
            <span className="text-blue-700">♥ {heart}%</span>
            <span className="text-indigo-900">⚓ {base}%</span>
            <span className="text-emerald-700">({total}%)</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200 overflow-hidden flex border border-slate-300">
            <div style={{ width: `${top}%` }} className="bg-amber-400" />
            <div style={{ width: `${heart}%` }} className="bg-sky-500" />
            <div style={{ width: `${base}%` }} className="bg-blue-700" />
          </div>
        </div>

        {/* The Flagship "Racik & Blend" Trigger CTA */}
        <div className="mt-3 px-1">
          <button
            type="button"
            onClick={onTriggerBlendAnimation}
            disabled={formulaNotes.length === 0}
            className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-cinzel font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
          >
            <span className="text-xl">⚗️</span>
            <span>RACIK PARFUM SEKARANG</span>
            <span className="text-base text-blue-950">✨</span>
          </button>
        </div>
      </div>

      {/* Active Formula Note Steppers (Compact) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm space-y-1.5">
        <div className="flex items-center justify-between px-1 text-[11px] font-mono font-bold text-slate-600">
          <span>Komposisi ({formulaNotes.length} Bahan)</span>
          <button
            type="button"
            onClick={autoBalance}
            className="text-[10px] text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-lg font-bold"
          >
            ✨ Rasio Emas
          </button>
        </div>

        {formulaNotes.length === 0 ? (
          <div className="py-3 text-center text-xs text-slate-400">
            Pilih aroma di bawah untuk meracik
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1 max-h-[140px] overflow-y-auto pr-1">
            {formulaNotes.map((item) => {
              const note = getNoteById(item.noteId);
              if (!note) return null;
              return (
                <div
                  key={item.noteId}
                  className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{note.symbol}</span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {note.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {note.tier === 'top' && '▲'}
                      {note.tier === 'heart' && '♥'}
                      {note.tier === 'base' && '⚓'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updatePercentage(item.noteId, -5)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-blue-900 text-xs">
                      {item.percentage}%
                    </span>
                    <button
                      type="button"
                      onClick={() => updatePercentage(item.noteId, 5)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeNote(item.noteId)}
                      className="w-6 h-6 text-rose-500 hover:text-rose-700 flex items-center justify-center text-xs ml-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Note Catalog Selector Tabs (▲, ♥, ⚓) & Quick Tap-to-Add Grid */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-3 shadow-sm space-y-2">
        {/* Tier Tabs: ▲ Top, ♥ Heart, ⚓ Base */}
        <div className="flex items-center justify-center gap-2 border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setActiveTierTab('top')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTierTab === 'top'
                ? 'bg-amber-400 text-slate-950 border border-amber-500 shadow-sm'
                : 'text-slate-500 bg-slate-50'
            }`}
          >
            ▲ Top (Segar)
          </button>
          <button
            type="button"
            onClick={() => setActiveTierTab('heart')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTierTab === 'heart'
                ? 'bg-sky-400 text-slate-950 border border-sky-500 shadow-sm'
                : 'text-slate-500 bg-slate-50'
            }`}
          >
            ♥ Heart (Bunga/Rempah)
          </button>
          <button
            type="button"
            onClick={() => setActiveTierTab('base')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTierTab === 'base'
                ? 'bg-blue-600 text-white border border-blue-700 shadow-sm'
                : 'text-slate-500 bg-slate-50'
            }`}
          >
            ⚓ Base (Kayu/Amber)
          </button>
        </div>

        {/* Note Cards Compact Grid (Tap to add) */}
        <div className="grid grid-cols-4 gap-2">
          {availableNotesForTier.map((note) => {
            const isAdded = formulaNotes.some((n) => n.noteId === note.id);
            return (
              <button
                key={note.id}
                type="button"
                onClick={() => addNote(note.id, note.tier)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all active:scale-95 cursor-pointer ${
                  isAdded
                    ? 'border-amber-400 bg-amber-50 text-slate-950 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-sky-300 text-slate-700'
                }`}
              >
                <span className="text-2xl">{note.symbol}</span>
                <span className="text-[10px] font-semibold tracking-tight truncate w-full mt-0.5">
                  {note.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-bold text-amber-600 font-mono">
                  {isAdded ? '✓' : '+'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
