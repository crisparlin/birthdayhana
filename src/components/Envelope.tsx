"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Sequence: Flap opens (0.8s) -> Letter slides out (1.2s) -> Transition to main page (0.5s)
    setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        onOpen();
      }, 800);
    }, 1800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 select-none">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-tr from-chocolate-950 via-chocolate-900 to-chocolate-850 z-0" />
      
      {/* Subtle background sparkles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_#ffc000_1px,_transparent_1px)] bg-[size:24px_24px] z-0" />

      {/* Outer wrapper for layout & text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-lg w-full"
      >
        {/* Envelope Container */}
        <div className="relative w-[320px] h-[220px] sm:w-[400px] sm:h-[260px] cursor-pointer" onClick={handleOpen}>
          
          {/* Shadow of the envelope */}
          <div className="absolute -bottom-6 left-4 right-4 h-6 bg-black/40 rounded-full blur-xl transition-all duration-500 group-hover:scale-105" />

          {/* Envelope Body Wrapper */}
          <div className="relative w-full h-full perspective-1000">
            <motion.div 
              className="relative w-full h-full preserve-3d"
              animate={isDone ? { scale: 1.1, y: -20, opacity: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              
              {/* 1. LAYER 1: BACK FLAP & BACKGROUND of Envelope */}
              <div className="absolute inset-0 bg-chocolate-800 rounded-lg shadow-inner border border-chocolate-950 overflow-hidden">
                {/* Inside envelope pattern (Chocolate crumbs or soft stripes) */}
                <div className="absolute inset-0 opacity-10 bg-chocolate-drizzle" />
                <div className="absolute inset-0 bg-gradient-to-b from-chocolate-950/40 to-transparent" />
              </div>

              {/* 2. LAYER 2: THE LETTER (Slides out) */}
              <motion.div
                className="absolute left-[4%] right-[4%] bottom-[5%] h-[90%] bg-[#FAF6F0] rounded-md shadow-md p-4 flex flex-col items-center justify-center border border-amber-100"
                initial={{ y: 0 }}
                animate={isOpen ? { y: "-75%", scale: 1.02, zIndex: 15 } : { y: 0, zIndex: 5 }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              >
                {/* Letter Design - Sunflower drawing/emoji & chocolate text */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className="text-3xl animate-bounce">🌻</span>
                  <p className="font-serif text-lg font-bold text-chocolate-800 tracking-wide">
                    Special Letter
                  </p>
                  <div className="w-12 h-[2px] bg-sunflower-400" />
                  <p className="text-xs text-chocolate-600 font-medium">
                    Untuk Seseorang yang Istimewa
                  </p>
                  <p className="text-[10px] text-chocolate-400 font-serif italic">
                    Click to Open Fully
                  </p>
                </div>
              </motion.div>

              {/* 3. LAYER 3: FRONT FLAPS (Left, Right, Bottom) */}
              {/* Left and Right flaps using SVG to cover neatly */}
              <svg 
                className="absolute inset-0 w-full h-full drop-shadow-[0_-2px_5px_rgba(0,0,0,0.15)] pointer-events-none z-20"
                viewBox="0 0 400 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Flap */}
                <path d="M0 0 L190 130 L0 260 Z" fill="#6B422F" stroke="#543324" strokeWidth="1" />
                {/* Right Flap */}
                <path d="M400 0 L210 130 L400 260 Z" fill="#6B422F" stroke="#543324" strokeWidth="1" />
                {/* Bottom Flap */}
                <path d="M0 260 L200 120 L400 260 Z" fill="#543324" stroke="#2C1A11" strokeWidth="1" />
              </svg>

              {/* 4. LAYER 4: TOP FLAP (Folds up) */}
              {/* Using CSS transform-origin: top to fold the triangle flap */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full preserve-3d"
                style={{ originY: 0 }}
                animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <svg 
                  className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
                  viewBox="0 0 400 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0 L200 135 L400 0 Z" fill="#83553E" stroke="#6B422F" strokeWidth="1" />
                </svg>

                {/* Wax Seal - Sunflower Emblem (renders on top of the flap) */}
                <motion.div
                  className="absolute left-1/2 bottom-[40%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-sunflower-500 border-4 border-sunflower-400 shadow-lg flex items-center justify-center z-40 cursor-pointer"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Sunflower Center Detail */}
                  <div className="w-8 h-8 rounded-full bg-chocolate-900 flex items-center justify-center border-2 border-sunflower-300">
                    <span className="text-[10px]">🌻</span>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Floating Instruction Text */}
        <motion.div
          animate={isOpen ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <h2 className="text-sunflower-400 font-serif text-2xl font-semibold mb-2 tracking-wide">
            Sebuah Surat Spesial Menantimu
          </h2>
          <p className="text-chocolate-100 text-sm animate-pulse">
            Klik segel bunga matahari untuk membuka surat
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
