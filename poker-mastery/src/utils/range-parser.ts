export interface ParsedRange {
  hands: Set<string>;
  totalCombos: number;
}

export function parseRangeNotation(notation: string): ParsedRange {
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
      } else if (base.endsWith('s')) {
        const high = base[0];
        const low = base[1];
        const highIdx = '23456789TJQKA'.indexOf(high);
        const lowIdx = '23456789TJQKA'.indexOf(low);
        for (let i = lowIdx; i <= highIdx; i++) {
          hands.add(high + '23456789TJQKA'[i] + 's');
        }
      } else if (base.endsWith('o')) {
        const high = base[0];
        const low = base[1];
        const highIdx = '23456789TJQKA'.indexOf(high);
        const lowIdx = '23456789TJQKA'.indexOf(low);
        for (let i = lowIdx; i <= highIdx; i++) {
          hands.add(high + '23456789TJQKA'[i] + 'o');
        }
      }
    } else if (part.includes('-')) {
      const [start, end] = part.split('-');
      if (start.length === 2 && end.length === 2 && start[0] === start[1] && end[0] === end[1]) {
        const startIdx = '23456789TJQKA'.indexOf(start[0]);
        const endIdx = '23456789TJQKA'.indexOf(end[0]);
        for (let i = startIdx; i <= endIdx; i++) {
          hands.add('23456789TJQKA'[i] + '23456789TJQKA'[i]);
        }
      }
    } else {
      hands.add(part);
    }
  });

  let totalCombos = 0;
  hands.forEach(hand => {
    totalCombos += countCombos(hand);
  });

  return { hands, totalCombos };
}

export function handKey(r1: string, r2: string, suited: boolean): string {
  if (r1 === r2) return r1 + r1;
  const ranks = '23456789TJQKA';
  const high = ranks.indexOf(r1) < ranks.indexOf(r2) ? r1 : r2;
  const low = ranks.indexOf(r1) < ranks.indexOf(r2) ? r2 : r1;
  return high + low + (suited ? 's' : 'o');
}

export function countCombos(hand: string): number {
  if (hand.length === 2) return 6; // pair
  if (hand.endsWith('s')) return 4; // suited
  return 12; // offsuit
}