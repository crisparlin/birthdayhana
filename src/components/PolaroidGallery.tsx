"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const basePath = process.env.NODE_ENV === 'production' ? '/birthdayhana' : '';

export default function PolaroidGallery() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const photos = [
    "WhatsApp Image 2026-06-04 at 20.33.39.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.40 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.40.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.41 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.41.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.42.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.43.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.44 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.44.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.45 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.45.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.46 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.46 (2).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.46.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.47 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.47.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.48 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.48.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.49 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.49.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.51 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.51 (2).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.51.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.52 (1).jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.52.jpeg",
    "WhatsApp Image 2026-06-04 at 20.33.53.jpeg"
  ];

  const captions = [
    "Kebersamaan Penuh Tawa 🌻",
    "Momen Indah Kita 🤎",
    "Kenangan Terbaik ✨",
    "Hana & Pacar Tersayang 🎂",
    "Senyuman Secerah Bunga Matahari",
    "Hari Istimewa Bersamamu",
    "Kisah Cinta yang Indah 💛",
    "Manis Seperti Stroberi 🍓",
    "Selalu Bahagia Bersama",
    "Secantik Tulip yang Mekar 🌷",
    "Momen Manis Cokelat",
    "Kita Berdua dengan Hana 🌻"
  ];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const getCaption = (idx: number) => {
    return captions[idx % captions.length];
  };

  return (
    <div className="relative flex flex-col items-center py-6 px-4 w-full max-w-sm mx-auto">
      
      {/* Polaroid Container */}
      <div className="relative w-full aspect-[4/5] bg-white p-4 pb-14 shadow-2xl rounded-sm border border-gray-150 transform rotate-1 transition-transform hover:rotate-0 duration-300">
        
        {/* Sticky Tape at the top center */}
        <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-8 bg-sunflower-400/40 backdrop-blur-[1px] border border-sunflower-300/30 transform -rotate-3 z-30 shadow-sm flex items-center justify-center">
          <span className="text-[10px] uppercase font-bold text-chocolate-900/50 tracking-wider">With Love</span>
        </div>

        {/* Image Container Window */}
        <div className="relative w-full h-[84%] bg-gray-50 border border-gray-200 rounded-sm overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 60, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              {/* Render Image from public/assets */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`${basePath}/assets/${photos[currentIdx]}`} 
                alt={`Momen Hana - ${currentIdx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Photo Index Tag top right */}
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                {currentIdx + 1} / {photos.length}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Navigation Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-chocolate-900 border border-gray-200 shadow-sm flex items-center justify-center z-10 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-chocolate-900 border border-gray-200 shadow-sm flex items-center justify-center z-10 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Polaroid caption with handwriting font */}
        <div className="absolute bottom-3 left-4 right-4 text-center">
          <p className="font-handwriting text-chocolate-850 text-2xl tracking-wide select-none truncate">
            {getCaption(currentIdx)}
          </p>
        </div>

        {/* Decorative Sunflower Sticker bottom right */}
        <div className="absolute bottom-2 right-2 w-10 h-10 select-none pointer-events-none transform rotate-12 z-20">
          <svg viewBox="0 0 100 100">
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse key={i} cx="50" cy="50" rx="35" ry="10" fill="#FFC000" stroke="#FFD700" transform={`rotate(${i * 22.5} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="14" fill="#5C3E14" />
          </svg>
        </div>

        {/* Small pin mark top left */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-red-600/80 shadow-md border border-red-700" />
      </div>

      {/* Pagination indicators info */}
      <div className="text-center text-[10px] text-chocolate-400 mt-3 select-none">
        Gunakan tombol panah untuk melihat foto lainnya
      </div>
    </div>
  );
}
