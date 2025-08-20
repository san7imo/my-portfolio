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

const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
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
      const numStars = 800;
      const stars: Star[] = [];
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() < 0.95 ? Math.random() * 500 + 500 : Math.random() * 500,
          prevX: Math.random() * canvas.width,
          prevY: Math.random() * canvas.height,
        });
      }
      
      starsRef.current = stars;
    };

    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      
      switch(side) {
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
      
      return {
        x, y, vx, vy,
        life: maxLife,
        maxLife,
        brightness: Math.random() * 0.8 + 0.2
      };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      // Limpiar canvas con fondo negro antes de dibujar el gradiente
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradiente del espacio que termina con el color de inicio de NebulaCanvas
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');          // Negro espacio profundo
      gradient.addColorStop(0.2, 'rgba(0, 0, 5, 0.98)');     // Negro con tinte azul muy sutil
      gradient.addColorStop(0.4, 'rgba(0, 0, 10, 0.95)');    // Azul muy oscuro
      gradient.addColorStop(0.6, 'rgba(2, 2, 20, 0.9)');     // Azul oscuro
      gradient.addColorStop(0.75, 'rgba(5, 5, 35, 0.8)');    // Azul medio oscuro
      gradient.addColorStop(0.9, 'rgba(10, 10, 60, 0.66)');   // Azul medio
      gradient.addColorStop(1, 'rgba(15, 15, 80, 1)');     // Color de transición con NebulaCanvas
      gradient.addColorStop(1, 'rgba(15, 15, 80, 1)');     // Color de transición con NebulaCanvas
      gradient.addColorStop(1, 'rgba(15, 15, 80, 0.56)');     // Color de transición con NebulaCanvas
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Crear estrellas fugaces ocasionalmente
      if (Math.random() < 0.003) {
        shootingStarsRef.current.push(createShootingStar());
      }

      // Dibujar y actualizar estrellas fugaces
      shootingStarsRef.current = shootingStarsRef.current.filter(shootingStar => {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life--;

        if (shootingStar.life > 0) {
          const opacity = (shootingStar.life / shootingStar.maxLife) * shootingStar.brightness;
          const tailLength = Math.min(20, shootingStar.maxLife - shootingStar.life);
          
          for (let i = 0; i < tailLength; i++) {
            const trailOpacity = opacity * (1 - i / tailLength) * 0.7;
            const trailX = shootingStar.x - shootingStar.vx * i * 0.5;
            const trailY = shootingStar.y - shootingStar.vy * i * 0.5;
            
            if (trailX >= 0 && trailX <= canvas.width && trailY >= 0 && trailY <= canvas.height) {
              ctx.beginPath();
              ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
              ctx.arc(trailX, trailY, Math.max(0.5, 2 - i * 0.1), 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          if (shootingStar.x >= 0 && shootingStar.x <= canvas.width && 
              shootingStar.y >= 0 && shootingStar.y <= canvas.height) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = `rgba(200, 220, 255, ${opacity * 0.5})`;
            ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          
          return true;
        }
        
        return false;
      });

      // Dibujar estrellas
      const stars = starsRef.current;
      stars.forEach((star) => {
        if (star.z > 500) {
          if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
          }
          
          const size = Math.random() * 2 + 0.2;
          const opacity = Math.random() * 0.9 + 0.1;
          
          const starType = Math.random();
          
          if (starType < 0.7) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
            ctx.fill();
          } else if (starType < 0.85) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(173, 216, 230, ${opacity * 0.8})`;
            ctx.arc(star.x, star.y, size * 0.8, 0, Math.PI * 2);
            ctx.fill();
          } else if (starType < 0.95) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 200, 150, ${opacity * 0.7})`;
            ctx.arc(star.x, star.y, size * 1.1, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
            ctx.arc(star.x, star.y, size * 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(star.x - size * 3, star.y);
            ctx.lineTo(star.x + size * 3, star.y);
            ctx.moveTo(star.x, star.y - size * 3);
            ctx.lineTo(star.x, star.y + size * 3);
            ctx.stroke();
          }
          
          if (Math.random() < 0.008) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity * 2, 1)})`;
            ctx.arc(star.x, star.y, size * 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
          
          if (Math.random() < 0.02) {
            const twinkle = Math.sin(Date.now() * 0.001 + star.x + star.y) * 0.1;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity + twinkle})`;
            ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          star.prevX = star.x;
          star.prevY = star.y;

          star.z -= 1;
          if (star.z <= 0) {
            star.z = 1000;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
          }

          const x = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
          const y = (star.y - canvas.height / 2) * (canvas.height / star.z) + canvas.height / 2;

          star.x = x;
          star.y = y;

          const size = (1000 - star.z) / 1000 * 1.5;
          const opacity = (1000 - star.z) / 1000 * 0.6;

          if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();

            if (size > 0.3) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
              ctx.lineWidth = size / 3;
              ctx.moveTo(star.prevX, star.prevY);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      // Eliminado: style={{ background: 'linear-gradient(to bottom, #000000, #0a0a2e)' }}
    />
  );
};

export default GalaxyBackground;