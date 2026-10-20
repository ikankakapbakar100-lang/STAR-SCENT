import React from 'react';
import { findBrandTwins } from '../data/cocoklogiData';
import { NoteTier } from '../types';
import { getNoteById } from '../utils/alchemicalEngine';

interface CocoklogiModalProps {
  isOpen: boolean;
  notes: { noteId: string; percentage: number; tier: NoteTier }[];
  blendName: string;
  onClose: () => void;
  onApplyInspiration?: (noteIds: string[], name: string) => void;
}

export const CocoklogiModal: React.FC<CocoklogiModalProps> = ({
  isOpen,
  notes,
  blendName,
  onClose,
  onApplyInspiration,
}) => {
  if (!isOpen) return null;

  const noteIds = notes.map((n) => n.noteId);
  const matches = findBrandTwins(noteIds);
  const topMatch = matches[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md select-none animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#f8fbff] via-[#edf5ff] to-[#fefbf6] p-5 shadow-2xl text-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center text-xl shadow-md">
              🪞
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-blue-950 leading-tight">
                Cocoklogi Brand Ternama
              </h3>
              <span className="text-xs text-blue-900/70 font-mono">
                Kemiripan Karakter Aroma Global
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

        {/* User's Blend Summary Pill */}
        <div className="p-3 rounded-2xl bg-white/90 border border-amber-300/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚗️</span>
            <div>
              <span className="text-xs font-cinzel font-bold text-slate-900 block truncate">
                {blendName}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {notes.length} Bahan Racikan
              </span>
            </div>
          </div>
          <div className="flex -space-x-1">
            {notes.slice(0, 4).map((n) => {
              const note = getNoteById(n.noteId);
              return (
                <span
                  key={n.noteId}
                  className="w-7 h-7 rounded-full bg-slate-100 border border-amber-400 flex items-center justify-center text-xs"
                >
                  {note?.symbol || '✦'}
                </span>
              );
            })}
          </div>
        </div>

        {/* Top 3 Matches List */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {matches.slice(0, 3).map((item, idx) => {
            const isHighest = idx === 0;
            return (
              <div
                key={item.perfume.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isHighest
                    ? 'border-2 border-amber-400 bg-gradient-to-r from-amber-50/90 via-sky-50/80 to-white shadow-md'
                    : 'border-slate-200 bg-white/80'
                }`}
              >
                {/* Match Score & House */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.perfume.symbol}</span>
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-900 block">
                        {item.perfume.house}
                      </span>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        {item.perfume.name}
                      </h4>
                    </div>
                  </div>

                  {/* Percentage Match Badge */}
                  <div
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1 shadow-sm ${
                      isHighest
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    <span>✦</span>
                    <span>{item.matchPercentage}% Mirip</span>
                  </div>
                </div>

                {/* Vibe / Why it matches */}
                <p className="mt-2 text-xs text-slate-700 leading-relaxed font-sans">
                  {item.perfume.vibe}
                </p>

                {/* Iconic Shared Notes & Apply Action */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-slate-500 text-[10px]">Akor:</span>
                    {item.perfume.iconicNotes.slice(0, 3).map((noteName, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-[10px]"
                      >
                        {noteName}
                      </span>
                    ))}
                  </div>

                  {onApplyInspiration && (
                    <button
                      type="button"
                      onClick={() => {
                        onApplyInspiration(item.perfume.keyNoteIds, `Inspirasi ${item.perfume.name}`);
                        onClose();
                      }}
                      className="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[10px] active:scale-95 transition-all cursor-pointer"
                    >
                      ✦ Racik Ini
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>✓</span>
            <span>Kembali ke Meja Racik</span>
          </button>
        </div>
      </div>
    </div>
  );
};
