import React from 'react';
import { ZODIAC_SIGNS } from '../data/astrologyData';
import { getNoteById } from '../utils/alchemicalEngine';
import { ZodiacSignId } from '../types';

interface ZodiacExplorerProps {
  selectedSignId: ZodiacSignId;
  onSelectSign: (signId: ZodiacSignId) => void;
  onLoadIntoLab: (signId: ZodiacSignId) => void;
  cosmicImage: string;
}

export const ZodiacExplorer: React.FC<ZodiacExplorerProps> = ({
  selectedSignId,
  onSelectSign,
  onLoadIntoLab,
  cosmicImage,
}) => {
  const currentSign = ZODIAC_SIGNS.find((s) => s.id === selectedSignId) || ZODIAC_SIGNS[0];

  const getElementBadgeColor = (el: string) => {
    switch (el) {
      case 'fire':
        return 'text-amber-800 border-amber-400 bg-amber-50';
      case 'water':
        return 'text-blue-800 border-blue-400 bg-blue-50';
      case 'air':
        return 'text-sky-800 border-sky-400 bg-sky-50';
      case 'earth':
        return 'text-emerald-800 border-emerald-400 bg-emerald-50';
      default:
        return 'text-amber-800 border-amber-400 bg-amber-50';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3 pb-4 select-none">
      {/* 12 Zodiac Glyphs Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x px-1">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = sign.id === selectedSignId;
          return (
            <button
              key={sign.id}
              type="button"
              onClick={() => onSelectSign(sign.id)}
              className={`flex-shrink-0 min-w-[50px] min-h-[50px] py-1 px-1.5 rounded-2xl border flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 snap-start ${
                isSelected
                  ? 'border-2 border-amber-500 bg-amber-100 text-blue-950 shadow-md shadow-amber-400/30 scale-105 font-bold'
                  : 'border-slate-200 bg-white hover:border-sky-300 text-slate-600'
              }`}
              title={sign.name}
            >
              <span className="text-xl leading-none">{sign.symbol}</span>
              <span className="text-[10px] leading-none mt-0.5">{sign.elementSymbol}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Zodiac Spotlight Card (Bright Golden Blue) */}
      <div className="rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-white via-[#f0f7ff] to-[#fcfaff] p-4 shadow-xl space-y-3">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="text-4xl text-amber-500 font-bold drop-shadow-sm">
              {currentSign.symbol}
            </span>
            <div>
              <h3 className="font-cinzel text-base font-bold text-blue-950">
                {currentSign.name}
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                {currentSign.dates}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-xl border text-xs font-mono font-bold ${getElementBadgeColor(
                currentSign.element
              )}`}
            >
              {currentSign.elementSymbol}
            </span>
            <span className="px-2 py-0.5 rounded-xl border border-sky-400 bg-sky-50 text-blue-950 text-xs font-mono font-bold">
              {currentSign.planetSymbol}
            </span>
          </div>
        </div>

        {/* Visual Flacon Thumbnail & Load CTA */}
        <div className="flex items-center gap-3">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md shrink-0">
            <img
              src={cosmicImage}
              alt={currentSign.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="text-xs text-slate-700 italic border-l-2 border-amber-400 pl-2 leading-relaxed">
              "{currentSign.signatureFormula.description}"
            </div>

            <button
              type="button"
              onClick={() => onLoadIntoLab(currentSign.id)}
              className="w-full min-h-[38px] rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>⚗️</span>
              <span>Racik Formula {currentSign.name}</span>
            </button>
          </div>
        </div>

        {/* Olfactory Pyramid (Per Icon: Top ▲, Heart ♥, Base ⚓) */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-2.5 space-y-2">
          {/* Top */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
              ▲
            </span>
            <div className="flex flex-wrap gap-1 flex-1">
              {currentSign.signatureFormula.top.map((id) => {
                const note = getNoteById(id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-mono font-bold"
                  >
                    <span>{note?.symbol || '✨'}</span>
                    <span>{note?.name.split(' ')[0]}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Heart */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded-lg bg-sky-100 text-blue-800 font-bold flex items-center justify-center text-[10px]">
              ♥
            </span>
            <div className="flex flex-wrap gap-1 flex-1">
              {currentSign.signatureFormula.heart.map((id) => {
                const note = getNoteById(id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-50 border border-sky-200 text-blue-900 text-[11px] font-mono font-bold"
                  >
                    <span>{note?.symbol || '🌸'}</span>
                    <span>{note?.name.split(' ')[0]}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Base */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-[10px]">
              ⚓
            </span>
            <div className="flex flex-wrap gap-1 flex-1">
              {currentSign.signatureFormula.base.map((id) => {
                const note = getNoteById(id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 text-[11px] font-mono font-bold"
                  >
                    <span>{note?.symbol || '🪵'}</span>
                    <span>{note?.name.split(' ')[0]}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
