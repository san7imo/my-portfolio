import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaTwitter, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useState, useEffect } from "react";

const PROFILE_IMG = "/assets/img/aboutme/sinfondo.png";
const IMG_PATH = "/assets/img/logoCompletoN.png";

const About = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  const initialTitle = "¿Quién es San7imo?";
  
  useEffect(() => {
    // Escribir el título inicial
    let index = 0;
    const typeInitialTitle = () => {
      if (index < initialTitle.length) {
        setTitleText(initialTitle.substring(0, index + 1));
        index++;
        setTimeout(typeInitialTitle, 80);
      } else {
        // Después de 3 segundos, empezar a borrar "San7imo"
        setTimeout(() => {
          setShowProfile(true);
          // Borrar "San7imo" letra por letra
          const deleteIndex = initialTitle.indexOf("San7imo");
          let deleteCount = 0;
          const deleteName = () => {
            if (deleteCount < 7) { // "San7imo" tiene 7 caracteres
              const beforeName = initialTitle.substring(0, deleteIndex);
              const afterDelete = "San7imo".substring(0, 7 - deleteCount - 1);
              setTitleText(beforeName + afterDelete);
              deleteCount++;
              setTimeout(deleteName, 60);
            } else {
              // Escribir "Santiago Londoño Morales"
              const basePart = "¿Quién es ";
              const newName = "Santiago Londoño Morales";
              let writeIndex = 0;
              const writeNewName = () => {
                if (writeIndex < newName.length) {
                  setTitleText(basePart + newName.substring(0, writeIndex + 1) + "?");
                  writeIndex++;
                  setTimeout(writeNewName, 80);
                } else {
                  setIsTyping(false);
                }
              };
              setTimeout(writeNewName, 200);
            }
          };
          deleteName();
        }, 3000);
      }
    };
    
    typeInitialTitle();
  }, []);

  // Estilos CSS como constante para evitar el error de JSX
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Livvic:wght@300;400;500;600;700&display=swap');
    
    .title-font {
      font-family: 'Cinzel Decorative', cursive;
    }
    
    .content-font {
      font-family: 'Livvic', sans-serif;
    }
  `;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Inyección de estilos usando dangerouslySetInnerHTML */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row md:items-center gap-16 px-6 py-16">
        {/* Main Text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="title-font text-4xl md:text-5xl  mb-6 min-h-[60px] md:min-h-[70px]" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(255,255,255,0.2)'
          }}>
            {titleText}
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>
          
          <p className="content-font text-gray-300 leading-relaxed mb-8 text-lg font-light">
            ¡Hola! mi nombre es <span className="text-white font-medium">Santiago Londoño</span>, tengo 29 años y soy de Medellín, Colombia.  
            Me desempeño como <strong className="text-white font-semibold">Full Stack Developer</strong> y siento una gran pasión por la tecnología, 
            el desarrollo de software, la inteligencia artificial y la automatización. Disfruto convertir ideas en aplicaciones modernas,
            escalables y visualmente atractivas, combinando creatividad y técnica para dar vida a soluciones digitales que realmente 
            generen valor e impacto.
          </p>

          <p className="content-font text-gray-300 leading-relaxed mb-8 text-lg font-light">
            Más allá del código y la tecnología, me considero una persona perseverante, honesta, curiosa, empática y muy apasionada, 
            siempre con ganas de aprender y compartir conocimientos. Me encanta colaborar en equipo, 
            escuchar diferentes perspectivas y aportar mi granito de arena para lograr objetivos comunes.
            Estoy convencido de que la tecnología puede transformar vidas y mejorar el mundo,
            y me esfuerzo día a día por ser parte de esa transformación.
          </p>

          {/* Social Networks */}
          <div className="flex justify-center md:justify-start space-x-6 mb-8">
            {[
              { icon: FaLinkedin, url: "https://www.linkedin.com/in/santiago-londo%C3%B1o-09a3a426b/", label: "LinkedIn" },
              { icon: FaGithub, url: "https://github.com/LMSanti", label: "GitHub" },
              { icon: FaEnvelope, url: "mailto:santiago.londono07@gmail.com", label: "Email" },
              { icon: FaInstagram, url: "https://www.instagram.com/san7imo", label: "Instagram" },
              { icon: FaTwitter, url: "https://twitter.com/San7imo", label: "Twitter" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition-all duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Profile Image with Logo Transition */}
        <motion.div
          className="flex-shrink-0 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-64 h-80 md:w-80 md:h-96 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showProfile ? (
                <motion.img
                  key="logo"
                  src={IMG_PATH}
                  alt="Logo San7imo"
                  className="w-full h-auto object-contain"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <motion.div
                  key="profile"
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={PROFILE_IMG}
                    alt="Foto profesional de Santiago Londoño"
                    className="w-64 h-auto md:w-80 md:h-auto shadow-2xl object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* About Me Section - Nuevo diseño minimalista */}
      <section className="max-w-5xl mx-auto mt-20 px-6">
        <motion.h2 
          className="title-font text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Sobre mí
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="relative pl-8 border-l-2 border-gray-600"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute w-4 h-4 bg-white rounded-full -left-2 top-0"></div>
            <h4 className="title-font text-xl font-semibold mb-4 text-white">
              Profesionalmente
            </h4>
            <p className="content-font text-gray-300 leading-relaxed font-light">
            Me dedico a crear soluciones digitales modernas, escalables, seguras y centradas en la experiencia del usuario. 
            Tengo experiencia trabajando tanto en frontend como en backend, lo que me permite desenvolverme de manera integral 
            en el desarrollo de aplicaciones web. además tengo conocimientos en ciberseguridad lo que me permite tener una 
            vision mas amplia del ciclo de vida del desarrollo de sofware y enfocarme en la realizacion de software seguros. 
            Me caracterizo por la  responsabilidad, la honestidad y el compromiso, así como por mi capacidad de comunicar 
            ideas con claridad, colaborar en equipo y liderar proyectos con enfoque en resultados.
            </p>
          </motion.div>
          
          <motion.div
            className="relative pl-8 border-l-2 border-gray-600"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute w-4 h-4 bg-white rounded-full -left-2 top-0"></div>
            <h4 className="title-font text-xl font-semibold mb-4 text-white">
              Personalmente
            </h4>
            <p className="content-font text-gray-300 leading-relaxed font-light">
            Me considero una persona perseverante, creativa, empatica, curiosa y muy apasionada, también disfruto mucho 
            de los pequeños detalles que tiene la vida, hacer ejercicio, disfrutar de mi familia, y especialmente mi hijo, 
            que son mi mayor motor y motivación para ser mejor persona y mejor profesional. Me encanta el fútbol y apoyar 
            al Independiente Medellín que me a enseñado a perseverar, a trabajar en equipo y a no tirar la toalla cuando
            las cosas no salen como esperas. También disfruto de la buena comida (en especial una buena hamburguesa), 
            la música electrónica y los festivales, donde encuentro inspiración y energía.
            </p>
          </motion.div>
        </div>
        
        <motion.p 
          className="content-font text-gray-300 leading-relaxed text-center text-lg font-light italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Siempre estoy abierto a nuevas oportunidades y desafíos que me permitan crecer 
          y contribuir significativamente al mundo del desarrollo de software.
        </motion.p>
      </section>

      {/* Skills Section - Diseño de dos columnas */}
      <section className="max-w-6xl mx-auto mt-20 px-6">
        <motion.h2 
          className="title-font text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Habilidades
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Habilidades Blandas */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="title-font text-2xl font-semibold mb-6 text-center" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Habilidades Blandas
            </h3>
            
            {[
              "Resolución de Problemas: Sobresalgo analizando situaciones complejas y encontrando soluciones efectivas.",
              "Comunicación Asertiva: Me comunico de manera clara y respetuosa, escuchando activamente.",
              "Adaptabilidad al Cambio: Soy flexible y prospero en situaciones nuevas y desafiantes.",
              "Creatividad y Pensamiento Innovador: Siempre busco soluciones originales y perspectivas nuevas.",
              "Gestión del Tiempo: Soy hábil priorizando tareas y manteniendo el enfoque.",
              "Empatía y Habilidades Interpersonales: Disfruto construyendo conexiones significativas."
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="content-font text-gray-300 leading-relaxed font-light">{skill}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Habilidades Técnicas */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="title-font text-2xl font-semibold mb-6 text-center" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Habilidades Técnicas
            </h3>
            
            {[
              { category: "Frontend", skills: "JavaScript, TypeScript, HTML5, CSS3, React, Angular" },
              { category: "Backend", skills: "Java (Spring Boot), PHP (Laravel), Python (FastAPI)" },
              { category: "Bases de Datos", skills: "MySQL, PostgreSQL, MongoDB" },
              { category: "DevOps y Cloud", skills: "Docker, Kubernetes, Jenkins, Github Actions, Google Cloud Platform (GCP), DigitalOcean" },
              { category: "Metodologías y Herramientas", skills: "Git, GitHub, Bash, Scrum, Jira, Trello, CI/CD" },
              { category: "Testing y Buenas Prácticas", skills: "Postman, Swagger, Clean Code, principios SOLID" },
              { category: "Ciberseguridad", skills: "Análisis de tráfico (Wireshark), Kali Linux, Splunk, Python Security" }
            ].map((skillGroup, index) => (
              <motion.div
                key={index}
                className="border-l-2 border-gray-600 pl-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className="absolute w-3 h-3 bg-white rounded-full -ml-6 mt-0.5"></div>
                <h4 className="content-font text-white font-semibold mb-2">{skillGroup.category}:</h4>
                <p className="content-font text-gray-300 text-sm leading-relaxed font-light">{skillGroup.skills}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Parallax Logo Section */}
      <div 
        className="h-96 bg-fixed bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${IMG_PATH})`,
          backgroundSize: "",
          backgroundPosition: "center center",
          backgroundColor: "#000000"
        }}
      />

      {/* Studies Section - Diseño limpio */}
      <section className="max-w-4xl mx-auto mt-20 px-6">
        <motion.h2 
          className="title-font text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Estudios
        </motion.h2>
        
        <div className="space-y-8">
          {[
            {
              title: "Desarrollo de Software",
              institution: "ITM - Instituto Tecnológico Metropolitano",
              period: "2023 - En curso"
            },
            {
              title: "Google Cybersecurity Professional Certificate",
              institution: "Coursera - Google Career Certificates",
              period: "2025"
            },
            {
              title: "Desarrollo de Software con enfoque en backend nivel Junior",
              institution: "Riwi",
              period: "2024 - 2025"
            },
            {
              title: "Ingeniería Industrial",
              institution: "Universidad Nacional de Colombia",
              period: "2017 - Pausado"
            },
          ].map((study, index) => (
            <motion.div
              key={index}
              className="relative pl-8 border-l border-gray-700 hover:border-gray-500 transition-colors duration-300"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-1.5 top-1"></div>
              <h3 className="title-font text-lg font-semibold text-white mb-1">{study.title}</h3>
              <p className="content-font text-gray-400 text-sm font-medium">{study.institution}</p>
              <p className="content-font text-gray-500 text-xs">{study.period}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section - Diseño elegante */}
      <section className="max-w-5xl mx-auto mt-20 px-6 pb-16">
        <motion.h2 
          className="title-font text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Experiencia
        </motion.h2>
        
        <div className="space-y-12">
          {[
            {
              duration: "01/10/2024 - 20/05/2025",
              location: "Medellín, Colombia",
              company: "CamionYa.co - CompraRaiz.com",
              sector: "Sector camionero y Sector Inmobiliario",
              position: "Desarrollador Frontend - Desarrollador Fullstack",
              tasks: "Como desarrollador principal de Compra Raíz, diseñé e implementé desde cero tanto el backend como el frontend, asegurando una solución robusta, escalable y centrada en la experiencia del usuario. Participé en el proyecto Camionya, una plataforma desarrollada con Node.js y Bootstrap, brindando mantenimiento y actualizaciones para mejorar su funcionalidad y desempeño."
            },
            {
              duration: "03/07/2021 - 25/06/2023",
              location: "Medellín, Colombia",
              company: "Emtelco S.A",
              sector: "Sector Call center BPO",
              position: "Creador de experiencia ventas",
              tasks: "Asesorar y vender productos intangibles vía telefónica, realizar seguimiento de ventas."
            },        {
              duration: "05/06/2016 - 30/06/2019",
              location: "Medellín, Colombia",
              company: "Rectificadora 'Mandela'",
              sector: "Sector Automotriz",
              position: "Operario",
              tasks: "Rectificar todos los componentes de los motores, Recibir motores y cotizarlos, recibir garantías."
            }
          ].map((job, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="border-l-2 border-gray-700 pl-8 pb-8">
                <div className="absolute w-4 h-4 bg-white rounded-full -left-2 top-0"></div>
                
                <div className="mb-4">
                  <h3 className="title-font text-xl font-semibold text-white mb-2">{job.position}</h3>
                  <p className="content-font text-gray-300 font-medium">{job.company} • {job.sector}</p>
                  <p className="content-font text-gray-400 text-sm">{job.duration} • {job.location}</p>
                </div>
                
                <p className="content-font text-gray-300 leading-relaxed font-light">{job.tasks}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Networks Section */}
      <section className="max-w-4xl mx-auto mt-16 px-6 pb-16">
        <motion.h2 
          className="title-font text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Conecta Conmigo
        </motion.h2>
        
        <div className="flex justify-center items-center flex-wrap gap-8">
          {[
            { icon: FaGithub, url: "https://github.com/LMSanti", label: "GitHub" },
            { icon: FaInstagram, url: "https://www.instagram.com/san7imo", label: "Instagram" },
            { icon: FaLinkedin, url: "https://www.linkedin.com/in/santiago-londo%C3%B1o-09a3a426b/", label: "LinkedIn" },
            { icon: FaEnvelope, url: "mailto:santiago.londono07@gmail.com", label: "Email" },
            { icon: FaTwitter, url: "https://twitter.com/San7imo", label: "Twitter" },
            { icon: FaWhatsapp, url: "https://wa.me/573116566530/?text=Hola, puedes ayudarme con: ", label: "WhatsApp" },
            { icon: FaFacebook, url: "https://www.facebook.com/Santiago.lmo", label: "Facebook" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-3xl transition-all duration-300"
              aria-label={social.label}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <social.icon />
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;