<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import CardBoard from './CardBoard.vue';
import TextureBadge from './TextureBadge.vue';
import PlayingCard from './PlayingCard.vue';

interface FlopDrill {
  id: string;
  flop: Array<{rank: string, suit: string}>;
  turn?: {rank: string, suit: string} | null;
  river?: {rank: string, suit: string} | null;
  textureCategory: string;
  correctClassification: string;
  cbetFrequency: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const FLop_TEXTURES = [
  // Secos (Rainbow desconectados)
  { flop: ['A♠', '7♥', '2♦'], category: 'dry', cbet: 80, desc: 'As high, rainbow, desconectado. C-bet muy alta.' },
  { flop: ['K♠', '8♥', '3♦'], category: 'dry', cbet: 78, desc: 'King high, rainbow, sin draws. C-bet alta.' },
  { flop: ['Q♠', '9♥', '4♦'], category: 'dry', cbet: 75, desc: 'Queen high, seco. Buen spot para c-bet bluff.' },
  { flop: ['J♠', '6♥', '2♦'], category: 'dry', cbet: 72, desc: 'Jack high, rainbow. Rango de BTN domina.' },
  
  // Rainbow conectados
  { flop: ['9♠', '8♥', '7♦'], category: 'rainbow-connected', cbet: 65, desc: 'Conectado medio, straight draws posibles.' },
  { flop: ['T♠', '9♥', '8♦'], category: 'rainbow-connected', cbet: 60, desc: 'Broadway connected, muchos gutshots.' },
  { flop: ['8♠', '7♥', '6♦'], category: 'rainbow-connected', cbet: 68, desc: 'Conectado bajo, menos overcards.' },
  { flop: ['7♠', '6♥', '5♦'], category: 'rainbow-connected', cbet: 70, desc: 'Wheel draw possible, c-bet media-alta.' },
  
  // Dos tonos
  { flop: ['K♠', 'Q♠', '7♥'], category: 'two-tone', cbet: 55, desc: 'Broadway two-tone, flush draws + straight draws.' },
  { flop: ['J♠', 'T♠', '4♥'], category: 'two-tone', cbet: 50, desc: 'Conectado two-tone, muy wet.' },
  { flop: ['A♠', '5♠', '2♥'], category: 'two-tone', cbet: 60, desc: 'As high two-tone, nut flush draws.' },
  { flop: ['9♠', '8♠', '3♥'], category: 'two-tone', cbet: 52, desc: 'Conectado two-tone medio.' },
  
  // Mojados (two-tone + conectado)
  { flop: ['Q♠', 'J♠', 'T♥'], category: 'wet-connected', cbet: 40, desc: 'Broadway wet, muchos draws, check frecuente.' },
  { flop: ['K♠', 'Q♠', 'J♥'], category: 'wet-connected', cbet: 35, desc: 'Muy wet, rango de BTN crushes.' },
  { flop: ['T♠', '9♠', '8♥'], category: 'wet-connected', cbet: 45, desc: 'Middle wet, equilibrado.' },
  
  // Monocromo
  { flop: ['A♠', 'K♠', 'Q♠'], category: 'monotone', cbet: 25, desc: 'Monocromo broadway, muchos flushes hechos.' },
  { flop: ['J♠', '9♠', '4♠'], category: 'monotone', cbet: 30, desc: 'Monocromo medio, polarizado.' },
  { flop: ['8♠', '6♠', '2♠'], category: 'monotone', cbet: 35, desc: 'Monocromo bajo, menos flushes en rango.' },
  
  // Parecidos
  { flop: ['K♠', 'K♥', '7♦'], category: 'paired', cbet: 65, desc: 'Parecido King, proteger vs trips.' },
  { flop: ['9♠', '9♥', '4♦'], category: 'paired', cbet: 70, desc: 'Parecido medio, menos Kx en rango.' },
  { flop: ['A♠', 'A♥', '5♦'], category: 'paired', cbet: 75, desc: 'Parecido As, polarizado (trips o air).' },
  
  // Tríos
  { flop: ['8♠', '8♥', '8♦'], category: 'trips', cbet: 90, desc: 'Trío de 8s, polarizado extremo.' },
  { flop: ['A♠', 'A♥', 'A♦'], category: 'trips', cbet: 95, desc: 'Trío de Ases, casi siempre value bet.' },
];

function parseCard(str: string): {rank: string, suit: string} {
  const rank = str.slice(0, -1);
  const suit = str.slice(-1).toLowerCase();
  const suitMap: Record<string, string> = {'♠': 's', '♥': 'h', '♦': 'd', '♣': 'c'};
  return { rank, suit: suitMap[suit] || 's' };
}

function generateDrill(): FlopDrill {
  const template = FLop_TEXTURES[Math.floor(Math.random() * FLop_TEXTURES.length)];
  const flop = template.flop.map(parseCard);
  
  const categories = ['dry', 'rainbow-connected', 'two-tone', 'wet-connected', 'monotone', 'paired', 'trips'];
  const wrongCategories = categories.filter(c => c !== template.category);
  
  return {
    id: `flop-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    flop,
    textureCategory: template.category,
    correctClassification: template.category,
    cbetFrequency: template.cbet,
    explanation: template.desc,
    difficulty: template.category === 'dry' ? 'beginner' : template.category === 'trips' ? 'advanced' : 'intermediate',
  };
}

const categoryOptions = [
  { value: 'dry', label: 'Seco (Dry)', icon: '☀️', color: 'green' },
  { value: 'rainbow-connected', label: 'Rainbow Conectado', icon: '🔗', color: 'blue' },
  { value: 'two-tone', label: 'Dos Tonos', icon: '🎨', color: 'yellow' },
  { value: 'wet-connected', label: 'Mojado (Wet)', icon: '💧', color: 'orange' },
  { value: 'monotone', label: 'Monocromo', icon: '🌈', color: 'purple' },
  { value: 'paired', label: 'Parecido', icon: '👯', color: 'red' },
  { value: 'trips', label: 'Trío', icon: '🎯', color: 'pink' },
];

const currentDrill = ref<FlopDrill | null>(null);
const selectedCategory = ref<string>('');
const showFeedback = ref(false);
const feedbackType = ref<'correct' | 'incorrect'>('correct');
const feedbackMessage = ref('');
const drillHistory = ref<Array<{drill: FlopDrill, userAnswer: string, correct: boolean, time: number}>>([]);
const totalDrills = ref(0);
const correctDrills = ref(0);
const currentStreak = ref(0);
const bestStreak = ref(0);
const sessionStart = ref(Date.now());
const isLoading = ref(false);
const drillCount = ref(15);
const showTextureBadge = ref(true);

const accuracy = computed(() => totalDrills.value === 0 ? 0 : Math.round((correctDrills.value / totalDrills.value) * 100));
const sessionTime = computed(() => Math.floor((Date.now() - sessionStart.value) / 1000));
const drillStartTime = ref(Date.now());

watch(currentDrill, () => {
  drillStartTime.value = Date.now();
  selectedCategory.value = '';
  showFeedback.value = false;
});

function generateNewDrill() {
  isLoading.value = true;
  setTimeout(() => {
    currentDrill.value = generateDrill();
    isLoading.value = false;
  }, 200);
}

function submitAnswer() {
  if (!currentDrill.value || !selectedCategory.value) return;
  
  const correct = selectedCategory.value === currentDrill.value.correctClassification;
  const timeSpent = Date.now() - drillStartTime.value;
  
  drillHistory.value.unshift({
    drill: currentDrill.value,
    userAnswer: selectedCategory.value,
    correct,
    time: timeSpent,
  });
  
  totalDrills.value++;
  if (correct) {
    correctDrills.value++;
    currentStreak.value++;
    bestStreak.value = Math.max(bestStreak.value, currentStreak.value);
    feedbackType.value = 'correct';
    feedbackMessage.value = `¡Correcto! Es un flop ${getCategoryLabel(currentDrill.value.correctClassification)}.`;
  } else {
    currentStreak.value = 0;
    feedbackType.value = 'incorrect';
    const correctLabel = getCategoryLabel(currentDrill.value.correctClassification);
    const userLabel = getCategoryLabel(selectedCategory.value);
    feedbackMessage.value = `Incorrecto. Clasificaste como "${userLabel}", pero es "${correctLabel}".`;
  }
  
  showFeedback.value = true;
  showTextureBadge.value = true;
  
  setTimeout(() => {
    if (totalDrills.value < drillCount.value) {
      generateNewDrill();
    }
  }, correct ? 2500 : 3500);
}

function getCategoryLabel(cat: string): string {
  return categoryOptions.find(o => o.value === cat)?.label || cat;
}

function resetSession() {
  drillHistory.value = [];
  totalDrills.value = 0;
  correctDrills.value = 0;
  currentStreak.value = 0;
  sessionStart.value = Date.now();
  showFeedback.value = false;
  showTextureBadge.value = true;
  generateNewDrill();
}

onMounted(() => {
  generateNewDrill();
});
</script>

<template>
  <div class="flop-texture-trainer">
    <!-- Header Stats -->
    <div class="trainer-header">
      <div class="trainer-title">
        <h2>Flop Texture Trainer</h2>
        <span class="trainer-subtitle">Clasifica texturas · Estimates c-bet % · GTO Feedback</span>
      </div>
      <div class="trainer-stats">
        <div class="stat"><span class="stat-value">{{ accuracy }}%</span><span class="stat-label">Precisión</span></div>
        <div class="stat"><span class="stat-value">{{ correctDrills }}/{{ totalDrills }}</span><span class="stat-label">Correctas</span></div>
        <div class="stat"><span class="stat-value">{{ currentStreak }}</span><span class="stat-label">Racha</span></div>
        <div class="stat"><span class="stat-value">{{ bestStreak }}</span><span class="stat-label">Mejor</span></div>
        <div class="stat"><span class="stat-value">{{ Math.floor(sessionTime/60) }}:{{ String(sessionTime%60).padStart(2,'0') }}</span><span class="stat-label">Tiempo</span></div>
      </div>
    </div>

    <!-- Controles -->
    <div class="trainer-controls">
      <div class="control-group">
        <label>Drills por sesión</label>
        <select v-model="drillCount" class="drill-count-select" :disabled="isLoading">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="control-group">
        <label>
          <input type="checkbox" v-model="showTextureBadge" :disabled="isLoading" />
          Mostrar análisis de textura tras respuesta
        </label>
      </div>
      <button class="btn-reset" @click="resetSession" :disabled="isLoading">Reiniciar</button>
    </div>

    <!-- Drill Area -->
    <div class="drill-area" v-if="currentDrill && !isLoading">
      <!-- Board Visual -->
      <div class="board-section">
        <CardBoard
          :flop="currentDrill.flop"
          :size="'lg'"
          :animated="true"
          :highlight-texture="showTextureBadge && showFeedback"
        />
      </div>

      <!-- Opciones de clasificación -->
      <div class="classification-options">
        <span class="options-label">Clasifica la textura:</span>
        <div class="category-grid">
          <button
            v-for="opt in categoryOptions"
            :key="opt.value"
            :class="[
              'category-btn',
              { selected: selectedCategory === opt.value },
              { correct: showFeedback && opt.value === currentDrill.correctClassification },
              { incorrect: showFeedback && selectedCategory === opt.value && opt.value !== currentDrill.correctClassification }
            ]"
            @click="selectedCategory = opt.value"
            :disabled="showFeedback || isLoading"
            :style="{ borderColor: showFeedback && opt.value === currentDrill.correctClassification ? 'var(--success)' : 
                            showFeedback && selectedCategory === opt.value && opt.value !== currentDrill.correctClassification ? 'var(--error)' : 
                            selectedCategory === opt.value ? 'var(--poker-gold)' : 'var(--border-default)' }"
          >
            <span class="cat-icon">{{ opt.icon }}</span>
            <span class="cat-label">{{ opt.label }}</span>
          </button>
        </div>
      </div>

      <!-- C-bet estimate -->
      <div class="cbet-estimate" v-if="selectedCategory && !showFeedback">
        <label>Estima frecuencia de c-bet (%):</label>
        <div class="cbet-slider-wrapper">
          <input
            type="range"
            v-model.number="estimatedCbet"
            min="0"
            max="100"
            step="5"
            class="cbet-slider"
            @input="updateCbetEstimate"
          >
          <span class="cbet-value">{{ estimatedCbet }}%</span>
        </div>
      </div>

      <div class="btn-submit-wrapper">
        <button class="btn-submit" @click="submitAnswer" :disabled="!selectedCategory || isLoading">
          {{ selectedCategory ? 'Confirmar' : 'Selecciona una categoría' }}
        </button>
      </div>

      <!-- Feedback -->
      <div class="feedback" v-if="showFeedback" :class="feedbackType">
        <div class="feedback-header">
          <div class="feedback-icon">
            <svg v-if="feedbackType === 'correct'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </div>
          <p class="feedback-text">{{ feedbackMessage }}</p>
        </div>
        
        <div class="feedback-explanation">
          <strong>Análisis GTO:</strong> {{ currentDrill.explanation }}
        </div>

        <!-- Texture Badge completo -->
        <TextureBadge 
          v-if="showTextureBadge"
          :flop="currentDrill.flop"
        />
      </div>
    </div>

    <!-- Loading -->
    <div class="drill-loading" v-if="isLoading">
      <div class="spinner"></div>
      <p>Generando nuevo flop...</p>
    </div>

    <!-- Completado -->
    <div class="session-complete" v-if="totalDrills >= drillCount && !isLoading && !currentDrill">
      <div class="complete-icon">🎯</div>
      <h3>¡Sesión Completada!</h3>
      <div class="final-stats">
        <div class="final-stat"><span class="final-value">{{ accuracy }}%</span><span class="final-label">Precisión</span></div>
        <div class="final-stat"><span class="final-value">{{ currentStreak }}</span><span class="final-label">Racha Final</span></div>
        <div class="final-stat"><span class="final-value">{{ Math.floor(sessionTime/60) }}:{{ String(sessionTime%60).padStart(2,'0') }}</span><span class="final-label">Tiempo</span></div>
      </div>
      <button class="btn-primary" @click="resetSession">Nueva Sesión</button>
    </div>

    <!-- Historial -->
    <div class="drill-history" v-if="drillHistory.length > 0">
      <h4>Historial Reciente</h4>
      <div class="history-list">
        <div 
          v-for="(item, i) in drillHistory.slice(0, 10)" 
          :key="i"
          class="history-item"
          :class="{ correct: item.correct, incorrect: !item.correct }"
        >
          <span class="history-result">{{ item.correct ? '✓' : '✗' }}</span>
          <span class="history-flop">{{ formatFlop(item.drill.flop) }}</span>
          <span class="history-user" :class="item.correct ? '' : 'wrong'">{{ getCategoryLabel(item.userAnswer) }}</span>
          <span class="history-correct" v-if="!item.correct">{{ getCategoryLabel(item.drill.correctClassification) }}</span>
          <span class="history-time">{{ Math.round(item.time/1000) }}s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estimatedCbet: 50,
    };
  },
  methods: {
    updateCbetEstimate() {
      // Solo actualiza el valor visual
    },
    formatFlop(flop: Array<{rank: string, suit: string}>) {
      const suitSymbols: Record<string, string> = {s: '♠', h: '♥', d: '♦', c: '♣'};
      return flop.map(c => c.rank + suitSymbols[c.suit]).join(' ');
    }
  }
};
</script>

<style scoped>
.flop-texture-trainer {
  max-width: 800px;
  margin: 0 auto;
}

.trainer-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 16px;
}

.trainer-title h2 { margin: 0; font-size: 1.5rem; }
.trainer-subtitle { font-size: 0.85rem; color: var(--text-muted); }

.trainer-stats { display: flex; gap: 16px; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; align-items: center; padding: 12px 16px; background: var(--bg-tertiary); border-radius: 10px; min-width: 80px; flex: 1; }
.stat-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--poker-gold); }
.stat-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

.trainer-controls { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end; margin-bottom: 24px; padding: 16px; background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 12px; }
.control-group { display: flex; flex-direction: column; gap: 6px; }
.control-group label { font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
.control-group label input { margin-right: 8px; }

.drill-count-select { padding: 6px 10px; border: 1px solid var(--border-default); background: var(--bg-tertiary); border-radius: 6px; font-size: 0.85rem; }
.btn-reset { padding: 6px 16px; background: transparent; border: 1px solid var(--border-default); border-radius: 6px; font-size: 0.75rem; color: var(--text-secondary); cursor: pointer; }
.btn-reset:hover:not(:disabled) { border-color: var(--error); color: var(--error); }

.drill-area { background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 16px; padding: 24px; }

.board-section { margin-bottom: 24px; }

.classification-options { margin: 24px 0; }
.options-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 12px; }

.category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
.category-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 12px; border: 2px solid var(--border-default); background: var(--bg-secondary); border-radius: 12px; cursor: pointer; transition: all 0.15s; }
.category-btn:hover:not(:disabled) { border-color: var(--poker-gold); transform: translateY(-2px); }
.category-btn.selected { border-color: var(--poker-felt); background: var(--poker-felt)/10; }
.category-btn.correct { border-color: var(--success); background: var(--success)/15; animation: pulse 0.5s ease-out; }
.category-btn.incorrect { border-color: var(--error); background: var(--error)/15; animation: shake 0.5s ease-out; }
.cat-icon { font-size: 1.5rem; }
.cat-label { font-size: 0.75rem; font-weight: 600; text-align: center; }

.cbet-estimate { margin: 20px 0; padding: 16px; background: var(--bg-tertiary); border-radius: 12px; }
.cbet-estimate label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 12px; }
.cbet-slider-wrapper { display: flex; align-items: center; gap: 16px; }
.cbet-slider { flex: 1; accent-color: var(--poker-gold); }
.cbet-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--poker-gold); min-width: 60px; text-align: right; }

.btn-submit-wrapper { margin-top: 16px; }
.btn-submit { width: 100%; padding: 14px 32px; background: var(--poker-felt); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-submit:hover:not(:disabled) { background: var(--poker-felt-light); transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

.feedback { padding: 20px; border-radius: 12px; margin-top: 16px; animation: slideUp 0.3s ease-out; }
.feedback.correct { background: var(--success)/10; border: 1px solid var(--success)/30; }
.feedback.incorrect { background: var(--error)/10; border: 1px solid var(--error)/30; }
.feedback-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
.feedback-icon { width: 32px; height: 32px; flex-shrink: 0; margin-top: 2px; }
.feedback.correct .feedback-icon { color: var(--success); }
.feedback.incorrect .feedback-icon { color: var(--error); }
.feedback-text { margin: 0; font-weight: 600; }
.feedback-explanation { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; padding: 12px; background: var(--bg-tertiary); border-radius: 8px; }

.drill-loading { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 40px; color: var(--text-muted); }
.spinner { width: 40px; height: 40px; border: 3px solid var(--border-default); border-top-color: var(--poker-gold); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.session-complete { text-align: center; padding: 40px 24px; background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 16px; animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.complete-icon { font-size: 4rem; margin-bottom: 16px; }
.session-complete h3 { margin: 0 0 24px 0; font-size: 1.5rem; }
.final-stats { display: flex; justify-content: center; gap: 24px; margin-bottom: 24px; flex-wrap: wrap; }
.final-stat { display: flex; flex-direction: column; align-items: center; padding: 16px 24px; background: var(--bg-tertiary); border-radius: 12px; min-width: 100px; }
.final-value { font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; color: var(--poker-gold); }
.final-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

.drill-history { margin-top: 24px; padding: 16px; background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 12px; }
.drill-history h4 { margin: 0 0 12px 0; font-size: 0.9rem; }
.history-list { display: flex; flex-direction: column; gap: 6px; }
.history-item { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; }
.history-item.correct { background: var(--success)/10; }
.history-item.incorrect { background: var(--error)/10; }
.history-result { font-weight: 700; min-width: 20px; }
.history-item.correct .history-result { color: var(--success); }
.history-item.incorrect .history-result { color: var(--error); }
.history-flop { flex: 1; min-width: 100px; }
.history-user { font-weight: 600; }
.history-user.wrong { color: var(--error); }
.history-correct { color: var(--success); font-size: 0.75rem; }
.history-time { color: var(--text-muted); font-size: 0.7rem; }

@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

@media (max-width: 600px) {
  .category-grid { grid-template-columns: repeat(2, 1fr); }
  .trainer-controls { flex-direction: column; align-items: stretch; }
}
</style>