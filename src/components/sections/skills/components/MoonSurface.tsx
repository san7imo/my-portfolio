// src/components/sections/skills/components/MoonSurface.tsx
import React, { useEffect, useState } from 'react';

interface MoonSurfaceProps {
  isVisible: boolean;
  children?: React.ReactNode;
}

const MoonSurface: React.FC<MoonSurfaceProps> = ({ isVisible, children }) => {
  const [hasLanded, setHasLanded] = useState(false);
  const [showSurfaceDetails, setShowSurfaceDetails] = useState(false);

  useEffect(() => {
    if (isVisible && !hasLanded) {
      const timer = setTimeout(() => {
        setHasLanded(true);
        
        setTimeout(() => {
          setShowSurfaceDetails(true);
        }, 800);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasLanded]);

  if (!isVisible) return null;
  
  return (
    <div className="relative">
      <div className={`relative transition-all duration-2000 ${
        hasLanded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}>
        {/* Glow lunar principal */}
        <div className="absolute inset-0  blur-3xl scale-150 rounded-full animate-pulse"></div>
        
        {/* Glow secundario */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-200/10 via-blue-200/5 to-transparent blur-2xl scale-125 rounded-full"></div>
        
        {/* Luna principal con tamaño grande y responsivo */}
        <div className="relative">
          <img 
            src="/assets/img/skill-section/luna.png"
            alt="Superficie Lunar"
            className={`w-[100vh] h-[90vw] md:w-[100vh] md:h-[70vw] lg:w-[100vh] lg:h-[60vw] max-w-[100vh] max-h-[800px] object-contain filter drop-shadow-2xl transition-all duration-2000 ${
              hasLanded ? 'drop-shadow-2xl' : 'drop-shadow-lg'
            }`}
            loading='lazy'
          />
          
          {/* Atmósfera lunar */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-100/3 to-transparent rounded-full pointer-events-none"></div>
          
          {/* Textura de superficie lunar adicional */}
          {showSurfaceDetails && (
            <>
              {/* Cráteres adicionales sutiles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`crater-${i}`}
                    className="absolute rounded-full bg-gray-700/10 blur-sm animate-fade-in"
                    style={{
                      width: `${Math.random() * 20 + 10}px`,
                      height: `${Math.random() * 20 + 10}px`,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>

              {/* Detalles de superficie con sombras */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-1/4 left-1/3 w-8 h-2 bg-gray-800/20 rounded-full blur-sm transform rotate-12"></div>
                <div className="absolute top-1/3 right-1/4 w-6 h-1 bg-gray-800/15 rounded-full blur-sm transform -rotate-6"></div>
                <div className="absolute bottom-1/3 right-1/3 w-4 h-1 bg-gray-800/10 rounded-full blur-xs"></div>
              </div>
            </>
          )}
          
          {/* Container para las habilidades */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto ">
              {children}
            </div>
          </div>
        </div>
        
        {/* Efectos de partículas lunares */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(showSurfaceDetails ? 8 : 4)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Polvo lunar flotante */}
        {showSurfaceDetails && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={`dust-${i}`}
                className="absolute w-2 h-2 bg-gray-300/10 rounded-full blur-sm animate-float"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Ondas de impacto del aterrizaje */}
        {hasLanded && (
          <>
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" 
                 style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 rounded-full border border-blue-400/15 animate-ping" 
                 style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoonSurface;