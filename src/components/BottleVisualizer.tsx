import React from 'react';
import { NoteTier } from '../types';
import { calculateTierPercentages, getLiquidGradient } from '../utils/alchemicalEngine';

interface BottleVisualizerProps {
  notes: { noteId: string; percentage: number; tier: NoteTier }[];
  concentration: string;
  name?: string;
  harmonyScore?: number;
}

export const BottleVisualizer: React.FC<BottleVisualizerProps> = ({
  notes,
  concentration,
  name = 'AURA✦',
  harmonyScore = 92,
}) => {
  const { top, heart, base, total } = calculateTierPercentages(notes);
  const { gradient } = getLiquidGradient(notes);

  const fillPercent = Math.min(92, Math.max(15, total));

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-1">
      {/* Flacon Geometry */}
      <div className="relative w-36 h-48 sm:w-40 sm:h-52 flex flex-col items-center">
        {/* Sprayer Cap (Golden Brass) */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="w-8 h-5 rounded-t-sm bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 border border-amber-300 shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800 shadow-inner" />
          </div>
          {/* Collar ring */}
          <div className="w-10 h-2 mx-auto bg-gradient-to-r from-amber-500 via-amber-200 to-amber-500 border-x border-amber-300 shadow-sm" />
        </div>

        {/* Neck */}
        <div className="w-8 h-2 bg-gradient-to-b from-amber-300 to-transparent border-x border-amber-300/60" />

        {/* Glass Bottle Body with Facets (Bright Golden Blue Aesthetic) */}
        <div className="relative w-full flex-1 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-white/95 via-[#f0f7ff]/95 to-[#e0f2fe]/95 backdrop-blur-md shadow-xl shadow-blue-200/50 overflow-hidden flex flex-col justify-end p-1.5">
          {/* Outer Glass Rim Glow */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-sky-400/30 bg-gradient-to-tr from-transparent via-amber-300/10 to-sky-300/20" />

          {/* Liquid Container */}
          <div
            className="w-full rounded-xl relative overflow-hidden transition-all duration-700 ease-out shadow-inner"
            style={{
              height: `${fillPercent}%`,
              background: gradient,
            }}
          >
            {/* Liquid Surface Meniscus */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/60 blur-[1px] animate-pulse" />

            {/* Rising Cosmic Sparkles / Bubbles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <span className="absolute bottom-1 left-3 w-1 h-1 rounded-full bg-white/90 animate-ping duration-1000" />
              <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-amber-200/90 animate-pulse duration-700" />
            </div>

            {/* Subtle Tier markers */}
            {notes.length > 0 && (
              <div className="absolute inset-0 flex flex-col justify-between p-1 text-[8px] font-mono font-bold text-slate-800/70 pointer-events-none">
                {top > 0 && <span className="text-right pr-0.5">▲ {top}%</span>}
                {heart > 0 && <span className="text-right pr-0.5">♥ {heart}%</span>}
                {base > 0 && <span className="text-right pr-0.5">⚓ {base}%</span>}
              </div>
            )}
          </div>

          {/* Centered Golden Metal Label Plate */}
          <div className="absolute inset-x-2.5 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg bg-white/95 border border-amber-400 shadow-md text-center backdrop-blur-sm">
            <div className="text-[11px] tracking-widest uppercase text-blue-950 font-cinzel font-extrabold truncate flex items-center justify-center gap-1">
              <span>⚗️</span>
              <span>{name}</span>
            </div>
            <div className="flex items-center justify-center gap-1 mt-0.5 text-[9px] text-slate-600 font-mono">
              <span className="text-blue-800 font-bold">{concentration}</span>
              <span>·</span>
              <span className="text-amber-600 font-bold">{harmonyScore}% ✦</span>
            </div>
          </div>
        </div>

        {/* Bottle Solid Glass Base */}
        <div className="w-28 h-2 rounded-b-lg bg-gradient-to-r from-amber-400/40 via-sky-300 to-amber-400/40 border-b border-amber-300" />
      </div>
    </div>
  );
};
