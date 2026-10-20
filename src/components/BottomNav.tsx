import React from 'react';

interface BottomNavProps {
  activeTab: 'blend' | 'zodiac' | 'occasions' | 'grimoire';
  setActiveTab: (tab: 'blend' | 'zodiac' | 'occasions' | 'grimoire') => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-300 shadow-lg pb-safe">
      <div className="grid grid-cols-4 items-center h-14 max-w-md mx-auto px-4">
        {/* Tab 1: Blend Studio */}
        <button
          type="button"
          onClick={() => setActiveTab('blend')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-all ${
            activeTab === 'blend'
              ? 'bg-amber-100 text-amber-800 scale-110 shadow-sm border border-amber-300 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          title="Meja Racik"
        >
          <span className="text-2xl">⚗️</span>
        </button>

        {/* Tab 2: Zodiac Discovery */}
        <button
          type="button"
          onClick={() => setActiveTab('zodiac')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-all ${
            activeTab === 'zodiac'
              ? 'bg-amber-100 text-amber-800 scale-110 shadow-sm border border-amber-300 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          title="12 Zodiak"
        >
          <span className="text-2xl">🔮</span>
        </button>

        {/* Tab 3: Occasion Matrix */}
        <button
          type="button"
          onClick={() => setActiveTab('occasions')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-all ${
            activeTab === 'occasions'
              ? 'bg-blue-100 text-blue-800 scale-110 shadow-sm border border-blue-300 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          title="Fungsi Acara"
        >
          <span className="text-2xl">🎯</span>
        </button>

        {/* Tab 4: Grimoire Collection */}
        <button
          type="button"
          onClick={() => setActiveTab('grimoire')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-all ${
            activeTab === 'grimoire'
              ? 'bg-amber-100 text-amber-800 scale-110 shadow-sm border border-amber-300 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          title="Grimoire"
        >
          <span className="text-2xl">📜</span>
          {savedCount > 0 && (
            <span className="absolute top-1 right-2 text-[9px] font-mono font-bold text-white bg-blue-600 w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
