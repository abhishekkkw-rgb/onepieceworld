import React from 'react';
import { Character } from '../types';
import { WantedPosterCard } from './WantedPosterCard';
import { Ship, Sparkles, Award, Flame, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface StrawHatCrewSectionProps {
  characters: Character[];
  onInspectCharacter: (character: Character) => void;
}

export const StrawHatCrewSection: React.FC<StrawHatCrewSectionProps> = ({
  characters,
  onInspectCharacter,
}) => {
  const strawHats = characters.filter((c) => c.crew === 'Straw Hat Pirates');

  return (
    <section id="straw-hats" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          The Emperor's Crew of the New Era
        </div>
        <h2 className="font-pirate text-4xl md:text-5xl font-black text-amber-400 tracking-wide">
          STRAW HAT PIRATES (麦わらの一味)
        </h2>
        <p className="font-cinzel text-sm md:text-base text-gray-300 mt-2">
          Led by Emperor Monkey D. Luffy • 10 Legendary Nakama • Total Bounty: 8,816,001,000 Berries
        </p>
      </div>

      {/* Flagship Banner Info Card */}
      <div className="bg-gradient-to-r from-[#141b27] via-[#1c2436] to-[#141b27] border border-amber-500/30 rounded-2xl p-6 md:p-8 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">☠️</span>
              <div>
                <h3 className="font-cinzel text-2xl font-black text-white">
                  Straw Hat Grand Fleet & Thousand Sunny
                </h3>
                <p className="text-xs text-amber-400/90 font-medium">
                  Flagship: Thousand Sunny (Built by Franky with Adam Wood) • Previous Ship: Going Merry
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Renowned across the high seas for declaring war on the World Government at Enies Lobby,
              smashing the Warlord system, liberating Wano Country from Emperor Kaido, and commanding
              the 5,600-strong Straw Hat Grand Fleet.
            </p>

            <div className="flex flex-wrap gap-2 text-xs pt-1">
              <span className="px-3 py-1 rounded-lg bg-black/50 border border-gray-700 text-gray-200">
                ⛵ <strong>Current Ship:</strong> Thousand Sunny (Gaon Cannon & Coup de Burst)
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/50 border border-gray-700 text-gray-200">
                🐑 <strong>Eternal Heart:</strong> Klabautermann of Going Merry
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                ⚔ <strong>5,600 Grand Fleet Allies</strong> (Cavendish, Bartolomeo, Sai, Ideo, Leo, Hajrudin, Orlumbus)
              </span>
            </div>
          </div>

          {/* Quick Bounty Stats */}
          <div className="bg-[#0b0e15] border border-amber-500/40 rounded-xl p-5 text-center shadow-inner">
            <span className="text-[11px] font-cinzel uppercase tracking-widest text-amber-400 font-bold block">
              TOTAL CREW BOUNTY
            </span>
            <div className="font-pirate text-3xl md:text-4xl text-amber-400 font-black my-1">
              ฿ 8,816,001,000
            </div>
            <p className="text-[11px] text-gray-400">
              One of the highest cumulative bounties in pirate history
            </p>
            <button
              onClick={() => sound.playDrumsOfLiberation()}
              className="mt-3 w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-transform active:scale-95"
            >
              🥁 Play Drums of Liberation
            </button>
          </div>
        </div>
      </div>

      {/* Grid of all 10 Canonical Straw Hat Members Wanted Posters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {strawHats.map((character) => (
          <WantedPosterCard
            key={character.id}
            character={character}
            onInspect={onInspectCharacter}
          />
        ))}
      </div>
    </section>
  );
};
