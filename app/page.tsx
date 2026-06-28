"use client";

import { motion } from "framer-motion";
import { HeroLeftPage } from "@/components/home/HeroLeftPage";
import { ApplicationForm } from "@/components/home/ApplicationForm";
import { SmartProfile } from "@/components/home/SmartProfile";
import { WhyIntern } from "@/components/home/WhyIntern";
import { SpiralBinding, CoffeeCup, LaptopSketch, GraduationCap, StarGroup } from "@/components/ui/Doodles";
import { PageDecorations } from "@/components/ui/PageDecorations";
import { useState } from "react";
import { HelpCard, CareerCard } from "@/components/home/SidebarCards";

export default function Home() {
  const [formProgress, setFormProgress] = useState(0);

  return (
    <div className="min-h-screen bg-[#2A2A2A] pt-0 pb-12 px-4 md:px-8 overflow-hidden relative font-sans flex justify-center items-start">
      {/* Background dark texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>

      <div className="container mx-auto w-full max-w-[1500px] relative z-10 flex justify-center">
        
        {/* The Notebook Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col xl:flex-row w-full bg-[#F8F6F0] rounded-r-[30px] rounded-l-md shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative min-h-[1000px]"
        >
          <PageDecorations />

          {/* Random Doodles in empty margins */}
          <div className="absolute bottom-8 left-[35%] opacity-40 z-0 pointer-events-none transform -rotate-12">
            <CoffeeCup className="w-16 h-16 text-brand-black" />
          </div>
          <div className="absolute top-12 left-[42%] opacity-30 z-0 pointer-events-none transform rotate-6">
            <StarGroup className="w-12 h-12" />
          </div>
          <div className="absolute bottom-20 right-[22%] opacity-20 z-0 pointer-events-none transform rotate-12">
            <LaptopSketch className="w-20 h-20 text-brand-black" />
          </div>
          <div className="absolute top-1/2 left-[48%] opacity-20 z-0 pointer-events-none transform -rotate-6">
            <GraduationCap className="w-14 h-14 text-brand-black" />
          </div>
          {/* FAR LEFT Spiral Binding */}
          <div className="hidden xl:block">
            <SpiralBinding />
          </div>

          {/* Left Page (40%) */}
          <div className="w-full xl:w-[40%] relative overflow-hidden flex flex-col p-4 sm:p-8 md:p-12 lg:p-16">
            {/* Ruled lines background */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #969696 39px, #969696 40px)', marginTop: '4rem' }}></div>
            {/* Left red margin line */}
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-[2px] bg-red-400/30 pointer-events-none"></div>
            {/* Left double red margin line */}
            <div className="hidden md:block absolute left-14 top-0 bottom-0 w-[2px] bg-red-400/30 pointer-events-none"></div>

            <div className="relative z-10 ml-0 md:ml-8 h-full flex flex-col">
              <HeroLeftPage />
            </div>
          </div>

          {/* Center Crease / Fold */}
          <div className="hidden xl:block w-[40px] bg-gradient-to-r from-black/5 via-black/10 to-black/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] border-l border-r border-black/5 z-20"></div>

          {/* Right Page (60%) */}
          <div className="w-full xl:w-[60%] relative bg-[#F8F6F0] rounded-b-md md:rounded-b-none md:rounded-r-[30px] p-4 sm:p-8 md:p-12 lg:p-16 flex">
            {/* Ruled lines background */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #969696 39px, #969696 40px)', marginTop: '4rem' }}></div>
            
            {/* Main Content Area of Right Page */}
            <div className="relative z-10 w-full xl:w-[75%] pr-0 xl:pr-8">
              <ApplicationForm onProgressChange={setFormProgress} progress={formProgress} />
            </div>

            {/* Right Sidebar Notes Area */}
            <div className="hidden xl:flex relative z-10 w-[25%] flex-col gap-8 pl-4 border-l border-dashed border-zinc-300/50">
              <div className="transform rotate-2 hover:rotate-0 transition-transform">
                <SmartProfile progress={formProgress} />
              </div>
              <div className="transform -rotate-2 hover:rotate-0 transition-transform">
                <WhyIntern />
              </div>
              <div className="transform rotate-1 hover:rotate-0 transition-transform">
                <HelpCard />
              </div>
              <div className="transform -rotate-1 hover:rotate-0 transition-transform mt-auto mb-10">
                <CareerCard />
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
