"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Chocolate {
  id: number;
  name: string;
  shape: string;
  color: string;
  decor: string;
  message: string;
}

export default function ChocolateBox() {
  const [bittenIds, setBittenIds] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);

  const chocolates: Chocolate[] = [
    {
      id: 1,
      name: "Golden Foil Truffle",
      shape: "rounded-full shadow-[0_0_12px_rgba(255,215,0,0.4)]",
      color: "bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600",
      decor: "✨",
      message: "Kamu sangat berharga dan bersinar terang di mataku! ✨"
    },
    {
      id: 2,
      name: "Rich Dark Cocoa",
      shape: "rounded-md",
      color: "bg-gradient-to-br from-chocolate-900 to-chocolate-950",
      decor: "🍫",
      message: "Sama seperti cokelat ini, kasih sayangku padamu murni, pekat, dan tulus! 🍫"
    },
    {
      id: 3,
      name: "Strawberry Cream Cup",
      shape: "rounded-t-2xl rounded-b-md",
      color: "bg-gradient-to-br from-rose-400 via-rose-300 to-rose-500",
      decor: "🍓",
      message: "Kamu selalu membawa keceriaan dan rasa manis di setiap hariku! 🍓"
    },
    {
      id: 4,
      name: "Sweet Heart Caramel",
      shape: "w-10 h-10 rotate-45 transform flex items-center justify-center rounded-tl-xl rounded-br-xl",
      color: "bg-gradient-to-br from-orange-400 via-amber-500 to-chocolate-600",
      decor: "❤️",
      message: "Setiap detak jantungku mengirimkan doa manis untuk kebahagiaanmu! 💛"
    },
    {
      id: 5,
      name: "Sweet Tulip Praline",
      shape: "rounded-t-full rounded-b-2xl rotate-12",
      color: "bg-gradient-to-br from-pink-400 via-rose-300 to-pink-600",
      decor: "🌷",
      message: "Secantik bunga tulip yang mekar, kehadiranmu selalu membawa keindahan dan kehangatan di hidupku! 🌷"
    },
    {
      id: 6,
      name: "Sunflower Chocolate Cup",
      shape: "rounded-full border-4 border-dashed border-sunflower-400 animate-spin-slow",
      color: "bg-gradient-to-br from-sunflower-400 to-chocolate-800",
      decor: "🌻",
      message: "Kamu adalah bunga matahari favoritku, pembuat cerah duniaku! 🌻"
    }
  ];

  const handleChocClick = (choc: Chocolate) => {
    if (!bittenIds.includes(choc.id)) {
      setBittenIds([...bittenIds, choc.id]);
    }
    setActiveMessage(choc.message);
    setActiveName(choc.name);
  };

  return (
    <div className="relative flex flex-col items-center py-10 px-4">
      {/* Box Container */}
      <div className="relative max-w-sm w-full bg-gradient-to-br from-chocolate-900 to-chocolate-950 p-6 rounded-3xl border-4 border-chocolate-800 shadow-2xl relative overflow-hidden">
        
        {/* Wood textures or patterns */}
        <div className="absolute inset-0 opacity-[0.03] bg-chocolate-drizzle pointer-events-none" />
        
        {/* Ribbon overlay corner */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
          <div className="absolute top-3 right-[-32px] w-[140px] h-6 bg-sunflower-500 text-[10px] text-center font-bold leading-6 rotate-45 text-chocolate-950 uppercase tracking-widest shadow-md">
            Specially Sweet
          </div>
        </div>

        {/* Box Heading */}
        <div className="text-center mb-6">
          <h3 className="font-serif text-lg font-bold text-sunflower-400 tracking-wide">
            Kotak Cokelat Keberuntungan
          </h3>
          <p className="text-[10px] text-chocolate-200 uppercase tracking-widest">
            Pilih cokelat untuk memakannya & lihat pesan rahasianya
          </p>
        </div>

        {/* Grid of Chocolates */}
        <div className="grid grid-cols-3 gap-6 justify-items-center py-4 bg-chocolate-950/40 rounded-2xl p-4 border border-chocolate-850">
          {chocolates.map((choc) => {
            const isBitten = bittenIds.includes(choc.id);
            return (
              <motion.div
                key={choc.id}
                whileHover={{ scale: 1.1, rotate: isBitten ? 0 : 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-16 h-16 bg-chocolate-900/60 rounded-xl border border-chocolate-800/40 shadow-inner cursor-pointer"
                onClick={() => handleChocClick(choc)}
              >
                {/* Custom shaped chocolate */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  
                  {/* Outer Chocolate Wrapper/Cup */}
                  <div className="absolute inset-0.5 rounded-full bg-chocolate-950/40 blur-[1px] -z-10" />

                  {/* Chocolate Piece */}
                  <motion.div
                    className={`relative w-10 h-10 flex items-center justify-center text-xs shadow-md ${choc.shape} ${choc.color}`}
                    animate={isBitten ? { 
                      clipPath: "polygon(0% 0%, 75% 0%, 65% 15%, 70% 30%, 60% 45%, 70% 60%, 65% 75%, 75% 90%, 0% 100%)",
                      scale: 0.9
                    } : {}}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    {/* Decor Icon or Emoticon */}
                    {!isBitten && (
                      <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                        {choc.decor}
                      </span>
                    )}

                    {/* Bite marks details */}
                    {isBitten && (
                      <div className="absolute right-0 top-0 bottom-0 w-4 overflow-hidden pointer-events-none flex flex-col justify-around py-1 opacity-70">
                        {/* Bite arcs */}
                        <div className="w-2 h-2 rounded-full bg-chocolate-950/80 -mr-1" />
                        <div className="w-2.5 h-2.5 rounded-full bg-chocolate-950/85 -mr-1.5" />
                        <div className="w-2 h-2 rounded-full bg-chocolate-950/80 -mr-1" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Message Output Card */}
      <div className="h-28 w-full max-w-sm mt-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeMessage ? (
            <motion.div
              key={activeMessage}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="w-full bg-[#FAF6F0] border-2 border-chocolate-200 rounded-2xl p-4 text-center shadow-md relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sunflower-400 text-chocolate-950 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                {activeName}
              </div>
              <p className="text-sm font-serif font-semibold text-chocolate-900 leading-relaxed pt-1">
                &ldquo;{activeMessage}&rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-center text-xs text-chocolate-600 italic"
            >
              Silakan cicipi cokelat di atas untuk melihat pesan manis.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
