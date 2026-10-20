import React, { useState } from 'react';
import { CustomBlendFormula } from '../types';
import { getNoteById, getOccasionById, getZodiacById, copyToClipboardSafe } from '../utils/alchemicalEngine';

interface GrimoireViewProps {
  formulas: CustomBlendFormula[];
  onLoadFormulaIntoLab: (formula: CustomBlendFormula) => void;
  onDeleteFormula: (id: string) => void;
  onGoToLab: () => void;
}

export const GrimoireView: React.FC<GrimoireViewProps> = ({
  formulas,
  onLoadFormulaIntoLab,
  onDeleteFormula,
  onGoToLab,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (formula: CustomBlendFormula) => {
    const lines = [
      `✦ ${formula.name.toUpperCase()} (${formula.concentration}) ✦`,
      ...formula.notes.map((n) => {
        const note = getNoteById(n.noteId);
        return `${note?.symbol || '✦'} ${n.tier}: ${n.percentage}%`;
      }),
    ];
    const success = await copyToClipboardSafe(lines.join('\n'));
    if (success) {
      setCopiedId(formula.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3 pb-4 select-none">
      <div className="flex items-center justify-between border-b border-amber-300 pb-2.5">
        <div className="flex items-center gap-2 text-blue-950 font-cinzel font-bold text-base">
          <span className="text-2xl">📜</span>
          <span>Grimoire Racikan ({formulas.length})</span>
        </div>

        <button
          type="button"
          onClick={onGoToLab}
          className="h-9 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1"
        >
          <span>⚗️</span>
          <span>Racik</span>
        </button>
      </div>

      {formulas.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center space-y-3">
          <span className="text-5xl block animate-pulse">📜</span>
          <p className="text-xs text-slate-500">
            Belum ada resep parfum tersimpan di Grimoire Anda.
          </p>
          <button
            type="button"
            onClick={onGoToLab}
            className="px-4 py-2 rounded-xl border border-amber-400 bg-amber-50 text-amber-900 font-bold text-xs active:scale-95 transition-all"
          >
            Mulai Meracik
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {formulas.map((formula) => {
            const occ = getOccasionById(formula.occasion);
            const zod = formula.zodiacSign ? getZodiacById(formula.zodiacSign) : null;

            return (
              <div
                key={formula.id}
                className="rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-white via-[#f0f7ff] to-white p-3.5 shadow-md flex flex-col justify-between space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-blue-950">
                      {formula.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                      <span className="text-blue-800 font-bold">{formula.concentration}</span>
                      <span>·</span>
                      <span className="text-amber-600 font-bold">{formula.harmonyScore}% ✦</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {zod && (
                      <span className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-lg text-amber-800 shadow-sm">
                        {zod.symbol}
                      </span>
                    )}
                    {occ && (
                      <span className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-300 flex items-center justify-center text-lg shadow-sm">
                        {occ.symbol}
                      </span>
                    )}
                  </div>
                </div>

                {/* Notes list */}
                <div className="flex flex-wrap gap-1">
                  {formula.notes.map((n) => {
                    const note = getNoteById(n.noteId);
                    return (
                      <span
                        key={n.noteId}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white border border-slate-200 text-slate-800"
                      >
                        <span>{note?.symbol || '✦'}</span>
                        <span className="text-blue-900">{n.percentage}%</span>
                      </span>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onLoadFormulaIntoLab(formula)}
                    className="flex-1 min-h-[36px] rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-950 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>⚗️</span>
                    <span>Muat ke Lab</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(formula)}
                    className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs active:scale-95 transition-all flex items-center justify-center"
                    title="Salin Resep"
                  >
                    {copiedId === formula.id ? '✓' : '📋'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteFormula(formula.id)}
                    className="w-9 h-9 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs active:scale-95 transition-all flex items-center justify-center"
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
