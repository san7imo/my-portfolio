import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import type { Project } from './Timeline';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % project.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gray-900/95 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-purple-500/30">
        <div className="p-3 sm:p-4 md:p-6">
          {/* Header del modal */}
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">{project.date}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 text-2xl hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Galería de imágenes */}
          <div className="relative mb-6">
            <img
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-48 sm:h-64 md:h-80 object-contain rounded-lg"
              loading='lazy'
            />
            
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Indicadores de imagen */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Ir a la imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tecnologías */}
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3">Tecnologías utilizadas</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-orange-600/30 text-white text-sm rounded-full border border-purple-400/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Enlaces */}
          <div className="flex gap-4 flex-wrap">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-500 hover:to-orange-500 transition-all duration-300"
            >
              <ExternalLink size={18} />
              Ver Proyecto
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              <Github size={18} />
              Ver Código
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;