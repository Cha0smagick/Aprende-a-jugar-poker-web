---
title: "3-Bet Theory: Rangos Polarizados vs Mergeados"
description: "Teoría avanzada de 3-bet: cuándo polarizar, cuándo mergear, sizings, y ajustes por posición"
phase: "fase-1-preflop"
module: "modulo-1-rangos-preflop"
order: 2
difficulty: "intermediate"
estimatedTime: "50 min"
prerequisites: ["fase-1-preflop-modulo-1-leccion-1"]
objectives:
  - "Diferenciar rangos polarizados vs mergeados (lineales)"
  - "Calcular sizings óptimos de 3-bet IP vs OOP"
  - "Construir rangos de 3-bet vs diferentes tamaños de open"
  - "Ajustar 3-bet vs perfiles de rivales específicos"
published: true
---

# Lección 2: 3-Bet Theory - Polarizados vs Mergeados

## 🎯 Objetivos de Aprendizaje

- Entender la diferencia fundamental entre rangos **polarizados** y **mergeados (lineales)**
- Calcular **sizings óptimos** de 3-bet en posición y fuera de posición
- Construir rangos de 3-bet adaptados al sizing del open rival
- Identificar cuándo usar cada estructura según el perfil del rival

---

## 🔀 Polarizado vs Mergeado (Lineal)

### Rango Polarizado

**Estructura**: **Value (nuts) + Bluffs (basura)** | **Sin medias**

```
VALUE (Top 5-8%)          BLUFFS (Bottom 5-10%)
├── AA, KK, QQ            ├── A5s-A2s (blockers A)
├── AKs, AKo              ├── K5s-K2s (blockers K)
├── (Opcional: QQ, JJ)    ├── Suited connectors bajos
                          └── Axs con blockers
```

**Características**:
- **Gap grande** entre value y bluffs
- Manos medias (AQ, KQ, TT-99) → **Call** o **Fold**
- Óptimo vs **rangos amplios** (BTN, CO opens)
- Ratio Value:Bluff depende del sizing

### Rango Mergeado (Lineal)

**Estructura**: **Top X% continuo** | **Sin gap**

```
TOP 10-15% CONTINUO
├── AA, KK, QQ, JJ, TT
├── AKs, AKo, AQs, AQo
├── KQs, KQo, KJs
├── QJs, JTs
└── 99, 88...
```

**Características**:
- **Sin gap**: Todas las manos desde AA hasta el cutoff
- Manos como AQ, TT, KQs → **3-bet** (no call)
- Óptimo vs **rangos tight** (UTG, EP opens)
- Protege rango de call (que sería muy débil)

---

## 📏 Sizings Óptimos de 3-Bet

### Fórmula General

$$ \text{3-bet Size} = \text{Open Size} \times \text{Multiplier} + \text{Dead Money} $$

### Multipliers Estándar

| Situación | Multiplier | Ejemplo (Open 2.5bb) |
|-----------|------------|----------------------|
| **IP (BTN vs CO/MP)** | 3.0x - 3.5x | 7.5bb - 8.75bb |
| **OOP (SB/BB vs BTN/CO)** | 3.5x - 4.0x | 8.75bb - 10bb |
| **OOP (SB vs BTN)** | 4.0x - 4.5x | 10bb - 11.25bb |
| **4-bet** | 2.2x - 2.5x | 22bb - 25bb (vs 10bb 3-bet) |

### Por qué Más Grande OOP

1. **Desventaja posicional**: Necesitas más fold equity inmediata
2. **Realización de equity**: Fuera de posición realizas menos equity
3. **Rango más fuerte**: El rival abre más tight desde EP
4. **Dead money**: Más ciegas/antes en el bote

---

## 🎯 3-Bet vs Diferentes Tamaños de Open

### vs Min-Raise (2bb) - IP

**Sizing**: 6bb - 7bb (3x - 3.5x)
**Rango**: Más ancho, más bluffs (ratio ~1:2.5)
**Razón**: Rival abre muy ancho → más bluffs rentables

### vs Standard Raise (2.5bb) - IP

**Sizing**: 7.5bb - 8.75bb (3x - 3.5x)
**Rango**: Estándar polarizado (ratio ~1:2)
**Razón**: Equilibrio estándar

### vs Large Raise (3bb+) - IP

**Sizing**: 9bb - 10.5bb (3x - 3.5x)
**Rango**: Más tight, menos bluffs (ratio ~1:1.5)
**Razón**: Rival más fuerte → menos bluffs, más value

### vs Open OOP (SB/BB)

| Open Size | 3-Bet Size (BB) | 3-Bet Size (SB) |
|-----------|-----------------|-----------------|
| 2bb (min) | 7-8bb (3.5-4x) | 8-9bb (4-4.5x) |
| 2.5bb | 9-10bb (3.5-4x) | 10-11bb (4-4.5x) |
| 3bb | 10.5-12bb (3.5-4x) | 12-13.5bb (4-4.5x) |

---

## 🏗️ Construcción Detallada: BTN vs CO (IP)

### CO Open Range (~26% / 340 combos)

```
22+, A2s+, ATo+, K9s+, KTo+, Q9s+, QTo+, J9s+, T9s+, 98s+, 87s+, 76s+, 65s+
```

### BTN 3-Bet Range (12% / 160 combos) - Polarizado

#### VALUE (6% / 80 combos)
```
JJ+, AKs, AKo, AQs
Combos: JJ(6) + QQ(6) + KK(6) + AA(6) + AKs(4) + AKo(12) + AQs(4) = 44
Añadir: TT(6), 99(6), AQo(12) = 36 más → 80 combos
```

#### BLUFFS (6% / 80 combos) - Ratio 1:1 (vs 3.5x sizing)

**Criterios de selección de bluffs**:
1. **Blockers** (A, K reducen value combos rival)
2. **Playability** (suited > offsuit)
3. **Equity realizable** (connected > gaps)
4. **No bloquear calling range** (evitar KQ, QJ, JT que rival llama)

**Bluffs Seleccionados (80 combos)**:
```
A5s-A2s (16) - Blockers A, nut flush potential
K5s-K2s (16) - Blockers K, nut flush potential  
Q9s-Q8s (8)  - Blockers Q, straight potential
J9s-J8s (8)  - Connected, straight potential
T9s-T8s (8)  - Connected, straight potential
98s-97s (8)  - Connected
87s-86s (8)  - Connected
76s-75s (8)  - Connected
```
**Total Bluffs**: 16+16+8+8+8+8+8+8 = **80 combos** ✅

---

## 🎯 3-Bet OOP: BB vs BTN

### BTN Open Range (~45% / 600 combos)

```
22+, A2s+, A2o+, K2s+, K5o+, Q2s+, Q7o+, J2s+, J7o+, T2s+, T7o+, ...
```

### BB 3-Bet Range (14% / 185 combos) - Polarizado

#### VALUE (7% / 92 combos)
```
TT+, AKs, AQs, AKo, KQs
TT(6) + JJ(6) + QQ(6) + KK(6) + AA(6) = 30
AKs(4) + AKo(12) + AQs(4) + KQs(4) = 24
AQo(12) = 12
Total Value: 30+24+12 = 66
Añadir: 99(6), AJs(4), KQs(4), QJs(4) = 18 → 84
Añadir: A5s(4) como value/bluff híbrido → ~92
```

#### BLUFFS (7% / 93 combos) - Ratio ~1:1 (vs 4x sizing)
```
A5s-A2s (16) - Blockers A
K5s-K2s (16) - Blockers K
Q9s-Q8s (8)  - Blockers Q
J9s-J8s (8)  - Connected
T9s-T8s (8)  - Connected
98s-97s (8)  - Connected
87s-86s (8)  - Connected
76s-75s (8)  - Connected
65s-64s (8)  - Connected
54s (4)      - Connected
Total: 16+16+8+8+8+8+8+8+8+4 = 92 ✅
```

---

## 🔄 Ajustes por Tipo de Rival

### vs Nit (Open 15% UTG, 3-bet 3%)

| Acción | Ajuste |
|--------|--------|
| **3-bet Value** | Más tight (KK+, AK) |
| **3-bet Bluff** | Elimina casi todos |
| **Call** | Amplía (AQ, KQs, TT-JJ, 99) |
| **4-bet** | Solo KK+ (trap AA) |

### vs LAG/Reg Agresivo (Open 35% BTN, 3-bet 12%)

| Acción | Ajuste |
|--------|--------|
| **3-bet Value** | Ensancha (TT+, AK, AQs) |
| **3-bet Bluff** | Mantiene o aumenta ligeramente |
| **4-bet Bluff** | Añade A5s-A2s, K5s-K2s |
| **Call 3-bet** | Amplía (AQ, KQs, QJs, JTs, TT-99) |

### vs Recreativo (Open 50%+, Call 3-bet 40%+)

| Acción | Ajuste |
|--------|--------|
| **3-bet Value** | MUY ancho (99+, AJs+, AQo+, KQs) |
| **3-bet Bluff** | **Elimina todos** |
| **Sizing** | Más grande (4x-5x IP, 5x-6x OOP) |
| **Postflop** | Value bet relentless, zero bluffs |

### vs Short Stack (< 40bb)

| Acción | Ajuste |
|--------|--------|
| **3-bet** | Solo value (JJ+, AK) o all-in shove |
| **Call** | Rango muy tight, solo manos que flop well |
| **Sizing** | Más pequeño (2.5x-3x) para dejar SPR jugable |

---

## 🎯 Squeeze Play (3-Bet vs Open + Callers)

### Definición

**Squeeze** = 3-bet después de un open + uno o más calls.

**Ventaja**: Dead money extra en el bote → más fold equity → más bluffs rentables.

### Sizing Squeeze

$$ \text{Squeeze Size} = 3\text{-bet Standard} + 1\text{bb por cada caller} $$

| Callers | Sizing (vs 2.5bb open) |
|---------|------------------------|
| 1 caller | 10-11bb |
| 2 callers | 11-12bb |
| 3 callers | 12-13bb |

### Rango de Squeeze

**Más polarizado que 3-bet normal**:
- Value: JJ+, AK (igual)
- Bluffs: **Más** (A5s-A2s, K5s-K2s, Q9s+, J9s+, T9s+, 98s+, 87s+, 76s+)
- Ratio Value:Bluff → **1:2.5 a 1:3**

> **Clave**: Los callers tienen rangos capped (no AA-KK通常), así que tus bluffs tienen más fold equity.

---

## 📊 Métricas de 3-Bet para Tracking

### Stats Clave (HUD)

| Stat | Definición | Target GTO |
|------|------------|------------|
| **3-bet %** | % de veces que 3-betea vs open | IP: 10-12% / OOP: 12-15% |
| **Fold to 3-bet** | % foldea vs 3-bet | IP: 55-60% / OOP: 50-55% |
| **4-bet %** | % 4-betea vs 3-bet | 3-5% |
| **Fold to 4-bet** | % foldea vs 4-bet | 55-65% |
| **3-bet Call %** | % llama 3-bet | IP: 25-30% / OOP: 20-25% |

### Alertas de Leaks

| Stat | Leak Indicado | Exploit |
|------|---------------|---------|
| Fold to 3-bet > 65% | Overfolder | 3-bet bluff más |
| Fold to 3-bet < 45% | Calling station | 3-bet value más, zero bluffs |
| 3-bet % < 5% | Nit | Steal blinds, call más |
| 3-bet % > 18% | Maniac | 4-bet value más, call 3-bet más |
| 4-bet % > 8% | Over-4betting | 5-bet shove light, flat más |

---

## 🛠️ Herramientas

- **[Range Builder](/herramientas/range-builder)**: Construye rangos 3-bet visuales
- **[Preflop Trainer](/herramientas/trainers/preflop)**: Drills 3-bet con feedback GTO
- **[Population Analyzer](/herramientas/population)**: Tendencias de 3-bet de tu pool

---

## 📝 Resumen - Decision Tree 3-Bet

```
                    ┌─────────────────────┐
                    │  RIVAL ABRE          │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
         ┌─────────┐     ┌───────────┐    ┌─────────┐
         │  TIGHT  │     │  STANDARD │    │   WIDE  │
         │ (UTG/EP)│     │ (MP/CO)   │    │(BTN/SB) │
         └────┬────┘     └─────┬─────┘    └────┬────┘
              │                │                │
              ▼                ▼                ▼
         ┌─────────┐     ┌───────────┐    ┌─────────┐
         │ MERGEADO│     │ POLARIZADO│    │ POLARIZ.│
         │ LINEAL  │     │  (1:2)    │    │ (1:2.5) │
         └────┬────┘     └─────┬─────┘    └────┬────┘
              │                │                │
              ▼                ▼                ▼
         ┌─────────┐     ┌───────────┐    ┌─────────┐
         │ Sizing  │     │ Sizing    │    │ Sizing  │
         │ 3.5-4x  │     │ 3-3.5x    │    │ 2.5-3x  │
         └─────────┘     └───────────┘    └─────────┘
```

---

## 🎯 Ejercicios Prácticos

### Ejercicio 1: Sizing Calculation
> CO abre 2.5bb (100bb deep). BTN 3-betea. ¿Sizing óptimo?

<details>
<summary>Solución</summary>
IP vs CO: 3x - 3.5x multiplier.
3 × 2.5 = 7.5bb | 3.5 × 2.5 = 8.75bb
**Sizing óptimo: 7.5bb - 8.75bb**
</details>

### Ejercicio 2: Polarizado vs Mergeado
> UTG abre 12%. BTN 3-betea. ¿Polarizado o mergeado?

<details>
<summary>Solución</summary>
**Mergeado (lineal)**. UTG range es tight y fuerte. 3-bet polarizado dejaría manos como AQ, TT, KQs en "no man's land" (demasiado buenas para fold, no tan buenas para 3-bet value vs UTG). Mergeado top 10-12% protege calling range.
</details>

### Ejercicio 3: Bluff Selection
> BB vs BTN open. Tienes A5s y KQo. ¿Cuál 3-bet bluff?

<details>
<summary>Solución</summary>
**A5s**. Blockers A (reduce AA, AK, AQ del BTN), suited (playability postflop, nut flush potential). KQo bloquea KQ (que BTN llama mucho), offsuit, peor realization OOP.
</details>

---

## 🔗 Próximos Pasos

- **Lección 3**: 4-Bet Dynamics y Cold 4-Bet Strategy
- **Lección 4**: Squeeze Play y Multiway 3-Bet Pots
- **Herramienta**: [Range Builder](/herramientas/range-builder) - Visualiza rangos 3-bet
- **Trainer**: [Preflop Trainer](/herramientas/trainers/preflop) - Drills 3-bet específicos