"use client";

import { motion } from "framer-motion";
import { PaperAirplane } from "@/components/ui/Doodles";

export function PageDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden rounded-r-[30px] rounded-l-md" aria-hidden="true">
      {/* Floating Paper Airplanes */}
      <motion.div
        className="absolute w-20 h-20 opacity-[0.07]"
        initial={{ x: "-10vw", y: "20vh", rotate: -15 }}
        animate={{
          x: ["-10vw", "110vw"],
          y: ["20vh", "15vh", "25vh", "10vh"],
          rotate: [-15, -5, -20, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <PaperAirplane className="w-full h-full text-brand-black" />
      </motion.div>

      <motion.div
        className="absolute w-14 h-14 opacity-[0.05]"
        initial={{ x: "110vw", y: "70vh", rotate: 160 }}
        animate={{
          x: ["110vw", "-10vw"],
          y: ["70vh", "80vh", "65vh", "75vh"],
          rotate: [160, 150, 170, 160]
        }}
        transition={{
          duration: 35,
          delay: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <PaperAirplane className="w-full h-full text-brand-black" />
      </motion.div>

      {/* Floating Particles (Dots, Stars, Crosses) */}
      {[...Array(12)].map((_, i) => {
        const isGreen = i % 3 === 0;
        const isStar = i % 4 === 0;
        const isCross = i % 5 === 0;
        
        const size = isStar ? 8 : (isCross ? 10 : Math.random() * 4 + 2);
        const top = Math.random() * 100 + "%";
        const left = Math.random() * 100 + "%";
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 15;

        return (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{ top, left, width: size, height: size }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: isStar || isCross ? [0, 180, 360] : 0,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {isStar ? (
              <svg viewBox="0 0 24 24" fill="none" className={isGreen ? "text-[#7CFF00]" : "text-[#222]"}>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : isCross ? (
              <svg viewBox="0 0 24 24" fill="none" className={isGreen ? "text-[#7CFF00]" : "text-[#222]"}>
                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <div className={`w-full h-full rounded-full ${isGreen ? "bg-[#7CFF00]" : "bg-[#222]"}`} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
