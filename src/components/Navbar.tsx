import React, { useState } from 'react';
import { Compass, Sparkles, Menu, X, Volume2, VolumeX, Shield, Anchor } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onPlayDrums: () => void;
  dragonEnabled: boolean;
  onToggleDragon: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPlayDrums, dragonEnabled, onToggleDragon }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const navLinks = [
    { label: 'Straw Hats', href: '#straw-hats' },
    { label: 'Four Emperors', href: '#pirate-legends' },
    { label: 'Marine Admirals', href: '#marines' },
    { label: 'World Map & Islands', href: '#world-map' },
    { label: 'Wanted Board', href: '#bounty-board' },
  ];

  const handleLinkClick = () => {
    sound.playSwordSlash();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090b10]/90 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={() => sound.playGoldenBell()}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center justify-center">
            <span className="text-xl">☠️</span>
          </div>
          <div>
            <span className="font-pirate text-2xl tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors block leading-tight">
              ONE PIECE WORLD
            </span>
            <span className="font-cinzel text-[9px] uppercase tracking-widest text-gray-400 block -mt-1">
              Grand Fleet & Marine Chronicle
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-cinzel text-xs font-semibold tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="px-3.5 py-2 rounded-lg text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Drums of Liberation Action */}
          <button
            onClick={() => {
              sound.playDrumsOfLiberation();
              onPlayDrums();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all active:scale-95 shadow-sm"
            title="Play the heartbeat Drums of Liberation (Sun God Nika)"
          >
            <span>🥁</span>
            <span>Nika Drums</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const nextMuted = !isMuted;
              sound.setMuted(nextMuted);
              setIsMuted(nextMuted);
              if (!nextMuted) sound.playGoldenBell();
            }}
            className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Toggle sound"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Dragon Toggle Indicator */}
          <button
            onClick={onToggleDragon}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-950/60 border border-sky-500/40 text-sky-300 hover:bg-sky-900/60 text-xs font-semibold transition-colors"
            title="Toggle Skeletal Dragon Cursor"
          >
            <span className={`w-2 h-2 rounded-full ${dragonEnabled ? 'bg-sky-400 animate-pulse' : 'bg-gray-500'}`} />
            <span>Dragon: {dragonEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1017] border-b border-amber-500/20 px-6 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="block py-2 text-sm font-cinzel font-semibold text-gray-300 hover:text-amber-300 border-b border-gray-800/60"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                sound.playDrumsOfLiberation();
                onPlayDrums();
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold"
            >
              🥁 Drums of Liberation
            </button>

            <button
              onClick={onToggleDragon}
              className="px-3 py-1.5 rounded-lg bg-sky-950 border border-sky-500/40 text-sky-300 text-xs font-semibold"
            >
              Dragon: {dragonEnabled ? 'Active' : 'Paused'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
