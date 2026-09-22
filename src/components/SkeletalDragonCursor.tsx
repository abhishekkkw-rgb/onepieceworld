import React, { useEffect, useRef, useState } from 'react';
import { DragonAura, DragonSize } from '../types';
import { Sparkles, Eye, Sliders, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface SkeletalDragonCursorProps {
  aura: DragonAura;
  size: DragonSize;
  enabled: boolean;
  onToggle: () => void;
  onChangeAura: (aura: DragonAura) => void;
  onChangeSize: (size: DragonSize) => void;
}

interface Point {
  x: number;
  y: number;
  angle: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export const SkeletalDragonCursor: React.FC<SkeletalDragonCursorProps> = ({
  aura,
  size,
  enabled,
  onToggle,
  onChangeAura,
  onChangeSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Dragon state refs (avoid react re-render overhead on 60fps canvas)
  const mouseRef = useRef({ x: -200, y: -200, prevX: -200, prevY: -200, speed: 0 });
  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const jawOpenRef = useRef(0);
  const isMouseDownRef = useRef(false);

  // Configuration values based on size
  const numSegments = size === 'colossal' ? 44 : size === 'large' ? 36 : 28;
  const segmentDist = size === 'colossal' ? 14 : size === 'large' ? 11 : 8.5;
  const scale = size === 'colossal' ? 1.35 : size === 'large' ? 1.05 : 0.8;

  // Aura colors
  const getAuraColor = () => {
    switch (aura) {
      case 'azure':
        return { primary: '#38bdf8', secondary: '#0284c7', glow: 'rgba(56, 189, 248, 0.45)', core: '#e0f2fe' };
      case 'crimson':
        return { primary: '#f43f5e', secondary: '#be123c', glow: 'rgba(244, 63, 94, 0.45)', core: '#ffe4e6' };
      case 'gold':
        return { primary: '#f59e0b', secondary: '#d97706', glow: 'rgba(245, 158, 11, 0.45)', core: '#fef3c7' };
      case 'spectral':
        return { primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.45)', core: '#d1fae5' };
      case 'shadow':
      default:
        return { primary: '#a855f7', secondary: '#7e22ce', glow: 'rgba(168, 85, 247, 0.45)', core: '#f3e8ff' };
    }
  };

  useEffect(() => {
    // Initialize segments offscreen
    const initialPoints: Point[] = [];
    const startX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    const startY = typeof window !== 'undefined' ? window.innerHeight / 2 : 500;
    for (let i = 0; i < 50; i++) {
      initialPoints.push({ x: startX - i * segmentDist, y: startY, angle: 0 });
    }
    pointsRef.current = initialPoints;
    mouseRef.current = { x: startX, y: startY, prevX: startX, prevY: startY, speed: 0 };
  }, [segmentDist]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      const dx = mx - mouseRef.current.x;
      const dy = my - mouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      mouseRef.current.speed = Math.min(speed, 60);

      // Chance to spawn trail particle on movement
      if (Math.random() < 0.6) {
        particlesRef.current.push({
          x: mx - dx * 0.4 + (Math.random() - 0.5) * 10,
          y: my - dy * 0.4 + (Math.random() - 0.5) * 10,
          vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
          vy: -dy * 0.15 + (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          maxLife: 30 + Math.random() * 20,
          size: 2 + Math.random() * 4 * scale,
        });
      }
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
      jawOpenRef.current = 1.0;
      sound.playDragonGrowl();
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, scale]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.05;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      const auraColors = getAuraColor();
      const points = pointsRef.current;

      // Update Head position smoothly towards mouse (giving organic trailing follow)
      if (points.length > 0) {
        const head = points[0];
        const hdx = targetX - head.x;
        const hdy = targetY - head.y;
        head.x += hdx * 0.35; // spring to mouse
        head.y += hdy * 0.35;
        head.angle = Math.atan2(hdy, hdx);

        // Jaw animation
        if (isMouseDownRef.current) {
          jawOpenRef.current = Math.min(1.0, jawOpenRef.current + 0.1);
        } else {
          jawOpenRef.current = Math.max(0, jawOpenRef.current - 0.05);
        }

        // Serpentine wave undulation
        const speed = mouseRef.current.speed;
        const waveFreq = 0.25;
        const waveSpeed = 8.0;
        const waveAmp = (1.5 + Math.min(speed * 0.08, 4)) * scale;

        // Update body segments with Inverse Kinematics and spine follow
        for (let i = 1; i < numSegments; i++) {
          const prev = points[i - 1];
          const curr = points[i];

          let dx = curr.x - prev.x;
          let dy = curr.y - prev.y;
          let angle = Math.atan2(dy, dx);

          // Add lateral serpentine oscillation
          const sideWave = Math.sin(time * waveSpeed - i * waveFreq) * waveAmp * (i / numSegments);
          const perpAngle = angle + Math.PI / 2;

          curr.x = prev.x + Math.cos(angle) * segmentDist + Math.cos(perpAngle) * sideWave * 0.2;
          curr.y = prev.y + Math.sin(angle) * segmentDist + Math.sin(perpAngle) * sideWave * 0.2;
          curr.angle = angle;
        }

        // Draw Soul Fire Particles
        ctx.save();
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
          const progress = p.life / p.maxLife;

          if (progress <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * progress, 0, Math.PI * 2);
          ctx.fillStyle = auraColors.primary;
          ctx.globalAlpha = progress * 0.6;
          ctx.shadowBlur = 10;
          ctx.shadowColor = auraColors.glow;
          ctx.fill();
        }
        ctx.restore();

        // DRAW SKELETAL DRAGON (Tail to Head for proper depth layering)
        ctx.save();

        // 1. Draw Tail Tip Spear / Fluke (Bone spear blade at the end of spine)
        const tailIdx = numSegments - 1;
        if (tailIdx >= 0 && points[tailIdx]) {
          const tPt = points[tailIdx];
          ctx.save();
          ctx.translate(tPt.x, tPt.y);
          ctx.rotate(tPt.angle);

          // Tail blade
          ctx.beginPath();
          ctx.moveTo(-15 * scale, 0);
          ctx.lineTo(2 * scale, -10 * scale);
          ctx.lineTo(16 * scale, 0);
          ctx.lineTo(2 * scale, 10 * scale);
          ctx.closePath();
          ctx.fillStyle = '#dfd3c0';
          ctx.strokeStyle = '#5a4d3c';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fill();

          // Tail barb fin
          ctx.beginPath();
          ctx.moveTo(-5 * scale, 0);
          ctx.quadraticCurveTo(-18 * scale, -18 * scale, -28 * scale, -22 * scale);
          ctx.quadraticCurveTo(-18 * scale, -5 * scale, -15 * scale, 0);
          ctx.quadraticCurveTo(-18 * scale, 5 * scale, -28 * scale, 22 * scale);
          ctx.quadraticCurveTo(-18 * scale, 18 * scale, -5 * scale, 0);
          ctx.fillStyle = 'rgba(235, 225, 205, 0.75)';
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        }

        // 2. Draw Skeletal Claws / Limbs (Hind legs at seg 18, Front legs at seg 8)
        const drawClaw = (segIdx: number, side: number, legScale: number) => {
          if (segIdx >= points.length) return;
          const pt = points[segIdx];
          const angle = pt.angle + (side * Math.PI) / 2;

          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate(pt.angle);

          const joint1X = Math.cos(angle) * 16 * legScale;
          const joint1Y = Math.sin(angle) * 16 * legScale;
          const joint2X = joint1X + Math.cos(angle - side * 0.4) * 20 * legScale;
          const joint2Y = joint1Y + Math.sin(angle - side * 0.4) * 20 * legScale;

          // Upper bone
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(joint1X, joint1Y);
          ctx.lineTo(joint2X, joint2Y);
          ctx.strokeStyle = '#dfd2bc';
          ctx.lineWidth = 3.5 * scale;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Three sharp bone talons
          for (let c = -1; c <= 1; c++) {
            const clawAngle = angle + c * 0.35 + side * 0.2;
            ctx.beginPath();
            ctx.moveTo(joint2X, joint2Y);
            ctx.lineTo(
              joint2X + Math.cos(clawAngle) * 11 * legScale,
              joint2Y + Math.sin(clawAngle) * 11 * legScale
            );
            ctx.strokeStyle = '#2b2319';
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
          }

          ctx.restore();
        };

        // Draw rear claws
        const rearSeg = Math.min(20, numSegments - 6);
        drawClaw(rearSeg, 1, scale * 0.9);
        drawClaw(rearSeg, -1, scale * 0.9);

        // Draw front claws
        const frontSeg = Math.min(9, numSegments - 4);
        drawClaw(frontSeg, 1, scale * 1.1);
        drawClaw(frontSeg, -1, scale * 1.1);

        // 3. Draw Rib Cage & Vertebrae Segments
        for (let i = numSegments - 1; i >= 1; i--) {
          const pt = points[i];
          const t = i / numSegments; // 0 at neck, 1 at tail
          const boneWidth = (1 - t) * 12 * scale + 3 * scale;

          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate(pt.angle);

          // Dorsal spine spike / needle
          const spikeLen = Math.max(0, Math.sin(t * Math.PI) * 14 * scale);
          if (spikeLen > 2) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-4 * scale, -spikeLen);
            ctx.lineTo(-2 * scale, -spikeLen * 0.9);
            ctx.lineTo(0, 0);
            ctx.fillStyle = '#f0e8d8';
            ctx.fill();
            ctx.strokeStyle = '#857560';
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Skeletal Ribs (Segments 3 to 24)
          if (i >= 3 && i <= Math.min(24, numSegments - 4)) {
            const ribT = (i - 3) / 21;
            const ribSpan = Math.sin(ribT * Math.PI) * 26 * scale + 6 * scale;
            const ribCurve = 8 * scale;

            // Left and right curved ribs
            [-1, 1].forEach((dir) => {
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.bezierCurveTo(
                -4 * scale,
                dir * (ribSpan * 0.5),
                ribCurve * 0.4,
                dir * ribSpan,
                8 * scale,
                dir * (ribSpan * 0.85)
              );
              ctx.strokeStyle = '#ede4d3';
              ctx.lineWidth = Math.max(1.5, 2.8 * (1 - t * 0.5) * scale);
              ctx.lineCap = 'round';
              ctx.stroke();

              // Rib bone highlight
              ctx.beginPath();
              ctx.moveTo(-1 * scale, dir * 2);
              ctx.lineTo(3 * scale, dir * (ribSpan * 0.7));
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 0.8 * scale;
              ctx.stroke();
            });
          }

          // Vertebra Bone Disk
          ctx.beginPath();
          ctx.ellipse(0, 0, boneWidth * 0.65, boneWidth * 0.45, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#f5ede0';
          ctx.fill();
          ctx.strokeStyle = '#6e5f4c';
          ctx.lineWidth = 1.2 * scale;
          ctx.stroke();

          // Center spinal canal shadow
          ctx.beginPath();
          ctx.arc(0, 0, boneWidth * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = '#261f18';
          ctx.fill();

          ctx.restore();
        }

        // 4. Draw Skeletal Dragon Skull (at points[0])
        const headPt = points[0];
        ctx.save();
        ctx.translate(headPt.x, headPt.y);
        ctx.rotate(headPt.angle);

        // Dragon Horns (Majestic sweeping bone horns like Kaido / Leviathan)
        const hornLength = 36 * scale;
        [-1, 1].forEach((hDir) => {
          // Main Long Horn
          ctx.beginPath();
          ctx.moveTo(-8 * scale, hDir * 7 * scale);
          ctx.bezierCurveTo(
            -22 * scale,
            hDir * 20 * scale,
            -hornLength * 0.8,
            hDir * (hornLength * 0.75),
            -hornLength * 1.3,
            hDir * (hornLength * 0.3)
          );
          ctx.bezierCurveTo(
            -hornLength * 0.75,
            hDir * (hornLength * 0.6),
            -18 * scale,
            hDir * 12 * scale,
            -4 * scale,
            hDir * 9 * scale
          );
          ctx.closePath();
          ctx.fillStyle = '#dfd2bd';
          ctx.fill();
          ctx.strokeStyle = '#4e4131';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Horn ridges
          for (let r = 1; r <= 3; r++) {
            ctx.beginPath();
            ctx.arc(-8 * scale - r * 6 * scale, hDir * (8 * scale + r * 5 * scale), 2 * scale, 0, Math.PI);
            ctx.strokeStyle = '#7c6951';
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Secondary lower brow horn
          ctx.beginPath();
          ctx.moveTo(-2 * scale, hDir * 10 * scale);
          ctx.quadraticCurveTo(-14 * scale, hDir * 16 * scale, -18 * scale, hDir * 8 * scale);
          ctx.quadraticCurveTo(-10 * scale, hDir * 11 * scale, 0, hDir * 9 * scale);
          ctx.fillStyle = '#cfbeaa';
          ctx.fill();
          ctx.strokeStyle = '#4e4131';
          ctx.stroke();
        });

        // Lower Skeletal Jaw (Articulated on clicks/fast movement)
        const jawRot = jawOpenRef.current * 0.32;
        ctx.save();
        ctx.translate(-4 * scale, 4 * scale);
        ctx.rotate(jawRot);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(24 * scale, 4 * scale);
        ctx.lineTo(28 * scale, 0);
        ctx.lineTo(16 * scale, -2 * scale);
        ctx.lineTo(0, -1 * scale);
        ctx.closePath();
        ctx.fillStyle = '#e8decb';
        ctx.fill();
        ctx.strokeStyle = '#5a4d3b';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Lower teeth
        for (let t = 0; t < 5; t++) {
          ctx.beginPath();
          ctx.moveTo(8 * scale + t * 4 * scale, 1 * scale);
          ctx.lineTo(10 * scale + t * 4 * scale, -4 * scale);
          ctx.lineTo(11 * scale + t * 4 * scale, 1 * scale);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
        ctx.restore();

        // Upper Cranium & Snout (Main Skull)
        ctx.beginPath();
        ctx.moveTo(-12 * scale, -7 * scale); // back of skull
        ctx.bezierCurveTo(-8 * scale, -14 * scale, 8 * scale, -13 * scale, 18 * scale, -6 * scale); // brow
        ctx.lineTo(34 * scale, -2 * scale); // upper snout tip
        ctx.lineTo(35 * scale, 2 * scale); // front nose hook
        ctx.lineTo(24 * scale, 4 * scale); // upper palate
        ctx.bezierCurveTo(14 * scale, 3 * scale, 6 * scale, 8 * scale, -10 * scale, 6 * scale); // cheekbone
        ctx.closePath();
        ctx.fillStyle = '#f5efe3';
        ctx.fill();
        ctx.strokeStyle = '#524332';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Upper Sharp Fangs / Teeth
        for (let t = 0; t < 6; t++) {
          ctx.beginPath();
          ctx.moveTo(12 * scale + t * 3.5 * scale, 2 * scale);
          ctx.lineTo(13.5 * scale + t * 3.5 * scale, 6.5 * scale);
          ctx.lineTo(15 * scale + t * 3.5 * scale, 2 * scale);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }

        // Hollow Nasal Cavity
        ctx.beginPath();
        ctx.ellipse(26 * scale, -1 * scale, 3 * scale, 1.6 * scale, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#1c1611';
        ctx.fill();

        // Hollow Eye Socket with Glowing Soul Fire
        const eyeX = 4 * scale;
        const eyeY = -4 * scale;
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, 6 * scale, 4.5 * scale, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#110d0a';
        ctx.fill();
        ctx.strokeStyle = '#3d3023';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Glowing Soul Flame Eye
        ctx.save();
        const eyeGrad = ctx.createRadialGradient(eyeX, eyeY, 1, eyeX, eyeY, 8 * scale);
        eyeGrad.addColorStop(0, '#ffffff');
        eyeGrad.addColorStop(0.3, auraColors.core);
        eyeGrad.addColorStop(0.7, auraColors.primary);
        eyeGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = eyeGrad;
        ctx.shadowColor = auraColors.primary;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 5 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Slit Dragon Pupil
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, 1.2 * scale, 3.5 * scale, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.restore();

        ctx.restore(); // end skull transform
        ctx.restore(); // end main canvas state
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [enabled, numSegments, segmentDist, scale, aura]);

  return (
    <>
      {/* Full screen passive canvas for the Realistic Skeletal Dragon */}
      {enabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Floating Dragon Companion Control Widget */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 text-xs">
        {showSettings && (
          <div className="bg-[#121722]/95 border border-amber-500/30 backdrop-blur-md p-4 rounded-xl shadow-2xl w-64 text-[#e6edf3] mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <span className="font-pirate text-lg text-amber-400 tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Skeletal Dragon Cursor
              </span>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white text-base px-1"
                aria-label="Close Dragon settings"
              >
                ✕
              </button>
            </div>

            {/* Enable/Disable Toggle */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-gray-300">Dragon Companion</span>
              <button
                onClick={onToggle}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  enabled ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {enabled ? 'Active' : 'Disabled'}
              </button>
            </div>

            {/* Dragon Size */}
            <div className="mt-3">
              <span className="text-gray-400 block mb-1 text-[11px] uppercase tracking-wider">Dragon Size</span>
              <div className="grid grid-cols-3 gap-1">
                {(['sleek', 'large', 'colossal'] as DragonSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => onChangeSize(s)}
                    className={`py-1 capitalize rounded border text-center transition-all ${
                      size === s
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-bold'
                        : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Aura Flame Color */}
            <div className="mt-3">
              <span className="text-gray-400 block mb-1 text-[11px] uppercase tracking-wider">Soul Fire Aura</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'azure', label: 'Kaido Azure', color: 'bg-sky-500' },
                  { id: 'gold', label: 'Sun God Nika', color: 'bg-amber-500' },
                  { id: 'crimson', label: 'Asura Red', color: 'bg-rose-500' },
                  { id: 'spectral', label: 'Soul Green', color: 'bg-emerald-500' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChangeAura(item.id as DragonAura)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-all ${
                      aura === item.id
                        ? 'border-amber-400 bg-amber-500/15 text-white'
                        : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between">
              <span className="text-gray-400 text-xs">Audio FX</span>
              <button
                onClick={() => {
                  const nextMuted = !isMuted;
                  sound.setMuted(nextMuted);
                  setIsMuted(nextMuted);
                  if (!nextMuted) sound.playGoldenBell();
                }}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>

            <p className="mt-2 text-[10px] text-gray-400 italic text-center">
              Move cursor to guide the skeletal serpent. Click to snap jaws!
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Quick Audio Bell Button */}
          <button
            onClick={() => {
              sound.playDrumsOfLiberation();
            }}
            title="Play Drums of Liberation (Nika Beat)"
            className="p-2.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 backdrop-blur-md shadow-lg transition-transform active:scale-95"
            aria-label="Play Drums of Liberation"
          >
            🥁
          </button>

          {/* Dragon Quick Toggle Pill */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#161d2b]/90 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:bg-[#1a2334] backdrop-blur-md shadow-xl transition-all active:scale-95"
            title="Configure Skeletal Dragon Companion"
          >
            <span className="relative flex h-2 w-2">
              {enabled && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${enabled ? 'bg-sky-400' : 'bg-gray-500'}`}></span>
            </span>
            <span className="font-semibold text-xs tracking-wide">
              {enabled ? 'Dragon Active' : 'Dragon Paused'}
            </span>
            <Sliders className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>
    </>
  );
};
