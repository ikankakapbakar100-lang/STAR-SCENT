import React from 'react';
import { NoteTier } from '../types';
import { PERFUME_NOTES } from '../data/perfumeNotes';
import { getNoteById } from '../utils/alchemicalEngine';

interface NoteRecommendationModalProps {
  isOpen: boolean;
  notes: { noteId: string; percentage: number; tier: NoteTier }[];
  onClose: () => void;
  onAddNote: (noteId: string, tier: NoteTier) => void;
}

export const NoteRecommendationModal: React.FC<NoteRecommendationModalProps> = ({
  isOpen,
  notes,
  onClose,
  onAddNote,
}) => {
  if (!isOpen) return null;

  const userNoteIds = notes.map((n) => n.noteId);

  // Smart suggestions: notes not yet in the blend that will elevate the scent profile
  const candidateRecommendations = [
    {
      noteId: 'bourbon_vanilla',
      reason: 'Menambah kedalaman sillage manis berasap & mengunci keharuman di kulit hingga 12 jam.',
      vibe: 'Afrodisiak & Kehangatan Mewah',
      idealComplement: 'Oud, Mawar, Amber, Cendana',
    },
    {
      noteId: 'pink_pepper',
      reason: 'Memberikan kilau cerah dan energi rempah modern di detik-detik pertama semprotan.',
      vibe: 'Kilauan Karisma & Modern',
      idealComplement: 'Citrus, Melati, Cedarwood',
    },
    {
      noteId: 'marine_ozone',
      reason: 'Membuka dimensi kesegaran laut yang luas, membuat parfum lebih dinamis dan tahan panas.',
      vibe: 'Vitalitas Samudra & Segar',
      idealComplement: 'Vetiver, Mint, Teh Putih',
    },
    {
      noteId: 'florentine_iris',
      reason: 'Akor orris butter bangsawan yang memberikan tekstur selembut bedak beludru.',
      vibe: 'Keanggunan Aristokrat',
      idealComplement: 'Cendana, Mawar, Tonka',
    },
    {
      noteId: 'golden_amber',
      reason: 'Fiksatif solar alami yang menyatukan semua aroma menjadi satu aura emas utuh.',
      vibe: 'Magnetis & Berwibawa Tinggi',
      idealComplement: 'Frankincense, Bergamot, Nilam',
    },
  ].filter((item) => !userNoteIds.includes(item.noteId));

  const recommendations = candidateRecommendations.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md select-none animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-[#f8fbff] via-[#edf5ff] to-[#fefbf6] p-5 shadow-2xl text-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center text-xl shadow-md">
              💡
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-blue-950 leading-tight">
                Rekomendasi Note Penyempurna
              </h3>
              <span className="text-xs text-blue-900/70 font-mono">
                Saran Ahli Parfum untuk Racikan Anda
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

        {/* List of recommended notes */}
        <div className="space-y-2.5">
          {recommendations.map((item) => {
            const note = getNoteById(item.noteId);
            if (!note) return null;
            return (
              <div
                key={item.noteId}
                className="p-3.5 rounded-2xl border-2 border-amber-300 bg-white shadow-sm flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{note.symbol}</span>
                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        {note.name}
                      </h4>
                      <span className="text-[10px] text-amber-700 font-mono font-bold block">
                        ✦ {item.vibe}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onAddNote(note.id, note.tier);
                      onClose();
                    }}
                    className="min-h-[34px] px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>+</span>
                    <span>Tambahkan</span>
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-sans bg-amber-50/60 p-2 rounded-xl border border-amber-200">
                  {item.reason}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span>Harmonis dengan:</span>
                  <span className="text-blue-900 font-semibold">{item.idealComplement}</span>
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
            className="w-full min-h-[44px] rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-cinzel font-bold text-xs sm:text-sm tracking-wide shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};
