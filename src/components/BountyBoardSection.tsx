import React, { useState } from 'react';
import { Character } from '../types';
import { WantedPosterCard } from './WantedPosterCard';
import { Search, ArrowUpDown, Filter, Award, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface BountyBoardSectionProps {
  characters: Character[];
  onInspectCharacter: (character: Character) => void;
}

export const BountyBoardSection: React.FC<BountyBoardSectionProps> = ({
  characters,
  onInspectCharacter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAffiliation, setFilterAffiliation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'bountyDesc' | 'bountyAsc' | 'name'>('bountyDesc');

  const filteredCharacters = characters
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.epithet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.crew.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.devilFruit?.name && c.devilFruit.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesAffiliation =
        filterAffiliation === 'All' ||
        (filterAffiliation === 'Billion+' && c.bountyNumeric >= 1000000000) ||
        (filterAffiliation === 'Straw Hats' && c.crew === 'Straw Hat Pirates') ||
        (filterAffiliation === 'Marines' && (c.affiliation === 'Marine' || c.affiliation === 'World Government')) ||
        (filterAffiliation === 'Emperors' && ['luffy', 'shanks', 'whitebeard', 'kaido', 'bigmom', 'blackbeard', 'buggy'].includes(c.id));

      return matchesSearch && matchesAffiliation;
    })
    .sort((a, b) => {
      if (sortBy === 'bountyDesc') return b.bountyNumeric - a.bountyNumeric;
      if (sortBy === 'bountyAsc') return a.bountyNumeric - b.bountyNumeric;
      return a.name.localeCompare(b.name);
    });

  return (
    <section id="bounty-board" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          World Government & Underworld Bounty Registry
        </div>
        <h2 className="font-pirate text-4xl md:text-5xl font-black text-amber-400 tracking-wide">
          GRAND WANTED BOUNTY BOARD
        </h2>
        <p className="font-cinzel text-sm md:text-base text-gray-300 mt-2">
          Official Canonical Berries Bounties • Filter, Inspect, and Decipher Pirate Criminal Dossiers
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-[#101622]/95 border border-amber-500/30 rounded-2xl p-4 md:p-6 mb-10 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, fruit, or epithet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Affiliation Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
            {['All', 'Straw Hats', 'Emperors', 'Billion+', 'Marines'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  sound.playSwordSlash();
                  setFilterAffiliation(filter);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterAffiliation === filter
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'bg-gray-800 text-gray-300 hover:text-white border border-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="bountyDesc">Highest Bounty First</option>
              <option value="bountyAsc">Lowest Bounty First</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wanted Poster Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map((character) => (
          <WantedPosterCard
            key={character.id}
            character={character}
            onInspect={onInspectCharacter}
          />
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-cinzel">No pirate or marine matches your bounty search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterAffiliation('All');
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
