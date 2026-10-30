<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import PlayingCard from './PlayingCard.vue';

interface Range {
  name: string;
  combos: Array<{rank: string, suit: string}[]>;
  color: string;
}

interface EquityResult {
  range1: { equity: number; wins: number; ties: number };
  range2: { equity: number; wins: number; ties: number };
  totalSimulations: number;
  timeMs: number;
  board: Array<{rank: string, suit: string}>;
}

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['s', 'h', 'd', 'c'];
const SUIT_SYMBOLS: Record<string, string> = {s: '♠', h: '♥', d: '♦', c: 'c'};

function generateDeck(exclude: Array<{rank: string, suit: string}> = []): Array<{rank: string, suit: string}> {
  const deck: Array<{rank: string, suit: string}> = [];
  const excluded = new Set(exclude.map(c => `${c.rank}${c.suit}`));
  
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      if (!excluded.has(`${rank}${suit}`)) {
        deck.push({rank, suit});
      }
    }
  }
  return deck;
}

function evaluateHand(hole: Array<{rank: string, suit: string}>, board: Array<{rank: string, suit: string}>): number {
  // Evaluador simplificado - retorna un score numérico para comparación
  // En producción usaríamos una librería como pokerstove/eval7
  const allCards = [...hole, ...board];
  const ranks = allCards.map(c => c.rank);
  const suits = allCards.map(c => c.suit);
  
  // Contar ranks
  const rankCounts: Record<string, number> = {};
  ranks.forEach(r => rankCounts[r] = (rankCounts[r] || 0) + 1);
  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  
  // Contar suits
  const suitCounts: Record<string, number> = {};
  suits.forEach(s => suitCounts[s] = (suitCounts[s] || 0) + 1);
  const maxSuit = Math.max(...Object.values(suitCounts));
  
  // Straight check
  const uniqueRanks = [...new Set(ranks.map(r => RANKS.indexOf(r)))].sort((a, b) => a - b);
  let straight = 0;
  for (let i = 0; i <= uniqueRanks.length - 5; i++) {
    if (uniqueRanks[i+4] - uniqueRanks[i] === 4) straight = 5;
  }
  // Wheel straight
  if (uniqueRanks.includes(12) && uniqueRanks.includes(0) && uniqueRanks.includes(1) && uniqueRanks.includes(2) && uniqueRanks.includes(3)) {
    straight = 5;
  }
  
  const flush = maxSuit >= 5;
  
  // Hand ranking (simplificado)
  if (flush && straight) return 9000 + uniqueRanks[uniqueRanks.length-1]; // Straight flush
  if (counts[0] === 4) return 8000 + RANKS.indexOf(Object.keys(rankCounts).find(k => rankCounts[k]===4)||'A'); // Quads
  if (counts[0] === 3 && counts[1] === 2) return 7000 + RANKS.indexOf(Object.keys(rankCounts).find(k => rankCounts[k]===3)||'A'); // Full house
  if (flush) return 6000; // Flush
  if (straight) return 5000 + uniqueRanks[uniqueRanks.length-1]; // Straight
  if (counts[0] === 3) return 4000 + RANKS.indexOf(Object.keys(rankCounts).find(k => rankCounts[k]===3)||'A'); // Trips
  if (counts[0] === 2 && counts[1] === 2) return 3000; // Two pair
  if (counts[0] === 2) return 2000 + RANKS.indexOf(Object.keys(rankCounts).find(k => rankCounts[k]===2)||'A'); // Pair
  return 1000 + uniqueRanks[uniqueRanks.length-1]; // High card
}

function simulateEquity(
  range1: Array<{rank: string, suit: string}[]>,
  range2: Array<{rank: string, suit: string}[]>,
  board: Array<{rank: string, suit: string}>,
  simulations: number
): EquityResult {
  const startTime = performance.now();
  let wins1 = 0, wins2 = 0, ties = 0;
  
  const usedCards = [...board, ...range1.flat(), ...range2.flat()];
  const deck = generateDeck(usedCards);
  
  for (let i = 0; i < simulations; i++) {
    // Completar board si necesario
    let currentBoard = [...board];
    const remainingBoard = 5 - board.length;
    
    if (remainingBoard > 0) {
      // Shuffle deck
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      currentBoard.push(...shuffled.slice(0, remainingBoard));
    }
    
    // Sample random hands from ranges
    const hand1 = range1[Math.floor(Math.random() * range1.length)];
    const hand2 = range2[Math.floor(Math.random() * range2.length)];
    
    // Check for card conflicts
    const hand1Cards = hand1.map(c => `${c.rank}${c.suit}`);
    const hand2Cards = hand2.map(c => `${c.rank}${c.suit}`);
    const boardCards = currentBoard.map(c => `${c.rank}${c.suit}`);
    const allCards = [...hand1Cards, ...hand2Cards, ...boardCards];
    
    if (new Set(allCards).size !== allCards.length) {
      i--; // Retry
      continue;
    }
    
    const score1 = evaluateHand(hand1, currentBoard);
    const score2 = evaluateHand(hand2, currentBoard);
    
    if (score1 > score2) wins1++;
    else if (score2 > score1) wins2++;
    else ties++;
  }
  
  const total = wins1 + wins2 + ties;
  return {
    range1: { equity: wins1 / total, wins: wins1, ties },
    range2: { equity: wins2 / total, wins: wins2, ties },
    totalSimulations: total,
    timeMs: performance.now() - startTime,
    board,
  };
}

// Rangos predefinidos
const PREDEFINED_RANGES: Record<string, Range> = {
  'AA': { name: 'AA', combos: [['As', 'Ah'], ['As', 'Ad'], ['As', 'Ac'], ['Ah', 'Ad'], ['Ah', 'Ac'], ['Ad', 'Ac']].map(c => c.map(parseCard)), color: '#C0392B' },
  'KK+': { name: 'KK+', combos: ['KK', 'AA'].flatMap(r => generateCombos(r)), color: '#C0392B' },
  'QQ+': { name: 'QQ+', combos: ['QQ', 'KK', 'AA'].flatMap(r => generateCombos(r)), color: '#E74C3C' },
  'JJ+': { name: 'JJ+', combos: ['JJ', 'QQ', 'KK', 'AA'].flatMap(r => generateCombos(r)), color: '#E74C3C' },
  'TT+': { name: 'TT+', combos: ['TT', 'JJ', 'QQ', 'KK', 'AA'].flatMap(r => generateCombos(r)), color: '#F39C12' },
  'AKs': { name: 'AKs', combos: generateCombos('AKs'), color: '#F39C12' },
  'AKo': { name: 'AKo', combos: generateCombos('AKo'), color: '#F39C12' },
  'AK': { name: 'AK', combos: [...generateCombos('AKs'), ...generateCombos('AKo')], color: '#F39C12' },
  'AQs+': { name: 'AQs+', combos: ['AQs', 'AKs'].flatMap(r => generateCombos(r)), color: '#F39C12' },
  'AQo+': { name: 'AQo+', combos: ['AQo', 'AKo'].flatMap(r => generateCombos(r)), color: '#F39C12' },
  'UTG Open': { name: 'UTG Open', combos: parseRangeString('22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, AJo+, KQo'), color: '#3498DB' },
  'MP Open': { name: 'MP Open', combos: parseRangeString('22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, 43s, AJo+, KQo, QJo'), color: '#2980B9' },
  'CO Open': { name: 'CO Open', combos: parseRangeString('22+, A2s+, K2s+, Q8s+, J8s+, T8s+, 97s+, 86s+, 76s, 65s, 54s, 43s, 32s, A2o+, K9o+, Q9o+, J9o+, T9o, 98o'), color: '#1ABC9C' },
  'BTN Open': { name: 'BTN Open', combos: parseRangeString('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 42o+, 32o+'), color: '#16A085' },
  'BB vs BTN': { name: 'BB vs BTN', combos: parseRangeString('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K5o+, Q7o+, J7o+, T7o+, 96o+, 86o+, 75o+, 65o'), color: '#9B59B6' },
  '3bet IP': { name: '3bet IP', combos: parseRangeString('JJ+, AK, AQs, A5s-A2s, KQs, KJs, QJs, JTs, T9s, 98s, 87s, 76s, 65s, 54s, AJo, KQo'), color: '#E67E22' },
  '3bet OOP': { name: '3bet OOP', combos: parseRangeString('QQ+, AK, AQs, A5s-A2s, KQs, KJs, QJs, JTs, AJo, KQo'), color: '#D35400' },
};

function parseRangeString(rangeStr: string): Array<{rank: string, suit: string}[]> {
  // Parser simplificado - en producción usar librería completa
  const combos: Array<{rank: string, suit: string}[]> = [];
  const parts = rangeStr.split(',').map(p => p.trim());
  
  for (const part of parts) {
    if (part.endsWith('+') && part.length >= 2) {
      // Pares: 22+, TT+
      const rank = part[0] + part[1];
      if (rank[0] === rank[1]) {
        const startIdx = RANKS.indexOf(rank[0]);
        for (let i = startIdx; i < RANKS.length; i++) {
          combos.push(...generateCombos(RANKS[i] + RANKS[i]));
        }
      }
    } else if (part.includes('s+') || part.includes('o+')) {
      // Suited/offsuit ranges: A2s+, K9s+
      // Simplificado
    } else {
      combos.push(...generateCombos(part));
    }
  }
  return combos;
}

function generateCombos(hand: string): Array<{rank: string, suit: string}[]> {
  const combos: Array<{rank: string, suit: string}[]> = [];
  if (hand.length === 2) {
    // Pocket pair
    const rank = hand[0];
    for (let i = 0; i < SUITS.length; i++) {
      for (let j = i + 1; j < SUITS.length; j++) {
        combos.push([{rank, suit: SUITS[i]}, {rank, suit: SUITS[j]}]);
      }
    }
  } else if (hand.length === 3) {
    const [r1, r2, type] = hand.split('');
    if (type === 's') {
      // Suited
      for (const suit of SUITS) {
        combos.push([{rank: r1, suit}, {rank: r2, suit}]);
      }
    } else if (type === 'o') {
      // Offsuit
      for (let i = 0; i < SUITS.length; i++) {
        for (let j = 0; j < SUITS.length; j++) {
          if (i !== j) {
            combos.push([{rank: r1, suit: SUITS[i]}, {rank: r2, suit: SUITS[j]}]);
          }
        }
      }
    }
  }
  return combos;
}

function parseCard(str: string): {rank: string, suit: string} {
  const suitMap: Record<string, string> = {'s': 's', 'h': 'h', 'd': 'd', 'c': 'c', '♠': 's', '♥': 'h', '♦': 'd', '♣': 'c'};
  const suit = suitMap[str.slice(-1)] || 's';
  const rank = str.slice(0, -1).toUpperCase();
  return {rank, suit};
}

// Estado
const range1Input = ref('UTG Open');
const range2Input = ref('BB vs BTN');
const range1Custom = ref('');
const range2Custom = ref('');
const boardInput = ref('');
const simulations = ref(50000);
const isCalculating = ref(false);
const result = ref<EquityResult | null>(null);
const error = ref('');

const range1Combos = computed(() => {
  if (range1Custom.value) return parseRangeString(range1Custom.value);
  return PREDEFINED_RANGES[range1Input.value]?.combos || [];
});

const range2Combos = computed(() => {
  if (range2Custom.value) return parseRangeString(range2Custom.value);
  return PREDEFINED_RANGES[range2Input.value]?.combos || [];
});

const boardCards = computed(() => {
  if (!boardInput.value) return [];
  return boardInput.value.split(' ').filter(Boolean).map(parseCard);
});

const usedCards = computed(() => {
  const cards: Array<{rank: string, suit: string}> = [];
  range1Combos.value.flat().forEach(c => cards.push(c));
  range2Combos.value.flat().forEach(c => cards.push(c));
  boardCards.value.forEach(c => cards.push(c));
  return cards;
});

const availableCards = computed(() => {
  const used = new Set(usedCards.value.map(c => `${c.rank}${c.suit}`));
  return RANKS.flatMap(rank => SUITS.map(suit => ({rank, suit}))).filter(c => !used.has(`${c.rank}${c.suit}`));
});

async function calculate() {
  if (isCalculating.value) return;
  
  if (range1Combos.value.length === 0 || range2Combos.value.length === 0) {
    error.value = 'Selecciona rangos válidos para ambos jugadores';
    return;
  }
  
  if (boardCards.value.length > 5) {
    error.value = 'Máximo 5 cartas en el board';
    return;
  }
  
  // Check conflicts
  const allCards = [...range1Combos.value.flat(), ...range2Combos.value.flat(), ...boardCards.value];
  const uniqueCards = new Set(allCards.map(c => `${c.rank}${c.suit}`));
  if (uniqueCards.size !== allCards.length) {
    error.value = 'Conflicto de cartas: hay duplicados entre rangos y board';
    return;
  }
  
  error.value = '';
  isCalculating.value = true;
  result.value = null;
  
  // Run in web worker or setTimeout para no bloquear UI
  await nextTick();
  
  try {
    const res = simulateEquity(range1Combos.value, range2Combos.value, boardCards.value, simulations.value);
    result.value = res;
  } catch (e) {
    error.value = 'Error en cálculo: ' + (e as Error).message;
  } finally {
    isCalculating.value = false;
  }
}

function addCardToBoard(card: {rank: string, suit: string}) {
  if (boardCards.value.length >= 5) return;
  const current = boardInput.value.trim();
  boardInput.value = current + (current ? ' ' : '') + card.rank + SUIT_SYMBOLS[card.suit];
}

function clearBoard() {
  boardInput.value = '';
}

function swapRanges() {
  const temp = range1Input.value;
  range1Input.value = range2Input.value;
  range2Input.value = temp;
  const tempCustom = range1Custom.value;
  range1Custom.value = range2Custom.value;
  range2Custom.value = tempCustom;
}

function formatEquity(equity: number): string {
  return (equity * 100).toFixed(2) + '%';
}

function formatEquityWithTies(e: EquityResult['range1']): string {
  return `${(e.equity * 100).toFixed(2)}% (${e.wins}W / ${e.ties}T)`;
}

onMounted(() => {
  calculate();
});
</script>

<template>
  <div class="equity-calculator">
    <div class="calc-header">
      <h2>Equity Calculator</h2>
      <span class="calc-subtitle">Monte Carlo Simulation · Range vs Range · Real-time</span>
    </div>

    <!-- Rangos -->
    <div class="ranges-section">
      <div class="range-input-group">
        <label>Rango 1 (Hero)</label>
        <div class="range-selector">
          <select v-model="range1Input" class="range-select" @change="range1Custom = ''">
            <option value="" disabled>-- Predefinidos --</option>
            <optgroup label="Premium">
              <option value="AA">AA (6 combos)</option>
              <option value="KK+">KK+ (12 combos)</option>
              <option value="QQ+">QQ+ (18 combos)</option>
              <option value="JJ+">JJ+ (24 combos)</option>
              <option value="TT+">TT+ (30 combos)</option>
              <option value="AKs">AKs (4 combos)</option>
              <option value="AKo">AKo (12 combos)</option>
              <option value="AK">AK (16 combos)</option>
            </optgroup>
            <optgroup label="Open Ranges">
              <option value="UTG Open">UTG Open (~13%)</option>
              <option value="MP Open">MP Open (~18%)</option>
              <option value="CO Open">CO Open (~28%)</option>
              <option value="BTN Open">BTN Open (~45%)</option>
            </optgroup>
            <optgroup label="Vs Ranges">
              <option value="BB vs BTN">BB Defend vs BTN</option>
              <option value="3bet IP">3-bet IP</option>
              <option value="3bet OOP">3-bet OOP</option>
            </optgroup>
            <option value="custom">✏️ Personalizado...</option>
          </select>
          <button class="btn-swap" @click="swapRanges" title="Intercambiar rangos">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16l4 4 4-4M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/></svg>
          </button>
        </div>
        <div class="range-info">
          <span>{{ range1Combos.length }} combos</span>
          <span class="range-percent">({{ ((range1Combos.length / 1326) * 100).toFixed(1) }}% de manos)</span>
        </div>
        <div class="custom-range" v-if="range1Input === 'custom' || range1Custom">
          <textarea 
            v-model="range1Custom" 
            placeholder="ej: AA, KK, AKs, AKo, AQs+, 22-99"
            rows="2"
            @input="range1Input = 'custom'"
          ></textarea>
        </div>
      </div>

      <div class="range-input-group">
        <label>Rango 2 (Villain)</label>
        <div class="range-selector">
          <select v-model="range2Input" class="range-select" @change="range2Custom = ''">
            <option value="" disabled>-- Predefinidos --</option>
            <optgroup label="Premium">
              <option value="AA">AA (6 combos)</option>
              <option value="KK+">KK+ (12 combos)</option>
              <option value="QQ+">QQ+ (18 combos)</option>
              <option value="JJ+">JJ+ (24 combos)</option>
              <option value="TT+">TT+ (30 combos)</option>
              <option value="AK">AK (16 combos)</option>
            </optgroup>
            <optgroup label="Open Ranges">
              <option value="UTG Open">UTG Open (~13%)</option>
              <option value="MP Open">MP Open (~18%)</option>
              <option value="CO Open">CO Open (~28%)</option>
              <option value="BTN Open">BTN Open (~45%)</option>
            </optgroup>
            <optgroup label="Vs Ranges">
              <option value="BB vs BTN">BB Defend vs BTN</option>
              <option value="3bet IP">3-bet IP</option>
              <option value="3bet OOP">3-bet OOP</option>
            </optgroup>
            <option value="custom">✏️ Personalizado...</option>
          </select>
        </div>
        <div class="range-info">
          <span>{{ range2Combos.length }} combos</span>
          <span class="range-percent">({{ ((range2Combos.length / 1326) * 100).toFixed(1) }}%)</span>
        </div>
        <div class="custom-range" v-if="range2Input === 'custom' || range2Custom">
          <textarea 
            v-model="range2Custom" 
            placeholder="ej: 22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, AJo+, KQo"
            rows="2"
            @input="range2Input = 'custom'"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Board -->
    <div class="board-section">
      <label>Board (0-5 cartas, separadas por espacio)</label>
      <div class="board-input-row">
        <input 
          type="text" 
          v-model="boardInput" 
          class="board-input"
          placeholder="ej: As Kh 7d | 9s 8s 7h | As Ks Qs Js Ts"
          @keyup.enter="calculate"
        />
        <div class="board-visual">
          <PlayingCard 
            v-for="card in boardCards" 
            :key="card.rank + card.suit"
            :rank="card.rank"
            :suit="card.suit"
            :size="'sm'"
            :face-up="true"
            :animate="false"
          />
        </div>
      </div>
      <div class="board-quick">
        <button v-for="rank in ['A','K','Q','J','T','9','8','7','6','5','4','3','2']" :key="rank" @click="addCardToBoard({rank, suit: 's'})" class="quick-card">{{ rank }}♠</button>
        <button v-for="rank in ['A','K','Q','J','T']" :key="'h'+rank" @click="addCardToBoard({rank, suit: 'h'})" class="quick-card red">{{ rank }}♥</button>
        <button class="quick-card clear" @click="clearBoard">Limpiar</button>
      </div>
    </div>

    <!-- Simulaciones -->
    <div class="simulations-section">
      <label>Simulaciones Monte Carlo: <strong>{{ simulations.toLocaleString() }}</strong></label>
      <input type="range" v-model="simulations" min="1000" max="200000" step="1000" class="sim-slider" />
      <div class="sim-presets">
        <button @click="simulations = 10000" :class="{ active: simulations === 10000 }">10K (rápido)</button>
        <button @click="simulations = 50000" :class="{ active: simulations === 50000 }">50K (estándar)</button>
        <button @click="simulations = 100000" :class="{ active: simulations === 100000 }">100K (preciso)</button>
        <button @click="simulations = 200000" :class="{ active: simulations === 200000 }">200K (máx)</button>
      </div>
    </div>

    <!-- Calcular -->
    <button class="btn-calculate" @click="calculate" :disabled="isCalculating || range1Combos.length === 0 || range2Combos.length === 0">
      <span v-if="isCalculating">
        <span class="spinner-sm"></span> Calculando...
      </span>
      <span v-else>Calcular Equity</span>
    </button>

    <p v-if="error" class="calc-error">{{ error }}</p>

    <!-- Resultados -->
    <div class="results" v-if="result">
      <div class="result-header">
        <h3>Resultados</h3>
        <span class="sim-info">{{ result.totalSimulations.toLocaleString() }} sims · {{ result.timeMs.toFixed(0) }}ms</span>
      </div>

      <div class="equity-bars">
        <div class="equity-bar-group">
          <div class="equity-label">
            <span class="range-name" :style="{ color: PREDEFINED_RANGES[range1Input]?.color || '#3498DB' }">Rango 1</span>
            <span class="equity-value">{{ formatEquity(result.range1.equity) }}</span>
          </div>
          <div class="equity-bar-track">
            <div 
              class="equity-bar-fill range1-fill" 
              :style="{ width: (result.range1.equity * 100) + '%' }"
            ></div>
          </div>
          <div class="equity-detail">{{ formatEquityWithTies(result.range1) }}</div>
        </div>

        <div class="equity-bar-group">
          <div class="equity-label">
            <span class="range-name" :style="{ color: PREDEFINED_RANGES[range2Input]?.color || '#E74C3C' }">Rango 2</span>
            <span class="equity-value">{{ formatEquity(result.range2.equity) }}</span>
          </div>
          <div class="equity-bar-track">
            <div 
              class="equity-bar-fill range2-fill" 
              :style="{ width: (result.range2.equity * 100) + '%' }"
            ></div>
          </div>
          <div class="equity-detail">{{ formatEquityWithTies(result.range2) }}</div>
        </div>
      </div>

      <!-- Ties bar -->
      <div class="ties-bar" v-if="result.range1.ties > 0">
        <div class="equity-label">
          <span class="range-name">Empates</span>
          <span class="equity-value">{{ ((result.range1.ties / result.totalSimulations) * 100).toFixed(2) }}%</span>
        </div>
        <div class="equity-bar-track">
          <div class="equity-bar-fill ties-fill" :style="{ width: ((result.range1.ties / result.totalSimulations) * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Heatmap placeholder -->
      <div class="heatmap-placeholder">
        <p>🔥 Heatmap Range vs Range próximamente</p>
        <p class="heatmap-hint">Cada celda = equity de un combo específico vs rango rival</p>
      </div>
    </div>

    <!-- Fórmulas LaTeX -->
    <div class="formulas-section">
      <h4>Matemáticas detrás del cálculo</h4>
      
      :::formula id="equity-definition" title="Definición de Equity" difficulty="intermediate"
      $$
      \text{Equity}(R_1, R_2, B) = \frac{1}{|R_1| \cdot |R_2| \cdot |B_{rem}|} \sum_{h_1 \in R_1} \sum_{h_2 \in R_2} \sum_{b \in B_{rem}} \mathbb{1}[h_1 \succ h_2 | B \cup b]
      $$
      :::

      :::formula id="monte-carlo" title="Estimación Monte Carlo" difficulty="intermediate"
      $$
      \hat{E} = \frac{W_1}{N} \approx \text{Equity} \quad \text{con error estándar } \sigma = \sqrt{\frac{\hat{E}(1-\hat{E})}{N}}
      $$
      :::

      :::formula id="confidence-interval" title="Intervalo de Confianza 95%" difficulty="advanced"
      $$
      \text{CI}_{95\%} = \hat{E} \pm 1.96 \cdot \sqrt{\frac{\hat{E}(1-\hat{E})}{N}}
      $$
      :::
    </div>
  </div>
</template>

<style scoped>
.equity-calculator {
  max-width: 900px;
  margin: 0 auto;
}

.calc-header {
  text-align: center;
  margin-bottom: 24px;
}

.calc-header h2 { margin: 0 0 4px 0; font-size: 1.75rem; }
.calc-subtitle { color: var(--text-muted); font-size: 0.9rem; }

.ranges-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.range-input-group {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: 16px;
}

.range-input-group label { display: block; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary); }

.range-selector { display: flex; gap: 8px; align-items: center; }
.range-select { flex: 1; padding: 10px 12px; border: 1px solid var(--border-default); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); font-size: 0.9rem; cursor: pointer; }
.range-select:focus { outline: none; border-color: var(--poker-gold); }

.btn-swap { padding: 10px; background: var(--bg-tertiary); border: 1px solid var(--border-default); border-radius: 8px; cursor: pointer; color: var(--text-secondary); transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
.btn-swap:hover { border-color: var(--poker-gold); color: var(--poker-gold); background: var(--poker-gold)/10; }
.btn-swap svg { width: 20px; height: 20px; }

.range-info { display: flex; gap: 12px; margin-top: 8px; font-size: 0.8rem; color: var(--text-muted); }
.range-percent { color: var(--poker-gold); font-weight: 600; }

.custom-range { margin-top: 12px; }
.custom-range textarea { width: 100%; padding: 10px; border: 1px solid var(--border-default); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; resize: vertical; min-height: 60px; }
.custom-range textarea:focus { outline: none; border-color: var(--poker-gold); }

.board-section { margin-bottom: 24px; }
.board-section label { display: block; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary); }

.board-input-row { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
.board-input { flex: 1; padding: 12px; border: 1px solid var(--border-default); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; }
.board-input:focus { outline: none; border-color: var(--poker-gold); }

.board-visual { display: flex; gap: 6px; min-width: 200px; }

.board-quick { display: flex; flex-wrap: wrap; gap: 6px; }
.quick-card { padding: 6px 10px; background: var(--bg-tertiary); border: 1px solid var(--border-default); border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: 'JetBrains Mono', monospace; }
.quick-card:hover { border-color: var(--poker-gold); background: var(--poker-gold)/10; }
.quick-card.red { color: var(--poker-red); }
.quick-card.clear { background: var(--error)/10; border-color: var(--error)/30; color: var(--error); }
.quick-card.clear:hover { background: var(--error)/20; }

.simulations-section { margin-bottom: 24px; padding: 16px; background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 12px; }
.simulations-section label { display: block; font-weight: 600; margin-bottom: 12px; color: var(--text-secondary); }
.sim-slider { width: 100%; accent-color: var(--poker-gold); margin-bottom: 12px; }
.sim-presets { display: flex; gap: 8px; flex-wrap: wrap; }
.sim-presets button { padding: 6px 12px; border: 1px solid var(--border-default); background: var(--bg-tertiary); border-radius: 6px; font-size: 0.75rem; cursor: pointer; transition: all 0.15s; }
.sim-presets button:hover { border-color: var(--poker-gold); }
.sim-presets button.active { background: var(--poker-gold); border-color: var(--poker-gold); color: var(--poker-black); font-weight: 600; }

.btn-calculate { width: 100%; padding: 16px; background: linear-gradient(135deg, var(--poker-gold), var(--poker-gold-light)); color: var(--poker-black); border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-calculate:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px -4px rgba(212, 168, 67, 0.4); }
.btn-calculate:disabled { opacity: 0.5; cursor: not-allowed; }
.spinner-sm { width: 18px; height: 18px; border: 2px solid transparent; border-top-color: var(--poker-black); border-radius: 50%; animation: spin 1s linear infinite; }

.calc-error { color: var(--error); text-align: center; padding: 12px; background: var(--error)/10; border-radius: 8px; margin-top: 12px; }

.results { background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 16px; padding: 24px; margin-top: 24px; animation: slideUp 0.4s ease-out; }
.result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-light); }
.result-header h3 { margin: 0; }
.sim-info { font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }

.equity-bars { display: flex; flex-direction: column; gap: 20px; }
.equity-bar-group { }
.equity-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.range-name { font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.85rem; }
.equity-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--poker-gold); }
.equity-bar-track { height: 20px; background: var(--bg-tertiary); border-radius: 10px; overflow: hidden; }
.equity-bar-fill { height: 100%; border-radius: 10px; transition: width 0.8s ease-out; }
.range1-fill { background: linear-gradient(90deg, #3498DB, #5DADE2); }
.range2-fill { background: linear-gradient(90deg, #E74C3C, #EC7063); }
.ties-fill { background: linear-gradient(90deg, var(--warning), var(--warning-light)); }
.equity-detail { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; font-family: 'JetBrains Mono', monospace; }

.ties-bar { padding-top: 12px; border-top: 1px solid var(--border-light); margin-top: 12px; }

.heatmap-placeholder { margin-top: 24px; padding: 32px; text-align: center; background: var(--bg-tertiary); border-radius: 12px; border: 2px dashed var(--border-default); color: var(--text-muted); }
.heatmap-placeholder p:first-child { font-size: 1.25rem; margin-bottom: 8px; }
.heatmap-hint { font-size: 0.85rem; }

.formulas-section { margin-top: 32px; }
.formulas-section h4 { margin: 0 0 16px 0; font-size: 1rem; color: var(--text-secondary); }
</style>