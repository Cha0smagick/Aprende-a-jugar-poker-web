# Poker Mastery

> Curso completo de poker profesional — De amateur a profesional con certificación oficial.
> Matemáticas, GTO, ICM, Mental Game, Bankroll y más. 100% gratis y open source.

[![CI/CD Pipeline](https://github.com/poker-mastery/poker-mastery/actions/workflows/ci.yml/badge.svg)](https://github.com/poker-mastery/poker-mastery/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Built%20with-Astro-ff3e00?logo=astro)](https://astro.build/)
[![Vue](https://img.shields.io/badge/Vue-3.5-4fc08d?logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

## Tabla de Contenidos

- [Descripción](#descripción)
- 🚀 Características](#características)
- [🛠️ Stack Tecnológico](#stack-tecnológico)
- [📦 Instalación](#instalación)
- [🧪 Desarrollo](#desarrollo)
- [🏗️ Build y Despliegue](#build-y-despliegue)
- [📁 Estructura del Proyecto](#estructura-del-proyecto)
- [🧪 Testing](#testing)
- [🤝 Contribuciones](#contribuciones)
- [📄 Licencia](#licencia)
- [👥 Autores](#autores)

## Descripción

**Poker Mastery** es un sistema integral de aprendizaje de poker profesional construido con tecnologías web modernas. Cubre desde fundamentos básicos hasta conceptos avanzados de GTO, ICM y teoría de juegos, con herramientas interactivas, calculadoras en tiempo real, trainers gamificados y diplomas verificables con hash SHA-256.

### Características Principales

| Categoría | Detalle |
|-----------|---------|
| **Curso** | 5 fases, 25 módulos, 150+ lecciones |
| **Herramientas** | 20+ calculadoras y trainers interactivos |
| **Certificación** | Diplomas con SHA-256 y QR de verificación |
| **Matemáticas** | Fórmulas LaTeX con KaTeX (clickables y hoverables) |
| **Gráficas** | D3.js y Chart.js interactivas |
| **Gamificación** | Spaced repetition (SM-2), XP, niveles, rachas |
| **Accesibilidad** | WCAG 2.1 AA |
| **Rendimiento** | LCP < 2.5s, TBT < 200ms |

## 🛠️ Stack Tecnológico

- **Framework**: [Astro 5](https://astro.build/)
- **UI**: [Vue 3](https://vuejs.org/) + [Pinia](https://pinia.vuejs.org/)
- **Estilos**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Matemáticas**: [KaTeX 0.16](https://katex.org/)
- **Gráficas**: [D3.js 7](https://d3js.org/) + [Chart.js 4](https://www.chartjs.org/)
- **TypeScript**: Modo estricto
- **Despliegue**: GitHub Pages + GitHub Actions

## 📦 Instalación

### Requisitos previos

- Node.js >= 20.0.0
- npm >= 10.0.0

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/poker-mastery/poker-mastery.git
cd poker-mastery

# Instalar dependencias
npm install

# Verificar entorno de desarrollo
npm run check

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`.

## 🧪 Desarrollo

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción (check + build) |
| `npm run preview` | Vista previa del build de producción |
| `npm run check` | Verificación de tipos TypeScript |
| `npm run lint` | Linter de código |
| `npm run format` | Formateo con Prettier |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:e2e` | Ejecutar tests end-to-end |

## 🏗️ Build y Despliegue

### Build local

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`.

### Despliegue a GitHub Pages

El despliegue es automático mediante GitHub Actions en cada push a `main`.

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Variables de entorno

Copia `.env.example` a `.env` y configura las variables necesarias:

```bash
cp .env.example .env
```

## 📁 Estructura del Proyecto

```
poker-mastery/
├── .github/              # Templates, owners, workflows de CI/CD
├── docs/                 # Documentación técnica y de usuario
├── scripts/              # Scripts de utilidad (build, deploy, validación)
├── src/
│   ├── content/          # Colecciones de contenido (Markdown/MDX)
│   │   └── config.ts     # Esquema de colecciones
│   ├── components/       # Componentes reutilizables (Astro + Vue)
│   │   ├── interactive/  # Calculadoras, trainers, cartas
│   │   └── layout/       # Header, Footer, navegación
│   ├── layouts/          # Layouts base y de lecciones
│   ├── pages/            # Rutas de la aplicación (Astro)
│   ├── stores/           # Stores de estado (Pinia)
│   ├── styles/           # CSS global y design system
│   └── utils/            # Utilidades y helpers
├── public/               # Assets estáticos (SVG, imágenes, scripts)
├── dist/                 # Build de producción (generado)
├── astro.config.mjs      # Configuración de Astro
├── tailwind.config.js    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración de TypeScript
└── package.json          # Dependencias y scripts
```

## 🧪 Testing

```bash
# Tests unitarios (Vitest)
npm run test

# Tests end-to-end (Playwright)
npm run test:e2e

# Coverage
npm run test -- --coverage
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor lee nuestra [Guía de Contribución](CONTRIBUTING.md) para entender nuestro proceso de desarrollo, estándares de código y cómo enviar pull requests.

### Flujo de trabajo recomendado

1. Crea un issue describiendo el cambio propuesto
2. Crea una rama desde `main`: `git checkout -b feature/nombre-de-la-feature`
3. Implementa los cambios siguiendo los estándares de código
4. Ejecuta `npm run lint` y `npm run test`
5. Envía un pull request referencing el issue

### Estándares de código

- **TypeScript**: Modo estricto, sin `any` cuando sea posible
- **CSS**: Tailwind CSS con clases utilitarias
- **Componentes**: Astro para páginas estáticas, Vue para interactividad
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)
- **Accesibilidad**: WCAG 2.1 AA mínimo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Adeptus Vinictus II** - *Tecnoprieste Principal* - [@poker-mastery](https://github.com/poker-mastery)

---

<div align="center">

**Hecho con ❤️ y ☕ para la comunidad de poker**

[⬆ Volver al inicio](#poker-mastery)

</div>
