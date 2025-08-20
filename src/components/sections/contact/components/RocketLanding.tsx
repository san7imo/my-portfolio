import React, { useEffect, useRef, useState } from "react";

interface RocketLandingProps {
  onLandingComplete: () => void;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  type: 'flame' | 'exhaust' | 'smoke';
}

interface RocketState {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  phase: 'approaching' | 'landing' | 'landed';
  flames: Particle[];
  particles: Particle[];
  landingTarget: { x: number; y: number };
}

const RocketLanding: React.FC<RocketLandingProps> = ({
  onLandingComplete,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const rocketImageRef = useRef<HTMLImageElement>(null);
  const [isLanding, setIsLanding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Posición y estado del cohete
  const rocketState = useRef<RocketState>({
    x: -150,
    y: -100,
    rotation: 25,
    scale: 1.0,
    phase: 'approaching',
    flames: [],
    particles: [],
    landingTarget: { x: 0, y: 0 },
  });

  // Cargar imagen del cohete
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      rocketImageRef.current = img;
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.warn('No se pudo cargar la imagen del cohete, usando fallback');
      setImageLoaded(true);
    };
    img.src = "/assets/img/contact-section/cohete.png";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      rocketState.current.landingTarget = {
        x: canvas.width * 0.79,
        y: canvas.height * 0.48,
      };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    setTimeout(() => {
      setIsLanding(true);
    }, 500);

    const createFlameParticle = (): Particle => ({
      x: rocketState.current.x + (Math.random() - 0.5) * 15,
      y: rocketState.current.y + 135 * rocketState.current.scale, // Más abajo para cohete grande
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 2 + 1.5,
      life: 1,
      size: Math.random() * 15 + 8,
      color: Math.random() > 0.6 ? '#FF4500' : Math.random() > 0.3 ? '#FF6B35' : '#FFD700',
      type: 'flame'
    });

    const createExhaustParticle = (): Particle => ({
      x: rocketState.current.x + (Math.random() - 0.5) * 12,
      y: rocketState.current.y + 150 * rocketState.current.scale, // Ligeramente más abajo que las llamas
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 3 + 2,
      life: 1,
      size: Math.random() * 10 + 6,
      color: Math.random() > 0.5 ? '#87CEEB' : '#B0E0E6',
      type: 'exhaust'
    });

    const createSmokeParticle = (): Particle => ({
      x: rocketState.current.x + (Math.random() - 0.5) * 18,
      y: rocketState.current.y + 155 * rocketState.current.scale, // Más abajo, sale después del fuego
      vx: (Math.random() - 0.5) * 1,
      vy: Math.random() * 1 + 0.8,
      life: 1,
      size: Math.random() * 16 + 12,
      color: `rgba(${120 + Math.random() * 30}, ${120 + Math.random() * 30}, ${120 + Math.random() * 30}, 0.7)`,
      type: 'smoke'
    });

    const drawRocket = () => {
      const rocket = rocketState.current;
      const img = rocketImageRef.current;
      
      ctx.save();
      ctx.translate(rocket.x, rocket.y);
      ctx.rotate((rocket.rotation * Math.PI) / 180);
      ctx.scale(rocket.scale, rocket.scale);

      if (img) {
        const baseWidth = 200;
        const aspectRatio = img.height / img.width;
        const imgWidth = baseWidth;
        const imgHeight = baseWidth * aspectRatio;
        
        ctx.drawImage(
          img, 
          -imgWidth / 2,
          -imgHeight / 2,
          imgWidth, 
          imgHeight
        );
      } else {
        // Fallback
        ctx.fillStyle = '#E6E6FA';
        ctx.fillRect(-25, -50, 50, 100);
        
        ctx.fillStyle = '#FF6B35';
        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.lineTo(-25, -25);
        ctx.lineTo(25, -25);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const drawFlames = () => {
      rocketState.current.flames.forEach((flame: Particle, index: number) => {
        ctx.save();
        ctx.globalAlpha = flame.life;
        
        if (flame.type === 'flame') {
          // Llamas más realistas con gradiente cónico
          const gradient = ctx.createRadialGradient(
            flame.x, flame.y, 0,
            flame.x, flame.y, flame.size
          );
          gradient.addColorStop(0, flame.color);
          gradient.addColorStop(0.2, flame.color + 'DD'); // Núcleo más intenso
          gradient.addColorStop(0.5, flame.color + '88'); // Transición suave
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          
          // Forma más alargada para las llamas
          ctx.save();
          ctx.scale(1.2, 2); // Más ancho y alto para mayor visibilidad
          ctx.beginPath();
          ctx.arc(flame.x / 1.2, flame.y / 2, flame.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          
        } else if (flame.type === 'exhaust') {
          // Escape azul más definido
          const gradient = ctx.createRadialGradient(
            flame.x, flame.y, 0,
            flame.x, flame.y, flame.size
          );
          gradient.addColorStop(0, flame.color);
          gradient.addColorStop(0.5, flame.color + 'AA');
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          
          ctx.beginPath();
          ctx.arc(flame.x, flame.y, flame.size, 0, Math.PI * 2);
          ctx.fill();
          
        } else if (flame.type === 'smoke') {
          // Humo más difuso
          const gradient = ctx.createRadialGradient(
            flame.x, flame.y, 0,
            flame.x, flame.y, flame.size * 1.2
          );
          gradient.addColorStop(0, flame.color);
          gradient.addColorStop(0.6, flame.color.replace(/0\.[0-9]/, '0.3'));
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          
          ctx.beginPath();
          ctx.arc(flame.x, flame.y, flame.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();

        // Física mejorada por tipo de partícula
        flame.x += flame.vx;
        flame.y += flame.vy;
        
        if (flame.type === 'flame') {
          // Las llamas se consumen rápido y tienen poca expansión
          flame.life -= 0.035; // Vida un poco más larga para mayor visibilidad
          flame.size *= 0.96;  // Se reducen más lentamente
          flame.vy += 0.05;
          flame.vx *= 0.96;
          
        } else if (flame.type === 'exhaust') {
          // El escape es más persistente pero controlado
          flame.life -= 0.025;
          flame.size *= 0.97;
          flame.vy += 0.08;
          flame.vx *= 0.98;
          
        } else if (flame.type === 'smoke') {
          // El humo se dispersa lentamente
          flame.life -= 0.015;
          flame.size *= 0.998; // Crece ligeramente
          flame.vy += 0.02;    // Muy poca gravedad
          flame.vx *= 0.99;    // Menos resistencia
        }

        // Remover partículas muertas o que hayan bajado mucho
        const maxDistance = 80; // Límite de distancia desde el cohete
        const distanceFromRocket = Math.sqrt(
          (flame.x - rocketState.current.x) ** 2 + 
          (flame.y - rocketState.current.y) ** 2
        );
        
        if (flame.life <= 0 || flame.size < 0.5 || distanceFromRocket > maxDistance) {
          rocketState.current.flames.splice(index, 1);
        }
      });

      // Generar nuevas partículas con mayor frecuencia para mejor visibilidad
      if (rocketState.current.phase === 'approaching' || rocketState.current.phase === 'landing') {
        // Llamas principales (mayor frecuencia)
        for (let i = 0; i < 5; i++) {
          rocketState.current.flames.push(createFlameParticle());
        }
        // Escape azul (más frecuente)
        if (Math.random() > 0.2) {
          for (let i = 0; i < 3; i++) {
            rocketState.current.flames.push(createExhaustParticle());
          }
        }
        // Humo (más ocasional pero presente)
        if (Math.random() > 0.3) {
          rocketState.current.flames.push(createSmokeParticle());
        }
      }
    };

    const animate = () => {
      if (!isLanding) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rocket = rocketState.current;
      const target = rocket.landingTarget;

      if (rocket.phase === 'approaching') {
        const dx = target.x - rocket.x;
        const dy = target.y - rocket.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 80) {
          rocket.x += dx * 0.018;
          rocket.y += dy * 0.012;
          
          if (rocket.rotation > 0) {
            rocket.rotation -= 0.4;
          }
          
          rocket.x += Math.sin(Date.now() * 0.005) * 0.5;
        } else {
          rocket.phase = 'landing';
        }
      } else if (rocket.phase === 'landing') {
        const dx = target.x - rocket.x;
        const dy = target.y - rocket.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 15) {
          rocket.x += dx * 0.008;
          rocket.y += dy * 0.006;
          
          if (rocket.rotation > 0) {
            rocket.rotation -= 0.8;
          } else if (rocket.rotation < 0) {
            rocket.rotation += 0.8;
          }
        } else {
          rocket.phase = 'landed';
          rocket.rotation = 0;
          
          setTimeout(() => {
            onLandingComplete();
          }, 1200);
        }
      }

      drawFlames();
      drawRocket();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLanding, onLandingComplete, imageLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 5 }}
    />
  );
};

export default RocketLanding;