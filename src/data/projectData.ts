import type { Project } from '../components/sections/projects/components/Timeline';

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Riwi Projects",
    description: "Colección de proyectos desarrollados en Riwi con diferentes stacks y retos técnicos. Incluye sistemas CRUD, autenticación y consumo de APIs.",
    date: "Agosto 2024",
    technologies: ["PHP", "Laravel", "Symfony", "Java", "Spring Boot", "HTML", "CSS", "JavaScript", "FastAPI", "React", "Angular", "Python","MySql" ,"PostgreSQL", "MongoDB"],
    images: ["/assets/img/project-section/riwiproyects.webp", "/assets/img/project-section/riwiproyects1.webp", "/assets/img/project-section/riwiproyects2.webp", "/assets/img/project-section/riwiproyects3.webp", "/assets/img/project-section/riwiproyects4.webp"],
    liveUrl: "https://github.com/Riwi-Proyects",
    githubUrl: "https://github.com/orgs/Riwi-Proyects/repositories"
  },
  {
    id: 2,
    title: "CompraRaiz.com",
    description: "Plataforma inmobiliaria creada desde cero. Backend en Spring Boot con autenticación JWT y búsqueda avanzada; frontend en React con filtros dinámicos y visualización atractiva.",
    date: "Octubre 2024",
    technologies: ["React", "Spring Boot", "MySQL", "JWT", "MUII", "Java", "API Google Search"],
    images: ["/assets/img/project-section/compraraiz.webp", "/assets/img/project-section/compraraiz2.webp", "/assets/img/project-section/compraraiz6.jpeg"],
    liveUrl: "https://compraraiz.com/",
    githubUrl: "https://compraraiz.com/"
  },
  {
    id: 3,
    title: "TodoRifas",
    description: "Sistema completo para gestión de rifas en línea. Incluye panel administrativo, generación de números aleatorios, pagos y notificaciones.",
    date: "Diciembre 2024",
    technologies: ["Laravel", "Livewire", "MySQL", "Bootstrap"],
    images: ["/assets/img/project-section/todorifas.webp", "/assets/img/project-section/todorifas2.webp", "/assets/img/project-section/todorifas4.webp", "/assets/img/project-section/todorifas21.webp"],
    liveUrl: "https://github.com/Crudzaso/todo_rifas",
    githubUrl: "https://github.com/Crudzaso/todo_rifas"
  },
  {
    id: 4,
    title: "CamionYa.co",
    description: "Sistema para publicar y buscar camiones disponibles para transporte. Backend en Node.js y base de datos en MongoDB; interfaz hecha con Bootstrap.",
    date: "Enero 2025",
    technologies: ["Node.js", "Express", "MongoDB", "Bootstrap"],
    images: ["/assets/img/project-section/camionya.webp", "/assets/img/project-section/camionya1.webp"],
    liveUrl: "https://camionya.co/",
    githubUrl: "https://camionya.co/"
  },
  {
    id: 5,
    title: "Curso de Ciberseguridad - Google",
    description: "Curso profesional de ciberseguridad con enfoque en hacking ético, análisis de vulnerabilidades, redes, logs, y protección de aplicaciones web.",
    date: "Marzo 2025",
    technologies: ["Python", "Wireshark", "Linux", "Regex", "Splunk"],
    images: ["/assets/img/project-section/ciberseguridad.webp"],
    liveUrl: "https://coursera.org/share/d9c71147700aa2d30fee3bb893084985",
    githubUrl: "https://coursera.org/share/d9c71147700aa2d30fee3bb893084985"
  },
  {
    id: 6,
    title: "Sistema de Análisis de Precios de Hoteles",
    description: "Proyecto de análisis de tarifas hoteleras: Sistema con Python, FastAPI, Pandas, SQLite, Matplotlib y React que permite consultar y visualizar tendencias de precios en hoteles según fechas.",
    date: "Mayo 2025",
    technologies: ["FastAPI", "Python", "Redis", "React", "TailwindCSS", "SQLite", "Pandas", "Matplotlib"],
    images: ["/assets/img/project-section/analisis.webp"],
    liveUrl: "https://github.com/san7ilo/reto-python-fastapi",
    githubUrl: "https://github.com/san7ilo/reto-python-fastapi"
  },
  // ✅ NUEVOS PROYECTOS
  {
    id: 9,
    title: "FilonTech",
    description: "Landing en React con experiencia visual premium: fondo interactivo con efecto hover y componentes orientados a conversión.",
    date: "septiembre 2025",
    technologies: ["React", "TailwindCSS v4", "CSS"],
    images: [
      "/assets/img/project-section/filontech.webp",
      "/assets/img/project-section/filontech1.webp",
      "/assets/img/project-section/filontech2.webp",
      "/assets/img/project-section/filontech3.webp",
      "/assets/img/project-section/filontech4.webp"
    ],
    liveUrl: "https://fil-ontech.com/",
    githubUrl: "https://fil-ontech.com/"
  },
  {
    id: 7,
    title: "LogicChat",
    description: "Plataforma de chat con frontend en React 11.5 y backend en Node.js/TypeScript (Express, Sequelize y Socket.io) con integraciones de IA.",
    date: "Octubre 2025",
    technologies: ["React 11.5", "Node.js", "TypeScript", "Express", "Sequelize", "Socket.io", "OpenAI"],
    images: ["/assets/img/project-section/logichat1.webp"],
    liveUrl: "https://logichat.co/",
    githubUrl: "https://logichat.co/"
  },
  {
    id: 10,
    title: "Millón de Amigos",
    description: "Sitio en React con revista virtual interactiva y módulo de radio en vivo, diseñado para una experiencia inmersiva y moderna.",
    date: "noviembre 2025",
    technologies: ["React", "TailwindCSS v4", "CSS", "Librerías de revista virtual", "Radio en vivo"],
    images: [
      "/assets/img/project-section/millondeamigos.webp",
      "/assets/img/project-section/millondeamigos1.webp",
      "/assets/img/project-section/millondeamigos2.webp",
      "/assets/img/project-section/millondeamigos3.webp",
      "/assets/img/project-section/millondeamigos4.webp",
      "/assets/img/project-section/millondeamigos5.webp",
      "/assets/img/project-section/millondeamigos6.webp"
    ],
    liveUrl: "https://millondeamigos.com/",
    githubUrl: "https://millondeamigos.com/"
  },
  {
    id: 8,
    title: "Dilo Records",
    description: "Plataforma de gestión musical con sitio público, panel admin y portal de artistas. Gestiona artistas, lanzamientos, eventos y finanzas. Tecnologías principales: Laravel 12, Vue 3, Inertia y MySQL.",
    date: "Enero 2026",
    technologies: ["Laravel 12", "PHP 8.2", "Inertia.js", "Vue 3", "Tailwind CSS", "Jetstream", "Sanctum", "Spatie Permission", "ImageKit", "Vite", "MySQL"],
    images: [
      "/assets/img/project-section/dilorecords.webp",
      "/assets/img/project-section/dilorecords2.webp",
      "/assets/img/project-section/dilorecords3.webp",
      "/assets/img/project-section/dilorecords4.webp",
      "/assets/img/project-section/dilorecords5.webp"
    ],
    liveUrl: "https://dilorecords.com/",
    githubUrl: "https://dilorecords.com/"
  }
];
