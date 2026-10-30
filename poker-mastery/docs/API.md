# Poker Mastery - Referencia Técnica

## APIs Internas

La aplicación es principalmente estática y cliente-side. No expone APIs REST externas.

## Funciones JavaScript Principales

### Progress Store (`src/stores/progress.ts`)

Store de Pinia para gestión del progreso del usuario:

- `progress`: Estado actual de progreso por módulo y lección
- `xp`: Experiencia acumulada del usuario
- `level`: Nivel actual calculado desde XP
- `diplomas`: Lista de diplomas obtenidos
- `spacedRepetition()`: Algoritmo SM-2 para repetición espaciada

### Curso Data (`src/utils/course-data.ts`)

Definiciones estáticas del curso:

- `PHASES`: Definición de las 5 fases del curso
- `MODULES`: Definición de los 25 módulos
- `LESSONS_INDEX`: Índice de lecciones por módulo

## Componentes Interactivos

| Componente | Archivo | Propósito |
|------------|---------|-----------|
| PlayingCard | `PlayingCard.vue` | Renderizado de cartas de póker SVG |
| CardHand | `CardHand.vue` | Mano de cartas del jugador |
| CardBoard | `CardBoard.vue` | Cartas comunitarias (board) |
| TextureBadge | `TextureBadge.vue` | Indicador de textura del flop |
| PreflopTrainer | `PreflopTrainer.vue` | Entrenador de rangos preflop |
| FlopTextureTrainer | `FlopTextureTrainer.vue` | Clasificador de texturas de flop |
| EquityCalculator | `EquityCalculator.vue` | Calculadora de equity Monte Carlo |

## Layouts

| Layout | Archivo | Uso |
|--------|---------|-----|
| BaseLayout | `BaseLayout.astro` | Layout base para todas las páginas |
| LessonLayout | `LessonLayout.astro` | Layout específico para lecciones del curso |

## Fórmulas LaTeX (KaTeX)

Las fórmulas se renderizan con KaTeX y son:

- Clickables: Cada variable puede ser clickeada para ver su definición
- Hoverables: Hover sobre variables muestra definición paso a paso
- Ejemplo: Botón "Ejemplo" abre la calculadora relacionada

### Delimitadores soportados

- `$$ ... $$` - Fórmula en bloque (display)
- `$ ... $` - Fórmula inline
- `\\( ... \\)` - Fórmula inline (alternativo)
- `\\[ ... \\]` - Fórmula en bloque (alternativo)

## Verificación de Diplomas

Los diplomas se generan con:

- Hash SHA-256 único por diploma
- Código QR para verificación rápida
- Página pública de verificación en `/diplomas`
- Metadatos: nombre del usuario, curso, fecha, score

## Scripts Utilitarios

| Script | Archivo | Propósito |
|--------|---------|-----------|
| Validar contenido | `src/scripts/validate-content.mjs` | Valida esquema de colecciones |
| Generar diplomas | `src/scripts/generate-diploma-templates.mjs` | Genera templates de diplomas |
