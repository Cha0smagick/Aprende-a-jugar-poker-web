// Equity Calculator Module - Heavy JS moved out of Astro component
const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const SUITS = ['s','h','d','c'];
const SUIT_SYMBOLS = {s:'♠',h:'♥',d:'♦',c:'♣'};
const SUIT_COLORS = {s:'#1A1A1A',h:'#C0392B',d:'#C0392B',c:'#1A1A1A'};

const PRESETS = {
  'AA': ['AsAh','AsAd','AsAc','AhAd','AhAc','AdAc'],
  'KK+': ['KsKh','KsKd','KsKc','KhKd','KhKc','KdKc','AsAh','AsAd','AsAc','AhAd','AhAc','AdAc'],
  'QQ+': ['QsQh','QsQd','QsQc','QhQd','QhQc','QdQc','KsKh','KsKd','KsKc','KhKd','KhKc','KdKc','AsAh','AsAd','AsAc','AhAd','AhAc','AdAc'],
  'JJ+': ['JsJh','JsJd','JsJc','JhJd','JhJc','JdJc','QsQh','QsQd','QsQc','QhQd','QhQc','QdQc','KsKh','KsKd','KsKc','KhKd','KhKc','KdKc','AsAh','AsAd','AsAc','AhAd','AhAc','AdAc'],
  'TT+': ['TsTh','TsTd','TsTc','ThTd','ThTc','TdTc','JsJh','JsJd','JsJc','JhJd','JhJc','JdJc','QsQh','QsQd','QsQc','QhQd','QhQc','QdQc','KsKh','KsKd','KsKc','KhKd','KhKc','KdKc','AsAh','AsAd','AsAc','AhAd','AhAc','AdAc'],
  'AKs': ['AsKh','AhKd','AdKc','AcKs'],
  'AKo': ['AsKh','AsKd','AsKc','AhKs','AhKd','AhKc','AdKs','AdKh','AdKc','AcKs','AcKh','AcKd'],
  'AK': ['AsKh','AsKd','AsKc','AhKs','AhKd','AhKc','AdKs','AdKh','AdKc','AcKs','AcKh','AcKd','AsKh','AhKd','AdKc','AcKs'],
  'UTG': generateRange('22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, AJo+, KQo'),
  'MP': generateRange('22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, 43s, AJo+, KQo, QJo'),
  'CO': generateRange('22+, A2s+, K2s+, Q8s+, J8s+, T8s+, 97s+, 86s+, 76s, 65s, 54s, 43s, 32s, A2o+, K9o+, Q9o+, J9o+, T9o, 98o'),
  'BTN': generateRange('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 42o+, 32o+'),
  'SB': generateRange('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 42o+, 32o+'),
  'BBvsBTN': generateRange('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K5o+, Q7o+, J7o+, T7o+, 96o+, 86o+, 75o+, 65o'),
  'BBvsCO': generateRange('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K7o+, Q8o+, J8o+, T8o+, 97o+, 87o+, 76o+'),
  '3betIP': generateRange('JJ+, AK, AQs, A5s-A2s, KQs, KJs, QJs, JTs, T9s, 98s, 87s, 76s, 65s, 54s, AJo, KQo'),
  '3betOOP': generateRange('QQ+, AK, AQs, A5s-A2s, KQs, KJs, QJs, JTs, AJo, KQo'),
  '4bet': generateRange('KK+, AK, AQs, A5s-A2s, KQs')
};

function generateRange(str) {
  const combos = [];
  const parts = str.split(',').map(p => p.trim());
  for (const part of parts) {
    if (part.includes('+') && part.length === 3) {
      const rank = part[0];
      if (part[0] === part[1]) {
        const idx = RANKS.indexOf(rank);
        for (let i = idx; i < RANKS.length; i++) {
          combos.push(...pairCombos(RANKS[i]));
        }
      }
    } else if (part.includes('s+') || part.includes('o+')) {
      combos.push(...parseHand(part));
    } else {
      combos.push(...parseHand(part));
    }
  }
  return combos;
}

function pairCombos(rank) {
  const c = [];
  for (let i = 0; i < SUITS.length; i++) {
    for (let j = i + 1; j < SUITS.length; j++) {
      c.push(`${rank}${SUITS[i]}${rank}${SUITS[j]}`);
    }
  }
  return c;
}

function parseHand(hand) {
  const combos = [];
  if (hand.length === 2) return pairCombos(hand[0]);
  if (hand.length === 3) {
    const [r1, r2, type] = hand.split('');
    if (type === 's') {
      for (const s of SUITS) combos.push(`${r1}${s}${r2}${s}`);
    } else if (type === 'o') {
      for (let i = 0; i < SUITS.length; i++) for (let j = 0; j < SUITS.length; j++) if (i !== j) combos.push(`${r1}${SUITS[i]}${r2}${SUITS[j]}`);
    }
  }
  return combos;
}

// Export for use in other modules
export { RANKS, SUITS, SUIT_SYMBOLS, SUIT_COLORS, PRESETS, generateRange, pairCombos, parseHand };

// DOM-dependent code - runs after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Import the equity calculator class
  import('./equity-calculator-core.js').then(module => {
    const calculator = new module.EquityCalculator();
    calculator.init();
  });
});