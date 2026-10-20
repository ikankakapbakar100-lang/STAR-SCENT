import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: 'blend' | 'zodiac' | 'occasions' | 'grimoire') => void;
  onOpenCocoklogi: () => void;
  onOpenAstroRecommender: () => void;
  onShowIntro: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCocoklogi,
  onOpenAstroRecommender,
  onShowIntro,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-amber-300 shadow-sm">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Left: Replay Intro + Wordmark */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShowIntro}
            className="w-8 h-8 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 flex items-center justify-center text-sm active:scale-95 transition-all shadow-sm"
            title="Animasi Zodiac Wheel"
          >
            ↺
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('blend')}
            className="flex items-center gap-1.5 text-blue-950 font-cinzel font-extrabold text-base tracking-wider"
          >
            <span className="text-xl">⚗️</span>
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 bg-clip-text text-transparent">
              ASTRA
            </span>
          </button>
        </div>

        {/* Center/Right: Feature Icons */}
        <div className="flex items-center gap-1.5">
          {/* Cocoklogi Brand Twin */}
          <button
            type="button"
            onClick={onOpenCocoklogi}
            className="h-8 px-2 rounded-xl bg-blue-50 border border-blue-400 text-blue-900 flex items-center gap-1 text-xs font-mono font-bold shadow-sm active:scale-95 transition-all"
            title="Cocoklogi Brand Ternama"
          >
            <span className="text-sm">🪞</span>
            <span className="text-[10px] hidden xs:inline font-cinzel">Brand</span>
          </button>

          {/* Astro Recommender */}
          <button
            type="button"
            onClick={onOpenAstroRecommender}
            className="h-8 px-2 rounded-xl bg-amber-50 border border-amber-400 text-amber-900 flex items-center gap-1 text-xs font-mono font-bold shadow-sm active:scale-95 transition-all"
            title="Rekomendasi Astrologi"
          >
            <span className="text-sm">🔮</span>
            <span className="text-[10px] hidden xs:inline font-cinzel">Astro</span>
          </button>

          {/* Grimoire Saved Recipes */}
          <button
            type="button"
            onClick={() => setActiveTab('grimoire')}
            className={`relative w-8 h-8 rounded-xl border flex items-center justify-center text-sm shadow-sm transition-all ${
              activeTab === 'grimoire'
                ? 'bg-amber-400 text-slate-950 border-amber-500'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
            title="Grimoire Koleksi"
          >
            📜
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold text-white bg-blue-600 w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
