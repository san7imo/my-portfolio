// src/components/sections/skills/components/MissionProgress.tsx
import React from 'react';

interface MissionProgressProps {
  exploredSkills: Set<string>;
  totalSkills: number;
  isVisible: boolean;
  missionCompleted: boolean;
}

const MissionProgress: React.FC<MissionProgressProps> = ({ 
  exploredSkills, 
  totalSkills, 
  isVisible, 
  missionCompleted 
}) => {
  const progressPercentage = (exploredSkills.size / totalSkills) * 100;

  return (
    <div className={`transition-all duration-1000 max-w-md w-80 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border-2 border-cyan-500/40 shadow-xl">
        
        {/* Header de la barra de progreso */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold text-sm pixel-text">PROGRESO DE EXPLORACIÓN</span>
            {missionCompleted && (
              <span className="text-green-400 font-bold text-sm animate-pulse">🎯</span>
            )}
          </div>
          <span className="text-white font-bold text-sm">
            {exploredSkills.size}/{totalSkills}
          </span>
        </div>
        
        {/* Barra de progreso visual */}
        <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden border border-cyan-500/30 mb-3">
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse"></div>
          
          {/* Progreso */}
          <div 
            className="relative h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Efecto de brillo en la barra */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
          
          {/* Efecto de completado */}
          {missionCompleted && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/50 to-cyan-500/50 animate-pulse"></div>
          )}
        </div>
        
        {/* Subtítulo motivacional */}
        <div className="text-center">
          {missionCompleted ? (
            <div className="space-y-1">
              <p className="text-green-400 font-bold text-sm animate-pulse pixel-text">
                🎉 ¡MISIÓN COMPLETADA!
              </p>
              <p className="text-green-300 text-xs">
                Todas las habilidades exploradas
              </p>
            </div>
          ) : exploredSkills.size === 0 ? (
            <div className="space-y-1">
              <p className="text-orange-300 text-sm font-medium animate-pulse">
                💫 Haz clic en cada habilidad
              </p>
              <p className="text-gray-400 text-xs">
                para explorarla y completar la misión
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-cyan-400 text-sm font-medium">
                ¡Excelente progreso!
              </p>
              <p className="text-gray-400 text-xs">
                Continúa explorando las habilidades restantes
              </p>
            </div>
          )}
        </div>

        {/* Indicadores de estado */}
        <div className="flex justify-center gap-3 mt-3 pt-3 border-t border-cyan-500/20">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">ACTIVO</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-xs font-medium">EXPLORANDO</span>
          </div>
          {missionCompleted && (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-xs font-medium">COMPLETO</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionProgress;