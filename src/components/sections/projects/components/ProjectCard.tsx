import React from 'react';
import type { Project } from './Timeline';

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  return (
    <div className="max-w-[90vw] sm:max-w-2xl md:max-w-3xl mx-auto max-h-[40vh] sm:max-h-none overflow-y-auto -mt-8 sm:mt-0">
      <div className="bg-black/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-3 md:p-5 border border-purple-500/30 relative overflow-hidden shadow-2xl">
        {/* Efecto de brillo en el fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-orange-600/10 pointer-events-none"></div>
        
        {/* Contenido */}
        <div className="relative z-10">
          <h3 className="text-center text-sm sm:text-base md:text-2xl font-bold text-white mb-1 sm:mb-2 md:mb-3 bg-gradient-to-r from-white via-purple-200 to-orange-200 bg-clip-text text-transparent">
            {project.title}
          </h3>
          
          <p className="text-gray-300 mb-1.5 sm:mb-3 md:mb-4 leading-relaxed text-[10px] sm:text-sm max-w-2xl mx-auto line-clamp-2 sm:line-clamp-none">
            {project.description}
          </p>
          
          {/* Tecnologías con diseño más compacto */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-1.5 sm:mb-3 md:mb-4 justify-center">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-purple-600/30 to-orange-600/30 text-white text-[9px] sm:text-xs rounded-full border border-purple-400/40 backdrop-blur-sm font-medium hover:from-purple-600/40 hover:to-orange-600/40 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-gray-700/50 text-gray-300 text-[9px] sm:text-xs rounded-full border border-gray-500/40 backdrop-blur-sm font-medium">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          
          {/* Botón más pequeño - centrado */}
          <div className="text-center">
            <button
              onClick={onViewDetails}
              className="group relative bg-gradient-to-r from-purple-600 to-orange-600 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full font-semibold text-[10px] sm:text-sm transition-all duration-300 transform hover:scale-105 hover:from-purple-500 hover:to-orange-500 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Ver Detalles</span>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Partículas animadas más pequeñas */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white/30 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-300/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Decoración de fondo más sutil */}
        <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default ProjectCard;