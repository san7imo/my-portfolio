import React, { useState, useEffect } from 'react';
import InteractiveCosmicCanvas from './HeroCanvas';

const AnimatedTitle: React.FC = () => {
  return (
    <div className="relative mb-6 min-h-[80px] md:min-h-[120px] flex justify-center items-center">
      <h1 
        className="text-3xl md:text-5xl lg:text-7xl font-light"
        style={{
          fontFamily: '"Exo 2", sans-serif',
          fontWeight: '300',
          letterSpacing: '0.05em',
          background: 'linear-gradient(45deg, #f97316, #fbbf24, #ffffff, #fbbf24, #f97316)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(249, 115, 22, 0.4)',
          filter: 'brightness(1.2)',
          animation: 'goldenShimmer 3s ease-in-out infinite'
        }}
      >
        UNIVERSO S7
      </h1>
    </div>
  );
};

const Hero: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      {/* Canvas de fondo */}
      <InteractiveCosmicCanvas />
      
      {/* Contenido superior - Limitado al 35% superior de la pantalla */}
      <div className="absolute top-0 left-0 right-0 z-10 h-[35vh] flex flex-col justify-center items-center px-6 md:px-10">
        
        {/* Título animado con efecto futurista */}
        <div className="text-center space-y-8">
          <AnimatedTitle />
          
          {/* Subtítulo con efecto de aparición gradual galáctico */}
          <div className="space-y-4">
            <p 
              className="text-base md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed opacity-0"
              style={{
                animation: 'fadeInUp 1s ease-out 2s forwards',
                background: 'linear-gradient(45deg, #f97316, #fbbf24, #ffffff)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: '"Exo 2", sans-serif',
                fontWeight: '300',
                letterSpacing: '0.02em',
                textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(249, 115, 22, 0.2)',
                filter: 'brightness(1.1)'
              }}
            >
              Bienvenido a mi universo digital. Explora mi trabajo, tecnologías y proyectos 
              en este viaje cósmico desde el Big Bang hasta la Tierra.
            </p>
          </div>
        </div>
      </div>

      {/* Instrucciones de interacción - Aparecen después de las animaciones */}
      {showInstructions && (
        <div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 text-center opacity-0"
          style={{ animation: 'galaxyPulse 2s ease-in-out infinite, fadeIn 1s ease-out forwards' }}
        >
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm md:text-base font-semibold tracking-wider uppercase"
               style={{ 
                 background: 'linear-gradient(45deg, #f97316, #fbbf24, #ffffff)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 textShadow: '0 0 15px rgba(251, 191, 36, 0.6)',
                 fontFamily: '"Exo 2", sans-serif',
                 letterSpacing: '0.05em'
               }}>
              Haz clic en el núcleo de energía
            </p>
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                  animation: 'cosmicPing 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4)'
                }}
              />
              <span className="text-sm font-medium"
                    style={{ 
                      background: 'linear-gradient(45deg, #f97316, #ffffff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 10px rgba(249, 115, 22, 0.4)',
                      fontFamily: '"Exo 2", sans-serif',
                      letterSpacing: '0.02em'
                    }}>
                para crear el universo
              </span>
            </div>
            
            {/* Flecha direccional animada con estilo galáctico */}
            <div className="mt-6">
              <svg 
                className="w-8 h-8 animate-bounce" 
                fill="none" 
                stroke="url(#arrowGradient)" 
                viewBox="0 0 24 24"
                style={{ 
                  filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.7))',
                  strokeWidth: '2.5px'
                }}
              >
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 4v16m0 0l-4-4m4 4l4-4"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS personalizados */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes galaxyPulse {
          0%, 100% {
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
            transform: scale(1.01);
          }
        }
        
        @keyframes cosmicPing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes goldenShimmer {
          0%, 100% {
            background-position: 0% 50%;
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(249, 115, 22, 0.4);
          }
          50% {
            background-position: 100% 50%;
            text-shadow: 0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(249, 115, 22, 0.6);
          }
        }
        
        /* Efecto de brillo en el texto */
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        /* Fuente principal */
        h1, h2, p, span {
          font-family: 'Exo 2', sans-serif;
        }
        
        /* Suavizado de fuentes */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 1.2rem !important;
          }
          
          p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;