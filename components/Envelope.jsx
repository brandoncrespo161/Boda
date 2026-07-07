"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Envelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (isBurning || isOpen) return;
    
    setIsBurning(true);
    
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(onOpen, 1500); 
    }, 1200); 
  };

  return (
    <motion.div 
      className="flex items-center justify-center absolute inset-0 z-50 w-full h-full overflow-hidden bg-[#FAF8F5]"
      initial={{ opacity: 1 }}
      animate={isOpen ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
    >
      <div 
        className="relative rounded-sm shadow-2xl cursor-pointer flex justify-center w-[85vw] max-w-[340px] aspect-[3/2] border border-[#d8d3c5]"
        style={{ perspective: '1200px', backgroundColor: '#e8e4d9' }}
        onClick={handleOpen}
      >
        <div className="absolute inset-0 rounded-sm shadow-inner overflow-hidden" style={{ backgroundColor: '#E3DEC3' }}>
            <div className="absolute inset-2 border border-[#C5A059] opacity-50"></div>
            <div className="absolute inset-3 border border-[#C5A059] opacity-30"></div>
        </div>
        
        <motion.div 
          className="absolute top-0 w-full z-20 origin-top flex justify-center items-end"
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ height: '55%' }}
        >
           <div className="absolute inset-0 shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backgroundColor: '#D1CBB3' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1" className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-60">
                <path d="M12 22C12 22 11 16 7 12C3 8 2 12 2 12C2 12 6 13 12 22Z" fill="#C5A059" fillOpacity="0.2"/>
                <path d="M12 22C12 22 13 16 17 12C21 8 22 12 22 12C22 12 18 13 12 22Z" fill="#C5A059" fillOpacity="0.2"/>
                <path d="M12 22V10" strokeLinecap="round"/>
              </svg>
           </div>

           {/* Sello y tu PNG de llamas en la posición exacta */}
           <div className="absolute bottom-0 translate-y-[50%] flex justify-center items-center z-50">
             
             {/* Tu PNG de llamas animado */}
             <AnimatePresence>
               {isBurning && (
                 <motion.img 
                   src="/llamas.png"
                   alt="Fuego"
                   className="absolute z-50 w-32 h-32 object-contain pointer-events-none"
                   initial={{ opacity: 0, scale: 0.5, y: 0 }}
                   animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2], y: -50 }}
                   transition={{ duration: 1.2, ease: "easeOut" }}
                 />
               )}
             </AnimatePresence>

             {/* Tu Sello con efecto de quemado */}
             <motion.div 
              className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center relative z-10"
              style={{ filter: 'drop-shadow(0px 8px 10px rgba(0,0,0,0.5))' }}
              animate={isBurning ? { 
                scale: [1, 1.05, 0.5, 0], 
                opacity: [1, 1, 0], 
                filter: ["brightness(1)", "brightness(2) contrast(1.5)", "brightness(0)"] 
              } : { scale: 1 }}
              transition={{ duration: 1.2 }}
             >
                <img 
                  src="/sello2.png" 
                  alt="Sello Lacre" 
                  className="w-full h-full object-contain"
                  style={{ filter: 'contrast(1.1) brightness(1.05) drop-shadow(0px 2px 2px rgba(255,255,255,0.2))' }}
                />
             </motion.div>
           </div>
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 md:pb-6 z-10 pointer-events-none">
          <span className="font-serif text-lg md:text-2xl italic mb-1" style={{ color: '#4A5D23' }}>Nuestra Boda</span>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: '#8b723d' }}>Tocar el sello para abrir</span>
        </div>
      </div>
    </motion.div>
  );
}