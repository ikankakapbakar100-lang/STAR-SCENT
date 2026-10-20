import React, { useState } from 'react';
import { ZODIAC_BRAND_RECOMMENDATIONS } from '../data/zodiacBrandData';
import { ZodiacSignId } from '../types';

interface ZodiacBrandRecommendationModalProps {
  isOpen: boolean;
  userZodiacSign: ZodiacSignId;
  onClose: () => void;
  onApplyInspiration?: (brandName: string, perfumeName: string) => void;
}

export const ZodiacBrandRecommendationModal: React.FC<ZodiacBrandRecommendationModalProps> = ({
  isOpen,
  userZodiacSign,
  onClose,
  onApplyInspiration,
}) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignId>(userZodiacSign);

  if (!isOpen) return null;

  const currentRec =
    ZODIAC_BRAND_RECOMMENDATIONS.find((r) => r.zodiacId === selectedSign) ||
    ZODIAC_BRAND_RECOMMENDATIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md select-none animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-[#f8fbff] via-[#edf5ff] to-[#fefbf6] p-5 shadow-2xl text-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center text-xl shadow-md">
              🔮
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-blue-950 leading-tight">
                Rekomendasi Parfum Astrologi
              </h3>
              <span className="text-xs text-blue-900/70 font-mono">
                Brand Dunia Selaras Karakter {currentRec.zodiacName} ({currentRec.zodiacSymbol})
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

        {/* Zodiac Picker Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x px-1">
          {ZODIAC_BRAND_RECOMMENDATIONS.map((item) => {
            const isSelected = item.zodiacId === selectedSign;
            return (
              <button
                key={item.zodiacId}
                type="button"
                onClick={() => setSelectedSign(item.zodiacId)}
                className={`min-w-[46px] h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all ${
                  isSelected
                    ? 'border-2 border-blue-600 bg-blue-100 text-blue-950 font-bold shadow-md scale-105'
                    : 'border border-slate-200 bg-white text-slate-600'
                }`}
                title={item.zodiacName}
              >
                <span>{item.zodiacSymbol}</span>
              </button>
            );
          })}
        </div>

        {/* Curated Brand Perfumes for this sign */}
        <div className="space-y-3">
          {currentRec.curatedPerfumes.map((perfume, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border-2 border-amber-300/90 bg-white shadow-sm space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{perfume.symbol}</span>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-900 block">
                      {perfume.brand}
                    </span>
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {perfume.perfumeName}
                    </h4>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-mono font-bold text-amber-900 shrink-0">
                  {currentRec.zodiacSymbol} {currentRec.element}
                </span>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed font-sans bg-sky-50/70 p-2 rounded-xl border border-sky-200">
                <span className="font-bold text-blue-900 block mb-0.5 font-cinzel">
                  ✦ Resonansi Energi:
                </span>
                {perfume.astrologicalHarmonyReason}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-1 pt-1 text-[10px] font-mono">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-slate-500">Akor:</span>
                  {perfume.keyNotes.map((k, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                {onApplyInspiration && (
                  <button
                    type="button"
                    onClick={() => {
                      onApplyInspiration(perfume.brand, perfume.perfumeName);
                      onClose();
                    }}
                    className="px-2 py-0.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-blue-950 font-bold text-[10px] active:scale-95 transition-all cursor-pointer"
                  >
                    ✦ Racik Ini
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-cinzel font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            ✓ Kembali ke Racikan
          </button>
        </div>
      </div>
    </div>
  );
};
