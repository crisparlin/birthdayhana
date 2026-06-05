"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const basePath = process.env.NODE_ENV === 'production' ? '/birthdayhana' : '';

interface EnvelopeProps {
  onOpen: () => void;
}

interface FloatingParticle {
  id: number;
  x: string;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
  drift: number;
}

interface StarDot {
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
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [stars, setStars] = useState<StarDot[]>([]);

  useEffect(() => {
    const emojis = ["🌻", "✨", "🌷", "💛", "🌸", "⭐", "🍫", "💖", "✨", "🌟"];
    const items: FloatingParticle[] = Array.from({ length: 20 }).map((_, idx) => ({
      id: idx,
      x: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 6,
      delay: Math.random() * 8,
      duration: 9 + Math.random() * 8,
      emoji: emojis[idx % emojis.length],
      drift: (Math.random() - 0.5) * 60,
    }));
    setParticles(items);

    const starItems: StarDot[] = Array.from({ length: 50 }).map((_, idx) => ({
      id: idx,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: 2.5 + Math.random() * 3,
    }));
    setStars(starItems);
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        onOpen();
      }, 800);
    }, 1800);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 select-none"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(255, 230, 180, 0.45) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 15%, rgba(255, 200, 210, 0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 85%, rgba(255, 215, 0, 0.18) 0%, transparent 60%),
          url('${basePath}/assets/letter-bg.png')
        `,
        backgroundSize: 'cover, cover, cover, cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'normal, normal, normal, multiply',
      }}
    >
      {/* Soft vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(18, 7, 3, 0.55) 100%)',
        }}
      />

      {/* Twinkling star field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full"
            style={{
              left: star.x,
              top: star.y,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: 'radial-gradient(circle, rgba(255, 220, 100, 0.9) 0%, transparent 70%)',
              animationName: 'twinkle',
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Floating emoji particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <motion.div
            key={`particle-${p.id}`}
            className="absolute"
            style={{
              left: p.x,
              bottom: '-40px',
              fontSize: `${p.size + 6}px`,
            }}
            animate={{
              y: [0, -(window?.innerHeight ?? 900) - 60],
              x: [0, p.drift],
              opacity: [0, 0.9, 0.9, 0],
              rotate: [0, 180 * (p.drift > 0 ? 1 : -1)],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main visual wrap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-20 flex flex-col items-center max-w-lg w-full"
      >
        {/* Top date badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8 flex items-center gap-2 px-5 py-2 rounded-full border border-white/20"
          style={{
            background: 'rgba(255, 215, 0, 0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.15)',
          }}
        >
          <Star size={12} className="text-yellow-300 fill-yellow-300" />
          <span className="text-white/85 text-xs font-light tracking-[0.25em] uppercase font-sans">
            May 25, 2026 · Selamat Ulang Tahun
          </span>
          <Star size={12} className="text-yellow-300 fill-yellow-300" />
        </motion.div>

        {/* Envelope Container */}
        <div
          className="relative w-[340px] h-[230px] sm:w-[440px] sm:h-[290px] cursor-pointer group"
          onClick={handleOpen}
        >
          {/* Outer glow halo */}
          <div
            className="absolute -inset-6 rounded-[50%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Shadow cast */}
          <motion.div
            className="absolute -bottom-10 left-8 right-8 h-8 bg-black/50 rounded-full blur-3xl"
            animate={isOpen ? { scaleX: 1.15, opacity: 0.3 } : { scaleX: 1, opacity: 0.6 }}
            transition={{ duration: 0.7 }}
          />

          {/* Perspective wrapper */}
          <div className="relative w-full h-full perspective-1000">
            <motion.div
              className="relative w-full h-full preserve-3d"
              animate={isDone ? { scale: 1.1, y: -30, opacity: 0, filter: "blur(3px)" } : {}}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* 1. BACK OF ENVELOPE */}
              <div className="absolute inset-0 rounded-xl overflow-hidden z-0" style={{
                background: 'linear-gradient(145deg, #3D2114 0%, #2C1A0E 40%, #1D0E08 100%)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
              }}>
                <div className="absolute inset-0" style={{
                  background: 'repeating-linear-gradient(135deg, transparent, transparent 12px, rgba(255,255,255,0.012) 12px, rgba(255,255,255,0.012) 24px)',
                }} />
                <div className="absolute inset-5 border border-chocolate-800/30 rounded-lg pointer-events-none" />
              </div>

              {/* 2. LETTER SLIDES OUT */}
              <motion.div
                className="absolute left-[6%] right-[6%] bottom-[5%] h-[92%] rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #FDF9F2 0%, #FAF5EB 100%)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255, 220, 160, 0.4)',
                }}
                initial={{ y: 0 }}
                animate={isOpen ? { y: "-72%", scale: 1.02, zIndex: 15 } : { y: 0, zIndex: 5 }}
                transition={{ delay: 0.5, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Texture lines */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 26px, rgba(185,145,123,0.06) 26px, rgba(185,145,123,0.06) 27px)',
                }} />
                {/* Inner border */}
                <div className="absolute inset-3 border border-yellow-300/20 rounded-md pointer-events-none" />

                <div className="flex flex-col items-center text-center space-y-3 relative z-10 h-full justify-center px-6">
                  <motion.div
                    animate={isOpen ? { rotate: [0, 15, -10, 5, 0], scale: [1, 1.2, 1] } : { y: [0, -5, 0] }}
                    transition={isOpen
                      ? { duration: 0.6, delay: 0.8 }
                      : { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    }
                    className="text-4xl"
                  >
                    🌻
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold tracking-wide" style={{ color: '#2C1A11' }}>
                      Surat Cinta Hana
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-1.5">
                      <div className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-400/60" />
                      <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-amber-600">
                        Dear My Sunflower
                      </p>
                      <div className="h-px w-8 bg-gradient-to-l from-transparent to-yellow-400/60" />
                    </div>
                  </div>
                  <p className="text-xs text-chocolate-500 font-light tracking-wide">
                    Ketuk untuk membuka & membaca
                  </p>
                  <p className="text-[9px] text-chocolate-400 font-serif italic">
                    With all my heart ♡
                  </p>
                </div>
              </motion.div>

              {/* 3. FRONT SIDE FLAPS */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                style={{ filter: 'drop-shadow(0 -3px 10px rgba(0,0,0,0.4))' }}
                viewBox="0 0 440 290"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="leftFlapGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#8B5A42" />
                    <stop offset="60%" stopColor="#5E3020" />
                    <stop offset="100%" stopColor="#3D1E10" />
                  </linearGradient>
                  <linearGradient id="rightFlapGrad" x1="100%" y1="0%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#8B5A42" />
                    <stop offset="60%" stopColor="#5E3020" />
                    <stop offset="100%" stopColor="#3D1E10" />
                  </linearGradient>
                  <linearGradient id="bottomFlapGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#3A1F13" />
                    <stop offset="100%" stopColor="#6B3828" />
                  </linearGradient>
                </defs>
                <path d="M0 0 L210 145 L0 290 Z" fill="url(#leftFlapGrad)" stroke="#2A160C" strokeWidth="0.5" />
                <path d="M440 0 L230 145 L440 290 Z" fill="url(#rightFlapGrad)" stroke="#2A160C" strokeWidth="0.5" />
                <path d="M0 290 L220 132 L440 290 Z" fill="url(#bottomFlapGrad)" stroke="#220E08" strokeWidth="0.5" />
              </svg>

              {/* 4. GOLD RIBBON WRAP */}
              <AnimatePresence>
                {!isOpen && (
                  <>
                    {/* Horizontal ribbon */}
                    <motion.div
                      className="absolute left-0 right-0 top-[44%] h-7 pointer-events-none z-25 flex items-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, #FFE873 0%, #FFD700 40%, #E6A100 70%, #C8900A 100%)',
                        boxShadow: '0 2px 10px rgba(255,200,0,0.4), inset 0 1px 1px rgba(255,255,255,0.3)',
                        borderTop: '0.5px solid rgba(255,240,160,0.4)',
                        borderBottom: '0.5px solid rgba(180,130,0,0.4)',
                      }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="w-full flex justify-between px-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="w-px h-4 bg-yellow-200/20" />
                        ))}
                      </div>
                    </motion.div>

                    {/* Vertical ribbon */}
                    <motion.div
                      className="absolute top-0 bottom-0 left-[46%] w-7 pointer-events-none z-25"
                      style={{
                        background: 'linear-gradient(90deg, #FFE873 0%, #FFD700 40%, #E6A100 70%, #C8900A 100%)',
                        boxShadow: '2px 0 10px rgba(255,200,0,0.4), inset 0 0 1px rgba(255,255,255,0.3)',
                      }}
                      exit={{ scaleY: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    />

                    {/* Ribbon bow center piece */}
                    <motion.div
                      className="absolute z-30 pointer-events-none"
                      style={{
                        left: '50%',
                        top: '44%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Bow loops */}
                      <div className="relative w-14 h-9 flex items-center justify-center">
                        <div className="absolute left-0 top-0 w-7 h-9 rounded-full border-4 border-yellow-400 opacity-70"
                          style={{ background: 'linear-gradient(135deg, #FFE873, #E6A100)', borderRadius: '50% 0 0 50%' }}
                        />
                        <div className="absolute right-0 top-0 w-7 h-9 rounded-full border-4 border-yellow-400 opacity-70"
                          style={{ background: 'linear-gradient(135deg, #E6A100, #FFE873)', borderRadius: '0 50% 50% 0' }}
                        />
                        <div className="relative z-10 w-5 h-5 rounded-full shadow-md"
                          style={{
                            background: 'radial-gradient(circle, #FFF5A0 0%, #FFD700 50%, #E6A100 100%)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.5)',
                          }}
                        />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* 5. TOP FLAP */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full preserve-3d"
                style={{ originY: 0 }}
                animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              >
                <svg
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.4))' }}
                  viewBox="0 0 440 290"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#A0694E" />
                      <stop offset="50%" stopColor="#7B4530" />
                      <stop offset="100%" stopColor="#5A2F1B" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 L220 155 L440 0 Z" fill="url(#topFlapGrad)" stroke="#3D1E10" strokeWidth="0.5" />
                </svg>

                {/* Wax Seal */}
                <motion.div
                  className="absolute left-1/2 bottom-[38%] -translate-x-1/2 -translate-y-1/2 w-[68px] h-[68px] rounded-full flex items-center justify-center z-40 cursor-pointer"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #FFF9B8 0%, #FFD700 30%, #D98A00 75%, #8F5400 100%)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.45), inset 0 -2px 4px rgba(0,0,0,0.3)',
                  }}
                  whileHover={{ scale: 1.14, rotate: 15 }}
                  whileTap={{ scale: 0.93 }}
                  animate={isOpen ? { opacity: 0, scale: 0.4, y: -25, rotate: 45 } : { opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Outer scalloped ring */}
                  <div
                    className="absolute inset-1 rounded-full pointer-events-none"
                    style={{
                      border: '1.5px dashed rgba(255, 240, 140, 0.5)',
                    }}
                  />
                  {/* Inner seal */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle at 40% 40%, #4A2A14, #2C1A0A)',
                      border: '2px solid rgba(255, 200, 0, 0.6)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
                    }}
                  >
                    <span className="text-[16px]" style={{ filter: 'drop-shadow(0 1px 2px rgba(255,200,0,0.3))' }}>🌻</span>
                  </div>
                  {/* Shine spot */}
                  <div
                    className="absolute top-2 left-2.5 w-4 h-4 rounded-full opacity-40 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9), transparent)' }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Instruction text */}
        <motion.div
          animate={isOpen ? { opacity: 0, y: 20, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="mt-14 text-center px-4 space-y-4"
        >
          <h2
            className="font-serif text-4xl font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            style={{
              background: 'linear-gradient(135deg, #FFE873 0%, #FFD700 35%, #FFC000 60%, #FFE064 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Sebuah Surat Spesial
          </h2>

          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400/40" />
            <Heart size={14} fill="#FFC000" className="text-yellow-400" style={{ filter: 'drop-shadow(0 0 6px rgba(255,192,0,0.6))' }} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400/40" />
          </div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(20, 10, 5, 0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: '#FFD700',
                boxShadow: '0 0 8px rgba(255,215,0,0.8)',
                animation: 'ripple 1.5s ease-out infinite',
              }}
            />
            <p className="text-white/85 text-xs font-sans font-light tracking-[0.18em] uppercase">
              Ketuk segel bunga matahari untuk membuka
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
