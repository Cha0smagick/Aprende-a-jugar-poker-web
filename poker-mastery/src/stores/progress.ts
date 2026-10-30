import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent: number;
  quizScore?: number;
  quizAttempts: number;
  lastVisited: string;
  bookmarked: boolean;
  notes: string;
}

export interface ModuleProgress {
  moduleId: number;
  phase: number;
  lessonsCompleted: number;
  totalLessons: number;
  examPassed: boolean;
  examScore?: number;
  examAttempts: number;
  examCompletedAt?: string;
  diplomaGenerated: boolean;
  diplomaHash?: string;
}

export interface PhaseProgress {
  phaseId: number;
  modulesCompleted: number;
  totalModules: number;
  examPassed: boolean;
  examScore?: number;
  examCompletedAt?: string;
  diplomaGenerated: boolean;
  diplomaHash?: string;
}

export interface UserProgress {
  userId: string;
  username: string;
  email?: string;
  startedAt: string;
  lastActiveAt: string;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  lessons: Record<string, LessonProgress>;
  modules: Record<number, ModuleProgress>;
  phases: Record<number, PhaseProgress>;
  achievements: string[];
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  animations: boolean;
  soundEffects: boolean;
  spacedRepetition: boolean;
  emailNotifications: boolean;
  publicProfile: boolean;
  showProgress: boolean;
  autoPlayVideo: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  reducedMotion: boolean;
  highContrast: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  language: 'es',
  animations: true,
  soundEffects: true,
  spacedRepetition: true,
  emailNotifications: false,
  publicProfile: false,
  showProgress: true,
  autoPlayVideo: false,
  fontSize: 'md',
  reducedMotion: false,
  highContrast: false,
};

const STORAGE_KEY = 'poker-mastery-progress';
const SETTINGS_KEY = 'poker-mastery-settings';

export const useProgressStore = defineStore('progress', () => {
  const user = ref<UserProgress | null>(null);
  const isLoaded = ref(false);
  const isSyncing = ref(false);

  // Computed
  const currentPhase = computed(() => {
    if (!user.value) return 0;
    for (let i = 5; i >= 0; i--) {
      const phase = user.value.phases[i];
      if (phase && !phase.examPassed) return i;
      if (phase && phase.examPassed && i < 5) return i + 1;
    }
    return 0;
  });

  const currentModule = computed(() => {
    if (!user.value) return 1;
    const phase = currentPhase.value;
    const phaseModules = Object.values(user.value.modules).filter(m => m.phase === phase);
    for (const module of phaseModules) {
      if (!module.examPassed) return module.moduleId;
    }
    return phaseModules[phaseModules.length - 1]?.moduleId || 1;
  });

  const overallProgress = computed(() => {
    if (!user.value) return 0;
    const totalLessons = Object.values(user.value.lessons).length;
    if (totalLessons === 0) return 0;
    const completedLessons = Object.values(user.value.lessons).filter(l => l.completed).length;
    return Math.round((completedLessons / totalLessons) * 100);
  });

  const phaseProgress = computed(() => (phaseId: number) => {
    if (!user.value) return 0;
    const phase = user.value.phases[phaseId];
    if (!phase) return 0;
    return Math.round((phase.modulesCompleted / phase.totalModules) * 100);
  });

  const moduleProgress = computed(() => (moduleId: number) => {
    if (!user.value) return 0;
    const module = user.value.modules[moduleId];
    if (!module) return 0;
    return Math.round((module.lessonsCompleted / module.totalLessons) * 100);
  });

  const nextLesson = computed(() => {
    if (!user.value) return null;
    const currentModuleId = currentModule.value;
    const module = user.value.modules[currentModuleId];
    if (!module) return null;

    // Find first incomplete lesson in current module
    // This would need lesson IDs mapping - simplified for now
    return null;
  });

  const xpToNextLevel = computed(() => {
    if (!user.value) return 1000;
    const level = user.value.level;
    return Math.floor(1000 * Math.pow(1.5, level - 1));
  });

  const xpProgress = computed(() => {
    if (!user.value) return 0;
    const currentLevelXP = Math.floor(1000 * Math.pow(1.5, user.value.level - 2)) || 0;
    const nextLevelXP = xpToNextLevel.value;
    const progressXP = user.value.totalXP - currentLevelXP;
    return Math.min(100, Math.round((progressXP / (nextLevelXP - currentLevelXP)) * 100));
  });

  // Actions
  function initializeUser(username: string, email?: string) {
    const now = new Date().toISOString();
    const newUser: UserProgress = {
      userId: crypto.randomUUID(),
      username,
      email,
      startedAt: now,
      lastActiveAt: now,
      totalTimeSpent: 0,
      currentStreak: 1,
      longestStreak: 1,
      totalXP: 0,
      level: 1,
      lessons: {},
      modules: {},
      phases: {},
      achievements: [],
      settings: { ...DEFAULT_SETTINGS },
    };
    user.value = newUser;
    persist();
    return newUser;
  }

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedSettings = localStorage.getItem(SETTINGS_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        user.value = parsed;
        // Merge with defaults for new settings
        if (user.value && user.value.settings) {
          user.value.settings = { ...DEFAULT_SETTINGS, ...user.value.settings };
        }
      }

      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        if (user.value) {
          user.value.settings = { ...user.value.settings, ...parsedSettings };
        }
      }

      // Check streak
      if (user.value) {
        checkAndUpdateStreak();
      }

      isLoaded.value = true;
    } catch (error) {
      console.error('Failed to load progress:', error);
      isLoaded.value = true;
    }
  }

  function persist() {
    if (!user.value) return;
    user.value.lastActiveAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(user.value.settings));
  }

  function checkAndUpdateStreak() {
    if (!user.value) return;

    const lastActive = new Date(user.value.lastActiveAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      user.value.currentStreak += 1;
      user.value.longestStreak = Math.max(user.value.longestStreak, user.value.currentStreak);
      awardXP(50); // Streak bonus
    } else if (diffDays > 1) {
      // Streak broken
      user.value.currentStreak = 1;
    }
    // diffDays === 0 same day, no change
  }

  function updateLastActive() {
    if (!user.value) return;
    const wasLoaded = isLoaded.value;
    checkAndUpdateStreak();
    user.value.lastActiveAt = new Date().toISOString();
    if (wasLoaded) persist();
  }

  function completeLesson(lessonId: string, timeSpent: number, quizScore?: number) {
    if (!user.value) return;

    const existing = user.value.lessons[lessonId];
    const isNewCompletion = !existing?.completed;

    user.value.lessons[lessonId] = {
      lessonId,
      completed: true,
      completedAt: existing?.completedAt || new Date().toISOString(),
      timeSpent: (existing?.timeSpent || 0) + timeSpent,
      quizScore: quizScore ?? existing?.quizScore,
      quizAttempts: (existing?.quizAttempts || 0) + (quizScore !== undefined ? 1 : 0),
      lastVisited: new Date().toISOString(),
      bookmarked: existing?.bookmarked || false,
      notes: existing?.notes || '',
    };

    // Award XP
    if (isNewCompletion) {
      awardXP(100);
      updateModuleProgress(lessonId);
    }

    persist();
  }

  function updateModuleProgress(lessonId: string) {
    if (!user.value) return;

    // Extract module ID from lesson ID (format: "phase-module-lesson")
    const parts = lessonId.split('-');
    if (parts.length >= 2) {
      const moduleId = parseInt(parts[1], 10);
      const module = user.value.modules[moduleId];
      if (module) {
        const moduleLessons = Object.keys(user.value.lessons).filter(
          l => l.startsWith(`${parts[0]}-${moduleId}-`)
        );
        const completedInModule = moduleLessons.filter(
          l => user.value!.lessons[l].completed
        ).length;
        module.lessonsCompleted = completedInModule;
      }
    }
  }

  function recordQuizAttempt(lessonId: string, score: number) {
    if (!user.value) return;
    const lesson = user.value.lessons[lessonId];
    if (lesson) {
      lesson.quizScore = Math.max(lesson.quizScore || 0, score);
      lesson.quizAttempts += 1;
      persist();
    }
  }

  function passModuleExam(moduleId: number, score: number) {
    if (!user.value) return;

    const module = user.value.modules[moduleId];
    if (module) {
      module.examPassed = true;
      module.examScore = score;
      module.examAttempts += 1;
      module.examCompletedAt = new Date().toISOString();

      awardXP(500);
      checkPhaseCompletion(module.phase);
    } else {
      // Create module progress if not exists
      user.value.modules[moduleId] = {
        moduleId,
        phase: Math.floor((moduleId - 1) / 5),
        lessonsCompleted: 0,
        totalLessons: 0,
        examPassed: true,
        examScore: score,
        examAttempts: 1,
        examCompletedAt: new Date().toISOString(),
        diplomaGenerated: false,
      };
    }

    persist();
  }

  function checkPhaseCompletion(phaseId: number) {
    if (!user.value) return;

    const phaseModules = Object.values(user.value.modules).filter(m => m.phase === phaseId);
    const allPassed = phaseModules.every(m => m.examPassed);

    if (allPassed && phaseModules.length > 0) {
      const phase = user.value.phases[phaseId];
      if (phase) {
        phase.examPassed = true;
        phase.examCompletedAt = new Date().toISOString();
      } else {
        user.value.phases[phaseId] = {
          phaseId,
          modulesCompleted: phaseModules.length,
          totalModules: phaseModules.length,
          examPassed: true,
          examCompletedAt: new Date().toISOString(),
          diplomaGenerated: false,
        };
      }

      awardXP(2000);
      checkAchievements();
    }
  }

  function passPhaseExam(phaseId: number, score: number) {
    if (!user.value) return;

    const phase = user.value.phases[phaseId];
    if (phase) {
      phase.examPassed = true;
      phase.examScore = score;
      phase.examCompletedAt = new Date().toISOString();
      awardXP(2000);
    }

    persist();
  }

  function generateModuleDiploma(moduleId: number): string {
    if (!user.value) return '';

    const module = user.value.modules[moduleId];
    if (!module || !module.examPassed) return '';

    const diplomaData = {
      type: 'module',
      moduleId,
      userId: user.value.userId,
      username: user.value.username,
      date: new Date().toISOString(),
      score: module.examScore,
    };

    const hash = generateDiplomaHash(diplomaData);
    module.diplomaGenerated = true;
    module.diplomaHash = hash;

    persist();
    return hash;
  }

  function generatePhaseDiploma(phaseId: number): string {
    if (!user.value) return '';

    const phase = user.value.phases[phaseId];
    if (!phase || !phase.examPassed) return '';

    const diplomaData = {
      type: 'phase',
      phaseId,
      userId: user.value.userId,
      username: user.value.username,
      date: new Date().toISOString(),
      score: phase.examScore,
    };

    const hash = generateDiplomaHash(diplomaData);
    phase.diplomaGenerated = true;
    phase.diplomaHash = hash;

    persist();
    return hash;
  }

  function generateCourseDiploma(): string {
    if (!user.value) return '';

    const allPhasesPassed = Object.values(user.value.phases).every(p => p.examPassed);
    if (!allPhasesPassed) return '';

    const diplomaData = {
      type: 'course',
      userId: user.value.userId,
      username: user.value.username,
      date: new Date().toISOString(),
      level: user.value.level,
      totalXP: user.value.totalXP,
    };

    const hash = generateDiplomaHash(diplomaData);

    // Store course diploma hash
    if (user.value && !user.value.achievements.includes('course-diploma')) {
      user.value.achievements.push('course-diploma');
    }

    persist();
    return hash;
  }

  function generateDiplomaHash(data: object): string {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36).toUpperCase().padStart(12, '0');
  }

  function awardXP(amount: number) {
    if (!user.value) return;

    user.value.totalXP += amount;

    // Check level up
    while (user.value.totalXP >= xpToNextLevel.value) {
      user.value.level += 1;
      awardAchievement(`level-${user.value.level}`);
    }
  }

  function awardAchievement(achievementId: string) {
    if (!user.value) return;

    if (!user.value.achievements.includes(achievementId)) {
      user.value.achievements.push(achievementId);
      // Bonus XP for achievements
      if (achievementId.startsWith('level-')) {
        const level = parseInt(achievementId.split('-')[1], 10);
        user.value.totalXP += level * 100;
      }
    }
  }

  function checkAchievements() {
    if (!user.value) return;

    // First lesson
    if (Object.values(user.value.lessons).some(l => l.completed)) {
      awardAchievement('first-lesson');
    }

    // First module
    if (Object.values(user.value.modules).some(m => m.examPassed)) {
      awardAchievement('first-module');
    }

    // First phase
    if (Object.values(user.value.phases).some(p => p.examPassed)) {
      awardAchievement('first-phase');
    }

    // Streak achievements
    if (user.value.currentStreak >= 7) awardAchievement('streak-week');
    if (user.value.currentStreak >= 30) awardAchievement('streak-month');
    if (user.value.currentStreak >= 100) awardAchievement('streak-century');

    // Completionist
    const allLessonsDone = Object.values(user.value.lessons).every(l => l.completed);
    if (allLessonsDone) awardAchievement('completionist');

    // Speed learner (complete module in < 1 week)
    // Would need timestamps tracking
  }

  function updateSettings(settings: Partial<UserSettings>) {
    if (!user.value) return;
    user.value.settings = { ...user.value.settings, ...settings };
    persist();
  }

  function toggleBookmark(lessonId: string) {
    if (!user.value || !user.value.lessons[lessonId]) return;
    user.value.lessons[lessonId].bookmarked = !user.value.lessons[lessonId].bookmarked;
    persist();
  }

  function updateNotes(lessonId: string, notes: string) {
    if (!user.value || !user.value.lessons[lessonId]) return;
    user.value.lessons[lessonId].notes = notes;
    persist();
  }

  function recordVisit(lessonId: string) {
    if (!user.value) return;
    if (!user.value.lessons[lessonId]) {
      user.value.lessons[lessonId] = {
        lessonId,
        completed: false,
        timeSpent: 0,
        quizAttempts: 0,
        lastVisited: new Date().toISOString(),
        bookmarked: false,
        notes: '',
      };
    } else {
      user.value.lessons[lessonId].lastVisited = new Date().toISOString();
    }
    persist();
  }

  function addTimeSpent(lessonId: string, seconds: number) {
    if (!user.value) return;
    if (!user.value.lessons[lessonId]) {
      user.value.lessons[lessonId] = {
        lessonId,
        completed: false,
        timeSpent: seconds,
        quizAttempts: 0,
        lastVisited: new Date().toISOString(),
        bookmarked: false,
        notes: '',
      };
    } else {
      user.value.lessons[lessonId].timeSpent += seconds;
    }
    user.value.totalTimeSpent += seconds;
    persist();
  }

  function resetProgress(confirm = false) {
    if (!confirm) return false;
    user.value = null;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    isLoaded.value = false;
    return true;
  }

  function exportProgress(): string {
    if (!user.value) return '';
    return JSON.stringify(user.value, null, 2);
  }

  function importProgress(json: string): boolean {
    try {
      const imported = JSON.parse(json);
      if (imported.userId && imported.username) {
        user.value = { ...imported, settings: { ...DEFAULT_SETTINGS, ...imported.settings } };
        persist();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Initialize on store creation
  if (typeof window !== 'undefined') {
    loadFromStorage();
  }

  return {
    // State
    user,
    isLoaded,
    isSyncing,

    // Computed
    currentPhase,
    currentModule,
    overallProgress,
    phaseProgress,
    moduleProgress,
    nextLesson,
    xpToNextLevel,
    xpProgress,

    // Actions
    initializeUser,
    loadFromStorage,
    persist,
    updateLastActive,
    completeLesson,
    recordQuizAttempt,
    passModuleExam,
    passPhaseExam,
    generateModuleDiploma,
    generatePhaseDiploma,
    generateCourseDiploma,
    updateSettings,
    toggleBookmark,
    updateNotes,
    recordVisit,
    addTimeSpent,
    resetProgress,
    exportProgress,
    importProgress,
    awardAchievement,
  };
});