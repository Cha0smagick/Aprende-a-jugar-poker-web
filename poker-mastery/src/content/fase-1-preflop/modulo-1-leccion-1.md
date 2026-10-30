---
title: "Rangos Preflop: Construcción, Notación y Análisis"
description: "Aprende a construir, leer y analizar rangos preflop. Notación, combos, GTO baselines."
phase: "fase-1-preflop"
module: "modulo-1-rangos-preflop"
order: 1
difficulty: "intermediate"
estimatedTime: "60 min"
prerequisites: ["fase-0-fundamentos-modulo-1-leccion-1", "fase-0-fundamentos-modulo-1-leccion-2"]
objectives:
  - "Entender la notación de rangos (%, combos, matriz)"
  - "Construir rangos de open, 3-bet, 4-bet, call"
  - "Analizar rangos vs rangos (equity, nuts advantage)"
  - "Ajustar rangos por posición y dinámica de mesa"
published: true
---

# Lección 1: Rangos Preflop - Construcción, Notación y Análisis

## 🎯 Objetivos de Aprendizaje

- Dominar la **notación de rangos** (porcentaje, combos, matriz visual)
- Construir rangos equilibrados de **Open, 3-bet, 4-bet, Cold Call**
- Calcular **combos** y **blockers** con precisión
- Entender **GTO baselines** vs ajustes **exploitativos**
- Usar el **Range Builder** interactivo para visualizar y exportar

---

## 📐 Notación de Rangos

### 1. Porcentaje (%)

Forma más común de describir un rango.

| Notación | Significado |
|----------|-------------|
| `22+` | Todas las parejas desde 22 hasta AA |
| `A2s+` | Ases suited desde A2s hasta AKs |
| `ATo+` | Ases offsuit desde ATo hasta AKo |
| `KTs+` | Reyes suited desde KTs hasta AKs |
| `QTs+` | Damas suited desde QTs hasta AQs |
| `JTs+` | Jotas suited desde JTs hasta AJs |
| `T9s+` | Dieces suited desde T9s hasta ATs |

### 2. Combos (Combinaciones)

Número exacto de formas de hacer una mano.

| Tipo de Mano | Combos | Cálculo |
|--------------|--------|---------|
| **Pareja (AA)** | 6 | $\binom{4}{2} = 6$ |
| **Suited (AKs)** | 4 | $4 \times 1 = 4$ |
| **Offsuit (AKo)** | 12 | $4 \times 3 = 12$ |
| **Cualquier AK** | 16 | $4 + 12 = 16$ |

### 3. Matriz Visual (13×13)

```
        A    K    Q    J    T    9    8    7    6    5    4    3    2
A     AA  AKs  AQs  AJs  ATs  A9s  A8s  A7s  A6s  A5s  A4s  A3s  A2s
K     AKo  KK  KQs  KJs  KTs  K9s  K8s  K7s  K6s  K5s  K4s  K3s  K2s
Q     AQo  KQo  QQ  QJs  QTs  Q9s  Q8s  Q7s  Q6s  Q5s  Q4s  Q3s  Q2s
J     AJo  KJo  QJo  JJ  JTs  J9s  J8s  J7s  J6s  J5s  J4s  J3s  J2s
T     ATo  KTo  QTo  JTo  TT  T9s  T8s  T7s  T6s  T5s  T4s  T3s  T2s
9     A9o  K9o  Q9o  J9o  T9o  99  98s  97s  96s  95s  94s  93s  92s
8     A8o  K8o  Q8o  J8o  T8o  98o  88  87s  86s  85s  84s  83s  82s
7     A7o  K7o  Q7o  J7o  T7o  97o  87o  77  76s  75s  74s  73s  72s
6     A6o  K6o  Q6o  J6o  T6o  96o  86o  76o  66  65s  64s  63s  62s
5     A5o  K5o  Q5o  J5o  T5o  95o  85o  75o  65o  55  54s  53s  52s
4     A4o  K4o  Q4o  J4o  T4o  94o  84o  74o  64o  54o  44  43s  42s
3     A3o  K3o  Q3o  J3o  T3o  93o  83o  73o  63o  53o  43o  33  32s
2     A2o  K2o  Q2o  J2o  T2o  92o  82o  72o  62o  52o  42o  32o  22
```

**Convención**: 
- **Diagonal**: Parejas (6 combos cada una)
- **Triángulo superior**: Suited (4 combos cada una)
- **Triángulo inferior**: Offsuit (12 combos cada una)

**Total**: 1326 combos = 100% del rango

---

## 🏗️ Construcción de Rangos Preflop

### Rangos de Open Raise (RFI - Raise First In)

#### UTG (9-max) - ~12% / 160 combos

```
22+, A2s+, ATo+, K9s+, KTo+, Q9s+, QTo+, J9s+, T9s+, 98s+, 87s+, 76s+, 65s+
```

| Categoría | Manos | Combos | % del Rango |
|-----------|-------|--------|-------------|
| Pares premium (JJ+) | JJ, QQ, KK, AA | 24 | 15% |
| Pares medianos (77-TT) | 77, 88, 99, TT | 24 | 15% |
| Pares pequeños (22-66) | 22-66 | 30 | 19% |
| Broadways suited | AKs-AQs, AKo-AQo, KQs, KJs | 48 | 30% |
| Broadways offsuit | AKo-AJo, KQo | 48 | 30% |
| Suited connectors | JTs-54s | 32 | 20% |
| **TOTAL** | | **160** | **~12%** |

#### BTN (Button) - ~45% / 600 combos

```
22+, A2s+, A2o+, K2s+, K5o+, Q2s+, Q7o+, J2s+, J7o+, T2s+, T7o+, 92s+, 96o+, 82s+, 86o+, 72s+, 75o+, 62s+, 64o+, 52s+, 53o+, 42s+, 43o+, 32s+
```

---

### Rangos de 3-Bet (vs Open)

#### 3-Bet IP (BTN vs CO Open) - ~12% / 160 combos

**Value (5-6%)**: `JJ+, AKs, AKo` (40 combos)
**Bluffs (6-7%)**: `A5s-A2s, K5s-K2s, Q9s-Q8s, J9s-J8s, T9s-T8s, 98s-97s, 87s-86s, 76s-75s` (120 combos)

**Ratio Value:Bluff ≈ 1:2** (óptimo vs half-pot 3-bet)

#### 3-Bet OOP (BB vs BTN Open) - ~14% / 185 combos

**Value (6-7%)**: `TT+, AKs, AQs, AKo` (52 combos)
**Bluffs (7-8%)**: `A5s-A2s, K9s-K8s, Q9s-Q8s, J9s-J8s, T9s-T8s, 98s, 87s, 76s, 65s, 54s` (133 combos)

> **Diferencia clave OOP**: Más value, menos bluffs, rangos más polarizados.

---

### Rangos de 4-Bet (vs 3-Bet)

#### 4-Bet IP - ~4% / 50 combos

**Value (2.5%)**: `QQ+, AK` (34 combos)
**Bluffs (1.5%)**: `A5s-A2s, K5s-K4s` (16 combos)

**Ratio Value:Bluff ≈ 2:1** (más value porque 3-bet range es más fuerte)

---

### Rangos de Cold Call (vs Open)

#### BTN vs CO Open - ~25% / 330 combos

```
22-99, A2s-A9s, ATo-AJo, KTs-KJo, QTs-QJo, JTs-JTo, T9s-T9o, 98s-98o, 87s-87o, 76s-76o, 65s-65o, 54s
```

**Estructura**:
- Pares pequeños-medianos: set mining
- Broadways suited/offsuit: jugabilidad postflop
- Suited connectors: implied odds
- **NO**: AA-QQ, AK (esos son 3-bet)

---

## 🧮 Análisis de Combos y Blockers

### Contar Combos en un Rango

**Rango**: `JJ+, AK`

| Mano | Combos | Cálculo |
|------|--------|---------|
| AA | 6 | $\binom{4}{2}$ |
| KK | 6 | $\binom{4}{2}$ |
| QQ | 6 | $\binom{4}{2}$ |
| JJ | 6 | $\binom{4}{2}$ |
| AKs | 4 | $4 \times 1$ |
| AKo | 12 | $4 \times 3$ |
| **TOTAL** | **34** | |

### Efecto Blockers

**Tienes A♥ K♠. ¿Cuántos combos de AK le quedan al rival?**

| Mano | Combos Originales | Combos con Blockers | Reducción |
|------|-------------------|---------------------|-----------|
| AKs | 4 | 2 (A♥K♥, A♠K♠ bloqueados) | 50% |
| AKo | 12 | 6 (A♥K♦, A♥K♣, A♦K♠, A♣K♠, A♦K♥, A♣K♥ bloqueados) | 50% |
| AA | 6 | 3 (A♥ bloqueado) | 50% |
| KK | 6 | 3 (K♠ bloqueado) | 50% |

> **Insight**: Tener AK **reduce 50% los combos de AK, AA, KK** del rival. Esto es enorme para 3-bet/4-bet decisions.

---

## ⚖️ GTO Baselines vs Exploits

### GTO (Game Theory Optimal)

- **Inexplotable**: Ningún ajuste del rival puede ganarte EV
- **Equilibrado**: Value:Bluff ratios correctos en cada street
- **Baseline**: Punto de partida para desviarte exploitativamente

### Exploitativo

- **Desviación intencional** de GTO para explotar leaks del rival
- **Mayor EV** contra rivales específicos
- **Riesgo**: Te vuelves explotable tú también

### Cuándo Usar Cada Uno

| Situación | Enfoque |
|-----------|---------|
| Rival desconocido / Pool tough | GTO Baseline |
| Rival con leak claro (overfold, overcall, overbluff) | Exploitativo |
| HU vs reg fuerte | GTO + pequeños exploits |
| Mesa recreativa | Exploitativo máximo |

---

## 🛠️ Herramientas Interactivas

### [Range Builder](/herramientas/range-builder)

- **Visual**: Matriz 13×13 interactiva
- **GTO Baselines**: Pre-cargados por posición
- **Combo Counter**: Cuenta combos en tiempo real
- **Export**: Copia a clipboard, comparte en foros
- **Equity vs Rango**: Integración con Equity Calculator

### [Preflop Trainer](/herramientas/trainers/preflop)

- **500+ drills** con Spaced Repetition (SM-2)
- **Feedback GTO instantáneo** con explicación
- **Progresión**: Open → 3-bet → 4-bet → Cold Call → Squeeze
- **Estadísticas**: Accuracy, streaks, debilidades

---

## 📊 Análisis Rango vs Rango

### Métricas Clave

| Métrica | Definición | Uso |
|---------|------------|-----|
| **Equity** | % que gana tu rango vs rango rival | Decisiones all-in |
| **Nuts Advantage** | % de nutted hands (top 10-15%) | Quién puede barrel más |
| **Range Advantage** | Equity > 50% en board específico | Quién controla el bote |
| **EV Difference** | EV(GTO) - EV(Exploit) | Coste de desviarse |

### Ejemplo: BTN vs BB en A♥ K♣ 7♦

| Métrica | BTN (IP) | BB (OOP) |
|---------|----------|----------|
| Equity Global | ~56% | ~44% |
| Nuts Advantage | 18% | 8% |
| Range Advantage | Sí | No |
| Estrategia | Agresivo, barrel turn/river | Check-fold, check-call selectivo |

---

## 🎯 Ajustes Exploitativos Comunes

### vs Overfolder (foldea > MDF)

| Acción | Ajuste |
|--------|--------|
| **3-bet bluff** | Aumenta frecuencia, añade más bluffs |
| **C-bet** | Aumenta frecuencia, más sizing pequeño |
| **Turn barrel** | Bluffea más turns vs check-fold flop |

### vs Calling Station (llama demasiado)

| Acción | Ajuste |
|--------|--------|
| **Value bet** | Más thin, sizing mayor |
| **Bluff** | Elimina casi todos |
| **3-bet** | Más value, menos bluffs |
| **River** | Overbet value con nuts |

### vs Maniac (3-betea/4-betea mucho)

| Acción | Ajuste |
|--------|--------|
| **4-bet** | Más value (QQ+, AK), trap con AA/KK |
| **Call 3-bet** | Amplía rango (AQ, KQs, TT-JJ) |
| **Postflop** | Check-call más, check-raise value |

---

## 📝 Resumen - Cheat Sheet Rangos

```
┌────────────────────────────────────────────────────────────┐
│  NOTACIÓN RÁPIDA                                           │
│  22+ = todas parejas | A2s+ = Ases suited | KTs+ = KTs+   │
│  ATo+ = Ases offsuit | T9s+ = conectores suited            │
├────────────────────────────────────────────────────────────┤
│  COMBOS CLAVE                                              │
│  Pareja = 6 | Suited = 4 | Offsuit = 12 | AK = 16         │
│  Blockers AK = -50% AK, AA, KK                            │
├────────────────────────────────────────────────────────────┤
│  RFI % POR POSICIÓN (9-max)                                │
│  UTG: 12% | MP: 16% | CO: 26% | BTN: 45% | SB: 40%*      │
│  *SB open = limp o raise, estrategia mixta                │
├────────────────────────────────────────────────────────────┤
│  3-BET RATIOS                                              │
│  IP vs CO: 1:2 (value:bluff) | OOP vs BTN: 1:1.5          │
│  4-BET: 2:1 value:bluff                                   │
└────────────────────────────────────────────────────────────┘
```

---

## 🎯 Ejercicios Prácticos

### Ejercicio 1: Contar Combos
> Rango rival: `TT+, AQs+, AKo`. Tienes A♠ K♦. ¿Cuántos combos le quedan?

<details>
<summary>Solución</summary>
Original: TT(6), JJ(6), QQ(6), KK(6), AA(6), AKs(4), AKo(12), AQs(4), AQo(12) = 60 combos
Con A♠ K♦: AA(3), KK(3), AKs(2), AKo(6), AQs(3), AQo(9) = 26 combos
Reducción: 60 → 26 (57% menos)
</details>

### Ejercicio 2: 3-Bet Bluff Selection
> BTN vs CO open. ¿Cuál es mejor 3-bet bluff: A5s o KQo?

<details>
<summary>Solución</summary>
A5s: Blockers A (reduce AA, AK, AQ), suited (playability), puede hacer nut flush.
KQo: Blockers K y Q (reduce KK, QQ, AK, KQ), offsuit, peor playability.
**A5s es superior** para 3-bet bluff.
</details>

### Ejercicio 3: MDF Application
> CO abre 2.5bb. BTN 3-betea a 7.5bb (3x). ¿MDF del CO?

<details>
<summary>Solución</summary>
Bote pre-3bet: 2.5 + 0.5 + 1 = 4bb (asumiendo BB=1bb, ante=0)
Apuesta 3-bet: 7.5 - 2.5 = 5bb adicionales
α = 5 / (4 + 5) = 5/9 = 55.6%
MDF = 1 - α = 44.4%
CO debe defender ~44% de su rango de open.
</details>

---

## 🔗 Próximos Pasos

- **Lección 2**: 3-Bet Theory - Polarizado vs Mergeado
- **Lección 3**: 4-Bet Dynamics y Cold 4-Bet
- **Lección 4**: Squeeze Play y Multiway Pots
- **Herramienta**: [Range Builder](/herramientas/range-builder) - Construye y exporta
- **Trainer**: [Preflop Trainer](/herramientas/trainers/preflop) - Drills SM-2

---

> **Nota del instructor**: Los rangos no son estáticos. Un rango GTO es un punto de partida. La verdadera habilidad está en **identificar cuándo y cómo desviarse** exploitativamente basándote en reads, dinámica de mesa y leaks específicos del rival.