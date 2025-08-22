import React, { useEffect, useRef, useState } from "react";
import type { Technology } from "../../../../data/techData";

interface FloatingLogoProps {
  technology: Technology;
  isHighlighted: boolean;
  isGrayscale: boolean;
  onHover: (tech: Technology | null) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  dx: number;
  dy: number;
}

const FloatingLogo: React.FC<FloatingLogoProps> = ({ 
  technology, 
  isHighlighted, 
  isGrayscale,
  onHover, 
  containerRef 
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({
    x: Math.random() * (window.innerWidth - 80),
    y: Math.random() * (window.innerHeight - 80)
  });
  const [velocity, setVelocity] = useState<Velocity>({
    // Velocidad inicial reducida
    dx: (Math.random() - 0.5) * 0.8, // Antes 1.5
    dy: (Math.random() - 0.5) * 0.8  // Antes 1.5
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const moveLogo = () => {
      if (!containerRef.current) return;

      // Si está en hover, no mover el logo
      if (isHovered) {
        animationFrameId = requestAnimationFrame(moveLogo);
        return;
      }

      // Usar dimensiones completas de la ventana
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const logoSize = 80; // Tamaño del logo con padding

      setPosition(prevPos => {
        setVelocity(prevVel => {
          const { x: currentX, y: currentY } = prevPos;
          let { dx, dy } = prevVel;

          // Aplicar velocidad
          const newX = currentX + dx;
          const newY = currentY + dy;

          // Rebotes en las paredes con un poco menos de aleatoriedad
          if (newX <= 0 || newX >= containerWidth - logoSize) {
            dx = -dx + (Math.random() - 0.5) * 0.2; // Aleatoriedad del rebote reducida
          }
          
          if (newY <= 0 || newY >= containerHeight - logoSize) {
            dy = -dy + (Math.random() - 0.5) * 0.2; // Aleatoriedad del rebote reducida
          }

          // Limitar velocidad máxima
          const maxSpeed = 0.8; // Velocidad máxima reducida (antes 1.5)
          dx = Math.max(-maxSpeed, Math.min(maxSpeed, dx));
          dy = Math.max(-maxSpeed, Math.min(maxSpeed, dy));

          return { dx, dy };
        });

        const { x: currentX, y: currentY } = prevPos;
        let newX = currentX + velocity.dx;
        let newY = currentY + velocity.dy;

        // Mantener dentro de los límites de toda la pantalla
        newX = Math.max(0, Math.min(containerWidth - logoSize, newX));
        newY = Math.max(0, Math.min(containerHeight - logoSize, newY));

        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(moveLogo);
    };

    animationFrameId = requestAnimationFrame(moveLogo);
    return () => cancelAnimationFrame(animationFrameId);
  }, [containerRef, velocity.dx, velocity.dy, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(technology);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  // Determinar el estilo del logo basado en el estado
  const getLogoStyle = () => {
    if (isHovered) {
      return "filter-none drop-shadow-lg"; // Siempre a color en hover
    } else if (isHighlighted) {
      return "filter-none drop-shadow-lg"; // A color si está destacado
    } else if (isGrayscale) {
      return "grayscale opacity-40"; // Blanco y negro si está en grayscale
    } else {
      return "grayscale opacity-60"; // Estado por defecto
    }
  };

  return (
    <div
      ref={logoRef}
      className={`absolute cursor-pointer transition-all duration-500 transform ${
        isHighlighted || isHovered
          ? "scale-110 z-20" 
          : "scale-100 z-10"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isHovered ? 'transform 0.3s ease' : 'none',
        zIndex: isHovered ? 30 : (isHighlighted ? 20 : 10)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative p-3 rounded-2xl transition-all duration-500 ${
          isHighlighted || isHovered
            ? "bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Efecto de brillo */}
        {(isHighlighted || isHovered) && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 animate-pulse" />
        )}
        
        {/* Logo */}
        <div className="relative z-10">
          <img
            src={technology.logo}
            alt={technology.name}
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 transition-all duration-500 ${getLogoStyle()}`}
            style={{
              filter: (isHighlighted || isHovered) && !isGrayscale
                ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' 
                : undefined
            }}
          />
        </div>

        {/* Partículas brillantes */}
        {(isHighlighted || isHovered) && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
            <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
            <div className="absolute top-1/2 -right-2 w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingLogo;