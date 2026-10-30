import { describe, it, expect } from 'vitest';
import { calculateEquity, parseRange, handVsRangeEquity } from '../utils/equity-calculations';
import { calculatePotOdds, calculateMRE, calculateMDF, calculateEV } from '../utils/pot-odds';
import { calculateICM, calculateBubbleFactor, calculateRiskPremium } from '../utils/icm-calculations';
import { calculateRoR, calculateKelly, calculateMinBankroll, calculateOptimalBankroll } from '../utils/bankroll-calculations';
import { parseRangeNotation, handKey, countCombos } from '../utils/range-parser';

describe('Equity Calculator', () => {
  describe('parseRange', () => {
    it('should parse pocket pairs with + notation', () => {
      const range = parseRange('22+');
      expect(range.has('AA')).toBe(true);
      expect(range.has('KK')).toBe(true);
      expect(range.has('22')).toBe(true);
      expect(range.size).toBe(13 * 6);
    });

    it('should parse suited connectors', () => {
      const range = parseRange('A2s+');
      expect(range.has('AKs')).toBe(true);
      expect(range.has('A2s')).toBe(true);
      expect(range.has('A5s')).toBe(true);
    });

    it('should parse offsuit hands', () => {
      const range = parseRange('ATo+');
      expect(range.has('AKo')).toBe(true);
      expect(range.has('ATo')).toBe(true);
      expect(range.has('AQo')).toBe(true);
    });

    it('should parse specific hands', () => {
      const range = parseRange('AKs, AKo, QQ');
      expect(range.has('AKs')).toBe(true);
      expect(range.has('AKo')).toBe(true);
      expect(range.has('QQ')).toBe(true);
      expect(range.size).toBe(16 + 6);
    });

    it('should parse range with dash notation', () => {
      const range = parseRange('22-66');
      expect(range.has('22')).toBe(true);
      expect(range.has('33')).toBe(true);
      expect(range.has('66')).toBe(true);
      expect(range.has('77')).toBe(false);
    });

    it('should parse suited connector ranges', () => {
      const range = parseRange('T9s-54s');
      expect(range.has('T9s')).toBe(true);
      expect(range.has('98s')).toBe(true);
      expect(range.has('54s')).toBe(true);
      expect(range.has('43s')).toBe(false);
    });
  });

  describe('calculateEquity', () => {
    it('should return 100% equity for AA vs 72o preflop', () => {
      const equity = calculateEquity(['As', 'Ah'], ['7c', '2d'], []);
      expect(equity).toBeGreaterThan(0.85);
    });

    it('should return ~50% for AKs vs QQ preflop', () => {
      const equity = calculateEquity(['As', 'Kh'], ['Qh', 'Qd'], []);
      expect(equity).toBeGreaterThan(0.45);
      expect(equity).toBeLessThan(0.55);
    });

    it('should handle flop equity correctly', () => {
      const equity = calculateEquity(['As', 'Ah'], ['Ks', 'Kh'], ['Ac', '7d', '2s']);
      expect(equity).toBeGreaterThan(0.9);
    });

    it('should handle draw equity on flop', () => {
      const equity = calculateEquity(['As', 'Ks'], ['Ah', 'Qd'], ['Js', 'Ts', '2c']);
      expect(equity).toBeGreaterThan(0.3);
      expect(equity).toBeLessThan(0.5);
    });
  });

  describe('handVsRangeEquity', () => {
    it('should calculate equity vs range correctly', () => {
      const equity = handVsRangeEquity(['As', 'Ah'], 'KK+, AKs, AKo');
      expect(equity).toBeGreaterThan(0.8);
    });

    it('should handle wide ranges', () => {
      const equity = handVsRangeEquity(['As', 'Kh'], '22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 42o+, 32o+');
      expect(equity).toBeGreaterThan(0.6);
      expect(equity).toBeLessThan(0.7);
    });
  });
});

describe('Pot Odds Calculator', () => {
  describe('calculatePotOdds', () => {
    it('should calculate pot odds correctly', () => {
      const odds = calculatePotOdds(100, 50);
      expect(odds.ratio).toBeCloseTo(3, 1);
      expect(odds.percentage).toBeCloseTo(25, 1);
    });

    it('should handle different bet sizes', () => {
      const halfPot = calculatePotOdds(100, 50);
      expect(halfPot.percentage).toBe(25);

      const potBet = calculatePotOdds(100, 100);
      expect(potBet.percentage).toBeCloseTo(33.33, 1);

      const twoThirds = calculatePotOdds(100, 66.67);
      expect(twoThirds.percentage).toBeCloseTo(28.6, 1);
    });
  });

  describe('calculateMRE (Minimum Required Equity)', () => {
    it('should calculate MRE correctly', () => {
      const mre = calculateMRE(100, 50);
      expect(mre).toBe(0.25);
    });

    it('should handle various bet sizes', () => {
      expect(calculateMRE(100, 25)).toBeCloseTo(0.1667, 3);
      expect(calculateMRE(100, 75)).toBeCloseTo(0.3, 3);
      expect(calculateMRE(100, 150)).toBeCloseTo(0.375, 3);
    });
  });

  describe('calculateMDF', () => {
    it('should calculate MDF correctly', () => {
      const mdf = calculateMDF(100, 50);
      expect(mdf).toBe(0.6667);
    });

    it('should have MDF + MRE = 1 for river bets', () => {
      const pot = 100;
      const bet = 75;
      const mre = calculateMRE(pot, bet);
      const mdf = calculateMDF(pot, bet);
      expect(mre + mdf).toBeCloseTo(1, 4);
    });
  });

  describe('calculateEV', () => {
    it('should calculate positive EV for good call', () => {
      const ev = calculateEV(100, 50, 0.35);
      expect(ev).toBeGreaterThan(0);
    });

    it('should calculate negative EV for bad call', () => {
      const ev = calculateEV(100, 50, 0.20);
      expect(ev).toBeLessThan(0);
    });

    it('should handle implied odds', () => {
      const evBasic = calculateEV(100, 50, 0.25, 0, 0);
      const evImplied = calculateEV(100, 50, 0.25, 100, 0);
      expect(evImplied).toBeGreaterThan(evBasic);
    });

    it('should handle reverse implied odds', () => {
      const evBasic = calculateEV(100, 50, 0.35, 0, 0);
      const evReverse = calculateEV(100, 50, 0.35, 0, 50);
      expect(evReverse).toBeLessThan(evBasic);
    });
  });
});

describe('ICM Calculator', () => {
  describe('calculateICM', () => {
    it('should calculate correct $EV for equal stacks', () => {
      const stacks = [1000, 1000, 1000];
      const prizes = [500, 300, 200];
      const result = calculateICM(stacks, prizes);

      expect(result.length).toBe(3);
      result.forEach(r => {
        expect(r.icmEV).toBeCloseTo(1000/3, 1);
      });
    });

    it('should give chip leader higher $EV', () => {
      const stacks = [5000, 3000, 2000];
      const prizes = [500, 300, 200];
      const result = calculateICM(stacks, prizes);

      expect(result[0].icmEV).toBeGreaterThan(result[1].icmEV);
      expect(result[1].icmEV).toBeGreaterThan(result[2].icmEV);
    });

    it('should calculate bubble factor correctly', () => {
      const stacks = [4000, 3000, 3000];
      const prizes = [500, 300, 200];
      const result = calculateICM(stacks, prizes);

      expect(result[1].bubbleFactor).toBeGreaterThan(1);
      expect(result[2].bubbleFactor).toBeGreaterThan(1);
    });
  });

  describe('calculateBubbleFactor', () => {
    it('should return > 1 on bubble', () => {
      const bf = calculateBubbleFactor(3000, 5000, [500, 300, 200]);
      expect(bf).toBeGreaterThan(1);
    });

    it('should return 1 when not on bubble', () => {
      const bf = calculateBubbleFactor(5000, 5000, [500, 300, 200, 100]);
      expect(bf).toBeCloseTo(1, 1);
    });
  });

  describe('calculateRiskPremium', () => {
    it('should calculate positive risk premium on bubble', () => {
      const rp = calculateRiskPremium(0.4, 0.35);
      expect(rp).toBeGreaterThan(0);
    });

    it('should be zero when equity equals required', () => {
      const rp = calculateRiskPremium(0.33, 0.33);
      expect(rp).toBeCloseTo(0, 4);
    });
  });
});

describe('Bankroll Calculations', () => {
  describe('calculateRoR (Risk of Ruin)', () => {
    it('should return 100% for negative winrate', () => {
      const ror = calculateRoR(-1, 100, 1000);
      expect(ror).toBe(1);
    });

    it('should calculate RoR correctly for positive winrate', () => {
      const ror = calculateRoR(5, 100, 5000);
      expect(ror).toBeLessThan(0.1);
      expect(ror).toBeGreaterThan(0);
    });

    it('should approach 0 for very large bankroll', () => {
      const ror = calculateRoR(10, 100, 100000);
      expect(ror).toBeLessThan(0.0001);
    });
  });

  describe('calculateKelly', () => {
    it('should return 0 for negative winrate', () => {
      expect(calculateKelly(-1, 100)).toBe(0);
    });

    it('should calculate Kelly fraction correctly', () => {
      const kelly = calculateKelly(5, 100);
      expect(kelly).toBeCloseTo(0.0005, 4);
    });

    it('should handle higher winrates', () => {
      const kelly = calculateKelly(20, 100);
      expect(kelly).toBeCloseTo(0.002, 4);
    });
  });

  describe('calculateMinBankroll', () => {
    it('should return Infinity for negative winrate', () => {
      expect(calculateMinBankroll(-1, 100, 0.01)).toBe(Infinity);
    });

    it('should calculate minimum bankroll for target RoR', () => {
      const minBR = calculateMinBankroll(5, 100, 0.01);
      expect(minBR).toBeGreaterThan(1000);
      expect(minBR).toBeLessThan(20000);
    });
  });

  describe('calculateOptimalBankroll', () => {
    it('should return Infinity for negative winrate', () => {
      expect(calculateOptimalBankroll(-1, 100)).toBe(Infinity);
    });

    it('should calculate optimal bankroll (1/Kelly)', () => {
      const optBR = calculateOptimalBankroll(5, 100);
      expect(optBR).toBeCloseTo(2000, 0);
    });
  });
});

describe('Range Parser', () => {
  describe('parseRangeNotation', () => {
    it('should parse pocket pairs', () => {
      const hands = parseRangeNotation('AA');
      expect(hands.hands.has('AA')).toBe(true);
    });

    it('should parse suited hands', () => {
      const hands = parseRangeNotation('AKs');
      expect(hands.hands.has('AKs')).toBe(true);
    });

    it('should parse offsuit hands', () => {
      const hands = parseRangeNotation('AKo');
      expect(hands.hands.has('AKo')).toBe(true);
    });

    it('should parse pair ranges with +', () => {
      const hands = parseRangeNotation('JJ+');
      expect(hands.hands.has('JJ')).toBe(true);
      expect(hands.hands.has('QQ')).toBe(true);
      expect(hands.hands.has('KK')).toBe(true);
      expect(hands.hands.has('AA')).toBe(true);
    });

    it('should parse suited ranges with +', () => {
      const hands = parseRangeNotation('A2s+');
      expect(hands.hands.has('AKs')).toBe(true);
      expect(hands.hands.has('AQs')).toBe(true);
      expect(hands.hands.has('A2s')).toBe(true);
    });

    it('should parse offsuit ranges with +', () => {
      const hands = parseRangeNotation('ATo+');
      expect(hands.hands.has('AKo')).toBe(true);
      expect(hands.hands.has('AQo')).toBe(true);
      expect(hands.hands.has('ATo')).toBe(true);
    });

    it('should parse complex range', () => {
      const hands = parseRangeNotation('22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 42o+, 32o+');
      expect(hands.totalCombos).toBeGreaterThan(1000);
    });
  });

  describe('countCombos', () => {
    it('should return 6 for pocket pairs', () => {
      expect(countCombos('AA')).toBe(6);
      expect(countCombos('22')).toBe(6);
    });

    it('should return 4 for suited hands', () => {
      expect(countCombos('AKs')).toBe(4);
      expect(countCombos('72s')).toBe(4);
    });

    it('should return 12 for offsuit hands', () => {
      expect(countCombos('AKo')).toBe(12);
      expect(countCombos('72o')).toBe(12);
    });
  });

  describe('handKey', () => {
    it('should normalize pair order', () => {
      expect(handKey('A', 'A', false)).toBe('AA');
    });

    it('should normalize suited order (high card first)', () => {
      expect(handKey('K', 'A', true)).toBe('AKs');
      expect(handKey('A', 'K', true)).toBe('AKs');
    });

    it('should normalize offsuit order (high card first)', () => {
      expect(handKey('K', 'A', false)).toBe('AKo');
      expect(handKey('A', 'K', false)).toBe('AKo');
    });
  });
});