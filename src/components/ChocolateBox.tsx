"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Chocolate {
  id: number;
  name: string;
  shape: string;
  color: string;
  decor: string;
  message: string;
  shadowGlow?: string;
  drizzle?: boolean;
  creamDot?: boolean;
}

interface BiteSparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function ChocolateBox() {
  const [bittenIds, setBittenIds] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);
  const [biteSparkles, setBiteSparkles] = useState<BiteSparkle[]>([]);

  const chocolates: Chocolate[] = [
    {
      id: 1,
      name: "Golden Foil Truffle",
      shape: "rounded-full",
      color: "bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600 border border-yellow-200/50",
      decor: "✨",
      shadowGlow: "shadow-[0_0_15px_rgba(255,215,0,0.55)]",
      message: "Kamu sangat berharga dan bersinar terang di mataku! ✨"
    },
    {
      id: 2,
      name: "Rich Dark Cocoa",
      shape: "rounded-lg",
      color: "bg-gradient-to-br from-chocolate-900 to-chocolate-950 border border-chocolate-850",
      decor: "🍫",
      drizzle: true,
      message: "Sama seperti cokelat ini, kasih sayangku padamu murni, pekat, dan tulus! 🍫"
    },
    {
      id: 3,
      name: "Strawberry Cream Cup",
      shape: "rounded-t-full rounded-b-md",
      color: "bg-gradient-to-br from-rose-400 via-rose-300 to-rose-500 border border-rose-300/40",
      decor: "🍓",
      creamDot: true,
      message: "Kamu selalu membawa keceriaan dan rasa manis di setiap hariku! 🍓"
    },
    {
      id: 4,
      name: "Sweet Heart Caramel",
      shape: "w-10 h-10 rotate-45 transform flex items-center justify-center rounded-tl-xl rounded-br-xl",
      color: "bg-gradient-to-br from-orange-400 via-amber-500 to-chocolate-600 border border-orange-300/45",
      decor: "❤️",
      message: "Setiap detak jantungku mengirimkan doa manis untuk kebahagiaanmu! 💛"
    },
    {
      id: 5,
      name: "Sweet Tulip Praline",
      shape: "rounded-t-full rounded-b-2xl",
      color: "bg-gradient-to-br from-pink-400 via-rose-300 to-pink-600 border border-pink-300/40",
      decor: "🌷",
      message: "Secantik bunga tulip yang mekar, kehadiranmu selalu membawa keindahan dan kehangatan di hidupku! 🌷"
    },
    {
      id: 6,
      name: "Sunflower Chocolate Cup",
      shape: "rounded-full border-2 border-sunflower-300 animate-spin-slow",
      color: "bg-gradient-to-br from-sunflower-400 to-chocolate-800",
      decor: "🌻",
      message: "Kamu adalah bunga matahari favoritku, pembuat cerah duniaku! 🌻"
    }
  ];

  const handleChocClick = (choc: Chocolate, event: React.MouseEvent<HTMLDivElement>) => {
    const isBitten = bittenIds.includes(choc.id);
    
    if (!isBitten) {
      setBittenIds([...bittenIds, choc.id]);
      
      // Calculate cursor position inside grid item for sparkle launch origin
      const rect = event.currentTarget.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      
      // Generate particles
      const colors = ["#FFE64D", "#FFD700", "#FF9999", "#83553E", "#FAF6F0", "#FFC000"];
      const newSparkles = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 140, // spread X
        y: (Math.random() - 0.5) * 140, // spread Y
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 3,
      }));
      setBiteSparkles((prev) => [...prev, ...newSparkles]);

      // Cleanup sparkles
      setTimeout(() => {
        setBiteSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
      }, 1500);
    }
    
    setActiveMessage(choc.message);
    setActiveName(choc.name);
  };

  return (
    <div className="relative flex flex-col items-center py-6 px-2 w-full select-none">
      
      {/* Sparkles Emitters */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {biteSparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: s.color,
                width: s.size,
                height: s.size,
                left: "50%",
                top: "40%",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: s.x,
                y: s.y + 60, // falls slightly
                opacity: 0,
                scale: 0.2,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Luxury Wood Chocolate Box */}
      <div 
        className="relative max-w-sm w-full bg-gradient-to-br from-[#3D2114] via-[#2A150C] to-[#1D0C06] p-7 rounded-3xl border-[6px] border-double border-[#543324] shadow-2xl overflow-hidden"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 2px 4px rgba(255,255,255,0.15)",
        }}
      >
        {/* Subtle wood grains overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-chocolate-drizzle pointer-events-none" />
        
        {/* Gold Frame edge */}
        <div className="absolute inset-2 border border-sunflower-400/20 rounded-2xl pointer-events-none" />

        {/* Satin corner Ribbon */}
        <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-4 right-[-36px] w-[150px] h-6 bg-gradient-to-r from-sunflower-600 via-sunflower-400 to-sunflower-500 text-[9px] text-center font-extrabold leading-6 rotate-45 text-chocolate-950 uppercase tracking-widest shadow-md border-y border-white/20">
            For Hana
          </div>
        </div>

        {/* Box Heading */}
        <div className="text-center mb-6">
          <h3 className="gold-text font-serif text-xl font-extrabold tracking-wider flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-sunflower-400" />
            Kotak Cokelat Premium
            <Sparkles size={14} className="text-sunflower-400" />
          </h3>
          <p className="text-[9px] text-chocolate-300 uppercase font-bold tracking-widest mt-1">
            Pilih cokelat manis keberuntunganmu
          </p>
        </div>

        {/* Grid Compartments */}
        <div className="grid grid-cols-3 gap-5 justify-items-center py-5 bg-[#120703] rounded-2xl p-5 border border-chocolate-950 shadow-inner relative">
          
          {chocolates.map((choc) => {
            const isBitten = bittenIds.includes(choc.id);
            return (
              <div 
                key={choc.id}
                className="relative flex items-center justify-center w-20 h-20 bg-[#1A0E0A] rounded-2xl border border-chocolate-950 shadow-inner group"
              >
                {/* Velvet Paper Liner inside cup */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#B9917B]/15 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3D2114_50%,_transparent_100%)] opacity-30 pointer-events-none" />

                {/* Interactive Chocolate Piece */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: isBitten ? 0 : 6 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-14 h-14 flex items-center justify-center cursor-pointer"
                  onClick={(e) => handleChocClick(choc, e)}
                >
                  <motion.div
                    className={`relative w-12 h-12 flex items-center justify-center text-sm ${choc.shape} ${choc.color} ${choc.shadowGlow} ${
                      isBitten ? "chocolate-3d-bitten" : "chocolate-3d"
                    }`}
                    animate={isBitten ? { 
                      clipPath: "polygon(0% 0%, 72% 0%, 62% 16%, 68% 30%, 58% 46%, 68% 60%, 62% 76%, 72% 90%, 0% 100%)",
                      scale: 0.9
                    } : {}}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                  >
                    {/* Chocolate glaze shine */}
                    <div className="absolute top-1 left-1.5 w-3 h-1.5 bg-white/35 rounded-full blur-[0.5px] pointer-events-none" />

                    {/* Drizzle detail */}
                    {choc.drizzle && !isBitten && (
                      <div className="absolute inset-0.5 opacity-25 bg-chocolate-drizzle pointer-events-none rounded-md" />
                    )}

                    {/* Cream dot detail */}
                    {choc.creamDot && !isBitten && (
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/85 shadow-sm top-1.5 left-1.5 border border-rose-300" />
                    )}

                    {/* Chocolate Decor Icon */}
                    {!isBitten && (
                      <span className="drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.6)] text-base select-none">
                        {choc.decor}
                      </span>
                    )}

                    {/* Bite marks arc shapes */}
                    {isBitten && (
                      <div className="absolute right-0 top-0 bottom-0 w-4 overflow-hidden pointer-events-none flex flex-col justify-around py-1.5 opacity-80">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#120703] -mr-1.5" />
                        <div className="w-3 h-3 rounded-full bg-[#120703] -mr-2" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#120703] -mr-1.5" />
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secret Message Card Reveal */}
      <div className="h-32 w-full max-w-sm mt-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeMessage ? (
            <motion.div
              key={activeMessage}
              initial={{ opacity: 0, y: 15, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="w-full parchment-bg border-2 border-sunflower-400/30 rounded-2xl p-5 text-center shadow-lg relative"
            >
              {/* Gold border */}
              <div className="absolute inset-1 border border-sunflower-500/10 rounded-xl pointer-events-none" />

              {/* Tag indicator */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sunflower-600 to-amber-500 text-chocolate-950 text-[10px] font-extrabold px-4 py-1 rounded-full uppercase tracking-widest shadow-md border border-white/20">
                {activeName}
              </div>

              {/* Handwritten content */}
              <p className="text-sm sm:text-base font-serif font-extrabold text-chocolate-900 leading-relaxed pt-2">
                &ldquo;{activeMessage}&rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              className="text-center text-xs text-chocolate-600 font-semibold italic flex items-center gap-1.5 bg-[#2C1A11]/5 px-5 py-2.5 rounded-full"
            >
              <span>🍫</span> Silakan cicipi cokelat manis di atas untuk melihat pesan tersembunyi.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
