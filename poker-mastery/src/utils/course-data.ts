export interface Lesson {
  id: string;
  title: string;
  description: string;
  phase: number;
  module: number;
  lesson: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  objectives: string[];
  tags: string[];
  interactive: ('calculator' | 'trainer' | 'quiz' | 'chart' | 'replayer' | 'simulator')[];
  formulas: string[];
  content: string;
  videoUrl?: string;
  resources: Array<{
    title: string;
    url: string;
    type: 'article' | 'video' | 'tool' | 'paper' | 'book';
  }>;
  isFree: boolean;
  publishDate: string;
  updatedDate?: string;
}

export interface Module {
  id: number;
  phase: number;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  icon: string;
  color: string;
  objectives: string[];
  practicalProject: string;
  tools: string[];
  examQuestions: number;
  passingScore: number;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  modules: number[];
  totalLessons: number;
  totalDuration: string;
  color: string;
  icon: string;
  badge: string;
  objectives: string[];
  finalExam: {
    questions: number;
    duration: string;
    passingScore: number;
  };
}

export const PHASES: Phase[] = [
  {
    id: 0,
    title: 'Fundamentos Absolutos',
    subtitle: 'La base inquebrantable',
    description: 'Domina las reglas, terminología y matemáticas esenciales que todo jugador profesional conoce de memoria.',
    modules: [1, 2, 3],
    totalLessons: 25,
    totalDuration: '10h',
    color: 'green',
    icon: '🟢',
    badge: 'Novato',
    objectives: [
      'Conocer las reglas oficiales de Texas Hold\'em',
      'Calcular odds y equity mentalmente en segundos',
      'Dominar la terminología profesional completa',
      'Entender la estructura de apuestas y posiciones',
    ],
    finalExam: {
      questions: 30,
      duration: '45min',
      passingScore: 80,
    },
  },
  {
    id: 1,
    title: 'Maestría Preflop',
    subtitle: 'Construye rangos de acero',
    description: 'Rangos GTO por posición, 3-bet, 4-bet, cold calls, blind defense y steals. La base de todo juego ganador.',
    modules: [4, 5, 6, 7, 8],
    totalLessons: 46,
    totalDuration: '23h',
    color: 'blue',
    icon: '🔵',
    badge: 'Preflop Crusher',
    objectives: [
      'Construir y memorizar rangos de open raise por posición',
      'Definir rangos de 3-bet (value/bluff) vs cada posición',
      'Dominar 4-betting y cold 4-betting',
      'Defender ciegas de forma óptima vs steals',
      'Explotar leaks preflop de la población',
    ],
    finalExam: {
      questions: 40,
      duration: '60min',
      passingScore: 85,
    },
  },
  {
    id: 2,
    title: 'Dominio Postflop',
    subtitle: 'Donde se gana el dinero real',
    description: 'CBetting, barreling, check-raise, multiway, texturas de flop, turn/river play. Decisiones multi-street precisas.',
    modules: [9, 10, 11, 12, 13, 14],
    totalLessons: 54,
    totalDuration: '27h',
    color: 'yellow',
    icon: '🟡',
    badge: 'Postflop Pro',
    objectives: [
      'Clasificar cualquier flop en 2 segundos',
      'Ejecutar cbet strategy GTO + exploits',
      'Planificar turn/river desde el flop',
      'Dominar check-raise IP y OOP',
      'Navegar multiway pots con confianza',
      'Explotar tendencias postflop de regs y fish',
    ],
    finalExam: {
      questions: 50,
      duration: '75min',
      passingScore: 85,
    },
  },
  {
    id: 3,
    title: 'Conceptos Avanzados',
    subtitle: 'Nivel élite: GTO, ICM, Mental Game',
    description: 'Teoría de juegos, solvers, ICM, bankroll, tilt control, population analysis. La separación entre buenos y grandes.',
    modules: [15, 16, 17, 18, 19],
    totalLessons: 44,
    totalDuration: '22h',
    color: 'orange',
    icon: '🟠',
    badge: 'Advanced Strategist',
    objectives: [
      'Entender principios GTO y usar solvers',
      'Calcular ICM en burbujas y mesas finales',
      'Controlar tilt y optimizar mental game',
      'Gestionar bankroll con Kelly Criterion',
      'Analizar base de datos y detectar leaks',
    ],
    finalExam: {
      questions: 50,
      duration: '90min',
      passingScore: 90,
    },
  },
  {
    id: 4,
    title: 'Especializaciones',
    subtitle: 'Domina tu formato',
    description: 'Cash games, torneos MTT/SNG, heads-up. Estrategias específicas para cada ecosistema.',
    modules: [20, 21, 22],
    totalLessons: 30,
    totalDuration: '15h',
    color: 'red',
    icon: '🔴',
    badge: 'Format Specialist',
    objectives: [
      'Maximizar winrate en cash 6-max/9-max',
      'Estructurar juego en torneos MTT deepstack',
      'Dominar heads-up y short-handed',
      'Adaptar rangos a dinámicas de mesa',
    ],
    finalExam: {
      questions: 40,
      duration: '60min',
      passingScore: 90,
    },
  },
  {
    id: 5,
    title: 'Maestría Profesional',
    subtitle: 'Carrera, coaching, lifestyle',
    description: 'Overbetting, polar/merged, coaching others, content creation, impuestos, vida pro. El círculo se cierra.',
    modules: [23, 24, 25],
    totalLessons: 20,
    totalDuration: '10h',
    color: 'purple',
    icon: '🟣',
    badge: 'Poker Master',
    objectives: [
      'Ejecutar overbets polarizados/merged',
      'Diseñar currículum de coaching efectivo',
      'Crear contenido educativo de alto valor',
      'Gestionar carrera profesional (impuestos, legal, lifestyle)',
    ],
    finalExam: {
      questions: 30,
      duration: '60min',
      passingScore: 95,
    },
  },
];

export const MODULES: Module[] = [
  // FASE 0
  {
    id: 1,
    phase: 0,
    title: 'Reglas y Mecánicas del Juego',
    description: 'Reglas oficiales, estructura de apuestas, showdown, irregularidades. Simulador de mano completa incluido.',
    lessons: 8,
    duration: '3h',
    icon: '📖',
    color: 'green',
    objectives: [
      'Conocer reglas oficiales TDA 2024',
      'Entender estructura de apuestas (blinds, antes, straddle)',
      'Dominar showdown y declaraciones verbales',
      'Manejar irregularidades (string bet, act out of turn, etc.)',
    ],
    practicalProject: 'Simulador de mano completa: juega 50 manos guiadas',
    tools: ['Hand Replayer Básico', 'Reglas Quick Reference'],
    examQuestions: 15,
    passingScore: 80,
  },
  {
    id: 2,
    phase: 0,
    title: 'Matemáticas Esenciales del Poker',
    description: 'Combinatoria, probabilidades, pot odds, implied odds, equity, EV. Calculadoras interactivas con LaTeX paso a paso.',
    lessons: 10,
    duration: '5h',
    icon: '🧮',
    color: 'green',
    objectives: [
      'Calcular combinaciones de manos (combos/blockers)',
      'Aplicar Regla del 2 y 4 con precisión',
      'Calcular pot odds, MDF, Alpha en tiempo real',
      'Entender implied/reverse implied odds',
      'Calcular EV de decisiones multi-street',
    ],
    practicalProject: 'Calculadora de Equity + Odds interactiva completa',
    tools: ['Equity Calculator', 'Pot Odds Calculator', 'Combo Counter', 'EV Calculator'],
    examQuestions: 20,
    passingScore: 85,
  },
  {
    id: 3,
    phase: 0,
    title: 'Terminología y Conceptos Base',
    description: 'Glosario interactivo con spaced repetition. 200+ términos. Conceptos: SPR, polarizado/merged, range, nutted, capped, etc.',
    lessons: 7,
    duration: '2h',
    icon: '📚',
    color: 'green',
    objectives: [
      'Memorizar 200+ términos profesionales',
      'Entender conceptos: SPR, range, polarizado, capped, nutted',
      'Diferenciar GTO vs Explotativo',
      'Leer y escribir manos en notación estándar',
    ],
    practicalProject: 'Glosario interactivo con spaced repetition (SM-2)',
    tools: ['Glosario Interactivo', 'Flashcards Spaced Repetition', 'Notación de Manos Trainer'],
    examQuestions: 15,
    passingScore: 90,
  },
  // FASE 1
  {
    id: 4,
    phase: 1,
    title: 'Posiciones y Rangos Base',
    description: 'UTG, MP, CO, BTN, SB, BB. Rangos GTO de open raise. Range Builder visual interactivo. Memorización con spaced repetition.',
    lessons: 12,
    duration: '6h',
    icon: '🎯',
    color: 'blue',
    objectives: [
      'Memorizar rangos open raise 6-max y 9-max',
      'Entender dinámicas posicionales (IP vs OOP)',
      'Construir rangos personalizados en Range Builder',
      'Identificar leaks de posición en población',
    ],
    practicalProject: 'Range Builder Visual + Preflop Trainer (500+ drills)',
    tools: ['Range Builder', 'Preflop Trainer', 'Position Quiz'],
    examQuestions: 20,
    passingScore: 85,
  },
  {
    id: 5,
    phase: 1,
    title: 'Open Raising Strategy',
    description: 'Tamaños de open (2bb, 2.5bb, 3bb). Limp ranges (solo BTN/SB). Open vs straddle. Ajustes vs población. Simulador de EV por tamaño.',
    lessons: 10,
    duration: '5h',
    icon: '📈',
    color: 'blue',
    objectives: [
      'Elegir tamaño de open óptimo por posición',
      'Construir limp ranges equilibrados (BTN/SB)',
      'Ajustar vs straddle y ante games',
      'Explotar overfolding/overcalling preflop',
    ],
    practicalProject: 'Open Raising EV Simulator por posición y tamaño',
    tools: ['Open Size EV Calculator', 'Limp Range Builder', 'Population Tendency Analyzer'],
    examQuestions: 18,
    passingScore: 85,
  },
  {
    id: 6,
    phase: 1,
    title: '3-Betting: Teoría y Práctica',
    description: '3-bet value/bluff ratios. Tamaños (IP: 3x, OOP: 3.5-4x). Rangos vs UTG/MP/CO/BTN/SB. 3-bet bluff candidates (A5s, K9s, etc.). Quiz interactivo 100+ spots.',
    lessons: 10,
    duration: '5h',
    icon: '⚔️',
    color: 'blue',
    objectives: [
      'Construir rangos 3-bet polarizados vs merged',
      'Calcular 3-bet sizing óptimo IP/OOP',
      'Seleccionar bluff candidates con blockers',
      'Defender vs 3-bet: call/4-bet/fold ranges',
    ],
    practicalProject: '3-Bet Calculator + Quiz Interactivo 100 spots',
    tools: ['3-Bet Range Builder', '3-Bet Sizing Calculator', 'Defense vs 3-Bet Trainer'],
    examQuestions: 25,
    passingScore: 85,
  },
  {
    id: 7,
    phase: 1,
    title: '4-Betting y Cold 4-Betting',
    description: '4-bet sizing (2.2-2.5x). 4-bet bluff candidates. Cold 4-bet ranges (squeeze). 5-bet shove ranges. Decision tree interactivo completo.',
    lessons: 6,
    duration: '3h',
    icon: '💥',
    color: 'blue',
    objectives: [
      'Definir 4-bet value/bluff ratios',
      'Identificar cold 4-bet spots rentables',
      'Calcular 5-bet shove ranges vs 4-bet sizes',
      'Explotar 4-bet/fold y 4-bet/call leaks',
    ],
    practicalProject: '4-Bet Decision Tree Interactivo + Squeeze Calculator',
    tools: ['4-Bet Tree Visualizer', 'Cold 4-Bet Calculator', '5-Bet Jam Calculator'],
    examQuestions: 15,
    passingScore: 85,
  },
  {
    id: 8,
    phase: 1,
    title: 'Blind Defense & Stealing',
    description: 'BB vs BTN/CO/SB: defend ranges, 3-bet ranges. SB vs BB: limp/raise strategy. Blind vs Blind dynamics. Steal sizing y frequency. Exploits vs nits/maniacs.',
    lessons: 8,
    duration: '4h',
    icon: '🛡️',
    color: 'blue',
    objectives: [
      'Memorizar BB defend ranges vs cada posición',
      'Ejecutar SB limp/raise strategy óptima',
      'Dominar BvB dynamics (SB open, BB defend)',
      'Ajustar steal frequency vs tipos de jugador',
    ],
    practicalProject: 'BB vs BTN Simulator + BvB Range Visualizer',
    tools: ['Blind Defense Calculator', 'Steal EV Simulator', 'BvB Dynamics Trainer'],
    examQuestions: 20,
    passingScore: 85,
  },
  // FASE 2 (continuará...)
];

export const LESSONS_INDEX: Record<string, Lesson> = {};
// Las lecciones se cargan desde archivos Markdown en src/content/