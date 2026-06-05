"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: "circle" | "square" | "star" | "heart";
  rotation: number;
  duration: number;
}

export default function BirthdayCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);

    const colors = [
      "#FFC000", // Sunflower Yellow
      "#FFD700", // Gold
      "#E6A100", // Dark Sunflower
      "#83553E", // Milk Chocolate
      "#FAF6F0", // Cream
      "#FF5A5F", // Coral Red
      "#3A86FF", // Royal Blue
      "#8338EC", // Purple
      "#FF006E", // Magenta
    ];
    
    const shapes: ("circle" | "square" | "star" | "heart")[] = ["circle", "square", "star", "heart"];

    const tempParticles = Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 360, // horizontal spread
      y: -150 - Math.random() * 220, // vertical shoot up
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6,
      shape: shapes[i % shapes.length],
      rotation: Math.random() * 720,
      duration: 2.2 + Math.random() * 1.5,
    }));
    setParticles(tempParticles);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 px-2 w-full select-none">
      
      {/* Interactive Birthday Cake Container */}
      <div className="relative w-80 h-80 flex flex-col items-center justify-end">
        
        {/* Confetti Celebration Popper Explosion */}
        <AnimatePresence>
          {isBlown && particles.map((p) => {
            return (
              <motion.div
                key={p.id}
                className="absolute z-50 pointer-events-none"
                style={{
                  left: "50%",
                  bottom: "55%",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
                animate={{
                  x: p.x,
                  y: p.y + 350, // shoots up, then falls down
                  opacity: [1, 1, 0.8, 0],
                  scale: [0.5, 1.2, 0.8, 0.4],
                  rotate: p.rotation,
                }}
                transition={{
                  duration: p.duration,
                  ease: "easeOut",
                }}
              >
                {p.shape === "circle" && (
                  <div className="rounded-full" style={{ width: p.size, height: p.size, backgroundColor: p.color }} />
                )}
                {p.shape === "square" && (
                  <div className="transform rotate-12" style={{ width: p.size, height: p.size, backgroundColor: p.color }} />
                )}
                {p.shape === "star" && (
                  <span className="text-lg" style={{ color: p.color }}>★</span>
                )}
                {p.shape === "heart" && (
                  <span className="text-lg" style={{ color: p.color }}>♥</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* 1. THE CANDLE */}
        <div 
          className="relative flex flex-col items-center cursor-pointer group z-30"
          onClick={handleBlow}
          style={{ bottom: "52px" }}
        >
          {/* Candle Flame details */}
          <AnimatePresence>
            {!isBlown ? (
              <motion.div 
                className="relative w-6 h-10 flex items-center justify-center"
                exit={{ scale: 0, opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                {/* Layered SVG Flame with flickering motion */}
                <motion.div
                  className="relative w-5 h-9"
                  animate={{
                    scale: [1, 1.12, 0.95, 1.05, 1],
                    skewX: [0, 3, -3, 2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                >
                  {/* Outer Flame (Orange) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full animate-flicker blur-[1px] shadow-[0_0_20px_rgba(255,165,0,0.85)]" />
                  
                  {/* Middle Flame (Yellow) */}
                  <div className="absolute inset-1.5 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full blur-[0.5px] opacity-90" />
                  
                  {/* Inner Flame Core (White-Blue) */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3.5 bg-gradient-to-t from-blue-300 via-white to-white rounded-full opacity-95" />
                </motion.div>
              </motion.div>
            ) : (
              /* Smoke Puff animation when blown out */
              <motion.div
                className="absolute -top-7 w-3 h-8 flex flex-col items-center justify-end"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.7, 0.4, 0], y: -45, x: [0, 6, -6, 2] }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              >
                <div className="w-3 h-3 rounded-full bg-gray-400/40 blur-[1px]" />
                <div className="w-2 h-2 rounded-full bg-gray-300/30 blur-[1px] -mt-1.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300/20 blur-[1px] -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle Wick */}
          <div className="w-0.5 h-2 bg-chocolate-950/80" />

          {/* Candle Body */}
          <div className="w-3.5 h-16 bg-gradient-to-r from-sunflower-300 via-sunflower-400 to-amber-500 rounded-sm relative overflow-hidden border border-sunflower-600/50 shadow-md">
            {/* White spirals */}
            <div className="absolute inset-0 bg-chocolate-drizzle opacity-30 transform -skew-y-12" />
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-white/40 transform -skew-y-12" />
            <div className="absolute top-2/4 left-0 right-0 h-1 bg-white/40 transform -skew-y-12" />
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-white/40 transform -skew-y-12" />
          </div>
        </div>

        {/* 2. THE CAKE BODY (3D Shaded Chocolate Fudge) */}
        <div className="relative w-68 h-46 flex flex-col items-center z-20">
          
          {/* Frosting Star swirls on top */}
          <div className="absolute top-[8px] left-[7%] right-[7%] flex justify-between px-1 z-25">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div 
                key={idx} 
                className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#FAF6F0] to-[#EADBD3] border border-chocolate-200/50 shadow-sm relative"
              >
                {/* Red cherry decoration on center swirl */}
                {idx % 3 === 1 && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-sm" />
                )}
              </div>
            ))}
          </div>

          {/* Cake Top (Shiny Chocolate Icing glaze) */}
          <div className="w-full h-11 bg-gradient-to-b from-chocolate-800 to-chocolate-900 rounded-full border-t border-[#83553E]/40 shadow-inner flex items-center justify-center relative overflow-hidden">
            {/* Glossy shine overlay */}
            <div className="absolute top-1 left-6 right-6 h-2 bg-white/10 rounded-full blur-[0.5px]" />
            <div className="absolute inset-0 opacity-[0.08] bg-chocolate-drizzle" />
            
            {/* Colorful sprinkles */}
            <div className="absolute top-2 left-8 w-2 h-1 bg-sunflower-400 rounded-full rotate-45" />
            <div className="absolute top-4 right-14 w-1.5 h-1 bg-rose-400 rounded-full -rotate-12" />
            <div className="absolute top-1 left-32 w-2 h-1 bg-sunflower-300 rounded-full rotate-12" />
            <div className="absolute top-5 left-20 w-1.5 h-1 bg-[#3A86FF] rounded-full -rotate-45" />
            <div className="absolute top-3 right-28 w-2 h-1 bg-rose-300 rounded-full rotate-45" />
            <div className="absolute top-2 right-8 w-1.5 h-1 bg-sunflower-400 rounded-full rotate-12" />
          </div>

          {/* Cake Middle Cream Layer (Warm fudge filling with SVG drips) */}
          <div 
            className="w-full h-26 bg-gradient-to-b from-[#5E3726] via-[#48281B] to-[#361E14] -mt-5 rounded-b-[45px] border-x border-b border-chocolate-950 relative shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Deep Glossy Drizzle overlay (SVG Drips) */}
            <svg className="absolute top-0 left-0 w-full h-10 fill-[#27140B] opacity-95 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]" viewBox="0 0 272 35" preserveAspectRatio="none">
              <path d="M0,0 L272,0 L272,12 C255,18 250,6 235,12 C220,18 215,9 200,16 C185,23 180,11 165,14 C150,16 145,6 130,12 C115,18 110,9 95,14 C80,19 75,6 60,12 C45,18 40,6 25,14 C15,15 10,9 0,12 Z" />
            </svg>

            {/* Sunflower side decorations & central letter placard */}
            <div className="flex justify-between items-center h-full pt-8 z-10 px-6">
              <span className="text-2.5xl animate-float-slow filter drop-shadow-md">🌻</span>
              
              {/* Central plaque tag */}
              <div className="flex flex-col items-center bg-[#130703]/60 px-5 py-1.5 rounded-xl border border-sunflower-400/25 shadow-inner">
                <span className="text-sm font-serif font-extrabold text-[#FFE64D] tracking-widest drop-shadow-sm">HANA</span>
                <span className="text-[9px] uppercase font-bold text-chocolate-300 tracking-widest mt-0.5">Sweet 28</span>
              </div>

              <span className="text-2.5xl animate-float-medium delay-300 filter drop-shadow-md">🌻</span>
            </div>

            {/* Bottom crust layer */}
            <div className="w-full h-4.5 bg-gradient-to-r from-chocolate-950 via-chocolate-900 to-chocolate-950 border-t border-chocolate-900/60" />
          </div>
        </div>

        {/* 3. THE CAKE TRAY STAND (Gold-embossed server stand) */}
        <div 
          className="w-76 h-9 bg-gradient-to-r from-sunflower-600 via-[#FFE259] to-sunflower-700 rounded-full border-t-[1.5px] border-[#FFF3B3] shadow-2xl flex items-center justify-center -mt-4 relative z-10"
        >
          <div className="w-68 h-2.5 bg-chocolate-950/30 rounded-full blur-[1px]" />
          {/* Base Stand peg */}
          <div className="absolute top-[8px] w-24 h-4 bg-gradient-to-r from-sunflower-750 to-sunflower-650 rounded-b-lg border-x border-[#B87A00]/40 -z-10 shadow-md" />
        </div>
      </div>

      {/* Guide & Celebration Banner reveal */}
      <div className="mt-8 text-center max-w-sm w-full">
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2C1A11]/5 via-chocolate-200/20 to-[#2C1A11]/5 px-6 py-3 rounded-full border border-chocolate-200 shadow-sm cursor-pointer"
              onClick={handleBlow}
            >
              <span className="animate-ping w-2 h-2 rounded-full bg-sunflower-500" />
              <p className="text-chocolate-900 text-xs sm:text-sm font-bold tracking-wide uppercase">
                🎂 Klik lilin untuk meniupnya! Make a wish!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="parchment-bg px-6 py-5 rounded-2xl border-2 border-sunflower-400/30 shadow-2xl relative overflow-hidden"
            >
              {/* Inner gold frame border */}
              <div className="absolute inset-1.5 border border-sunflower-500/10 rounded-xl pointer-events-none" />

              <h3 className="gold-text font-serif text-2xl font-extrabold mb-2 flex items-center justify-center gap-1.5">
                <Heart size={16} fill="currentColor" className="text-rose-500 animate-pulse" />
                Selamat Ulang Tahun! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-chocolate-800 font-semibold leading-relaxed">
                Semoga seluruh impian dan harapanmu terkabul secerah senyum bunga matahari dan semanis cokelat terindah! Amin! 🌻❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
