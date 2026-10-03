import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Square, Volume2, Sparkles, Sliders } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface SpatialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpatialAudioModal: React.FC<SpatialModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeProfile, setActiveProfile] = useState<'audiophile' | 'spatial' | 'anc'>('spatial');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      audioSynth.stop();
      setIsPlaying(false);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    // Canvas animation for frequency bars
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const bars = 36;
      const barWidth = width / bars - 2;

      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + 2);
        let barHeight = 0;
        if (isPlaying) {
          const factor = Math.sin(phase + i * 0.3) * 0.5 + 0.5;
          barHeight = 15 + factor * (height - 30);
        } else {
          barHeight = 6 + Math.sin(i * 0.4) * 3;
        }

        ctx.fillStyle = isPlaying ? '#ffb77c' : '#534439';
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      }

      phase += 0.08;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const handleToggleSound = () => {
    if (isPlaying) {
      audioSynth.stop();
      setIsPlaying(false);
    } else {
      let modeKey = 'music';
      if (activeProfile === 'spatial') modeKey = 'gaming';
      if (activeProfile === 'anc') modeKey = 'travel';
      audioSynth.playProfile(modeKey, 6);
      setIsPlaying(true);
      setTimeout(() => {
        setIsPlaying(false);
      }, 6000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0C0E]/95 backdrop-blur-md"
        onClick={() => {
          audioSynth.stop();
          onClose();
        }}
      />

      <div className="relative w-full max-w-xl bg-[#121315] border border-[#534439]/40 text-[#e3e2e5] shadow-2xl z-10 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#534439]/20 pb-4">
          <div>
            <span className="font-mono text-[10px] text-[#ffb77c] uppercase tracking-widest block">
              AURIA Acoustic Lab
            </span>
            <h3 className="font-syne text-xl font-bold uppercase tracking-wider text-[#e3e2e5]">
              Spatial Stage Demonstration
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              audioSynth.stop();
              onClose();
            }}
            className="p-1 text-[#8e9197] hover:text-[#e3e2e5] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Visualizer Canvas */}
        <div className="bg-[#0B0C0E] border border-[#534439]/40 p-4 rounded-none">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8e9197] mb-2">
            <span>FREQUENCY SPECTRUM (20Hz - 20kHz)</span>
            <span className={isPlaying ? 'text-[#ffb77c] font-bold animate-pulse' : ''}>
              {isPlaying ? 'ACTIVE AUDIO STREAM' : 'STANDBY'}
            </span>
          </div>
          <canvas
            ref={canvasRef}
            width={480}
            height={120}
            className="w-full h-28 bg-[#121315]"
          />
        </div>

        {/* Profile Toggles */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveProfile('spatial');
              if (isPlaying) {
                audioSynth.playProfile('gaming', 6);
              }
            }}
            className={`p-3 border text-left text-xs font-semibold cursor-pointer transition-colors ${
              activeProfile === 'spatial'
                ? 'border-[#ffb77c] bg-[#1b1c1e] text-[#ffb77c]'
                : 'border-[#534439]/30 text-[#8e9197] hover:border-[#534439]'
            }`}
          >
            <span className="block font-syne text-sm text-[#e3e2e5]">Spatial 3D</span>
            <span className="text-[10px] font-mono">Binaural vectors</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveProfile('audiophile');
              if (isPlaying) {
                audioSynth.playProfile('music', 6);
              }
            }}
            className={`p-3 border text-left text-xs font-semibold cursor-pointer transition-colors ${
              activeProfile === 'audiophile'
                ? 'border-[#ffb77c] bg-[#1b1c1e] text-[#ffb77c]'
                : 'border-[#534439]/30 text-[#8e9197] hover:border-[#534439]'
            }`}
          >
            <span className="block font-syne text-sm text-[#e3e2e5]">Pure Harmonic</span>
            <span className="text-[10px] font-mono">Audiophile flat curve</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveProfile('anc');
              if (isPlaying) {
                audioSynth.playProfile('travel', 6);
              }
            }}
            className={`p-3 border text-left text-xs font-semibold cursor-pointer transition-colors ${
              activeProfile === 'anc'
                ? 'border-[#ffb77c] bg-[#1b1c1e] text-[#ffb77c]'
                : 'border-[#534439]/30 text-[#8e9197] hover:border-[#534439]'
            }`}
          >
            <span className="block font-syne text-sm text-[#e3e2e5]">-38dB ANC</span>
            <span className="text-[10px] font-mono">Cabin drone filter</span>
          </button>
        </div>

        {/* Audio Trigger Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8e9197]">
            Generates real-time synthetic binaural acoustic frequencies directly in your browser.
          </p>
          <button
            type="button"
            onClick={handleToggleSound}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#ffb77c] hover:bg-[#c9803f] text-[#4d2700] hover:text-[#432100] font-syne text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
          >
            {isPlaying ? (
              <>
                <Square size={14} className="fill-current" />
                <span>Halt Test Stream</span>
              </>
            ) : (
              <>
                <Play size={14} className="fill-current" />
                <span>Play Sound Profile</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
