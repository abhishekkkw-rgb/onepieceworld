import React, { useEffect } from 'react';
import { Character } from '../types';
import { X, Sparkles, Shield, Sword, Compass, Zap, Flame, Award, Quote } from 'lucide-react';
import { sound } from '../utils/audio';

interface CharacterDetailModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({ character, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!character) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0f141f] border-2 border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.2)] overflow-hidden text-[#e6edf3] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-900/60 via-yellow-900/30 to-amber-900/60 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-pirate text-2xl text-amber-400">⚓ WORLD GOVERNMENT DOSSIER</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {character.affiliation}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playSwordSlash();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Authentic Wanted Poster Framing */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="wanted-paper w-full rounded-xl p-4 border-2 border-[#a38a60] shadow-2xl relative">
              <div className="text-center pb-1">
                <span className="font-cinzel text-[10px] tracking-widest text-[#423324] uppercase font-bold">
                  MARINE SECURITY DECREE
                </span>
                <h3 className="font-pirate text-3xl font-black text-[#2e1d0f] tracking-wide">
                  WANTED
                </h3>
              </div>

              <div className="relative aspect-[3/4] rounded-lg border-2 border-[#54412e] overflow-hidden bg-gradient-to-b from-[#1c1510] via-[#291f16] to-[#140e0a] mt-1 flex items-center justify-center p-1.5 shadow-inner">
                {/* Subtle backlight glow for character readability */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-contain object-top drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-center mt-3">
                <p className="font-cinzel text-[11px] font-bold text-[#5c4632] tracking-widest uppercase">
                  {character.affiliation === 'Marine' ? 'CROSS GUILD BOUNTY' : 'DEAD OR ALIVE'}
                </p>
                <h2 className="font-cinzel font-black text-xl text-[#1e130a] tracking-tight uppercase mt-0.5">
                  {character.name}
                </h2>
                {character.japaneseName && (
                  <p className="text-xs text-[#523d29] font-medium">{character.japaneseName}</p>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-[#9e845c] flex items-center justify-center gap-1.5 bg-[#422e1b]/10 py-1.5 rounded">
                <span className="font-pirate text-2xl text-[#362211] font-bold">฿</span>
                <span className="font-cinzel text-xl md:text-2xl font-black text-[#1a0e05] tracking-tight">
                  {character.bountyFormatted}
                </span>
              </div>
            </div>

            {/* Quick Sound Buttons */}
            <div className="mt-4 flex gap-2 w-full">
              <button
                onClick={() => sound.playDrumsOfLiberation()}
                className="flex-1 py-2 px-3 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                🥁 Drums of Nika
              </button>
              <button
                onClick={() => sound.playCannon()}
                className="flex-1 py-2 px-3 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                💣 Cannon Blast
              </button>
            </div>
          </div>

          {/* Right Column: Deep Dossier & Powers */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Title & Epithet */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="font-cinzel text-2xl md:text-3xl font-black text-amber-400">
                  {character.name}
                </h1>
              </div>

              <p className="text-amber-200/90 text-sm italic font-medium mb-3">
                "{character.epithet}"
              </p>

              {/* Status Pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="px-2.5 py-1 rounded bg-gray-800/80 border border-gray-700 flex items-center gap-1.5">
                  <Sword className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-gray-300">Crew / Unit:</span>
                  <span className="font-semibold text-white">{character.crew}</span>
                </div>

                <div className="px-2.5 py-1 rounded bg-gray-800/80 border border-gray-700 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-gray-300">Role:</span>
                  <span className="font-semibold text-white">{character.role}</span>
                </div>

                <div className="px-2.5 py-1 rounded bg-gray-800/80 border border-gray-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-gray-300">Origin:</span>
                  <span className="font-semibold text-white">{character.originSea}</span>
                </div>
              </div>

              {/* Iconic Quote */}
              <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 flex items-start gap-2.5">
                <Quote className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-100 font-serif italic text-sm leading-relaxed">
                  {character.quote}
                </p>
              </div>

              {/* Devil Fruit Section */}
              {character.devilFruit && (
                <div className="mt-4 p-4 rounded-xl bg-purple-950/30 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-pirate text-lg text-purple-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-purple-400" />
                      Devil Fruit: {character.devilFruit.name}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-purple-900/60 border border-purple-400/40 text-purple-200 font-bold uppercase">
                      {character.devilFruit.type}
                    </span>
                  </div>
                  {character.devilFruit.awakened && (
                    <div className="inline-block mb-1.5 px-2 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/50">
                      ⚡ AWAKENED ABILITY
                    </div>
                  )}
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    {character.devilFruit.description}
                  </p>
                </div>
              )}

              {/* Haki Masteries */}
              <div className="mt-4">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block mb-2">
                  Haki Proficiency
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`p-2.5 rounded-lg border text-center ${
                      character.haki.conquerors
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                        : 'bg-gray-900/40 border-gray-800 text-gray-500'
                    }`}
                  >
                    <div className="text-xs font-bold">Conqueror's (Haoshoku)</div>
                    <div className="text-[10px] mt-0.5 font-medium">
                      {character.haki.conquerors ? '★ Mastered' : '— None'}
                    </div>
                  </div>

                  <div
                    className={`p-2.5 rounded-lg border text-center ${
                      character.haki.armament
                        ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
                        : 'bg-gray-900/40 border-gray-800 text-gray-500'
                    }`}
                  >
                    <div className="text-xs font-bold">Armament (Busoshoku)</div>
                    <div className="text-[10px] mt-0.5 font-medium">
                      {character.haki.armament ? '★ Hardened' : '— None'}
                    </div>
                  </div>

                  <div
                    className={`p-2.5 rounded-lg border text-center ${
                      character.haki.observation
                        ? 'bg-sky-950/40 border-sky-500/60 text-sky-300'
                        : 'bg-gray-900/40 border-gray-800 text-gray-500'
                    }`}
                  >
                    <div className="text-xs font-bold">Observation (Kenbunshoku)</div>
                    <div className="text-[10px] mt-0.5 font-medium">
                      {character.haki.observation ? '★ Clairvoyant' : '— None'}
                    </div>
                  </div>
                </div>

                {character.haki.advancedNotes && (
                  <p className="mt-1.5 text-[11px] text-gray-400 italic">
                    Note: {character.haki.advancedNotes}
                  </p>
                )}
              </div>

              {/* Key Abilities */}
              <div className="mt-4">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                  Signature Moves & Weapons
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {character.keyAbilities.map((ab, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700 text-xs text-gray-200"
                    >
                      {ab}
                    </span>
                  ))}
                  {character.signatureWeapon && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-950/50 border border-amber-600/50 text-xs text-amber-300">
                      ⚔ {character.signatureWeapon}
                    </span>
                  )}
                </div>
              </div>

              {/* Lore & Biography */}
              <div className="mt-4 pt-3 border-t border-gray-800">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block mb-1">
                  World History & Chronicle
                </span>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-h-36 overflow-y-auto pr-1">
                  {character.lore}
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
