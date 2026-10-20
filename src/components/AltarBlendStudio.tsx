import React, { useState, useEffect } from 'react';
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

interface AltarBlendStudioProps {
  initialSignId?: ZodiacSignId;
  initialOccasion?: OccasionType;
  onSaveFormula: (formula: CustomBlendFormula) => void;
  onGoToGrimoire: () => void;
}

export const AltarBlendStudio: React.FC<AltarBlendStudioProps> = ({
  initialSignId = 'leo',
  initialOccasion = 'special_occasion',
  onSaveFormula,
  onGoToGrimoire,
}) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignId>(initialSignId);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>(initialOccasion);
  const [concentration, setConcentration] = useState<'Cologne' | 'EDT' | 'EDP' | 'Extrait'>('EDP');
  const [activeTierTab, setActiveTierTab] = useState<NoteTier>('top');
  const [blendName, setBlendName] = useState('AURA✦');
  const [saveToast, setSaveToast] = useState(false);

  // Active notes in formula
  const [formulaNotes, setFormulaNotes] = useState<
    { noteId: string; percentage: number; tier: NoteTier }[]
  >([
    { noteId: 'bergamot', percentage: 25, tier: 'top' },
    { noteId: 'frankincense', percentage: 45, tier: 'heart' },
    { noteId: 'golden_amber', percentage: 30, tier: 'base' },
  ]);

  useEffect(() => {
    if (initialSignId) setSelectedSign(initialSignId);
  }, [initialSignId]);

  useEffect(() => {
    if (initialOccasion) setSelectedOccasion(initialOccasion);
  }, [initialOccasion]);

  const currentZodiac = getZodiacById(selectedSign);
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

  // Golden Ratio Auto-Balance: 25% Top, 45% Heart, 30% Base
  const autoBalancePyramid = () => {
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

  const resetAltar = () => {
    setFormulaNotes([]);
  };

  const handleSave = () => {
    if (formulaNotes.length === 0) return;
    const formula: CustomBlendFormula = {
      id: `blend-${Date.now()}`,
      name: blendName || 'AURA✦',
      createdAt: Date.now(),
      zodiacSign: selectedSign,
      occasion: selectedOccasion,
      concentration,
      notes: formulaNotes,
      harmonyScore: harmony.score,
      creatorSign: currentZodiac ? `${currentZodiac.symbol}` : undefined,
    };
    onSaveFormula(formula);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const availableNotesForTier = PERFUME_NOTES.filter((n) => n.tier === activeTierTab);

  return (
    <div className="space-y-4 select-none">
      {/* Toast Notification (Pure icon) */}
      {saveToast && (
        <div className="fixed top-16 right-4 z-50 bg-[#1e1b4b] border border-amber-400 text-amber-200 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="text-xl">✨</span>
          <span className="font-mono text-xs font-bold">💾 ✓</span>
          <button
            type="button"
            onClick={onGoToGrimoire}
            className="text-base text-sky-300 ml-1"
          >
            📜
          </button>
        </div>
      )}

      {/* Top Configuration Icon Ribbon (Zodiac Glyphs + Occasion Icons + Concentration) */}
      <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-r from-[#111335]/90 via-[#18123d]/90 to-[#0c0e27]/90 p-3 sm:p-4 shadow-xl space-y-3">
        {/* Zodiac Glyphs Horizontal Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = sign.id === selectedSign;
            return (
              <button
                key={sign.id}
                type="button"
                onClick={() => setSelectedSign(sign.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all ${
                  isSelected
                    ? 'border-2 border-amber-400 bg-amber-400/20 text-amber-300 shadow-md shadow-amber-400/25 scale-105'
                    : 'border border-slate-800 bg-[#090b24]/70 text-slate-400 hover:text-slate-200'
                }`}
                title={sign.name}
              >
                {sign.symbol}
              </button>
            );
          })}
        </div>

        {/* Occasions Icons Row + Concentration Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
          {/* Occasion Icons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
            {OCCASIONS_DATA.map((occ) => {
              const isSelected = occ.id === selectedOccasion;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                    isSelected
                      ? 'border-2 border-sky-400 bg-sky-400/20 text-sky-200 shadow-md shadow-sky-400/25 scale-105'
                      : 'border border-slate-800 bg-[#090b24]/70 text-slate-400 hover:text-slate-200'
                  }`}
                  title={occ.title}
                >
                  {occ.symbol}
                </button>
              );
            })}
          </div>

          {/* Concentration Pills */}
          <div className="flex items-center gap-1 bg-[#080918] p-1 rounded-2xl border border-slate-800 shrink-0">
            {(['Cologne', 'EDT', 'EDP', 'Extrait'] as const).map((conc) => (
              <button
                key={conc}
                type="button"
                onClick={() => setConcentration(conc)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                  concentration === conc
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {conc === 'Cologne' && '10%'}
                {conc === 'EDT' && '15%'}
                {conc === 'EDP' && '20%'}
                {conc === 'Extrait' && '30%'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Studio Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Visual Flacon & Meters (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-amber-400/30 bg-gradient-to-b from-[#13153d]/90 via-[#0d0f2f]/95 to-[#080918] p-4 shadow-2xl space-y-3">
          {/* Flacon Visualizer */}
          <BottleVisualizer
            notes={formulaNotes}
            concentration={concentration}
            name={blendName}
            harmonyScore={harmony.score}
          />

          {/* Pyramid Balance Segmented Bar */}
          <div className="rounded-2xl border border-slate-800 bg-[#090b24]/90 p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-300 font-bold">▲ ♥ ⚓ ({total}%)</span>
              <span className="text-purple-300 font-bold">{harmony.score}% ✦</span>
            </div>

            <div className="h-3 rounded-full bg-slate-900 overflow-hidden flex border border-slate-700">
              <div
                style={{ width: `${Math.min(100, top)}%` }}
                className="bg-amber-400 transition-all duration-500"
              />
              <div
                style={{ width: `${Math.min(100, heart)}%` }}
                className="bg-purple-500 transition-all duration-500"
              />
              <div
                style={{ width: `${Math.min(100, base)}%` }}
                className="bg-sky-400 transition-all duration-500"
              />
            </div>

            <div className="grid grid-cols-3 text-center text-xs font-mono pt-1">
              <div className="text-amber-300">
                <span>▲ {top}%</span>
              </div>
              <div className="text-purple-300">
                <span>♥ {heart}%</span>
              </div>
              <div className="text-sky-300">
                <span>⚓ {base}%</span>
              </div>
            </div>
          </div>

          {/* Elements & Longevity/Sillage Meters (Pure Icons) */}
          <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono">
            <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300">
              <span className="block text-base">🔥</span>
              <span className="font-bold">{harmony.elementMix.fire}%</span>
            </div>
            <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              <span className="block text-base">🌍</span>
              <span className="font-bold">{harmony.elementMix.earth}%</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300">
              <span className="block text-base">💨</span>
              <span className="font-bold">{harmony.elementMix.air}%</span>
            </div>
            <div className="p-2 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-300">
              <span className="block text-base">💧</span>
              <span className="font-bold">{harmony.elementMix.water}%</span>
            </div>
          </div>

          {/* Quick Stats: ⏱️ Longevity & 📡 Sillage */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl border border-slate-800 bg-[#090b24]/80 flex items-center justify-center gap-2">
              <span className="text-lg">⏱️</span>
              <span className="font-bold text-amber-300">~{harmony.longevityHours}h</span>
            </div>
            <div className="p-2.5 rounded-xl border border-slate-800 bg-[#090b24]/80 flex items-center justify-center gap-2">
              <span className="text-lg">📡</span>
              <span className="font-bold text-purple-300">{harmony.sillage}/5</span>
            </div>
          </div>

          {/* Action Buttons: 💾 Save, ✨ Balance, 🔄 Reset */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleSave}
              disabled={formulaNotes.length === 0}
              className="flex-1 min-h-[46px] rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
              title="Simpan ke Grimoire"
            >
              <span>💾</span>
              <span className="text-xs font-mono font-bold">✦</span>
            </button>
            <button
              type="button"
              onClick={autoBalancePyramid}
              className="w-12 min-h-[46px] rounded-xl border border-amber-400/40 bg-purple-950/50 hover:bg-purple-900/60 text-amber-300 text-xl flex items-center justify-center active:scale-95 transition-all"
              title="Rasio Emas (Auto-Balance)"
            >
              ✨
            </button>
            <button
              type="button"
              onClick={resetAltar}
              className="w-12 min-h-[46px] rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 text-lg flex items-center justify-center active:scale-95 transition-all"
              title="Reset"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Right Column: Note Altar (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Ingredients List */}
          <div className="rounded-3xl border border-slate-800 bg-[#0d0f30]/90 p-4 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span className="flex items-center gap-1.5">
                <span>⚗️</span>
                <span>({formulaNotes.length})</span>
              </span>
              <span className="text-slate-400 font-bold">{100 - total}% ✦</span>
            </div>

            {formulaNotes.length === 0 ? (
              <div className="py-6 text-center text-slate-600 text-2xl border border-dashed border-slate-800 rounded-2xl">
                ✨
              </div>
            ) : (
              <div className="space-y-1.5">
                {formulaNotes.map((item) => {
                  const note = getNoteById(item.noteId);
                  if (!note) return null;
                  return (
                    <div
                      key={item.noteId}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl border border-slate-800/80 bg-[#090b24]/90"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{note.symbol}</span>
                        <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                          <span>
                            {note.tier === 'top' && '▲'}
                            {note.tier === 'heart' && '♥'}
                            {note.tier === 'base' && '⚓'}
                          </span>
                          <span>·</span>
                          <span className="text-purple-300">{note.planetSymbol}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updatePercentage(item.noteId, -5)}
                          className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 flex items-center justify-center text-sm active:scale-95"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-amber-300 text-xs">
                          {item.percentage}%
                        </span>
                        <button
                          type="button"
                          onClick={() => updatePercentage(item.noteId, 5)}
                          className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 flex items-center justify-center text-sm active:scale-95"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeNote(item.noteId)}
                          className="w-8 h-8 rounded-lg text-rose-400 hover:bg-rose-950/40 flex items-center justify-center text-xs active:scale-95"
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

          {/* Note Catalog Library (Divided by Tier: ▲, ♥, ⚓) */}
          <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-b from-[#111335]/90 to-[#090b24]/95 p-4 shadow-xl space-y-3">
            {/* Pure Icon Tier Tabs: ▲, ♥, ⚓ */}
            <div className="flex items-center justify-center gap-3 border-b border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveTierTab('top')}
                className={`w-14 h-11 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  activeTierTab === 'top'
                    ? 'bg-amber-400/20 text-amber-300 border-2 border-amber-400 shadow-md shadow-amber-400/25 scale-105'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
                title="Top Notes (▲)"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => setActiveTierTab('heart')}
                className={`w-14 h-11 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  activeTierTab === 'heart'
                    ? 'bg-purple-500/20 text-purple-300 border-2 border-purple-400 shadow-md shadow-purple-400/25 scale-105'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
                title="Heart Notes (♥)"
              >
                ♥
              </button>
              <button
                type="button"
                onClick={() => setActiveTierTab('base')}
                className={`w-14 h-11 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  activeTierTab === 'base'
                    ? 'bg-sky-500/20 text-sky-300 border-2 border-sky-400 shadow-md shadow-sky-400/25 scale-105'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
                title="Base Notes (⚓)"
              >
                ⚓
              </button>
            </div>

            {/* Note Cards Grid (Pure Icon Format) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableNotesForTier.map((note) => {
                const isAdded = formulaNotes.some((n) => n.noteId === note.id);
                return (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() => addNote(note.id, note.tier)}
                    className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95 ${
                      isAdded
                        ? 'border-amber-400 bg-gradient-to-b from-amber-950/30 to-purple-950/40 text-amber-300 shadow-sm'
                        : 'border-slate-800/90 bg-[#0c0e2a]/80 hover:border-purple-600/50 text-slate-300'
                    }`}
                    title={note.name}
                  >
                    <span className="text-3xl">{note.symbol}</span>
                    <div className="flex items-center gap-1 text-xs font-mono">
                      <span className="text-purple-300">{note.planetSymbol}</span>
                      <span>·</span>
                      <span>{note.element === 'fire' && '🔥'}</span>
                      <span>{note.element === 'earth' && '🌍'}</span>
                      <span>{note.element === 'air' && '💨'}</span>
                      <span>{note.element === 'water' && '💧'}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-300">
                      {isAdded ? '✓' : '+'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
