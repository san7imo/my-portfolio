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
  }
];