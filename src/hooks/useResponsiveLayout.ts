// src/hooks/useResponsiveLayout.ts
import { useState, useEffect } from 'react';

export interface ResponsiveBreakpoints {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  large: boolean;
}

export interface ResponsivePositions {
  // Posiciones del cohete
  rocketLanding: {
    x: number; // Porcentaje del ancho de pantalla (0-1)
    y: number; // Porcentaje del alto de pantalla (0-1)
    scale: number; // Escala del cohete
  };
  
  // Posiciones del título
  title: {
    top: string;
    maxWidth: string;
    left: string;
    transform: string;
  };
  
  // Posiciones del personaje
  character: {
    bottom: string;
    right: string;
    height: string;
  };
  
  // Posiciones de la burbuja de diálogo
  dialog: {
    bottom: string;
    right: string;
    maxWidth: string;
    fontSize: string;
    padding: string;
  };
  
  // Posiciones de iconos sociales
  socialIcons: {
    position: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      transform?: string;
    };
    iconSize: number;
    spacing: string;
    flexDirection: 'row' | 'column';
  };
}

const useResponsiveLayout = () => {
  const [breakpoints, setBreakpoints] = useState<ResponsiveBreakpoints>({
    mobile: false,
    tablet: false,
    desktop: false,
    large: false,
  });

  const [positions, setPositions] = useState<ResponsivePositions>({
    rocketLanding: { x: 0.79, y: 0.48, scale: 1.0 },
    title: {
      top: '60px',
      maxWidth: '200px',
  
      left: '50%',
      transform: 'translateX(-50%)'
    },
    character: {
      bottom: '80px',
      right: '210px',
      height: '260px'
    },
    dialog: {
      bottom: '320px',
      right: '217px',
      maxWidth: '320px',
      fontSize: '14px',
      padding: '24px'
    },
    socialIcons: {
      position: {
        top: '620px',
        left: '664px',
        transform: 'translate(-50%, -50%)'
      },
      iconSize: 40,
      spacing: 'space-x-8',
      flexDirection: 'row'
    }
  });

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      
      // Determinar breakpoints
      const newBreakpoints = {
        mobile: width < 768,
        tablet: width >= 768 && width < 1024,
        desktop: width >= 1024 && width < 1280,
        large: width >= 1280,
      };

      setBreakpoints(newBreakpoints);

      // Configurar posiciones según breakpoint
      let newPositions: ResponsivePositions;

      if (newBreakpoints.mobile) {
        // Móviles (< 768px)
        newPositions = {
          rocketLanding: { 
            x: 0.8, // Centro horizontal
            y: 0.8, // Un poco más abajo del centro
            scale: 0.5 // Más pequeño
          },
          title: {
            top: '230px',
            maxWidth: '100vw',
            left: '50%',
            transform: 'translateX(-50%)'
          },
          character: {
            bottom: '27px',
            right: '250px',
            height: '100px'
          },
          dialog: {
            bottom: '125px',
            right: '200px',
            maxWidth: '50vw',
            fontSize: '12px',
            padding: '16px'
          },
          socialIcons: {
            position: {
              bottom: '450px',
              left: '50%',
              transform: 'translateX(-50%)'
            },
            iconSize: 32,
            spacing: 'space-x-4',
            flexDirection: 'row'
          }
        };
      } else if (newBreakpoints.tablet) {
        // Tablets (768px - 1024px)
        newPositions = {
          rocketLanding: { 
            x: 0.8,
            y: 0.72,
            scale: 0.7
          },
          title: {
            top: '150px',
            maxWidth: '100vw',
            left: '50%',
            transform: 'translateX(-50%)'
          },
          character: {
            bottom: '35px',
            right: '540px',
            height: '180px'
          },
          dialog: {
            bottom: '200px',
            right: '520px',
            maxWidth: '300px',
            fontSize: '13px',
            padding: '20px'
          },
          socialIcons: {
            position: {
              bottom: '630px',
              left: '50%',
              transform: 'translateX(-50%)'
            },
            iconSize: 36,
            spacing: 'space-x-6',
            flexDirection: 'row'
          }
        };
      } else if (newBreakpoints.desktop) {
        // Desktop (1024px - 1280px)
        newPositions = {
          rocketLanding: { 
            x: 0.72,
            y: 0.48,
            scale: 0.85
          },
          title: {
            top: '50px',
            maxWidth: '350px',
            left: '50%',
            transform: 'translateX(-50%)'
          },
          character: {
            bottom: '75px',
            right: '120px',
            height: '220px'
          },
          dialog: {
            bottom: '300px',
            right: '130px',
            maxWidth: '310px',
            fontSize: '14px',
            padding: '22px'
          },
          socialIcons: {
            position: {
              top: '580px',
              left: '50%',
              transform: 'translateX(-50%)'
            },
            iconSize: 38,
            spacing: 'space-x-7',
            flexDirection: 'row'
          }
        };
      } else {
        // Large screens (>= 1280px) - Configuración original
        newPositions = {
          rocketLanding: { 
            x: 0.79,
            y: 0.48,
            scale: 1.0
          },
          title: {
            top: '60px',
            maxWidth: '70vw',
            left: '50%',
            transform: 'translateX(-50%)'
          },
          character: {
            bottom: '80px',
            right: '810px',
            height: '260px'
          },
          dialog: {
            bottom: '320px',
            right: '817px',
            maxWidth: '320px',
            fontSize: '14px',
            padding: '24px'
          },
          socialIcons: {
            position: {
              top: '620px',
              left: '664px',
              transform: 'translate(-50%, -50%)'
            },
            iconSize: 40,
            spacing: 'space-x-8',
            flexDirection: 'row'
          }
        };
      }

      setPositions(newPositions);
    };

    // Llamar inmediatamente y en resize
    updateLayout();
    window.addEventListener('resize', updateLayout);
    
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return {
    breakpoints,
    positions,
    // Helpers
    isMobile: breakpoints.mobile,
    isTablet: breakpoints.tablet,
    isDesktop: breakpoints.desktop,
    isLarge: breakpoints.large,
  };
};

export default useResponsiveLayout;