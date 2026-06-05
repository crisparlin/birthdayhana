"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const basePath = process.env.NODE_ENV === 'production' ? '/birthdayhana' : '';

export default function PolaroidGallery() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [exitX, setExitX] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const triggerChange = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Throw right for next, left for prev
    setExitX(direction === "next" ? 380 : -380);

    setTimeout(() => {
      setCurrentIdx((prev) => {
        if (direction === "next") {
          return (prev + 1) % photos.length;
        } else {
          return (prev - 1 + photos.length) % photos.length;
        }
      });
      setExitX(0);
      setIsAnimating(false);
    }, 350);
  };

  const handleNext = () => triggerChange("next");
  const handlePrev = () => triggerChange("prev");

  const getCaption = (idx: number) => {
    return captions[idx % captions.length];
  };

  // Stack configurations
  const nextIdx1 = (currentIdx + 1) % photos.length;
  const nextIdx2 = (currentIdx + 2) % photos.length;

  return (
    <div className="relative flex flex-col items-center py-6 px-4 w-full max-w-sm mx-auto select-none">
      
      {/* Stack Container */}
      <div className="relative w-full aspect-[4/5] flex items-center justify-center">
        
        {/* Under Stack Card 2 (Bottom layer) */}
        <div 
          className="absolute w-[94%] h-[94%] bg-white p-4 pb-14 shadow-lg rounded-sm border border-gray-200/50 transform rotate-[4deg] translate-y-3 opacity-45 pointer-events-none transition-all duration-300"
          style={{ zIndex: 10 }}
        >
          <div className="w-full h-[84%] bg-gray-100 rounded-sm overflow-hidden relative">
            <img 
              src={`${basePath}/assets/${photos[nextIdx2]}`} 
              alt="Background Photo 2"
              className="w-full h-full object-cover filter blur-[0.5px]"
            />
          </div>
          <div className="absolute bottom-3 left-4 right-4 text-center">
            <p className="font-handwriting text-chocolate-400 text-lg truncate">{getCaption(nextIdx2)}</p>
          </div>
        </div>

        {/* Under Stack Card 1 (Middle layer) */}
        <div 
          className="absolute w-[97%] h-[97%] bg-white p-4 pb-14 shadow-xl rounded-sm border border-gray-200/60 transform -rotate-[3deg] translate-y-1.5 opacity-80 pointer-events-none transition-all duration-300"
          style={{ zIndex: 20 }}
        >
          <div className="w-full h-[84%] bg-gray-100 rounded-sm overflow-hidden relative">
            <img 
              src={`${basePath}/assets/${photos[nextIdx1]}`} 
              alt="Background Photo 1"
              className="w-full h-full object-cover filter blur-[0.5px]"
            />
          </div>
          <div className="absolute bottom-3 left-4 right-4 text-center">
            <p className="font-handwriting text-chocolate-600 text-xl truncate">{getCaption(nextIdx1)}</p>
          </div>
        </div>

        {/* Active Top Card (Front interactive layer with exit throwing) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            className="absolute w-full h-full bg-white p-4 pb-14 shadow-2xl rounded-sm border border-gray-150 transform z-30"
            initial={{ scale: 0.95, opacity: 0, rotate: -1 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 1.5,
              x: exitX === 0 ? 0 : exitX,
              y: exitX === 0 ? 0 : 15,
              rotateZ: exitX === 0 ? 1.5 : (exitX > 0 ? 15 : -15)
            }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 14,
              x: { duration: 0.35, ease: "easeOut" }
            }}
          >
            {/* Sticky Translucent Washi Tape at top center */}
            <div 
              className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-28 h-7 bg-sunflower-400/40 backdrop-blur-[0.5px] border border-sunflower-300/25 transform -rotate-2 z-40 shadow-sm flex items-center justify-center pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255, 215, 0, 0.1) 4px, rgba(255, 215, 0, 0.1) 8px)"
              }}
            >
              <span className="text-[9px] uppercase font-extrabold text-chocolate-900/65 tracking-widest">Hana & Cris</span>
            </div>

            {/* Silver Pushpin dot top-center */}
            <div className="absolute top-[-10px] left-[52%] w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md border border-red-700 z-50">
              <div className="w-1 h-1 rounded-full bg-white/60 top-0.5 left-0.5 absolute" />
            </div>

            {/* Photo Window */}
            <div className="relative w-full h-[84%] bg-gray-50 border border-gray-200 rounded-sm overflow-hidden flex items-center justify-center group">
              
              {/* Photo */}
              <img 
                src={`${basePath}/assets/${photos[currentIdx]}`} 
                alt={`Momen Hana - ${currentIdx + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none" />
              
              {/* Photo Index Tag top right */}
              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider border border-white/10 z-10">
                {currentIdx + 1} / {photos.length}
              </div>

              {/* Interactive arrows overlaid inside image frame */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-2.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-chocolate-900 border border-gray-200/60 shadow-md flex items-center justify-center z-15 hover:scale-105 active:scale-95 transition-all"
                title="Sebelumnya"
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-chocolate-900 border border-gray-200/60 shadow-md flex items-center justify-center z-15 hover:scale-105 active:scale-95 transition-all"
                title="Selanjutnya"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Caption */}
            <div className="absolute bottom-3 left-4 right-4 text-center">
              <p className="font-handwriting text-chocolate-850 text-2.5xl tracking-wide select-none truncate">
                {getCaption(currentIdx)}
              </p>
            </div>

            {/* Cute Sunflower Sticker bottom right */}
            <div className="absolute bottom-1 right-1.5 w-11 h-11 select-none pointer-events-none transform rotate-12 z-40 filter drop-shadow-md">
              <svg viewBox="0 0 100 100">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ellipse key={i} cx="50" cy="50" rx="34" ry="10" fill="#FFC000" stroke="#FFD700" strokeWidth="0.5" transform={`rotate(${i * 22.5} 50 50)`} />
                ))}
                <circle cx="50" cy="50" r="13" fill="#422517" />
                <circle cx="50" cy="50" r="10" fill="#2C1A11" />
              </svg>
            </div>
            
            {/* Heart clip bottom-left */}
            <div className="absolute bottom-2.5 left-2.5 select-none pointer-events-none text-rose-500 z-40 animate-pulse">
              <Heart size={16} fill="currentColor" />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper text info */}
      <div className="text-center text-[10px] text-chocolate-500 font-bold uppercase tracking-widest mt-6 select-none bg-[#2C1A11]/5 px-4 py-1.5 rounded-full border border-chocolate-200/30">
        Klik tombol panah untuk melihat foto lainnya
      </div>
    </div>
  );
}
