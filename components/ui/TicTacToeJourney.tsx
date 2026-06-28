"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- AI Logic (Minimax) ---
const calculateWinner = (squares: Array<'X' | 'O' | null>) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

const minimax = (board: Array<'X' | 'O' | null>, depth: number, isMaximizing: boolean): number => {
  const result = calculateWinner(board);
  if (result !== null) {
    if (result.winner === 'X') return -10 + depth;
    if (result.winner === 'O') return 10 - depth;
  }
  if (!board.includes(null)) return 0; // Draw

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const getBestMove = (board: Array<'X' | 'O' | null>): number => {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const TicTacToeJourney = () => {
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [isThinking, setIsThinking] = useState(false);
  const [bounce, setBounce] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;
  const winningLine = winInfo?.line || [];
  const isDraw = !winner && board.every(cell => cell !== null);
  const gameOver = winner || isDraw;

  // Trigger bounce effect on player win
  useEffect(() => {
    if (winner === 'X') {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  // Cleanup pending AI moves if unmounted
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = (i: number) => {
    if (board[i] || gameOver || isThinking) return;
    
    // Player Move (Always X)
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    
    // If game didn't end, let AI move
    if (!calculateWinner(newBoard) && newBoard.includes(null)) {
      setIsThinking(true);
      // Random delay between 300ms to 600ms for realistic thinking time
      const delay = Math.floor(Math.random() * 300) + 300;
      timeoutRef.current = setTimeout(() => {
        const aiMove = getBestMove(newBoard);
        if (aiMove !== -1) {
          const afterAiBoard = [...newBoard];
          afterAiBoard[aiMove] = 'O';
          setBoard(afterAiBoard);
        }
        setIsThinking(false);
      }, delay);
    }
  };

  const resetGame = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setBoard(Array(9).fill(null));
    setIsThinking(false);
    setBounce(false);
  };

  const getEndMessage = () => {
    if (winner === 'X') return "You outsmarted the AI.";
    if (winner === 'O') return "Clever move.";
    return "Nice match.";
  };

  return (
    <div className="relative w-full max-w-[340px] mx-auto md:max-w-md md:mx-0 py-12 flex justify-center items-center font-caveat text-brand-black">
      {/* Floating animation container */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative"
      >
        {/* Sticky Note for Winner / Draw */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -15, y: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="absolute -top-12 -right-16 md:-right-24 bg-[#FFFFA5] p-3 border border-zinc-200 z-50 w-44 text-center"
              style={{ 
                borderRadius: '2px 4px 3px 5px / 5px 3px 4px 2px',
                boxShadow: '2px 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#222] rotate-2 opacity-80 shadow-sm border border-black/10"></div>
              <span className="font-bold text-2xl text-brand-black leading-tight block mt-1">
                {getEndMessage()}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Paper Board */}
        <motion.div
          animate={bounce ? { y: [0, -15, 0] } : {}}
          transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
          whileHover={{ 
            y: -4, 
            rotate: 1, 
          }}
          className="relative bg-[#F8F5EC] p-6 pb-8 md:p-8 md:pb-10 group"
          style={{
            borderRadius: '2% 3% 2% 4% / 3% 2% 4% 2%',
            boxShadow: '0 18px 45px rgba(0,0,0,0.15)',
            transform: 'rotate(-2deg)',
            width: '280px',
            height: '280px'
          }}
        >
          {/* Subtle paper grain overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          {/* Black masking tape */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#222] -rotate-3 opacity-90 border border-black/20" style={{ boxShadow: '2px 3px 5px rgba(0,0,0,0.2)' }}></div>

          {/* Hand Drawn Grid SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none p-6 md:p-8 opacity-80" viewBox="0 0 300 300" preserveAspectRatio="none">
            {/* Vertical lines */}
            <path d="M 100, 15 Q 102, 150 98, 285" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 200, 20 Q 198, 150 202, 280" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Horizontal lines */}
            <path d="M 15, 100 Q 150, 98 285, 102" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 20, 200 Q 150, 202 280, 198" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>

          {/* Grid Container */}
          <div className="w-full h-full grid grid-cols-3 grid-rows-3 relative z-10">
            {board.map((cell, idx) => {
              const isWinningCell = winningLine.includes(idx);
              const interactable = !cell && !gameOver && !isThinking;
              return (
                <motion.div 
                  key={idx}
                  onClick={() => handleClick(idx)}
                  whileHover={interactable ? { scale: 1.05, backgroundColor: 'rgba(0,0,0,0.03)' } : {}}
                  whileTap={interactable ? { scale: 0.95 } : {}}
                  className={`relative flex items-center justify-center p-3 sm:p-4 z-20 rounded-md ${interactable ? 'cursor-pointer' : ''}`}
                  aria-label={cell ? `Cell occupied by ${cell}` : "Empty cell"}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClick(idx);
                    }
                  }}
                >
                  {/* Hand drawn winning highlight */}
                  <AnimatePresence>
                    {isWinningCell && (
                      <motion.svg
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        className="absolute inset-0 w-full h-full text-[#6CFF00] -z-10"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <motion.path 
                          d="M 10 50 Q 50 10 90 50 Q 50 90 10 50 Z" 
                          fill="currentColor" 
                          opacity="0.3" 
                          filter="blur(4px)"
                        />
                        <motion.path 
                          d="M 15 45 Q 50 40 85 55 Q 80 80 20 70 Z" 
                          fill="currentColor" 
                          opacity="0.5" 
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>

                  {/* Confetti & Sparkles for Win (Only if Player Won) */}
                  <AnimatePresence>
                    {isWinningCell && winner === 'X' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -inset-4 pointer-events-none z-0"
                      >
                        <div className="absolute top-0 left-0 w-2 h-2 bg-[#6CFF00] rounded-full animate-ping" />
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-brand-black rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cell Symbol */}
                  <AnimatePresence>
                    {cell && (
                      <div className="w-full h-full relative z-10 flex items-center justify-center drop-shadow-sm">
                        {cell === 'X' ? <Cross /> : <Circle />}
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* AI Thinking Indicator */}
          <AnimatePresence>
            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-8 left-4 flex items-center gap-2 text-zinc-500 font-caveat text-xl"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span>Thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Hand Drawn Reset Button */}
          <motion.button
            onClick={resetGame}
            whileHover={{ rotate: 180, backgroundColor: '#6CFF00' }}
            whileTap={{ scale: 0.8 }}
            className="absolute -bottom-4 -right-4 w-12 h-12 flex items-center justify-center text-brand-black transition-colors duration-300 z-30 bg-[#F8F5EC] rounded-full border-2 border-brand-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            style={{ borderRadius: '45% 55% 45% 55% / 55% 45% 55% 45%' }}
            aria-label="Restart game"
            title="Restart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* Notebook Doodles Background Layer */}
        
        {/* Star */}
        <motion.div
          animate={{ rotate: [0, 5, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-8 w-8 h-8 text-brand-black -rotate-12 pointer-events-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </motion.div>

        {/* Crown */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 right-6 text-brand-black pointer-events-none"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20M4 16l3-9 5 4 5-4 3 9z" />
          </svg>
        </motion.div>

        {/* Curved Arrow */}
        <motion.div
          animate={{ x: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -right-16 text-[#6CFF00] scale-90 pointer-events-none"
        >
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M20 50 Q 50 10 80 50 T 80 90" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
             <path d="M70 40 L 80 50 L 70 60" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Check mark */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-2 text-brand-black pointer-events-none"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>

        {/* Paperclip */}
        <motion.div
          animate={{ rotate: [-20, -15, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 -left-14 text-[#BDBDBD] pointer-events-none"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </motion.div>
        
        {/* Plus sign */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-12 text-[#6CFF00] pointer-events-none"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
          </svg>
        </motion.div>
        
        {/* Smudge */}
        <div className="absolute top-2/3 -right-6 w-12 h-6 bg-brand-black/5 rounded-full blur-md pointer-events-none transform -rotate-12"></div>
        <div className="absolute bottom-1/4 -left-4 w-6 h-6 bg-[#6CFF00]/10 rounded-full blur-sm pointer-events-none"></div>

      </motion.div>
    </div>
  );
};

// Hand-drawn brush X
const Cross = () => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className="w-4/5 h-4/5 text-brand-black transform rotate-2" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="8" 
    strokeLinecap="round"
  >
    <motion.path 
      d="M15 15 Q 45 50 85 85" 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
    <motion.path 
      d="M85 15 Q 55 50 15 85" 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.18, ease: "easeOut", delay: 0.1 }}
    />
    {/* Slight ink bleed */}
    <motion.path 
      d="M48 48 L 52 52" 
      strokeWidth="2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 0.3 }}
    />
  </motion.svg>
);

// Hand-drawn brush O
const Circle = () => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className="w-4/5 h-4/5 text-[#6CFF00]" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="8" 
    strokeLinecap="round"
    style={{ filter: 'drop-shadow(0px 0px 4px rgba(108,255,0,0.4))' }}
  >
    <motion.path 
      d="M50 12 C 85 12, 90 85, 50 88 C 10 88, 12 25, 45 15" 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    />
  </motion.svg>
);

export default TicTacToeJourney;
