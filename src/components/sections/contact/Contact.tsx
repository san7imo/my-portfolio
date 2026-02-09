// src/components/sections/contact/Contact.tsx
import { useState, useEffect, useRef } from "react";
import DaySkyWithSunCanvas from "./components/DaySkyWithSunCanvas";
import RocketLanding from "./components/RocketLanding";
import CharacterWithDialog from "./components/CharacterDialog";
import SocialIcons from "./components/SocialMediaContainer";
import useResponsiveLayout from "../../../hooks/useResponsiveLayout";

export default function Contact() {
  const [showRocket, setShowRocket] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ufoRef = useRef<HTMLImageElement>(null);
  
  // Hook de responsividad
  const { positions, breakpoints } = useResponsiveLayout();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Solo activar la animación cuando la sección sea visible y no haya animado antes
          if (entry.isIntersecting && !hasAnimated) {
            console.log("Sección contact visible, iniciando animación...");
            setHasAnimated(true);
            
            // Iniciar la secuencia después de un pequeño delay
            setTimeout(() => {
              setShowRocket(true);
            }, 1000);
          }
        });
      },
      {
        // Configuración del observer
        threshold: 0.3, // Se activa cuando el 30% de la sección es visible
        rootMargin: '0px 0px -100px 0px' // Margen para activar un poco antes
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    // Cleanup
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const updatePosition = () => {
      if (!ufoRef.current) return;
      ufoRef.current.style.setProperty('--ufo-x', `${latestX}px`);
      ufoRef.current.style.setProperty('--ufo-y', `${latestY}px`);
      rafId = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const rawX = event.clientX - rect.left;
      const rawY = event.clientY - rect.top;
      const padding = breakpoints.mobile ? 50 : 80;

      latestX = Math.min(Math.max(rawX, padding), rect.width - padding);
      latestY = Math.min(Math.max(rawY, padding), rect.height - padding);

      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [breakpoints.mobile]);

  const handleRocketLandingComplete = () => {
    console.log("¡Cohete aterrizó exitosamente! 🚀");
    // Mostrar personaje después de que aterrice el cohete
    setTimeout(() => {
      setShowCharacter(true);
    }, 800);
  };

  const handleDialogComplete = () => {
    console.log("¡Diálogo completado! 💬");
    // Mostrar iconos sociales después del diálogo
    setShowSocialIcons(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ padding: breakpoints.mobile ? '20px 10px' : '40px 20px' }}
    >
      {/* Imagen del título - Responsiva */}
      <img 
        src="/assets/img/contact-section/titulo.webp"
        alt="Contáctame"
        className="absolute z-1"
        style={{
          top: positions.title.top,
          left: positions.title.left,
          transform: positions.title.transform,
          maxWidth: positions.title.maxWidth,
          height: 'auto',
        }}
      />

      {/* Fondo canvas - cielo con sol */}
      <DaySkyWithSunCanvas className="absolute inset-0 w-full h-full" />

      {/* OVNI que sigue el cursor */}
      <img 
        ref={ufoRef}
        src="/assets/img/contact-section/ovni.webp"
        alt="OVNI"
        className="absolute pointer-events-none select-none"
        style={{
          zIndex: 12,
          width: breakpoints.mobile ? '50px' : breakpoints.tablet ? '70px' : '80px',
          height: 'auto',
          left: 0,
          top: 0,
          transform: 'translate3d(var(--ufo-x, 70%), var(--ufo-y, 35%), 0) translate(-50%, -50%)',
          transition: 'transform 120ms ease-out',
          ['--ufo-x' as string]: '70%',
          ['--ufo-y' as string]: '35%'
        } as React.CSSProperties}
        loading="lazy"
      />

      {/* Imagen del escenario urbano en la parte inferior */}
      <img 
        src="/assets/img/contact-section/fondocontacto1.webp"
        alt="Escenario urbano"
        className="absolute bottom-0 left-0 w-full h-auto object-contain"
        style={{ zIndex: 1 }}
        loading="lazy"
      />

      {/* Cohete aterrizando - Con posiciones responsivas */}
      {showRocket && (
        <RocketLanding 
          onLandingComplete={handleRocketLandingComplete}
          className="z-10"
          responsiveConfig={positions.rocketLanding}
        />
      )}

      {/* Personaje con diálogo - Responsivo */}
      <CharacterWithDialog 
        isVisible={showCharacter}
        onDialogComplete={handleDialogComplete}
        className="z-20"
        responsiveConfig={{
          character: positions.character,
          dialog: positions.dialog
        }}
      />

      {/* Iconos de redes sociales - Responsivos */}
      <SocialIcons 
        isVisible={showSocialIcons}
        className="z-30"
        responsiveConfig={positions.socialIcons}
      />

          {/* Botón "Acerca de mí" en la parte inferior */}
      <a 
        href="/about"
        className={`
          absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40
          bg-transparent
          hover:from-cyan-400 hover:to-blue-500
          text-white font-bold inline-block
          ${breakpoints.mobile ? 'py-3 px-6 text-sm' : 'py-4 px-8 text-base'}
          rounded-xl shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          transform hover:scale-105 hover:-translate-y-1
          border-2 border-white/20 hover:border-white/40
          backdrop-blur-sm
        `}
      >
        ✨ Acerca de san7imo
      </a>

      {/* Contenido por defecto mientras esperamos */}
      {!showRocket && (
        <div className="relative z-10 text-center">
          <div className="animate-pulse">
            <h2 
              className={`font-bold text-cyan-400 mb-4 ${
                breakpoints.mobile ? 'text-2xl' : 
                breakpoints.tablet ? 'text-3xl' : 'text-4xl'
              }`}
            >
              🚀 Preparando el aterrizaje...
            </h2>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
