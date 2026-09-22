import React, { useState } from 'react';
import { IslandHistory } from '../types';
import { ISLANDS_DATA } from '../data/islands';
import { Compass, MapPin, Sparkles, Search, Layers, Navigation, ChevronRight, Anchor } from 'lucide-react';
import { sound } from '../utils/audio';

interface WorldMapSectionProps {
  onSelectIsland: (island: IslandHistory) => void;
}

export const WorldMapSection: React.FC<WorldMapSectionProps> = ({ onSelectIsland }) => {
  const [selectedSaga, setSelectedSaga] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'map' | 'cards'>('map');
  const [hoveredIsland, setHoveredIsland] = useState<IslandHistory | null>(null);

  const sagas = [
    'All',
    'East Blue Saga',
    'Alabasta Saga',
    'Sky Island Saga',
    'Water 7 Saga',
    'Summit War Saga',
    'Fish-Man Island Saga',
    'Dressrosa Saga',
    'Four Emperors Saga',
    'Final Saga'
  ];

  const filteredIslands = ISLANDS_DATA.filter((island) => {
    const matchesSaga = selectedSaga === 'All' || island.saga === selectedSaga;
    const matchesSearch =
      island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      island.arcName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      island.majorAntagonists.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      island.strawHatActions.some((act) => act.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSaga && matchesSearch;
  });

  const handleIslandClick = (island: IslandHistory) => {
    sound.playGoldenBell();
    onSelectIsland(island);
  };

  return (
    <section id="world-map" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          Grand Line Cartography & Log Pose
        </div>
        <h2 className="font-pirate text-4xl md:text-5xl font-black text-amber-400 tracking-wide">
          THE ONE PIECE WORLD MAP
        </h2>
        <p className="font-cinzel text-sm md:text-base text-gray-300 mt-2">
          Chronicle of Every Island Visited by the Straw Hat Pirates: All Battles, Historical Feats & Liberations
        </p>
      </div>

      {/* Control Filters & Search Bar */}
      <div className="bg-[#101622]/90 border border-amber-500/25 rounded-2xl p-4 md:p-6 mb-8 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-800">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search island, arc, or villain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs text-gray-400 font-medium">Display:</span>
            <div className="p-1 rounded-xl bg-gray-900 border border-gray-800 flex gap-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'map'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Sea Chart Map
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Chronicle Cards
              </button>
            </div>
          </div>
        </div>

        {/* Saga Filter Pills */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {sagas.map((saga) => (
            <button
              key={saga}
              onClick={() => setSelectedSaga(saga)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedSaga === saga
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
              }`}
            >
              {saga}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: Interactive Nautical Sea Chart Canvas / SVG */}
      {viewMode === 'map' ? (
        <div className="relative w-full rounded-2xl border-2 border-amber-500/30 overflow-hidden bg-[#070b13] shadow-2xl p-4 md:p-8">
          
          {/* Nautical Map Background Grids & Labels */}
          <div className="relative w-full h-[540px] md:h-[620px] rounded-xl border border-blue-950/60 overflow-hidden bg-[radial-gradient(ellipse_at_center,_#0f172a_0%,_#050811_100%)] select-none">
            
            {/* Latitude / Longitude Nautical Grid Lines */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />

            {/* Calm Belts (North & South) */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-sky-950/30 border-b border-sky-500/20 flex items-center justify-between px-6 pointer-events-none">
              <span className="text-[10px] uppercase font-cinzel tracking-widest text-sky-400 font-bold">
                🌊 NORTH CALM BELT (Nest of Colossal Sea Kings)
              </span>
              <span className="text-[9px] text-sky-400/60 italic font-mono">Windless Void</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-14 bg-sky-950/30 border-t border-sky-500/20 flex items-center justify-between px-6 pointer-events-none">
              <span className="text-[10px] uppercase font-cinzel tracking-widest text-sky-400 font-bold">
                🌊 SOUTH CALM BELT (Amazon Lily / Sea King Territory)
              </span>
              <span className="text-[9px] text-sky-400/60 italic font-mono">No Ocean Currents</span>
            </div>

            {/* The Colossal Red Line Continent dividing the ocean */}
            <div
              className="absolute top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-x-2 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.3)] z-10 flex flex-col items-center justify-between py-6 pointer-events-none"
              style={{ left: '69%' }}
            >
              <div className="rotate-90 origin-center text-[10px] font-cinzel font-black tracking-widest text-red-300 uppercase whitespace-nowrap">
                RED LINE CONTINENT
              </div>
              <div className="text-center px-1">
                <span className="text-[9px] font-bold text-amber-300 block">👑 MARY GEOISE</span>
                <span className="text-[8px] text-red-200">10,000m Above</span>
              </div>
              <div className="text-center px-1">
                <span className="text-[9px] font-bold text-cyan-300 block">🧜 FISHMAN ISLE</span>
                <span className="text-[8px] text-cyan-200">10,000m Below</span>
              </div>
              <div className="rotate-90 origin-center text-[10px] font-cinzel font-black tracking-widest text-red-300 uppercase whitespace-nowrap">
                REVERSE MOUNTAIN
              </div>
            </div>

            {/* Ocean Region Watermark Labels */}
            <div className="absolute top-16 left-6 text-xl md:text-2xl font-pirate text-cyan-500/20 pointer-events-none">
              EAST BLUE SEA
            </div>
            <div className="absolute top-16 left-[38%] -translate-x-1/2 text-xl md:text-2xl font-pirate text-amber-500/25 pointer-events-none">
              GRAND LINE: PARADISE
            </div>
            <div className="absolute top-16 right-10 text-xl md:text-2xl font-pirate text-rose-500/25 pointer-events-none">
              THE NEW WORLD (SHINSEKAI)
            </div>

            {/* Skypiea Floating Clouds Layer */}
            <div
              className="absolute rounded-full border border-sky-400/30 bg-sky-400/10 backdrop-blur-xs flex items-center justify-center p-2 text-[10px] text-sky-200 font-cinzel font-bold shadow-[0_0_20px_rgba(56,189,248,0.2)] pointer-events-none"
              style={{ left: '46%', top: '26%' }}
            >
              ☁ SKYPIEA (10,000m High)
            </div>

            {/* SVG Connecting Voyage Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="voyageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#voyageGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="animate-pulse"
                points={filteredIslands
                  .map((isl) => `${isl.coordinates.x}%,${isl.coordinates.y}%`)
                  .join(' ')}
              />
            </svg>

            {/* Interactive Island Pins */}
            {filteredIslands.map((island) => {
              const isHovered = hoveredIsland?.id === island.id;
              return (
                <div
                  key={island.id}
                  style={{
                    left: `${island.coordinates.x}%`,
                    top: `${island.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onClick={() => handleIslandClick(island)}
                  onMouseEnter={() => setHoveredIsland(island)}
                  onMouseLeave={() => setHoveredIsland(null)}
                >
                  {/* Pin Node */}
                  <div
                    className={`relative w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs transition-all duration-200 ${
                      island.roadPoneglyph
                        ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.8)] border-2 border-rose-300'
                        : isHovered
                        ? 'bg-amber-400 text-black scale-125 shadow-[0_0_15px_rgba(245,158,11,0.8)] border-2 border-white'
                        : 'bg-[#1a2333] text-amber-300 border-2 border-amber-500/70 hover:border-amber-300'
                    }`}
                  >
                    <span>{island.orderVisited}</span>

                    {/* Ping ring animation */}
                    <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
                  </div>

                  {/* Island Name Tag */}
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 border border-gray-700 text-[10px] font-semibold text-gray-200 group-hover:text-amber-300 group-hover:border-amber-400 transition-colors pointer-events-none">
                    {island.name.split(' (')[0]}
                  </div>
                </div>
              );
            })}

            {/* Hover Floating Island Info Box */}
            {hoveredIsland && (
              <div
                className="absolute z-30 bottom-16 left-6 max-w-sm bg-[#121824]/95 border border-amber-500/50 p-4 rounded-xl shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-black">
                    #{hoveredIsland.orderVisited}
                  </span>
                  <span className="text-xs text-sky-400 font-bold">{hoveredIsland.sea}</span>
                  {hoveredIsland.roadPoneglyph && (
                    <span className="text-[10px] font-black text-rose-400">★ ROAD PONEGLYPH</span>
                  )}
                </div>
                <h4 className="font-cinzel text-base font-black text-white">{hoveredIsland.name}</h4>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">{hoveredIsland.summary}</p>
                <p className="text-[11px] text-amber-300 font-semibold mt-2 flex items-center gap-1">
                  Click to read complete Straw Hat chronicle <ChevronRight className="w-3 h-3" />
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-gray-400 px-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1a2333] border border-amber-400 inline-block" />
                Standard Visited Island
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600 border border-rose-300 inline-block" />
                Road Poneglyph Location
              </span>
            </div>
            <span>Showing {filteredIslands.length} of {ISLANDS_DATA.length} grand voyage stops</span>
          </div>
        </div>
      ) : (
        /* VIEW 2: Chronological Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIslands.map((island) => (
            <div
              key={island.id}
              onClick={() => handleIslandClick(island)}
              className="group bg-[#121824] border border-gray-800 hover:border-amber-400/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Island Image Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={island.image}
                    alt={island.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/40" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-xs font-black bg-amber-500 text-black">
                      #{island.orderVisited}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-black/70 text-gray-200 backdrop-blur-sm border border-gray-700">
                      {island.sea}
                    </span>
                  </div>

                  {island.roadPoneglyph && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-950 border border-rose-500 text-rose-300">
                      ROAD PONEGLYPH
                    </div>
                  )}

                  <div className="absolute bottom-2 left-3 right-3">
                    <span className="text-[10px] text-amber-300 uppercase tracking-wider font-bold">
                      {island.saga}
                    </span>
                    <h3 className="font-cinzel text-lg font-black text-white line-clamp-1">
                      {island.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {island.summary}
                  </p>

                  <div className="bg-[#0b0f17] p-2.5 rounded-lg border border-gray-800">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                      Key Straw Hat Feat:
                    </span>
                    <p className="text-xs text-gray-200 line-clamp-2">
                      {island.strawHatActions[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 bg-[#0d121b] border-t border-gray-800/80 flex items-center justify-between text-xs">
                <span className="text-gray-400 italic">{island.arcName}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Full History <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
