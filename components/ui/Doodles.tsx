import { motion } from "framer-motion";
export const Crown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 40 L20 80 L80 80 L90 40 L65 60 L50 20 L35 60 Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="35" r="4" fill="currentColor" />
    <circle cx="50" cy="15" r="4" fill="currentColor" />
    <circle cx="90" cy="35" r="4" fill="currentColor" />
  </svg>
);

export const PaperAirplane = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 50 L90 20 L60 90 L50 60 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 50 L50 60 L90 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 70 L50 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Trail */}
    <path d="M5 80 Q 20 60 10 50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
  </svg>
);

export const RocketDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Flame */}
    <path d="M60 140 Q 50 180 80 190 Q 70 160 90 140 Z" fill="#6DFF33" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Rocket Body */}
    <path d="M50 150 Q 20 100 80 20 Q 140 80 110 130 Z" fill="white" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Window */}
    <circle cx="80" cy="80" r="15" stroke="black" strokeWidth="3" fill="none" />
    {/* Fins */}
    <path d="M50 120 L 20 150 L 50 150 Z" fill="white" stroke="black" strokeWidth="3" strokeLinejoin="round" />
    <path d="M110 100 L 140 130 L 110 130 Z" fill="white" stroke="black" strokeWidth="3" strokeLinejoin="round" />
    {/* Cloud smoke */}
    <path d="M40 180 Q 20 170 30 190 Q 50 200 60 190 M90 180 Q 110 170 100 190 Q 80 200 70 190" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const ScribbleUnderline = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5 15 Q 50 5 100 12 T 195 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M10 18 Q 60 8 110 15 T 190 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const BrushStrokeButton = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute inset-0 w-full h-full -z-10 ${className}`} preserveAspectRatio="none">
    <path d="M10 40 Q 50 10 150 20 T 290 30 Q 295 50 280 60 Q 150 75 50 70 Q 5 60 10 40 Z" fill="#111111" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
    {/* Rough edges */}
    <path d="M15 35 L 25 45 M 280 35 L 290 45" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const ArrowDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 50 Q 50 20 90 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M70 40 L 90 50 L 70 60" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PencilDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M80 20 L 20 80 L 10 90 L 20 90 L 80 30 Z" stroke="currentColor" strokeWidth="3" fill="white" strokeLinejoin="round" />
    <path d="M70 10 L 90 30 L 80 40 L 60 20 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
    <path d="M20 80 L 10 90 L 20 90 Z" fill="currentColor" />
  </svg>
);

export const SparkleDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 10 Q 50 40 80 50 Q 50 60 50 90 Q 50 60 20 50 Q 50 40 50 10 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
  </svg>
);

export const AnimatedUnderline = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.svg
    viewBox="0 0 200 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
    animate={{ strokeDashoffset: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    <path d="M5 15 Q 50 5 100 12 T 195 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M10 18 Q 60 8 110 15 T 190 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </motion.svg>
);

export const SpiralBinding = () => {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-evenly py-8 z-30 pointer-events-none -translate-x-1/2">
      {[...Array(24)].map((_, i) => (
        <div key={i} className="relative w-12 h-5">
          {/* Refined Black spiral loop */}
          <svg viewBox="0 0 60 20" className="absolute inset-0 w-full h-full drop-shadow-sm">
            <path d="M 50 10 C 50 2, 10 2, 10 10 C 10 18, 50 18, 50 10" fill="none" stroke="#222" strokeWidth="4" strokeLinecap="round" />
            <path d="M 47 10 C 47 6, 15 6, 15 10 C 15 14, 47 14, 47 10" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  );
};
