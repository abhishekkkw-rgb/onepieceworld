import React from 'react';
import { Compass, Sparkles, Anchor, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06080d] border-t border-amber-500/20 pt-16 pb-12 text-[#e6edf3] text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand & Tribute */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">☠️</span>
            <span className="font-pirate text-3xl text-amber-400 tracking-wider">
              ONE PIECE WORLD
            </span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed max-w-md">
            An interactive tribute to Eiichiro Oda's masterpiece <em>One Piece</em>. Documenting the
            heroic voyages of the Straw Hat Grand Fleet, the sovereign Four Emperors, Marine
            Headquarters, and the mysteries of the Void Century across the Grand Line.
          </p>
          <div className="pt-2 text-[11px] text-gray-500">
            © Eiichiro Oda / Shueisha, Toei Animation. Fan tribute application built for anime enthusiasts.
          </div>
        </div>

        {/* Quick Island Destinations */}
        <div>
          <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
            Grand Line Waypoints
          </h4>
          <ul className="space-y-1.5 text-gray-400">
            <li>
              <a href="#world-map" className="hover:text-amber-300 transition-colors">
                • Reverse Mountain & Twin Cape
              </a>
            </li>
            <li>
              <a href="#world-map" className="hover:text-amber-300 transition-colors">
                • Kingdom of Alabasta
              </a>
            </li>
            <li>
              <a href="#world-map" className="hover:text-amber-300 transition-colors">
                • Sky Island Skypiea
              </a>
            </li>
            <li>
              <a href="#world-map" className="hover:text-amber-300 transition-colors">
                • Enies Lobby Judicial Island
              </a>
            </li>
            <li>
              <a href="#world-map" className="hover:text-amber-300 transition-colors">
                • Wano Country (Land of Gold)
              </a>
            </li>
            <li>
              <a href="#world-map" className="hover:text-amber-300 transition-colors">
                • Egghead Future Island & Elbaf
              </a>
            </li>
          </ul>
        </div>

        {/* Marine & Pirate Powers */}
        <div>
          <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
            Great Hegemonies
          </h4>
          <ul className="space-y-1.5 text-gray-400">
            <li>
              <a href="#straw-hats" className="hover:text-amber-300 transition-colors">
                • Straw Hat Pirates (10 Members)
              </a>
            </li>
            <li>
              <a href="#pirate-legends" className="hover:text-amber-300 transition-colors">
                • Red Hair Pirates (Emperor Shanks)
              </a>
            </li>
            <li>
              <a href="#pirate-legends" className="hover:text-amber-300 transition-colors">
                • Cross Guild (Mihawk & Buggy)
              </a>
            </li>
            <li>
              <a href="#marines" className="hover:text-amber-300 transition-colors">
                • Marine Fleet Admiral & Admirals
              </a>
            </li>
            <li>
              <a href="#bounty-board" className="hover:text-amber-300 transition-colors">
                • Canonical Berries Wanted Registry
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Quote */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
        <div>
          <span>"The One Piece... IS REAL!" — Edward Newgate</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with passion for all nakama of the sea</span>
        </div>
      </div>
    </footer>
  );
};
