// src/components/sections/skills/components/SpaceStation.tsx
import React, { useEffect, useState, useRef } from 'react';

interface SpaceStationProps {
  isVisible: boolean;
}

const SpaceStation: React.FC<SpaceStationProps> = ({ isVisible }) => {
  const [position, setPosition] = useState({ x: -20, y: 94 }); // más abajo
  const [opacity, setOpacity] = useState(0);
  const animationRef = useRef<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  
  useEffect(() => {
    if (!isVisible) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setOpacity(0);
      setPosition({ x: -20, y: 97 });
      return;
    }

    let startTime: number | null = null;
    const visibleOrbitDuration = 35000; // 35 segundos para cruzar
    const hiddenDuration = 5000; // 5 segundos oculta
    const totalCycleDuration = visibleOrbitDuration + hiddenDuration;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      
      const elapsed = (timestamp - startTime) % totalCycleDuration;
      
      if (elapsed < visibleOrbitDuration) {
        const progress = elapsed / visibleOrbitDuration;
        
        // Movimiento horizontal: de -20% a 120%
        const x = -20 + progress * 140;
        
        // Órbita baja y sutil
        const baseY = 97; 
        const curveDepth = 10; // muy poca curva
        const curveProgress = Math.sin(progress * Math.PI);
        const y = baseY - curveProgress * curveDepth;
        
        // Opacidad
        let newOpacity = 1;
        if (x < 0) {
          newOpacity = Math.max(0, (x + 20) / 20);
        } else if (x > 100) {
          newOpacity = Math.max(0, (120 - x) / 20);
        }
        
        setPosition({ x, y });
        setOpacity(newOpacity);
        
      } else {
        setOpacity(0);
        setPosition({ x: -20, y: 94 });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);
  
  if (!isVisible || opacity === 0) return null;
  
  return (
    <div 
      className="absolute z-20 transition-opacity duration-500"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)', // constante para evitar cambios de tamaño
        opacity
      }}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <div className="relative">
        {/* Glow orbital */}
        <div className="absolute inset-0 bg-blue-400/20 blur-lg scale-150 rounded-full animate-pulse"></div>
        
        {/* Estación espacial */}
        <div className="relative">
          <img 
            src="/assets/img/skill-section/estacion.png"
            alt="Estación Espacial Internacional"
            className="w-20 h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 object-contain filter drop-shadow-xl"
            style={{
              imageRendering: 'pixelated' as const,
            }}
            loading='lazy'
          />
          
          {/* Luces */}
          <div 
            className="absolute top-1/2 left-1/4 w-1 h-1 bg-red-500 rounded-full animate-ping"
            style={{ animationDuration: '2s' }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-500 rounded-full animate-ping" 
            style={{ animationDelay: '0.7s', animationDuration: '2.5s' }}
          />
          <div 
            className="absolute bottom-1/3 left-1/2 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping" 
            style={{ animationDelay: '1.3s', animationDuration: '3s' }}
          />
        </div>
        
        {/* Panel de info */}
        <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none z-30 ${
          showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="bg-slate-900/95 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 border border-cyan-500/40 whitespace-nowrap shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <p className="font-bold text-cyan-300">ISS - Estación Espacial Internacional</p>
            </div>
            <p className="text-gray-300 text-xs">Altura de orbita: 408 km <br />Velocidad en órbita: 7.66 km/s </p>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-slate-900/95" />
          </div>
        </div>

        {/* Estela */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={`trail-${i}`}
              className="absolute w-0.5 h-0.5 bg-cyan-400/40 rounded-full animate-ping"
              style={{
                left: `${-8 - i * 3}px`,
                top: `${Math.random() * 6 - 3}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceStation;
