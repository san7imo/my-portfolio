// src/components/sections/skills/components/Rocket.tsx
import React from 'react';

interface RocketProps {
  isLanded: boolean;
}

const Rocket: React.FC<RocketProps> = ({ isLanded }) => {
  return (
    <div className={`transition-all duration-1000 ${isLanded ? 'opacity-100' : 'opacity-70'}`}>
      {/* Glow del cohete */}
      <div className="absolute inset-0  blur-xl scale-150 rounded-full animate-pulse"></div>
      
      {/* Cohete */}
      <img 
        src="/assets/img/contact-section/cohete.png"
        alt="Cohete Espacial"
        className="w-16 h-50 md:w-20 md:h-32 lg:w-24 lg:h-36 object-contain filter drop-shadow-2xl"
        style={{
          transform: isLanded ? 'rotate(0deg)' : 'rotate(-15deg)',
          transition: 'transform 3s ease-out'
        }}
      />
      
      {/* Efectos del cohete durante el descenso */}
      {!isLanded && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={`fire-${i}`}
              className="absolute w-1.5 h-6 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${-3 + i * 2}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.5s'
              }}
            />
          ))}
        </div>
      )}
      
      {/* Efectos de aterrizaje */}
      {isLanded && (
        <>
          {/* Polvo lunar */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={`dust-${i}`}
                className="absolute w-2 h-2 bg-gray-400/40 rounded-full animate-bounce"
                style={{
                  left: `${-8 + i * 4}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          {/* Ondas de impacto */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-3 border border-cyan-400/30 rounded-full animate-ping" 
                 style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 w-12 h-2 border border-blue-400/20 rounded-full animate-ping" 
                 style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
          </div>
        </>
      )}
      
      {/* Luces del cohete */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/2 w-0.5 h-0.5 bg-red-500 rounded-full animate-ping"
          style={{ animationDuration: '1.5s' }}
        />
        <div 
          className="absolute top-1/3 left-1/3 w-0.5 h-0.5 bg-green-500 rounded-full animate-ping" 
          style={{ animationDelay: '0.5s', animationDuration: '2s' }}
        />
      </div>
    </div>
  );
};

export default Rocket;