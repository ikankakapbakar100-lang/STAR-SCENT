import React from 'react';
import { NoteTier, OccasionType, ZodiacSignId } from '../types';
import { getNoteById, getZodiacById, getOccasionById } from '../utils/alchemicalEngine';
import { BottleVisualizer } from './BottleVisualizer';

interface FinishedBlendViewProps {
  blendName: string;
  notes: { noteId: string; percentage: number; tier: NoteTier }[];
  zodiacSign: ZodiacSignId;
  occasion: OccasionType;
  concentration: string;
  harmonyScore: number;
  onOpenCocoklogi: () => void;
  onOpenNoteRecommendations: () => void;
  onOpenZodiacBrandRecommendations: () => void;
  onSaveToGrimoire: () => void;
  onRemixOrBack: () => void;
}

export const FinishedBlendView: React.FC<FinishedBlendViewProps> = ({
  blendName,
  notes,
  zodiacSign,
  occasion,
  concentration,
  harmonyScore,
  onOpenCocoklogi,
  onOpenNoteRecommendations,
  onOpenZodiacBrandRecommendations,
  onSaveToGrimoire,
  onRemixOrBack,
}) => {
  const zodiac = getZodiacById(zodiacSign);
  const occ = getOccasionById(occasion);

  return (
    <div className="w-full max-w-md mx-auto space-y-3.5 pb-4 select-none animate-fade-in">
      {/* Top Bar with Remix/Back and Save */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-white/95 border border-amber-300 shadow-sm">
        <button
          type="button"
          onClick={onRemixOrBack}
          className="h-8 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
        >
          <span>↺</span>
          <span>Ubah Racikan</span>
        </button>

        <div className="flex items-center gap-1.5 font-cinzel text-xs font-bold text-blue-950">
          <span>{zodiac?.symbol}</span>
          <span>{zodiac?.name}</span>
          <span>·</span>
          <span>{occ?.symbol}</span>
        </div>

        <button
          type="button"
          onClick={onSaveToGrimoire}
          className="h-8 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <span>💾</span>
          <span>Simpan</span>
        </button>
      </div>

      {/* Main Finished Master Flacon Card (Bright Golden Blue) */}
      <div className="rounded-3xl border-2 border-amber-400/80 bg-gradient-to-b from-white via-[#f0f7ff] to-[#fcfaff] p-4 shadow-xl text-center space-y-3">
        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-mono font-bold mb-1">
            <span>✨</span>
            <span>RACIKAN ALKIMIA SELESAI</span>
            <span>✨</span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-blue-950 tracking-wider">
            {blendName}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-600 mt-0.5">
            <span className="text-blue-800">{concentration}</span>
            <span>·</span>
            <span className="text-amber-600">{harmonyScore}% Harmoni Kosmik ✦</span>
          </div>
        </div>

        {/* Clean Visual Flacon without spray tester button */}
        <div className="py-1">
          <BottleVisualizer
            notes={notes}
            concentration={concentration}
            name={blendName}
            harmonyScore={harmonyScore}
          />
        </div>

        {/* Selected Notes Summary Badges */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
          {notes.map((item) => {
            const note = getNoteById(item.noteId);
            return (
              <span
                key={item.noteId}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-amber-300 text-xs font-mono font-bold text-slate-800 shadow-sm"
              >
                <span>{note?.symbol || '✦'}</span>
                <span>{note?.name.split(' ')[0]}</span>
                <span className="text-blue-900">{item.percentage}%</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* THE 3 CORE REQUESTED FEATURE ICONS */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block px-1">
          Jelajahi Karakter Racikan Anda:
        </span>

        {/* 1. Icon Cocoklogi Brand Ternama */}
        <button
          type="button"
          onClick={onOpenCocoklogi}
          className="w-full min-h-[52px] p-3 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-500 hover:to-sky-500 text-white font-cinzel font-bold text-sm shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              🪞
            </div>
            <div className="text-left">
              <span className="block text-sm leading-tight text-white font-bold font-cinzel">
                Cocoklogi Brand Ternama
              </span>
              <span className="block text-[11px] text-sky-100 font-sans font-normal">
                Cek kemiripan racikan dengan Dior, Chanel, Creed, dll.
              </span>
            </div>
          </div>
          <span className="text-xl group-hover:translate-x-1 transition-transform">➜</span>
        </button>

        {/* 2. Icon Rekomendasi Note Penyempurna */}
        <button
          type="button"
          onClick={onOpenNoteRecommendations}
          className="w-full min-h-[52px] p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cinzel font-bold text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center text-2xl">
              💡
            </div>
            <div className="text-left">
              <span className="block text-sm leading-tight text-slate-950 font-bold font-cinzel">
                Rekomendasi Note Aroma
              </span>
              <span className="block text-[11px] text-slate-800 font-sans font-normal">
                Saran bahan pelengkap untuk memperkuat sillage & karakter.
              </span>
            </div>
          </div>
          <span className="text-xl group-hover:translate-x-1 transition-transform">➜</span>
        </button>

        {/* 3. Icon Rekomendasi Brand Lain Sesuai Astrologi */}
        <button
          type="button"
          onClick={onOpenZodiacBrandRecommendations}
          className="w-full min-h-[52px] p-3 rounded-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-800 hover:from-indigo-600 hover:to-purple-600 text-white font-cinzel font-bold text-sm shadow-md shadow-purple-600/20 active:scale-95 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              🔮
            </div>
            <div className="text-left">
              <span className="block text-sm leading-tight text-white font-bold font-cinzel">
                Parfum Brand Sesuai Astrologi
              </span>
              <span className="block text-[11px] text-purple-100 font-sans font-normal">
                Koleksi brand dunia paling selaras zodiak {zodiac?.name} ({zodiac?.symbol}).
              </span>
            </div>
          </div>
          <span className="text-xl group-hover:translate-x-1 transition-transform">➜</span>
        </button>
      </div>
    </div>
  );
};
