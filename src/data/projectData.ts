import type { Project } from '../components/sections/projects/components/Timeline';

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Riwi Projects",
    description: "Colección de proyectos desarrollados en Riwi con diferentes stacks y retos técnicos. Incluye sistemas CRUD, autenticación y consumo de APIs.",
    date: "Agosto 2024",
    technologies: ["PHP", "Laravel", "Symfony", "Java", "Spring Boot", "HTML", "CSS", "JavaScript", "FastAPI", "React", "Angular", "Python","MySql" ,"PostgreSQL", "MongoDB"],
    images: ["/api/placeholder/400/250"],
    liveUrl: "https://github.com/orgs/Riwi-Proyects/repositories",
    githubUrl: "https://github.com/orgs/Riwi-Proyects/repositories"
  },
  {
    id: 2,
    title: "CompraRaiz.com",
    description: "Plataforma inmobiliaria creada desde cero. Backend en Spring Boot con autenticación JWT y búsqueda avanzada; frontend en React con filtros dinámicos y visualización atractiva.",
    date: "Octubre 2024",
    technologies: ["React", "Spring Boot", "MySQL", "JWT", "TailwindCSS"],
    images: ["/api/placeholder/400/250"],
    liveUrl: "https://compraraiz.com/",
    githubUrl: "https://compraraiz.com/"
  },
  {
    id: 3,
    title: "TodoRifas",
    description: "Sistema completo para gestión de rifas en línea. Incluye panel administrativo, generación de números aleatorios, pagos y notificaciones.",
    date: "Diciembre 2024",
    technologies: ["Laravel", "Livewire", "MySQL", "Bootstrap"],
    images: ["/api/placeholder/400/250"],
    liveUrl: "",
    githubUrl: "https://github.com/Crudzaso/todo_rifas"
  },
  {
    id: 4,
    title: "CamionYa.co",
    description: "Sistema para publicar y buscar camiones disponibles para transporte. Backend en Node.js y base de datos en MongoDB; interfaz hecha con Bootstrap.",
    date: "Enero 2025",
    technologies: ["Node.js", "Express", "MongoDB", "Bootstrap"],
    images: ["/api/placeholder/400/250"],
    liveUrl: "https://camionya.co/",
    githubUrl: ""
  },
  {
    id: 5,
    title: "Curso de Ciberseguridad - Google",
    description: "Curso profesional de ciberseguridad con enfoque en hacking ético, análisis de vulnerabilidades, redes, logs, y protección de aplicaciones web.",
    date: "Marzo 2025",
    technologies: ["Python", "Wireshark", "Linux", "Regex", "Splunk"],
    images: ["/api/placeholder/400/250"],
    liveUrl: "https://coursera.org/share/d9c71147700aa2d30fee3bb893084985",
    githubUrl: ""
  },
  {
    id: 6,
    title: "Sistema de Análisis de Precios de Hoteles",
    description: "Este proyecto implementa un sistema completo de análisis de tarifas hoteleras usando Python, FastAPI, Pandas, SQLite y Matplotlib. Permite a los usuarios consultar y visualizar tendencias de precios en diferentes hoteles y fechas.",
    date: "Mayo 2025",
    technologies: ["FastAPI", "Python", "Redis", "React", "TailwindCSS", "SQLite", "Pandas", "Matplotlib"],
    images: ["/api/placeholder/400/250"],
    liveUrl: "",
    githubUrl: "https://github.com/san7ilo/reto-python-fastapi"
  }
];