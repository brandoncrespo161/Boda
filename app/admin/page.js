"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const data = await response.json();
        setRsvps(data.rsvps);
        setIsAuthenticated(true);
      } else {
        setError('Contraseña incorrecta');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const descargarExcel = () => {
    // Agregamos BOM (\uFEFF) para que Excel lea los acentos perfectamente
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Nombre del Invitado,Respuesta,Fecha\n";

    rsvps.forEach((rsvp) => {
      const respuesta = rsvp.attending === 'yes' ? 'Sí Asistirá' : 'No Asistirá';
      const fecha = new Date(rsvp.created_at).toLocaleDateString('es-ES');
      // Limpiamos las comas del nombre para que no rompan las columnas del Excel
      const nombreLimpio = rsvp.name.replace(/,/g, ''); 
      csvContent += `${nombreLimpio},${respuesta},${fecha}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Invitados_Boda.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. PANTALLA DE LOGIN ELEGANTE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="w-full max-w-sm bg-white p-2 shadow-2xl relative"
        >
          <div className="border-[1px] border-[#C5A059]/40 p-10 flex flex-col items-center text-center">
            
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1" className="mb-6">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>

            <h1 className="text-2xl font-serif text-stone-800 mb-2 tracking-wide">Acceso Privado</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-8">Panel de los Novios</p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-center text-[18px] font-serif text-stone-700 bg-transparent border-b border-stone-300 outline-none focus:border-[#C5A059] transition-colors rounded-none tracking-widest" 
                placeholder="Contraseña" 
                required
              />
              
              {error && <p className="text-red-500 text-[9px] tracking-widest uppercase mt-[-10px]">{error}</p>}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-4 w-full py-4 border-[1px] border-[#C5A059] text-[#C5A059] font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-[#C5A059] hover:text-white"
              >
                {isLoading ? "Verificando..." : "Entrar al Panel"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. PANEL DE CONTROL ELEGANTE (Solo visible si la clave es correcta)
  const totalYes = rsvps.filter(r => r.attending === 'yes').length;
  const totalNo = rsvps.filter(r => r.attending === 'no').length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-4 md:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white rounded-sm shadow-xl p-6 md:p-10 border border-[#d8d3c5]"
      >
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-[#C5A059]/20 pb-6 mb-2 gap-4">
          <h1 className="text-3xl font-serif text-stone-800 tracking-wide">
            Lista de Invitados
          </h1>
          <button 
            onClick={descargarExcel}
            className="bg-[#C5A059] text-white text-[10px] uppercase tracking-widest font-bold px-6 py-3 hover:bg-[#a88241] transition-colors shadow-md"
          >
            Descargar Excel
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 my-8">
          <div className="bg-[#FAF8F5] border border-[#C5A059]/30 px-6 py-6 flex-1 text-center shadow-sm">
            <span className="block text-xs uppercase font-bold tracking-[0.2em] text-[#C5A059]">Asistirán</span>
            <span className="block text-5xl font-serif mt-3 text-stone-800">{totalYes}</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 px-6 py-6 flex-1 text-center shadow-sm">
            <span className="block text-xs uppercase font-bold tracking-[0.2em] text-stone-500">No Asistirán</span>
            <span className="block text-5xl font-serif mt-3 text-stone-700">{totalNo}</span>
          </div>
        </div>

        <div className="overflow-x-auto mt-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-y border-[#C5A059]/20">
                <th className="p-4 text-[#C5A059] font-bold uppercase text-[10px] tracking-[0.2em]">Nombre del Invitado</th>
                <th className="p-4 text-[#C5A059] font-bold uppercase text-[10px] tracking-[0.2em]">Respuesta</th>
                <th className="p-4 text-[#C5A059] font-bold uppercase text-[10px] tracking-[0.2em]">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-stone-500 italic font-serif text-lg">
                    Aún no hay confirmaciones registradas.
                  </td>
                </tr>
              ) : (
                rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="p-4 font-serif text-xl text-stone-800">{rsvp.name}</td>
                    <td className="p-4">
                      {rsvp.attending === 'yes' ? (
                        <span className="text-[#4A5D23] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#4A5D23]"></div> SÍ ASISTIRÁ
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-stone-400"></div> NO ASISTIRÁ
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[11px] text-stone-500 uppercase tracking-wider">
                      {new Date(rsvp.created_at).toLocaleDateString('es-ES', { 
                        month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' 
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}