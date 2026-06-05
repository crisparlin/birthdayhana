"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import BirthdayCake from "@/components/BirthdayCake";
import ChocolateBox from "@/components/ChocolateBox";
import PolaroidGallery from "@/components/PolaroidGallery";
import MusicPlayer from "@/components/MusicPlayer";
import { Sparkles, Heart, ChevronRight, ChevronLeft, Mail, Gift, Camera } from "lucide-react";

const basePath = process.env.NODE_ENV === 'production' ? '/birthdayhana' : '';

interface FloatingParticle {
  id: number;
  emoji: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  driftClass: string;
}

interface FloatingBalloon {
  id: number;
  left: string;
  color: string;
  borderColor: string;
  delay: string;
  duration: string;
  scale: number;
  swayDuration: string;
}

type SectionId = "letter" | "chocolate" | "cake" | "polaroid";

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: "letter", label: "Surat", icon: "✉️" },
  { id: "chocolate", label: "Cokelat", icon: "🍫" },
  { id: "cake", label: "Kue", icon: "🎂" },
  { id: "polaroid", label: "Foto", icon: "📸" },
];

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);
  const [activeSection, setActiveSection] = useState<SectionId>("letter");

  // Handle URL hash-based routing for browser Back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#/" || hash === "#envelope") {
        setIsOpened(false);
        setActiveSection("letter");
      } else {
        const section = hash.replace("#/", "") as SectionId;
        if (["letter", "chocolate", "cake", "polaroid"].includes(section)) {
          setIsOpened(true);
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (isOpened) {
      window.location.hash = `#/${activeSection}`;
    } else {
      if (typeof window !== "undefined" && window.location.hash && window.location.hash !== "#/") {
        window.location.hash = "#/";
      }
    }
  }, [isOpened, activeSection]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeSection, isOpened]);

  useEffect(() => {
    const emojis = ["🌻", "🤎", "🌷", "🍓", "🌻", "🍫", "🌷", "✨", "🎈", "💖"];
    const driftClasses = ["animate-drift-right", "animate-drift-left"];
    const generated = Array.from({ length: 25 }).map((_, idx) => ({
      id: idx,
      emoji: emojis[idx % emojis.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 8}s`,
      size: `${14 + Math.random() * 18}px`,
      driftClass: driftClasses[idx % driftClasses.length],
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    if (isOpened) {
      const colors = [
        "from-yellow-300 via-amber-400 to-yellow-500",
        "from-rose-400 via-pink-300 to-rose-500",
        "from-amber-200 via-orange-300 to-amber-400",
        "from-yellow-200 via-yellow-300 to-amber-400",
        "from-pink-300 via-rose-200 to-pink-400",
        "from-orange-300 via-amber-300 to-orange-500",
      ];
      const borders = [
        "border-yellow-400",
        "border-rose-400",
        "border-amber-400",
        "border-yellow-300",
        "border-rose-300",
        "border-orange-400",
      ];
      const generatedBalloons = Array.from({ length: 14 }).map((_, idx) => ({
        id: idx,
        left: `${8 + Math.random() * 84}%`,
        color: colors[idx % colors.length],
        borderColor: borders[idx % borders.length],
        delay: `${Math.random() * 15}s`,
        duration: `${16 + Math.random() * 10}s`,
        scale: 0.75 + Math.random() * 0.45,
        swayDuration: `${3.5 + Math.random() * 3.5}s`,
      }));
      setBalloons(generatedBalloons);
    }
  }, [isOpened]);

  const handleNextSection = () => {
    if (activeSection === "letter") setActiveSection("chocolate");
    else if (activeSection === "chocolate") setActiveSection("cake");
    else if (activeSection === "cake") setActiveSection("polaroid");
    else if (activeSection === "polaroid") setActiveSection("letter");
  };

  const handlePrevSection = () => {
    if (activeSection === "letter") setActiveSection("polaroid");
    else if (activeSection === "chocolate") setActiveSection("letter");
    else if (activeSection === "cake") setActiveSection("chocolate");
    else if (activeSection === "polaroid") setActiveSection("cake");
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "letter":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6 section-card">
            {/* Letter Content Card - Vintage parchment style */}
            <div className="relative parchment-bg rounded-3xl p-7 sm:p-11 overflow-hidden shadow-2xl" style={{
              border: '1px solid rgba(255, 215, 0, 0.18)',
            }}>
              {/* Decorative gradient overlays */}
              <div className="absolute top-0 left-0 w-full h-1 pointer-events-none" style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5), rgba(255,200,0,0.7), rgba(255,215,0,0.5), transparent)',
              }} />
              
              {/* Double inner border */}
              <div className="absolute inset-3 border border-yellow-400/20 rounded-2xl pointer-events-none" />
              <div className="absolute inset-5 border border-yellow-400/10 rounded-xl pointer-events-none" />

              {/* Sunflower corner icons */}
              <div className="absolute top-5 left-5 text-xl opacity-35 select-none pointer-events-none">🌻</div>
              <div className="absolute top-5 right-5 text-xl opacity-35 select-none pointer-events-none">🌻</div>
              <div className="absolute bottom-5 left-5 text-xl opacity-20 select-none pointer-events-none">🌻</div>
              <div className="absolute bottom-5 right-5 text-xl opacity-20 select-none pointer-events-none">🌻</div>

              {/* Letter Header */}
              <div className="flex justify-between items-start border-b pb-6 mb-7 relative z-10" style={{ borderColor: 'rgba(185,145,123,0.25)' }}>
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-chocolate-900 tracking-wide leading-tight">
                    Dear Hana,
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-px w-10 bg-gradient-to-r from-yellow-400/60 to-transparent" />
                    <span className="text-[10px] uppercase font-sans font-semibold text-amber-600 tracking-[0.2em]">
                      ✨ A Special Birthday Wish ✨
                    </span>
                    <div className="h-px w-10 bg-gradient-to-l from-yellow-400/60 to-transparent" />
                  </div>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ml-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,220,0,0.18), rgba(255,200,0,0.08))',
                    border: '1px solid rgba(255,215,0,0.25)',
                    boxShadow: '0 4px 12px rgba(255,215,0,0.12)',
                  }}
                >
                  <Heart size={18} fill="#E6A100" className="text-amber-600" style={{ animation: 'heartBeat 1.6s ease-in-out infinite' }} />
                </div>
              </div>

              {/* Letter Body */}
              <div className="space-y-5 font-serif text-sm sm:text-[15px] text-chocolate-800 leading-[1.9] relative z-10">
                <p className="font-semibold text-chocolate-900 text-lg sm:text-xl italic">
                  Hallo Sayang,
                </p>
                <p>
                  Happy birthday ya, aku doakan kamu selalu diberikan kesehatan, berkat yang berlimpah, selalu dikelilingi orang yang sayang sama kamu. Aku bahagia masih di sini dan tetap di sini bersama kamu, bisa melihat kamu bertambah umur, masih bisa melihat senyuman yang manis itu, dan juga masih terus bisa merasakan kasih sayang dari kamu.
                </p>
                <p>
                  Banyak hal yang aku dapat dari kamu dan perubahan yang aku lakukan secara fisik ataupun tindakan. Mungkin tidak mudah untuk mengubah itu semua, salah satu yang bisa kamu lihat yaitu aku semakin ganteng ya sayang. Itu semua karena kamu memperhatikan pacarmu. Aku juga banyak belajar dari kamu untuk lemah lembut, berkata halus, dan juga untuk bisa saling pengertian.
                </p>
                <p>
                  Selain itu, proses yang kita alami sampai saat ini membuat hubungan kita semakin kuat walaupun sampai sekarang kita masih ada struggle, tapi pelan-pelan kita lewati bersama tantangan yang bertubi-tubi. Aku tahu Tuhan sedang mengasah hubungan kita untuk semakin kokoh dan memberikan pelajaran sebelum kita akan melangkah ke bahtera rumah tangga.
                </p>
                <p>
                  Kamu orang baik dan sangat baik. Kamu juga seorang yang ceria dan kamu sangat amat berpengaruh positif untuk sekitarmu, dan aku percaya kamu akan selalu dikelilingi orang-orang baik juga. Maaf jika kata-kata ini kurang bagus, tapi ini kata-kata yang aku ucapkan tulus dari dalam hati, tidak dibuat-buat dan tidak pakai ChatGPT.
                </p>

                {/* Quote highlight */}
                <div
                  className="relative my-6 px-6 py-4 rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,220,0,0.08) 0%, rgba(255,200,0,0.04) 100%)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    borderLeft: '4px solid rgba(255,215,0,0.6)',
                  }}
                >
                  <p className="font-semibold text-chocolate-900 text-base sm:text-lg italic leading-relaxed">
                    Sekali lagi, Happy birthday pacarku yang cantik. I love you, sayangggg! ❤️
                  </p>
                </div>
              </div>

              {/* Letter Footer */}
              <div className="mt-8 pt-6 flex flex-col items-end relative z-10" style={{ borderTop: '1px solid rgba(185,145,123,0.2)' }}>
                <p className="text-[10px] text-chocolate-400 uppercase tracking-[0.22em] mb-1 font-sans font-semibold">
                  Tertanda dari hati,
                </p>
                <p className="font-handwriting text-3xl sm:text-4xl text-chocolate-900 tracking-wide" style={{
                  filter: 'drop-shadow(0 1px 2px rgba(44,26,17,0.15))',
                }}>
                  Pacar Tersayangmu, Cris ❤️
                </p>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleNextSection}
                className="gold-btn flex items-center gap-2.5 font-sans font-semibold text-sm px-8 py-3.5 rounded-full"
              >
                Buka Kotak Cokelat Hana 🍫 <ChevronRight size={17} />
              </button>
            </div>
          </div>
        );

      case "chocolate":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6 section-card">
            <div
              className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              style={{ border: '1px solid rgba(255,215,0,0.12)' }}
            >
              {/* Ambient glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(circle, rgba(185,145,123,0.18) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-chocolate-900 mb-2 flex items-center justify-center gap-2.5 text-center tracking-wide">
                <span>🍫</span> Kotak Cokelat Spesial Hana <span>🍫</span>
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-500 text-center mb-8 font-sans font-light tracking-wide">
                Ketuk cokelat manis di bawah ini untuk mengambil gigitan dan membaca pesan tersembunyi!
              </p>
              <ChocolateBox />
            </div>

            <div className="flex justify-between items-center max-w-xl mx-auto pt-4 px-4 sm:px-0">
              <button
                onClick={handlePrevSection}
                className="flex items-center gap-1.5 text-chocolate-500 hover:text-chocolate-900 font-sans font-medium text-sm transition-colors tracking-wide"
              >
                <ChevronLeft size={17} /> Kembali ke Surat
              </button>
              <button
                onClick={handleNextSection}
                className="gold-btn flex items-center gap-2.5 font-sans font-semibold text-sm px-7 py-3.5 rounded-full"
              >
                Tiup Lilin Ulang Tahun 🎂 <ChevronRight size={17} />
              </button>
            </div>
          </div>
        );

      case "cake":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6 section-card">
            <div
              className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              style={{ border: '1px solid rgba(255,215,0,0.12)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.07) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }} />
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-chocolate-900 mb-2 flex items-center justify-center gap-2.5 text-center tracking-wide">
                <span>🎂</span> Tiup Lilin Ulang Tahun <span>🎂</span>
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-500 text-center mb-6 font-sans font-light tracking-wide">
                Make a wish! Ketuk lilin cokelat manis di bawah ini untuk meniupnya!
              </p>
              <BirthdayCake />
            </div>

            <div className="flex justify-between items-center max-w-xl mx-auto pt-4 px-4 sm:px-0">
              <button
                onClick={handlePrevSection}
                className="flex items-center gap-1.5 text-chocolate-500 hover:text-chocolate-900 font-sans font-medium text-sm transition-colors tracking-wide"
              >
                <ChevronLeft size={17} /> Kembali ke Kotak Cokelat
              </button>
              <button
                onClick={handleNextSection}
                className="gold-btn flex items-center gap-2.5 font-sans font-semibold text-sm px-7 py-3.5 rounded-full"
              >
                Lihat Galeri Foto Kita 📸 <ChevronRight size={17} />
              </button>
            </div>
          </div>
        );

      case "polaroid":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6 section-card">
            <div
              className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              style={{ border: '1px solid rgba(255,215,0,0.12)' }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-chocolate-900 mb-2 flex items-center justify-center gap-2.5 text-center tracking-wide">
                <span>📸</span> Galeri Polaroid Hana & Cris <span>📸</span>
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-500 text-center mb-6 font-sans font-light tracking-wide">
                Koleksi momen-momen indah terindah yang kita bagikan bersama.
              </p>
              <PolaroidGallery />
            </div>

            <div className="flex justify-between items-center max-w-xl mx-auto pt-4 px-4 sm:px-0">
              <button
                onClick={handlePrevSection}
                className="flex items-center gap-1.5 text-chocolate-500 hover:text-chocolate-900 font-sans font-medium text-sm transition-colors tracking-wide"
              >
                <ChevronLeft size={17} /> Kembali ke Tiup Lilin
              </button>
              <button
                onClick={() => { window.location.hash = "#/"; }}
                className="gold-btn flex items-center gap-2.5 font-sans font-semibold text-sm px-7 py-3.5 rounded-full"
              >
                Mulai dari Awal ✉️
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(160deg, #FAF6F0 0%, #F5EBE4 30%, #F0E2D6 60%, #EDD6C6 100%)',
    }}>

      {/* Static ambient orbs */}
      <div
        className="fixed top-[-10vh] left-[-10vw] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,228,170,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-[-15vh] right-[-10vw] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,192,203,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
      <div
        className="fixed top-[40vh] left-[50vw] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Celebration backdrop (after opening) */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Falling emoji particles */}
          {particles.map((p) => (
            <div
              key={`particle-${p.id}`}
              className={`absolute top-[-50px] ${p.driftClass} opacity-70 select-none`}
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                fontSize: p.size,
              }}
            >
              {p.emoji}
            </div>
          ))}

          {/* Floating Balloons */}
          {balloons.map((b) => (
            <div
              key={`balloon-${b.id}`}
              className="balloon"
              style={{
                left: b.left,
                animationDelay: b.delay,
                animationDuration: `${b.duration}, ${b.swayDuration}`,
                transform: `scale(${b.scale})`,
              }}
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${b.color} rounded-[50%_50%_50%_50%/_40%_40%_60%_60%] shadow-lg relative`}
                style={{ border: '0.5px solid rgba(255,255,255,0.25)' }}
              >
                <div className="absolute top-[12%] left-[14%] w-[24%] h-[24%] bg-white/45 rounded-full blur-[0.5px]" />
                <div className={`absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-chocolate-700/50`} />
                <div className="balloon-string" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isOpened ? (
        <div className="w-full relative z-10">
          <Envelope onOpen={() => setIsOpened(true)} />
        </div>
      ) : (
        <motion.div
          key="dashboard-scene"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-20 max-w-4xl mx-auto px-4 py-8 sm:py-12"
        >
          {/* ─── HEADER ─── */}
          <header className="mb-10">
            {/* Main title row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                {/* Eyebrow label */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-400/50" />
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-amber-600">
                    May 25, 2026
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-yellow-400/50" />
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <motion.span
                    className="text-3xl"
                    animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    🌻
                  </motion.span>
                  <h1
                    className="font-serif text-4xl sm:text-5xl font-semibold tracking-wide"
                    style={{
                      background: 'linear-gradient(135deg, #C8890A 0%, #E6A100 25%, #FFD700 50%, #FFC000 75%, #D4880A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    }}
                  >
                    Hana&apos;s Sweet Birthday
                  </h1>
                  <motion.span
                    className="text-3xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  >
                    🌻
                  </motion.span>
                </div>

                <p className="text-xs font-sans font-light text-chocolate-500 uppercase tracking-[0.22em] flex items-center justify-center md:justify-start gap-2 mt-2">
                  <span>Made with Sweet Chocolate & Sunflowers</span>
                  <Sparkles size={12} className="text-amber-500" style={{ animation: 'twinkle 2s ease-in-out infinite' }} />
                </p>
              </div>

              {/* Music Player */}
              <div className="w-full md:w-auto flex justify-center">
                <MusicPlayer />
              </div>
            </div>

            {/* Section navigator */}
            <div className="mt-8 flex flex-col items-center gap-4">
              {/* Section pills nav */}
              <div className="nav-pill">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all duration-300 tracking-wide ${
                      activeSection === sec.id
                        ? 'text-chocolate-950'
                        : 'text-chocolate-500 hover:text-chocolate-800'
                    }`}
                    style={activeSection === sec.id ? {
                      background: 'linear-gradient(135deg, #FFE873 0%, #FFD700 50%, #E6A100 100%)',
                      boxShadow: '0 2px 10px rgba(255,215,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
                    } : {}}
                  >
                    <span>{sec.icon}</span>
                    <span className="hidden sm:block">{sec.label}</span>
                  </button>
                ))}
              </div>

              {/* Progress indicator dots */}
              <div className="flex items-center gap-2">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`section-dot ${activeSection === sec.id ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </header>

          {/* ─── ACTIVE SECTION ─── */}
          <div className="relative z-10 w-full min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 40, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full"
              >
                {renderSectionContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── FOOTER ─── */}
          <footer className="mt-20 text-center py-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-chocolate-200/50" />
              <Heart size={14} fill="rgba(185,145,123,0.5)" className="text-chocolate-300" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-chocolate-200/50" />
            </div>
            <p className="text-[10px] tracking-[0.3em] font-sans font-light uppercase text-chocolate-400">
              Dibuat dengan cinta untuk merayakan hari istimewa Hana · 2026
            </p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
