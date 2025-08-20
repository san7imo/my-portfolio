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

const SpaceBackground: React.FC = () => {
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
      // Ajustamos la altura para que cubra todo el contenido de la página.
      // Esto es crucial para que el gradiente sea continuo en todas las secciones.
      canvas.height = document.documentElement.scrollHeight; 
      console.log('Canvas resized:', canvas.width, 'x', canvas.height, 'Scroll Height:', document.documentElement.scrollHeight); // Para depuración
      initializeStars();
    };

    const initializeStars = () => {
      // Más estrellas para cubrir un espacio más grande
      const numStars = 1000; 
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // Mayoría estáticas, algunas parpadeantes
        z: Math.random() < 0.95 ? Math.random() * 500 + 500 : Math.random() * 500,
        prevX: Math.random() * canvas.width,
        prevY: Math.random() * canvas.height,
      }));
    };

    const createShootingStar = (): ShootingStar => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;

      switch (side) {
        case 0: // Desde arriba
          x = Math.random() * canvas.width; 
          y = -10; 
          vx = (Math.random() - 0.5) * 4; 
          vy = Math.random() * 3 + 2; 
          break;
        case 1: // Desde derecha
          x = canvas.width + 10; 
          y = Math.random() * canvas.height; 
          vx = -(Math.random() * 3 + 2); 
          vy = (Math.random() - 0.5) * 4; 
          break;
        case 2: // Desde abajo
          x = Math.random() * canvas.width; 
          y = canvas.height + 10; 
          vx = (Math.random() - 0.5) * 4; 
          vy = -(Math.random() * 3 + 2); 
          break;
        default: // Desde izquierda
          x = -10; 
          y = Math.random() * canvas.height; 
          vx = Math.random() * 3 + 2; 
          vy = (Math.random() - 0.5) * 4;
      }

      const maxLife = Math.random() * 60 + 40;
      return { x, y, vx, vy, life: maxLife, maxLife, brightness: Math.random() * 0.8 + 0.2 };
    };

    // Ajusta el canvas al tamaño inicial y a los cambios de tamaño de la ventana
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // También ajusta si el contenido de la página cambia de altura (ej. carga de imágenes)
    const observer = new ResizeObserver(() => resizeCanvas());
    observer.observe(document.body);

    const animate = () => {
      // Limpiar canvas para redibujar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradiente continuo para todo el fondo: de espacio profundo a cielo azul
      const continuousGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Hero: Negro completamente (0% a 20% de la altura total)
      continuousGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');          
      continuousGradient.addColorStop(0.20, 'rgba(0, 0, 0, 1)');       

      // Technologies: Transición de negro a azul medianoche (20% a 40%)
      continuousGradient.addColorStop(0.20, 'rgba(0, 0, 0, 1)');        // Reafirma el negro al inicio de la transición
      continuousGradient.addColorStop(0.40, 'rgba(25, 25, 80, 0.9)');   // Azul medianoche

      // Projects: Permanece en azul medianoche, pero un poco más claro al final (40% a 60%)
      continuousGradient.addColorStop(0.40, 'rgba(25, 25, 80, 0.9)');   // Reafirma azul medianoche
      continuousGradient.addColorStop(0.55, 'rgba(25, 25, 80, 0.9)');   // Permanece azul medianoche
      continuousGradient.addColorStop(0.60, 'rgba(35, 35, 95, 0.85)');  // Ligeramente más claro al final de Projects

      // Skills: Azul noche (clarito), cambiando a azul cielo (60% a 80%)
      continuousGradient.addColorStop(0.60, 'rgba(35, 35, 95, 0.85)');  // Reafirma azul claro del espacio
      continuousGradient.addColorStop(0.80, 'rgba(135, 206, 235, 0.5)');// Azul cielo (con transparencia para estrellas)

      // Contact: Azul cielo toda (80% a 100%)
      continuousGradient.addColorStop(0.80, 'rgba(135, 206, 235, 0.5)');// Reafirma azul cielo
      continuousGradient.addColorStop(1, 'rgba(135, 206, 235, 0.5)');  // Permanece azul cielo

      ctx.fillStyle = continuousGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Estrellas fugaces
      if (Math.random() < 0.003) {
        shootingStarsRef.current.push(createShootingStar());
      }

      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life--;

        if (star.life > 0) {
          const opacity = (star.life / star.maxLife) * star.brightness;
          const tailLength = Math.min(20, star.maxLife - star.life);
          
          for (let i = 0; i < tailLength; i++) {
            const trailOpacity = opacity * (1 - i / tailLength) * 0.7;
            const trailX = star.x - star.vx * i * 0.5;
            const trailY = star.y - star.vy * i * 0.5;
            
            if (trailX >= 0 && trailX <= canvas.width && trailY >= 0 && trailY <= canvas.height) {
              ctx.beginPath();
              ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
              ctx.arc(trailX, trailY, Math.max(0.5, 2 - i * 0.1), 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          if (star.x >= 0 && star.x <= canvas.width && 
              star.y >= 0 && star.y <= canvas.height) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = `rgba(200, 220, 255, ${opacity * 0.5})`;
            ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          
          return true;
        }
        
        return false;
      });

      // Estrellas de fondo
      starsRef.current.forEach((star) => {
        if (star.z > 500) { // Estrellas estáticas
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
          } else {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.7})`; // Ajustado para ser más sutil
            ctx.arc(star.x, star.y, size * 1.1, 0, Math.PI * 2);
            ctx.fill();
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
        } else { // Estrellas en movimiento
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
      observer.disconnect();
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Cambiado de 'fixed' a 'absolute' para que se desplace con el contenido
      className="absolute inset-0 w-full h-full z-0" 
    />
  );
};

export default SpaceBackground;
