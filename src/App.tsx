/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SinglePageBlendStudio } from './components/SinglePageBlendStudio';
import { FinishedBlendView } from './components/FinishedBlendView';
import { MagicBlendTransition } from './components/MagicBlendTransition';
import { ZodiacExplorer } from './components/ZodiacExplorer';
import { OccasionExplorer } from './components/OccasionExplorer';
import { GrimoireView } from './components/GrimoireView';
import { MysticalZodiacIntro } from './components/MysticalZodiacIntro';
import { CocoklogiModal } from './components/CocoklogiModal';
import { NoteRecommendationModal } from './components/NoteRecommendationModal';
import { ZodiacBrandRecommendationModal } from './components/ZodiacBrandRecommendationModal';
import { CustomBlendFormula, NoteTier, OccasionType, ZodiacSignId } from './types';
import {
  deleteFormulaFromStorage,
  loadSavedFormulas,
  saveFormulaToStorage,
  calculateHarmonyScore,
  loadSignatureNotesForZodiac,
  getNoteById,
} from './utils/alchemicalEngine';

import cosmicZodiacImg from './assets/images/cosmic_zodiac_fragrance_1792495960665.jpg';

export default function App() {
  // 1. Welcome Intro Screen State
  const [showIntro, setShowIntro] = useState(true);

  // 2. Blend Stage State: 'crafting' (Page 1) or 'finished' (Page 2)
  const [blendStage, setBlendStage] = useState<'crafting' | 'finished'>('crafting');

  // Magic animation state
  const [isMagicBlending, setIsMagicBlending] = useState(false);

  // Main active tab
  const [activeTab, setActiveTab] = useState<'blend' | 'zodiac' | 'occasions' | 'grimoire'>('blend');

  // Blend state
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSignId>('leo');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('special_occasion');
  const [concentration, setConcentration] = useState<'Cologne' | 'EDT' | 'EDP' | 'Extrait'>('EDP');
  const [blendName, setBlendName] = useState('Aura Solis Imperial');
  const [formulaNotes, setFormulaNotes] = useState<
    { noteId: string; percentage: number; tier: NoteTier }[]
  >([
    { noteId: 'bergamot', percentage: 25, tier: 'top' },
    { noteId: 'frankincense', percentage: 45, tier: 'heart' },
    { noteId: 'golden_amber', percentage: 30, tier: 'base' },
  ]);

  // Saved formulas grimoire
  const [savedFormulas, setSavedFormulas] = useState<CustomBlendFormula[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals for the 3 requested feature icons
  const [isCocoklogiOpen, setIsCocoklogiOpen] = useState(false);
  const [isNoteRecOpen, setIsNoteRecOpen] = useState(false);
  const [isZodiacBrandRecOpen, setIsZodiacBrandRecOpen] = useState(false);

  useEffect(() => {
    const list = loadSavedFormulas();
    setSavedFormulas(list);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const harmony = calculateHarmonyScore(formulaNotes, selectedZodiac, selectedOccasion, concentration);

  // Trigger Blend Scent action: triggers magic animation, then switches to finished view
  const handleTriggerBlend = () => {
    setIsMagicBlending(true);
  };

  const handleMagicAnimationComplete = () => {
    setIsMagicBlending(false);
    setBlendStage('finished');
  };

  const handleSaveFormula = () => {
    if (formulaNotes.length === 0) return;
    const formula: CustomBlendFormula = {
      id: `blend-${Date.now()}`,
      name: blendName || 'Formula Tanpa Nama',
      createdAt: Date.now(),
      zodiacSign: selectedZodiac,
      occasion: selectedOccasion,
      concentration,
      notes: formulaNotes,
      harmonyScore: harmony.score,
    };
    const updated = saveFormulaToStorage(formula);
    setSavedFormulas(updated);
    showToast('✨ Formula berhasil disimpan ke Grimoire!');
  };

  const handleDeleteFormula = (id: string) => {
    const updated = deleteFormulaFromStorage(id);
    setSavedFormulas(updated);
    showToast('🗑️ Formula dihapus dari Grimoire');
  };

  const handleLoadFormulaIntoLab = (formula: CustomBlendFormula) => {
    if (formula.zodiacSign) setSelectedZodiac(formula.zodiacSign);
    setSelectedOccasion(formula.occasion);
    setConcentration(formula.concentration);
    setBlendName(formula.name);
    setFormulaNotes(formula.notes);
    setBlendStage('crafting');
    setActiveTab('blend');
    showToast(`⚗️ Memuat resep "${formula.name}"`);
  };

  // Load signature formula when user clicks "Racik Formula [Zodiac]" in Zodiac tab
  const handleLoadZodiacRecipe = (signId: ZodiacSignId) => {
    setSelectedZodiac(signId);
    const signature = loadSignatureNotesForZodiac(signId);
    setFormulaNotes(signature.notes);
    setBlendName(signature.name);
    setSelectedOccasion(signature.recommendedOccasion);
    setBlendStage('crafting');
    setActiveTab('blend');
    showToast(`♈ Memuat formula signature ${signature.name}`);
  };

  // Load occasion into lab
  const handleLoadOccasion = (occ: OccasionType) => {
    setSelectedOccasion(occ);
    if (occ === 'special_occasion' || occ === 'night') {
      setConcentration('Extrait');
    } else if (occ === 'outdoor_sport' || occ === 'indoor_sport') {
      setConcentration('EDT');
    } else {
      setConcentration('EDP');
    }
    setBlendStage('crafting');
    setActiveTab('blend');
    showToast(`🎯 Mengatur target acara ke ${occ.replace('_', ' ')}`);
  };

  // Apply inspiration from Cocoklogi
  const handleApplyCocoklogiInspiration = (keyNoteIds: string[], inspirationName: string) => {
    const balancedNotes: { noteId: string; percentage: number; tier: NoteTier }[] = [];
    const perPct = Math.round(100 / Math.max(1, keyNoteIds.length));

    keyNoteIds.forEach((id, idx) => {
      const note = getNoteById(id);
      const tier = note?.tier || 'heart';
      balancedNotes.push({
        noteId: id,
        percentage: idx === 0 ? 100 - perPct * (keyNoteIds.length - 1) : perPct,
        tier,
      });
    });

    setFormulaNotes(balancedNotes);
    setBlendName(inspirationName);
    setBlendStage('crafting');
    setActiveTab('blend');
    showToast(`🪞 Memuat aroma ${inspirationName}`);
  };

  // Apply inspiration from Zodiac Brand
  const handleApplyZodiacBrandInspiration = (brand: string, perfumeName: string) => {
    setBlendName(`${perfumeName} Inspired`);
    setBlendStage('crafting');
    setActiveTab('blend');
    showToast(`🔮 Inspirasi ${brand} ${perfumeName} diterapkan`);
  };

  const handleAddComplementaryNote = (noteId: string, tier: NoteTier) => {
    const existingIndex = formulaNotes.findIndex((n) => n.noteId === noteId);
    if (existingIndex >= 0) {
      const updated = [...formulaNotes];
      updated[existingIndex].percentage = Math.min(60, updated[existingIndex].percentage + 5);
      setFormulaNotes(updated);
    } else {
      setFormulaNotes([...formulaNotes, { noteId, percentage: 15, tier }]);
    }
    showToast('💡 Note penyempurna berhasil ditambahkan!');
  };

  // 1. Initial Animated Welcoming Screen: Mystical Zodiac Wheel with "Start Scent"
  if (showIntro) {
    return <MysticalZodiacIntro onStart={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen golden-blue-bright flex flex-col font-sans pb-20 select-none text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-white/95 border-2 border-amber-400 text-slate-900 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-mono font-bold animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'blend') setBlendStage('crafting');
        }}
        onOpenCocoklogi={() => setIsCocoklogiOpen(true)}
        onOpenAstroRecommender={() => setIsZodiacBrandRecOpen(true)}
        onShowIntro={() => setShowIntro(true)}
        savedCount={savedFormulas.length}
      />

      {/* Main Single-Screen Ergonomic Canvas */}
      <main className="flex-1 w-full max-w-md mx-auto px-3 pt-2">
        {activeTab === 'blend' && (
          <>
            {blendStage === 'crafting' ? (
              /* Page 1: Single Page Blend Studio (All notes together in one grid, flacon without spray button) */
              <SinglePageBlendStudio
                selectedSign={selectedZodiac}
                onChangeSign={(signId) => {
                  setSelectedZodiac(signId);
                  showToast(`Zodiak diubah ke ${signId.toUpperCase()}`);
                }}
                selectedOccasion={selectedOccasion}
                onChangeOccasion={setSelectedOccasion}
                formulaNotes={formulaNotes}
                setFormulaNotes={setFormulaNotes}
                blendName={blendName}
                setBlendName={setBlendName}
                concentration={concentration}
                setConcentration={setConcentration}
                onTriggerBlend={handleTriggerBlend}
                onOpenGrimoire={() => setActiveTab('grimoire')}
              />
            ) : (
              /* Page 2: Finished Blend View with the 3 Flagship Icons */
              <FinishedBlendView
                blendName={blendName}
                notes={formulaNotes}
                zodiacSign={selectedZodiac}
                occasion={selectedOccasion}
                concentration={concentration}
                harmonyScore={harmony.score}
                onOpenCocoklogi={() => setIsCocoklogiOpen(true)}
                onOpenNoteRecommendations={() => setIsNoteRecOpen(true)}
                onOpenZodiacBrandRecommendations={() => setIsZodiacBrandRecOpen(true)}
                onSaveToGrimoire={handleSaveFormula}
                onRemixOrBack={() => setBlendStage('crafting')}
              />
            )}
          </>
        )}

        {activeTab === 'zodiac' && (
          <ZodiacExplorer
            selectedSignId={selectedZodiac}
            onSelectSign={setSelectedZodiac}
            onLoadIntoLab={handleLoadZodiacRecipe}
            cosmicImage={cosmicZodiacImg}
          />
        )}

        {activeTab === 'occasions' && (
          <OccasionExplorer
            selectedOccasion={selectedOccasion}
            onSelectOccasion={setSelectedOccasion}
            onStartBlendForOccasion={handleLoadOccasion}
          />
        )}

        {activeTab === 'grimoire' && (
          <GrimoireView
            formulas={savedFormulas}
            onLoadFormulaIntoLab={handleLoadFormulaIntoLab}
            onDeleteFormula={handleDeleteFormula}
            onGoToLab={() => {
              setBlendStage('crafting');
              setActiveTab('blend');
            }}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'blend') setBlendStage('crafting');
        }}
        savedCount={savedFormulas.length}
      />

      {/* Magic Alchemical Animation Overlay when pressing "Blend Scent" */}
      <MagicBlendTransition
        isOpen={isMagicBlending}
        onComplete={handleMagicAnimationComplete}
      />

      {/* 1. Modal Cocoklogi Brand Ternama */}
      <CocoklogiModal
        isOpen={isCocoklogiOpen}
        notes={formulaNotes}
        blendName={blendName}
        onClose={() => setIsCocoklogiOpen(false)}
        onApplyInspiration={handleApplyCocoklogiInspiration}
      />

      {/* 2. Modal Rekomendasi Note Penyempurna */}
      <NoteRecommendationModal
        isOpen={isNoteRecOpen}
        notes={formulaNotes}
        onClose={() => setIsNoteRecOpen(false)}
        onAddNote={handleAddComplementaryNote}
      />

      {/* 3. Modal Rekomendasi Brand Lain Sesuai Astrologi */}
      <ZodiacBrandRecommendationModal
        isOpen={isZodiacBrandRecOpen}
        userZodiacSign={selectedZodiac}
        onClose={() => setIsZodiacBrandRecOpen(false)}
        onApplyInspiration={handleApplyZodiacBrandInspiration}
      />
    </div>
  );
}
