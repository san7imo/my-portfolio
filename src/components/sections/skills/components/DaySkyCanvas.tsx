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

interface DaySkyCanvasProps {
  className?: string;
}

const DaySkyCanvas: React.FC<DaySkyCanvasProps> = ({ className = "" }) => {
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
      // Gradiente que continúa desde donde termina NebulaCanvas hacia cielo diurno
      const dayTransitionGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Empieza exactamente donde termina NebulaCanvas
      dayTransitionGradient.addColorStop(0, 'rgb(85, 85, 155)');
      dayTransitionGradient.addColorStop(0.1, 'rgba(95, 95, 170, 0.6)');
      dayTransitionGradient.addColorStop(0.2, 'rgba(110, 110, 185, 0.55)');
      dayTransitionGradient.addColorStop(0.3, 'rgba(125, 125, 200, 0.5)');
      dayTransitionGradient.addColorStop(0.4, 'rgba(140, 140, 215, 0.45)');
      dayTransitionGradient.addColorStop(0.5, 'rgba(155, 155, 230, 0.4)');
      dayTransitionGradient.addColorStop(0.6, 'rgba(170, 180, 240, 0.35)');
      dayTransitionGradient.addColorStop(0.7, 'rgba(185, 195, 245, 0.3)');
      dayTransitionGradient.addColorStop(0.8, 'rgba(200, 210, 250, 0.25)');
      dayTransitionGradient.addColorStop(0.9, 'rgba(215, 225, 255, 0.2)');
      dayTransitionGradient.addColorStop(1, 'rgba(135, 206, 235, 0.8)'); // Azul cielo terrestre diurno
      
      ctx.fillStyle = dayTransitionGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Estrellas fugaces (misma frecuencia en la parte superior, menos en la inferior)
      if (Math.random() < 0.002) {
        shootingStarsRef.current.push(createShootingStar());
      }

      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life--;

        if (star.life > 0) {
          // Reducir opacidad de estrellas fugaces en la parte inferior (cielo diurno)
          const dayFade = star.y > canvas.height * 0.7 ? 0.3 : 1;
          const opacity = (star.life / star.maxLife) * star.brightness * dayFade;
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

      // Estrellas de fondo con lógica de desvanecimiento según la altura
      for (const star of starsRef.current) {
        if (star.z > 500) {
          // Calcular factor de desvanecimiento basado en la posición Y
          const heightFactor = star.y / canvas.height;
          let visibilityFactor = 1;
          
          if (heightFactor > 0.6) {
            // En la zona del cielo diurno, pocas estrellas visibles
            visibilityFactor = Math.max(0, 1 - (heightFactor - 0.6) * 2.5);
            if (Math.random() > 0.2) continue; // Solo mostrar 20% de las estrellas en zona diurna
          } else if (heightFactor > 0.4) {
            // Zona de transición
            visibilityFactor = 1 - (heightFactor - 0.4) * 1.5;
          }

          const size = Math.random() * 1.5 + 0.3;
          const baseOpacity = (Math.random() * 0.7 + 0.3) * visibilityFactor;
          const color = Math.random();
          
          let fill = `rgba(255,255,255,${baseOpacity})`;
          if (color > 0.8) fill = `rgba(173,216,230,${baseOpacity * 0.8})`;
          else if (color > 0.9) fill = `rgba(255,200,150,${baseOpacity * 0.7})`;

          if (baseOpacity > 0.1) { // Solo dibujar si es visible
            ctx.beginPath();
            ctx.fillStyle = fill;
            ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
            ctx.fill();
          }
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
    />
  );
};

export default DaySkyCanvas;