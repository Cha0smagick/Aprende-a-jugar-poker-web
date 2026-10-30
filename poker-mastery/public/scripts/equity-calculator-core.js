// Equity Calculator Core - Minimal version
const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const SUITS = ['s','h','d','c'];
const SUIT_SYMBOLS = {s:'♠',h:'♥',d:'♦',c:'♣'};
const SUIT_COLORS = {s:'#1A1A1A',h:'#C0392B',d:'#C0392B',c:'#1A1A1A'};

const PRESETS = {
  'AA': ['AsAh','AsAd','AsAc','AhAd','AhAc','AdAc'],
  'KK+': ['KsKh','KsKd','KsKc','KhKd','KhKc','KdKc','AsAh','AsAd','AsAc','AhAd','AhAc','AdAc'],
  'AK': ['AsKh','AsKd','AsKc','AhKs','AhKd','AhKc','AdKs','AdKh','AdKc','AcKs','AcKh','AcKd'],
  'UTG': generateRange('22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, AJo+, KQo'),
  'BTN': generateRange('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+')
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

export { RANKS, SUITS, SUIT_SYMBOLS, SUIT_COLORS, PRESETS };

// Simple EquityCalculator class
export class EquityCalculator {
  constructor() {
    this.range1Combos = [];
    this.range2Combos = [];
    this.boardCards = [];
  }

  init() {
    // Initialize DOM elements
    this.range1Preset = document.getElementById('range1-preset');
    this.range1Custom = document.getElementById('range1-custom');
    this.range2Preset = document.getElementById('range2-preset');
    this.range2Custom = document.getElementById('range2-custom');
    this.boardInput = document.getElementById('board-input');
    this.boardVisual = document.getElementById('board-visual');
    this.simulations = document.getElementById('simulations');
    this.simValue = document.getElementById('sim-value');
    this.calculateBtn = document.getElementById('calculate-btn');
    this.btnText = document.getElementById('btn-text');
    this.btnLoading = document.getElementById('btn-loading');
    this.resultsSection = document.getElementById('results-section');

    this.setupEventListeners();
    this.updateRange1();
    this.updateRange2();
    this.updateBoardVisual();
  }

  setupEventListeners() {
    // Range presets
    document.getElementById('range1-preset')?.addEventListener('change', () => {
      document.getElementById('range1-custom').classList.toggle('hidden', document.getElementById('range1-preset').value !== 'custom');
      this.updateRange1();
    });
    document.getElementById('range2-preset')?.addEventListener('change', () => {
      document.getElementById('range2-custom').classList.toggle('hidden', document.getElementById('range2-preset').value !== 'custom');
      this.updateRange2();
    });

    // Custom ranges
    document.getElementById('range1-custom')?.addEventListener('input', () => this.updateRange1());
    document.getElementById('range2-custom')?.addEventListener('input', () => this.updateRange2());

    // Board input
    document.getElementById('board-input')?.addEventListener('input', () => this.updateBoardVisual());

    // Quick cards
    document.querySelectorAll('.quick-card').forEach(btn => {
      btn.addEventListener('click', () => this.addCardToBoard(btn.dataset.card));
    });

    // Clear board
    document.getElementById('clear-board')?.addEventListener('click', () => {
      document.getElementById('board-input').value = '';
      this.boardCards = [];
      this.updateBoardVisual();
    });

    // Simulations
    document.getElementById('simulations')?.addEventListener('input', () => {
      document.getElementById('sim-value').textContent = parseInt(document.getElementById('simulations').value).toLocaleString();
    });
    document.querySelectorAll('.sim-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('simulations').value = btn.dataset.sims;
        document.getElementById('sim-value').textContent = parseInt(btn.dataset.sims).toLocaleString();
        document.querySelectorAll('.sim-preset').forEach(b => b.classList.remove('btn-primary'));
        btn.classList.add('btn-primary');
      });
    });

    // Calculate
    document.getElementById('calculate-btn')?.addEventListener('click', () => this.calculateEquity());

    // Export
    document.getElementById('export-json')?.addEventListener('click', () => this.exportJSON());
    document.getElementById('export-csv')?.addEventListener('click', () => this.exportCSV());
    document.getElementById('share-result')?.addEventListener('click', () => this.shareResult());
  }

  // Simplified methods for MVP
  updateRange1() {
    const preset = document.getElementById('range1-preset').value;
    if (preset === 'custom') {
      this.range1Combos = this.parseCustomRange(document.getElementById('range1-custom').value);
    } else {
      this.range1Combos = PRESETS[preset] || [];
    }
    this.updateRangeDisplay('range1');
  }

  updateRange2() {
    const preset = document.getElementById('range2-preset').value;
    if (preset === 'custom') {
      this.range2Combos = this.parseCustomRange(document.getElementById('range2-custom').value);
    } else {
      this.range2Combos = PRESETS[preset] || [];
    }
    this.updateRangeDisplay('range2');
  }

  parseCustomRange(str) {
    const combos = [];
    const parts = str.split(/[\s,]+/).filter(Boolean);
    for (const part of parts) {
      const clean = part.trim().toUpperCase();
      if (clean.includes('+') && clean.length === 3) {
        const rank = clean[0];
        if (clean[0] === clean[1]) {
          const idx = RANKS.indexOf(rank);
          for (let i = idx; i < RANKS.length; i++) {
            combos.push(...pairCombos(RANKS[i]));
          }
        }
      } else if (clean.length === 2 || clean.length === 3) {
        combos.push(...parseHand(clean));
      }
    }
    return [...new Set(combos)];
  }

  updateRangeDisplay(prefix) {
    const combos = prefix === 'range1' ? this.range1Combos : this.range2Combos;
    const countEl = document.getElementById(`${prefix}-count`);
    const progressEl = document.getElementById(`${prefix}-progress`);
    const combosEl = document.getElementById(`${prefix}-combos`);

    if (countEl) countEl.textContent = String(combos.length);
    if (combosEl) combosEl.textContent = `${combos.length} combos`;
    const pct = Math.min(100, (combos.length / 1326) * 100);
    if (progressEl) progressEl.style.width = pct + '%';
  }

  updateBoardVisual() {
    const boardInput = document.getElementById('board-input');
    const boardVisual = document.getElementById('board-visual');
    const str = boardInput.value.trim().toUpperCase();
    boardVisual.innerHTML = '';
    this.boardCards = [];

    if (!str) return;

    const parts = str.split(/\s+/).filter(Boolean);
    for (const part of parts) {
      if (part.length >= 2) {
        const rank = part.slice(0, -1);
        const suit = part.slice(-1).toLowerCase();
        if (RANKS.includes(rank) && SUITS.includes(suit)) {
          this.boardCards.push({ rank, suit });
          this.addCardToVisual(rank, suit);
        }
      }
    }
  }

  addCardToBoard(cardStr) {
    const boardInput = document.getElementById('board-input');
    const current = boardInput.value.trim();
    const parts = current.split(/\s+/).filter(Boolean);
    if (parts.length >= 5) return;

    const rank = cardStr.slice(0, -1);
    const suit = cardStr.slice(-1).toLowerCase();

    const existing = parts.some(p => p.slice(0, -1) === rank && p.slice(-1).toLowerCase() === suit);
    if (existing) return;

    boardInput.value = current + (current ? ' ' : '') + cardStr;
    this.updateBoardVisual();
  }

  addCardToVisual(rank, suit) {
    const boardVisual = document.getElementById('board-visual');
    const card = document.createElement('div');
    card.className = 'playing-card size-sm face-up';
    card.style.cssText = 'width: 50px; height: 70px;';
    card.innerHTML = `
      <div class="card-face card-front" style="padding: 4px;">
        <div class="card-corner corner-tl">
          <span class="card-rank" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${rank}</span>
          <span class="card-suit" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
        <div class="card-center">
          <span class="center-suit" style="font-size: 16px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
        <div class="card-corner corner-br">
          <span class="card-rank" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${rank}</span>
          <span class="card-suit" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
      </div>
    `;
    document.getElementById('board-visual').appendChild(card);
  }

  async calculateEquity() {
    if (this.range1Combos.length === 0 || this.range2Combos.length === 0) {
      showToast('Selecciona rangos para ambos jugadores', 'warning');
      return;
    }

    // Check conflicts
    const allCards = [...this.range1Combos, ...this.range2Combos, ...this.boardCards.map(c => `${c.rank}${c.suit}`)];
    const unique = new Set(allCards);
    if (unique.size !== allCards.length) {
      showToast('Conflicto de cartas entre rangos y board', 'error');
      return;
    }

    // UI loading
    const calculateBtn = document.getElementById('calculate-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const resultsSection = document.getElementById('results-section');

    calculateBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    resultsSection.style.display = 'none';

    try {
      const modeEl = document.querySelector('input[name="mode"]:checked');
      const mode = modeEl?.value || 'montecarlo';
      const sims = parseInt(document.getElementById('simulations').value);

      const startTime = performance.now();
      const result = await this.runEquitySimulation(this.range1Combos, this.range2Combos, this.boardCards, sims);
      const elapsed = performance.now() - startTime;

      this.displayResults(result, elapsed);
    } catch (e) {
      console.error(e);
      showToast('Error en cálculo: ' + (e as Error).message, 'error');
    } finally {
      calculateBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
    }
  }

  runEquitySimulation(range1, range2, board, sims) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deck = this.generateDeck([...range1.flat(), ...range2.flat(), ...board]);
        let wins1 = 0, wins2 = 0, ties = 0;
        const remainingBoard = 5 - board.length;

        for (let i = 0; i < sims; i++) {
          const h1 = range1[Math.floor(Math.random() * range1.length)];
          const h2 = range2[Math.floor(Math.random() * range2.length)];

          const h1Cards = [h1.slice(0,2), h1.slice(2,4)];
          const h2Cards = [h2.slice(0,2), h2.slice(2,4)];
          const allCards = [...h1Cards, ...h2Cards, ...board.map(c => `${c.rank}${c.suit}`)];
          if (new Set(allCards).size !== allCards.length) { i--; continue; }

          let currentBoard = [...board];
          if (remainingBoard > 0) {
            const shuffled = [...deck].sort(() => Math.random() - 0.5);
            currentBoard.push(...shuffled.slice(0, remainingBoard).map(c => ({rank: c.slice(0,1), suit: c.slice(1,2)})));
          }

          const score1 = evaluateHand(h1Cards, currentBoard);
          const score2 = evaluateHand(h2Cards, currentBoard);

          if (score1 > score2) wins1++;
          else if (score2 > score1) wins2++;
          else ties++;
        }

        const total = wins1 + wins2 + ties;
        resolve({
          range1: { equity: wins1/total, wins: wins1, ties },
          range2: { equity: wins2/total, wins: wins2, ties },
          totalSimulations: total,
        });
      }, 0);
    });
  }

  generateDeck(exclude = []) {
    const excluded = new Set(exclude);
    const deck = [];
    for (const r of RANKS) for (const s of SUITS) {
      const key = `${r}${s}`;
      if (!excluded.has(key)) deck.push(key);
    }
    return deck;
  }

  evaluateHand(hole, board) {
    const all = [...hole, ...board];
    const ranks = all.map(c => c[0]);
    const suits = all.map(c => c[1]);

    const rankCounts = {};
    ranks.forEach(r => rankCounts[r] = (rankCounts[r]||0)+1);
    const counts = Object.values(rankCounts).sort((a,b)=>b-a);

    const suitCounts = {};
    suits.forEach(s => suitCounts[s] = (suitCounts[s]||0)+1);
    const maxSuit = Math.max(...Object.values(suitCounts));

    const uniqueRanks = [...new Set(ranks.map(r => RANKS.indexOf(r)))].sort((a,b)=>a-b);
    let straight = 0;
    for (let i=0;i<=uniqueRanks.length-5;i++) {
      if (uniqueRanks[i+4]-uniqueRanks[i]===4) straight = 5;
    }
    if (uniqueRanks.includes(12) && uniqueRanks.includes(0) && uniqueRanks.includes(1) && uniqueRanks.includes(2) && uniqueRanks.includes(3)) straight = 5;

    const flush = maxSuit >= 5;

    if (flush && straight) return 9000 + uniqueRanks[uniqueRanks.length-1];
    if (counts[0]===4) return 8000 + RANKS.indexOf(Object.keys(rankCounts).find(k=>rankCounts[k]===4)||'A');
    if (counts[0]===3 && counts[1]===2) return 7000 + RANKS.indexOf(Object.keys(rankCounts).find(k=>rankCounts[k]===3)||'A');
    if (flush) return 6000;
    if (straight) return 5000 + uniqueRanks[uniqueRanks.length-1];
    if (counts[0]===3) return 4000 + RANKS.indexOf(Object.keys(rankCounts).find(k=>rankCounts[k]===3)||'A');
    if (counts[0]===2 && counts[1]===2) return 3000;
    if (counts[0]===2) return 2000 + RANKS.indexOf(Object.keys(rankCounts).find(k=>rankCounts[k]===2)||'A');
    return 1000 + uniqueRanks[uniqueRanks.length-1];
  }

  displayResults(result, elapsed) {
    document.getElementById('results-section').style.display = 'block';

    document.getElementById('r1-name').textContent = document.getElementById('range1-preset').value || 'Rango 1';
    document.getElementById('r2-name').textContent = document.getElementById('range2-preset').value || 'Rango 2';

    document.getElementById('r1-equity').textContent = (result.range1.equity*100).toFixed(2) + '%';
    document.getElementById('r2-equity').textContent = (result.range2.equity*100).toFixed(2) + '%';

    document.getElementById('r1-bar').style.width = (result.range1.equity*100) + '%';
    document.getElementById('r2-bar').style.width = (result.range2.equity*100) + '%';

    document.getElementById('r1-wins').textContent = `${result.range1.wins.toLocaleString()} wins`;
    document.getElementById('r2-wins').textContent = `${result.range2.wins.toLocaleString()} wins`;
    document.getElementById('r1-ties').textContent = `${result.range1.ties.toLocaleString()} ties`;
    document.getElementById('r2-ties').textContent = `${result.range2.ties.toLocaleString()} ties`;

    if (result.range1.ties > 0) {
      document.getElementById('ties-section').classList.remove('hidden');
      const tiesPct = (result.range1.ties / result.totalSimulations) * 100;
      document.getElementById('ties-equity').textContent = tiesPct.toFixed(2) + '%';
      document.getElementById('ties-bar').style.width = tiesPct + '%';
    }

    document.getElementById('sim-count').textContent = result.totalSimulations.toLocaleString();
    document.getElementById('calc-time').textContent = `${elapsed.toFixed(0)}ms`;
  }

  // Helper methods
  updateRange1() {
    const preset = document.getElementById('range1-preset').value;
    if (preset === 'custom') {
      this.range1Combos = this.parseCustomRange(document.getElementById('range1-custom').value);
    } else {
      this.range1Combos = PRESETS[preset] || [];
    }
    this.updateRangeDisplay('range1');
  }

  updateRange2() {
    const preset = document.getElementById('range2-preset').value;
    if (preset === 'custom') {
      this.range2Combos = this.parseCustomRange(document.getElementById('range2-custom').value);
    } else {
      this.range2Combos = PRESETS[preset] || [];
    }
    this.updateRangeDisplay('range2');
  }

  parseCustomRange(str) {
    const combos = [];
    const parts = str.split(/[\s,]+/).filter(Boolean);
    for (const part of parts) {
      const clean = part.trim().toUpperCase();
      if (clean.includes('+') && clean.length === 3) {
        const rank = clean[0];
        if (clean[0] === clean[1]) {
          const idx = RANKS.indexOf(rank);
          for (let i = idx; i < RANKS.length; i++) {
            combos.push(...pairCombos(RANKS[i]));
          }
        }
      } else if (clean.length === 2 || clean.length === 3) {
        combos.push(...parseHand(clean));
      }
    }
    return [...new Set(combos)];
  }

  updateRangeDisplay(prefix) {
    const combos = prefix === 'range1' ? this.range1Combos : this.range2Combos;
    const countEl = document.getElementById(`${prefix}-count`);
    const progressEl = document.getElementById(`${prefix}-progress`);
    const combosEl = document.getElementById(`${prefix}-combos`);

    if (countEl) countEl.textContent = String(combos.length);
    if (combosEl) combosEl.textContent = `${combos.length} combos`;
    const pct = Math.min(100, (combos.length / 1326) * 100);
    if (progressEl) progressEl.style.width = pct + '%';
  }

  updateBoardVisual() {
    const boardInput = document.getElementById('board-input');
    const boardVisual = document.getElementById('board-visual');
    const str = boardInput.value.trim().toUpperCase();
    boardVisual.innerHTML = '';
    this.boardCards = [];

    if (!str) return;

    const parts = str.split(/\s+/).filter(Boolean);
    for (const part of parts) {
      if (part.length >= 2) {
        const rank = part.slice(0, -1);
        const suit = part.slice(-1).toLowerCase();
        if (RANKS.includes(rank) && SUITS.includes(suit)) {
          this.boardCards.push({ rank, suit });
          this.addCardToVisual(rank, suit);
        }
      }
    }
  }

  addCardToBoard(cardStr) {
    const boardInput = document.getElementById('board-input');
    const current = boardInput.value.trim();
    const parts = current.split(/\s+/).filter(Boolean);
    if (parts.length >= 5) return;

    const rank = cardStr.slice(0, -1);
    const suit = cardStr.slice(-1).toLowerCase();

    const existing = parts.some(p => p.slice(0, -1) === rank && p.slice(-1).toLowerCase() === suit);
    if (existing) return;

    boardInput.value = current + (current ? ' ' : '') + cardStr;
    this.updateBoardVisual();
  }

  addCardToVisual(rank, suit) {
    const boardVisual = document.getElementById('board-visual');
    const card = document.createElement('div');
    card.className = 'playing-card size-sm face-up';
    card.style.cssText = 'width: 50px; height: 70px;';
    card.innerHTML = `
      <div class="card-face card-front" style="padding: 4px;">
        <div class="card-corner corner-tl">
          <span class="card-rank" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${rank}</span>
          <span class="card-suit" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
        <div class="card-center">
          <span class="center-suit" style="font-size: 16px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
        <div class="card-corner corner-br">
          <span class="card-rank" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${rank}</span>
          <span class="card-suit" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
      </div>
    `;
    document.getElementById('board-visual').appendChild(card);
  }

  addCardToBoard(cardStr) {
    const boardInput = document.getElementById('board-input');
    const current = boardInput.value.trim();
    const parts = current.split(/\s+/).filter(Boolean);
    if (parts.length >= 5) return;

    const rank = cardStr.slice(0, -1);
    const suit = cardStr.slice(-1).toLowerCase();

    const existing = parts.some(p => p.slice(0,-1) === rank && p.slice(-1).toLowerCase() === suit);
    if (existing) return;

    boardInput.value = current + (current ? ' ' : '') + cardStr;
    this.updateBoardVisual();
  }

  addCardToVisual(rank, suit) {
    const boardVisual = document.getElementById('board-visual');
    const card = document.createElement('div');
    card.className = 'playing-card size-sm face-up';
    card.style.cssText = 'width: 50px; height: 70px;';
    card.innerHTML = `
      <div class="card-face card-front" style="padding: 4px;">
        <div class="card-corner corner-tl">
          <span class="card-rank" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${rank}</span>
          <span class="card-suit" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
        <div class="card-center">
          <span class="center-suit" style="font-size: 16px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
        <div class="card-corner corner-br">
          <span class="card-rank" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${rank}</span>
          <span class="card-suit" style="font-size: 10px; color: ${SUIT_COLORS[suit]}">${SUIT_SYMBOLS[suit]}</span>
        </div>
      </div>
    `;
    document.getElementById('board-visual').appendChild(card);
  }

  exportJSON() { showToast('Export JSON - Próximamente', 'info'); }
  exportCSV() { showToast('Export CSV - Próximamente', 'info'); }
  shareResult() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToast('Enlace copiado', 'success');
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const calculator = new EquityCalculator();
  calculator.init();
});