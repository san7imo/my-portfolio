import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  brightness: number;
}

interface NebulaCanvasProps {
  className?: string;
}

const NebulaCanvas: React.FC<NebulaCanvasProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    };

    const initializeStars = () => {
      const numStars = 400;
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() < 0.98 ? Math.random() * 500 + 500 : Math.random() * 500,
        prevX: Math.random() * canvas.width,
        prevY: Math.random() * canvas.height,
      }));
    };

    const createShootingStar = (): ShootingStar => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;

      switch (side) {
        case 0: 
          x = Math.random() * canvas.width; 
          y = -10; 
          vx = (Math.random() - 0.5) * 4; 
          vy = Math.random() * 3 + 2; 
          break;
        case 1: 
          x = canvas.width + 10; 
          y = Math.random() * canvas.height; 
          vx = -(Math.random() * 3 + 2); 
          vy = (Math.random() - 0.5) * 4; 
          break;
        case 2: 
          x = Math.random() * canvas.width; 
          y = canvas.height + 10; 
          vx = (Math.random() - 0.5) * 4; 
          vy = -(Math.random() * 3 + 2); 
          break;
        default: 
          x = -10; 
          y = Math.random() * canvas.height; 
          vx = Math.random() * 3 + 2; 
          vy = (Math.random() - 0.5) * 4;
      }

      const maxLife = Math.random() * 60 + 40;
      return { x, y, vx, vy, life: maxLife, maxLife, brightness: Math.random() * 0.8 + 0.2 };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      // Un solo gradiente continuo que empieza EXACTAMENTE donde termina GalaxyBackground
      const continuousGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      continuousGradient.addColorStop(0.1, 'rgba(15, 15, 80, 0.15)');
      continuousGradient.addColorStop(0.2, 'rgba(25, 25, 95, 0.45)'); 
      continuousGradient.addColorStop(0.4, 'rgba(40, 40, 110, 0.5)'); 
      continuousGradient.addColorStop(0.6, 'rgba(55, 55, 125, 0.55)'); 
      continuousGradient.addColorStop(0.8, 'rgba(70, 70, 140, 0.6)'); 
      continuousGradient.addColorStop(1, 'rgb(85, 85, 155)'); // Un azul más brillante al final
      
      ctx.fillStyle = continuousGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Eliminado: Efectos nebulosos

      // Estrellas fugaces
      if (Math.random() < 0.002) {
        shootingStarsRef.current.push(createShootingStar());
      }

      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life--;

        if (star.life > 0) {
          const opacity = (star.life / star.maxLife) * star.brightness;
          const tail = Math.min(15, star.maxLife - star.life);

          for (let i = 0; i < tail; i++) {
            const trailOpacity = opacity * (1 - i / tail) * 0.6;
            const trailX = star.x - star.vx * i * 0.4;
            const trailY = star.y - star.vy * i * 0.4;

            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
            ctx.arc(trailX, trailY, Math.max(0.5, 1.5 - i * 0.1), 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      // Estrellas de fondo
      for (const star of starsRef.current) {
        if (star.z > 500) {
          const size = Math.random() * 1.5 + 0.3;
          const opacity = Math.random() * 0.7 + 0.3;
          const color = Math.random();
          
          let fill = `rgba(255,255,255,${opacity})`;
          if (color > 0.8) fill = `rgba(173,216,230,${opacity * 0.8})`;
          else if (color > 0.9) fill = `rgba(255,200,150,${opacity * 0.7})`;

          ctx.beginPath();
          ctx.fillStyle = fill;
          ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      // Eliminado: style={{ backgroundColor: 'rgba(15, 15, 80, 0.4)' }}
    />
  );
};

export default NebulaCanvas;