<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import PlayingCard from './PlayingCard.vue';

interface Props {
  flop: Array<{rank: string, suit: string}>;
  turn?: {rank: string, suit: string} | null;
  river?: {rank: string, suit: string} | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showStreetLabels?: boolean;
  onCardClick?: (card: {rank: string, suit: string}, street: string, index: number) => void;
  highlightTexture?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  animated: true,
  showStreetLabels: true,
  highlightTexture: false,
});

const dims = computed(() => ({
  xs: 40, sm: 60, md: 80, lg: 100, xl: 140
})[props.size]);

const cardWidth = computed(() => dims.value);
const cardHeight = computed(() => dims.value * 1.4);
const gap = computed(() => dims.value * 0.15);

const streets = computed(() => [
  { name: 'flop', cards: props.flop, label: 'FLOP', count: 3 },
  { name: 'turn', cards: props.turn ? [props.turn] : [], label: 'TURN', count: 1 },
  { name: 'river', cards: props.river ? [props.river] : [], label: 'RIVER', count: 1 },
].filter(s => s.cards.length > 0));

const totalCards = computed(() => props.flop.length + (props.turn ? 1 : 0) + (props.river ? 1 : 0));
const boardWidth = computed(() => totalCards.value * cardWidth.value + (totalCards.value - 1) * gap.value);

const streetRefs = ref<(HTMLElement | null)[]>([]);

function handleCardClick(card: {rank: string, suit: string}, street: string, index: number) {
  props.onCardClick?.(card, street, index);
}

// Animación escalonada
const visibleCards = ref<Set<string>>(new Set());

onMounted(() => {
  if (!props.animated) {
    streets.value.forEach((street, sIdx) => {
      street.cards.forEach((_, cIdx) => {
        visibleCards.value.add(`${street.name}-${cIdx}`);
      });
    });
    return;
  }

  let delay = 0;
  streets.value.forEach((street, sIdx) => {
    street.cards.forEach((_, cIdx) => {
      setTimeout(() => {
        visibleCards.value.add(`${street.name}-${cIdx}`);
      }, delay);
      delay += 150;
    });
  });
});

function isCardVisible(streetName: string, index: number) {
  return visibleCards.value.has(`${streetName}-${index}`);
}
</script>

<template>
  <div class="card-board" role="group" aria-label="Cartas comunitarias (Board)">
    <div class="board-container" :style="{ width: boardWidth + 'px' }">
      <template v-for="(street, sIdx) in streets" :key="street.name">
        <div 
          class="street-group" 
          ref="streetRefs"
          :style="{ 
            display: 'flex', 
            gap: gap + 'px',
            marginRight: sIdx < streets.length - 1 ? gap * 2 + 'px' : 0,
          }"
        >
          <div class="street-label" v-if="showStreetLabels && street.cards.length > 0">
            {{ street.label }}
          </div>
          <PlayingCard
            v-for="(card, cIdx) in street.cards"
            :key="street.name + '-' + card.rank + card.suit"
            :rank="card.rank"
            :suit="card.suit"
            :face-up="true"
            :size="size"
            :animate="animated && isCardVisible(street.name, cIdx)"
            :style="{
              opacity: isCardVisible(street.name, cIdx) ? 1 : 0,
              transform: isCardVisible(street.name, cIdx) ? 'scale(1)' : 'scale(0.8) translateY(20px)',
              transition: animated ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }"
            @click="handleCardClick"
          />
        </div>
      </template>
      
      <!-- Slots vacíos para calles futuras -->
      <div class="empty-slots" v-if="totalCards < 5">
        <div 
          class="empty-card" 
          v-for="i in 5 - totalCards" 
          :key="i"
          :style="{ width: cardWidth + 'px', height: cardHeight + 'px' }"
        >
          <div class="empty-card-inner">
            <svg class="empty-card-suit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Análisis de textura (si está habilitado) -->
    <div class="texture-analysis" v-if="highlightTexture && totalCards >= 3">
      <TextureBadge :flop="flop" :turn="turn" :river="river" />
    </div>
  </div>
</template>

<style scoped>
.card-board {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.board-container {
  display: flex;
  align-items: center;
  min-height: calc(var(--card-height, 112px));
}

.street-group {
  display: flex;
  align-items: center;
  gap: var(--gap, 12px);
}

.street-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  min-width: 45px;
  text-align: right;
  padding-right: 8px;
  border-right: 1px dashed var(--border-default);
  margin-right: 8px;
}

.empty-slots {
  display: flex;
  gap: var(--gap, 12px);
}

.empty-card {
  background: var(--bg-tertiary);
  border: 2px dashed var(--border-default);
  border-radius: calc(var(--corner-offset, 8px) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: all 0.2s;
}

.empty-card:hover {
  border-color: var(--poker-gold);
  opacity: 0.8;
}

.empty-card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
}

.empty-card-suit {
  width: 24px;
  height: 24px;
  opacity: 0.3;
}

.texture-analysis {
  width: 100%;
  max-width: 400px;
}
</style>