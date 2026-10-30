---
title: "Matemáticas Básicas: Pot Odds, Equity y EV"
description: "Fundamentos matemáticos: pot odds, implied odds, equity, expected value"
phase: "fase-0-fundamentos"
module: "modulo-1-fundamentos"
order: 2
difficulty: "beginner"
estimatedTime: "45 min"
prerequisites: ["modulo-1-leccion-1"]
objectives:
  - "Calcular pot odds y comparar con equity"
  - "Entender implied odds y reverse implied odds"
  - "Calcular Expected Value (EV) de decisiones"
  - "Aplicar Minimum Defense Frequency (MDF)"
published: true
---

# Lección 2: Matemáticas Básicas - Pot Odds, Equity y EV

## 🎯 Objetivos de Aprendizaje

- Calcular **Pot Odds** instantáneamente en la mesa
- Entender la relación **Equity vs Pot Odds** para decisiones de call
- Calcular **Expected Value (EV)** de cualquier decisión
- Aplicar **Implied Odds** y **Reverse Implied Odds**
- Usar **Minimum Defense Frequency (MDF)** para defender vs apuestas

---

## 🧮 Pot Odds: La Base Matemática

### Definición

**Pot Odds** = Ratio entre lo que tienes que pagar y lo que puedes ganar.

$$ \text{Pot Odds} = \frac{\text{Tamaño del Call}}{\text{Bote Total después de tu Call}} $$

### Fórmula Práctica

$$ \text{Equity Necesaria (\%)} = \frac{\text{Call}}{\text{Bote} + \text{Call}} \times 100 $$

### Ejemplo Rápido

> Bote: $100 | Apuesta rival: $50 | Tu call: $50

$$ \text{Equity Necesaria} = \frac{50}{100 + 50 + 50} = \frac{50}{200} = 25\% $$

**Decisión**: Si tu equity > 25%, el call es +EV.

---

## 📊 Tabla de Referencia Rápida

| Tamaño Apuesta | Pot Odds | Equity Necesaria |
|----------------|----------|------------------|
| 25% bote (1/4) | 5:1 | 16.7% |
| 33% bote (1/3) | 4:1 | 20% |
| 50% bote (1/2) | 3:1 | 25% |
| 66% bote (2/3) | 2.5:1 | 28.6% |
| 75% bote (3/4) | 2.33:1 | 30% |
| 100% bote (1x) | 2:1 | 33.3% |
| 150% bote (1.5x) | 1.67:1 | 37.5% |
| 200% bote (2x) | 1.5:1 | 40% |

> **Tip Pro**: Memoriza: **Half-pot = 25%, Pot = 33%, 2x Pot = 40%**

---

## 🎯 Equity vs Pot Odds: La Decisión de Call

### Regla Fundamental

$$ \text{Call si } \text{Equity Real} \geq \text{Equity Necesaria} $$

### Ejemplo Completo

**Situación**: 
- Bote: $200
- Rival apuesta $150 (75% pot)
- Tienes: A♥ K♥
- Board: Q♥ J♥ 7♣ 2♦ (Turn)

**Cálculo**:
1. Bote total tras call = $200 + $150 + $150 = $500
2. Equity necesaria = $150 / $500 = **30%**
3. Tu equity vs rango estimado (AK, AQ, KQ, sets, draws): ~35%
4. **Decisión: CALL** (35% > 30%)

---

## 💰 Expected Value (EV)

### Definición

El **Expected Value** es el resultado promedio de una decisión si se repitiera infinitas veces.

$$ EV = \sum (\text{Probabilidad}_i \times \text{Resultado}_i) $$

### EV de un Call

$$ EV_{\text{call}} = (\text{Equity} \times \text{Bote Total}) - ((1 - \text{Equity}) \times \text{Call}) $$

### Ejemplo de EV

Mismo escenario anterior:
- Equity: 35%
- Bote total si ganas: $500
- Call: $150

$$ EV = (0.35 \times 500) - (0.65 \times 150) = 175 - 97.5 = +\$77.5 $$

**Conclusión**: Cada vez que haces este call, **ganas $77.5 de media**.

### EV de un Bluff

$$ EV_{\text{bluff}} = (\text{Fold Equity} \times \text{Bote}) - ((1 - \text{Fold Equity}) \times \text{Bluff Size}) $$

**Ejemplo**: Bote $100, bluff $75, estimas 50% fold equity

$$ EV = (0.50 \times 100) - (0.50 \times 75) = 50 - 37.5 = +\$12.5 $$

---

## 🔮 Implied Odds y Reverse Implied Odds

### Implied Odds (IO)

**Ganas más dinero en calles futuras** cuando completas tu draw.

$$ \text{Total Equity Necesaria} = \frac{\text{Call}}{\text{Bote Actual} + \text{Call} + \text{Implied Winnings}} $$

#### Cuándo Aplicar IO

| Factor | Aumenta IO | Disminuye IO |
|--------|------------|--------------|
| **Stacks** | Deep (>100bb) | Shallow (<30bb) |
| **Posición** | En posición | Fuera de posición |
| **Rival** | Calling station, recreational | NIT, agresivo |
| **Draw Type** | Nut draw, disguised | Obvious draw |
| **Board** | Dry, disconnected | Wet, coordinated |

#### Ejemplo de Implied Odds

- Bote: $100 | Rival apuesta $50 (half-pot) | Call: $50
- Equity necesaria inmediata: 25%
- Tienes: 7♥ 6♥ (gutshot + backdoor flush)
- Board: A♥ 8♣ 5♠
- Tu equity real: ~18% (solo gutshot)
- **Pero**: Si completas en river, esperas ganar $200 extra
- Equity efectiva = $50 / ($100 + $50 + $50 + $200) = $50/$400 = **12.5%**
- **18% > 12.5% → CALL rentable por implied odds**

### Reverse Implied Odds (RIO)

**Pierdes más dinero en calles futuras** cuando haces tu mano pero está dominada.

#### Situaciones de RIO

| Situación | Por qué es RIO |
|-----------|----------------|
| **Kicker débil** | A♠ 7♠ en board A♥ K♦ 3♣ vs AK, AQ |
| **Segunda mejor mano** | Flush draw vs posible flush mayor |
| **Straight draw inferior** | 7-6 en board 9-8-5 vs T-7 |
| **Set vs posible straight/flush** | Set en board muy coordinado |

---

## 🛡️ Minimum Defense Frequency (MDF)

### Definición

**MDF** = Frecuencia mínima con la que debes defender (call + raise) para que el rival no pueda bluffear con cualquier mano rentablemente.

$$ \text{MDF} = \frac{\text{Bote}}{\text{Bote} + \text{Apuesta Rival}} = 1 - \alpha $$

Donde $\alpha$ = Tamaño de apuesta como fracción del bote.

### Tabla MDF

| Tamaño Apuesta | Alpha (α) | MDF |
|----------------|-----------|-----|
| 25% pot | 0.20 | **80%** |
| 33% pot | 0.25 | **75%** |
| 50% pot | 0.33 | **67%** |
| 66% pot | 0.40 | **60%** |
| 75% pot | 0.43 | **57%** |
| 100% pot | 0.50 | **50%** |
| 150% pot | 0.60 | **40%** |
| 200% pot | 0.67 | **33%** |

### Aplicación Práctica

**Rival apuesta pot ($100 en $100)**
- MDF = 50%
- Debes defender el **50% de tu rango** (top 50% de manos)
- Si defiendes menos, rival puede bluffear cualquier 2 cartas +EV

> **Nota**: MDF asume que el rival bluffea con la frecuencia óptima. Contra rivales que bluffean poco, defiende **menos** que MDF.

---

## 🎯 Minimum Required Equity (MRE) vs MDF

| Concepto | ¿Para qué sirve? | Fórmula |
|----------|------------------|---------|
| **MRE (Equity Necesaria)** | ¿Hago call? | Call / (Bote + Call) |
| **MDF** | ¿Con qué frecuencia defiendo? | Bote / (Bote + Apuesta) |

**Relación**: MRE + MDF = 1 (para apuestas all-in o river)

---

## 🛠️ Herramientas Interactivas

Prueba estos conceptos en tiempo real:

- **[Pot Odds Calculator](/herramientas/pot-odds)** - Cálculo instantáneo con sliders
- **[Equity Calculator](/herramientas/equity)** - Monte Carlo vs rangos
- **[EV Calculator](/herramientas/ev)** - Árboles de decisión multi-street

---

## 📝 Resumen - Cheat Sheet Mental

```
┌─────────────────────────────────────────────────────────┐
│  DECISIÓN DE CALL                                        │
│  1. Calcula Pot Odds → Equity Necesaria                  │
│  2. Estima tu Equity Real vs Rango Rival                 │
│  3. Si Equity Real ≥ Necesaria → CALL                    │
│  4. Considera Implied Odds (call más loose)              │
│  5. Considera Reverse Implied Odds (call más tight)      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  DEFENSA VS APUESTA (MDF)                                │
│  1. Identifica tamaño de apuesta (α)                     │
│  2. MDF = 1 / (1 + α)                                    │
│  3. Defiende top MDF% de tu rango                        │
│  4. Ajusta: menos vs nits, más vs maniacs               │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Ejercicios Prácticos

### Ejercicio 1: Pot Odds Básico
> Bote $80. Rival apuesta $40. Tienes 30% equity. ¿Call o Fold?

<details>
<summary>Solución</summary>
Equity necesaria = 40 / (80 + 40 + 40) = 40/160 = 25%. 30% > 25% → CALL
</details>

### Ejercicio 2: Implied Odds
> Bote $100. Rival apuesta $75. Tienes gutshot (16% equity). Stacks $500. Rival es calling station. ¿Call?

<details>
<summary>Solución</summary>
Equity necesaria inmediata = 75/250 = 30%. 16% < 30%.
Pero implied: esperas ganar $300 extra al completar.
Equity efectiva = 75/(100+75+75+300) = 75/550 = 13.6%.
16% > 13.6% → CALL por implied odds.
</details>

### Ejercicio 3: MDF
> Rival apuesta 150% pot en river. ¿Con qué frecuencia debes defender?

<details>
<summary>Solución</summary>
α = 1.5. MDF = 1 / (1 + 1.5) = 1/2.5 = 40%.
Debes defender top 40% de tu rango.
</details>

---

## 🔗 Próximos Pasos

- **Lección 3**: Rangos Preflop - Construcción y Análisis
- **Herramienta**: [Pot Odds Calculator](/herramientas/pot-odds) con LaTeX paso a paso
- **Trainer**: [Preflop Range Trainer](/herramientas/trainers/preflop) con Spaced Repetition

---

> **Concepto Clave**: El poker es un juego de decisiones matemáticas bajo incertidumbre. No necesitas ser un genio de las mates, solo necesitas internalizar estos conceptos hasta que sean automáticos.