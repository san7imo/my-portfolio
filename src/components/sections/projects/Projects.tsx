import React, { useState } from 'react';
import NebulaCanvas from './components/NebulaCanvas';
import Timeline from './components/Timeline';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import { projectsData } from '../../../data/projectData';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [hasClickedPlanet, setHasClickedPlanet] = useState<boolean>(false);

  const handleProjectClick = (index: number) => {
    setActiveProject(index);
    setHasClickedPlanet(true);
  };

  const handleViewDetails = () => {
    setShowProjectModal(true);
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Canvas de fondo */}
      <NebulaCanvas className="z-0" />
      
      {/* Contenido principal */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 py-4">
        <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
          {/* Título compacto */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              Viaje en el
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 ml-4">
                Espacio - Tiempo
              </span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-light">
              Explora los proyectos en los que he trabajado, através de un viaje en el espacio-tiempo.
            </p>
            <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto rounded-full"></div>
          </div>

          {/* Línea de tiempo compacta - más hacia abajo */}
          <div className="flex-shrink-0 mb-2 mt-4">
            <Timeline
              projects={projectsData}
              activeProject={activeProject}
              onProjectClick={handleProjectClick}
            />
          </div>

          {/* Contenido dinámico - se ajusta al espacio restante, más arriba */}
          <div className="flex-1 flex flex-col justify-start pt-4">
            {/* Proyecto activo destacado - Solo si se ha hecho clic */}
            {hasClickedPlanet && (
              <ProjectCard
                project={projectsData[activeProject]}
                onViewDetails={handleViewDetails}
              />
            )}
            
            {/* Instrucciones iniciales */}
            {!hasClickedPlanet && (
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 max-w-xl mx-auto text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 bg-gradient-to-r from-purple-300 to-orange-300 bg-clip-text text-transparent">
                    ¡Comienza tu Viaje Espacial!
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-4">
                    Haz clic en cualquier planeta para explorar mis proyectos y ver al astronauta navegar por el cosmos.
                  </p>
                  <div className="flex justify-center">
                    <div className="animate-bounce">
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Indicador de navegación compacto */}
          <div className="text-center py-2 flex-shrink-0">
            <p className="text-gray-400 text-xs mb-2">
              {hasClickedPlanet 
                ? `Planeta ${activeProject + 1} de ${projectsData.length} • Haz clic en otros planetas`
                : 'Haz clic en los planetas para comenzar'
              }
            </p>
            <div className="flex justify-center gap-1.5">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleProjectClick(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === activeProject && hasClickedPlanet
                      ? 'bg-orange-400 w-4' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal del proyecto */}
      <ProjectModal
        project={projectsData[activeProject]}
        isOpen={showProjectModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Projects;