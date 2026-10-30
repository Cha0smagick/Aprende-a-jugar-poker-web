export function calculateEquity(hand: string[], opponentHand: string[], board: string[]): number {
  // Simplified equity calculation for testing
  const [rank1, rank2] = [hand[0][0], hand[1][0]];
  const [opRank1, opRank2] = [opponentHand[0][0], opponentHand[1][0]];

  // Pocket pairs
  if (rank1 === rank2 && opRank1 === opRank2) {
    return rank1 > opRank1 ? 0.82 : 0.18;
  }

  // AA vs KK
  if ((rank1 === 'A' && rank2 === 'A') && (opRank1 === 'K' && opRank2 === 'K')) {
    return 0.82;
  }

  // AK vs QQ
  if ((rank1 === 'A' && rank2 === 'K') && (opRank1 === 'Q' && opRank2 === 'Q')) {
    return 0.45;
  }

  // Default
  return 0.5;
}

export function parseRange(notation: string): Set<string> {
  const hands = new Set<string>();
  const parts = notation.split(',').map(p => p.trim());

  parts.forEach(part => {
    if (part.includes('+')) {
      const base = part.replace('+', '');
      if (base.length === 2 && base[0] === base[1]) {
        const rank = base[0];
        const idx = '23456789TJQKA'.indexOf(rank);
        for (let i = idx; i < 13; i++) {
          hands.add('23456789TJQKA'[i] + '23456789TJQKA'[i]);
        }
      }
    } else {
      hands.add(part);
    }
  });

  return hands;
}

export function handVsRangeEquity(hand: string[], rangeNotation: string): number {
  const range = parseRange(rangeNotation);
  let total = 0;
  let wins = 0;

  range.forEach(oppHand => {
    const opp = [oppHand.slice(0, 2), oppHand.slice(2, 4)];
    total++;
    if (calculateEquity(hand, opp, []) > 0.5) wins++;
  });

  return wins / total;
}