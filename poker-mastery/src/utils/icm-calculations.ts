export interface ICMResult {
  player: number;
  chips: number;
  chipPct: number;
  icmEV: number;
  chipEV: number;
  diff: number;
  bubbleFactor: number;
  riskPremium: number;
}

export function calculateICM(stacks: number[], prizes: number[]): ICMResult[] {
  const n = stacks.length;
  const totalChips = stacks.reduce((a, b) => a + b, 0);
  const results: ICMResult[] = [];

  function calcEquity(player: number, place: number, remainingPlayers: number[], remainingChips: number): number {
    if (place === 0) return 1;
    if (remainingPlayers.length === 1) return place === 1 ? 1 : 0;

    let prob = 0;
    for (let i = 0; i < remainingPlayers.length; i++) {
      const p = remainingPlayers[i];
      const pChips = stacks[p];
      const probWin = pChips / remainingChips;
      const newRemaining = remainingPlayers.filter(x => x !== p);
      const newChips = remainingChips - pChips;
      prob += probWin * calcEquity(player, place - 1, newRemaining, newChips);
    }
    return prob;
  }

  const players = Array.from({ length: n }, (_, i) => i);

  for (let i = 0; i < n; i++) {
    let ev = 0;
    for (let place = 1; place <= Math.min(prizes.length, n); place++) {
      const prob = calcEquity(i, place, players, totalChips);
      ev += prob * (prizes[place - 1] || 0);
    }
    const chipEV = (stacks[i] / totalChips) * prizes.reduce((a, b) => a + b, 0);
    results.push({
      player: i,
      chips: stacks[i],
      chipPct: (stacks[i] / totalChips) * 100,
      icmEV: ev,
      chipEV,
      diff: ev - chipEV,
      bubbleFactor: 1,
      riskPremium: 0,
    });
  }

  // Calculate bubble factor and risk premium
  results.forEach((r) => {
    r.bubbleFactor = r.chipEV > 0 ? r.icmEV / r.chipEV : 1;
    r.riskPremium = ((r.icmEV - r.chipEV) / r.chipEV) * 100;
  });

  return results;
}

export function calculateBubbleFactor(stack: number, opponentStack: number, prizes: number[]): number {
  // Simplified bubble factor calculation
  if (prizes.length <= 1) return 1;
  const totalChips = stack + opponentStack;
  const chipEquity = stack / totalChips;
  const stacks = [stack, opponentStack];
  const icm = calculateICM(stacks, prizes);
  const icmEquity = icm[0].icmEV / prizes.reduce((a, b) => a + b, 0);
  return icmEquity > 0 ? chipEquity / icmEquity : 1;
}

export function calculateRiskPremium(requiredEquity: number, actualEquity: number): number {
  return Math.max(0, requiredEquity - actualEquity);
}