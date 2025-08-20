import React, { useState, useEffect } from "react";

interface CharacterWithDialogProps {
  isVisible: boolean;
  onDialogComplete: () => void;
  className?: string;
}

const CharacterWithDialog: React.FC<CharacterWithDialogProps> = ({
  isVisible,
  onDialogComplete,
  className = "",
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
      {/* Personaje */}
      <div 
        className={`absolute transition-all duration-3000 transform ${
          showCharacter 
            ? 'bottom-20 right-210 opacity-100 scale-100 translate-y-0' 
            : 'bottom-50 right-50 opacity-0 scale-10 translate-y-10'
        }`}
        style={{ zIndex: 20 }}
      >
        {/* 
        PARA CAMBIAR POSICIÓN DEL PERSONAJE:
        Modifica estas clases CSS:
        - bottom-20: distancia desde abajo (bottom-0, bottom-4, bottom-8, bottom-16, bottom-20, bottom-32, etc.)
        - right-20: distancia desde derecha (right-0, right-4, right-8, right-16, right-20, right-32, etc.)
        
        PARA CAMBIAR TAMAÑO DEL PERSONAJE:
        Modifica estas clases en la imagen:
        - w-32 h-32: tamaño actual (128px x 128px)
        - Opciones: w-16 h-16 (64px), w-24 h-24 (96px), w-40 h-40 (160px), w-48 h-48 (192px)
        
        O usa valores personalizados con style:
        style={{ bottom: '100px', right: '150px', zIndex: 20 }}
        */}
        <img 
          src="/assets/img/contact-section/personaje.png"
          alt="Personaje explorador"
          className="h-65 object-contain"
        />
      </div>

      {/* Burbuja de diálogo completamente transparente */}
      <div 
        className={`absolute transition-all duration-1000 transform ${
          showDialog 
            ? 'bottom-80 right-217 opacity-100 scale-100 translate-y-0' 
            : 'bottom-32 right-4 opacity-0 scale-75 translate-y-8'
        }`}
        style={{ zIndex: 21 }}
      >
        {/* 
        PARA CAMBIAR POSICIÓN DE LA BURBUJA:
        Modifica estas clases:
        - bottom-40: distancia desde abajo
        - right-8: distancia desde derecha
        */}
        <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 max-w-xs">
          {/* Punta de la burbuja */}
          <div className="absolute bottom-0 right-12 transform translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/20"></div>
            <div className="absolute top-0 left-0 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/30 transform translate-y-0.5"></div>
          </div>

          {/* Texto del diálogo - aparece completo */}
          <p className="text-black font-semibold text-sm leading-relaxed drop-shadow-sm">
            {displayedText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterWithDialog;