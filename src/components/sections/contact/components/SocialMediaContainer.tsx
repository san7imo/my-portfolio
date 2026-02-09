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
      color: "#0A66C2",
      url: "https://linkedin.com/in/sam7imo",
    },
    {
      name: "GitHub",
      icon: Github,
      color: "#E6EDF3",
      url: "https://github.com/san7imo",
    },
    {
      name: "Email",
      icon: Mail,
      color: "#F59E0B",
      url: "mailto:san7imo@gmail.com",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "#25D366",
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
      {/* Estilos CSS para brillo por marca */}
      <style>{`
        .social-icon {
          color: #ffffff;
          transition: transform 250ms ease, filter 250ms ease, color 250ms ease;
        }

        .social-link:hover .social-icon {
          color: var(--icon-color);
          filter: drop-shadow(0 0 6px var(--icon-color)) drop-shadow(0 0 14px var(--icon-color));
          transform: scale(1.2);
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
                  className="social-link group relative block p-2 transition-all duration-300"
                  title={social.name}
                  aria-label={social.name}
                  style={{ '--icon-color': social.color } as React.CSSProperties}
                >
                  {/* Icono con efecto LED y tamaño responsivo */}
                  <IconComponent 
                    size={iconSize}
                    className="social-icon"
                  />
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
