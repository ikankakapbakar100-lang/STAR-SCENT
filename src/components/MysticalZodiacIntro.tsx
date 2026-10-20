import React, { useState } from 'react';

interface MysticalZodiacIntroProps {
  onStart: () => void;
}

export const MysticalZodiacIntro: React.FC<MysticalZodiacIntroProps> = ({ onStart }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const zodiacSymbols = [
    { glyph: '♈', deg: 0 },
    { glyph: '♉', deg: 30 },
    { glyph: '♊', deg: 60 },
    { glyph: '♋', deg: 90 },
    { glyph: '♌', deg: 120 },
    { glyph: '♍', deg: 150 },
    { glyph: '♎', deg: 180 },
    { glyph: '♏', deg: 210 },
    { glyph: '♐', deg: 240 },
    { glyph: '♑', deg: 270 },
    { glyph: '♒', deg: 300 },
    { glyph: '♓', deg: 330 },
  ];

  const handleStartClick = () => {
    setIsTransitioning(true);
    // Smooth cinematic portal transition into blend studio
    setTimeout(() => {
      onStart();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 overflow-hidden golden-blue-intro text-slate-800 select-none transition-all duration-1000 ${
        isTransitioning
          ? 'scale-125 opacity-0 blur-md pointer-events-none'
          : 'scale-100 opacity-100'
      }`}
    >
      {/* Radiant Bright Golden Blue Solar Aura Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Luminous Sky Blue Sky Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-sky-300/40 rounded-full blur-[90px] animate-pulse" />
        {/* Radiant Solar Gold Amber Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-amber-300/50 rounded-full blur-[70px]" />
        {/* Soft Cobalt Aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-blue-400/25 rounded-full blur-[80px]" />

        {/* Ambient golden sun speckles */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
      </div>

      {/* Top Astrological Glyphs Bar */}
      <div className="relative z-10 flex items-center justify-center gap-3 text-sm text-blue-900/70 font-mono tracking-widest pt-2">
        <span>☉</span>
        <span>·</span>
        <span>☽</span>
        <span>·</span>
        <span>♀</span>
        <span>·</span>
        <span>♂</span>
        <span>·</span>
        <span>♃</span>
      </div>

      {/* Mystical Zodiac Wheel (Bright Golden-Blue Rotating Astrolabe) */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-sm my-auto">
        <div className="relative w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
          {/* Outer Sun Rays & Golden Bevel */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 animate-[spin_60s_linear_infinite] shadow-[0_0_35px_rgba(245,158,11,0.25)]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-blue-500/40 animate-[spin_40s_linear_infinite_reverse]" />

          {/* Golden Zodiac Glyphs Orbit Ring */}
          <div className="absolute inset-6 rounded-full border border-amber-500/50 bg-white/30 backdrop-blur-sm animate-[spin_80s_linear_infinite]">
            {zodiacSymbols.map((item, idx) => {
              const radius = 114;
              const angleRad = (item.deg * Math.PI) / 180;
              const x = Math.sin(angleRad) * radius;
              const y = -Math.cos(angleRad) * radius;
              return (
                <div
                  key={idx}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-blue-950 font-bold"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <span className="text-base sm:text-lg drop-shadow-[0_1px_4px_rgba(245,158,11,0.5)]">
                    {item.glyph}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Middle Sacred Geometry Ring (Bright Sky & Gold) */}
          <div className="absolute inset-16 rounded-full border border-sky-400/50 bg-sky-100/30 backdrop-blur-[2px] animate-[spin_30s_linear_infinite_reverse] flex items-center justify-center">
            <svg
              className="w-full h-full text-amber-500/40"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <circle cx="50" cy="50" r="48" stroke="rgba(217,119,6,0.5)" strokeDasharray="2 3" />
              <circle cx="50" cy="50" r="32" stroke="rgba(37,99,235,0.4)" />
              <polygon
                points="50,2 62,38 98,50 62,62 50,98 38,62 2,50 38,38"
                stroke="rgba(217,119,6,0.6)"
              />
              <polygon
                points="50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40"
                stroke="rgba(2,132,199,0.5)"
              />
            </svg>
          </div>

          {/* Inner Mystical Orbit Ring */}
          <div className="absolute inset-24 rounded-full border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] animate-[spin_18s_linear_infinite]" />

          {/* Central Pulsating Golden Perfume Flacon Core */}
          <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-sky-300 border-2 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.7)] flex items-center justify-center backdrop-blur-md animate-pulse">
            <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.8)]">
              ⚗️
            </span>
          </div>

          {/* Outer Pulsing Golden-Blue Aura Ring */}
          <div className="absolute -inset-4 rounded-full border border-sky-400/30 animate-ping duration-[3000ms] pointer-events-none" />
        </div>
      </div>

      {/* Bottom Section with the Requested Button: "Start Scent" */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-3 pb-6">
        <div className="relative w-full">
          {/* Glowing Aura behind button */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-sky-400 to-amber-500 rounded-2xl blur-md opacity-80 group-hover:opacity-100 transition animate-pulse" />

          {/* Button with icon and exact text "Start Scent" */}
          <button
            type="button"
            onClick={handleStartClick}
            disabled={isTransitioning}
            className="relative w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-sky-500 hover:from-amber-400 hover:to-sky-400 border-2 border-white text-slate-950 font-cinzel font-extrabold text-base tracking-widest uppercase shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform text-white drop-shadow-sm">
              ✨
            </span>
            <span className="tracking-[0.25em] text-slate-950 font-bold">Start Scent</span>
            <span className="text-xl group-hover:-rotate-12 transition-transform text-blue-950 drop-shadow-sm">
              🔮
            </span>
          </button>
        </div>

        {/* Minimal symbols footer */}
        <div className="flex items-center gap-3 text-sm text-blue-900/60 pt-1 font-mono">
          <span>♈</span>
          <span>♌</span>
          <span>♐</span>
          <span>·</span>
          <span>♒</span>
          <span>♊</span>
          <span>♎</span>
        </div>
      </div>
    </div>
  );
};
