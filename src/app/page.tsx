"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import BirthdayCake from "@/components/BirthdayCake";
import ChocolateBox from "@/components/ChocolateBox";
import PolaroidGallery from "@/components/PolaroidGallery";
import MusicPlayer from "@/components/MusicPlayer";
import { Sparkles, Heart, ChevronRight, ChevronLeft } from "lucide-react";

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
      } else {
        const section = hash.replace("#/", "") as SectionId;
        if (["letter", "chocolate", "cake", "polaroid"].includes(section)) {
          setIsOpened(true);
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial check on mount
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Update hash when state changes
  useEffect(() => {
    if (isOpened) {
      window.location.hash = `#/${activeSection}`;
    } else {
      if (typeof window !== "undefined" && window.location.hash && window.location.hash !== "#/") {
        window.location.hash = "#/";
      }
    }
  }, [isOpened, activeSection]);

  // Reset scroll to top instantly on section/state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeSection, isOpened]);

  // Generate falling particles once page load completes
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

  // Generate floating balloons when envelope is opened
  useEffect(() => {
    if (isOpened) {
      const colors = [
        "from-sunflower-400 via-amber-400 to-sunflower-600", // Sunflower Gold
        "from-rose-400 via-pink-400 to-rose-600", // Sweet Rose
        "from-amber-200 via-[#C69C87] to-chocolate-700", // Soft Chocolate-Gold
        "from-yellow-300 via-sunflower-400 to-amber-500", // Radiant Yellow
        "from-rose-300 via-pink-300 to-rose-500", // Pastel Pink
        "from-orange-400 via-amber-400 to-chocolate-600", // Warm Caramel
      ];
      const borders = [
        "border-sunflower-500",
        "border-rose-500",
        "border-chocolate-400",
        "border-sunflower-500",
        "border-rose-400",
        "border-amber-600",
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
          <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Letter Content Card - Vintage parchment style */}
            <div className="relative parchment-bg rounded-3xl p-6 sm:p-10 border-4 border-[#2C1A11]/10 overflow-hidden shadow-2xl">
              
              {/* Gold foil decorative inner border */}
              <div className="absolute inset-3 border border-sunflower-400/35 rounded-2xl pointer-events-none" />
              <div className="absolute inset-4 border border-sunflower-500/10 rounded-2xl pointer-events-none" />
              
              {/* Corner Sunflower Graphic Details */}
              <div className="absolute top-4 left-4 w-8 h-8 opacity-45 select-none pointer-events-none">
                <span>🌻</span>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 opacity-45 select-none pointer-events-none">
                <span>🌻</span>
              </div>

              {/* Letter Header */}
              <div className="flex justify-between items-center border-b border-chocolate-200/40 pb-5 mb-6 relative z-10">
                <div>
                  <h2 className="font-serif text-3xl font-extrabold text-chocolate-900 tracking-wide">
                    Dear Hana,
                  </h2>
                  <span className="text-[10px] uppercase font-bold text-sunflower-600 tracking-widest block mt-1">
                    ✨ A Special Birthday Wish ✨
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-sunflower-400/20 flex items-center justify-center text-sunflower-600 shadow-inner">
                  <Heart size={20} fill="currentColor" className="animate-pulse" />
                </div>
              </div>

              {/* Letter Body text */}
              <div className="space-y-5 font-serif text-sm sm:text-base text-chocolate-850 leading-relaxed relative z-10">
                <p className="font-extrabold text-chocolate-900 text-lg sm:text-xl italic">
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
                <p className="font-extrabold text-chocolate-900 text-base sm:text-lg border-l-4 border-sunflower-400 pl-4 py-1 bg-sunflower-400/5 my-6">
                  Sekali lagi, Happy birthday pacarku yang cantik. I love you, sayangggg! ❤️
                </p>
              </div>

              {/* Letter Footer */}
              <div className="mt-8 pt-6 border-t border-chocolate-200/40 flex flex-col items-end relative z-10">
                <p className="text-[10px] text-chocolate-500 uppercase tracking-widest mb-1 font-sans font-bold">
                  Tertanda dari hati,
                </p>
                <p className="font-handwriting text-3xl text-chocolate-900 tracking-wide drop-shadow-sm">
                  Pacar Tersayangmu, Cris ❤️
                </p>
              </div>
            </div>

            {/* Bottom guide button */}
            <div className="flex justify-center pt-4">
              <button 
                onClick={handleNextSection}
                className="gold-btn flex items-center gap-2 font-serif font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Buka Kotak Cokelat Hana 🍫 <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );

      case "chocolate":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-chocolate-200/30 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-sunflower-400/5 blur-2xl pointer-events-none" />
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-chocolate-900 mb-2 flex items-center justify-center gap-2 text-center">
                <span>🍫</span> Kotak Cokelat Spesial Hana <span>🍫</span>
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-600 text-center mb-8 font-semibold">
                Ketuk cokelat manis di bawah ini untuk mengambil gigitan dan membaca pesan tersembunyi!
              </p>
              <ChocolateBox />
            </div>

            {/* Bottom guide buttons */}
            <div className="flex justify-between items-center max-w-xl mx-auto pt-4 px-4 sm:px-0">
              <button 
                onClick={handlePrevSection}
                className="flex items-center gap-1.5 text-chocolate-700 hover:text-chocolate-950 font-serif font-extrabold text-sm transition-colors"
              >
                <ChevronLeft size={18} /> Kembali ke Surat
              </button>
              <button 
                onClick={handleNextSection}
                className="gold-btn flex items-center gap-2 font-serif font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Tiup Lilin Ulang Tahun 🎂 <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );

      case "cake":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-chocolate-200/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sunflower-400/5 blur-3xl pointer-events-none rounded-full" />
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-chocolate-900 mb-2 flex items-center justify-center gap-2 text-center">
                <span>🎂</span> Tiup Lilin Ulang Tahun <span>🎂</span>
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-600 text-center mb-6 font-semibold">
                Make a wish! Ketuk lilin cokelat manis di bawah ini untuk meniupnya!
              </p>
              <BirthdayCake />
            </div>

            {/* Bottom guide buttons */}
            <div className="flex justify-between items-center max-w-xl mx-auto pt-4 px-4 sm:px-0">
              <button 
                onClick={handlePrevSection}
                className="flex items-center gap-1.5 text-chocolate-700 hover:text-chocolate-950 font-serif font-extrabold text-sm transition-colors"
              >
                <ChevronLeft size={18} /> Kembali ke Kotak Cokelat
              </button>
              <button 
                onClick={handleNextSection}
                className="gold-btn flex items-center gap-2 font-serif font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Lihat Galeri Foto Kita 📸 <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );

      case "polaroid":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-chocolate-200/30 shadow-2xl relative overflow-hidden">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-chocolate-900 mb-2 flex items-center justify-center gap-2 text-center">
                <span>📸</span> Galeri Polaroid Hana & Cris <span>📸</span>
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-600 text-center mb-6 font-semibold">
                Koleksi momen-momen indah terindah yang kita bagikan bersama.
              </p>
              <PolaroidGallery />
            </div>

            {/* Bottom guide buttons */}
            <div className="flex justify-between items-center max-w-xl mx-auto pt-4 px-4 sm:px-0">
              <button 
                onClick={handlePrevSection}
                className="flex items-center gap-1.5 text-chocolate-700 hover:text-chocolate-950 font-serif font-extrabold text-sm transition-colors"
              >
                <ChevronLeft size={18} /> Kembali ke Tiup Lilin
              </button>
              <button 
                onClick={() => {
                  window.location.hash = "#/";
                }}
                className="gold-btn flex items-center gap-2 font-serif font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Mulai dari Awal ✉️
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F2EAE1] to-[#E5DCD0]">
      
      {/* Interactive Birthday Celebration Backdrop */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          
          {/* Falling Flowers & Sparkles */}
          {particles.map((p) => (
            <div
              key={`particle-${p.id}`}
              className={`absolute top-[-50px] ${p.driftClass} opacity-85 select-none`}
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

          {/* Floating Party Balloons */}
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
              {/* Glossy Balloon body gradient */}
              <div 
                className={`w-full h-full bg-gradient-to-br ${b.color} rounded-[50%_50%_50%_50%/_40%_40%_60%_60%] shadow-lg border-[0.5px] border-white/20 relative`}
              >
                {/* 3D highlight sheen on top-left of balloon */}
                <div className="absolute top-[12%] left-[15%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[0.5px]" />
                
                {/* Balloon tie triangle */}
                <div 
                  className={`absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-chocolate-700/60`} 
                />
                
                {/* Balloon String */}
                <div className="balloon-string" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isOpened ? (
        /* Scene 1: Closed Special Envelope */
        <div className="w-full">
          <Envelope onOpen={() => setIsOpened(true)} />
        </div>
      ) : (
        /* Scene 2: Main Interactive Birthday Greeting Dashboard (Sections view) */
        <motion.div
          key="dashboard-scene"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-20 max-w-4xl mx-auto px-4 py-8 sm:py-12"
        >
          {/* Header Area */}
          <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-chocolate-200/40 pb-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-3xl animate-bounce">🌻</span>
                <h1 className="gold-text font-serif text-3.5xl sm:text-4.5xl font-extrabold tracking-wide drop-shadow-sm">
                  Hana&apos;s Sweet Birthday
                </h1>
                <span className="text-3xl animate-spin-slow">🌻</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-chocolate-600 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                <span>Made with Sweet Chocolate & Sunflowers</span>
                <Sparkles size={14} className="text-sunflower-500 animate-pulse" />
              </p>
            </div>

            {/* Background Music Controller */}
            <div className="w-full md:w-auto flex justify-center">
              <MusicPlayer />
            </div>
          </header>

          {/* Spacer */}
          <div className="h-4" />

          {/* Active Section Content with Framer Motion slide-fade transition */}
          <div className="relative z-10 w-full min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full"
              >
                {renderSectionContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Global Footer */}
          <footer className="mt-20 text-center text-xs text-chocolate-400 py-6 border-t border-chocolate-200/20">
            <p className="tracking-widest font-semibold uppercase">
              Dibuat dengan cinta untuk merayakan hari istimewa Hana. © 2026.
            </p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
