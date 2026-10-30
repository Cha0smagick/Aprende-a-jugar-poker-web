# PLAN MAESTRO: CURSO COMPLETO DE POKER PROFESIONAL
## "Del Cero al Héroe: Sistema Integral de Maestría en Poker"

---

## 🎯 VISIÓN GENERAL

Crear el **curso de poker más completo, didáctico e interactivo del mundo** para GitHub Pages, que transforme a un amateur absoluto en un jugador profesional con certificación oficial.

### Objetivos Principales
- ✅ **Teoría completa**: Matemáticas, estadística, GTO, explotativo, psicología
- ✅ **Práctica interactiva**: Calculadoras, simuladores, trainers, quizzes
- ✅ **Didáctica suprema**: LaTeX interactivo, hovers explicativos, gráficas dinámicas
- ✅ **Certificación real**: Diplomas por módulo, fase y curso completo
- ✅ **Despliegue automático**: GitHub Pages + GitHub Actions CI/CD
- ✅ **Marketing integrado**: Landing page, funnel, retención, comunidad

---

## 🏗️ ARQUITECTURA TÉCNICA

### Stack Tecnológico
| Capa | Tecnología | Justificación |
|------|------------|---------------|
| **Framework** | Astro 5.x | Islands architecture, performance, SEO nativo |
| **Styling** | Tailwind CSS + CSS Variables | Design system coherente, dark/light mode |
| **Interactividad** | Vue 3 (islands) + Vanilla JS | Reactividad donde se necesita, cero overhead |
| **Math Rendering** | KaTeX + MathJax fallback | LaTeX rápido + compatibilidad total |
| **Gráficas** | Chart.js + D3.js | Simplicidad + potencia para visualizaciones complejas |
| **State** | Pinia (Vue) + localStorage | Persistencia offline, sincro multi-dispositivo |
| **Testing** | Vitest + Playwright | Unit + E2E |
| **Deploy** | GitHub Actions → GitHub Pages | Gratis, automático, versionado |

### Estructura de Carpetas
```
/poker-mastery/
├── .github/workflows/          # CI/CD pipelines
├── public/                     # Assets estáticos
│   ├── assets/                 # Imágenes, iconos, fuentes
│   ├── diplomas/               # Templates de diplomas (SVG)
│   └── data/                   # JSON estáticos (rangos, tablas)
├── src/
│   ├── components/             # Componentes Astro/Vue reutilizables
│   │   ├── ui/                 # Design system (Button, Card, Modal, Tooltip)
│   │   ├── interactive/        # Calculadoras, trainers, gráficas
│   │   ├── layout/             # Header, Footer, Sidebar, Progress
│   │   └── certificates/       # Generador de diplomas
│   ├── content/                # Contenido del curso (Markdown + frontmatter)
│   │   ├── fase-0-fundamentos/
│   │   ├── fase-1-preflop/
│   │   ├── fase-2-postflop/
│   │   ├── fase-3-avanzado/
│   │   ├── fase-4-especializado/
│   │   └── fase-5-maestria/
│   ├── layouts/                # Layouts base (Course, Module, Lesson, Certificate)
│   ├── pages/                  # Rutas (index, curso, modulo, leccion, diploma)
│   ├── stores/                 # Pinia stores (progress, user, settings)
│   ├── utils/                  # Helpers (math, poker-logic, formatting)
│   ├── styles/                 # Global CSS, design tokens
│   └── scripts/                # Build scripts, content validation
├── package.json
├── astro.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

---

## 📚 ESTRUCTURA PEDAGÓGICA: 5 FASES + 25 MÓDULOS + 150+ LECCIONES

### FASE 0: FUNDAMENTOS ABSOLUTOS (Módulos 1-3) 🟢
**Objetivo**: Dominar reglas, terminología y matemáticas básicas

| Módulo | Lecciones | Duración | Proyecto Práctico |
|--------|-----------|----------|-------------------|
| **M1: Reglas y Mecánicas** | 8 | 3h | Simulador de mano completa |
| **M2: Matemáticas Esenciales** | 10 | 5h | Calculadora de odds/equity interactiva |
| **M3: Terminología y Conceptos Base** | 7 | 2h | Glosario interactivo con spaced repetition |

### FASE 1: MAESTRÍA PREFLOP (Módulos 4-8) 🔵
**Objetivo**: Rangos sólidos, posiciones, 3-bet, 4-bet, defense

| Módulo | Lecciones | Duración | Proyecto Práctico |
|--------|-----------|----------|-------------------|
| **M4: Posiciones y Rangos Base** | 12 | 6h | Range builder visual + trainer |
| **M5: Open Raising Strategy** | 10 | 5h | Simulador de open ranges por posición |
| **M6: 3-Betting: Theory & Practice** | 10 | 5h | 3-bet calculator + quiz interactivo |
| **M7: 4-Betting y Cold 4-Betting** | 6 | 3h | Decision tree interactivo |
| **M8: Blind Defense & Stealing** | 8 | 4h | BB vs BTN simulator + exploits |

### FASE 2: DOMINIO POSTFLOP (Módulos 9-14) 🟡
**Objetivo**: CBetting, barreling, check-raise, multiway, texturas

| Módulo | Lecciones | Duración | Proyecto Práctico |
|--------|-----------|----------|-------------------|
| **M9: Fundamentos Postflop & CBetting** | 12 | 6h | Flop texture analyzer + cbet trainer |
| **M10: Turn & River Play** | 10 | 5h | Multi-street planner |
| **M11: Check-Raise Strategy** | 8 | 4h | Check-raise simulator (IP/OOP) |
| **M12: Multiway Pots** | 8 | 4h | Multiway equity calculator |
| **M13: Blind vs Blind Dynamics** | 6 | 3h | BvB range visualizer |
| **M14: Exploitative Postflop** | 10 | 5h | Leak finder + population tendencies |

### FASE 3: CONCEPTOS AVANZADOS (Módulos 15-19) 🟠
**Objetivo**: GTO, solvers, ICM, mental game, bankroll

| Módulo | Lecciones | Duración | Proyecto Práctico |
|--------|-----------|----------|-------------------|
| **M15: GTO Fundamentals & Solver Usage** | 12 | 6h | PIO/GTO+ integration guide + mini-solver |
| **M16: ICM & Tournament Mastery** | 10 | 5h | ICM calculator + final table simulator |
| **M17: Mental Game & Tilt Control** | 8 | 4h | Tilt tracker + breathing exercises |
| **M18: Bankroll Management & Game Selection** | 6 | 3h | BR calculator + variance simulator |
| **M19: Population Analysis & Database Review** | 8 | 4h | HUD config + leak detection workflow |

### FASE 4: ESPECIALIZACIONES (Módulos 20-22) 🔴
**Objetivo**: Formatos específicos, heads-up, mixed games

| Módulo | Lecciones | Duración | Proyecto Práctico |
|--------|-----------|----------|-------------------|
| **M20: Cash Game Mastery (6-max/9-max)** | 10 | 5h | Session planner + winrate tracker |
| **M21: Tournament Mastery (MTT/SNG)** | 12 | 6h | Tournament calendar + ROI optimizer |
| **M22: Heads-Up & Short-Handed** | 8 | 4h | HU range builder + vs reg simulator |

### FASE 5: MAESTRÍA PROFESIONAL (Módulos 23-25) 🟣
**Objetivo**: Nivel élite, coaching, carrera profesional

| Módulo | Lecciones | Duración | Proyecto Práctico |
|--------|-----------|----------|-------------------|
| **M23: High-Stakes Concepts & Overbetting** | 8 | 4h | Overbet calculator + polar/merged visualizer |
| **M24: Coaching Others & Content Creation** | 6 | 3h | Lesson plan builder + video script template |
| **M25: Professional Career & Lifestyle** | 6 | 3h | Annual plan + tax/legal checklist |

---

## 🧮 HERRAMIENTAS INTERACTIVAS (CALCULADORAS + TRAINERS)

### Calculadoras Core (12)
1. **Equity Calculator** - Monte Carlo + enumeración exacta
2. **Pot Odds / MDF / Alpha Calculator** - Con LaTeX paso a paso
3. **ICM Calculator** - Tournament equity, bubble factor
4. **EV Calculator** - Decisiones multi-street con árbol visual
5. **Range vs Range Equity** - Heatmap interactivo
6. **Implied/Reverse Implied Odds** - Con sliders dinámicos
7. **SPR Calculator** - Stack-to-Pot Ratio con recomendaciones
8. **Combo/Blocker Counter** - Visualización de combos bloqueados
9. **Variance/Bankroll Simulator** - Distribución de resultados
10. **HUD Stat Calculator** - VPIP/PFR/3bet/AF convergencia
11. **Tournament Clock / Blind Structure** - Con ICM pressure indicator
12. **Hand Replayer** - Con annotations GTO/exploit

### Trainers Gamificados (8)
1. **Preflop Range Trainer** - Spaced repetition + feedback instantáneo
2. **Flop Texture Classifier** - 1000+ flops categorizados
3. **CBet Decision Trainer** - Con explicación GTO vs exploit
4. **Turn/River Decision Trainer** - Árboles de decisión
5. **ICM Quiz Trainer** - Situaciones de burbuja/FT
6. **Tilt Recognition Trainer** - Escenarios video + respuesta
7. **Hand Reading Trainer** - Range narrowing street by street
8. **Leak Finder Trainer** - Base de datos hands con tags

---

## 🎨 DISEÑO UX/UI: SISTEMA DE DISEÑO COMPLETO

### Paleta de Colores (Semántica + Accesibilidad WCAG AAA)
```css
:root {
  /* Primarios - Poker Brand */
  --poker-felt: #0F5132;        /* Verde mesa principal */
  --poker-felt-light: #1A6B44;
  --poker-gold: #D4A843;        /* Dorado fichas/premios */
  --poker-gold-light: #E8C56D;
  --poker-red: #C0392B;         /* Corazones/Diamantes */
  --poker-black: #1A1A1A;       /* Tréboles/Picas */
  
  /* Semánticos */
  --success: #27AE60;
  --warning: #F39C12;
  --error: #E74C3C;
  --info: #3498DB;
  
  /* Neutros */
  --bg-primary: #F8F9FA;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #E9ECEF;
  --text-primary: #212529;
  --text-secondary: #495057;
  --text-muted: #6C757D;
  --border: #DEE2E6;
  
  /* Dark Mode */
  --bg-primary-dark: #121212;
  --bg-secondary-dark: #1E1E1E;
  --bg-tertiary-dark: #2D2D2D;
  --text-primary-dark: #F8F9FA;
  --text-secondary-dark: #DEE2E6;
  --text-muted-dark: #ADB5BD;
  --border-dark: #495057;
}
```

### Tipografía
- **Display**: "Space Grotesk" - Títulos, números grandes
- **Body**: "DM Sans" - Lectura prolongada, excelente rendering
- **Mono**: "JetBrains Mono" - Código, fórmulas, calculadoras
- **Math**: KaTeX fonts (Computer Modern)

### Componentes Base (Design System)
| Componente | Variantes | Estados | Accesibilidad |
|------------|-----------|---------|---------------|
| Button | primary, secondary, ghost, danger, gold | hover, active, disabled, loading | ARIA, focus-visible |
| Card | default, elevated, outlined, interactive | hover, focus, selected | Role=region |
| Tooltip | top, bottom, left, right, click | delay, persistent | ARIA-describedby |
| Modal | default, fullscreen, drawer | open/close animation | Focus trap, ESC close |
| Progress | linear, circular, stepped | animated, indeterminate | ARIA-valuenow |
| Accordion | single, multiple | animated | ARIA-expanded |
| Tabs | line, pill, card | keyboard nav | ARIA-selected |
| Badge | dot, text, icon, progress | pulse, static | ARIA-label |
| Dropdown | searchable, multi, grouped | keyboard nav | ARIA-haspopup |
| Slider | single, range, discrete | drag, keyboard | ARIA-valuemin/max |
| Chart Container | responsive, exportable, animate | loading, error | Role=img + desc |

---

## 📐 MATEMÁTICAS Y FÓRMULAS LATEX (Renderizado Interactivo)

### Sistema de Fórmulas Clickables
```markdown
<!-- Sintaxis en contenido -->
:::formula id="pot-odds" title="Pot Odds Básicos" difficulty="beginner"
$$
\text{Pot Odds} = \frac{\text{Tamaño del Pozo}}{\text{Apósto a Igualar}} = \frac{P}{B}
$$
:::

<!-- Renderiza como: -->
<!-- - Fórmula centrada, zoom al click -->
<!-- - Hover en cada variable muestra definición -->
<!-- - Botón "Derivación" muestra pasos -->
<!-- - Botón "Ejemplo" abre calculadora con valores prellenados -->
```

### Catálogo de Fórmulas (50+)
| Categoría | Fórmulas | Interactividad |
|-----------|----------|----------------|
| **Probabilidad Básica** | Combinaciones, Permutaciones, Regla del 2/4 | Sliders n/k |
| **Equity** | Hot/cold equity, Equity realization, EV | Range selectors |
| **Pot Odds** | Básicos, Implícitos, Reversos, MDF, Alpha | Live calculator |
| **ICM** | Chip EV → $EV, Bubble Factor, Risk Premium | Tournament simulator |
| **GTO** | Indifference, Minimum Defense Frequency, Bluff/Value ratios | Solver output viewer |
| **Bankroll** | Risk of Ruin, Kelly Criterion, Variance (σ²) | Monte Carlo visual |
| **Statistics** | Winrate CI, Standard Error, Sample size | Confidence interval viz |

---

## 🧠 PSICOLOGÍA DEL APRENDIZAJE + MARKETING

### Técnicas Pedagógicas Implementadas
| Técnica | Implementación |
|---------|----------------|
| **Spaced Repetition** | Algoritmo SM-2 en quiz/trainer, emails automáticos |
| **Active Recall** | Flashcards integradas, "Cubre y Adivina" en fórmulas |
| **Interleaving** | Quiz mezclados entre módulos, no bloqueados |
| **Elaborative Interrogation** | Prompts "¿Por qué?" tras cada concepto clave |
| **Concrete Examples** | 3+ ejemplos reales por concepto (manos famosas) |
| **Dual Coding** | Texto + diagrama + fórmula + video timestamp |
| **Retrieval Practice** | Checkpoints cada 3 lecciones, examenes de fase |
| **Gamification** | XP, rachas, badges, leaderboards, diplomas |

### Funnel de Marketing Integrado
```
Landing Page (SEO) → Lead Magnet (PDF "50 Conceptos Esenciales") 
  → Email Course (7 días gratis) → Módulo 1 Gratis 
  → Pago Curso Completo → Upsell: Coaching/Comunidad
  → Retención: Newsletter semanal + Desafíos mensuales
  → Referidos: Programa afiliados 30%
```

### Lead Magnets (Gratuitos)
1. **PDF**: "50 Conceptos Esenciales de Poker" (diseño premium)
2. **Calculadora**: Equity Calculator standalone (embedable)
3. **Cheatsheet**: "Preflop Ranges por Posición" (imprimible A4)
4. **Mini-curso**: "7 Días para Dejar de Ser Fish" (email sequence)

---

## 🏆 SISTEMA DE CERTIFICACIÓN (DIPLOMAS HONORARIOS)

### Tipos de Diplomas
| Nivel | Requisitos | Diseño | Verificación |
|-------|------------|--------|--------------|
| **Módulo** | 100% lecciones + quiz ≥ 80% | SVG único, hash SHA-256 | URL pública de verificación |
| **Fase** | Todos los módulos de la fase + examen fase ≥ 85% | Diseño premium, foil digital | Blockchain anchor (opcional) |
| **Curso Completo** | 25 módulos + examen final ≥ 90% + proyecto final | Diploma "Master Poker Strategist" | Perfil público verificable |

### Generador de Diplomas
- **Canvas/SVG** renderizado en cliente
- **Datos**: Nombre, fecha, hash único, QR de verificación
- **Estilos**: 5 temas (Classic, Modern, Gold, Dark, Tournament)
- **Export**: PDF (jsPDF), PNG, SVG, imprimible A4
- **Compartir**: LinkedIn, Twitter, descarga directa

### Verificación Pública
```
/verify/{certificate-hash} → Página pública con:
- Nombre alumno (opcional, configurable)
- Curso/Fase/Módulo completado
- Fecha, puntuación, tiempo invertido
- Hash SHA-256 inmutable
- Botón "Descargar PDF original"
```

---

## 📊 ANALYTICS + TRACKING (Privacy-First)

### Métricas Clave (Sin cookies, localStorage only)
- **Progreso**: % completado, tiempo por lección, racha días
- **Rendimiento**: Quiz scores, trainer accuracy, calculator usage
- **Engagement**: Herramientas usadas, diplomas generados, shares
- **Drop-off**: Dónde abandonan, qué lecciones repiten
- **A/B Tests**: Headlines, CTA colors, lesson order (server-side)

### Dashboard Alumno (Privado)
- Mapa de calor actividad (GitHub style)
- Gráfica progreso vs objetivo
- Fortalezas/Debilidades por tag
- Próxima revisión spaced repetition
- Comparativa percentil (anonimizada)

---

## 🚀 GITHUB ACTIONS CI/CD PIPELINE

### Workflows
```yaml
# .github/workflows/ci.yml
- Lint (ESLint, Stylelint, Markdownlint)
- TypeCheck (TypeScript strict)
- Test (Vitest unit + Playwright E2E)
- Build (Astro build + preview)
- Deploy Preview (GitHub Pages preview deployment)

# .github/workflows/deploy.yml (on push main)
- Build production
- Generate sitemap + RSS
- Optimize images (sharp)
- Minify CSS/JS/HTML
- Deploy to GitHub Pages
- Invalidate CDN (Cloudflare si configurado)
- Notify Discord/Slack webhook
```

### Performance Budgets
| Métrica | Límite | Herramienta |
|---------|--------|-------------|
| LCP | < 2.5s | Lighthouse CI |
| TBT | < 200ms | Lighthouse CI |
| CLS | < 0.1 | Lighthouse CI |
| Bundle JS | < 150KB gzip | webpack-bundle-analyzer |
| Bundle CSS | < 50KB gzip | - |
| Images | WebP/AVIF, responsive | sharp + picture element |

---

## 📅 CRONOGRAMA DE EJECUCIÓN (12 SEMANAS)

### Semana 1-2: Fundación Técnica + Contenido Fase 0
- [ ] Setup Astro + Tailwind + Vue + KaTeX + Chart.js
- [ ] Design System completo (tokens, componentes base)
- [ ] Estructura contenido + validación frontmatter
- [ ] Módulos 1-3 (Fundamentos) - Contenido + interactivos
- [ ] Calculadoras: Equity, Pot Odds, Combos
- [ ] CI/CD básico funcionando

### Semana 3-4: Fase 1 Preflop + Sistema Progreso
- [ ] Módulos 4-8 (Preflop) - Contenido + trainers
- [ ] Range Builder visual + Preflop Trainer
- [ ] Pinia stores + localStorage persistence
- [ ] Spaced repetition engine
- [ ] Quiz engine con explicaciones

### Semana 5-6: Fase 2 Postflop + Gráficas Avanzadas
- [ ] Módulos 9-14 (Postflop)
- [ ] Flop Texture Analyzer + CBet Trainer
- [ ] Multi-street EV Calculator
- [ ] D3.js visualizaciones: Range heatmaps, EV trees
- [ ] Hand Replayer básico

### Semana 7-8: Fase 3 Avanzado + ICM + Mental Game
- [ ] Módulos 15-19
- [ ] ICM Calculator completo
- [ ] Mini-solver GTO (precomputed trees)
- [ ] Tilt Tracker + Mental Game exercises
- [ ] Variance Simulator + Bankroll Calculator

### Semana 9-10: Fase 4-5 + Diplomas + Marketing
- [ ] Módulos 20-25
- [ ] Generador diplomas (Canvas/SVG)
- [ ] Verificación pública + QR codes
- [ ] Landing page + Lead magnets
- [ ] Email sequence (7 días) + Newsletter template

### Semana 11: Pulido + Testing + Accesibilidad
- [ ] Audit completo accesibilidad (WCAG 2.1 AA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] Performance optimization (Lighthouse > 95)
- [ ] Content review: fórmulas, ejemplos, ortografía

### Semana 12: Launch + Documentación
- [ ] Deploy producción
- [ ] README completo + CONTRIBUTING
- [ ] Documentación técnica (API, componentes, stores)
- [ ] Video demo + screenshots para README
- [ ] Submit a awesome-astro, product hunt, etc.

---

## 🎯 DEFINICIÓN DE "HECHO" (Definition of Done)

### Por Lección
- [ ] Contenido Markdown validado (frontmatter + estructura)
- [ ] Fórmulas LaTeX renderizan + hovers funcionan
- [ ] Mínimo 1 elemento interactivo (quiz, calculadora, gráfico)
- [ ] 3+ ejemplos concretos (manos reales, capturas solver)
- [ ] Checkpoint quiz al final (≥ 3 preguntas)
- [ ] Tiempo estimado lectura + práctica calibrado
- [ ] Accesibilidad: headings, alt text, contrast, keyboard nav

### Por Módulo
- [ ] Todas las lecciones Done
- [ ] Examen módulo (≥ 10 preguntas, aleatorio, explicaciones)
- [ ] Proyecto práctico completado + autoevaluación
- [ ] Diploma módulo generable
- [ ] Feedback form embebido

### Por Fase
- [ ] Todos los módulos Done
- [ ] Examen fase integrador (≥ 25 preguntas, tiempo límite)
- [ ] Diploma fase generable (diseño premium)
- [ ] Retrospectiva aprendizaje (prompt reflexión)

### Curso Completo
- [ ] 25 módulos Done
- [ ] Examen final (≥ 50 preguntas, 2h, proctored option)
- [ ] Proyecto final: Análisis mano completa + video 10min
- [ ] Diploma "Master Poker Strategist"
- [ ] Perfil público verificable
- [ ] Alumni access: contenido exclusivo, comunidad

---

## 💰 PRESUPUESTO Y RECURSOS (Estimación)

### Tiempo Desarrollo
| Fase | Horas Estimadas |
|------|-----------------|
| Setup + Design System | 40h |
| Contenido 150 lecciones | 300h (2h/lección avg) |
| 20 Calculadoras/Trainers | 120h |
| Diplomas + Verificación | 30h |
| CI/CD + Testing + Deploy | 40h |
| Marketing + Landing | 40h |
| **TOTAL** | **~570h** |

### Costes Externos (Opcionales)
- Dominio personalizado: $12/año
- Email service (SendGrid/Resend): $0-20/mes
- Analytics (Plausible/Umami self-hosted): $0
- Iconos/Ilustraciones premium: $50-200
- **Total estimado**: <$500 primer año

---

## 🔄 MANTENIMIENTO POST-LANZAMIENTO

### Roadmap Continuo
| Trimestre | Enfoque |
|-----------|---------|
| Q1 | Feedback alumnos, fix bugs, nuevo contenido bonus |
| Q2 | Módulo nuevo: "Solver Studies Deep Dive" |
| Q3 | App móvil (PWA + Capacitor), push notifications |
| Q4 | Certificación nivel 2: "High Stakes Crusher" |

### Automatizaciones
- Dependabot weekly updates
- Content freshness check (links rotos, datos obsoletos)
- Automated diploma backup (IPFS/Arweave)
- Weekly analytics report → Notion/GitHub Issues

---

## ✅ CHECKLIST MAESTRO DE EJECUCIÓN

### Fundación (Semana 1-2)
- [ ] `npm create astro@latest` + config
- [ ] Tailwind + design tokens + dark mode
- [ ] Vue 3 integration + Pinia
- [ ] KaTeX + MathJax fallback config
- [ ] Chart.js + D3.js setup
- [ ] Componentes UI base (20+)
- [ ] Content collections schema (Zod)
- [ ] GitHub Actions CI + Deploy preview
- [ ] Módulos 1-3 contenido completo
- [ ] 3 calculadoras core funcionando

### Preflop (Semana 3-4)
- [ ] Módulos 4-8 contenido
- [ ] Range Builder visual
- [ ] Preflop Trainer (spaced repetition)
- [ ] Progress store + persistence
- [ ] Quiz engine + explicaciones
- [ ] Diplomas módulo generando

### Postflop (Semana 5-6)
- [ ] Módulos 9-14 contenido
- [ ] Flop Texture Classifier
- [ ] CBet/Turn/River Trainers
- [ ] Multi-street EV Calculator
- [ ] D3 Range Heatmaps
- [ ] Hand Replayer v1

### Avanzado (Semana 7-8)
- [ ] Módulos 15-19 contenido
- [ ] ICM Calculator completo
- [ ] GTO Mini-solver (precomputed)
- [ ] Mental Game Toolkit
- [ ] Variance/Bankroll Simulator
- [ ] Database Review workflow

### Especialización + Maestría (Semana 9-10)
- [ ] Módulos 20-25 contenido
- [ ] Diploma Generator (Canvas/SVG)
- [ ] Verificación pública + QR
- [ ] Landing Page + SEO
- [ ] Lead Magnets (PDF, Calculadora, Cheatsheet)
- [ ] Email Sequence 7 días

### Launch (Semana 11-12)
- [ ] Accesibilidad audit completo
- [ ] Cross-browser/device testing
- [ ] Performance optimization
- [ ] Content review completo
- [ ] Deploy producción
- [ ] Documentación + Video demo
- [ ] Launch marketing

---

## 📝 NOTAS CRÍTICAS PARA EJECUCIÓN

### Principios Ponytail (Aplicar Siempre)
1. **No inventes** - Usa librerías existentes (KaTeX, Chart.js, Pinia)
2. **Un componente, una responsabilidad** - No mega-componentes
3. **Data-first** - Contenido en Markdown/JSON, lógica separada
4. **Progressive enhancement** - Funciona sin JS, mejor con JS
5. **Accesibilidad nativa** - No "añadir depois", desde el primer commit
6. **Performance real** - Mide, no supongas. Lighthouse CI en cada PR

### Riesgos y Mitigación
| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Scope creep | Muy Alta | Alto | Frozen scope tras Semana 2. Issues → Backlog v2 |
| Burnout contenido | Alta | Alto | Template lección fijo. Batch writing. AI-assisted drafting |
| Performance mobile | Media | Alto | Budget estricto. Test real devices semanal |
| LaTeX rendering bugs | Media | Medio | Fallback MathJax. Test suite fórmulas |
| GitHub Pages limits | Baja | Alto | <1GB, <10k files. Optimize assets. Cloudflare Pages backup |

### Decisiones Técnicas Clave (No Revisar)
- ✅ Astro (no Next.js, no VitePress)
- ✅ Vue Islands (no React, no Svelte)
- ✅ Tailwind (no CSS Modules, no Styled Components)
- ✅ KaTeX (no MathJax solo, no LaTeX.js)
- ✅ Pinia + localStorage (no IndexedDB, no Supabase)
- ✅ GitHub Pages (no Netlify, no Vercel - costo 0)
- ✅ SVG Diplomas (no PDF server-side, no canvas only)

---

## 🎬 PRÓXIMO PASO INMEDIATO

**Crear la estructura base del proyecto Astro con todo el tooling configurado.**

Esto incluye:
1. `package.json` con todas las dependencias
2. `astro.config.mjs` con integrations (Vue, Tailwind, MDX, Sitemap)
3. `tailwind.config.js` con design tokens poker
4. `tsconfig.json` strict
5. Estructura de carpetas completa
6. GitHub Actions CI workflow
7. Primer componente: `BaseLayout.astro` + design system preview

---

*Plan creado: 2026-10-29 | Versión 1.0 | Autor: Adeptus Vinictus II*
*Estado: LISTO PARA EJECUCIÓN - Iniciar Semana 1*