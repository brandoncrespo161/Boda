"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Lluvia de Pétalos
const PetalRain = () => {
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 12 + Math.random() * 15,
      delay: Math.random() * 8,
      size: Math.random() * 8 + 12,
      color: i % 3 === 0 ? '#E8D3D8' : (i % 3 === 1 ? '#F2E8E4' : '#EAD5C8'),
      swing: (Math.random() - 0.5) * 40,
    }));
    setPetals(generated);
  }, []);
  return (
    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
      {petals.map(p => (
        <motion.div
          key={p.id}
          className="absolute shadow-sm"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, top: -30, backgroundColor: p.color, borderRadius: '0 50% 50% 50%' }}
          animate={{ y: ['0vh', '110vh'], x: [0, p.swing, -p.swing, p.swing], rotateZ: [0, 180, 360], rotateX: [0, 180, 360], opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// Espíritu Santo desplazado a la izquierda mediante x: -15
const HolySpiritDove = () => (
  <motion.div 
    className="absolute z-50 pointer-events-none flex items-center justify-center w-full"
    initial={{ y: -90, x: -85, opacity: 0 }}
    animate={{ y: 90, x: -8, opacity: 1 }} 
    transition={{ duration: 5, ease: "easeOut" }}
  >
    <img src="/EspirituSanto_2.png" alt="Espíritu Santo" className="w-24 h-24 md:w-32 md:h-32 object-contain"
      style={{ filter: "sepia(1) hue-rotate(15deg) saturate(1.8) brightness(1.2)", opacity: 0.95 }}
      onError={(e) => { e.target.style.display = 'none'; }}
    />
  </motion.div>
);

const FloralDivider = () => (
  <svg width="140" height="30" viewBox="0 0 140 30" fill="none" className="my-6 opacity-80 mx-auto relative z-30">
    <path d="M10 15h40" stroke="#C5A059" strokeWidth="0.5" />
    <path d="M130 15H90" stroke="#C5A059" strokeWidth="0.5" />
    <path d="M70 5C65 5 60 10 60 15C60 20 65 25 70 25C75 25 80 20 80 15C80 10 75 5 70 5Z" stroke="#C5A059" strokeWidth="1" fill="#C5A059" fillOpacity="0.15" />
  </svg>
);

export default function Invitation({ onNext }) {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.5, staggerChildren: 0.3 } } };
  const item = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } };
  const namesAnim = { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } } };

  return (
    <motion.div 
      variants={container} initial="hidden" animate="show"
      className="min-h-screen w-full flex flex-col items-center text-center p-5 md:p-10 overflow-x-hidden overflow-y-auto z-40 absolute inset-0 pb-20 bg-[#FAF8F5]"
    >
      <HolySpiritDove />
      <PetalRain />
      
      <motion.p variants={item} className="text-[#C5A059] uppercase tracking-[0.3em] text-xs md:text-sm mb-10 mt-12 font-bold relative z-30">
        18 de Julio, 2026
      </motion.p>
      
      <motion.div variants={item} className="w-full max-w-md mb-8 relative z-30 px-4">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#4A5D23] mb-6">Con la bendición de nuestros padres</p>
        <div className="flex justify-between text-sm font-serif text-stone-700 gap-4 mb-6 leading-relaxed">
          <div className="text-center w-1/2">
            <p className="mb-2 font-sans font-bold text-[#C5A059] text-[9px] uppercase tracking-widest">Padres del Novio</p>
            <p>Edson Mario Crespo Renfijo</p>
            <p>Nora Flores Torrez</p>
          </div>
          <div className="text-center w-1/2">
            <p className="mb-2 font-sans font-bold text-[#C5A059] text-[9px] uppercase tracking-widest">Padres de la Novia</p>
            <p>Mario Demetrio Jimenez Galindo</p>
            <p>Lucia Santa Cruz Gonzales</p>
          </div>
        </div>
        <div className="text-center w-full mt-8 border-t border-[#C5A059]/20 pt-6">
            <p className="mb-1 font-sans font-bold text-[#C5A059] text-[9px] uppercase tracking-widest">Con el amor especial de la abuelita del novio</p>
            <p className="text-sm font-serif text-stone-700">Beatriz Renfijo Torrico</p>
        </div>

         <motion.h1 variants={item} className="text-[#C5A059] uppercase tracking-[0.3em] text-xs md:text-sm mb-10 mt-12 font-bold relative z-30">
          NOS CASAMOS
        </motion.h1>
      
          <p className="font-serif italic text-xl md:text-2xl text-stone-600 leading-relaxed">
          La bendición que viene de la mano de Dios despertó un día el amor entre nosotros para unirnos y juntos recorrer un solo camino. Es por ello que nos presentamos delante de Él y ponemos en sus manos nuestro matrimonio.
        </p>
      </motion.div>

      <FloralDivider />
      
      <motion.h1 variants={namesAnim} className="text-5xl md:text-7xl font-serif text-stone-800 mb-2 px-4 relative z-30" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }}>
        Brandon Alejandro
      </motion.h1>
      <motion.p variants={item} className="text-3xl font-serif italic text-[#C5A059] my-2 relative z-30">&</motion.p>
      <motion.h1 variants={namesAnim} className="text-5xl md:text-7xl font-serif text-stone-800 mb-10 px-4 relative z-30" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }}>
        Mery Laura
      </motion.h1>

      <motion.div variants={item} className="max-w-[85%] md:max-w-md w-full my-8 relative z-30">
        <p className="font-serif italic text-xl md:text-2xl text-stone-600 leading-relaxed">
          "Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto."
        </p>
        <p className="text-[#C5A059] text-[10px] md:text-[11px] uppercase tracking-[0.2em] mt-5 font-bold">Eclesiastés 4:12 (RVR1960)</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col md:flex-row justify-center items-center gap-10 w-full max-w-[90%] md:max-w-3xl mt-10 relative z-30">
        
        {/* Templo Verbo Divino */}
        <div 
          onClick={() => window.open('https://maps.app.goo.gl/jyFjbeTiZ2nZiYwW6', '_blank')}
          className="w-full max-w-[180px] flex flex-col items-center bg-white shadow-[0_10px_30px_rgba(197,160,89,0.1)] p-3 rounded-t-[120px] rounded-b-xl border border-[#e8e4d9] relative group cursor-pointer"
        >
          <div className="w-full aspect-[4/5] rounded-t-[110px] overflow-hidden border-2 border-[#FAF8F5] relative bg-stone-100">
            <motion.img 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 1.5 }} 
              src="/VERBO.jfif" 
              alt="Templo" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          </div>
          <div className="pt-6 pb-4 text-center w-full">
            <h2 className="text-xl md:text-2xl font-serif text-stone-800">Templo Verbo Divino</h2>
            <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-widest mt-2">Ceremonia</p>
            <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-widest mt-2">14:00. HRS</p>
            {/* El botón de texto ahora es solo informativo, el clic principal está en el contenedor */}
            <span className="mt-4 block text-[9px] text-stone-500 uppercase tracking-widest border-b border-stone-300 pb-1">
              Tocar para abrir mapa
            </span>
          </div>
        </div>

        {/* Casa Campestre SIB */}
        <div 
          onClick={() => window.open('https://maps.app.goo.gl/9qdqmA3QeMvRHCNw7', '_blank')}
          className="w-full max-w-[180px] flex flex-col items-center bg-white shadow-[0_10px_30px_rgba(197,160,89,0.1)] p-3 rounded-t-[120px] rounded-b-xl border border-[#e8e4d9] relative group cursor-pointer"
        >
          <div className="w-full aspect-[4/5] rounded-t-[110px] overflow-hidden border-2 border-[#FAF8F5] relative bg-stone-100">
            <motion.img 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 1.5 }} 
              src="/salon.jpg" 
              alt="Recepción" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'; }}
            />
          </div>
          <div className="pt-6 pb-4 text-center w-full">
            <h2 className="text-xl md:text-2xl font-serif text-stone-800">Casa Campestre SIB</h2>
            <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-widest mt-2">Recepción</p>
            <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-widest mt-2">17:30. HRS</p>
            <span className="mt-4 block text-[9px] text-stone-500 uppercase tracking-widest border-b border-stone-300 pb-1">
              Tocar para abrir mapa
            </span>
          </div>
        </div>
      </motion.div>

      <FloralDivider />
      

      <motion.div variants={item} className="mt-20 mb-12 relative z-30">
        <button onClick={onNext} className="flex flex-col items-center gap-3 group outline-none">
          <span className="text-[#8b723d] text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-[#C5A059] transition-colors">
            Confirmar Asistencia
          </span>
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#C5A059] text-white shadow-[0_0_20px_rgba(197,160,89,0.4)] group-hover:scale-110 transition-transform duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </button>
      </motion.div>
    </motion.div>
    
  );

}