import React, { useEffect, useState, useCallback, lazy } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  images: string[];
  liveUrl: string;
  githubUrl: string;
}

interface PlanetProject extends Project {
  planetImage: string;
  planetSize: number;
  depth: number;
  position: { x: number; y: number };
}

interface TrajectoryLine {
  from: { x: number; y: number };
  to: { x: number; y: number };
  fromIndex: number;
  toIndex: number;
}

interface TimelineProps {
  projects: Project[];
  activeProject: number;
  onProjectClick: (index: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  projects,
  activeProject,
  onProjectClick
}) => {
  const [trajectoryLines, setTrajectoryLines] = useState<TrajectoryLine[]>([]);
  const [previousProject, setPreviousProject] = useState<number>(0);
  const [rocketHasStarted, setRocketHasStarted] = useState<boolean>(false);

  // Configuración mejorada de planetas con mejor distribución y profundidad - Posiciones más bajas
  const planetProjects: PlanetProject[] = projects.map((project, index) => {
    const planetConfigs = [
      {
        planetImage: "/assets/img/planets/riwi.webp",
        planetSize: window.innerWidth < 640 ? 0.8 : window.innerWidth < 1024 ? 1.3 : 1.8,
        depth: 0.7,
        position: { x: 15, y: window.innerWidth < 640 ? 75 : 85 },
        loading: lazy

      },
      {
        planetImage: "/assets/img/planets/compraraiz.webp",
        planetSize: window.innerWidth < 640 ? 0.8 : window.innerWidth < 1024 ? 1.3 : 1.8,
        depth: 1.2,
        position: { x: 35, y: window.innerWidth < 640 ? 25 : 35 },
        loading: lazy

      },
      {
        planetImage: "/assets/img/planets/todorifas.webp",
        planetSize: window.innerWidth < 640 ? 1.2 : window.innerWidth < 1024 ? 2.1 : 3,
        depth: 0.6,
        position: { x: 55, y: window.innerWidth < 640 ? 70 : 80 },
        loading: lazy

      },
      {
        planetImage: "/assets/img/planets/camionya.webp",
        planetSize: window.innerWidth < 640 ? 0.9 : window.innerWidth < 1024 ? 1.4 : 1.9,
        depth: 1.1,
        position: { x: 70, y: window.innerWidth < 640 ? 30 : 40 },
        loading: lazy
      },
      {
        planetImage: "/assets/img/planets/ciberseguridad.webp",
        planetSize: window.innerWidth < 640 ? 0.8 : window.innerWidth < 1024 ? 1.3 : 1.8,
        depth: 0.5,
        position: { x: 85, y: window.innerWidth < 640 ? 65 : 75 },
        loading: lazy

      },
      {
        planetImage: "/assets/img/planets/filavirtual.webp",
        planetSize: window.innerWidth < 640 ? 0.8 : window.innerWidth < 1024 ? 1.3 : 1.8,
        depth: 1.0,
        position: { x: 95, y: window.innerWidth < 640 ? 40 : 50 },
        loading: lazy
      }
    ];

    return {
      ...project,
      ...planetConfigs[index]
    };
  });

  // Función para calcular el punto en la órbita del planeta
  const getOrbitPoint = useCallback((planetIndex: number, fromIndex: number) => {
    const planet = planetProjects[planetIndex];
    const fromPlanet = planetProjects[fromIndex];
    
    // Radio de la órbita (basado en el tamaño del planeta)
    const orbitRadius = (planet.planetSize * 45) / 100; // Convertir a porcentaje del viewport
    
    // Calcular ángulo desde el planeta origen al planeta destino
    const dx = planet.position.x - fromPlanet.position.x;
    const dy = planet.position.y - fromPlanet.position.y;
    const angle = Math.atan2(dy, dx);
    
    // Punto en la órbita del planeta (lado que mira hacia el planeta origen)
    return {
      x: planet.position.x - Math.cos(angle) * orbitRadius,
      y: planet.position.y - Math.sin(angle) * orbitRadius
    };
  }, [planetProjects]);

  // Función para calcular el punto de salida de la órbita del planeta
  const getExitOrbitPoint = useCallback((planetIndex: number, toIndex: number) => {
    const planet = planetProjects[planetIndex];
    const toPlanet = planetProjects[toIndex];
    
    // Radio de la órbita
    const orbitRadius = (planet.planetSize * 45) / 100;
    
    // Calcular ángulo hacia el planeta destino
    const dx = toPlanet.position.x - planet.position.x;
    const dy = toPlanet.position.y - planet.position.y;
    const angle = Math.atan2(dy, dx);
    
    // Punto en la órbita del planeta (lado que mira hacia el planeta destino)
    return {
      x: planet.position.x + Math.cos(angle) * orbitRadius,
      y: planet.position.y + Math.sin(angle) * orbitRadius
    };
  }, [planetProjects]);

  // Efecto para actualizar las trayectorias cuando cambia el proyecto activo
  useEffect(() => {
    if (activeProject !== previousProject) {
      // Marcar que el cohete ha empezado a moverse
      if (!rocketHasStarted) {
        setRocketHasStarted(true);
      }

      const fromPoint = getExitOrbitPoint(previousProject, activeProject);
      const toPoint = getOrbitPoint(activeProject, previousProject);
      
      const newLine: TrajectoryLine = {
        from: fromPoint,
        to: toPoint,
        fromIndex: previousProject,
        toIndex: activeProject
      };

      setTrajectoryLines(prev => {
        // Evitar duplicados
        const exists = prev.some(line => 
          line.fromIndex === newLine.fromIndex && line.toIndex === newLine.toIndex
        );
        
        if (!exists) {
          return [...prev, newLine];
        }
        return prev;
      });

      setPreviousProject(activeProject);
    }
  }, [activeProject, previousProject, getExitOrbitPoint, getOrbitPoint, rocketHasStarted]);

  // Calcular posición del cohete (entre planetas o en órbita)
  const getRocketPosition = (planetIndex: number) => {
    const planet = planetProjects[planetIndex];
    
    // El cohete orbita alrededor del planeta activo
    const orbitRadius = (planet.planetSize * 55) / 100; // Ligeramente más lejos que las líneas
    const time = Date.now() * 0.001; // Tiempo para animación orbital
    const orbitSpeed = 0.5; // Velocidad de órbita
    
    return {
      x: planet.position.x + Math.cos(time * orbitSpeed) * orbitRadius,
      y: planet.position.y + Math.sin(time * orbitSpeed) * orbitRadius,
      scale: planet.depth
      // Removido: rotation - ya no rotamos el cohete
    };
  };

  // Generar path string para una línea
  const generateLinePathString = (line: TrajectoryLine) => {
    return `M ${line.from.x} ${line.from.y} L ${line.to.x} ${line.to.y}`;
  };

  // Extraer solo mes y año de la fecha
  const formatDate = (dateString: string) => {
    const months = {
      'Enero': 'Ene', 'Febrero': 'Feb', 'Marzo': 'Mar', 'Abril': 'Abr',
      'Mayo': 'May', 'Junio': 'Jun', 'Julio': 'Jul', 'Agosto': 'Ago',
      'Septiembre': 'Sep', 'Octubre': 'Oct', 'Noviembre': 'Nov', 'Diciembre': 'Dic'
    };
    
    const parts = dateString.split(' ');
    if (parts.length >= 2) {
      const month = months[parts[0] as keyof typeof months] || parts[0];
      const year = parts[1];
      return `${month} ${year}`;
    }
    return dateString;
  };

  const rocketPosition = getRocketPosition(activeProject);

  return (
    <div className="relative w-full h-[350px] sm:h-[375px] md:h-[450px] overflow-visible px-2 sm:px-4 py-4 sm:py-8">
      {/* SVG para las trayectorias dinámicas */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
            <stop offset="50%" stopColor="rgba(251, 146, 60, 1)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.6)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="pulseGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Renderizar todas las líneas de trayectoria generadas */}
        {trajectoryLines.map((line, index) => (
          <g key={`trajectory-${line.fromIndex}-${line.toIndex}`}>
            {/* Línea base con efecto de entrada animada */}
            <path
              d={generateLinePathString(line)}
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glow)"
              className="animate-pulse"
              style={{
                strokeDasharray: '100 100',
                strokeDashoffset: '100',
                animation: `drawLine 2s ease-out ${index * 0.3}s forwards, pulse 3s ease-in-out infinite ${2 + index * 0.3}s`
              }}
            />
            
            {/* Partículas viajeras en la línea */}
            <circle
              r="1"
              fill="rgba(251, 146, 60, 0.9)"
              filter="url(#pulseGlow)"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${index * 0.5}s`}
              >
                <mpath href={`#trajectory-path-${index}`} />
              </animateMotion>
            </circle>
            
            {/* Path invisible para la animación de las partículas */}
            <path
              id={`trajectory-path-${index}`}
              d={generateLinePathString(line)}
              fill="none"
              stroke="none"
            />
          </g>
        ))}
      </svg>

      {/* Estilos CSS para las animaciones */}
      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Planetas con efectos de profundidad */}
      {planetProjects.map((planet, index) => {
        const isActive = index === activeProject;
        const baseSize = 90;
        
        return (
          <div
            key={planet.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
            style={{
              left: `${planet.position.x}%`,
              top: `${planet.position.y}%`,
              transform: `translate(-50%, -50%) scale(${planet.depth})`,
              zIndex: Math.floor(planet.depth * 10),
              filter: planet.depth < 0.8 ? 'brightness(0.8) contrast(0.9)' : 'brightness(1)'
            }}
          >
            {/* Planeta */}
            <button
              onClick={() => onProjectClick(index)}
              className={`relative block transition-all duration-500 hover:scale-110 ${
                isActive ? 'scale-125' : 'scale-100'
              }`}
              style={{
                width: `${baseSize * planet.planetSize}px`,
                height: `${baseSize * planet.planetSize}px`
              }}
              aria-label={`Seleccionar proyecto: ${planet.title}`}
            >
              {/* Imagen del planeta */}
              <img
                src={planet.planetImage}
                alt={planet.title}
                className={`w-full h-full object-contain transition-all duration-500 ${
                  isActive 
                    ? 'drop-shadow-2xl' 
                    : 'opacity-85 hover:opacity-95'
                }`}
                style={{
                  filter: isActive 
                    ? `drop-shadow(0 0 ${25 * planet.depth}px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 ${50 * planet.depth}px rgba(168, 85, 247, 0.6)) brightness(1.1)`
                    : `brightness(${0.7 + (planet.depth * 0.3)}) contrast(${0.8 + (planet.depth * 0.2)})`
                }}
                loading='lazy'
              />
              
              {/* Anillo de selección para planeta activo */}
              {isActive && (
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 rounded-full border-3 border-orange-400 animate-pulse"
                    style={{
                      boxShadow: `0 0 ${40 * planet.depth}px rgba(251, 146, 60, 0.7), inset 0 0 ${40 * planet.depth}px rgba(251, 146, 60, 0.2)`
                    }}
                  />
                </div>
              )}
            </button>
            
            {/* Solo fecha del planeta - oculta en móviles */}
            <div 
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 sm:mt-3 text-center transition-all duration-500 hidden sm:block ${
                isActive ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-90'
              }`}
            >
              <p 
                className={`font-medium whitespace-nowrap ${
                  isActive 
                    ? 'text-orange-300' 
                    : 'text-gray-400'
                }`}
                style={{ 
                  fontSize: `${0.7 + (planet.depth * 0.2)}rem`
                }}
              >
                {formatDate(planet.date)}
              </p>
            </div>
          </div>
        );
      })}

      {/* Cohete viajero - Inicia en esquina superior izquierda */}
      <div
        className={`absolute transition-all ease-in-out z-40 ${
          rocketHasStarted ? 'duration-1500' : 'duration-500'
        }`}
        style={{
          left: `${rocketPosition.x}%`,
          top: `${rocketPosition.y}%`,
          transform: `translate(-50%, -50%) scale(${rocketPosition.scale})`,
        }}
      >
        <div className="relative">
          {/* Imagen del cohete sin rotación */}
          <img
            src="/assets/img/cohetemano.webp"
            alt="Cohete viajero"
            className={`object-contain transition-all duration-300 ${
              rocketHasStarted 
                ? 'w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16' 
                : 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20'
            }`}
            style={{
              filter: `drop-shadow(0 0 ${15 * rocketPosition.scale}px rgba(251, 146, 60, 1)) drop-shadow(0 0 ${30 * rocketPosition.scale}px rgba(168, 85, 247, 0.8))`,
            }}
          />
          
          {/* Partículas de propulsión orbital - solo cuando se está moviendo */}
          {rocketHasStarted && (
            <div className="absolute" style={{ 
              right: '100%', 
              top: '50%', 
              transform: `translateY(-50%)`,
              transformOrigin: 'right center'
            }}>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-ping"
                  style={{
                    width: `${(2 + rocketPosition.scale * 0.5)}px`,
                    height: `${(2 + rocketPosition.scale * 0.5)}px`,
                    right: `${i * 6 * rocketPosition.scale}px`,
                    top: `${(i - 1) * 2 * rocketPosition.scale}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s',
                    background: i % 2 === 0 ? '#fb923c' : '#a855f7'
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Ondas de energía orbital - solo cuando se está moviendo */}
          {rocketHasStarted && (
            <div 
              className="absolute inset-0 rounded-full border border-orange-400 animate-ping opacity-40" 
              style={{ 
                animation: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                borderWidth: `${rocketPosition.scale}px`
              }}
            />
          )}
          
          {/* Indicador de "Click para empezar" cuando está en reposo */}
          {!rocketHasStarted && (
            <div className="absolute top-[120%] left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-orange-300 text-[10px] sm:text-sm font-medium animate-pulse whitespace-nowrap">
                ¡Haz clic en un planeta!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;