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

export const CoffeeCup = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M20 30 C 20 80, 80 80, 80 30 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M80 40 C 95 40, 95 60, 80 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 20 Q 45 10, 50 20 T 60 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GraduationCap = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M10 40 L50 20 L90 40 L50 60 Z" fill="white" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M30 50 L30 70 Q 50 85, 70 70 L70 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M90 40 L90 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="90" cy="75" r="3" fill="currentColor" />
  </svg>
);

export const LaptopSketch = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="20" y="20" width="60" height="40" rx="3" fill="white" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M10 65 L90 65 L85 75 L15 75 Z" fill="white" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="50" cy="40" r="4" fill="currentColor" />
  </svg>
);

export const LightningBolt = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M60 10 L20 60 L50 60 L40 90 L80 40 L50 40 Z" fill="#7CFF00" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

export const CodingSymbols = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M30 20 L10 50 L30 80 M70 20 L90 50 L70 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M60 15 L40 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Braces = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M40 10 C 20 10, 20 30, 20 45 C 20 50, 10 50, 10 50 C 20 50, 20 50, 20 55 C 20 70, 20 90, 40 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M60 10 C 80 10, 80 30, 80 45 C 80 50, 90 50, 90 50 C 80 50, 80 50, 80 55 C 80 70, 80 90, 60 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AIChip = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="30" y="30" width="40" height="40" rx="4" fill="white" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M30 45 H15 M30 55 H15 M70 45 H85 M70 55 H85 M45 30 V15 M55 30 V15 M45 70 V85 M55 70 V85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="50" r="6" fill="#7CFF00" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const LocationPin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M50 90 C 50 90, 15 55, 15 35 C 15 15, 30 10, 50 10 C 70 10, 85 15, 85 35 C 85 55, 50 90, 50 90 Z" fill="white" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="50" cy="35" r="10" stroke="currentColor" strokeWidth="3" />
  </svg>
);

export const PaperClip = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M30 65 L 30 30 C 30 15, 50 15, 50 30 L 50 75 C 50 95, 80 95, 80 75 L 80 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StarGroup = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M50 10 L55 35 L80 40 L55 45 L50 70 L45 45 L20 40 L45 35 Z" fill="#7CFF00" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M20 70 L22 80 L32 82 L22 84 L20 94 L18 84 L8 82 L18 80 Z" fill="white" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M80 15 L82 22 L89 24 L82 26 L80 33 L78 26 L71 24 L78 22 Z" fill="white" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const TextDoodle = ({ text, className }: { text: string; className?: string }) => (
  <div className={`font-caveat font-bold text-brand-black rotate-[-5deg] ${className}`}>
    {text}
  </div>
);
