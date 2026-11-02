---
title: "Acciones Legales: Check, Bet, Call, Raise, Fold, All-in"
description: "Todas las acciones permitidas en una ronda de apuestas, sus reglas y restricciones"
phase: "fase-0-fundamentos"
module: "modulo-1-fundamentos"
order: 4
difficulty: "beginner"
estimatedTime: "20 min"
prerequisites: ["modulo-1-leccion-1", "modulo-1-leccion-2", "modulo-1-leccion-3"]
objectives:
  - "Ejecutar correctamente Check, Bet, Call, Raise, Fold y All-in"
  - "Entender los mínimos de raise y re-raise"
  - "Diferenciar apuesta, subida y 3-bet"
  - "Conocer reglas de string bet y ficha sobredimensionada"
published: true
---

# Lección 4: Acciones Legales

## 🎯 Objetivos de Aprendizaje

Al completar esta lección, serás capaz de:
- Ejecutar cada acción de apuesta correctamente
- Calcular el mínimo de raise y re-raise
- Distinguir entre bet, raise y 3-bet
- Evitar errores comunes como el string bet

---

## 📋 Las 6 Acciones Básicas

| Acción | Significado | Cuándo se puede hacer |
|--------|-------------|----------------------|
| **Fold** | Tirar las cartas, renunciar al bote | Siempre que sea tu turno |
| **Check** | Pasar sin apostar | Solo si nadie ha apostado en esta ronda |
| **Bet / Abrir** | Hacer la primera apuesta de la ronda | Si no hay apuesta previa en esta calle |
| **Call** | Igualar la apuesta actual | Cuando hay una apuesta igualar |
| **Raise** | Aumentar la apuesta previa | Cuando alguien ha apostado o subido |
| **All-in** | Apostar todo tu stack | Siempre que sea tu turno |

---

## 💰 Límites de Apuesta

### No-Limit (NLHE)
- **Mínimo bet/raise**: El tamaño del Big Blind
- **Mínimo re-raise**: El tamaño del último raise (no la apuesta total)
- **Máximo**: Todo tu stack (all-in)

### Pot-Limit (PL)
- **Máximo bet/raise**: El tamaño actual del bote + tu call (si aplicara)

### Fixed-Limit (FL)
- Tamaños fijos por calle (ej. $2/$4: $2 preflop/flop, $4 turn/river)

---

## 📏 Mínimos de Raise y Re-raise

Este es un punto donde muchos principiantes se equivocan.

### Ejemplo Práctico

**Situación**: NLHE $1/$2, bote $6 (SB $1 + BB $2 + 3 limpers de $2)

1. **Jugador A apuesta $10** → Esta es una **bet** (abre la ronda)
2. **Jugador B sube a $30** → Esta es una **raise**. El raise es de $20 adicionales ($30 - $10)
3. **Jugador C vuelve a subir a $70** → Esta es un **re-raise** (o 3-bet). El mínimo re-raise es el tamaño del raise anterior = $20. Entonces el mínimo total es $30 + $20 = $50. C sube a $70, válido.

> **Regla clave**: Un re-raise debe ser al menos del tamaño del **último raise adicional**, no de la apuesta total.

### Fórmula del Mínimo de Re-raise

```
Mínimo re-raise total = Última apuesta total + (Última apuesta total - Apuesta previa)
```

O más simplemente: el raise adicional debe ser ≥ al raise adicional anterior.

---

## 🚫 Acciones No Permitidas (Irregularidades)

### String Bet (Apuesta Fraccionada)

Una apuesta debe hacerse en **un solo movimiento** o con una **declaración verbal clara**.

```
❌ MAL: "Call... y subo $20 más" → Solo cuenta como call
❌ MAL: Poner fichas para call, retirar la mano, y poner más fichas para raise
✅ BIEN: "Subo a $50" y poner las fichas de un solo movimiento
✅ BIEN: Anunciar "Raise" claramente y luego poner las fichas
```

### Ficha Sobredimensionada (Oversized Chip)

Si pones una ficha de mayor valor que la apuesta sin declarar, cuenta como **call**.

```
Ejemplo: La apuesta es $25. Pon una ficha de $100 sin decir nada.
Resultado: Es un call de $25, no un raise.
Para raise, debes declarar el monto antes de soltar la ficha.
```

### Act Out of Turn (Actuar Fuera de Turno)

Actuar cuando no es tu turno puede ser vinculante si la acción no cambia después de ti.

---

## 🃏 Bet vs Raise vs 3-Bet

| Término | Significado | Ejemplo |
|---------|-------------|---------|
| **Bet / Open** | Primera apuesta de la ronda | Nadie ha apostado, tú apuestas $10 |
| **Raise / 2-Bet** | Subir una apuesta existente | Alguien apuesta $10, tú subes a $30 |
| **3-Bet** | Volver a subir (re-raise) | Alguien sube a $30, tú subes a $70 |
| **4-Bet** | Subir una 3-bet | Alguien 3-betea a $70, tú subes a $150 |
| **5-Bet** | Subir una 4-bet (usualmente all-in) | |

> **Nota**: El "2-bet" es simplemente una raise normal. El conteo empieza en 1 para la primera apuesta (bet), luego 2 (raise), 3 (3-bet), etc.

---

## 📝 Ejercicios Prácticos

### Ejercicio 1: Mínimo de Re-raise
Bote $100. Jugador A apuesta $50. Jugador B sube a $150. ¿Cuál es el mínimo para que tú hagas re-raise?

<details>
<summary>Solución</summary>
La última apuesta total es $150. El raise adicional de B fue $100 ($150 - $50). El mínimo re-raise total = $150 + $100 = **$250**. Debes poner al menos $250 en total.
</details>

### Ejercicio 2: String Bet
En showdown, dices "Call... y te veo esos $50" mientras pones fichas. ¿Qué cuenta?

<details>
<summary>Solución</summary>
Solo cuenta como **call**. Un string bet no es válido; solo la primera acción verbal/física cuenta. Te costará el derecho a subir.
</details>

### Ejercicio 3: 3-Bet
¿Cuántas veces se ha subido la apuesta en esta secuencia?
1. UTG apuesta $10 (bet)
2. MP sube a $30 (raise)
3. CO sube a $70 (?)

<details>
<summary>Solución</summary>
Es una **3-bet** (re-raise). Primera apuesta (bet), segunda acción es raise, tercera acción es 3-bet.
</details>

---

## 🔗 Próximos Pasos

- **Lección 5**: Showdown - Reglas, orden y "las cartas hablan"
- **Herramienta**: Prueba la [Equity Calculator](/herramientas/equity) para ver el valor de tus acciones
- **Práctica**: Juega 20 manos enfocándote solo en hacer raises de tamaño correcto

---

> **Concepto Clave**: Cada acción comunica información a tus oponentes. Una bet muestra fuerza, un check puede mostrar debilidad o ser una trampa. Sé consistente y nunca hagas string bets.
