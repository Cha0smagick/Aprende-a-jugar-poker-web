export interface PotOddsResult {
  ratio: number;
  percentage: number;
}

export function calculatePotOdds(pot: number, bet: number): PotOddsResult {
  const totalPot = pot + bet;
  const ratio = totalPot / bet;
  const percentage = (bet / totalPot) * 100;
  return { ratio, percentage };
}

export function calculateMRE(pot: number, bet: number): number {
  return bet / (pot + bet);
}

export function calculateMDF(pot: number, bet: number): number {
  return pot / (pot + bet);
}

export function calculateEV(
  pot: number,
  bet: number,
  equity: number,
  impliedOdds: number = 0,
  reverseImpliedOdds: number = 0
): number {
  const totalPot = pot + bet;
  const call = bet;
  const totalPotAfterCall = totalPot + call;

  const evBasic = (equity * totalPotAfterCall) - ((1 - equity) * call);
  const evWithImplied = (equity * (totalPotAfterCall + impliedOdds)) - ((1 - equity) * (call + reverseImpliedOdds));

  return evWithImplied;
}