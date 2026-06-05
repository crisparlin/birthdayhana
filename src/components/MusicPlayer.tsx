"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

const basePath = process.env.NODE_ENV === 'production' ? '/birthdayhana' : '';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => { setIsPlaying(true); })
        .catch((err) => { console.error("Playback failed:", err); });
    }
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => { setIsPlaying(true); })
        .catch(() => {});
    }
  }, []);

  const barDurations = ["0.85s", "0.55s", "0.75s", "0.65s", "0.45s", "0.95s", "0.7s"];
  const barHeights = [55, 85, 45, 90, 60, 75, 50];

  return (
    <div
      className="relative flex items-center gap-3.5 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255, 254, 248, 0.68)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        border: '1px solid rgba(255, 215, 0, 0.18)',
        boxShadow: '0 8px 32px rgba(44, 26, 17, 0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.7)',
        padding: '10px 14px',
        minWidth: '240px',
      }}
    >
      {/* Gold accent line top */}
      <div
        className="absolute top-0 left-6 right-6 h-[1.5px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.55), transparent)',
        }}
      />

      {/* HTML5 Audio */}
      <audio
        ref={audioRef}
        src={`${basePath}/assets/You'll Be in My Heart.mp4`}
        loop
        preload="auto"
      />

      {/* ── VINYL DISC ── */}
      <div className="relative w-12 h-12 flex-shrink-0 select-none">
        {/* Soft glow halo */}
        {isPlaying && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
              filter: 'blur(6px)',
              transform: 'scale(1.3)',
              animation: 'twinkle 2s ease-in-out infinite',
            }}
          />
        )}

        {/* Vinyl body */}
        <div
          className={`relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
            isPlaying ? 'animate-spin-vinyl' : ''
          }`}
          style={{
            background: 'radial-gradient(circle at 35% 30%, #2A2A2A, #111)',
            backgroundImage: `
              radial-gradient(circle at 35% 30%, #333 0%, #1A1A1A 30%, #111 60%),
              repeating-radial-gradient(circle, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3.5px)
            `,
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,0,0,0.8)',
          }}
        >
          {/* Groove rings */}
          <div className="absolute inset-1.5 rounded-full border border-white/[0.04]" />
          <div className="absolute inset-3 rounded-full border border-white/[0.04]" />
          <div className="absolute inset-4 rounded-full border border-white/[0.04]" />

          {/* Center label */}
          <div
            className="relative w-[22px] h-[22px] rounded-full z-10 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 40% 35%, #FFE573, #FFD700 45%, #E6A100 80%, #B87A00 100%)',
              boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ fontSize: '9px' }}>🌻</span>
          </div>

          {/* Gloss overlay */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
            }}
          />
        </div>

        {/* Tonearm */}
        <div
          className="absolute top-0 right-[-4px] w-5 h-8 origin-top-left pointer-events-none z-20 transition-transform duration-700"
          style={{ transform: isPlaying ? "rotate(18deg) translateX(1px)" : "rotate(-10deg)" }}
        >
          <svg className="w-full h-full" viewBox="0 0 20 32" fill="none">
            <line x1="4" y1="2" x2="14" y2="2" stroke="#8A8A9A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="2" x2="14" y2="20" stroke="#9A9AAA" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="20" x2="8" y2="26" stroke="#6A6A7A" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="4" cy="2" r="2" fill="#6A6A7A" />
          </svg>
        </div>
      </div>

      {/* ── TRACK INFO ── */}
      <div className="flex-1 min-w-0">
        {/* Song name */}
        <p
          className="font-serif text-[11px] font-semibold text-chocolate-900 truncate leading-tight"
          title="You'll Be in My Heart"
        >
          You&apos;ll Be in My Heart
        </p>
        <p className="text-[9px] font-sans font-light text-chocolate-400 tracking-wider uppercase mt-0.5 mb-2">
          Phil Collins
        </p>

        {/* Equalizer bars */}
        <div className="flex items-end gap-[2px] h-4">
          {barDurations.map((dur, idx) => (
            <div
              key={idx}
              className="rounded-t-sm"
              style={{
                width: '3px',
                background: `linear-gradient(to top, #E6A100, #FFD700, #FFE873)`,
                height: isPlaying ? `${barHeights[idx]}%` : '15%',
                animation: isPlaying ? `float ${dur} ease-in-out infinite alternate` : undefined,
                animationDelay: `${idx * 0.1}s`,
                transition: 'height 0.3s ease',
                opacity: isPlaying ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Mute button */}
        <button
          onClick={handleToggleMute}
          className="p-1.5 rounded-full transition-all duration-200"
          style={{
            color: isMuted ? '#9A6D55' : '#2C1A11',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(185,145,123,0.12)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Play/Pause – gold pill button */}
        <button
          onClick={handleTogglePlay}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-250"
          style={{
            background: 'linear-gradient(135deg, #FFE873 0%, #FFD700 45%, #E6A100 100%)',
            boxShadow: isPlaying
              ? '0 0 0 3px rgba(255,215,0,0.2), 0 4px 14px rgba(255,200,0,0.4)'
              : '0 3px 10px rgba(255,200,0,0.35)',
            color: '#2C1A11',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.93)';
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          }}
          title={isPlaying ? "Pause" : "Play Music"}
        >
          {isPlaying
            ? <Pause size={14} fill="currentColor" />
            : <Play size={14} fill="currentColor" style={{ marginLeft: '1px' }} />
          }
        </button>
      </div>
    </div>
  );
}
