"use client";
import { useState, useRef, useEffect } from 'react';

import Envelope from '../components/Envelope'; 
import Invitation from '../components/Invitation';
import RsvpForm from '../components/RsvpForm';

// Esta línea es la que Next.js estaba buscando desesperadamente:
export default function Page() {
  const [stage, setStage] = useState('envelope');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const musicTimer = useRef(null);

  // Al abrir el sobre, pasamos a la invitación e iniciamos la música
  const handleOpenEnvelope = () => {
    setStage('invitation');
    if (audioRef.current) {
      // Volumen bajado drásticamente al 8%
      audioRef.current.volume = 0.10; 
      audioRef.current.play();
      setIsPlaying(true);

      // Detener la música automáticamente a los 3 minutos (180,000 ms)
      musicTimer.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }, 180000);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      clearTimeout(musicTimer.current);
    } else {
      audioRef.current.play();
      // Si la vuelve a encender, que suene por otros 3 minutos máximo
      musicTimer.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }, 180000);
    }
    setIsPlaying(!isPlaying);
  };

  // Limpieza del temporizador si el componente se desmonta
  useEffect(() => {
    return () => clearTimeout(musicTimer.current);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF8F5] overflow-hidden text-stone-800 font-sans relative selection:bg-[#C5A059] selection:text-white">
      
      {/* Reproductor de Audio Oculto */}
      <audio ref={audioRef} src="/Mi_Corazon.mp3" loop preload="auto" />

      {/* Botón flotante de música (Solo se muestra después de abrir el sobre) */}
      {stage !== 'envelope' && (
        <button 
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-lg hover:bg-[#C5A059] hover:text-white transition-colors outline-none"
        >
          {isPlaying ? (
            // Icono de Pausa
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
          ) : (
            // Icono de Play
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      )}

      {/* Renderizado de los 3 componentes dependiendo del estado */}
      {stage === 'envelope' && <Envelope onOpen={handleOpenEnvelope} />}
      
      {stage === 'invitation' && (
        <Invitation onNext={() => setStage('rsvp')} />
      )}
      
      {stage === 'rsvp' && (
        <RsvpForm onBack={() => setStage('invitation')} />
      )}
    </main>
  );
}