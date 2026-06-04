"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import BirthdayCake from "@/components/BirthdayCake";
import ChocolateBox from "@/components/ChocolateBox";
import PolaroidGallery from "@/components/PolaroidGallery";
import MusicPlayer from "@/components/MusicPlayer";
import { Sparkles, Heart, ChevronRight, ChevronLeft } from "lucide-react";

interface FloatingParticle {
  id: number;
  emoji: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  driftClass: string;
}

type SectionId = "letter" | "chocolate" | "cake" | "polaroid";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [activeSection, setActiveSection] = useState<SectionId>("letter");

  // Generate falling particles once page load completes
  useEffect(() => {
    const emojis = ["🌻", "🤎", "🌷", "🍓", "🌻", "🍫", "🌷", "✨"];
    const driftClasses = ["animate-drift-right", "animate-drift-left"];
    const generated = Array.from({ length: 22 }).map((_, idx) => ({
      id: idx,
      emoji: emojis[idx % emojis.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${12 + Math.random() * 8}s`,
      size: `${14 + Math.random() * 16}px`,
      driftClass: driftClasses[idx % driftClasses.length],
    }));
    setParticles(generated);
  }, []);

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
            {/* Letter Content Card */}
            <div className="relative bg-[#FCF9F3] border-2 border-chocolate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
              {/* Sunflower corner graphic detail */}
              <div className="absolute top-[-10px] left-[-10px] w-12 h-12 opacity-35">
                <svg viewBox="0 0 100 100" fill="#FFC000">
                  <circle cx="50" cy="50" r="40" />
                </svg>
              </div>
              
              {/* Paper lines background pattern */}
              <div className="absolute inset-0 opacity-[0.02] bg-chocolate-drizzle pointer-events-none" />

              {/* Letter Header */}
              <div className="flex justify-between items-center border-b border-chocolate-200/40 pb-4 mb-6">
                <div>
                  <p className="font-serif text-2xl font-bold text-chocolate-900">
                    Dear Hana,
                  </p>
                  <span className="text-[10px] uppercase font-semibold text-sunflower-600 tracking-wider">
                    A Special Birthday Wish
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-sunflower-400/20 flex items-center justify-center text-sunflower-500">
                  <Heart size={18} fill="currentColor" />
                </div>
              </div>

              {/* Letter Body text */}
              <div className="space-y-4 font-serif text-sm sm:text-base text-chocolate-850 leading-relaxed">
                <p className="font-bold text-chocolate-900 text-lg">
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
                <p className="font-bold text-chocolate-900">
                  Sekali lagi, Happy birthday pacarku yang cantik. I love you, sayangggg! ❤️
                </p>
              </div>

              {/* Letter Footer */}
              <div className="mt-8 pt-6 border-t border-chocolate-200/40 flex flex-col items-end">
                <p className="text-xs text-chocolate-500 uppercase tracking-widest mb-1">
                  Tertanda dari hati,
                </p>
                <p className="font-handwriting text-3xl text-chocolate-900 tracking-wide">
                  Pacar Tersayangmu, Cris ❤️
                </p>
              </div>
            </div>

            {/* Bottom guide button */}
            <div className="flex justify-center pt-2">
              <button 
                onClick={handleNextSection}
                className="flex items-center gap-1 bg-sunflower-400 hover:bg-sunflower-500 text-chocolate-950 font-serif font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Buka Kotak Cokelat Hana 🍫 <ChevronRight size={16} />
              </button>
            </div>
          </div>
        );

      case "chocolate":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-chocolate-200/30 shadow-xl">
              <h2 className="font-serif text-2xl font-bold text-chocolate-900 mb-2 flex items-center justify-center gap-2">
                🍫 Kotak Cokelat Spesial Hana
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-600 text-center mb-8">
                Ketuk cokelat manis di bawah ini untuk mengambil gigitan dan membaca pesan tersembunyi!
              </p>
              <ChocolateBox />
            </div>

            {/* Bottom guide buttons */}
            <div className="flex justify-between items-center max-w-xl mx-auto pt-2">
              <button 
                onClick={handlePrevSection}
                className="flex items-center gap-1 text-chocolate-700 hover:text-chocolate-900 font-serif font-bold text-sm px-4 py-2"
              >
                <ChevronLeft size={16} /> Kembali ke Surat
              </button>
              <button 
                onClick={handleNextSection}
                className="flex items-center gap-1 bg-sunflower-400 hover:bg-sunflower-500 text-chocolate-950 font-serif font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Tiup Lilin Ulang Tahun 🎂 <ChevronRight size={16} />
              </button>
            </div>
          </div>
        );

      case "cake":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-chocolate-200/30 shadow-xl">
              <h2 className="font-serif text-2xl font-bold text-chocolate-900 mb-2 flex items-center justify-center gap-2">
                🎂 Tiup Lilin Ulang Tahun
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-600 text-center mb-6">
                Make a wish, ketuk lilin cokelat manis di bawah ini untuk meniupnya!
              </p>
              <BirthdayCake />
            </div>

            {/* Bottom guide buttons */}
            <div className="flex justify-between items-center max-w-xl mx-auto pt-2">
              <button 
                onClick={handlePrevSection}
                className="flex items-center gap-1 text-chocolate-700 hover:text-chocolate-900 font-serif font-bold text-sm px-4 py-2"
              >
                <ChevronLeft size={16} /> Kembali ke Kotak Cokelat
              </button>
              <button 
                onClick={handleNextSection}
                className="flex items-center gap-1 bg-sunflower-400 hover:bg-sunflower-500 text-chocolate-950 font-serif font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Lihat Galeri Foto Kita 📸 <ChevronRight size={16} />
              </button>
            </div>
          </div>
        );

      case "polaroid":
        return (
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-chocolate-200/30 shadow-xl">
              <h2 className="font-serif text-2xl font-bold text-chocolate-900 mb-2 flex items-center justify-center gap-2">
                📸 Galeri Polaroid Hana & Pacar
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-600 text-center mb-6">
                Koleksi momen-momen indah terindah yang kita bagikan bersama.
              </p>
              <PolaroidGallery />
            </div>

            {/* Bottom guide buttons */}
            <div className="flex justify-between items-center max-w-xl mx-auto pt-2">
              <button 
                onClick={handlePrevSection}
                className="flex items-center gap-1 text-chocolate-700 hover:text-chocolate-900 font-serif font-bold text-sm px-4 py-2"
              >
                <ChevronLeft size={16} /> Kembali ke Tiup Lilin
              </button>
              <button 
                onClick={() => setActiveSection("letter")}
                className="flex items-center gap-1 bg-sunflower-400/80 hover:bg-sunflower-500 text-chocolate-950 font-serif font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Mulai dari Awal ✉️
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-chocolate-50 to-[#FAF6F0]">
      
      {/* Dynamic Background Falling Particles */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`absolute top-[-50px] ${p.driftClass} opacity-80 select-none`}
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
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* Scene 1: Closed Special Envelope */
          <motion.div
            key="envelope-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Envelope onOpen={() => setIsOpened(true)} />
          </motion.div>
        ) : (
          /* Scene 2: Main Interactive Birthday Greeting Dashboard (Sections view) */
          <motion.div
            key="dashboard-scene"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-20 max-w-4xl mx-auto px-4 py-8 sm:py-12"
          >
            {/* Header Area */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-chocolate-200/40 pb-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="text-2xl animate-pulse">🌻</span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-chocolate-900 tracking-wide">
                    Hana&apos;s Sweet Birthday
                  </h1>
                  <span className="text-2xl animate-spin-slow">🌻</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-chocolate-600 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
                  Made with Sweet Chocolate & Sunflowers <Sparkles size={12} className="text-sunflower-500" />
                </p>
              </div>

              {/* Background Music Controller */}
              <div className="w-full md:w-auto flex justify-center">
                <MusicPlayer />
              </div>
            </header>

            {/* Spacer instead of tabs to keep it a surprise */}
            <div className="h-6" />

            {/* Active Section Content with Framer Motion slide-fade transition */}
            <div className="relative z-10 w-full min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  {renderSectionContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Global Footer */}
            <footer className="mt-16 text-center text-xs text-chocolate-400 py-6 border-t border-chocolate-200/20">
              <p className="tracking-wide">
                Dibuat khusus untuk merayakan hari istimewa Hana. © 2026. All rights reserved.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
