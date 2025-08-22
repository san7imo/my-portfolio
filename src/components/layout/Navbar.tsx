import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FaLaptopCode, FaProjectDiagram, FaBrain, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

const navLinksLeft = [
  { id: 'technologies', name: 'Tecnologías', icon: FaLaptopCode },
  { id: 'projects', name: 'Proyectos', icon: FaProjectDiagram },
];

const navLinksRight = [
  { id: 'skills', name: 'Habilidades', icon: FaBrain },
  { id: 'contact', name: 'Contacto', icon: FaEnvelope },
];

const LOGO_PATH = "/assets/img/logoN.webp";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('technologies');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Verificar si estamos en la página principal
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    // Mostrar el botón después de 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const handleScroll = () => {
      if (!isHomePage) return; // Solo manejar scroll en la página principal

      const allNavLinks = [...navLinksLeft, ...navLinksRight];
      const sections = allNavLinks.map(link => document.getElementById(link.id)).filter(Boolean);

      let currentActive = '';
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            currentActive = section.id;
            break;
          }
        }
      }

      if (window.scrollY === 0) {
        setActiveLink('');
      } else if (currentActive) {
        setActiveLink(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Cerrar menú con tecla ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isMenuOpen, isHomePage]);

  // Función para manejar la navegación con anclas
  const handleNavigation = (linkId: string) => {
    closeMenu();
    
    if (isHomePage) {
      // Si estamos en la página principal, hacer scroll suave
      const element = document.getElementById(linkId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveLink(linkId);
      }
    } else {
      // Si no estamos en la página principal, navegar y hacer scroll
      navigate(`/#${linkId}`);
      
      // Esperar a que se cargue la página y hacer scroll
      setTimeout(() => {
        const element = document.getElementById(linkId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveLink(linkId);
        }
      }, 100);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const allNavLinks = [...navLinksLeft, ...navLinksRight];

  return (
    <>
      {/* Botón hamburguesa flotante */}
      <button
        onClick={toggleMenu}
        className={`
          fixed top-6 left-6 z-50
          w-5 h-10 
          text-white rounded-full shadow-2xl
          flex items-center justify-center
          transition-all duration-500 ease-out
          hover:scale-110 hover:shadow-purple-500/25
          focus:outline-none focus:ring-4 focus:ring-purple-400/30
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
          ${isMenuOpen ? 'bg-gradient-to-r from-red-500 to-pink-600 rotate-180' : ''}
        `}
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <div className="relative">
          {isMenuOpen ? (
            <FaTimes className="text-xl transition-transform duration-300" />
          ) : (
            <FaBars className="text-xl transition-transform duration-300" />
          )}
        </div>
      </button>

      {/* Menú desplegable de pantalla completa */}
      <div
        className={`
          fixed inset-0 z-40
          bg-gradient-to-br from-black via-gray-900 to-black
          backdrop-blur-sm
          transition-all duration-700 ease-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={closeMenu}
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div
          className={`
            relative z-10 flex flex-col items-center justify-center h-full
            transition-all duration-700 ease-out delay-100
            ${isMenuOpen ? 'transform translate-y-0 scale-100' : 'transform -translate-y-10 scale-95'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo principal - siempre navega al home */}
          <div className={`
            mb-16 transition-all duration-500 delay-200 cursor-pointer
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>
            <RouterLink to="/" onClick={closeMenu}>
              <img
                src={LOGO_PATH}
                alt="San7imo Logo"
                className="h-24 md:h-32 w-auto filter drop-shadow-2xl hover:scale-110 transition-transform duration-300"
              />
            </RouterLink>
          </div>

          {/* Navegación principal */}
          <nav className="flex flex-col items-center space-y-6">
            {allNavLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={`
                  group flex items-center text-2xl md:text-3xl font-light
                  text-gray-300 hover:text-purple-400 cursor-pointer
                  transition-all duration-500 ease-out
                  py-4 px-8 rounded-xl
                  hover:bg-white/5 hover:backdrop-blur-sm
                  border border-transparent hover:border-purple-400/20
                  transform hover:scale-105
                  ${activeLink === link.id ? 'text-purple-400 bg-purple-400/10 border-purple-400/30' : ''}
                  ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                `}
                style={{
                  transitionDelay: isMenuOpen ? `${300 + index * 100}ms` : '0ms'
                }}
              >
                <link.icon className="mr-4 text-3xl group-hover:animate-pulse" />
                <span className="font-mono tracking-wide">{link.name}</span>
                
                {/* Indicador de enlace activo */}
                {activeLink === link.id && (
                  <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-r-full"></div>
                )}
              </button>
            ))}

            {/* Separador elegante */}
            <div className={`
              w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent
              my-6 transition-all duration-500 delay-700
              ${isMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
            `}></div>

            {/* Link especial "Acerca de mí" */}
            <RouterLink
              to="/about"
              onClick={closeMenu}
              className={`
                group flex items-center text-2xl md:text-3xl font-light
                text-gray-300 hover:text-yellow-400 cursor-pointer
                transition-all duration-500 ease-out
                py-4 px-8 rounded-xl
                hover:bg-yellow-400/10 hover:backdrop-blur-sm
                border border-transparent hover:border-yellow-400/20
                transform hover:scale-105
                ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
              `}
              style={{
                transitionDelay: isMenuOpen ? `${700 + allNavLinks.length * 100}ms` : '0ms'
              }}
            >
              <FiUser className="mr-4 text-3xl group-hover:animate-pulse" />
              <span className="font-mono tracking-wide">Acerca de mí</span>
            </RouterLink>
          </nav>

          {/* Indicador de ayuda */}
          <div className={`
            absolute bottom-8 text-gray-500 text-sm font-mono text-center
            transition-all duration-500 delay-1000
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <p>Presiona <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ESC</kbd> o haz click fuera para cerrar</p>
          </div>
        </div>
      </div>
    </>
  );
}