import React, { useState } from 'react';
import { Character } from '../types';
import { Shield, Sparkles, Sword, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface WantedPosterCardProps {
  character: Character;
  onInspect?: (character: Character) => void;
}

export const WantedPosterCard: React.FC<WantedPosterCardProps> = ({ character, onInspect }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    sound.playSwordSlash();
    if (onInspect) {
      onInspect(character);
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer select-none perspective-1000 transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Wanted Poster Parchment */}
      <div className="wanted-paper rounded-lg p-3.5 border-2 border-[#b59d74] shadow-2xl relative overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-[0_12px_35px_rgba(234,179,8,0.25)]">
        
        {/* Parchment Stains & Aged Corner Tears */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-amber-900/10 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-amber-900/10 rounded-tr-full pointer-events-none" />

        {/* Top Header: MARINE & DEAD OR ALIVE */}
        <div className="text-center pt-1 pb-1.5 border-b border-[#a89066]/50">
          <div className="flex items-center justify-center gap-1 text-[11px] font-cinzel font-bold text-[#4a3b2c] tracking-widest uppercase">
            <span>⚓</span>
            <span>WORLD GOVERNMENT KAIGUN</span>
            <span>⚓</span>
          </div>
          <h4 className="font-pirate text-2xl tracking-wider text-[#352516] leading-none mt-0.5 font-black">
            WANTED
          </h4>
        </div>

        {/* Character Portrait Frame */}
        <div className="relative mt-2 mx-auto w-full aspect-[3/4] rounded border-2 border-[#5c4935] overflow-hidden bg-gradient-to-b from-[#201811] via-[#2d2218] to-[#1a120c] flex items-center justify-center">
          {/* Subtle ambient backdrop for crisp character separation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,162,75,0.18),transparent_70%)] pointer-events-none" />

          {/* Character Photo - Contain mode so full character / face and half body is clearly visible without being overly zoomed or cropped */}
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-contain object-top p-1 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Affiliation / Rank Badge */}
          <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-amber-500/40 text-[10px] font-semibold text-amber-300 flex items-center gap-1">
            {character.affiliation === 'Marine' ? (
              <>
                <Shield className="w-2.5 h-2.5 text-sky-400" />
                <span>{character.rank || 'Marine Officer'}</span>
              </>
            ) : character.affiliation === 'Cross Guild' ? (
              <>
                <Flame className="w-2.5 h-2.5 text-purple-400" />
                <span>Cross Guild</span>
              </>
            ) : (
              <>
                <Sword className="w-2.5 h-2.5 text-amber-400" />
                <span>{character.role}</span>
              </>
            )}
          </div>

          {/* Conqueror's Haki Glow Indicator */}
          {character.haki.conquerors && (
            <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/60 text-[9px] font-bold text-rose-300 flex items-center gap-0.5" title="Conqueror's Haki Wielder">
              <Sparkles className="w-2.5 h-2.5 text-rose-400" />
              <span>HAOSHOKU</span>
            </div>
          )}
        </div>

        {/* DEAD OR ALIVE Caption */}
        <div className="text-center mt-2.5">
          <p className="font-cinzel text-[11px] font-extrabold tracking-widest text-[#523d2a]">
            {character.affiliation === 'Marine' ? 'SPECIAL TARGET PRIZE' : 'DEAD OR ALIVE'}
          </p>

          {/* Character Name */}
          <h3 className="font-cinzel font-black text-lg text-[#26190f] uppercase tracking-tight line-clamp-1 mt-0.5">
            {character.name}
          </h3>

          {/* Epithet */}
          <p className="text-[11px] text-[#634e3a] font-medium italic line-clamp-1">
            "{character.epithet}"
          </p>
        </div>

        {/* Bounty Bar */}
        <div className="mt-2 pt-1.5 border-t border-[#a89066]/60 flex items-center justify-between px-1">
          <div className="flex items-baseline gap-1">
            <span className="font-pirate text-xl text-[#3d2a1a] font-bold">฿</span>
            <span className="font-cinzel font-black text-lg text-[#22160e] tracking-tight">
              {character.bountyFormatted.split(' ')[0]}
            </span>
          </div>

          <span className="text-[10px] font-bold text-[#69533e] uppercase tracking-wider">
            {character.crew}
          </span>
        </div>

        {/* Marine Footer Stamp */}
        <div className="mt-1 flex items-center justify-between text-[8px] text-[#7a644c] uppercase font-mono px-1">
          <span>DOC: WGO-{character.id.toUpperCase()}</span>
          <span className="font-serif italic">CONFIRMED BOUNTY</span>
        </div>
      </div>
    </div>
  );
};
