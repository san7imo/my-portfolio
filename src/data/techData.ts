// src/data/techData.ts
// Centralización de todas las tecnologías utilizadas y dominadas.

export interface Technology {
  id: string;
  name: string;
  logo: string;
  category: 'frontend' | 'backend' | 'devops' | 'cybersecurity' | 'databases';
  description: string;
  level: string; // Ej: 'Avanzado', 'Intermedio', 'Básico'
}

export const techData: Technology[] = [
  // ──────────────────────── FRONTEND ────────────────────────
  {
    id: 'react',
    name: 'React',
    logo: '/assets/img/tech-logos/react.png',
    category: 'frontend',
    description: 'Librería JavaScript para construir interfaces de usuario interactivas y basadas en componentes reutilizables.',
    level: 'Avanzado',
  },
  {
    id: 'angular',
    name: 'Angular',
    logo: '/assets/img/tech-logos/angular.png',
    category: 'frontend',
    description: 'Framework completo para aplicaciones web SPA con herramientas integradas como routing, servicios e inyección de dependencias.',
    level: 'Básico',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    logo: '/assets/img/tech-logos/typescript.png',
    category: 'frontend',
    description: 'Superset de JavaScript que añade tipado estático y herramientas para desarrollo escalable.',
    level: 'Avanzado',
  },
  {
    id: 'css3d',
    name: 'CSS 3D',
    logo: '/assets/img/tech-logos/css3d.png',
    category: 'frontend',
    description: 'Uso avanzado de transformaciones 3D en CSS para crear animaciones e interfaces modernas.',
    level: 'Intermedio',
  },

  // ──────────────────────── BACKEND ────────────────────────
  {
    id: 'java',
    name: 'Java',
    logo: '/assets/img/tech-logos/java.png',
    category: 'backend',
    description: 'Lenguaje robusto ideal para aplicaciones empresariales. Dominio en OOP, colecciones y multihilos.',
    level: 'Avanzado',
  },
  {
    id: 'java-spring',
    name: 'Java + Spring Boot',
    logo: '/assets/img/tech-logos/spring-boot.png',
    category: 'backend',
    description: 'Framework Java para desarrollo ágil de microservicios, APIs REST y aplicaciones empresariales.',
    level: 'Avanzado',
  },
  {
    id: 'php',
    name: 'PHP',
    logo: '/assets/img/tech-logos/php.png',
    category: 'backend',
    description: 'Lenguaje de servidor ampliamente usado para desarrollo web. Experiencia en PHP moderno y buenas prácticas.',
    level: 'Intermedio',
  },
  {
    id: 'php-laravel',
    name: 'PHP Laravel',
    logo: '/assets/img/tech-logos/laravel.png',
    category: 'backend',
    description: 'Framework PHP moderno con enfoque MVC, Eloquent ORM, Blade y sistema de autenticación integrado.',
    level: 'Intermedio',
  },
  {
    id: 'python',
    name: 'Python',
    logo: '/assets/img/tech-logos/python.png',
    category: 'backend',
    description: 'Lenguaje versátil con experiencia en automatización, backend, scripting y data processing.',
    level: 'Intermedio',
  },
  {
    id: 'python-fastapi',
    name: 'Python FastAPI',
    logo: '/assets/img/tech-logos/fastapi.png',
    category: 'backend',
    description: 'Framework moderno para construir APIs con alto rendimiento y documentación automática.',
    level: 'Intermedio',
  },

  // ──────────────────────── DEVOPS ────────────────────────
  {
    id: 'git',
    name: 'Git',
    logo: '/assets/img/tech-logos/git.png',
    category: 'devops',
    description: 'Control de versiones distribuido. Experiencia en branching, merges y flujos colaborativos.',
    level: 'Avanzado',
  },
  {
    id: 'docker',
    name: 'Docker',
    logo: '/assets/img/tech-logos/docker.png',
    category: 'devops',
    description: 'Contenerización de aplicaciones. Creación de imágenes eficientes y entornos reproducibles.',
    level: 'Avanzado',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    logo: '/assets/img/tech-logos/kubernetes.png',
    category: 'devops',
    description: 'Orquestación de contenedores, despliegue, escalado automático y networking de servicios.',
    level: 'Intermedio',
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    logo: '/assets/img/tech-logos/jenkins.png',
    category: 'devops',
    description: 'Automatización CI/CD. Experiencia en pipelines personalizados e integración con Git.',
    level: 'Básico',
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    logo: '/assets/img/tech-logos/gcp.png',
    category: 'devops',
    description: 'Plataforma de servicios cloud. Uso de GKE, Compute Engine y Cloud Functions.',
    level: 'Intermedio',
  },

  // ──────────────────────── CYBERSECURITY ────────────────────────
  {
    id: 'wireshark',
    name: 'Wireshark',
    logo: '/assets/img/tech-logos/wireshark.png',
    category: 'cybersecurity',
    description: 'Captura y análisis de tráfico de red. Análisis forense y resolución de problemas de red.',
    level: 'Básico',
  },
  {
    id: 'splunk',
    name: 'Splunk',
    logo: '/assets/img/tech-logos/splunk.png',
    category: 'cybersecurity',
    description: 'Monitoreo y visualización de logs para análisis de seguridad y creación de dashboards.',
    level: 'Básico',
  },
  {
    id: 'python-security',
    name: 'Python Security',
    logo: '/assets/img/tech-logos/python.png',
    category: 'cybersecurity',
    description: 'Desarrollo de herramientas de seguridad, scraping forense y automatización en Python.',
    level: 'Intermedio',
  },
  {
    id: 'kali-linux',
    name: 'Kali Linux',
    logo: '/assets/img/tech-logos/kalilinux.png',
    category: 'cybersecurity',
    description: 'Distribución Linux para pentesting con herramientas de análisis y explotación de vulnerabilidades.',
    level: 'Básico',
  },

    // ──────────────────────── DATABASES ────────────────────────
{
  id: 'mongodb',
  name: 'MongoDB',
  logo: '/assets/img/tech-logos/mongodb.png',
  category: 'databases',
  description: 'Base de datos NoSQL orientada a documentos, ideal para aplicaciones modernas con esquemas flexibles. Experiencia en modelado de colecciones, consultas agregadas y performance.',
  level: 'Básico',
},
{
  id: 'mysql',
  name: 'MySQL',
  logo: '/assets/img/tech-logos/mysql.png',
  category: 'databases',
  description: 'Sistema de gestión de bases de datos relacional. Experiencia en diseño de esquemas, consultas complejas, procedimientos almacenados y optimización de índices.',
  level: 'Avanzado',
},
{
  id: 'postgresql',
  name: 'PostgreSQL',
  logo: '/assets/img/tech-logos/postgresql.png',
  category: 'databases',
  description: 'Base de datos relacional avanzada con soporte para tipos de datos personalizados, funciones SQL avanzadas, y extensiones como PostGIS.',
  level: 'Avanzado',
},

];

// Tipo para las categorías incluyendo "all"
export type CategoryType = 'all' | 'frontend' | 'backend' | 'devops' | 'cybersecurity' | 'databases';

// Generador dinámico de categorías únicas (útil para filtros en el frontend)
export const categories: CategoryType[] = ['all', ...Array.from(new Set(techData.map(tech => tech.category)))];

// Labels para mostrar en la UI
export const categoryLabels: Record<CategoryType, string> = {
  all: '🌟 Todas',
  frontend: '🎨 Frontend',
  backend: '⚙️ Backend', 
  devops: '🚀 DevOps',
  cybersecurity: '🔒 Cybersecurity',
  databases: '💾 Databases'
};