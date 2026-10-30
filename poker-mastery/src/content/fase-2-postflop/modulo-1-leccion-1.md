---
title: "Postflop Fundamentals: C-Bet Strategy y Board Texture"
description: "Estrategia fundamental postflop: clasificación de texturas, frecuencias de c-bet, sizing, y ranges"
phase: "fase-2-postflop"
module: "modulo-1-postflop-fundamentals"
order: 1
difficulty: "intermediate"
estimatedTime: "60 min"
prerequisites: ["fase-1-preflop-modulo-1-leccion-1", "fase-1-preflop-modulo-1-leccion-2"]
objectives:
  - "Clasificar texturas de board (wet/dry, connected/paired, rainbow/monotone)"
  - "Entender frecuencias y sizings de c-bet por textura"
  - "Construir rangos de c-bet, check, check-raise"
  - "Aplicar Minimum Defense Frequency postflop"
published: true
---

# Lección 1: Postflop Fundamentals - C-Bet Strategy y Board Texture

## 🎯 Objetivos de Aprendizaje

- Clasificar cualquier flop en **categorías de textura** accionables
- Determinar **frecuencias óptimas de c-bet** por textura y posición
- Seleccionar **sizings correctos** (small/medium/large/overbet)
- Construir rangos equilibrados de **c-bet, check, check-raise**
- Defender vs c-bet usando **MDF postflop**

---

## 🌊 Clasificación de Texturas de Flop

### Las 3 Dimensiones de Textura

| Dimensión | Categorías | Impacto en Estrategia |
|-----------|------------|----------------------|
| **Conectividad** | Disconnected / Connected / Paired | Straight draws, nutted hands |
| **Suitedness** | Rainbow / Two-tone / Monotone | Flush draws, flush completion |
| **Rango de Cartas** | High / Middle / Low / Broadway | Qué rangos conectan mejor |

### Matriz de 12 Tipos Principales

| Tipo | Conectividad | Suitedness | Ejemplo | Freq C-Bet IP | Freq C-Bet OOP |
|------|--------------|------------|---------|---------------|----------------|
| **A72r** | Disconnected | Rainbow | A♥ 7♣ 2♦ | 85-95% | 60-70% |
| **K72r** | Disconnected | Rainbow | K♠ 7♥ 2♣ | 80-90% | 55-65% |
| **Q72r** | Disconnected | Rainbow | Q♦ 7♠ 2♥ | 75-85% | 50-60% |
| **J72r** | Disconnected | Rainbow | J♣ 7♥ 2♠ | 70-80% | 45-55% |
| **T72r** | Disconnected | Rainbow | T♠ 7♦ 2♥ | 65-75% | 40-50% |
| **987r** | Connected | Rainbow | 9♠ 8♥ 7♣ | 55-65% | 35-45% |
| **JT9r** | Connected | Rainbow | J♠ T♥ 9♣ | 50-60% | 30-40% |
| **A72tt** | Disconnected | Two-tone | A♥ 7♥ 2♣ | 75-85% | 55-65% |
| **K72tt** | Disconnected | Two-tone | K♠ 7♠ 2♥ | 70-80% | 50-60% |
| **A72m** | Disconnected | Monotone | A♥ 7♥ 2♥ | 40-55% | 25-35% |
| **KK7** | Paired | - | K♠ K♥ 7♣ | 90-100% | 70-80% |
| **772** | Paired | - | 7♠ 7♥ 2♣ | 60-70% | 40-50% |

> **Nota**: r = rainbow, tt = two-tone, m = monotone

---

## 🎯 Frecuencias de C-Bet por Textura

### IP (In Position) - BTN vs BB

| Textura | Frecuencia | Sizing Preferido |
|---------|------------|------------------|
| A-high rainbow | 90-95% | 33% pot (small) |
| K-high rainbow | 85-90% | 33-50% pot |
| Q-high rainbow | 80-85% | 50-66% pot |
| J-high rainbow | 75-80% | 50-66% pot |
| Connected rainbow | 55-65% | 66-75% pot |
| Broadway connd. | 50-60% | 75% pot |
| Two-tone | -10% vs rainbow | Similar sizing |
| Monotone | 40-55% | 66-75% pot (polarizado) |
| Paired high | 95-100% | 25-33% pot (small) |
| Paired low | 60-70% | 50-66% pot |

### OOP (Out of Position) - BB vs BTN

| Textura | Frecuencia | Sizing Preferido |
|---------|------------|------------------|
| A-high rainbow | 65-75% | 50-66% pot |
| K-high rainbow | 60-70% | 50-66% pot |
| Q-high rainbow | 55-65% | 66-75% pot |
| Connected | 35-45% | 75-100% pot (polarizado) |
| Two-tone | -10-15% | Similar sizing |
| Monotone | 25-35% | 75-125% pot (overbet) |
| Paired | 60-80% | 33-50% pot |

---

## 📏 Sizing de C-Bet: Pequeño vs Grande

### C-Bet Pequeño (25-33% pot)

**Cuándo usar**:
- Boards **dry, disconnected, rainbow** (A72r, K72r, paired high)
- **Rango de c-bet muy ancho** (80%+)
- **Protección**: Hace que el rival foldee menos, pero tú también te foldées menos vs raise
- **Equity denial**: Niega equity a overcards gratis

**Ventajas**:
- Riesgo mínimo
- Construye bote con value hands
- Permite barrel turn/river barato

### C-Bet Mediano (50-66% pot)

**Cuándo usar**:
- Boards **semiconnected** (Q72r, J72r)
- **Two-tone boards**
- **Rango de c-bet medio** (60-80%)

### C-Bet Grande (75-125% pot)

**Cuándo usar**:
- Boards **muy connected** (987r, JT9r)
- **Monotone boards**
- **Turn/river** cuando polarizas
- **Overbet** con nuts advantage

**Rango polarizado**: Solo nuts + bluffs selectos

---

## 🏗️ Construcción de Rangos de C-Bet

### BTN vs BB en A♥ 7♣ 2♦ (A72r) - IP

**Rango Preflop BTN** (~45%):
```
22+, A2s+, A2o+, K2s+, K5o+, Q2s+, Q7o+, J2s+, J7o+, T2s+, T7o+, 92s+, 96o+, 82s+, 86o+, 72s+, 75o+, 62s+, 64o+, 52s+, 53o+, 42s+, 43o+, 32s+
```

**C-Bet Range (90% / ~540 combos)**:

| Categoría | Manos | Acción | Combos |
|-----------|-------|--------|--------|
| **Top Pair+** | AA, 77, 22, A7s, A7o | Bet 33% | ~60 |
| **Overpairs** | KK, QQ, JJ, TT, 99, 88 | Bet 33% | ~36 |
| **Top Pair Weak Kicker** | A9s-A2s, ATo-A2o | Bet 33% | ~80 |
| **Middle Pair** | 99-88 (en este board), 7x | Bet 33% | ~50 |
| **Bottom Pair** | 66-33, 7x offsuit | Bet 33% | ~60 |
| **Gutshots** | 98s, 86s, 65s, 54s, 43s, 32s | Bet 33% | ~40 |
| **Backdoor Flush** | Cualquier Axs, Kxs, Qxs, Jxs, Txs, 9xs, 8xs, 6xs, 5xs | Bet 33% | ~120 |
| **Ace High** | AK, AQ, AJ, AT, A9 (no pair) | Bet 33% | ~80 |
| **K-High** | KQ, KJ, KT, K9 (no pair) | Check | ~40 |
| **Total C-Bet** | | **90%** | **~540** |

**Check Range (10% / ~60 combos)**:
- K-high sin equity (KQ, KJ, KT, K9 offsuit)
- Q-high y peor sin draws
- Algunas manos para **check-raise bluff** (select 87s, 65s)

---

### BB vs BTN en A♥ 7♣ 2♦ (A72r) - OOP

**Rango Preflop BB** (vs BTN open, ~30% call):
```
22-99, A2s-A9s, ATo-AJo, KTs-KJo, QTs-QJo, JTs-JTo, T9s-T9o, 98s-98o, 87s-87o, 76s-76o, 65s-65o, 54s
```

**C-Bet Range (65% / ~220 combos)**:

| Categoría | Manos | Acción | Combos |
|-----------|-------|--------|--------|
| **Sets/Two Pair** | 77, 22, A7s | Bet 66% | ~14 |
| **Top Pair** | A9s-A2s, ATo-AJo | Bet 66% | ~40 |
| **Overpairs** | 99-88 | Bet 66% | ~12 |
| **Middle Pair** | 7x suited | Bet 66% | ~16 |
| **Gutshots + BD Flush** | 98s, 86s, 65s, 54s, 43s, 32s | Bet 66% | ~24 |
| **Ace High** | AK, AQ, AJ, AT | Check (llama turn) | ~16 |
| **K-High** | KQ, KJ, KT | Check | ~12 |
| **Total C-Bet** | | **65%** | **~220** |

**Check Range (35%)**:
- Ace high (traps, llama turn)
- K-high, Q-high (defensa vs c-bet)
- Algunas manos para **check-raise** (77, 22, A7s, 98s, 86s)

---

## 🛡️ MDF Postflop: Defensa vs C-Bet

### Fórmula MDF Postflop

$$ \text{MDF} = \frac{\text{Pote}}{\text{Pote} + \text{Apuesta}} = \frac{1}{1 + \alpha} $$

### Tabla MDF vs Sizings Comunes

| C-Bet Size | Alpha (α) | MDF | Defiende Top % |
|------------|-----------|-----|----------------|
| 25% pot | 0.20 | **80%** | Top 80% |
| 33% pot | 0.25 | **75%** | Top 75% |
| 50% pot | 0.33 | **67%** | Top 67% |
| 66% pot | 0.40 | **60%** | Top 60% |
| 75% pot | 0.43 | **57%** | Top 57% |
| 100% pot | 0.50 | **50%** | Top 50% |
| 125% pot | 0.56 | **44%** | Top 44% |
| 150% pot | 0.60 | **40%** | Top 40% |

### Construcción de Rango de Defensa

**Defiende con**:
1. **Value hands** (top pair+, draws fuertes) → Call/Raise
2. **Marginal hands** con equity/backdoors → Call
3. **Bluff catchers** → Call selectivo
4. **Bluff raises** → Check-raise (polarizado)

**NO defiendas**:
- Ace high sin backdoors (vs sizings grandes)
- K-high sin equity
- Basura total

---

## 🔄 Check-Raise Strategy

### Frecuencias Check-Raise por Textura

| Textura | Freq CR IP | Freq CR OOP | Rango CR |
|---------|------------|-------------|----------|
| **Dry (A72r)** | 3-5% | 5-8% | Sets, two pair, gutshots + BD |
| **Semiconnected** | 5-8% | 8-12% | Sets, TP+, strong draws |
| **Connected** | 8-12% | 10-15% | Sets, straights, combo draws |
| **Monotone** | 10-15% | 12-18% | Flushes, strong combo draws |
| **Paired** | 5-8% | 8-12% | Trips, full houses, air |

### Sizing Check-Raise

| Situación | Sizing | Ratio Value:Bluff |
|-----------|--------|-------------------|
| **Flop vs c-bet 33%** | 3x - 3.5x | 1:2 |
| **Flop vs c-bet 66%** | 2.5x - 3x | 1:1.5 |
| **Flop vs c-bet 75%+** | 2x - 2.5x | 1:1 |
| **Turn vs barrel** | 2.5x - 3x | 1:1.5 |

---

## 🎯 Delayed C-Bet y Probe Bets

### Delayed C-Bet (Check Flop → Bet Turn)

**Cuándo**:
- OOP con rango que quiere pot control
- IP cuando flop checkea mucho (monotone, paired low)
- Turn **mejora tu rango** vs rango rival

**Sizing**: 50-75% pot (turn pot usually larger)

### Probe Bet (Check Flop → Bet Turn OOP)

**Definición**: Bet turn después de check-check flop, OOP.

**Cuándo**:
- Turn **cartas que mejoran tu rango** vs rango check-back rival
- Turn **blank** pero tienes range advantage
- Rango: Top pair+, draws fuertes, algunos bluffs

**Sizing**: 66-75% pot

---

## 🛠️ Herramientas Interactivas

- **[Flop Texture Trainer](/herramientas/trainers/flop-texture)**: Clasifica 1000+ flops
- **[C-Bet Trainer](/herramientas/trainers/cbet)**: Spots reales con feedback GTO
- **[Range Builder](/herramientas/range-builder)**: Visualiza rangos c-bet por textura
- **[Equity Calculator](/herramientas/equity)**: Equity vs rango en flops específicos

---

## 📝 Resumen - Cheat Sheet C-Bet

```
CLASIFICACIÓN RÁPIDA DE FLOP
1. ¿Paired? → KK7/772 (tratamiento especial)
2. ¿Monotone? → Baja freq, sizing grande, polarizado
3. ¿Two-tone? → -10-15% freq vs rainbow
4. ¿Connected? → 987r/JT9r = baja freq, sizing grande
5. ¿Disconnected high? → A/K/Q-high = alta freq, small

SIZING RULES
Dry/Disconnected → Small (25-33%)
Semiconnected → Medium (50-66%)
Connected/Monotone → Large (75-125%)
Paired High → Tiny (25-33%)

MDF DEFENSA
33% pot → Defiende 75% | 66% pot → Defiende 60%
75% pot → Defiende 57% | 100% pot → Defiende 50%

CHECK-RAISE
Dry: 3-5% | Connected: 8-12% | Monotone: 10-15%
Sizing: 3x vs small, 2.5x vs large
```

---

## 🎯 Ejercicios Prácticos

### Ejercicio 1: Clasificación
> Clasifica: K♥ 9♣ 4♦ | J♠ T♠ 9♠ | 8♦ 8♣ 3♥ | A♠ K♠ Q♠

<details>
<summary>Solución</summary>
K94r = K-high disconnected rainbow (high dry)
JTs9s = Broadway connected monotone (muy wet)
883 = Paired low (88x)
AKQs = Broadway connected monotone (nuts advantage extremo)
</details>

### Ejercicio 2: C-Bet Frequency
> BTN vs BB. Flop: Q♥ 8♣ 3♦. ¿Freq y sizing?

<details>
<summary>Solución</summary>
Q-high disconnected rainbow. IP: ~80-85% c-bet, sizing 50-66% pot.
Rango: Top pair+, overpairs, gutshots, BD flush draws, ace high.
</details>

### Ejercicio 3: MDF Defense
> BB vs BTN. Flop A72r. BTN c-betea 33% pot. ¿Qué % defiendes?

<details>
<summary>Solución</summary>
33% pot → α = 0.25 → MDF = 1/(1+0.25) = 80%.
Defiende top 80% de tu rango: Top pair+, middle pair, gutshots, BD flush, Ax high.
Foldea: K-high sin equity, Q-high y peor, basura.
</details>

---

## 🔗 Próximos Pasos

- **Lección 2**: Turn Strategy - Barreling, Pot Control, Delayed C-Bet
- **Lección 3**: River Strategy - Value Betting, Bluffing, Overbets
- **Lección 4**: Multiway Pots - Ajustes vs 2+ oponentes
- **Herramienta**: [Flop Texture Trainer](/herramientas/trainers/flop-texture) - 1000+ flops
- **Trainer**: [C-Bet Trainer](/herramientas/trainers/cbet) - Spots reales con feedback