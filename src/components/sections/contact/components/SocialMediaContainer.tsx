import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

interface ResponsiveSocialConfig {
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
}

interface SocialIconsProps {
  isVisible: boolean;
  className?: string;
  responsiveConfig: ResponsiveSocialConfig;
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  isVisible,
  className = "",
  responsiveConfig,
}) => {
  const [showIcons, setShowIcons] = useState(false);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/sam7imo",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/san7imo",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:san7imo@gmail.com",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/+573116566530",
    }
  ];

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowIcons(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const { position, iconSize, spacing, flexDirection } = responsiveConfig;

  return (
    <>
      {/* Estilos CSS para el efecto LED */}
      <style>{`
        @keyframes ledGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px #8b5cf6) drop-shadow(0 0 16px #3b82f6) drop-shadow(0 0 24px #8b5cf6);
          }
          50% {
            filter: drop-shadow(0 0 12px #3b82f6) drop-shadow(0 0 24px #8b5cf6) drop-shadow(0 0 32px #3b82f6);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .led-icon {
          color: rgb(255, 255, 255);
          animation: ledGlow 2s ease-in-out infinite, pulse 3s ease-in-out infinite;
        }
        
        .led-icon:hover {
          color: #3b82f6;
          animation: ledGlow 0.5s ease-in-out infinite, pulse 1s ease-in-out infinite;
          transform: scale(1.3);
        }
      `}</style>
      
      <div 
        className={`absolute ${className}`}
        style={{
          ...position,
          zIndex: 25,
        }}
      >
        {/* Distribución de iconos según configuración responsiva */}
        <div 
          className={`flex items-center ${
            flexDirection === 'row' ? spacing : 'space-y-4 flex-col'
          }`}
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            
            return (
              <div
                key={social.name}
                className={`transform transition-all duration-700 ${
                  showIcons 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-10 opacity-0 scale-75'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block p-3 transition-all duration-300 bg-transparent bg-opacity-20 rounded-xl backdrop-blur-sm border border-white border-opacity-10 hover:bg-opacity-30"
                  title={social.name}
                  aria-label={social.name}
                >
                  {/* Icono con efecto LED y tamaño responsivo */}
                  <IconComponent 
                    size={iconSize}
                    className="led-icon transition-all duration-300"
                  />
                  
                  {/* Efecto de brillo adicional en hover */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle, rgb(255, 255, 255) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
                      filter: 'blur(8px)',
                      transform: 'scale(1.5)'
                    }}
                  >
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialIcons;