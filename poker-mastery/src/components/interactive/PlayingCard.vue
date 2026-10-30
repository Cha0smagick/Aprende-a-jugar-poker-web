<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';

interface Props {
  rank: 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
  suit: 's' | 'h' | 'd' | 'c';
  faceUp?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  selectable?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  animate?: boolean;
  showIndex?: boolean;
  index?: number;
  onClick?: (card: CardData) => void;
  onHover?: (card: CardData, hovering: boolean) => void;
}

interface CardData {
  rank: string;
  suit: string;
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  faceUp: true,
  size: 'md',
  selectable: false,
  selected: false,
  highlighted: false,
  disabled: false,
  animate: true,
  showIndex: false,
});

const emit = defineEmits<{
  click: [card: CardData];
  hover: [card: CardData, hovering: boolean];
}>();

// Dimensiones por tamaño
const sizeClasses = {
  xs: { width: 40, height: 56, fontSize: 10, suitSize: 12, cornerOffset: 4 },
  sm: { width: 60, height: 84, fontSize: 16, suitSize: 18, cornerOffset: 6 },
  md: { width: 80, height: 112, fontSize: 22, suitSize: 24, cornerOffset: 8 },
  lg: { width: 100, height: 140, fontSize: 28, suitSize: 30, cornerOffset: 10 },
  xl: { width: 140, height: 196, fontSize: 36, suitSize: 40, cornerOffset: 14 },
};

const dims = computed(() => sizeClasses[props.size]);

const suitSymbols: Record<string, string> = {
  s: '♠',
  h: '♥',
  d: '♦',
  c: '♣',
};

const suitNames: Record<string, string> = {
  s: 'spade',
  h: 'heart',
  d: 'diamond',
  c: 'club',
};

const suitColor = computed(() => (props.suit === 'h' || props.suit === 'd') ? 'red' : 'black');

const isRed = computed(() => props.suit === 'h' || props.suit === 'd');

const cardId = ref(`card-${Math.random().toString(36).slice(2, 9)}`);

// Animación de entrada
const isVisible = ref(false);
const isFlipping = ref(false);

onMounted(() => {
  if (props.animate) {
    requestAnimationFrame(() => {
      isVisible.value = true;
    });
  } else {
    isVisible.value = true;
  }
});

watch(() => props.faceUp, (newVal) => {
  if (props.animate) {
    isFlipping.value = true;
    setTimeout(() => {
      isFlipping.value = false;
    }, 300);
  }
});

function handleClick(e: MouseEvent) {
  if (props.disabled) return;
  if (props.selectable) {
    emit('click', { rank: props.rank, suit: props.suit, index: props.index });
  }
}

function handleMouseEnter() {
  if (props.disabled) return;
  emit('hover', { rank: props.rank, suit: props.suit, index: props.index }, true);
}

function handleMouseLeave() {
  if (props.disabled) return;
  emit('hover', { rank: props.rank, suit: props.suit, index: props.index }, false);
}

// Generar pips (símbolos de palo) para cartas numéricas
function generatePips(rank: string) {
  const rankNum = rank === 'A' ? 1 : rank === 'T' ? 10 : rank === 'J' ? 11 : rank === 'Q' ? 12 : rank === 'K' ? 13 : parseInt(rank);
  if (rankNum < 2 || rankNum > 10) return [];

  const pipPositions: Record<number, Array<{x: number, y: number}>> = {
    2: [{x: 0, y: -1}, {x: 0, y: 1}],
    3: [{x: 0, y: -1.5}, {x: 0, y: 0}, {x: 0, y: 1.5}],
    4: [{x: -1, y: -1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}],
    5: [{x: -1, y: -1}, {x: 1, y: -1}, {x: 0, y: 0}, {x: -1, y: 1}, {x: 1, y: 1}],
    6: [{x: -1, y: -1.5}, {x: 1, y: -1.5}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: 1.5}, {x: 1, y: 1.5}],
    7: [{x: -1, y: -1.5}, {x: 1, y: -1.5}, {x: 0, y: -0.5}, {x: -1, y: 0.5}, {x: 1, y: 0.5}, {x: -1, y: 1.5}, {x: 1, y: 1.5}],
    8: [{x: -1, y: -1.5}, {x: 1, y: -1.5}, {x: -1, y: -0.5}, {x: 1, y: -0.5}, {x: -1, y: 0.5}, {x: 1, y: 0.5}, {x: -1, y: 1.5}, {x: 1, y: 1.5}],
    9: [{x: -1, y: -1.5}, {x: 0, y: -1.5}, {x: 1, y: -1.5}, {x: -1, y: -0.5}, {x: 1, y: -0.5}, {x: -1, y: 0.5}, {x: 1, y: 0.5}, {x: -1, y: 1.5}, {x: 1, y: 1.5}],
    10: [{x: -1, y: -1.5}, {x: 1, y: -1.5}, {x: -1, y: -0.5}, {x: 0, y: -0.5}, {x: 1, y: -0.5}, {x: -1, y: 0.5}, {x: 0, y: 0.5}, {x: 1, y: 0.5}, {x: -1, y: 1.5}, {x: 1, y: 1.5}],
  };

  return pipPositions[rankNum] || [];
}

const pips = computed(() => generatePips(props.rank));
const pipSpacing = computed(() => dims.value.width * 0.12);
</script>

<template>
  <div
    class="playing-card"
    :class="[
      'size-' + size,
      { 'face-down': !faceUp, 'face-up': faceUp },
      { selected: selectable && selected },
      { highlighted },
      { disabled },
      { flipping: isFlipping },
      { visible: isVisible },
      { 'suit-red': isRed, 'suit-black': !isRed },
    ]"
    :style="{
      width: dims.width + 'px',
      height: dims.height + 'px',
      fontSize: dims.fontSize + 'px',
      '--suit-size': dims.suitSize + 'px',
      '--corner-offset': dims.cornerOffset + 'px',
      '--pip-spacing': pipSpacing + 'px',
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :tabindex="selectable && !disabled ? 0 : -1"
    :aria-label="faceUp ? rank + ' of ' + suitName : 'Carta boca abajo'"
    :aria-pressed="selectable ? selected : undefined"
    role="button"
  >
    <!-- Cara frontal -->
    <div class="card-face card-front" v-show="faceUp || isFlipping">
      <!-- Esquina superior izquierda -->
      <div class="card-corner corner-tl">
        <span class="card-rank" :style="{ color: isRed ? 'var(--poker-red)' : 'var(--poker-black)' }">{{ rank }}</span>
        <span class="card-suit" :style="{ color: isRed ? 'var(--poker-red)' : 'var(--poker-black)' }">{{ suitSymbols[suit] }}</span>
      </div>

      <!-- Centro: pips o figura -->
      <div class="card-center">
        <!-- Cartas numéricas (2-10): pips -->
        <div class="pips-container" v-if="pips.length > 0">
          <span
            v-for="(pip, i) in pips"
            :key="i"
            class="pip"
            :style="{
              transform: 'translate(' + (pip.x * pipSpacing) + 'px, ' + (pip.y * pipSpacing) + 'px)',
              color: isRed ? 'var(--poker-red)' : 'var(--poker-black)'
            }"
          >{{ suitSymbols[suit] }}</span>
        </div>

        <!-- Figuras (J, Q, K, A): símbolo grande -->
        <div class="center-suit" v-else :style="{ color: isRed ? 'var(--poker-red)' : 'var(--poker-black)' }">
          {{ suitSymbols[suit] }}
        </div>
      </div>

      <!-- Esquina inferior derecha (rotada) -->
      <div class="card-corner corner-br">
        <span class="card-rank" :style="{ color: isRed ? 'var(--poker-red)' : 'var(--poker-black)' }">{{ rank }}</span>
        <span class="card-suit" :style="{ color: isRed ? 'var(--poker-red)' : 'var(--poker-black)' }">{{ suitSymbols[suit] }}</span>
      </div>

      <!-- Índice numérico para trainers -->
      <div class="card-index" v-if="showIndex && index !== undefined">{{ index }}</div>
    </div>

    <!-- Dorso -->
    <div class="card-face card-back" v-show="!faceUp || isFlipping">
      <div class="back-pattern"></div>
      <div class="back-logo">♠</div>
      <div class="back-text">POKER MASTERY</div>
    </div>

    <!-- Overlay de selección -->
    <div class="selection-overlay" v-if="selectable && selected" @click.stop></div>

    <!-- Badge de highlight -->
    <div class="highlight-badge" v-if="highlighted">!</div>
  </div>
</template>

<style scoped>
.playing-card {
  position: relative;
  perspective: 1000px;
  cursor: default;
  user-select: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: calc(var(--corner-offset) * 2);
  overflow: hidden;
}

.playing-card:hover:not(.disabled):not(.face-down) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px -4px rgba(15, 81, 50, 0.3), 0 0 0 2px var(--poker-gold);
  z-index: 10;
}

.playing-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.playing-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--poker-gold), 0 0 0 5px var(--poker-felt);
}

.card-face {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--corner-offset);
  box-sizing: border-box;
  background: linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%);
  border: 1.5px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.1);
}

.card-front {
  transform: rotateY(0deg);
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
  z-index: 1;
  background: linear-gradient(145deg, #0F5132 0%, #0A3D26 100%);
  border: 1.5px solid #0A3D26;
}

.playing-card.flipping .card-front {
  animation: flipOut 0.3s ease-in forwards;
}

.playing-card.flipping .card-back {
  animation: flipIn 0.3s ease-out forwards;
}

@keyframes flipOut {
  0% { transform: rotateY(0deg); opacity: 1; }
  90% { transform: rotateY(90deg); opacity: 0; }
  100% { transform: rotateY(90deg); opacity: 0; z-index: 1; }
}

@keyframes flipIn {
  0% { transform: rotateY(270deg); opacity: 0; z-index: 1; }
  10% { transform: rotateY(270deg); opacity: 0; z-index: 3; }
  100% { transform: rotateY(180deg); opacity: 1; z-index: 3; }
}

.playing-card:not(.visible) {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.playing-card.visible {
  animation: cardEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes cardEnter {
  0% { opacity: 0; transform: scale(0.9) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.card-corner {
  display: flex;
  flex-direction: column;
  line-height: 1;
  min-width: fit-content;
}

.corner-br {
  transform: rotate(180deg);
  align-self: flex-end;
}

.card-rank {
  font-family: 'Space Grotesk', Georgia, serif;
  font-weight: 700;
  font-size: 1em;
  line-height: 1;
}

.card-suit {
  font-size: 0.9em;
  line-height: 1;
  margin-top: -2px;
}

.card-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pips-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.pip {
  font-size: var(--suit-size);
  line-height: 1;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
  animation: pipAppear 0.3s ease-out backwards;
}

@keyframes pipAppear {
  from { opacity: 0; transform: translate(var(--tx, 0), var(--ty, 0)) scale(0.5); }
  to { opacity: 1; transform: translate(var(--tx, 0), var(--ty, 0)) scale(1); }
}

.center-suit {
  font-size: calc(var(--suit-size) * 2.5);
  line-height: 1;
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}

.card-index {
  position: absolute;
  top: 50%;
  right: var(--corner-offset);
  transform: translateY(-50%);
  background: var(--poker-gold);
  color: var(--poker-black);
  font-size: 0.6em;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  min-width: 1.5em;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Dorso */
.back-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='%23D4A843' fill-opacity='0.05'/%3E%3C/svg%3E");
  opacity: 0.3;
}

.back-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: calc(var(--suit-size) * 2);
  color: var(--poker-gold);
  opacity: 0.6;
  text-shadow: 0 0 20px var(--poker-gold);
}

.back-text {
  position: absolute;
  bottom: var(--corner-offset);
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.5em;
  font-weight: 600;
  color: var(--poker-gold);
  opacity: 0.4;
  letter-spacing: 0.1em;
}

/* Selección */
.selection-overlay {
  position: absolute;
  inset: 0;
  border: 3px solid var(--poker-gold);
  border-radius: inherit;
  box-shadow: 0 0 0 2px white, 0 0 20px var(--poker-gold);
  animation: selectionPulse 2s ease-in-out infinite;
}

@keyframes selectionPulse {
  0%, 100% { box-shadow: 0 0 0 2px white, 0 0 10px var(--poker-gold); }
  50% { box-shadow: 0 0 0 2px white, 0 0 20px var(--poker-gold), 0 0 30px var(--poker-gold); }
}

/* Highlight badge */
.highlight-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: var(--poker-red);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(192, 57, 43, 0.4);
  animation: badgeBounce 1s ease-in-out infinite;
}

@keyframes badgeBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Tamaños responsivos */
.playing-card.size-xs { --corner-offset: 4px; }
.playing-card.size-sm { --corner-offset: 6px; }
.playing-card.size-md { --corner-offset: 8px; }
.playing-card.size-lg { --corner-offset: 10px; }
.playing-card.size-xl { --corner-offset: 14px; }

/* Reducir movimiento */
@media (prefers-reduced-motion: reduce) {
  .playing-card,
  .playing-card * {
    animation: none !important;
    transition: none !important;
  }
}
</style>