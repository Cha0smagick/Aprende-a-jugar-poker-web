<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import CardHand from './CardHand.vue';
import CardBoard from './CardBoard.vue';
import PlayingCard from './PlayingCard.vue';

interface Drill {
  id: string;
  position: string;
  action: 'open' | '3bet' | 'call3bet' | '4bet' | 'call4bet' | 'defendBB' | 'steal' | 'squeeze';
  hand: {rank: string, suit: string}[];
  correctAction: 'raise' | 'call' | 'fold' | '3bet' | '4bet' | 'check';
  correctSizing?: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
}

interface DrillResult {
  drillId: string;
  userAction: string;
  userSizing?: string;
  correct: boolean;
  timeSpent: number;
  timestamp: string;
}

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['s', 'h', 'd', 'c'];

// Rangos GTO simplificados para demo
const GTO_RANGES: Record<string, Record<string, string[]>> = {
  UTG: {
    open: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'JTs', 'T9s', '98s', '87s', '76s', '65s', 'AKo', 'AQo', 'AJo', 'KQo'],
  },
  MP: {
    open: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'QJs', 'QTs', 'Q9s', 'JTs', 'J9s', 'T9s', '98s', '87s', '76s', '65s', '54s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQo', 'KJo', 'QJo'],
  },
  CO: {
    open: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'JTs', 'J9s', 'J8s', 'T9s', 'T8s', '98s', '97s', '87s', '86s', '76s', '75s', '65s', '64s', '54s', '53s', '43s', '32s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KQo', 'KJo', 'KTo', 'K9o', 'QJo', 'QTo', 'JTo'],
  },
  BTN: {
    open: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'T9s', 'T8s', 'T7s', 'T6s', '98s', '97s', '96s', '87s', '86s', '85s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '52s', '43s', '42s', '32s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'QJo', 'QTo', 'Q9o', 'JTo', 'J9o', 'T9o', 'T8o', '98o', '97o', '87o', '86o', '76o', '75o', '65o', '64o', '54o', '53o', '43o', '42o', '32o'],
  },
  SB: {
    open: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s', '98s', '97s', '96s', '95s', '94s', '93s', '92s', '87s', '86s', '85s', '84s', '83s', '82s', '76s', '75s', '74s', '73s', '72s', '65s', '64s', '63s', '62s', '54s', '53s', '52s', '43s', '42s', '32s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '87o', '86o', '85o', '84o', '83o', '82o', '76o', '75o', '74o', '73o', '72o', '65o', '64o', '63o', '62o', '54o', '53o', '52o', '43o', '42o', '32o'],
  },
};

function handToCombo(hand: string): {rank: string, suit: string}[] {
  // Convierte "AKs" -> [{rank: 'A', suit: 's'}, {rank: 'K', suit: 's'}]
  // "AKo" -> [{rank: 'A', suit: 's'}, {rank: 'K', suit: 'h'}] (offsuit example)
  if (hand.length === 3) {
    const [r1, r2, s] = hand.split('');
    if (s === 's') return [{rank: r1, suit: 's'}, {rank: r2, suit: 's'}];
    if (s === 'o') return [{rank: r1, suit: 's'}, {rank: r2, suit: 'h'}]; // ejemplo
  }
  if (hand.length === 2) {
    const [r1, r2] = hand.split('');
    return [{rank: r1, suit: 's'}, {rank: r2, suit: 's'}]; // pocket pair
  }
  return [{rank: 'A', suit: 's'}, {rank: 'K', suit: 's'}];
}

function generateRandomHand(position: string, action: string, correctAction: string): Drill {
  const range = GTO_RANGES[position]?.[action] || GTO_RANGES[position]?.open || ['AA', 'AKs', 'AQo'];
  const handStr = range[Math.floor(Math.random() * range.length)];
  const hand = handToCombo(handStr);
  
  const actions = ['fold', 'call', 'raise', '3bet', '4bet', 'check'];
  const wrongActions = actions.filter(a => a !== correctAction);
  const userAction = Math.random() < 0.7 ? correctAction : wrongActions[Math.floor(Math.random() * wrongActions.length)];
  
  return {
    id: `drill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    position,
    action: action as Drill['action'],
    hand,
    correctAction,
    correctSizing: getCorrectSizing(position, action, correctAction),
    explanation: getExplanation(position, action, handStr, correctAction),
    difficulty: 'intermediate',
    tags: [position, action],
  };
}

function getCorrectSizing(position: string, action: string, correctAction: string): string {
  const sizings: Record<string, string> = {
    'open': '2.5bb (UTG/MP) / 2.2bb (CO/BTN)',
    '3bet': '3x IP / 3.5-4x OOP',
    '4bet': '2.2-2.5x',
    'call3bet': 'Call',
    'defendBB': 'Call / 3bet',
    'steal': '2.2-2.5bb',
  };
  return sizings[action] || 'Standard';
}

function getExplanation(position: string, action: string, hand: string, correctAction: string): string {
  const explanations: Record<string, string> = {
    'open': `${hand} está en rango de open de ${position}. Open raise estándar.`,
    '3bet': `${hand} es 3-bet ${correctAction === '3bet' ? 'value/bluff' : 'fold'} vs ${position} open.`,
    'defendBB': `${hand} vs BTN steal: ${correctAction === '3bet' ? '3-bet para valor/bluff' : 'Call para realizar equity'}.`,
  };
  return explanations[action] || `Acción correcta: ${correctAction}.`;
}

// Estado del trainer
const currentDrill = ref<Drill | null>(null);
const drillHistory = ref<DrillResult[]>([]);
const currentStreak = ref(0);
const bestStreak = ref(0);
const totalDrills = ref(0);
const correctDrills = ref(0);
const sessionStart = ref(Date.now());
const showFeedback = ref(false);
const feedbackType = ref<'correct' | 'incorrect' | 'partial'>('correct');
const feedbackMessage = ref('');
const isLoading = ref(false);
const selectedAction = ref<string>('');
const selectedSizing = ref<string>('');

const positions = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'] as const;
const actions = ['open', '3bet', 'defendBB', 'steal'] as const;

const currentPosition = ref('UTG');
const currentAction = ref('open');
const drillCount = ref(10);
const difficulty = ref<'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert'>('all');

const accuracy = computed(() => totalDrills.value === 0 ? 0 : Math.round((correctDrills.value / totalDrills.value) * 100));
const sessionTime = computed(() => Math.floor((Date.now() - sessionStart.value) / 1000));

function generateDrill() {
  isLoading.value = true;
  showFeedback.value = false;
  selectedAction.value = '';
  selectedSizing.value = '';
  
  // Simular carga
  setTimeout(() => {
    const pos = currentPosition.value;
    const act = currentAction.value;
    
    // Determinar acción correcta basada en posición y mano
    const drill = generateRandomHand(pos, act, getCorrectActionForHand(pos, act));
    currentDrill.value = drill;
    isLoading.value = false;
  }, 300);
}

function getCorrectActionForHand(position: string, action: string): string {
  // Lógica simplificada: manos premium = raise/3bet, medias = call, basura = fold
  // En realidad esto vendría de los rangos GTO
  const actionMap: Record<string, Record<string, string>> = {
    'open': { 'UTG': 'raise', 'MP': 'raise', 'CO': 'raise', 'BTN': 'raise', 'SB': 'raise', 'BB': 'check' },
    '3bet': { 'UTG': '3bet', 'MP': '3bet', 'CO': '3bet', 'BTN': '3bet', 'SB': '3bet', 'BB': '3bet' },
    'defendBB': { 'UTG': 'call', 'MP': 'call', 'CO': 'call', 'BTN': '3bet', 'SB': '3bet' },
    'steal': { 'CO': 'raise', 'BTN': 'raise', 'SB': 'raise' },
  };
  return actionMap[action]?.[position] || 'raise';
}

function submitAnswer() {
  if (!currentDrill.value || !selectedAction.value) return;
  
  const drill = currentDrill.value;
  const correct = selectedAction.value === drill.correctAction;
  const timeSpent = Date.now() - drillStartTime.value;
  
  const result: DrillResult = {
    drillId: drill.id,
    userAction: selectedAction.value,
    userSizing: selectedSizing.value || undefined,
    correct,
    timeSpent,
    timestamp: new Date().toISOString(),
  };
  
  drillHistory.value.unshift(result);
  totalDrills.value++;
  if (correct) {
    correctDrills.value++;
    currentStreak.value++;
    bestStreak.value = Math.max(bestStreak.value, currentStreak.value);
    feedbackType.value = 'correct';
    feedbackMessage.value = `¡Correcto! ${drill.explanation}`;
  } else {
    currentStreak.value = 0;
    feedbackType.value = 'incorrect';
    feedbackMessage.value = `Incorrecto. ${drill.explanation} La acción correcta era: ${drill.correctAction}.`;
  }
  
  showFeedback.value = true;
  
  // Auto-siguiente después de 2s si correcto, 3s si incorrecto
  setTimeout(() => {
    if (totalDrills.value < drillCount.value) {
      generateDrill();
    }
  }, correct ? 2000 : 3000);
}

const drillStartTime = ref(Date.now());

watch(currentDrill, () => {
  drillStartTime.value = Date.now();
});

function resetSession() {
  drillHistory.value = [];
  currentStreak.value = 0;
  totalDrills.value = 0;
  correctDrills.value = 0;
  sessionStart.value = Date.now();
  showFeedback.value = false;
  generateDrill();
}

function changePosition(pos: string) {
  currentPosition.value = pos;
  resetSession();
}

function changeAction(act: string) {
  currentAction.value = act;
  resetSession();
}

const positionLabels: Record<string, string> = {
  'UTG': 'Under The Gun',
  'MP': 'Middle Position',
  'CO': 'Cutoff',
  'BTN': 'Button',
  'SB': 'Small Blind',
  'BB': 'Big Blind',
};

const actionLabels: Record<string, string> = {
  'open': 'Open Raise',
  '3bet': '3-Bet',
  'defendBB': 'Defender BB',
  'steal': 'Steal (CO/BTN/SB)',
};

const actionOptions: Record<string, string[]> = {
  'open': ['fold', 'call', 'raise'],
  '3bet': ['fold', 'call', '3bet', '4bet'],
  'defendBB': ['fold', 'call', '3bet'],
  'steal': ['fold', 'call', 'raise'],
};

onMounted(() => {
  generateDrill();
});
</script>

<template>
  <div class="preflop-trainer">
    <!-- Header con stats -->
    <div class="trainer-header">
      <div class="trainer-title">
        <h2>Preflop Trainer</h2>
        <span class="trainer-subtitle">Spaced Repetition · GTO Ranges</span>
      </div>
      <div class="trainer-stats">
        <div class="stat">
          <span class="stat-value">{{ accuracy }}%</span>
          <span class="stat-label">Precisión</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ correctDrills }}/{{ totalDrills }}</span>
          <span class="stat-label">Correctas</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ currentStreak }}</span>
          <span class="stat-label">Racha</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ bestStreak }}</span>
          <span class="stat-label">Mejor</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ Math.floor(sessionTime / 60) }}:{{ String(sessionTime % 60).padStart(2, '0') }}</span>
          <span class="stat-label">Tiempo</span>
        </div>
      </div>
    </div>

    <!-- Controles -->
    <div class="trainer-controls">
      <div class="control-group">
        <label>Posición</label>
        <div class="position-tabs">
          <button
            v-for="pos in positions"
            :key="pos"
            :class="['pos-tab', 'pos-' + pos.toLowerCase(), { active: currentPosition === pos }]"
            @click="changePosition(pos)"
            :disabled="isLoading"
          >
            {{ pos }}
          </button>
        </div>
      </div>
      
      <div class="control-group">
        <label>Acción</label>
        <div class="action-tabs">
          <button
            v-for="act in actions"
            :key="act"
            :class="['action-tab', { active: currentAction === act }]"
            @click="changeAction(act)"
            :disabled="isLoading"
          >
            {{ actionLabels[act] }}
          </button>
        </div>
      </div>
      
      <div class="control-group">
        <label>Drills por sesión</label>
        <select v-model="drillCount" class="drill-count-select" :disabled="isLoading">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      
      <button class="btn-reset" @click="resetSession" :disabled="isLoading">
        Reiniciar Sesión
      </button>
    </div>

    <!-- Drill Actual -->
    <div class="drill-area" v-if="currentDrill && !isLoading">
      <div class="drill-context">
        <div class="context-badge pos-{{ currentDrill.position.toLowerCase() }}">
          {{ currentDrill.position }} - {{ positionLabels[currentDrill.position] }}
        </div>
        <div class="context-badge action-{{ currentDrill.action }}">
          {{ actionLabels[currentDrill.action] }}
        </div>
        <div class="context-badge difficulty-{{ currentDrill.difficulty }}">
          {{ currentDrill.difficulty }}
        </div>
      </div>

      <!-- Mano del héroe -->
      <div class="hero-hand">
        <span class="hand-label">Tu mano:</span>
        <CardHand
          :cards="currentDrill.hand"
          :face-up="true"
          :size="'lg'"
          :animated="true"
        />
      </div>

      <!-- Opciones de acción -->
      <div class="action-options">
        <span class="options-label">Tu decisión:</span>
        <div class="action-buttons">
          <button
            v-for="opt in actionOptions[currentDrill.action]"
            :key="opt"
            :class="[
              'action-btn',
              { selected: selectedAction === opt },
              { correct: showFeedback && opt === currentDrill.correctAction },
              { incorrect: showFeedback && selectedAction === opt && opt !== currentDrill.correctAction }
            ]"
            @click="selectedAction = opt"
            :disabled="showFeedback || isLoading"
          >
            {{ opt.toUpperCase() }}
            <span v-if="opt === currentDrill.correctSizing" class="sizing-hint">{{ opt === 'raise' || opt === '3bet' || opt === '4bet' ? currentDrill.correctSizing : '' }}</span>
          </button>
        </div>
      </div>

      <!-- Sizing input para raises -->
      <div class="sizing-input" v-if="['raise', '3bet', '4bet'].includes(selectedAction) && !showFeedback">
        <label>Tamaño (bb):</label>
        <input
          type="number"
          v-model="selectedSizing"
          step="0.5"
          min="1"
          max="100"
          placeholder="ej. 2.5"
          @keyup.enter="submitAnswer"
        />
        <button class="btn-submit" @click="submitAnswer" :disabled="!selectedSizing">Confirmar</button>
      </div>
      
      <div class="btn-submit-wrapper" v-if="!['raise', '3bet', '4bet'].includes(selectedAction)">
        <button class="btn-submit" @click="submitAnswer" :disabled="!selectedAction">Confirmar</button>
      </div>

      <!-- Feedback -->
      <div class="feedback" v-if="showFeedback" :class="feedbackType">
        <div class="feedback-icon">
          <svg v-if="feedbackType === 'correct'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
          <svg v-else-if="feedbackType === 'incorrect'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01"/></svg>
        </div>
        <p class="feedback-text">{{ feedbackMessage }}</p>
        <div class="feedback-explanation" v-if="currentDrill">
          <strong>Explicación GTO:</strong> {{ currentDrill.explanation }}
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div class="drill-loading" v-if="isLoading">
      <div class="spinner"></div>
      <p>Generando nuevo spot...</p>
    </div>

    <!-- Completado -->
    <div class="session-complete" v-if="totalDrills >= drillCount && !isLoading && !currentDrill">
      <div class="complete-icon">🏆</div>
      <h3>¡Sesión Completada!</h3>
      <div class="final-stats">
        <div class="final-stat">
          <span class="final-value">{{ accuracy }}%</span>
          <span class="final-label">Precisión Final</span>
        </div>
        <div class="final-stat">
          <span class="final-value">{{ currentStreak }}</span>
          <span class="final-label">Racha Final</span>
        </div>
        <div class="final-stat">
          <span class="final-value">{{ Math.floor(sessionTime / 60) }}:{{ String(sessionTime % 60).padStart(2, '0') }}</span>
          <span class="final-label">Tiempo Total</span>
        </div>
      </div>
      <button class="btn-primary" @click="resetSession">Nueva Sesión</button>
    </div>

    <!-- Historial -->
    <div class="drill-history" v-if="drillHistory.length > 0">
      <h4>Historial Reciente</h4>
      <div class="history-list">
        <div 
          v-for="(result, i) in drillHistory.slice(0, 10)" 
          :key="result.drillId"
          class="history-item"
          :class="{ correct: result.correct, incorrect: !result.correct }"
        >
          <span class="history-result">{{ result.correct ? '✓' : '✗' }}</span>
          <span class="history-action">{{ result.userAction.toUpperCase() }}</span>
          <span class="history-time">{{ Math.round(result.timeSpent / 1000) }}s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preflop-trainer {
  max-width: 700px;
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

.trainer-title h2 {
  margin: 0;
  font-size: 1.5rem;
}

.trainer-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.trainer-stats {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border-radius: 10px;
  min-width: 80px;
  flex: 1;
}

.stat-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--poker-gold);
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.trainer-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 12px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.control-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.position-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.pos-tab {
  padding: 6px 12px;
  border: 1px solid var(--border-default);
  background: var(--bg-tertiary);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.pos-tab:hover:not(:disabled) {
  border-color: var(--poker-gold);
}

.pos-tab.active {
  background: var(--poker-felt);
  border-color: var(--poker-felt);
  color: white;
}

.pos-tab.pos-utg.active { background: var(--info); border-color: var(--info); }
.pos-tab.pos-mp.active { background: var(--success); border-color: var(--success); }
.pos-tab.pos-co.active { background: var(--warning); border-color: var(--warning); color: var(--poker-black); }
.pos-tab.pos-btn.active { background: var(--poker-felt); border-color: var(--poker-felt); }
.pos-tab.pos-sb.active { background: var(--error); border-color: var(--error); }
.pos-tab.pos-bb.active { background: var(--poker-gold); border-color: var(--poker-gold); color: var(--poker-black); }

.action-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.action-tab {
  padding: 6px 12px;
  border: 1px solid var(--border-default);
  background: var(--bg-tertiary);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.action-tab:hover:not(:disabled) { border-color: var(--poker-gold); }
.action-tab.active { background: var(--poker-gold); border-color: var(--poker-gold); color: var(--poker-black); }

.drill-count-select {
  padding: 6px 10px;
  border: 1px solid var(--border-default);
  background: var(--bg-tertiary);
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-reset {
  padding: 6px 16px;
  background: transparent;
  border: 1px solid var(--border-default);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-reset:hover:not(:disabled) {
  border-color: var(--error);
  color: var(--error);
}

.drill-area {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  padding: 24px;
}

.drill-context {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.context-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.context-badge.pos-utg { background: var(--info)/15; color: var(--info); border: 1px solid var(--info)/30; }
.context-badge.pos-mp { background: var(--success)/15; color: var(--success); border: 1px solid var(--success)/30; }
.context-badge.pos-co { background: var(--warning)/15; color: var(--warning-dark); border: 1px solid var(--warning)/30; }
.context-badge.pos-btn { background: var(--poker-felt)/15; color: var(--poker-felt); border: 1px solid var(--poker-felt)/30; }
.context-badge.pos-sb { background: var(--error)/15; color: var(--error); border: 1px solid var(--error)/30; }
.context-badge.pos-bb { background: var(--poker-gold)/15; color: var(--poker-gold-dark); border: 1px solid var(--poker-gold)/30; }

.context-badge.action-open { background: var(--poker-gold)/15; color: var(--poker-gold-dark); border: 1px solid var(--poker-gold)/30; }
.context-badge.action-3bet { background: var(--error)/15; color: var(--error); border: 1px solid var(--error)/30; }
.context-badge.action-defendbb { background: var(--info)/15; color: var(--info); border: 1px solid var(--info)/30; }
.context-badge.action-steal { background: var(--warning)/15; color: var(--warning-dark); border: 1px solid var(--warning)/30; }

.context-badge.difficulty-beginner { background: var(--success)/15; color: var(--success); }
.context-badge.difficulty-intermediate { background: var(--info)/15; color: var(--info); }
.context-badge.difficulty-advanced { background: var(--warning)/15; color: var(--warning-dark); }
.context-badge.difficulty-expert { background: var(--error)/15; color: var(--error); }

.hero-hand {
  margin: 24px 0;
}

.hand-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.action-options {
  margin: 24px 0;
}

.options-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 12px 24px;
  border: 2px solid var(--border-default);
  background: var(--bg-secondary);
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--poker-gold);
  transform: translateY(-2px);
}

.action-btn.selected {
  border-color: var(--poker-felt);
  background: var(--poker-felt)/10;
  color: var(--poker-felt);
}

.action-btn.correct {
  border-color: var(--success);
  background: var(--success)/15;
  color: var(--success);
  animation: pulse 0.5s ease-out;
}

.action-btn.incorrect {
  border-color: var(--error);
  background: var(--error)/15;
  color: var(--error);
  animation: shake 0.5s ease-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.sizing-hint {
  font-size: 0.65rem;
  font-weight: 400;
  opacity: 0.7;
  color: var(--text-muted);
}

.sizing-input {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.sizing-input label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.sizing-input input {
  width: 100px;
  padding: 10px 12px;
  border: 2px solid var(--border-default);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.sizing-input input:focus {
  outline: none;
  border-color: var(--poker-gold);
}

.btn-submit {
  padding: 12px 32px;
  background: var(--poker-felt);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-submit:hover:not(:disabled) {
  background: var(--poker-felt-light);
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback {
  padding: 16px;
  border-radius: 12px;
  margin-top: 16px;
  animation: slideUp 0.3s ease-out;
}

.feedback.correct {
  background: var(--success)/10;
  border: 1px solid var(--success)/30;
}

.feedback.incorrect {
  background: var(--error)/10;
  border: 1px solid var(--error)/30;
}

.feedback.partial {
  background: var(--warning)/10;
  border: 1px solid var(--warning)/30;
}

.feedback-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
}

.feedback.correct .feedback-icon { color: var(--success); }
.feedback.incorrect .feedback-icon { color: var(--error); }
.feedback.partial .feedback-icon { color: var(--warning); }

.feedback-text {
  font-weight: 600;
  margin: 0 0 8px 0;
}

.feedback-explanation {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.drill-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  color: var(--text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-default);
  border-top-color: var(--poker-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.session-complete {
  text-align: center;
  padding: 40px 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.complete-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.session-complete h3 {
  margin: 0 0 24px 0;
  font-size: 1.5rem;
}

.final-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.final-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  min-width: 100px;
}

.final-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--poker-gold);
}

.final-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.drill-history {
  margin-top: 24px;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 12px;
}

.drill-history h4 {
  margin: 0 0 12px 0;
  font-size: 0.9rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
}

.history-item.correct {
  background: var(--success)/10;
}

.history-item.incorrect {
  background: var(--error)/10;
}

.history-result {
  font-weight: 700;
  min-width: 20px;
}

.history-item.correct .history-result { color: var(--success); }
.history-item.incorrect .history-result { color: var(--error); }

.history-action {
  flex: 1;
  text-transform: uppercase;
}

.history-time {
  color: var(--text-muted);
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 600px) {
  .trainer-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .position-tabs, .action-tabs {
    justify-content: center;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .final-stats {
    flex-direction: column;
    align-items: center;
  }
}
</style>