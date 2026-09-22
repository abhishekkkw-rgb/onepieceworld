import React, { useState } from 'react';
import { CHARACTERS } from './data/characters';
import { Character, IslandHistory, DragonAura, DragonSize } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StrawHatCrewSection } from './components/StrawHatCrewSection';
import { PirateLegendsSection } from './components/PirateLegendsSection';
import { MarineSection } from './components/MarineSection';
import { WorldMapSection } from './components/WorldMapSection';
import { BountyBoardSection } from './components/BountyBoardSection';
import { Footer } from './components/Footer';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { IslandDetailModal } from './components/IslandDetailModal';
import { SkeletalDragonCursor } from './components/SkeletalDragonCursor';
import { sound } from './utils/audio';

export default function App() {
  const [inspectCharacter, setInspectCharacter] = useState<Character | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<IslandHistory | null>(null);

  // Skeletal Dragon Cursor Companion state
  const [dragonEnabled, setDragonEnabled] = useState<boolean>(true);
  const [dragonAura, setDragonAura] = useState<DragonAura>('azure');
  const [dragonSize, setDragonSize] = useState<DragonSize>('large');

  // Drums of Liberation visual pulse state
  const [showNikaPulse, setShowNikaPulse] = useState(false);

  const handlePlayDrums = () => {
    setShowNikaPulse(true);
    setTimeout(() => setShowNikaPulse(false), 2500);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090b10] text-[#e6edf3] selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* 60fps Procedural Skeletal Dragon Following Mouse Cursor */}
      <SkeletalDragonCursor
        enabled={dragonEnabled}
        aura={dragonAura}
        size={dragonSize}
        onToggle={() => setDragonEnabled(!dragonEnabled)}
        onChangeAura={(aura) => setDragonAura(aura)}
        onChangeSize={(size) => setDragonSize(size)}
      />

      {/* Sun God Nika Heartbeat Golden Overlay Pulse */}
      {showNikaPulse && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center animate-out fade-out duration-1000">
          <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-[2px]" />
          <div className="relative text-center p-6 bg-black/80 border-2 border-amber-400 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.6)] animate-in zoom-in-75 duration-200">
            <span className="text-4xl block mb-1">🥁✨</span>
            <h3 className="font-pirate text-3xl md:text-4xl text-amber-300 tracking-wider font-black">
              THE DRUMS OF LIBERATION
            </h3>
            <p className="font-cinzel text-xs text-amber-100 uppercase tracking-widest mt-1">
              Joy Boy has Returned! Ta-Kiti-Ton-Ton!
            </p>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        onPlayDrums={handlePlayDrums}
        dragonEnabled={dragonEnabled}
        onToggleDragon={() => setDragonEnabled(!dragonEnabled)}
      />

      {/* Main Sections */}
      <main>
        {/* Cinematic Hero */}
        <HeroSection
          onExploreMap={() => handleScrollToSection('world-map')}
          onExploreBounties={() => handleScrollToSection('bounty-board')}
        />

        {/* Straw Hat Pirates Complete 10 Members Spotlight */}
        <StrawHatCrewSection
          characters={CHARACTERS}
          onInspectCharacter={(char) => setInspectCharacter(char)}
        />

        {/* Four Emperors, Red Hair, Whitebeard, Roger & Legends */}
        <PirateLegendsSection
          characters={CHARACTERS}
          onInspectCharacter={(char) => setInspectCharacter(char)}
        />

        {/* Marine Headquarters, Fleet Admiral, Admirals & Justice */}
        <MarineSection
          characters={CHARACTERS}
          onInspectCharacter={(char) => setInspectCharacter(char)}
        />

        {/* Interactive Grand Line World Map & Island Chronicles */}
        <WorldMapSection
          onSelectIsland={(island) => setSelectedIsland(island)}
        />

        {/* Wanted Poster Bounty Registry & Hunter Terminal */}
        <BountyBoardSection
          characters={CHARACTERS}
          onInspectCharacter={(char) => setInspectCharacter(char)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CharacterDetailModal
        character={inspectCharacter}
        onClose={() => setInspectCharacter(null)}
      />

      <IslandDetailModal
        island={selectedIsland}
        onClose={() => setSelectedIsland(null)}
      />
    </div>
  );
}
