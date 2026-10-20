import React, { useState } from 'react';
import { OCCASIONS_DATA } from '../data/occasionsData';
import { OccasionType } from '../types';

interface OccasionExplorerProps {
  selectedOccasion: OccasionType;
  onSelectOccasion: (occ: OccasionType) => void;
  onStartBlendForOccasion: (occ: OccasionType) => void;
}

export const OccasionExplorer: React.FC<OccasionExplorerProps> = ({
  selectedOccasion,
  onSelectOccasion,
  onStartBlendForOccasion,
}) => {
  const [activeOccId, setActiveOccId] = useState<OccasionType>(selectedOccasion);

  const activeOcc = OCCASIONS_DATA.find((o) => o.id === activeOccId) || OCCASIONS_DATA[0];

  const renderStars = (rating: number, activeColor: string) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xs ${star <= rating ? activeColor : 'text-slate-300'}`}
          >
            ✦
          </span>
        ))}
      </div>
    );
  };

  const getOccasionIconIngredients = (id: OccasionType) => {
    switch (id) {
      case 'special_occasion':
        return ['👑', '🪵', '☀️', '🌹', '🏺'];
      case 'outdoor_sport':
        return ['🌊', '🌿', '🍊', '🌾', '🌲'];
      case 'indoor_sport':
        return ['☁️', '🍵', '🍋', '🪻', '🍃'];
      case 'day':
        return ['🍋', '✨', '🍃', '🌲', '🍵'];
      case 'evening':
        return ['🌱', '⚜️', '🌰', '🪵', '🌹'];
      case 'night':
        return ['🧁', '🍂', '🌸', '👑', '🏺'];
      default:
        return ['✨', '💎', '🌸', '🪵'];
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3 pb-4 select-none">
      {/* 6 Occasion Icons Bar */}
      <div className="grid grid-cols-6 gap-1.5">
        {OCCASIONS_DATA.map((occ) => {
          const isSelected = occ.id === activeOccId;
          return (
            <button
              key={occ.id}
              type="button"
              onClick={() => {
                setActiveOccId(occ.id);
                onSelectOccasion(occ.id);
              }}
              className={`p-2 rounded-2xl border flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 min-h-[58px] ${
                isSelected
                  ? 'border-2 border-blue-600 bg-blue-100 text-blue-950 font-bold shadow-md scale-105'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
              title={occ.title}
            >
              <span className="text-2xl">{occ.symbol}</span>
              <span className="text-[10px] font-mono text-blue-900 font-bold">
                {occ.sillageRating}📡
              </span>
            </button>
          );
        })}
      </div>

      {/* Occasion Spotlight Display (Bright Golden Blue) */}
      <div className="rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-white via-[#f0f7ff] to-[#fcfaff] p-4 shadow-xl space-y-3">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-sm">
              {activeOcc.symbol}
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-blue-950">
                {activeOcc.title}
              </h3>
              <span className="text-[11px] text-slate-500 font-sans block truncate">
                {activeOcc.tagline}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onStartBlendForOccasion(activeOcc.id)}
            className="min-h-[38px] px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span>⚗️</span>
            <span>Racik</span>
          </button>
        </div>

        {/* 4 Technical Metric Pillars */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-mono">Konsentrasi</span>
            <span className="font-mono font-bold text-amber-700 mt-0.5 truncate">
              {activeOcc.idealConcentration}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-mono">Proyeksi (Sillage)</span>
            <div className="mt-1">{renderStars(activeOcc.sillageRating, 'text-amber-500')}</div>
          </div>

          <div className="p-2.5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-mono">Ketahanan</span>
            <div className="mt-1">{renderStars(activeOcc.longevityRating, 'text-blue-600')}</div>
          </div>

          <div className="p-2.5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-mono">Sensitivitas Suhu</span>
            <span className="font-mono font-bold text-slate-800 mt-0.5">
              {activeOcc.temperatureAffinity === 'Hot' && '🔥 Tahan Panas'}
              {activeOcc.temperatureAffinity === 'Cool' && '❄️ Udara Sejuk'}
              {activeOcc.temperatureAffinity === 'Breeze' && '💨 Angin Senja'}
              {activeOcc.temperatureAffinity === 'Warm' && '☀️ Siang Hangat'}
              {activeOcc.temperatureAffinity === 'Any' && '✨ Segala Suhu'}
            </span>
          </div>
        </div>

        {/* Perfumer Rule */}
        <div className="p-3 rounded-2xl border border-amber-300/80 bg-amber-50/70 text-xs text-slate-800 leading-relaxed font-sans">
          <span className="font-bold text-amber-900 block font-cinzel mb-1">
            ⚖️ Kaidah Ahli Parfum:
          </span>
          {activeOcc.perfumerRule}
        </div>

        {/* Botanical Ingredients Icons */}
        <div className="flex items-center justify-between p-2 rounded-2xl bg-white border border-slate-200">
          <span className="text-xs font-mono font-bold text-slate-500">Akor:</span>
          <div className="flex items-center gap-1.5">
            {getOccasionIconIngredients(activeOcc.id).map((icon, idx) => (
              <span
                key={idx}
                className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg shadow-sm"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
