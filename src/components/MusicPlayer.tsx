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
    <div className="glass-panel border border-chocolate-200/50 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg max-w-xs w-full relative">
      
      {/* HTML5 Audio Player */}
      <audio 
        ref={audioRef} 
        src={`${basePath}/assets/You'll Be in My Heart.mp4`} 
        loop 
        preload="auto"
      />

      {/* Equalizer animation */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-sunflower-400/20 flex items-center justify-center text-sunflower-600">
          <Music size={16} className={isPlaying ? "animate-bounce" : ""} />
        </div>
        <div>
          <p className="text-[10px] sm:text-xs font-serif font-bold text-chocolate-850 truncate max-w-[125px]" title="You'll Be in My Heart">
            You&apos;ll Be in My Heart
          </p>
          <div className="flex items-end space-x-[2px] h-3 mt-1 w-16">
            {Array.from({ length: 6 }).map((_, idx) => {
              const dur = ["0.8s", "0.5s", "0.7s", "0.6s", "0.4s", "0.9s"][idx];
              return (
                <div 
                  key={idx} 
                  className={`w-[3px] bg-sunflower-500 rounded-t-sm transition-all duration-300`} 
                  style={{ 
                    height: isPlaying ? undefined : "2px",
                    animation: isPlaying ? `float ${dur} ease-in-out infinite alternate` : undefined,
                    animationDelay: `${idx * 0.1}s`
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleToggleMute}
          className="p-2 rounded-full hover:bg-chocolate-100 text-chocolate-700 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <button
          onClick={handleTogglePlay}
          className="p-2.5 rounded-full bg-sunflower-400 hover:bg-sunflower-500 text-chocolate-950 font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
          title={isPlaying ? "Pause" : "Play Music"}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}
