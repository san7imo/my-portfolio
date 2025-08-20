// src/components/chatbot/FloatingChatButton.tsx
import { useState, useEffect } from 'react';

interface FloatingChatButtonProps {
  onClick: () => void;
  hasNewMessage?: boolean;
}

export default function FloatingChatButton({ onClick, hasNewMessage = false }: FloatingChatButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Efecto de vibración y mensaje cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      setVibrate(true);
      setShowMessage(true);
      
      // Parar la vibración después de 1 segundo
      const stopVibration = setTimeout(() => {
        setVibrate(false);
      }, 1000);
      
      // Ocultar el mensaje después de 4 segundos
      const hideMessage = setTimeout(() => {
        setShowMessage(false);
      }, 4000);

      return () => {
        clearTimeout(stopVibration);
        clearTimeout(hideMessage);
      };
    }, 12000); // Cada 12 segundos

    return () => clearInterval(interval);
  }, []);

  // Efecto de pulso cada cierto tiempo para llamar la atención
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      const stopPulse = setTimeout(() => setPulse(false), 1000);
      return () => clearTimeout(stopPulse);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Opcional: Ocultar el botón cuando se hace scroll hacia arriba muy rápido
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }
      
      setIsVisible(true); // Siempre visible en esta implementación
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    const onScroll = () => requestTick();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-6 z-30 transition-all duration-300 ${
        isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-16 opacity-0'
      }`}
    >
      {/* Mensaje "Chatea conmigo" */}
      <div className={`absolute bottom-full left-0 mb-3 transition-all duration-500 ${
        showMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'
      }`}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl shadow-lg border border-blue-400/30 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            <span className="font-mono text-sm font-medium">¡Chatea conmigo!</span>
          </div>
          {/* Flecha del mensaje */}
          <div className="absolute top-full left-6 transform -translate-x-1/2">
            <div className="border-8 border-transparent border-t-blue-600"></div>
          </div>
        </div>
      </div>

      <button
        onClick={onClick}
        className={`relative group transition-all duration-300 transform hover:scale-110 ${
          pulse ? 'animate-pulse' : ''
        } ${
          vibrate ? 'vibrate-animation' : ''
        }`}
        title="Chatear con San7imo"
        style={{
          animation: vibrate ? 'vibrate 0.1s linear infinite' : undefined,
        }}
      >
        {/* Imagen del cohete - ahora más grande */}
        <div className="relative flex items-center justify-center">
          <img 
            src="/assets/img/astronauta1.png" 
            alt="San7imo Assistant" 
            className={`w-20 h-20 object-contain filter drop-shadow-2xl transition-transform duration-200 ${
              vibrate ? 'scale-110' : 'scale-100'
            }`}
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}
          />
        </div>

        {/* Indicador de mensaje nuevo */}
        {hasNewMessage && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full animate-bounce flex items-center justify-center shadow-lg">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
        )}

        {/* Ondas de radar cuando está activo - ajustadas para la imagen */}
        <div className={`absolute inset-0 rounded-full border-2 border-blue-400 ${pulse || vibrate ? 'animate-ping' : ''} opacity-0 ${pulse || vibrate ? 'opacity-60' : ''}`}></div>
        <div className={`absolute inset-0 rounded-full border-2 border-purple-400 ${pulse || vibrate ? 'animate-ping' : ''} opacity-0 ${pulse || vibrate ? 'opacity-40' : ''} delay-75`}></div>
      </button>

      {/* Tooltip mejorado - solo visible en hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-xl px-4 py-2 shadow-xl border border-gray-700 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Asistente IA San7imo</span>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-gray-900/95"></div>
        </div>
      </div>

      {/* Partículas espaciales cuando vibra */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${vibrate ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute -top-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute -top-1 right-1 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping delay-100"></div>
        <div className="absolute top-2 -right-2 w-1 h-1 bg-purple-300 rounded-full animate-ping delay-200"></div>
        <div className="absolute -bottom-2 right-2 w-0.5 h-0.5 bg-green-300 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-1 -left-2 w-1 h-1 bg-pink-300 rounded-full animate-ping delay-150"></div>
      </div>

      {/* Estilos CSS inline para la animación de vibración */}
      <style>{`
        .vibrate-animation {
          animation: vibrate 0.1s linear infinite;
        }
        
        @keyframes vibrate {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-1px) translateY(-1px); }
          20% { transform: translateX(1px) translateY(1px); }
          30% { transform: translateX(-1px) translateY(1px); }
          40% { transform: translateX(1px) translateY(-1px); }
          50% { transform: translateX(-1px) translateY(-1px); }
          60% { transform: translateX(1px) translateY(1px); }
          70% { transform: translateX(-1px) translateY(1px); }
          80% { transform: translateX(1px) translateY(-1px); }
          90% { transform: translateX(-1px) translateY(-1px); }
        }
      `}</style>
    </div>
  );
}