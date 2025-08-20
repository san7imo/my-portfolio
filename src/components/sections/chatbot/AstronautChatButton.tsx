// src/components/chatbot/AstronautChatButton.tsx
import { useState, useEffect } from 'react';

interface AstronautChatButtonProps {
  onClick: () => void;
  hasNewMessage?: boolean;
}

export default function AstronautChatButton({ onClick, hasNewMessage = false }: AstronautChatButtonProps) {
  // Removed unused isVisible state
  const [pulse, setPulse] = useState(false);
  const [float, setFloat] = useState(false);

  // Efecto de pulso cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Efecto de flotación suave
  useEffect(() => {
    const interval = setInterval(() => {
      setFloat(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-6 left-6 z-30 transition-all duration-300 transform translate-y-0 opacity-100"
    >
      <button
        onClick={onClick}
        className={`relative group bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 hover:from-slate-700 hover:via-slate-600 hover:to-slate-800 rounded-full p-3 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 border-2 border-slate-600 hover:border-blue-400 ${
          pulse ? 'animate-pulse ring-4 ring-blue-300 ring-opacity-30' : ''
        } ${
          float ? 'animate-bounce' : ''
        }`}
        title="Chatear con San7imo - Tu asistente IA"
      >
        {/* Astronauta Avatar */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Si tienes la imagen del astronauta, reemplaza esto: */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            🚀
          </div>
          
          {/* Alternativa con imagen (descomenta cuando tengas la imagen): */}
          {/* <img 
            src="/assets/img/cohetemano.png" 
            alt="San7imo Astronauta" 
            className="w-10 h-10 object-contain filter drop-shadow-lg"
          /> */}
          
          {/* Casco brillante effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Indicador de mensaje nuevo */}
        {hasNewMessage && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}

        {/* Efecto de resplandor */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
        
        {/* Ondas de radar cuando está activo */}
        <div className={`absolute inset-0 rounded-full border-2 border-blue-400 ${pulse ? 'animate-ping' : ''} opacity-0 ${pulse ? 'opacity-60' : ''}`}></div>
        <div className={`absolute inset-0 rounded-full border-2 border-purple-400 ${pulse ? 'animate-ping' : ''} opacity-0 ${pulse ? 'opacity-40' : ''} delay-75`}></div>

        {/* Estrellas decorativas */}
        <div className="absolute -top-1 -left-1 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
        <div className="absolute top-1 -right-2 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
      </button>

      {/* Tooltip mejorado */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 group-hover:block hidden">
        <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-xl px-4 py-2 shadow-xl border border-gray-700 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Chatear con San7imo IA</span>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-gray-900/95"></div>
        </div>
      </div>

      {/* Partículas de fondo ocasionales */}
      <div className={`absolute inset-0 pointer-events-none ${pulse ? 'block' : 'hidden'}`}>
        <div className="absolute -top-2 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute -bottom-3 right-0 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse opacity-60 delay-150"></div>
        <div className="absolute top-0 -left-3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse opacity-50 delay-300"></div>
      </div>
    </div>
  );
}