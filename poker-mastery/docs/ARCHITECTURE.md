# Poker Mastery - Documentación de Arquitectura

## Visión General

Poker Mastery es una aplicación web estática construida con Astro 5, diseñada para ofrecer un curso completo de poker profesional con herramientas interactivas, calculadoras en tiempo real y certificación verificable.

## Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| Framework | Astro | 5.x | Generador de sitios estáticos (SSG) |
| UI Interactiva | Vue 3 | 3.5.x | Componentes interactivos e islas |
| Gestión de Estado | Pinia | 2.x | Store para progreso del usuario |
| Estilos | Tailwind CSS | 3.4.x | CSS utilitario y design system |
| Matemáticas | KaTeX | 0.16.x | Renderizado de fórmulas LaTeX |
| Gráficas | D3.js + Chart.js | 7.x + 4.x | Visualizaciones interactivas |
| Tipado | TypeScript | 5.9.x | Tipado estricto |
| Despliegue | GitHub Pages | - | Hosting estático gratuito |

## Estructura del Proyecto

```
src/
├── content/          # Colecciones de contenido MD/MDX
│   └── config.ts     # Esquema de colecciones de Astro
├── components/
│   ├── interactive/  # Componentes Vue interactivos
│   └── layout/       # Componentes de layout (Header, Footer)
├── layouts/
│   ├── BaseLayout.astro      # Layout base de páginas
│   └── LessonLayout.astro    # Layout específico de lecciones
├── pages/
│   ├── curso/          # Rutas del curso (fases, módulos, lecciones)
│   ├── herramientas/   # Rutas de herramientas interactivas
│   ├── diplomas.astro  # Página de verificación de diplomas
│   └── index.astro     # Página principal
├── stores/
│   └── progress.ts     # Store de Pinia para progreso
├── styles/
│   └── global.css    # CSS global con variables de diseño
└── utils/
    └── course-data.ts  # Definiciones de fases, módulos, lecciones
```

## Design System

El proyecto utiliza un sistema de diseño basado en colores de poker:

- **Felt Green** (`#0F5132`): Color principal, fondo de mesa
- **Poker Gold** (`#D4A843`): Color secundario, acentos premium
- **Poker Red** (`#C0392B`): Errores, alertas
- **Poker Black** (`#1A1A1A`): Texto principal, contraste

Variables CSS definidas en `src/styles/global.css` bajo `:root` y `.dark` para soporte de temas claro/oscuro.

## Gestión de Progreso

El progreso del usuario se almacena en `localStorage` mediante un store de Pinia que implementa:

- **Espaced Repetition (SM-2)**: Algoritmo de repetición espaciada para optimizar retención
- **XP y Levels**: Sistema de experiencia y niveles de usuario
- **Diplomas**: Generación de certificados con hash SHA-256
- **Rachas**: Contador de días consecutivos de estudio

## Accesibilidad

- WCAG 2.1 AA como mínimo mínimo
- Navegación por teclado completa
- Contraste de color verificado
- Skip links para lectores de pantalla
- ARIA labels en elementos interactivos
- Modo oscuro automático según preferencia del sistema

## Rendimiento

Objetivos de rendimiento (Core Web Vitals):

| Métrica | Objetivo |
|---------|----------|
| LCP | < 2.5s |
| TBT | < 200ms |
| CLS | < 0.1 |

Configuración en `lighthouserc.json`.

## Despliegue

La aplicación se despliega automáticamente a GitHub Pages mediante GitHub Actions en cada push a `main`. El workflow incluye:

1. Instalación de dependencias (`npm ci`)
2. Linting (`npm run lint`)
3. Type checking (`npm run check`)
4. Build de producción (`npm run build`)
5. Tests (`npm run test`)
6. Despliegue a GitHub Pages

## Seguridad

- No se almacenan datos sensibles en el cliente
- Los diplomas se verifican mediante hash SHA-256
- No hay autenticación de servidor (todo es estático)
- Headers de seguridad configurados en el build

## Mantenimiento

- Dependencias revisadas mensualmente
- Audit de seguridad con `npm audit`
- Actualizaciones de Astro y dependencias principales trimestrales
