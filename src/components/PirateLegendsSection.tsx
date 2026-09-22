import React, { useState } from 'react';
import { Character, Crew } from '../types';
import { CREWS } from '../data/characters';
import { WantedPosterCard } from './WantedPosterCard';
import { Crown, Sparkles, Sword, Anchor, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface PirateLegendsSectionProps {
  characters: Character[];
  onInspectCharacter: (character: Character) => void;
}

export const PirateLegendsSection: React.FC<PirateLegendsSectionProps> = ({
  characters,
  onInspectCharacter,
}) => {
  const [selectedCrewId, setSelectedCrewId] = useState<string>('all');

  // Filter out Straw Hats (they have their own primary spotlight)
  const nonStrawHatCharacters = characters.filter((c) => c.crew !== 'Straw Hat Pirates' && c.affiliation !== 'Marine');

  const filteredCharacters =
    selectedCrewId === 'all'
      ? nonStrawHatCharacters
      : nonStrawHatCharacters.filter((c) => {
          const matchedCrew = CREWS.find((cr) => cr.id === selectedCrewId);
          if (!matchedCrew) return true;
          return c.crew.toLowerCase().includes(matchedCrew.name.toLowerCase().split(' ')[0]);
        });

  return (
    <section id="pirate-legends" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Crown className="w-3.5 h-3.5 text-purple-400" />
          The Rulers of the Seas & Legendary Fleets
        </div>
        <h2 className="font-pirate text-4xl md:text-5xl font-black text-amber-400 tracking-wide">
          FOUR EMPERORS & PIRATE LEGENDS
        </h2>
        <p className="font-cinzel text-sm md:text-base text-gray-300 mt-2">
          From the Pirate King Gol D. Roger to the Red Hair, Whitebeard, Blackbeard, and Cross Guild Fleets
        </p>
      </div>

      {/* Crew Overview Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        <button
          onClick={() => {
            sound.playSwordSlash();
            setSelectedCrewId('all');
          }}
          className={`p-3 rounded-xl border text-center transition-all ${
            selectedCrewId === 'all'
              ? 'bg-amber-500 text-black font-black border-amber-400 shadow-lg'
              : 'bg-[#121824] text-gray-300 border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="text-base font-pirate">ALL LEGENDS</div>
          <div className="text-[10px] uppercase font-mono mt-0.5">Top Bounties</div>
        </button>

        {CREWS.map((crew) => (
          <button
            key={crew.id}
            onClick={() => {
              sound.playSwordSlash();
              setSelectedCrewId(crew.id);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedCrewId === crew.id
                ? 'bg-amber-500 text-black font-black border-amber-400 shadow-lg'
                : 'bg-[#121824] text-gray-300 border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className="text-sm font-pirate truncate">{crew.name}</div>
            <div className="text-[10px] font-semibold opacity-90 truncate">
              Cap: {crew.captain}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Crew Highlight Banner (if a specific crew is chosen) */}
      {selectedCrewId !== 'all' && (
        (() => {
          const crew = CREWS.find((c) => c.id === selectedCrewId);
          if (!crew) return null;
          return (
            <div className="bg-[#121825] border border-amber-500/30 rounded-2xl p-6 mb-10 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-cinzel text-2xl font-black text-white">{crew.name}</h3>
                    {crew.yonkoStatus && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-950 border border-purple-500 text-purple-300 uppercase">
                        YONKO FLEET
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-400 font-serif italic mt-0.5">"{crew.motto}"</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-black/60 px-3 py-1.5 rounded-lg border border-gray-800">
                    <span className="text-gray-400 block text-[10px]">Flagship:</span>
                    <span className="font-bold text-white">{crew.ship}</span>
                  </div>
                  <div className="bg-black/60 px-3 py-1.5 rounded-lg border border-amber-500/40">
                    <span className="text-amber-400 block text-[10px]">Fleet Bounty:</span>
                    <span className="font-pirate text-amber-300 text-base font-bold">{crew.totalBountyFormatted}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mt-3">
                {crew.description}
              </p>

              {/* Key Feats */}
              <div className="mt-4 pt-3 border-t border-gray-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                  Historic Feats & Dominance:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-300">
                  {crew.keyFeats.map((feat, idx) => (
                    <li key={idx} className="bg-black/40 p-2 rounded border border-gray-800 flex items-start gap-1.5">
                      <span className="text-amber-400">⚓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()
      )}

      {/* Wanted Poster Grid for Selected Legends */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map((character) => (
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
