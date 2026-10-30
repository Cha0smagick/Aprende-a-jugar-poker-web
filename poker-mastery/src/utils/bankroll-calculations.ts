export function calculateRoR(winrate: number, stdDev: number, bankroll: number): number {
  if (winrate <= 0) return 1;
  const wrPerHand = winrate / 100;
  const sdPerHand = stdDev / 100;
  return Math.exp(-2 * wrPerHand * bankroll / (sdPerHand * sdPerHand));
}

export function calculateKelly(winrate: number, stdDev: number): number {
  if (winrate <= 0) return 0;
  const wrPerHand = winrate / 100;
  const sdPerHand = stdDev / 100;
  return wrPerHand / (sdPerHand * sdPerHand);
}

export function calculateMinBankroll(winrate: number, stdDev: number, targetRoR: number): number {
  if (winrate <= 0) return Infinity;
  const wrPerHand = winrate / 100;
  const sdPerHand = stdDev / 100;
  return -(sdPerHand * sdPerHand * Math.log(targetRoR)) / (2 * wrPerHand);
}

export function calculateOptimalBankroll(winrate: number, stdDev: number): number {
  if (winrate <= 0) return Infinity;
  const wrPerHand = winrate / 100;
  const sdPerHand = stdDev / 100;
  return (sdPerHand * sdPerHand) / wrPerHand;
}