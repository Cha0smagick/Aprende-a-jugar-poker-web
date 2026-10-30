<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import PlayingCard from './PlayingCard.vue';

interface Props {
  cards: Array<{rank: string, suit: string}>;
  faceUp?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  selectable?: boolean;
  maxSelect?: number;
  selectedIndices?: number[];
  onSelectionChange?: (indices: number[]) => void;
  onCardClick?: (card: {rank: string, suit: string}, index: number) => void;
  showIndex?: boolean;
  animated?: boolean;
  gap?: number;
  fanSpread?: number;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  faceUp: true,
  size: 'md',
  selectable: false,
  maxSelect: 2,
  selectedIndices: () => [],
  showIndex: false,
  animated: true,
  gap: -0.3,
  fanSpread: 0,
  label: '',
});

const emit = defineEmits<{
  'selection-change': [indices: number[]];
  'card-click': [card: {rank: string, suit: string}, index: number];
}>();

const localSelection = ref<number[]>([...props.selectedIndices]);

watch(() => props.selectedIndices, (newVal) => {
  localSelection.value = [...newVal];
}, { deep: true });

watch(localSelection, (newVal) => {
  emit('selection-change', newVal);
  props.onSelectionChange?.(newVal);
}, { deep: true });

const dims = computed(() => ({
  xs: 40, sm: 60, md: 80, lg: 100, xl: 140
})[props.size]);

const cardWidth = computed(() => dims.value);
const cardHeight = computed(() => dims.value * 1.4);
const overlap = computed(() => cardWidth.value * props.gap);
const totalWidth = computed(() => cardWidth.value + (props.cards.length - 1) * (cardWidth.value + overlap.value));

function handleCardClick(card: {rank: string, suit: string}, index: number) {
  if (props.selectable) {
    const isSelected = localSelection.value.includes(index);
    if (isSelected) {
      localSelection.value = localSelection.value.filter(i => i !== index);
    } else if (localSelection.value.length < props.maxSelect) {
      localSelection.value = [...localSelection.value, index];
    }
  }
  emit('card-click', card, index);
  props.onCardClick?.(card, index);
}

function getCardTransform(index: number) {
  if (props.cards.length <= 1) return { x: 0, rotate: 0 };
  
  const spread = props.fanSpread > 0 ? props.fanSpread : 0;
  const center = (props.cards.length - 1) / 2;
  const offset = index - center;
  
  return {
    x: offset * (cardWidth.value + overlap.value),
    rotate: offset * spread
  };
}
</script>

<template>
  <div class="card-hand" role="group" :aria-label="label || 'Mano de cartas'">
    <div class="hand-label" v-if="label">{{ label }}</div>
    <div 
      class="cards-container" 
      :style="{ 
        width: totalWidth + 'px',
        height: cardHeight + 'px',
      }"
    >
      <PlayingCard
        v-for="(card, index) in cards"
        :key="card.rank + card.suit + index"
        :rank="card.rank"
        :suit="card.suit"
        :face-up="faceUp"
        :size="size"
        :selectable="selectable"
        :selected="localSelection.includes(index)"
        :index="showIndex ? index : undefined"
        :show-index="showIndex"
        :animate="animated"
        :style="{
          position: 'absolute',
          bottom: 0,
          left: getCardTransform(index).x + 'px',
          transform: 'rotate(' + getCardTransform(index).rotate + 'deg)',
          zIndex: props.cards.length - index,
          transition: animated ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.3s ease' : 'none',
        }"
        @click="handleCardClick"
      />
    </div>
    <div class="hand-info" v-if="selectable">
      <span class="selection-count">{{ localSelection.length }}/{{ props.maxSelect }} seleccionadas</span>
      <button class="btn-clear" @click="localSelection = []" :disabled="localSelection.length === 0">
        Limpiar
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-hand {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.hand-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cards-container {
  position: relative;
  display: flex;
  align-items: flex-end;
}

.hand-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.selection-count {
  font-variant-numeric: tabular-nums;
}

.btn-clear {
  padding: 4px 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  font-size: 0.7rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-clear:hover:not(:disabled) {
  background: var(--error);
  border-color: var(--error);
  color: white;
}

.btn-clear:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>