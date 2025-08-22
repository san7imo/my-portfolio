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
        src="/assets/img/contact-section/titulo.png"
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

      {/* Imagen del escenario urbano en la parte inferior */}
      <img 
        src="/assets/img/contact-section/fondocontacto1.png"
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