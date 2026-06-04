"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BirthdayCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);

    // Generate confetti particles
    const colors = [
      "#FFC000", // Sunflower Yellow
      "#FFD700", // Gold
      "#E6A100", // Dark Sunflower
      "#83553E", // Milk Chocolate
      "#F5EBE6", // Cream
      "#FF6B6B", // Coral Red
      "#4ECDC4", // Teal
    ];

    const tempParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300, // horizontal spread
      y: (Math.random() - 0.5) * 150 - 50, // vertical burst
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
    }));
    setParticles(tempParticles);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-12 px-4">
      {/* Interactive Birthday Cake Area */}
      <div className="relative w-72 h-80 flex flex-col items-center justify-end select-none">
        
        {/* Confetti Explosion */}
        <AnimatePresence>
          {isBlown && particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute z-50 rounded-full"
              style={{
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                left: "50%",
                bottom: "65%",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.x,
                y: p.y + 400, // falls down
                opacity: [1, 1, 0],
                rotate: Math.random() * 720,
                scale: 0.5,
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>

        {/* 1. THE CANDLE */}
        <div 
          className="relative flex flex-col items-center cursor-pointer group"
          onClick={handleBlow}
          style={{ bottom: "50px", zIndex: 30 }}
        >
          {/* Flame / Flame blow container */}
          <AnimatePresence>
            {!isBlown ? (
              <motion.div 
                className="relative w-4 h-8 flex flex-col items-center justify-end"
                exit={{ scale: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Flame element */}
                <div className="w-3 h-7 bg-gradient-to-t from-orange-600 via-sunflower-400 to-yellow-200 rounded-full animate-flicker blur-[1px] shadow-[0_0_15px_rgba(255,192,0,0.8)]" />
              </motion.div>
            ) : (
              /* Smoke Puff animation */
              <motion.div
                className="absolute -top-6 w-2 h-6 flex flex-col items-center justify-end"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.6, 0], y: -30, x: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-gray-400/50 blur-[1px]" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300/40 blur-[1px] -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle Wick */}
          <div className="w-0.5 h-2 bg-chocolate-950" />

          {/* Candle Body */}
          <div className="w-3 h-14 bg-gradient-to-r from-sunflower-300 via-sunflower-400 to-sunflower-500 rounded-sm relative overflow-hidden border border-sunflower-600/40 shadow-md">
            {/* Spiral stripes on candle */}
            <div className="absolute inset-0 bg-chocolate-drizzle opacity-30 transform -skew-y-12" />
          </div>
        </div>

        {/* 2. THE CAKE BODY (CSS layers) */}
        <div className="relative w-64 h-44 flex flex-col items-center" style={{ zIndex: 20 }}>
          
          {/* Top frosting cream stars */}
          <div className="absolute top-[8px] left-[10%] right-[10%] flex justify-between px-2 z-20">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="w-4 h-4 rounded-full bg-chocolate-50 border border-chocolate-200 shadow-sm" />
            ))}
          </div>

          {/* Cake Top Layer (Dark Chocolate Icing) */}
          <div className="w-full h-10 bg-chocolate-800 rounded-full border-t border-chocolate-600 shadow-md flex items-center justify-center relative overflow-hidden">
            {/* Chocolate drizzle pattern */}
            <div className="absolute inset-0 opacity-10 bg-chocolate-drizzle" />
            {/* Sunflower seeds or sprinkles on top */}
            <div className="absolute top-2 left-6 w-1.5 h-1 bg-sunflower-400 rounded-full rotate-45" />
            <div className="absolute top-3 right-10 w-1.5 h-1 bg-sunflower-300 rounded-full -rotate-12" />
            <div className="absolute top-1 left-28 w-1.5 h-1 bg-sunflower-500 rounded-full rotate-12" />
            <div className="absolute top-4 left-16 w-1.5 h-1 bg-sunflower-400 rounded-full -rotate-45" />
            <div className="absolute top-2 right-20 w-1.5 h-1 bg-sunflower-300 rounded-full rotate-45" />
          </div>

          {/* Cake Middle Cream Layer (Warm caramel / milk chocolate filling) */}
          <div className="w-full h-24 bg-gradient-to-b from-chocolate-700 via-chocolate-800 to-chocolate-900 -mt-5 rounded-b-[40px] border-x border-b border-chocolate-950 relative shadow-lg flex flex-col justify-between overflow-hidden">
            
            {/* Rich chocolate dripping effect (SVG drip overlay) */}
            <svg className="absolute top-0 left-0 w-full h-8 fill-chocolate-900 opacity-90" viewBox="0 0 256 32" preserveAspectRatio="none">
              <path d="M0,0 L256,0 L256,10 C240,15 235,5 220,10 C205,15 200,8 185,14 C170,20 165,10 150,12 C135,14 130,5 115,10 C100,15 95,8 80,12 C65,16 60,5 45,10 C30,15 25,5 10,12 C5,13 2,8 0,10 Z" />
            </svg>

            {/* Sunflower side decorations */}
            <div className="flex justify-around items-center h-full pt-6 z-10 px-4">
              <span className="text-xl animate-float-slow">🌻</span>
              <div className="flex flex-col items-center">
                <span className="text-sm font-serif font-bold text-sunflower-300 tracking-wider">HANA</span>
                <span className="text-[10px] uppercase font-semibold text-chocolate-300 tracking-widest">Sweet 28</span>
              </div>
              <span className="text-xl animate-float-medium delay-300">🌻</span>
            </div>

            {/* Cake Base Cream layer */}
            <div className="w-full h-4 bg-chocolate-950 border-t border-chocolate-900" />
          </div>
        </div>

        {/* 3. THE CAKE TRAY (Glass-plate/Gold stand) */}
        <div className="w-72 h-8 bg-gradient-to-r from-sunflower-600 via-sunflower-400 to-sunflower-700 rounded-full border-t border-sunflower-300 shadow-xl flex items-center justify-center -mt-4 relative" style={{ zIndex: 10 }}>
          <div className="w-60 h-2 bg-chocolate-950/20 rounded-full blur-[1px]" />
        </div>
      </div>

      {/* Guide text */}
      <div className="mt-8 text-center max-w-xs">
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.p
              key="guide"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-chocolate-800 text-sm font-semibold animate-pulse cursor-pointer"
              onClick={handleBlow}
            >
              🎂 Klik lilin untuk meniupnya! Make a wish!
            </motion.p>
          ) : (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-sunflower-200 shadow-md"
            >
              <h3 className="font-serif text-lg font-bold text-chocolate-800 mb-1">
                Selamat Ulang Tahun! 🎉
              </h3>
              <p className="text-xs text-chocolate-600">
                Semoga harimu dipenuhi kebahagiaan secerah bunga matahari dan manisnya cokelat terindah!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
