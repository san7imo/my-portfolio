import React, { useEffect, useRef, useState } from 'react';

interface NascentStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
  opacity: number;
  color: 'white' | 'blue' | 'warm';
  twinkle: number;
  targetX: number;
  targetY: number;
  settled: boolean;
}

interface EnergyWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  brightness: number;
}

const InteractiveCosmicCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nascentStarsRef = useRef<NascentStar[]>([]);
  const energyWavesRef = useRef<EnergyWave[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef<number>(0);
  const setClickCount = useState(0)[1];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Crear estrella naciente interactiva
    const createInteractiveStar = (centerX: number, centerY: number, targetX: number, targetY: number) => {
      const angle = Math.atan2(targetY - centerY, targetX - centerX);
      const distance = Math.sqrt((targetX - centerX) ** 2 + (targetY - centerY) ** 2);
      const speed = Math.min(distance / 60, 8);
      
      return {
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        age: 0,
        maxAge: 60,
        size: Math.random() * 1.2 + 0.5,
        opacity: 0,
        color: Math.random() < 0.6 ? 'white' : Math.random() < 0.8 ? 'blue' : 'warm',
        twinkle: Math.random() * Math.PI * 2,
        targetX: targetX,
        targetY: targetY,
        settled: false
      } as NascentStar;
    };

    // Crear partícula de energía
    const createEnergyParticle = (centerX: number, centerY: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      const life = Math.random() * 60 + 30;
      
      return {
        x: centerX + (Math.random() - 0.5) * 15,
        y: centerY + (Math.random() - 0.5) * 15,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        size: Math.random() * 2 + 0.8,
        brightness: Math.random() * 0.8 + 0.4
      };
    };

    // Crear onda de energía
    const createEnergyWave = (centerX: number, centerY: number) => {
      return {
        x: centerX,
        y: centerY,
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 2 + 1
      };
    };

    // Manejar clics en el canvas
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Verificar si el clic está cerca del núcleo
      const distanceToCore = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
      
      if (distanceToCore < 120) {
        setClickCount(prev => prev + 1);
        
        // Crear onda de energía
        energyWavesRef.current.push(createEnergyWave(centerX, centerY));
        
        // Crear partículas de energía
        for (let i = 0; i < 8; i++) {
          particlesRef.current.push(createEnergyParticle(centerX, centerY));
        }
        
        // Generar posiciones aleatorias para las nuevas estrellas
        const numStars = Math.floor(Math.random() * 6) + 4;
        for (let i = 0; i < numStars; i++) {
          const targetX = Math.random() * canvas.width;
          const targetY = Math.random() * canvas.height;
          
          nascentStarsRef.current.push(createInteractiveStar(centerX, centerY, targetX, targetY));
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', handleCanvasClick);

    const draw = () => {
      const { width, height } = canvas;
      
      // Fondo negro profundo
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      timeRef.current += 1;

      // === NÚCLEO DEL BIG BANG ===
      const corePulse = Math.sin(timeRef.current * 0.06) * 12 + Math.sin(timeRef.current * 0.02) * 6;
      const coreRadius = 25 + corePulse;

      // Núcleo interior brillante
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      coreGradient.addColorStop(0, 'rgb(255, 255, 100)');
      coreGradient.addColorStop(0.2, 'rgba(255, 200, 0, 1)');
      coreGradient.addColorStop(0.5, 'rgb(255, 150, 0)');
      coreGradient.addColorStop(0.8, 'rgba(255, 100, 0, 0.7)');
      coreGradient.addColorStop(1, 'rgb(255, 80, 20)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Anillo de energía exterior pulsante
      const energyPulse = Math.sin(timeRef.current * 0.04) * 20;
      const energyRadius = 60 + energyPulse;
      
      const energyGradient = ctx.createRadialGradient(centerX, centerY, coreRadius, centerX, centerY, energyRadius);
      energyGradient.addColorStop(0, 'rgba(255, 220, 20, 0.6)');
      energyGradient.addColorStop(0.4, 'rgba(255, 200, 0, 0.4)');
      energyGradient.addColorStop(0.8, 'rgba(255, 150, 0, 0.2)');
      energyGradient.addColorStop(1, 'rgba(255, 100, 0, 0.1)');
      
      ctx.fillStyle = energyGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, energyRadius, 0, Math.PI * 2);
      ctx.fill();

      // Cursor indicator cuando está sobre el núcleo
      canvas.style.cursor = 'pointer';

      // === ONDAS DE ENERGÍA ===
      energyWavesRef.current = energyWavesRef.current.filter(wave => {
        wave.radius += wave.speed;
        wave.opacity *= 0.992;

        if (wave.radius < wave.maxRadius && wave.opacity > 0.01) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 200, 255, ${wave.opacity})`;
          ctx.lineWidth = 2;
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.stroke();

          return true;
        }
        return false;
      });

      // === PARTÍCULAS DE ENERGÍA ===
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.life > 0) {
          const lifeRatio = particle.life / particle.maxLife;
          const opacity = lifeRatio * particle.brightness * 0.8;
          
          const r = Math.floor(255 * Math.min(1, lifeRatio + 0.5));
          const g = Math.floor(220 * Math.min(1, lifeRatio + 0.3));
          const b = Math.floor(100 * Math.min(1, lifeRatio * 0.5 + 0.8));

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }
        return false;
      });

      // === ESTRELLAS INTERACTIVAS ===
      nascentStarsRef.current = nascentStarsRef.current.filter(star => {
        if (!star.settled) {
          // Mover hacia el objetivo
          const dx = star.targetX - star.x;
          const dy = star.targetY - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 10) {
            star.x += star.vx;
            star.y += star.vy;
            star.age++;
            
            // Fade in durante el viaje
            star.opacity = Math.min(0.8, star.age / 30);
          } else {
            // La estrella ha llegado a su destino
            star.settled = true;
            star.x = star.targetX;
            star.y = star.targetY;
            star.opacity = 0.7;
          }
        }

        // Parpadeo sutil para estrellas establecidas
        if (star.settled) {
          star.twinkle += 0.015;
          star.opacity = 0.7 + Math.sin(star.twinkle) * 0.2;
        }

        // Dibujar estrella
        let r, g, b;
        switch (star.color) {
          case 'blue':
            r = 173; g = 216; b = 230;
            break;
          case 'warm':
            r = 255; g = 200; b = 150;
            break;
          default:
            r = g = b = 255;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        return star.age < star.maxAge + 1000; // Mantener estrellas por mucho tiempo
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleCanvasClick);
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setClickCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 cursor-pointer"
    />
  );
};

export default InteractiveCosmicCanvas;