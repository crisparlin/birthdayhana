"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const basePath = process.env.NODE_ENV === 'production' ? '/birthdayhana' : '';

interface EnvelopeProps {
  onOpen: () => void;
}

interface FloatingSparkle {
  id: number;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [sparkles, setSparkles] = useState<FloatingSparkle[]>([]);

  useEffect(() => {
    // Generate floating warm background sparks
    const items = Array.from({ length: 15 }).map((_, idx) => ({
      id: idx,
      x: `${Math.random() * 100}%`,
      y: `${80 + Math.random() * 20}%`,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
    }));
    setSparkles(items);
  }, []);

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
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 select-none bg-cover bg-center"
      style={{
        backgroundImage: `url('${basePath}/assets/letter-bg.png')`
      }}
    >
      
      {/* Decorative Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {sparkles.map((sp) => (
          <motion.div
            key={sp.id}
            className="absolute rounded-full bg-gradient-to-tr from-sunflower-300 to-yellow-400"
            style={{
              left: sp.x,
              bottom: "0%",
              width: sp.size,
              height: sp.size,
              filter: "blur(0.5px)",
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: ["0px", `${(sp.id % 2 === 0 ? 1 : -1) * 30}px`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: sp.duration,
              delay: sp.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main visual wrap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-lg w-full"
      >
        {/* Envelope Container */}
        <div 
          className="relative w-[340px] h-[230px] sm:w-[420px] sm:h-[280px] cursor-pointer group"
          onClick={handleOpen}
        >
          {/* Shadow cast on tabletop */}
          <div className="absolute -bottom-8 left-6 right-6 h-6 bg-black/60 rounded-full blur-2xl transition-all duration-700 group-hover:scale-105 group-hover:blur-3xl" />

          {/* Perspective wrapper */}
          <div className="relative w-full h-full perspective-1000">
            <motion.div
              className="relative w-full h-full preserve-3d"
              animate={isDone ? { scale: 1.08, y: -25, opacity: 0, filter: "blur(2px)" } : {}}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              
              {/* 1. BACK OF THE ENVELOPE */}
              <div className="absolute inset-0 bg-[#402316] rounded-xl shadow-inner border border-chocolate-950 overflow-hidden z-0">
                {/* Inside envelope pattern (satin chocolate shine) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A11]/60 via-[#402316] to-[#1A0F0A]" />
                <div className="absolute inset-0 opacity-[0.04] bg-chocolate-drizzle" />
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-chocolate-850/40 rounded-lg pointer-events-none" />
              </div>

              {/* 2. THE LETTER (Slides out) */}
              <motion.div
                className="absolute left-[5%] right-[5%] bottom-[5%] h-[92%] bg-[#FAF6F0] rounded-lg shadow-lg p-5 flex flex-col items-center justify-center border border-amber-200/50 overflow-hidden"
                initial={{ y: 0 }}
                animate={isOpen ? { y: "-72%", scale: 1.01, zIndex: 15 } : { y: 0, zIndex: 5 }}
                transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
              >
                {/* Vintage Letter paper texture overlay */}
                <div className="absolute inset-0 bg-chocolate-drizzle opacity-[0.02] pointer-events-none" />
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-sunflower-400/20 rounded-md pointer-events-none" />

                <div className="flex flex-col items-center text-center space-y-3 relative z-10">
                  <motion.span 
                    className="text-4xl"
                    animate={isOpen ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                  >
                    🌻
                  </motion.span>
                  <div>
                    <h3 className="font-serif text-xl font-extrabold text-[#2C1A11] tracking-wide">
                      Surat Cinta Hana
                    </h3>
                    <p className="text-[10px] text-sunflower-600 font-sans font-bold uppercase tracking-widest mt-1">
                      Dear My Sunflower
                    </p>
                  </div>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-sunflower-400 to-transparent" />
                  <p className="text-xs text-chocolate-600 font-medium">
                    Ketuk untuk membuka & membaca
                  </p>
                  <p className="text-[9px] text-chocolate-400 font-serif italic">
                    With all my heart
                  </p>
                </div>
              </motion.div>

              {/* 3. FRONT SIDE FLAPS (Left, Right, Bottom) */}
              <svg 
                className="absolute inset-0 w-full h-full drop-shadow-[0_-3px_8px_rgba(0,0,0,0.35)] pointer-events-none z-20"
                viewBox="0 0 420 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Left flap gradient */}
                  <linearGradient id="leftFlapGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#7E4A35" />
                    <stop offset="100%" stopColor="#4F2E20" />
                  </linearGradient>
                  {/* Right flap gradient */}
                  <linearGradient id="rightFlapGrad" x1="100%" y1="0%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#7E4A35" />
                    <stop offset="100%" stopColor="#4F2E20" />
                  </linearGradient>
                  {/* Bottom flap gradient */}
                  <linearGradient id="bottomFlapGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#3A1F13" />
                    <stop offset="100%" stopColor="#5E3726" />
                  </linearGradient>
                </defs>

                {/* Left Flap */}
                <path d="M0 0 L200 140 L0 280 Z" fill="url(#leftFlapGrad)" stroke="#381E13" strokeWidth="0.75" />
                {/* Right Flap */}
                <path d="M420 0 L220 140 L420 280 Z" fill="url(#rightFlapGrad)" stroke="#381E13" strokeWidth="0.75" />
                {/* Bottom Flap */}
                <path d="M0 280 L210 130 L420 280 Z" fill="url(#bottomFlapGrad)" stroke="#27140B" strokeWidth="0.75" />
              </svg>

              {/* 4. METALLIC GOLD RIBBON WRAP (Dissolves on click) */}
              <AnimatePresence>
                {!isOpen && (
                  <>
                    {/* Horizontal ribbon */}
                    <motion.div
                      className="absolute left-0 right-0 top-[45%] h-7 bg-gradient-to-b from-[#E6A100] via-[#FFD700] to-[#B87A00] shadow-md border-y border-[#FFFEB3]/30 pointer-events-none z-25 flex items-center justify-between px-6 overflow-hidden"
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    >
                      <div className="w-2 h-full bg-[#FFE573]/20" />
                      <div className="w-2 h-full bg-[#FFE573]/20" />
                    </motion.div>
                    
                    {/* Vertical ribbon */}
                    <motion.div
                      className="absolute top-0 bottom-0 left-[46%] w-7 bg-gradient-to-r from-[#E6A100] via-[#FFD700] to-[#B87A00] shadow-md border-x border-[#FFFEB3]/30 pointer-events-none z-25"
                      exit={{ scaleY: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* 5. TOP FLAP (Folds up in 3D perspective) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full preserve-3d"
                style={{ originY: 0 }}
                animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <svg 
                  className="w-full h-full drop-shadow-[0_5px_10px_rgba(0,0,0,0.35)]"
                  viewBox="0 0 420 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Top flap gradient */}
                    <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#9C6B55" />
                      <stop offset="100%" stopColor="#6E402B" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 L210 148 L420 0 Z" fill="url(#topFlapGrad)" stroke="#4A291A" strokeWidth="0.75" />
                </svg>

                {/* Wax Seal - Sunflower Gold Emblem (renders on top of the flap) */}
                <motion.div
                  className="absolute left-1/2 bottom-[39%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-40 cursor-pointer"
                  style={{
                    boxShadow: "0 6px 16px rgba(0,0,0,0.45), inset 0 2px 4px rgba(255,255,255,0.4)",
                    background: "radial-gradient(circle, #FFF29E 0%, #FFC000 35%, #D98A00 90%, #8F5400 100%)",
                  }}
                  whileHover={{ scale: 1.12, rotate: 12 }}
                  animate={isOpen ? { opacity: 0, scale: 0.5, y: -20 } : { opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Decorative Outer Bevel for Wax Look */}
                  <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#FFF3A8]/40 pointer-events-none" />

                  {/* Embossed Sunflower center */}
                  <div className="w-10 h-10 rounded-full bg-[#3D2114] flex items-center justify-center border-2 border-[#D98A00] shadow-inner">
                    <span className="text-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">🌻</span>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Floating Instruction text */}
        <motion.div
          animate={isOpen ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center px-4"
        >
          {/* Animated heading with shiny glow */}
          <h2 className="gold-text font-serif text-3xl font-extrabold mb-3 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2">
            <Heart size={20} fill="#FFC000" className="text-sunflower-400 animate-pulse" />
            Sebuah Surat Spesial
            <Heart size={20} fill="#FFC000" className="text-sunflower-400 animate-pulse" />
          </h2>
          
          <div className="inline-flex items-center gap-2 bg-[#2C1A11]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-chocolate-850/65 shadow-md">
            <span className="w-2 h-2 rounded-full bg-sunflower-400 animate-ping" />
            <p className="text-chocolate-100 text-xs sm:text-sm font-semibold tracking-wide uppercase">
              Ketuk segel bunga matahari untuk membuka
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
