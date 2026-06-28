"use client";

import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import { Crown, ScribbleUnderline, RocketDoodle, TextDoodle, AIChip, ArrowDoodle } from "@/components/ui/Doodles";
import TicTacToeJourney from "@/components/ui/TicTacToeJourney";
export function HeroLeftPage() {
  return (
    <div className="flex flex-col h-full font-sans pt-6 relative md:static">
      
      {/* Crown Doodle */}
      <Crown className="w-12 h-12 text-brand-black absolute -top-4 left-6 hidden md:block" />
      
      {/* Scattered Decorations */}
      <div className="absolute top-10 right-[35%] opacity-40 z-0 pointer-events-none transform rotate-12 hidden lg:block">
        <TextDoodle text="dream big" className="text-xl text-[#7CFF00]" />
      </div>
      <div className="absolute top-28 left-2 opacity-30 z-0 pointer-events-none transform -rotate-12 hidden md:block">
        <AIChip className="w-10 h-10 text-brand-black" />
      </div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 md:ml-4 z-10 relative text-center md:text-left mb-8 md:mb-0 md:pr-36"
      >
        <h1 className="font-heading text-4xl sm:text-5xl xl:text-[54px] font-bold text-brand-black leading-tight tracking-tight">
          My Internship <br/>
          <span className="text-[#6DFF33] relative inline-block font-caveat">
            Journey
            <ScribbleUnderline className="absolute -bottom-2 left-0 w-[120%] text-[#6DFF33]" />
          </span>
        </h1>
        
        <h2 className="text-xl md:text-2xl mt-8 md:mt-12 mb-4 md:mb-6 font-kalam font-bold text-brand-black">
          Hey Future Innovator! <span className="inline-block transform origin-bottom-right hover:rotate-12 transition-transform cursor-grab">👋</span>
        </h2>
        
        <p className="text-brand-black/80 leading-relaxed mb-6 md:mb-10 max-w-sm mx-auto md:mx-0 font-sans font-medium text-base md:text-sm">
          Take the first step toward building your career with real-world experience, mentorship, and hands-on learning.
        </p>
      </motion.div>

      {/* Light Green Sticky Note (Top Right) */}
      <motion.div 
        className="relative mt-2 md:mt-0 md:absolute md:-top-10 md:right-0 lg:-top-6 lg:right-6 bg-[#E2F7C2] p-3 md:p-4 shadow-[2px_4px_8px_rgba(0,0,0,0.1)] w-[180px] mx-auto md:w-[130px] transform rotate-3 hover:rotate-6 transition-transform cursor-pointer z-0 mb-8 md:mb-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        {/* Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-5 bg-[#222] rotate-3 opacity-90 shadow-sm"></div>
        {/* Lightbulb doodle */}
        <svg className="w-5 h-5 mx-auto mb-1.5 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <ul className="font-kalam text-base text-center text-brand-black leading-snug space-y-0.5">
          <li>Learn.</li>
          <li>Build.</li>
          <li>Grow.</li>
          <li className="font-bold">Succeed!</li>
        </ul>
      </motion.div>

      {/* Torn Paper Checklist (Middle Right) */}
      {/* Middle Checklist Card */}
      <motion.div 
        className="relative bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-brand-black w-full max-w-[320px] mx-auto md:max-w-xs md:mx-0 transform rotate-2 z-20"
        whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute -top-3 right-8 w-8 h-4 bg-[#222] -rotate-6 opacity-90"></div>
        <h3 className="font-heading font-bold text-xl mb-4 border-b border-dashed border-zinc-300 pb-1">Internship Checklist</h3>
        <ul className="space-y-3 font-caveat text-2xl text-brand-black">
          <li className="flex items-center gap-3"><span className="border border-brand-black w-5 h-5 flex items-center justify-center font-sans text-sm font-bold bg-[#6DFF33]/30">✓</span> Build Skills</li>
          <li className="flex items-center gap-3"><span className="border border-brand-black w-5 h-5 flex items-center justify-center font-sans text-sm font-bold bg-white text-transparent">✓</span> Join Internship</li>
          <li className="flex items-center gap-3"><span className="border border-brand-black w-5 h-5 flex items-center justify-center font-sans text-sm font-bold bg-white text-transparent">✓</span> Work on Projects</li>
          <li className="flex items-center gap-3"><span className="border border-brand-black w-5 h-5 flex items-center justify-center font-sans text-sm font-bold bg-white text-transparent">✓</span> Get Certified</li>
          <li className="flex items-center gap-3"><span className="border border-brand-black w-5 h-5 flex items-center justify-center font-sans text-sm font-bold bg-white text-transparent">✓</span> Get Placed</li>
        </ul>
        <svg className="w-8 h-8 absolute bottom-2 right-2 text-brand-black hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </motion.div>

      <div className="mt-8 md:mt-auto relative z-10 w-full mb-10">
        
        {/* Tic Tac Toe Progress */}
        <TicTacToeJourney />

        {/* Bottom Motivation Card */}
        <div className="relative w-full max-w-[320px] mx-auto md:max-w-none md:mx-0">
          <motion.div 
            className="bg-brand-black p-6 w-full md:w-72 transform rotate-0 md:-rotate-3 text-white shadow-xl relative z-10 rounded-xl md:rounded-none"
            whileHover={{ rotate: 0 }}
          >
            <div className="absolute -top-3 left-4 w-8 h-4 bg-[#F8F6F0] -rotate-6 opacity-80 border border-zinc-300"></div>
            <p className="font-caveat text-2xl md:text-2xl leading-relaxed">
              <span className="text-[#6DFF33] font-sans text-4xl leading-none absolute -top-2 left-2">"</span>
              <span className="pl-4 inline-block">The best way to predict your future is to <span className="relative">create it.<ScribbleUnderline className="absolute -bottom-1 left-0 w-full text-[#6DFF33]" /></span></span>
              <span className="text-[#6DFF33] font-sans text-4xl leading-none absolute bottom-0 right-2">"</span>
            </p>
            <svg className="hidden md:block w-6 h-6 absolute bottom-2 right-12 text-[#6DFF33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </motion.div>

          {/* Tip Sticky Note */}
          <motion.div 
            className="relative md:absolute mt-8 md:mt-0 md:bottom-4 md:right-0 bg-[#E2F7C2] p-5 w-full md:w-48 shadow-md transform rotate-0 md:rotate-2 z-20"
            whileHover={{ rotate: 0 }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#222] rotate-3 opacity-90"></div>
            <h4 className="font-heading font-bold text-sm mb-1 flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>Tip</h4>
            <p className="font-kalam text-brand-black leading-snug text-lg">
              Students with real projects & GitHub stand out more!
            </p>
          </motion.div>

          {/* Squiggly arrow pointing from tip to roadmap */}
          <svg className="hidden md:block absolute -bottom-6 right-48 w-16 h-16 text-brand-black transform rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M90 90 Q 50 100 10 50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
             <path d="M20 40 L 10 50 L 30 60" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
    </div>
  );
}
