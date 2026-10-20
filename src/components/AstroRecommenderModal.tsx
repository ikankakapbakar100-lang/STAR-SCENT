import React, { useState } from 'react';
import { ZODIAC_SIGNS } from '../data/astrologyData';
import { OCCASIONS_DATA } from '../data/occasionsData';
import { NoteTier, OccasionType, ZodiacSignId } from '../types';
import { getNoteById, getZodiacById } from '../utils/alchemicalEngine';

interface AstroRecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBlend: (
    notes: { noteId: string; percentage: number; tier: NoteTier }[],
    blendName: string,
    signId: ZodiacSignId,
    occasion: OccasionType
  ) => void;
}

export const AstroRecommenderModal: React.FC<AstroRecommenderModalProps> = ({
  isOpen,
  onClose,
  onApplyBlend,
}) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignId>('leo');
  const [selectedVibe, setSelectedVibe] = useState<'bold' | 'zen' | 'romantic' | 'adventurous' | 'mysterious'>('bold');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('special_occasion');

  if (!isOpen) return null;

  const currentSign = getZodiacById(selectedSign) || ZODIAC_SIGNS[0];

  // Dynamic recommendation based on Zodiac + Personality Vibe
  const getPersonalizedFormula = () => {
    switch (selectedVibe) {
      case 'bold':
        return {
          name: `${currentSign.name} Imperator`,
          notes: [
            { noteId: 'bergamot', percentage: 25, tier: 'top' as NoteTier },
            { noteId: 'frankincense', percentage: 45, tier: 'heart' as NoteTier },
            { noteId: 'golden_amber', percentage: 30, tier: 'base' as NoteTier },
          ],
        };
      case 'zen':
        return {
          name: `${currentSign.name} Serenitas`,
          notes: [
            { noteId: 'white_tea', percentage: 30, tier: 'top' as NoteTier },
            { noteId: 'french_lavender', percentage: 40, tier: 'heart' as NoteTier },
            { noteId: 'white_musk', percentage: 30, tier: 'base' as NoteTier },
          ],
        };
      case 'romantic':
        return {
          name: `${currentSign.name} Amor Céleste`,
          notes: [
            { noteId: 'pink_pepper', percentage: 20, tier: 'top' as NoteTier },
            { noteId: 'damask_rose', percentage: 50, tier: 'heart' as NoteTier },
            { noteId: 'bourbon_vanilla', percentage: 30, tier: 'base' as NoteTier },
          ],
        };
      case 'adventurous':
        return {
          name: `${currentSign.name} Zephyr Aurea`,
          notes: [
            { noteId: 'marine_ozone', percentage: 35, tier: 'top' as NoteTier },
            { noteId: 'crisp_mint', percentage: 15, tier: 'top' as NoteTier },
            { noteId: 'fig_leaf', percentage: 30, tier: 'heart' as NoteTier },
            { noteId: 'atlas_cedar', percentage: 20, tier: 'base' as NoteTier },
          ],
        };
      case 'mysterious':
        return {
          name: `${currentSign.name} Noctis Magica`,
          notes: [
            { noteId: 'blood_orange', percentage: 20, tier: 'top' as NoteTier },
            { noteId: 'cinnamon_bark', percentage: 40, tier: 'heart' as NoteTier },
            { noteId: 'cambodian_oud', percentage: 40, tier: 'base' as NoteTier },
          ],
        };
      default:
        return {
          name: `${currentSign.name} Signature`,
          notes: [
            { noteId: 'bergamot', percentage: 25, tier: 'top' as NoteTier },
            { noteId: 'florentine_iris', percentage: 45, tier: 'heart' as NoteTier },
            { noteId: 'mysore_sandalwood', percentage: 30, tier: 'base' as NoteTier },
          ],
        };
    }
  };

  const formula = getPersonalizedFormula();

  const handleApply = () => {
    onApplyBlend(formula.notes, formula.name, selectedSign, selectedOccasion);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md select-none animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#f8fbff] via-[#edf5ff] to-[#fefbf6] p-5 shadow-2xl text-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center text-xl shadow-md">
              🔮
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-blue-950 leading-tight">
                Rekomendasi Astrologi
              </h3>
              <span className="text-xs text-blue-900/70 font-mono">
                Kurasi Pribadi Berdasarkan Bintang
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-slate-300 bg-white text-slate-600 hover:text-slate-900 flex items-center justify-center text-sm shadow-sm"
          >
            ✕
          </button>
        </div>

        {/* 1. Zodiac Sign Carousel */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
            1. Pilih Zodiak Bintang:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
            {ZODIAC_SIGNS.map((sign) => {
              const isSelected = sign.id === selectedSign;
              return (
                <button
                  key={sign.id}
                  type="button"
                  onClick={() => setSelectedSign(sign.id)}
                  className={`min-w-[48px] h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all ${
                    isSelected
                      ? 'border-2 border-amber-500 bg-amber-400/30 text-blue-950 font-bold shadow-md scale-105'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                  title={sign.name}
                >
                  <span>{sign.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Personal Archetype / Vibe */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
            2. Karakter Diri Anda:
          </span>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { id: 'bold', icon: '👑', label: 'Bold' },
              { id: 'zen', icon: '🧘', label: 'Zen' },
              { id: 'romantic', icon: '🌹', label: 'Amor' },
              { id: 'adventurous', icon: '🌊', label: 'Liar' },
              { id: 'mysterious', icon: '🌙', label: 'Misteri' },
            ].map((v) => {
              const isSelected = selectedVibe === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVibe(v.id as any)}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-0.5 text-center transition-all ${
                    isSelected
                      ? 'border-2 border-blue-600 bg-blue-50 text-blue-950 shadow-sm scale-105'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <span className="text-xl">{v.icon}</span>
                  <span className="text-[10px] font-bold font-mono">{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Occasion Picker */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
            3. Target Penggunaan:
          </span>
          <div className="grid grid-cols-6 gap-1">
            {OCCASIONS_DATA.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-2 rounded-xl border flex items-center justify-center text-lg transition-all ${
                    isSelected
                      ? 'border-2 border-amber-500 bg-amber-100 text-blue-950 scale-105 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                  title={occ.title}
                >
                  {occ.symbol}
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommended Formula Card */}
        <div className="p-3.5 rounded-2xl border-2 border-amber-400 bg-white shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentSign.symbol}</span>
              <span className="font-cinzel text-sm font-bold text-blue-950">
                {formula.name}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-300">
              98% Harmoni
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {formula.notes.map((n) => {
              const note = getNoteById(n.noteId);
              return (
                <span
                  key={n.noteId}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800"
                >
                  <span>{note?.symbol || '✦'}</span>
                  <span>{note?.name || n.noteId}</span>
                  <span className="text-blue-900">{n.percentage}%</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Apply CTA */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full min-h-[46px] rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🧪</span>
          <span>Terapkan ke Meja Racik</span>
        </button>
      </div>
    </div>
  );
};
