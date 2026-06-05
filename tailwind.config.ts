import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          50: "#FAF6F0",
          100: "#F5EBE6",
          200: "#EADBD3",
          300: "#D3B7A8",
          400: "#B9917B",
          500: "#9A6D55",
          600: "#83553E",
          700: "#6B422F",
          800: "#543324",
          900: "#2C1A11",
          950: "#1A0F0A",
        },
        sunflower: {
          50: "#FFFEE5",
          100: "#FFFABF",
          200: "#FFF48C",
          300: "#FFE64D",
          400: "#FFD700", // Sunflower Gold
          500: "#FFC000", // Sunflower Yellow
          600: "#E6A100", // Dark Sunflower
          700: "#B87A00",
          800: "#7A5200",
          900: "#4D3400",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "chocolate-drizzle": "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(44, 26, 17, 0.05) 10px, rgba(44, 26, 17, 0.05) 20px)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "sway": "sway 4s ease-in-out infinite",
        "flicker": "flicker 1.5s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-vinyl": "spin 4s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-gold": "pulseGold 2s infinite",
        "drift-right": "driftRight 15s linear infinite",
        "drift-left": "driftLeft 15s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(5deg)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        flicker: {
          "0%, 100%": { transform: "scale(1) rotate(-1deg)", opacity: "0.95" },
          "20%": { transform: "scale(1.05) rotate(1deg)", opacity: "1" },
          "40%": { transform: "scale(0.95) rotate(-2deg)", opacity: "0.9" },
          "60%": { transform: "scale(1.1) rotate(0deg)", opacity: "1" },
          "80%": { transform: "scale(0.9) rotate(2deg)", opacity: "0.85" },
        },
        driftRight: {
          "0%": { transform: "translateX(-10%) translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateX(110%) translateY(-100px) rotate(360deg)", opacity: "0" },
        },
        driftLeft: {
          "0%": { transform: "translateX(110%) translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateX(-10%) translateY(-100px) rotate(-360deg)", opacity: "0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.6)" },
          "50%": { boxShadow: "0 0 0 10px rgba(255, 215, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
