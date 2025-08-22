import React, { useState, useEffect } from "react";

interface ResponsiveCharacterConfig {
  character: {
    bottom: string;
    right: string;
    height: string;
  };
  dialog: {
    bottom: string;
    right: string;
    maxWidth: string;
    fontSize: string;
    padding: string;
  };
}

interface CharacterWithDialogProps {
  isVisible: boolean;
  onDialogComplete: () => void;
  className?: string;
  responsiveConfig: ResponsiveCharacterConfig;
}

const CharacterWithDialog: React.FC<CharacterWithDialogProps> = ({
  isVisible,
  onDialogComplete,
  className = "",
  responsiveConfig,
}) => {
  const [showCharacter, setShowCharacter] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  
  const dialogText = "Hemos terminado la exploración y estoy listo para una próxima aventura. Tú marcas la ruta. ¡Contáctame! 🚀";

  useEffect(() => {
    if (!isVisible) return;

    // Mostrar personaje primero
    const characterTimer = setTimeout(() => {
      setShowCharacter(true);
    }, 500);

    // Mostrar burbuja de diálogo después con texto completo
    const dialogTimer = setTimeout(() => {
      setShowDialog(true);
      setDisplayedText(dialogText); // Mostrar todo el texto de una vez
      setTimeout(() => {
        onDialogComplete();
      }, 1500);
    }, 1200);

    return () => {
      clearTimeout(characterTimer);
      clearTimeout(dialogTimer);
    };
  }, [isVisible, dialogText, onDialogComplete]);

  if (!isVisible) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Personaje - Posición responsiva */}
      <div 
        className={`absolute transition-all duration-3000 transform ${
          showCharacter 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-10'
        }`}
        style={{
          bottom: responsiveConfig.character.bottom,
          right: responsiveConfig.character.right,
          zIndex: 20,
        }}
      >
        <img 
          src="/assets/img/contact-section/personaje.png"
          alt="Personaje explorador"
          className="object-contain"
          style={{
            height: responsiveConfig.character.height,
          }}
        />
      </div>

      {/* Burbuja de diálogo - Posición responsiva */}
      <div 
        className={`absolute transition-all duration-1000 transform ${
          showDialog 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-8'
        }`}
        style={{
          bottom: responsiveConfig.dialog.bottom,
          right: responsiveConfig.dialog.right,
          zIndex: 21,
        }}
      >
        <div 
          className="relative bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30"
          style={{
            maxWidth: responsiveConfig.dialog.maxWidth,
            padding: responsiveConfig.dialog.padding,
          }}
        >
          {/* Punta de la burbuja */}
          <div className="absolute bottom-0 right-12 transform translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/20"></div>
            <div className="absolute top-0 left-0 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/30 transform translate-y-0.5"></div>
          </div>

          {/* Texto del diálogo - Tamaño responsivo */}
          <p 
            className="text-black font-semibold leading-relaxed drop-shadow-sm"
            style={{
              fontSize: responsiveConfig.dialog.fontSize,
            }}
          >
            {displayedText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterWithDialog;