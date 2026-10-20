import React, { useState, useEffect } from 'react';
import { NoteTier } from '../types';
import { getNoteById } from '../utils/alchemicalEngine';

interface BlendingAnimationModalProps {
  isOpen: boolean;
  notes: { noteId: string; percentage: number; tier: NoteTier }[];
  blendName: string;
  harmonyScore: number;
  onFinishAnimation: () => void;
  onOpenCocoklogi: () => void;
  onOpenAstroRecommender: () => void;
  onSaveToGrimoire: () => void;
}

export const BlendingAnimationModal: React.FC<BlendingAnimationModalProps> = ({
  isOpen,
  notes,
  blendName,
  harmonyScore,
  onFinishAnimation,
  onOpenCocoklogi,
  onOpenAstroRecommender,
  onSaveToGrimoire,
}) => {
  const [phase, setPhase] = useState<'swirling' | 'crystallizing' | 'completed'>('swirling');

  useEffect(() => {
    if (!isOpen) {
      setPhase('swirling');
      return;
    }

    setPhase('swirling');
    const timer1 = setTimeout(() => {
      setPhase('crystallizing');
    }, 1400);

    const timer2 = setTimeout(() => {
      setPhase('completed');
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#f8fbff] via-[#edf5ff] to-[#fefbf6] p-6 shadow-2xl text-slate-800 text-center flex flex-col items-center">
        {/* Phase 1 & 2: Swirling & Crystallizing Alchemical Animation */}
        {phase !== 'completed' ? (
          <div className="py-8 flex flex-col items-center space-y-6">
            {/* Spinning Golden Alchemical Circle */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-[spin_8s_linear_infinite] shadow-[0_0_25px_rgba(245,158,11,0.4)]" />
              <div className="absolute inset-2 rounded-full border border-dashed border-sky-400 animate-[spin_5s_linear_infinite_reverse]" />

              {/* Orbiting Ingredient Note Icons */}
              {notes.map((item, idx) => {
                const note = getNoteById(item.noteId);
                const angle = (idx / Math.max(1, notes.length)) * 2 * Math.PI;
                const r = phase === 'swirling' ? 52 : 18; // Inward collapse
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div
                    key={item.noteId}
                    className="absolute w-8 h-8 rounded-full bg-white/90 border border-amber-400/80 shadow-md flex items-center justify-center text-lg transition-all duration-700"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    {note?.symbol || '✨'}
                  </div>
                );
              })}

              {/* Core Flacon Flask */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-300 to-amber-200 border-2 border-amber-500 flex items-center justify-center text-3xl shadow-lg animate-pulse">
                ⚗️
              </div>
            </div>

            {/* Dynamic Status Icons */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-2xl animate-bounce">
                <span>✨</span>
                <span>💧</span>
                <span>🔮</span>
              </div>
              <div className="font-mono text-xs font-bold text-blue-900 tracking-wider">
                {phase === 'swirling' ? 'FUSI MOLEKUL KOSMIK...' : 'KRISTALISASI AROMA...'}
              </div>
            </div>
          </div>
        ) : (
          /* Phase 3: Completed Blend Card with Cocoklogi & Astro Recommendation Icons */
          <div className="w-full space-y-4 py-2 animate-fade-in">
            {/* Top Badge */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="font-cinzel text-lg font-bold text-blue-950 uppercase tracking-widest">
                {blendName}
              </span>
              <span className="text-2xl">✨</span>
            </div>

            {/* Visual Flacon Badge */}
            <div className="relative w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-amber-300 via-sky-200 to-amber-100 border-2 border-amber-400 shadow-xl flex flex-col items-center justify-center p-2">
              <span className="text-4xl filter drop-shadow">💎</span>
              <span className="text-xs font-mono font-bold text-blue-900 mt-1">
                {harmonyScore}% ✦
              </span>
            </div>

            {/* Ingredient notes chips */}
            <div className="flex flex-wrap justify-center gap-1.5 py-1">
              {notes.map((n) => {
                const note = getNoteById(n.noteId);
                return (
                  <span
                    key={n.noteId}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-amber-300/80 text-xs font-mono font-semibold text-slate-800 shadow-sm"
                  >
                    <span>{note?.symbol || '✦'}</span>
                    <span className="text-blue-900">{n.percentage}%</span>
                  </span>
                );
              })}
            </div>

            {/* Primary Action Buttons: Cocoklogi & Astro Recommender */}
            <div className="pt-2 space-y-2.5 w-full">
              {/* Cocoklogi Brand Ternama Button */}
              <button
                type="button"
                onClick={onOpenCocoklogi}
                className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-500 hover:to-sky-500 text-white font-cinzel font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-xl">🪞</span>
                <span>Cocoklogi Brand Ternama</span>
                <span className="text-xs">➜</span>
              </button>

              {/* Astro & Personal Recommender Button */}
              <button
                type="button"
                onClick={onOpenAstroRecommender}
                className="w-full min-h-[46px] rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cinzel font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-lg">🔮</span>
                <span>Rekomendasi Astrologi</span>
              </button>

              {/* Secondary Actions: Save & Dismiss */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={onSaveToGrimoire}
                  className="flex-1 min-h-[42px] rounded-xl border border-amber-400/80 bg-amber-50 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-100 active:scale-95 transition-all"
                >
                  <span>💾</span>
                  <span>Simpan</span>
                </button>
                <button
                  type="button"
                  onClick={onFinishAnimation}
                  className="w-12 min-h-[42px] rounded-xl border border-slate-300 bg-white text-slate-600 font-semibold text-sm flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                  title="Tutup"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
