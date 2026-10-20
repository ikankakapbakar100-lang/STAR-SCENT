import React from 'react';
import { NoteTier, OccasionType, ZodiacSignId } from '../types';
import { PERFUME_NOTES } from '../data/perfumeNotes';
import { ZODIAC_SIGNS } from '../data/astrologyData';
import {
  calculateHarmonyScore,
  calculateTierPercentages,
  getNoteById,
  getZodiacById,
} from '../utils/alchemicalEngine';
import { BottleVisualizer } from './BottleVisualizer';

interface SinglePageBlendStudioProps {
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
  onTriggerBlend: () => void;
  onOpenGrimoire: () => void;
}

export const SinglePageBlendStudio: React.FC<SinglePageBlendStudioProps> = ({
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
  onTriggerBlend,
  onOpenGrimoire,
}) => {
  const currentZodiac = getZodiacById(selectedSign) || ZODIAC_SIGNS[0];
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

  const resetFormula = () => {
    setFormulaNotes([]);
  };

  const autoBalanceGoldenRatio = () => {
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

  return (
    <div className="w-full max-w-md mx-auto space-y-3 pb-8 select-none">
      {/* 1. Zodiac Signs Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x px-1">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = sign.id === selectedSign;
          return (
            <button
              key={sign.id}
              type="button"
              onClick={() => onChangeSign(sign.id)}
              className={`min-w-[44px] h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'border-2 border-amber-500 bg-amber-100 text-blue-950 font-bold shadow-sm scale-105'
                  : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}
              title={sign.name}
            >
              <span>{sign.symbol}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Unified Master Flacon Container */}
      <div className="rounded-3xl border-2 border-amber-400/80 bg-gradient-to-b from-white via-[#f0f7ff] to-[#fcfaff] p-3.5 shadow-xl space-y-2">
        {/* Top Blend Name & Concentration Selector */}
        <div className="flex items-center justify-between px-1">
          <input
            type="text"
            value={blendName}
            onChange={(e) => setBlendName(e.target.value)}
            className="bg-transparent border-b border-amber-300 text-blue-950 font-cinzel font-bold text-sm sm:text-base focus:outline-none w-40"
            placeholder="Nama Racikan..."
          />
          <div className="flex items-center gap-1">
            {(['EDT', 'EDP', 'Extrait'] as const).map((conc) => (
              <button
                key={conc}
                type="button"
                onClick={() => setConcentration(conc)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
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

        {/* Flacon Visualizer without spray button */}
        <BottleVisualizer
          notes={formulaNotes}
          concentration={concentration}
          name={blendName}
          harmonyScore={harmony.score}
        />

        {/* Percentage bar & controls */}
        <div className="px-1 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold ${
                total === 100
                  ? 'text-emerald-700'
                  : total < 100
                  ? 'text-amber-700'
                  : 'text-rose-600'
              }`}
            >
              Total: {total}% {total === 100 ? '✓' : total < 100 ? `(sisa ${100 - total}%)` : `(+${total - 100}%)`}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={autoBalanceGoldenRatio}
              className="text-[10px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2 py-0.5 rounded-lg transition-all"
              title="Sesuaikan otomatis ke 100%"
            >
              ✨ Rasio Emas
            </button>
            {formulaNotes.length > 0 && (
              <button
                type="button"
                onClick={resetFormula}
                className="text-[10px] text-slate-500 hover:text-rose-600 bg-slate-100 px-1.5 py-0.5 rounded-lg transition-all"
                title="Kosongkan"
              >
                🔄
              </button>
            )}
          </div>
        </div>

        {/* Selected Notes Summary Chips */}
        {formulaNotes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {formulaNotes.map((item) => {
              const note = getNoteById(item.noteId);
              if (!note) return null;
              return (
                <div
                  key={item.noteId}
                  className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-xl bg-white border border-amber-300 text-xs font-mono font-bold shadow-sm"
                >
                  <span>{note.symbol}</span>
                  <span className="text-slate-800">{note.name.split(' ')[0]}</span>
                  <span className="text-blue-900 font-extrabold">{item.percentage}%</span>

                  {/* Micro Stepper */}
                  <div className="flex items-center gap-0.5 ml-1">
                    <button
                      type="button"
                      onClick={() => updatePercentage(item.noteId, -5)}
                      className="w-4 h-4 rounded bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] active:scale-95 cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePercentage(item.noteId, 5)}
                      className="w-4 h-4 rounded bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] active:scale-95 cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeNote(item.noteId)}
                      className="w-4 h-4 text-rose-500 hover:text-rose-700 flex items-center justify-center text-[10px] ml-0.5 active:scale-95 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Prominent "Blend Scent" Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onTriggerBlend}
            disabled={formulaNotes.length === 0}
            className="w-full min-h-[50px] rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-cinzel font-black text-base tracking-widest uppercase shadow-lg shadow-amber-500/35 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-40"
          >
            <span className="text-2xl">✨</span>
            <span>BLEND SCENT</span>
            <span className="text-2xl">⚗️</span>
          </button>
        </div>
      </div>

      {/* 3. Single Unified Note Catalog (All notes together in one open grid) */}
      <div className="rounded-3xl border-2 border-amber-300/80 bg-white p-3.5 shadow-sm space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-cinzel font-bold text-blue-950 tracking-wider">
            Esensi Aroma (Sentuh untuk Meracik)
          </span>
          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            {PERFUME_NOTES.length} Pilihan
          </span>
        </div>

        {/* All notes unified in one continuous grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1">
          {PERFUME_NOTES.map((note) => {
            const isAdded = formulaNotes.some((n) => n.noteId === note.id);
            return (
              <button
                key={note.id}
                type="button"
                onClick={() => addNote(note.id, note.tier)}
                className={`p-2 rounded-2xl border flex flex-col items-center justify-center text-center transition-all active:scale-95 cursor-pointer min-h-[64px] ${
                  isAdded
                    ? 'border-2 border-amber-500 bg-amber-50 text-slate-950 shadow-sm scale-105'
                    : 'border-slate-200 bg-slate-50/70 hover:border-amber-300 text-slate-700'
                }`}
                title={note.name}
              >
                <span className="text-2xl leading-none">{note.symbol}</span>
                <span className="text-[10px] font-semibold tracking-tight truncate w-full mt-1">
                  {note.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono font-bold text-blue-900">
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
