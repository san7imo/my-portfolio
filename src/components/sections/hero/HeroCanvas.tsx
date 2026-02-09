import React, { useEffect, useRef } from 'react';

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
  drag: number;
  gravity: number;
  type: 'energy' | 'spark' | 'ember' | 'smoke';
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  thickness: number;
}

interface InteractiveCosmicCanvasProps {
  requiredClicks?: number;
  onProgress?: (count: number, required: number) => void;
  onCoreClicks?: (total: number) => void;
  onUnlock?: () => void;
}

const InteractiveCosmicCanvas: React.FC<InteractiveCosmicCanvasProps> = ({
  requiredClicks = 5,
  onProgress,
  onCoreClicks,
  onUnlock
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nascentStarsRef = useRef<NascentStar[]>([]);
  const energyWavesRef = useRef<EnergyWave[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const explosionRef = useRef<{ age: number; maxAge: number } | null>(null);
  const timeRef = useRef<number>(0);
  const clickStreakRef = useRef<number>(0);
  const unlockedRef = useRef<boolean>(false);
  const flashRef = useRef<number>(0);
  const totalCoreClicksRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

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
      const speed = Math.random() * 3 + 1.5;
      const life = Math.random() * 60 + 30;
      
      return {
        x: centerX + (Math.random() - 0.5) * 15,
        y: centerY + (Math.random() - 0.5) * 15,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        size: Math.random() * 2 + 0.8,
        brightness: Math.random() * 0.8 + 0.4,
        drag: 0.99,
        gravity: 0,
        type: 'energy'
      };
    };

    const createSparkParticle = (centerX: number, centerY: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomRange(5, 12);
      const life = randomRange(25, 55);

      return {
        x: centerX + (Math.random() - 0.5) * 8,
        y: centerY + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        size: randomRange(0.8, 1.8),
        brightness: randomRange(0.8, 1.2),
        drag: 0.965,
        gravity: 0.05,
        type: 'spark'
      };
    };

    const createEmberParticle = (centerX: number, centerY: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomRange(1, 4);
      const life = randomRange(80, 140);

      return {
        x: centerX + (Math.random() - 0.5) * 12,
        y: centerY + (Math.random() - 0.5) * 12,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        size: randomRange(1.5, 3),
        brightness: randomRange(0.5, 0.9),
        drag: 0.985,
        gravity: 0.02,
        type: 'ember'
      };
    };

    const createSmokeParticle = (centerX: number, centerY: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomRange(0.5, 1.8);
      const life = randomRange(120, 200);

      return {
        x: centerX + (Math.random() - 0.5) * 18,
        y: centerY + (Math.random() - 0.5) * 18,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        size: randomRange(8, 16),
        brightness: randomRange(0.2, 0.4),
        drag: 0.985,
        gravity: -0.01,
        type: 'smoke'
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

    const createShockwave = (centerX: number, centerY: number) => {
      return {
        x: centerX,
        y: centerY,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * randomRange(0.7, 1.1),
        opacity: randomRange(0.3, 0.6),
        speed: randomRange(5, 8),
        thickness: randomRange(6, 12)
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
        totalCoreClicksRef.current += 1;
        onCoreClicks?.(totalCoreClicksRef.current);

        if (!unlockedRef.current) {
          clickStreakRef.current = Math.min(requiredClicks, clickStreakRef.current + 1);
          onProgress?.(clickStreakRef.current, requiredClicks);
        }

        // Crear onda de energía
        energyWavesRef.current.push(createEnergyWave(centerX, centerY));
        
        // Crear partículas de energía
        for (let i = 0; i < 10; i++) {
          particlesRef.current.push(createEnergyParticle(centerX, centerY));
        }

        // Chispas cortas para sensación de impacto
        for (let i = 0; i < 6; i++) {
          particlesRef.current.push(createSparkParticle(centerX, centerY));
        }
        
        // Generar posiciones aleatorias para las nuevas estrellas
        const numStars = unlockedRef.current
          ? Math.floor(Math.random() * 10) + 8
          : Math.floor(Math.random() * 6) + 6;
        for (let i = 0; i < numStars; i++) {
          const targetX = Math.random() * canvas.width;
          const targetY = Math.random() * canvas.height;
          
          nascentStarsRef.current.push(createInteractiveStar(centerX, centerY, targetX, targetY));
        }

        if (!unlockedRef.current && clickStreakRef.current >= requiredClicks) {
          unlockedRef.current = true;
          flashRef.current = 1;
          explosionRef.current = { age: 0, maxAge: 90 };
          onUnlock?.();

          // Explosión extra: más ondas y partículas para iluminar todo
          for (let i = 0; i < 6; i++) {
            energyWavesRef.current.push(createEnergyWave(centerX, centerY));
          }
          for (let i = 0; i < 3; i++) {
            shockwavesRef.current.push(createShockwave(centerX, centerY));
          }
          for (let i = 0; i < 80; i++) {
            particlesRef.current.push(createSparkParticle(centerX, centerY));
          }
          for (let i = 0; i < 70; i++) {
            particlesRef.current.push(createEmberParticle(centerX, centerY));
          }
          for (let i = 0; i < 30; i++) {
            particlesRef.current.push(createEnergyParticle(centerX, centerY));
          }
          for (let i = 0; i < 25; i++) {
            particlesRef.current.push(createSmokeParticle(centerX, centerY));
          }
          for (let i = 0; i < 80; i++) {
            const targetX = Math.random() * canvas.width;
            const targetY = Math.random() * canvas.height;
            nascentStarsRef.current.push(createInteractiveStar(centerX, centerY, targetX, targetY));
          }
        }
      } else if (!unlockedRef.current && clickStreakRef.current > 0) {
        clickStreakRef.current = 0;
        onProgress?.(0, requiredClicks);
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

      // === ONDAS DE CHOQUE ===
      shockwavesRef.current = shockwavesRef.current.filter(wave => {
        wave.radius += wave.speed;
        wave.opacity *= 0.985;

        if (wave.radius < wave.maxRadius && wave.opacity > 0.02) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.strokeStyle = `rgba(255, 220, 140, ${wave.opacity})`;
          ctx.lineWidth = wave.thickness;
          ctx.shadowBlur = 25;
          ctx.shadowColor = `rgba(255, 210, 120, ${wave.opacity})`;
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          return true;
        }
        return false;
      });

      // === BOLA DE FUEGO ===
      if (explosionRef.current) {
        const explosion = explosionRef.current;
        explosion.age += 1;
        const progress = explosion.age / explosion.maxAge;

        if (progress >= 1) {
          explosionRef.current = null;
        } else {
          const grow = easeOutCubic(Math.min(1, progress * 1.15));
          const fade = 1 - progress;
          const maxRadius = Math.min(width, height) * 0.55;
          const radius = maxRadius * grow;
          const fireballGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
          fireballGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`);
          fireballGradient.addColorStop(0.25, `rgba(255, 230, 160, ${0.7 * fade})`);
          fireballGradient.addColorStop(0.6, `rgba(255, 160, 80, ${0.5 * fade})`);
          fireballGradient.addColorStop(1, `rgba(120, 60, 20, ${0.2 * fade})`);

          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = fireballGradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

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

      // === PARTÍCULAS ===
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.vx *= particle.drag;
        particle.vy = (particle.vy + particle.gravity) * particle.drag;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.life > 0) {
          const lifeRatio = particle.life / particle.maxLife;
          const opacity = lifeRatio * particle.brightness;

          if (particle.type === 'smoke') {
            const smokeOpacity = opacity * 0.35;
            const shade = Math.floor(120 + (1 - lifeRatio) * 40);
            ctx.beginPath();
            ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${smokeOpacity})`;
            ctx.arc(particle.x, particle.y, particle.size * (1 + (1 - lifeRatio) * 0.4), 0, Math.PI * 2);
            ctx.fill();
            return true;
          }

          if (particle.type === 'spark') {
            const heat = Math.min(1, lifeRatio * 1.2);
            const r = 255;
            const g = Math.floor(220 * heat + 35);
            const b = Math.floor(120 * heat);
            ctx.save();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.lineWidth = particle.size;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(255, 200, 120, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x - particle.vx * 2.2, particle.y - particle.vy * 2.2);
            ctx.stroke();
            ctx.restore();
            return true;
          }

          if (particle.type === 'ember') {
            const r = 255;
            const g = Math.floor(120 + 80 * lifeRatio);
            const b = Math.floor(40 + 40 * lifeRatio);
            ctx.save();
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.9})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(255, 140, 60, ${opacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            return true;
          }

          const r = Math.floor(255 * Math.min(1, lifeRatio + 0.5));
          const g = Math.floor(220 * Math.min(1, lifeRatio + 0.3));
          const b = Math.floor(100 * Math.min(1, lifeRatio * 0.5 + 0.8));

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`;
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

      // === EXPLOSIÓN LUMINOSA ===
      if (flashRef.current > 0) {
        flashRef.current = Math.max(0, flashRef.current - 0.02);
        const flash = flashRef.current;
        const maxRadius = Math.max(width, height) * 1.2;
        const flashGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
        flashGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * flash})`);
        flashGradient.addColorStop(0.4, `rgba(255, 240, 200, ${0.5 * flash})`);
        flashGradient.addColorStop(1, `rgba(255, 255, 255, ${0.05 * flash})`);

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = flashGradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

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
  }, [onProgress, onCoreClicks, onUnlock, requiredClicks]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 cursor-pointer"
      aria-label="Lienzo interactivo del cosmos"
    />
  );
};

export default InteractiveCosmicCanvas;
