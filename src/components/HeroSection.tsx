import React from 'react';
import { Compass, Sparkles, Anchor, Flame, ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  onExploreMap: () => void;
  onExploreBounties: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMap, onExploreBounties }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-24 select-none">
      {/* Background Ocean & Sky Canvas Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090b10] via-[#0f172a] to-[#090b10] pointer-events-none" />

      {/* Atmospheric Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-lg animate-in fade-in duration-500">
          <Anchor className="w-3.5 h-3.5 text-amber-400" />
          <span>The Definitive Grand Line Encyclopedia & Cartography</span>
        </div>

        {/* Grand Title */}
        <h1 className="font-pirate text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wider drop-shadow-2xl">
          ONE PIECE WORLD
        </h1>

        {/* Subtitle / Roger's Quote */}
        <p className="font-cinzel text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
          "Inherited Will, The Swell of an Era, and The Dreams of People. As long as people continue
          to seek the true meaning of freedom, these things will never cease to be!"
        </p>

        {/* Key Voyage Stat Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 pb-4">
          <div className="bg-[#121824]/80 border border-amber-500/25 p-4 rounded-2xl backdrop-blur-md">
            <span className="font-pirate text-3xl md:text-4xl text-amber-400 font-bold block">
              ฿ 8.81B
            </span>
            <span className="font-cinzel text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Straw Hat Crew Bounty
            </span>
          </div>

          <div className="bg-[#121824]/80 border border-amber-500/25 p-4 rounded-2xl backdrop-blur-md">
            <span className="font-pirate text-3xl md:text-4xl text-sky-400 font-bold block">
              27 Stops
            </span>
            <span className="font-cinzel text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Chronicled Grand Line Islands
            </span>
          </div>

          <div className="bg-[#121824]/80 border border-amber-500/25 p-4 rounded-2xl backdrop-blur-md">
            <span className="font-pirate text-3xl md:text-4xl text-purple-400 font-bold block">
              4 Emperors
            </span>
            <span className="font-cinzel text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Yonko Fleets Documented
            </span>
          </div>

          <div className="bg-[#121824]/80 border border-amber-500/25 p-4 rounded-2xl backdrop-blur-md">
            <span className="font-pirate text-3xl md:text-4xl text-rose-400 font-bold block">
              5,600+
            </span>
            <span className="font-cinzel text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Straw Hat Grand Fleet
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              sound.playGoldenBell();
              onExploreMap();
            }}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black font-cinzel text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all transform active:scale-95 flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Grand Line World Map</span>
          </button>

          <button
            onClick={() => {
              sound.playSwordSlash();
              onExploreBounties();
            }}
            className="px-6 py-3.5 rounded-xl bg-[#141b29] hover:bg-[#1a2335] border border-amber-500/40 text-amber-300 font-bold font-cinzel text-xs uppercase tracking-widest transition-all transform active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Inspect Canonical Bounties</span>
          </button>
        </div>

        {/* Interactive Mouse Dragon Tip */}
        <div className="pt-8 text-xs text-sky-300/80 flex items-center justify-center gap-2 font-medium">
          <span className="animate-pulse">🐉</span>
          <span>
            Move your cursor across the screen to guide your <strong>Realistic Skeletal Dragon</strong>!
          </span>
        </div>

        {/* Down Indicator */}
        <div className="pt-6 animate-bounce">
          <a
            href="#straw-hats"
            className="text-gray-400 hover:text-amber-400 transition-colors inline-block"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 mx-auto" />
          </a>
        </div>
      </div>
    </div>
  );
};
