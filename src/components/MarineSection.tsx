import React from 'react';
import { Character } from '../types';
import { MARINE_FACTIONS } from '../data/characters';
import { WantedPosterCard } from './WantedPosterCard';
import { Shield, Award, Flame, Scale, Skull, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface MarineSectionProps {
  characters: Character[];
  onInspectCharacter: (character: Character) => void;
}

export const MarineSection: React.FC<MarineSectionProps> = ({ characters, onInspectCharacter }) => {
  const marines = characters.filter((c) => c.affiliation === 'Marine' || c.affiliation === 'World Government');

  return (
    <section id="marines" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5 text-sky-400" />
          The World Government Military Hegemony
        </div>
        <h2 className="font-pirate text-4xl md:text-5xl font-black text-sky-300 tracking-wide">
          MARINE HEADQUARTERS & ADMIRALS (海軍)
        </h2>
        <p className="font-cinzel text-sm md:text-base text-gray-300 mt-2">
          From Fleet Admiral Sakazuki to Marine Hero Garp, The Three Admirals, SWORD, and CP0
        </p>
      </div>

      {/* Marine Justice Philosophies Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#0e1624] border border-red-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h3 className="font-cinzel text-lg font-black text-red-400">Absolute Justice</h3>
          </div>
          <span className="text-[10px] text-gray-400 font-mono block mb-1">
            Championed by Fleet Admiral Sakazuki (Akainu)
          </span>
          <p className="text-xs text-gray-300 leading-relaxed">
            "If a single seed of corruption escapes, justice has failed." Piracy and evil must be
            annihilated without hesitation or remorse, regardless of collateral consequences.
          </p>
        </div>

        <div className="bg-[#0e1624] border border-purple-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-5 h-5 text-purple-400" />
            <h3 className="font-cinzel text-lg font-black text-purple-300">Moral Justice</h3>
          </div>
          <span className="text-[10px] text-gray-400 font-mono block mb-1">
            Championed by Admiral Issho (Fujitora)
          </span>
          <p className="text-xs text-gray-300 leading-relaxed">
            "Before counting our enemies, shouldn't we count the lives we must protect?" Refuses to
            hide government sins; prioritizes civilian safety and moral conscience over pride.
          </p>
        </div>

        <div className="bg-[#0e1624] border border-amber-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-lg font-black text-amber-300">Cross Guild Bounty Shift</h3>
          </div>
          <span className="text-[10px] text-gray-400 font-mono block mb-1">
            Issued by Cross Guild (Mihawk, Buggy, Crocodile)
          </span>
          <p className="text-xs text-gray-300 leading-relaxed">
            For the first time in 800 years, the hunters have become the hunted: Cross Guild issues
            Crowns (1 Crown = 1 Billion Berries) and Stars (1 Star = 100 Million) on Marine Admirals!
          </p>
        </div>
      </div>

      {/* Marine Factions Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {MARINE_FACTIONS.map((faction) => (
          <div
            key={faction.id}
            className="bg-[#121927] border border-sky-900/50 hover:border-sky-500/50 rounded-2xl p-5 shadow-lg transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <h4 className="font-cinzel text-base font-bold text-white">{faction.name}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-600/40">
                {faction.hqLocation}
              </span>
            </div>
            <p className="text-xs text-amber-400 font-medium italic mt-2">
              Motto: "{faction.motto}"
            </p>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
              {faction.description}
            </p>
            <div className="mt-3 pt-2 border-t border-gray-800 flex flex-wrap gap-1">
              {faction.keyForces.map((force, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-gray-900 text-[10px] text-gray-300 border border-gray-800"
                >
                  {force}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Marine Officers Wanted & Bounty Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {marines.map((character) => (
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
