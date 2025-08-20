// src/data/skillsData.ts

export interface SoftSkillData {
  id: string;
  image: string;
  title: string;
  description: string;
  story: string;
  emoji: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

export interface LandingPhase {
  rocket: boolean;
  landing: boolean;
  astronaut: boolean;
  skills: boolean;
  completed: boolean;
}

// PASO 2: Distribuir las habilidades por toda la superficie de la luna grande
export const softSkillsData: SoftSkillData[] = [
  {
    id: 'comunicacion',
    image: '/assets/img/skill-section/comunicacionacertiva.png',
    title: 'Comunicación Efectiva',
    description: 'Capacidad para transmitir ideas de manera clara y persuasiva, adaptándome al contexto y audiencia específica.',
    story: 'Durante mi experiencia profesional, he aprendido que la comunicación efectiva va más allá de hablar bien. Incluye escuchar activamente, adaptar el mensaje al público y crear conexiones auténticas.',
    emoji: '💬',
    position: { top: '15%', left: '25%' } // Izquierda-arriba
  },
  {
    id: 'trabajo-equipo',
    image: '/assets/img/skill-section/trabajoenequipo.png',
    title: 'Trabajo en Equipo',
    description: 'Habilidad para colaborar eficientemente con otros, aprovechando la diversidad de talentos para lograr objetivos comunes.',
    story: 'He trabajado en equipos multidisciplinarios donde cada miembro aportaba perspectivas únicas. Aprendí que el éxito del equipo supera siempre al éxito individual.',
    emoji: '🤝',
    position: { top: '10%', right: '26%' } // Derecha-arriba
  },
  {
    id: 'resolucion-problemas',
    image: '/assets/img/skill-section/resoluciondeproblemas.png',
    title: 'Resolución de Problemas',
    description: 'Enfoque analítico y creativo para identificar problemas, evaluar alternativas y implementar soluciones efectivas.',
    story: 'Cada desafío técnico me ha enseñado a pensar de manera estructurada pero flexible, combinando análisis lógico con creatividad para encontrar soluciones innovadoras.',
    emoji: '🧩',
    position: { top: '57%', left: '13%' } // Izquierda-centro-bajo
  },
  {
    id: 'liderazgo',
    image: '/assets/img/skill-section/liderazgo.png',
    title: 'Liderazgo',
    description: 'Capacidad para inspirar, motivar y guiar a otros hacia el logro de objetivos, creando un ambiente de confianza y crecimiento.',
    story: 'He liderado proyectos donde el éxito dependía no solo de la dirección técnica, sino de empoderar al equipo y crear una visión compartida.',
    emoji: '👑',
    position: { top: '35%', right: '15%' } // Derecha-centro
  },
  {
    id: 'aprendizaje-continuo',
    image: '/assets/img/skill-section/aprendizaje.png',
    title: 'Aprendizaje Continuo',
    description: 'Mentalidad de crecimiento constante, adaptándome a nuevas tecnologías y metodologías con curiosidad y perseverancia.',
    story: 'En un campo que evoluciona constantemente, he desarrollado la disciplina de mantenerme actualizado y la humildad de reconocer que siempre hay algo nuevo que aprender.',
    emoji: '📚',
    position: { bottom: '20%', right: '22%' } // Abajo-derecha
  },
  {
    id: 'adaptabilidad',
    image: '/assets/img/skill-section/adaptabilidad.png',
    title: 'Adaptabilidad',
    description: 'Flexibilidad para ajustarme a cambios del entorno, nuevas circunstancias y metodologías de trabajo emergentes.',
    story: 'Los cambios constantes en la industria tecnológica me han enseñado a ver la incertidumbre como una oportunidad para crecer y encontrar nuevas formas de agregar valor.',
    emoji: '🔄',
    position: { bottom: '15%', left: '35%' } // Abajo-izquierda
  },
  {
    id: 'creatividad',
    image: '/assets/img/skill-section/creatividad.png',
    title: 'Creatividad',
    description: 'Capacidad para generar ideas innovadoras y soluciones únicas, combinando pensamiento crítico y originalidad.',
    story: 'La creatividad no solo se aplica al diseño, sino a encontrar nuevas formas de abordar problemas complejos y mejorar procesos existentes.',
    emoji: '🎨',
    position: { bottom: '47%', left: '12%' } // Abajo-izquierda
  }
];