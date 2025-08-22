import React from 'react';
import type { Technology } from '../../../../data/techData';

interface TechInfoProps {
  technology: Technology;
}

const TechInfo: React.FC<TechInfoProps> = ({ technology }) => {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'experto':
        return 'from-green-400 to-emerald-500';
      case 'avanzado':
        return 'from-blue-400 to-cyan-500';
      case 'intermedio':
        return 'from-yellow-400 to-orange-500';
      case 'básico':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fadeInUp w-[90vw] sm:w-auto">
      <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 max-w-[90vw] sm:max-w-md mx-auto shadow-2xl">
        {/* Header con logo y nombre */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="p-2 bg-white/10 rounded-xl">
            <img 
              src={technology.logo} 
              alt={technology.name}
              className="w-6 h-6 sm:w-8 sm:h-8"
              loading ='lazy'
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{technology.name}</h3>
            <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLevelColor(technology.level)} text-white mt-1`}>
              {technology.level}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
          {technology.description}
        </p>

        {/* Categoría */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
            Categoría:
          </span>
          <span className="text-[10px] sm:text-xs text-purple-300 font-medium capitalize">
            {technology.category}
          </span>
        </div>

        {/* Decoración */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default TechInfo;