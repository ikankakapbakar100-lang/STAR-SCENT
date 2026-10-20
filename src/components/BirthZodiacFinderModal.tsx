import React, { useState } from 'react';
import { ZODIAC_SIGNS } from '../data/astrologyData';
import { ZodiacSignId } from '../types';

interface BirthZodiacFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSignForLab: (signId: ZodiacSignId) => void;
}

export const BirthZodiacFinderModal: React.FC<BirthZodiacFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectSignForLab,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(15);

  if (!isOpen) return null;

  const calculateSignFromDate = (m: number, d: number): ZodiacSignId => {
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'aries';
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'taurus';
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'gemini';
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'cancer';
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'leo';
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'virgo';
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'libra';
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'scorpio';
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'sagittarius';
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'capricorn';
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'aquarius';
    return 'pisces';
  };

  const detectedSignId = calculateSignFromDate(selectedMonth, selectedDay);
  const detectedSign = ZODIAC_SIGNS.find((s) => s.id === detectedSignId) || ZODIAC_SIGNS[0];

  const handleApplyToLab = () => {
    onSelectSignForLab(detectedSignId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-sm rounded-3xl border border-amber-400/40 bg-gradient-to-b from-[#13153d] via-[#0d0f2f] to-[#080918] p-5 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-white flex items-center justify-center text-sm"
        >
          ✕
        </button>

        {/* Modal Header Icon */}
        <div className="text-center space-y-1 mb-4">
          <span className="text-4xl block animate-pulse">✨</span>
          <div className="flex items-center justify-center gap-2 text-xl font-mono text-amber-300">
            <span>📅</span>
            <span>➜</span>
            <span>🔮</span>
          </div>
        </div>

        {/* Date Selector Controls (Numeric) */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#090b24] border border-slate-800 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
              <span>🗓️</span>
              <span>MM</span>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full bg-[#111335] border border-purple-500/40 rounded-xl px-2.5 py-2 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:border-amber-400"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m < 10 ? `0${m}` : m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
              <span>☀️</span>
              <span>DD</span>
            </div>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full bg-[#111335] border border-purple-500/40 rounded-xl px-2.5 py-2 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:border-amber-400"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d < 10 ? `0${d}` : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Detected Zodiac Result Card (Pure Glyphs) */}
        <div className="rounded-2xl border border-amber-400/40 bg-[#0e1138]/90 p-4 space-y-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]">
              {detectedSign.symbol}
            </span>
            <div className="flex flex-col items-start gap-1">
              <span className="text-lg font-mono font-bold text-amber-200">
                {detectedSign.elementSymbol} {detectedSign.planetSymbol}
              </span>
              <span className="text-xs font-mono text-purple-300">
                {detectedSign.dates}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800">
            {detectedSign.signatureFormula.top.slice(0, 1).map((id) => (
              <span key={id} className="text-2xl">🍋</span>
            ))}
            {detectedSign.signatureFormula.heart.slice(0, 1).map((id) => (
              <span key={id} className="text-2xl">🌹</span>
            ))}
            {detectedSign.signatureFormula.base.slice(0, 1).map((id) => (
              <span key={id} className="text-2xl">🪵</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleApplyToLab}
            className="w-full min-h-[46px] rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>🧪</span>
            <span>➜</span>
            <span>{detectedSign.symbol}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
