"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function RsvpForm({ onBack }) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Nuevo estado para controlar si se envió con éxito
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !attending) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, attending })
      });

      if (response.ok) {
        // En lugar de alert(), cambiamos la pantalla a éxito
        setIsSuccess(true);
      } else {
        alert("Hubo un error al guardar. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si fue un éxito, mostramos esta tarjeta elegante en lugar del formulario
  // Si fue un éxito, mostramos esta tarjeta elegante
  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
        className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#FAF8F5] relative overflow-hidden"
      >
        <div className="w-full max-w-sm bg-white p-2 shadow-2xl relative">
          <div className="border-[1px] border-[#C5A059]/40 p-8 flex flex-col items-center text-center">
            
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1" className="mb-4">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-3xl font-serif text-stone-800 mb-2">¡Gracias!</h2>
            <p className="font-serif italic text-[15px] text-stone-600 leading-relaxed mb-6">
              Hemos recibido tu respuesta.
            </p>

            {/* BOLETO DIGITAL - Solo se muestra si dijeron que SÍ */}
            {attending === 'yes' && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                className="w-full bg-[#FAF8F5] border-2 border-dashed border-[#C5A059] p-6 relative mb-8"
              >
                {/* Adornos del boleto */}
                <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-3 text-[#C5A059] text-[9px] uppercase font-bold tracking-[0.3em]">
                  Pase Especial
                </div>
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full border-r-2 border-dashed border-[#C5A059]"></div>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full border-l-2 border-dashed border-[#C5A059]"></div>

                <p className="text-[9px] uppercase tracking-widest text-stone-500 mb-2 mt-2">Recepción Boda</p>
                <h3 className="font-serif text-2xl text-stone-800 mb-4">{name}</h3>
                
                <p className="text-[10px] text-[#4A5D23] uppercase tracking-widest font-bold border-t border-[#C5A059]/30 pt-4">
                  Por favor, toma captura de pantalla de este pase.
                </p>
              </motion.div>
            )}

            <button 
              onClick={onBack}
              className="px-8 py-3 border-[1px] border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#C5A059] hover:text-white transition-colors"
            >
              Volver a la invitación
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Si no se ha enviado aún, mostramos el formulario normal
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#FAF8F5] relative overflow-x-hidden overflow-y-auto"
    >
      <div className="w-full max-w-sm bg-white p-2 shadow-2xl relative mt-10">
        <div className="border-[1px] border-[#C5A059]/40 p-8 flex flex-col items-center text-center">
          
          <motion.svg 
            initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1" className="mb-4"
          >
            <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" />
            <path d="M22 6L12 13L2 6" />
          </motion.svg>

          <h2 className="text-2xl font-serif text-stone-800 mb-2 tracking-wide">R S V P</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-8">Responde por favor</p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            
            <div className="flex flex-col items-center w-full">
              <label className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest mb-1">Nombre de la Familia o Invitado</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 text-center text-[18px] font-serif italic text-stone-700 bg-transparent border-b border-stone-300 outline-none focus:border-[#C5A059] transition-colors rounded-none" 
                placeholder="Escribe aquí..." 
                required
              />
            </div>

            <div className="flex flex-col items-start w-full gap-4 pt-4">
              <label onClick={() => setAttending('yes')} className="flex items-center gap-4 cursor-pointer group w-full">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#C5A059] flex items-center justify-center p-[3px] transition-all">
                  {attending === 'yes' && <motion.div layoutId="dot" className="w-full h-full bg-[#C5A059] rounded-full" />}
                </div>
                <span className={`font-serif text-lg transition-colors ${attending === 'yes' ? 'text-stone-800' : 'text-stone-500 group-hover:text-stone-700'}`}>
                  Acepto con gusto
                </span>
              </label>

              <label onClick={() => setAttending('no')} className="flex items-center gap-4 cursor-pointer group w-full">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#C5A059] flex items-center justify-center p-[3px] transition-all">
                  {attending === 'no' && <motion.div layoutId="dot" className="w-full h-full bg-[#C5A059] rounded-full" />}
                </div>
                <span className={`font-serif text-lg transition-colors ${attending === 'no' ? 'text-stone-800' : 'text-stone-500 group-hover:text-stone-700'}`}>
                  No podré asistir
                </span>
              </label>
            </div>
            
            <div className="text-center w-full mt-6 border-t border-[#C5A059]/20 pt-6">
               <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-3">Vestimenta Formal</p>
               <div className="w-6 h-[1px] bg-[#C5A059]/40 mx-auto mb-4"></div> 
               <p className="font-serif italic text-[13.5px] md:text-[15px] text-stone-500 leading-relaxed px-4">
                 Para permitir que todos disfruten y se relajen, hemos decidido que nuestra recepción sea una celebración exclusiva para adultos. Agradecemos su comprensión.
               </p>
            </div>
            
            <button 
              type="submit" 
              disabled={!name || !attending || isSubmitting}
              className={`mt-4 w-full py-4 border-[1px] font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300
                ${(!name || !attending || isSubmitting) ? 'border-stone-200 text-stone-300 cursor-not-allowed' : 'border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white shadow-md'}`}
            >
              {isSubmitting ? "Enviando..." : "Enviar Confirmación"}
            </button>
          </form>
        </div>
      </div>

      <button 
        onClick={onBack} 
        className="mt-10 mb-12 text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.2em] border-b border-[#C5A059] pb-1 hover:text-[#8b723d] hover:border-[#8b723d] transition-all relative z-10 outline-none"
      >
        Volver a la invitación
      </button>
    </motion.div>
  );
}