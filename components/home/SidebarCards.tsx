"use client";

import { motion } from "framer-motion";
import { ScribbleUnderline } from "@/components/ui/Doodles";
import { Button } from "@/components/ui/button";

import { Mail, MessageCircle } from "lucide-react";

export function HelpCard() {
  return (
    <motion.div 
      className="bg-white p-6 shadow-md w-56 relative z-10 border border-zinc-200 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      {/* Tape */}
      <div className="absolute -top-3 right-8 w-10 h-5 bg-[#222] -rotate-3 opacity-90 shadow-sm"></div>
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-heading font-bold text-lg text-brand-black leading-tight">Have Questions?</h3>
        <svg className="w-8 h-8 text-brand-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>

      <p className="text-sm font-sans text-brand-black mb-4">We're here to help!</p>

      <div className="flex flex-col gap-2">
        <a 
          href="mailto:info@quenoxa.in?subject=Internship Registration Inquiry" 
          aria-label="Send an email"
          className="w-full bg-brand-black text-white hover:bg-zinc-800 rounded-lg text-sm font-sans flex justify-between items-center px-4 py-2.5 group transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-brand-black outline-none"
        >
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-zinc-300" /> 
            <span>Email</span>
          </div>
          <span className="transform group-hover:translate-x-1 transition-transform opacity-70 group-hover:opacity-100">→</span>
        </a>
        
        <a 
          href="https://wa.me/916369480281?text=Hello%20Quenoxa%20Team%2C%20I%20have%20a%20question%20regarding%20the%20Internship%20Registration." 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-lg text-sm font-sans flex justify-between items-center px-4 py-2.5 group transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] outline-none"
        >
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-green-100" /> 
            <span>WhatsApp</span>
          </div>
          <span className="transform group-hover:translate-x-1 transition-transform opacity-70 group-hover:opacity-100">→</span>
        </a>
      </div>
    </motion.div>
  );
}

export function CareerCard() {
  return (
    <motion.div 
      className="bg-[#111] p-6 shadow-md w-56 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
    >
      {/* Tape */}
      <div className="absolute -top-3 left-8 w-10 h-5 bg-[#F8F6F0] rotate-3 opacity-90 border border-zinc-300"></div>
      
      <h3 className="font-caveat text-3xl text-white leading-tight mt-2">
        Great Careers<br/>
        <span className="text-[#6DFF33] relative inline-block">
          Start Here!
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full text-[#6DFF33]" />
        </span>
      </h3>
      
      <svg className="absolute bottom-4 right-4 w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    </motion.div>
  );
}
