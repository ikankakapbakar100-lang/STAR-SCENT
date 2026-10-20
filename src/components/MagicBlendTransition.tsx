import React, { useEffect } from 'react';

interface MagicBlendTransitionProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const MagicBlendTransition: React.FC<MagicBlendTransitionProps> = ({
  isOpen,
  onComplete,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#0c1228]/85 backdrop-blur-xl select-none animate-fade-in text-center">
      {/* Radiant Glowing Background Core */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[380px] h-[380px] bg-gradient-to-tr from-amber-400/40 via-sky-400/40 to-blue-600/30 rounded-full blur-[80px] animate-pulse" />
      </div>

      {/* Magical Alchemical Vortex */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Outer Rotating Astrolabe Golden Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-[spin_4s_linear_infinite] shadow-[0_0_35px_rgba(245,158,11,0.6)]" />
        <div className="absolute inset-3 rounded-full border border-dashed border-sky-400 animate-[spin_3s_linear_infinite_reverse]" />
        <div className="absolute inset-7 rounded-full border border-blue-400 animate-[spin_2s_linear_infinite]" />

        {/* Floating Sparks */}
        <span className="absolute top-2 left-6 text-xl animate-bounce text-amber-300">✨</span>
        <span className="absolute bottom-4 right-6 text-2xl animate-pulse text-sky-300">💧</span>
        <span className="absolute top-8 right-2 text-lg animate-ping text-white">✦</span>

        {/* Central Magical Flask */}
        <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-sky-300 to-amber-200 border-2 border-white shadow-[0_0_30px_rgba(245,158,11,0.8)] flex items-center justify-center text-4xl animate-bounce">
          ⚗️
        </div>
      </div>

      {/* Magical Text */}
      <div className="relative z-10 mt-6 space-y-2">
        <h3 className="font-cinzel text-xl font-bold text-amber-200 tracking-widest drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]">
          MENYATUKAN ESSENSI...
        </h3>
        <p className="text-xs text-sky-200 font-mono tracking-wider animate-pulse">
          Fusi Alkimia Bintang & Molekul Aroma Selesai
        </p>
      </div>
    </div>
  );
};
