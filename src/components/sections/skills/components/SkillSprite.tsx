// src/components/sections/skills/components/SkillSprite.tsx
import React, { useEffect, useState, useCallback } from 'react';
import type { SoftSkillData } from '../../../../data/skillsData';

interface SkillSpriteProps {
  skill: SoftSkillData;
  index: number;
  isVisible: boolean;
  onSkillClick?: (skillId: string) => void;
  isSelected?: boolean;
}

const SkillSprite: React.FC<SkillSpriteProps> = ({ 
  skill, 
  index, 
  isVisible, 
  onSkillClick,
  isSelected = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDiscovered, setIsDiscovered] = useState(false); // Nuevo estado para trackear si fue descubierta

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, index * 400 + 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, index]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(!showModal);
    setIsDiscovered(true); // Marcar como descubierta al hacer click
    onSkillClick?.(skill.id);
  }, [showModal, onSkillClick, skill.id]);

  const handleCloseModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(false);
  }, []);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    
    if (showModal) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <>
      {/* Skill sprite con selección sutil */}
      <div
        className={`absolute cursor-pointer transform transition-all duration-1000 ${
          hasAnimated ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'
        } ${isHovered ? 'scale-110 z-35' : 'scale-100 z-30'} ${
          isSelected ? 'z-40' : ''
        }`}
        style={skill.position}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Área clickeable expandida */}
        <div className="absolute inset-0 w-32 h-32 -translate-x-4 -translate-y-4 cursor-pointer"
             style={{ minWidth: '120px', minHeight: '120px' }}></div>

        {/* Glow effect sutil */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isSelected
            ? 'bg-cyan-300/30 blur-xl scale-160 animate-pulse'
            : isHovered 
              ? 'bg-blue-300/25 blur-lg scale-140' 
              : 'bg-blue-300/10 blur-md scale-120'
        }`}></div>

        {/* Sprite container */}
        <div className={`relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 transition-all duration-300 ${
          isDiscovered ? 'opacity-100' : 'opacity-20'
        } ${isHovered ? 'animate-pulse' : ''}`}>
          <img 
            src={skill.image} 
            alt={skill.title}
            className={`w-full h-full object-contain filter transition-all duration-300 ${
              isSelected ? 'drop-shadow-xl brightness-105 ' : 'opacity-100 drop-shadow-lg hover:drop-shadow-xl'
            } cursor-pointer`}
          />
          
          {/* Borde sutil para indicar área interactiva */}
          <div className={`absolute inset-0 rounded-full border transition-all duration-300 ${
            isSelected
              ? 'border-cyan-400/40 scale-110'
              : isHovered 
                ? 'border-cyan-300/30 scale-105' 
                : 'border-white/10 scale-100'
          }`}></div>
        </div>

        {/* Tooltip mejorado */}
        <div className={`absolute top-full mt-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-slate-900/95 backdrop-blur-sm text-cyan-300 text-sm rounded-xl px-4 py-3 shadow-2xl border border-cyan-500/40 whitespace-nowrap max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{skill.emoji}</span>
              <span className="font-bold">{skill.title}</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {isDiscovered ? 'Habilidad descubierta' : 'Click para descubrir'}
            </p>
            {/* Tooltip arrow */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-900/95 border-l border-t border-cyan-500/40 rotate-45"></div>
          </div>
        </div>

        {/* Efectos de partículas sutiles */}
        {isHovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-ping pointer-events-none"
                style={{
                  left: `${50 + Math.cos(i * 90 * Math.PI / 180) * 50}px`,
                  top: `${50 + Math.sin(i * 90 * Math.PI / 180) * 50}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* NUEVO MODAL REDISEÑADO - Estilo Pixel Art/Retro */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleCloseModal}
        >
          {/* Backdrop sutil - solo blur ligero */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/10"></div>
          
          {/* Modal flotante con estilo pixel art */}
          <div 
            className="relative transform transition-all duration-500 ease-out scale-100 animate-modal-appear"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow del modal */}
            <div className="absolute inset-0 bg-cyan-400/20 blur-2xl scale-110 rounded-3xl animate-pulse"></div>
            
            {/* Contenedor principal del modal */}
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl border-4 border-cyan-400/50 shadow-2xl max-w-lg w-full overflow-hidden">
              
              {/* Patrón de fondo pixelado */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, #22d3ee 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, #06b6d4 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Header con diseño retro */}
              <div className="relative bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-6 border-b-4 border-cyan-400/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Icono grande con efecto pixel */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-400/30 blur-xl rounded-full animate-pulse"></div>
                      <div className="relative text-5xl filter drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
                        {skill.emoji}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 tracking-wide pixel-text">
                        {skill.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <p className="text-sm text-cyan-300 font-medium">SOFT SKILL</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Botón cerrar estilo retro */}
                  <button
                    onClick={handleCloseModal}
                    className="w-12 h-12 bg-red-600/20 hover:bg-red-600/40 border-2 border-red-400/50 rounded-lg transition-all duration-200 flex items-center justify-center text-red-300 hover:text-white font-bold text-xl hover:scale-110"
                  >
                    ✕
                  </button>
                </div>

                {/* Barra decorativa */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>
              </div>

              {/* Contenido principal */}
              <div className="relative p-6 space-y-6 max-h-80 overflow-y-auto custom-scrollbar">
                
                {/* Sección descripción con estilo terminal */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h4 className="text-cyan-400 font-bold text-lg pixel-text">DESCRIPCIÓN</h4>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-cyan-500">
                    <p className="text-gray-200 leading-relaxed text-base">
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Sección experiencia con estilo terminal */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <h4 className="text-orange-400 font-bold text-lg pixel-text">EXPERIENCIA</h4>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-400/50 to-transparent"></div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg p-4 border border-orange-500/30 relative overflow-hidden">
                    {/* Efecto de scan lines */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent bg-[length:100%_2px] animate-pulse"></div>
                    <p className="text-gray-200 italic leading-relaxed text-base relative z-10">
                      "{skill.story}"
                    </p>
                  </div>
                </div>

                {/* Indicadores de estado */}
                <div className="flex justify-center gap-4 pt-2">
                  <div className="flex items-center gap-2 bg-slate-800/60 rounded-full px-3 py-1 border border-green-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs font-medium">ACTIVO</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/60 rounded-full px-3 py-1 border border-cyan-500/30">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-cyan-400 text-xs font-medium">EN USO</span>
                  </div>
                </div>
              </div>

              {/* Footer con botón estilo arcade */}
              <div className="relative p-6 border-t-4 border-cyan-400/30 bg-gradient-to-r from-slate-800 to-slate-700">
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 border-2 border-cyan-400/50 pixel-text text-lg relative overflow-hidden group"
                >
                  {/* Efecto de brillo al hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative z-10">CERRAR TERMINAL</span>
                </button>
              </div>

              {/* Luces decorativas en las esquinas */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS adicionales para el modal */}
      <style jsx>{`
        .pixel-text {
          image-rendering: pixelated;
          font-family: 'Courier New', monospace;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.5);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.5);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.8);
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modal-appear {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(-20px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-modal-appear {
          animation: modal-appear 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default SkillSprite;