"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Disc } from "lucide-react";

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
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    }
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Sync mute state on mount/change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Autoplay on mount (when envelope opens)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay on mount prevented by browser, waiting for interaction:", err);
        });
    }
  }, []);

  return (
    <div 
      className="glass-panel border border-chocolate-200/50 rounded-2xl px-4 py-3 flex items-center justify-between shadow-xl max-w-xs w-full relative overflow-hidden"
      style={{
        boxShadow: "0 10px 25px -5px rgba(44, 26, 17, 0.15), inset 0 1px 1px rgba(255,255,255,0.4)"
      }}
    >
      {/* HTML5 Audio Player */}
      <audio 
        ref={audioRef} 
        src={`${basePath}/assets/You'll Be in My Heart.mp4`} 
        loop 
        preload="auto"
      />

      {/* Record Player Turntable Section */}
      <div className="flex items-center">
        {/* Vinyl disk container */}
        <div className="relative w-12 h-12 flex-shrink-0 mr-3 select-none">
          {/* Vinyl shadow */}
          <div className="absolute inset-0.5 rounded-full bg-black/40 blur-[1px] pointer-events-none" />
          
          {/* Vinyl record plate */}
          <div 
            className={`w-full h-full bg-[#161616] rounded-full border border-black/90 relative flex items-center justify-center shadow-md ${
              isPlaying ? "animate-spin-vinyl" : ""
            }`}
            style={{
              backgroundImage: "repeating-radial-gradient(circle, #222, #181818 2.5px, #121212 5px)"
            }}
          >
            {/* Vinyl inner groove lines */}
            <div className="absolute inset-1.5 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-3.5 rounded-full border border-white/5 pointer-events-none" />

            {/* Sunflower Center label */}
            <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-tr from-sunflower-500 to-amber-400 border border-sunflower-350 flex items-center justify-center z-10 shadow-inner">
              <span className="text-[7px] drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.3)]">🌻</span>
            </div>
            
            {/* Gloss shine reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-full pointer-events-none" />
          </div>

          {/* Pivoting Tonearm needle */}
          <div 
            className="absolute top-0 right-[-3px] w-4.5 h-7 origin-top-left transition-transform duration-700 pointer-events-none z-20"
            style={{
              transform: isPlaying ? "rotate(15deg) translateX(1px)" : "rotate(-12deg)"
            }}
          >
            {/* Tone arm metallic stick */}
            <svg className="w-full h-full stroke-[#A1A1AA] fill-none" viewBox="0 0 18 28" strokeWidth="1.5">
              <path d="M4 2 L14 2 L14 18 L8 22" />
              <circle cx="4" cy="2" r="1.5" fill="#71717A" stroke="none" />
              <path d="M6 22 L10 24" strokeWidth="2.5" stroke="#52525B" />
            </svg>
          </div>
        </div>

        {/* Music Information */}
        <div className="flex flex-col">
          <p className="text-[11px] sm:text-xs font-serif font-extrabold text-chocolate-900 truncate max-w-[115px] select-none" title="You'll Be in My Heart">
            You&apos;ll Be in My Heart
          </p>
          
          {/* Equalizer animation bars (Sunflower styled) */}
          <div className="flex items-end space-x-[2px] h-3 mt-1.5 w-16">
            {Array.from({ length: 6 }).map((_, idx) => {
              const dur = ["0.85s", "0.55s", "0.75s", "0.65s", "0.45s", "0.95s"][idx];
              return (
                <div 
                  key={idx} 
                  className="w-[3px] bg-gradient-to-t from-sunflower-600 to-sunflower-400 rounded-t-sm transition-all duration-300" 
                  style={{ 
                    height: isPlaying ? undefined : "2px",
                    animation: isPlaying ? `float ${dur} ease-in-out infinite alternate` : undefined,
                    animationDelay: `${idx * 0.12}s`
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Tactile Player Buttons */}
      <div className="flex items-center space-x-1.5 z-10">
        {/* Mute/Unmute */}
        <button
          onClick={handleToggleMute}
          className="p-1.5 rounded-full hover:bg-chocolate-100/60 text-chocolate-700 hover:text-chocolate-950 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        {/* Play/Pause Gold Button */}
        <button
          onClick={handleTogglePlay}
          className="p-2.5 rounded-full bg-gradient-to-r from-sunflower-400 via-amber-400 to-sunflower-500 hover:scale-105 active:scale-95 text-chocolate-950 shadow-md hover:shadow-lg transition-all border border-[#FFF3A8]/20 flex items-center justify-center"
          title={isPlaying ? "Pause" : "Play Music"}
        >
          {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}
