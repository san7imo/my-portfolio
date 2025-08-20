import React, { useState, useRef } from "react";
import { techData, categories, type CategoryType } from "../../../data/techData";
import type { Technology } from "../../../data/techData";
import GalaxyBackground from "./components/GalaxyBackground";
import FloatingLogo from "./components/FloatingLogo";
import { CategoryFilter } from "./components/CateforyFilter";
import TechInfo from "./components/TechInfo";

const Technologies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    setHoveredTech(null);
  };

  return (
    <section id="technologies" className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Fondo galáctico con canvas */}
      <GalaxyBackground />

      {/* Contenedor de logos flotantes - DETRÁS de todo */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full z-5"
      >
        {techData.map((tech) => (
          <FloatingLogo
            key={tech.id}
            technology={tech}
            isHighlighted={selectedCategory !== "all" && selectedCategory === tech.category}
            isGrayscale={selectedCategory !== "all" && selectedCategory !== tech.category}
            onHover={setHoveredTech}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Contenido principal - ENCIMA de los logos pero con pointer-events selectivos */}
      <div className="relative z-20 flex flex-col items-center h-screen pt-16 pb-8 px-4 pointer-events-none">
        {/* Título principal */}
        <div className="text-center mb-8 relative z-30 pointer-events-auto">
          <h2 
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl tracking-wider"
            style={{ 
              fontFamily: '"Orbitron", "Exo 2", sans-serif',
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)'
            }}
          >
            FullStack-Verse
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg pixelated"
            style={{ 
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 'bold',
              lineHeight: '2',
              textShadow: '2px 2px 0px rgb(62, 11, 116)',
              imageRendering: 'pixelated'
            }}
          >
            Explora las tecnologías que dominan en mi universo FullStack
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full drop-shadow-lg animate-pulse" />
        </div>

        {/* Filtro por categorías */}
        <div className="relative z-30 mb-8 pointer-events-auto">
          <CategoryFilter
            selected={selectedCategory}
            categories={categories}
            onSelect={handleCategorySelect}
          />
        </div>

        {/* Espacio flexible para los logos */}
        <div className="flex-1 w-full relative z-10" />

        {/* Indicador de scroll - Solo el mouse */}
        <div className="relative z-30 text-gray-400 animate-bounce pointer-events-auto">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs">Explora el universo</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Información del logo en hover - ENCIMA de todo */}
      {hoveredTech && (
        <div className="relative z-50">
          <TechInfo technology={hoveredTech} />
        </div>
      )}

      {/* Efectos adicionales */}
      <div className="absolute inset-0 pointer-events-none z-15">
        {/* Overlay gradient sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
        
        {/* Partículas brillantes fijas */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-400 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 right-40 w-1 h-1 bg-pink-400 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  );
};

export default Technologies;