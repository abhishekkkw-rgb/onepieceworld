import React, { useEffect } from 'react';
import { IslandHistory } from '../types';
import { X, MapPin, Compass, Skull, Sparkles, BookOpen, Flag, Anchor } from 'lucide-react';
import { sound } from '../utils/audio';

interface IslandDetailModalProps {
  island: IslandHistory | null;
  onClose: () => void;
}

export const IslandDetailModal: React.FC<IslandDetailModalProps> = ({ island, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!island) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0d121c] border-2 border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.25)] overflow-hidden text-[#e6edf3] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with island artwork */}
        <div className="relative h-64 md:h-72 w-full overflow-hidden bg-slate-900 border-b border-amber-500/30">
          <img
            src={island.image}
            alt={island.name}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-[#0d121c]/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <Anchor className="w-3.5 h-3.5" />
              Stop #{island.orderVisited} on Grand Voyage
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 border border-sky-400/40 text-sky-300 backdrop-blur-sm">
              {island.sea}
            </span>
            {island.roadPoneglyph && (
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-950/90 border border-rose-500 text-rose-300 flex items-center gap-1 backdrop-blur-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                ROAD PONEGLYPH LOCATION
              </span>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playSwordSlash();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-gray-600 text-gray-300 hover:text-white hover:bg-black flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Island Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="text-xs text-amber-300 font-semibold tracking-wider uppercase mb-1">
              {island.saga} • {island.arcName} ({island.episodeRange})
            </div>
            <h2 className="font-cinzel text-3xl md:text-4xl font-black text-white tracking-wide drop-shadow-md">
              {island.name}
            </h2>
            {island.japaneseName && (
              <p className="text-amber-400/90 font-serif text-sm font-medium">{island.japaneseName}</p>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="font-pirate text-xl text-amber-400 flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-amber-400" />
              Island Setting & Historical Lore
            </h3>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed bg-[#141a26] p-4 rounded-xl border border-gray-800">
              {island.summary}
            </p>
          </div>

          {/* What Luffy & the Straw Hats did here (Primary Requirement) */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-950/20 to-transparent p-5 rounded-xl border border-amber-500/30">
            <h3 className="font-pirate text-2xl text-amber-400 flex items-center gap-2 mb-3">
              <Flag className="w-5 h-5 text-amber-400" />
              What Luffy & the Straw Hat Crew Did Here
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-200">
              {island.strawHatActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pivotal Moments & Antagonists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pivotal Moments */}
            <div className="bg-[#141a26] p-4 rounded-xl border border-gray-800">
              <h4 className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Epoch-Defining Moments
              </h4>
              <div className="space-y-1.5">
                {island.pivotalMoments.map((moment, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-gray-900/80 border border-gray-800 text-xs text-gray-300 font-medium"
                  >
                    ★ {moment}
                  </div>
                ))}
              </div>
            </div>

            {/* Major Antagonists */}
            <div className="bg-[#141a26] p-4 rounded-xl border border-gray-800">
              <h4 className="text-xs uppercase font-bold tracking-wider text-rose-300 flex items-center gap-1.5 mb-2.5">
                <Skull className="w-4 h-4 text-rose-400" />
                Major Foes Confronted
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {island.majorAntagonists.map((villain, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-600/40 text-rose-200 text-xs font-semibold"
                  >
                    ☠ {villain}
                  </span>
                ))}
              </div>

              {/* Notable Locations */}
              <h4 className="text-xs uppercase font-bold tracking-wider text-sky-300 flex items-center gap-1.5 mt-4 mb-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                Key Landmarks & Sites
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {island.notableLocations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-gray-800 text-[11px] text-gray-300 border border-gray-700"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-800">
            <div className="text-xs text-gray-400 italic">
              Log Pose Time: {island.logPoseTime || 'Special Magnetic / Vivre Card Alignment'}
            </div>
            <button
              onClick={() => {
                sound.playGoldenBell();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Close Island Chronicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
