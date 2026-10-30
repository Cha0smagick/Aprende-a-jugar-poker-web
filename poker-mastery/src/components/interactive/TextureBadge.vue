<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  flop: Array<{rank: string, suit: string}>;
  turn?: {rank: string, suit: string} | null;
  river?: {rank: string, suit: string} | null;
}

const props = defineProps<Props>();

const allCards = computed(() => [
  ...props.flop,
  ...(props.turn ? [props.turn] : []),
  ...(props.river ? [props.river] : []),
]);

const suits = computed(() => allCards.value.map(c => c.suit));
const ranks = computed(() => allCards.value.map(c => c.rank));

const rankOrder = { 'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 };
const rankValues = computed(() => ranks.value.map(r => rankOrder[r as keyof typeof rankOrder]).sort((a, b) => a - b));

// Análisis de textura
const texture = computed(() => {
  const flopSuits = props.flop.map(c => c.suit);
  const flopRanks = props.flop.map(c => rankOrder[c.rank as keyof typeof rankOrder]).sort((a, b) => a - b);
  
  // Suit analysis
  const suitCounts: Record<string, number> = {};
  flopSuits.forEach(s => suitCounts[s] = (suitCounts[s] || 0) + 1);
  const maxSuitCount = Math.max(...Object.values(suitCounts));
  const isMonotone = maxSuitCount === 3;
  const isTwoTone = maxSuitCount === 2;
  const isRainbow = maxSuitCount === 1;
  
  // Connectedness
  const gaps = [flopRanks[1] - flopRanks[0], flopRanks[2] - flopRanks[1]];
  const maxGap = Math.max(...gaps);
  const minGap = Math.min(...gaps);
  const isConnected = maxGap <= 2;
  const isOneGap = maxGap === 3 && minGap <= 2;
  const isTwoGap = maxGap === 4 && minGap <= 2;
  
  // Paired
  const isPaired = flopRanks[0] === flopRanks[1] || flopRanks[1] === flopRanks[2];
  const isTrips = flopRanks[0] === flopRanks[2];
  
  // Broadway cards
  const broadwayCount = flopRanks.filter(r => r >= 10).length;
  const hasAce = flopRanks.includes(14);
  const hasK = flopRanks.includes(13);
  const hasQ = flopRanks.includes(12);
  
  // Texture classification
  let category = 'neutral';
  let cbetFreq = 50;
  let description = '';
  
  if (isTrips) {
    category = 'trips';
    cbetFreq = 85;
    description = 'Trío en mesa - polarizado, c-bet alta frecuencia';
  } else if (isPaired) {
    category = 'paired';
    cbetFreq = 65;
    description = 'Mesa parecida - proteger equity, c-bet selectiva';
  } else if (isMonotone) {
    category = 'monotone';
    cbetFreq = 35;
    description = 'Monocromo - many flushes, c-bet baja, check frecuente';
  } else if (isTwoTone && isConnected) {
    category = 'wet-connected';
    cbetFreq = 55;
    description = 'Dos tonos conectado - draws abundantes, c-bet media';
  } else if (isTwoTone) {
    category = 'two-tone';
    cbetFreq = 60;
    description = 'Dos tonos - algunos flush draws, c-bet estándar';
  } else if (isRainbow && isConnected) {
    category = 'rainbow-connected';
    cbetFreq = 70;
    description = 'Rainbow conectado - straight draws, c-bet alta';
  } else if (isRainbow) {
    category = 'dry';
    cbetFreq = 80;
    description = 'Seco (Rainbow desconectado) - c-bet muy alta';
  }
  
  // Ajustes por broadway
  if (broadwayCount >= 2) cbetFreq += 5;
  if (hasAce) cbetFreq += 5;
  
  return {
    category,
    cbetFreq: Math.min(95, Math.max(20, cbetFreq)),
    description,
    isMonotone,
    isTwoTone,
    isRainbow,
    isConnected,
    isPaired,
    isTrips,
    broadwayCount,
    hasAce,
    gaps,
  };
});

const categoryLabels: Record<string, {label: string, color: string, icon: string}> = {
  dry: { label: 'SECO', color: 'green', icon: '☀️' },
  'rainbow-connected': { label: 'CONECTADO', color: 'blue', icon: '🔗' },
  'two-tone': { label: 'DOS TONOS', color: 'yellow', icon: '🎨' },
  'wet-connected': { label: 'MOJADO', color: 'orange', icon: '💧' },
  monotone: { label: 'MONOCROMO', color: 'purple', icon: '🌈' },
  paired: { label: 'PAREADO', color: 'red', icon: '👯' },
  trips: { label: 'TRÍO', color: 'pink', icon: '🎯' },
  neutral: { label: 'NEUTRAL', color: 'gray', icon: '❓' },
};

const cat = computed(() => categoryLabels[texture.value.category] || categoryLabels.neutral);
</script>

<template>
  <div class="texture-badge" :class="'texture-' + texture.category">
    <div class="texture-header">
      <span class="texture-icon">{{ cat.icon }}</span>
      <span class="texture-label" :class="'bg-' + cat.color">{{ cat.label }}</span>
      <span class="texture-cbet">c-bet ~{{ texture.cbetFreq }}%</span>
    </div>
    
    <p class="texture-description">{{ texture.description }}</p>
    
    <div class="texture-details">
      <div class="detail-row">
        <span class="detail-label">Palos:</span>
        <span class="detail-value">
          <span v-if="texture.isMonotone" class="badge badge-purple">Monocromo</span>
          <span v-else-if="texture.isTwoTone" class="badge badge-yellow">Dos tonos</span>
          <span v-else class="badge badge-green">Rainbow</span>
        </span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Conectividad:</span>
        <span class="detail-value">
          <span v-if="texture.isTrips" class="badge badge-pink">Trío</span>
          <span v-else-if="texture.isPaired" class="badge badge-red">Parecido</span>
          <span v-else-if="texture.isConnected" class="badge badge-blue">Conectado (gaps: {{ texture.gaps.join('-') }})</span>
          <span v-else-if="texture.isOneGap" class="badge badge-yellow">1-gap ({{ texture.gaps.join('-') }})</span>
          <span v-else class="badge badge-gray">Desconectado (gaps: {{ texture.gaps.join('-') }})</span>
        </span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Broadway:</span>
        <span class="detail-value">
          <span v-if="texture.broadwayCount >= 2" class="badge badge-gold">{{ texture.broadwayCount }} broadway</span>
          <span v-else-if="texture.broadwayCount === 1" class="badge badge-info">1 broadway</span>
          <span v-else class="badge badge-gray">Sin broadway</span>
          <span v-if="texture.hasAce" class="badge badge-gold">As high</span>
        </span>
      </div>
    </div>
    
    <!-- C-bet frequency bar -->
    <div class="cbet-bar">
      <div class="cbet-track">
        <div 
          class="cbet-fill" 
          :class="{ 'low': texture.cbetFreq < 40, 'medium': texture.cbetFreq >= 40 && texture.cbetFreq < 70, 'high': texture.cbetFreq >= 70 }"
          :style="{ width: texture.cbetFreq + '%' }"
        ></div>
      </div>
      <div class="cbet-markers">
        <span>20%</span>
        <span>50%</span>
        <span>80%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.texture-badge {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: 16px;
  animation: slideUp 0.4s ease-out;
}

.texture-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.texture-icon {
  font-size: 1.5rem;
}

.texture-label {
  font-weight: 700;
  font-size: 0.85rem;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.texture-label.bg-green { background: var(--success); color: white; }
.texture-label.bg-blue { background: var(--info); color: white; }
.texture-label.bg-yellow { background: var(--warning); color: var(--poker-black); }
.texture-label.bg-orange { background: var(--warning); color: white; }
.texture-label.bg-purple { background: var(--poker-red); color: white; }
.texture-label.bg-red { background: var(--error); color: white; }
.texture-label.bg-pink { background: #EC4899; color: white; }
.texture-label.bg-gray { background: var(--bg-tertiary); color: var(--text-secondary); }
.texture-label.bg-gold { background: var(--poker-gold); color: var(--poker-black); }

.texture-cbet {
  margin-left: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--poker-gold);
  background: var(--poker-gold)/10;
  padding: 4px 8px;
  border-radius: 6px;
}

.texture-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.texture-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  min-width: 80px;
}

.detail-value {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cbet-bar {
  margin-top: 4px;
}

.cbet-track {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.cbet-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease-out;
}

.cbet-fill.low { background: linear-gradient(90deg, var(--error), var(--warning)); }
.cbet-fill.medium { background: linear-gradient(90deg, var(--warning), var(--info)); }
.cbet-fill.high { background: linear-gradient(90deg, var(--success), var(--info)); }

.cbet-markers {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 0.65rem;
  color: var(--text-muted);
}
</style>