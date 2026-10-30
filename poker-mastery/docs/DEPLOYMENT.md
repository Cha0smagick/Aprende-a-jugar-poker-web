# Poker Mastery - Guía de Despliegue

## Despliegue Automático (GitHub Pages)

El despliegue a GitHub Pages es automático mediante GitHub Actions. Cada push a la rama `main` triggerará:

1. Instalación de dependencias
2. Ejecución de lint, typecheck, build y tests
3. Despliegue a GitHub Pages

### Configuración requerida

1. En el repositorio de GitHub, ve a **Settings > Pages**
2. Selecciona **GitHub Actions** como fuente de despliegue
3. Asegúrate de que el workflow `ci.yml` esté presente en `.github/workflows/`

## Despliegue Manual

Si necesitas desplegar manualmente:

```bash
# Clonar el repositorio
git clone https://github.com/poker-mastery/poker-mastery.git
cd poker-mastery

# Instalar dependencias
npm ci

# Build de producción
npm run build

# El resultado estará en ./dist
# Servir con cualquier servidor estático
npx serve dist
```

## Variables de Entorno

Copia `.env.example` a `.env` para desarrollo local:

```bash
cp .env.example .env
```

## Base Path

La aplicación está configurada con `base: '/poker-mastery/'` en `astro.config.mjs` para despliegue en páginas de usuario/organización de GitHub.

Para despliegue en dominio propio, cambia `base: '/'` en la configuración.

## Variables de Entorno de Producción

No se requieren variables de entorno para el despliegue de producción, ya que la aplicación es completamente estática y cliente-side.

## Troubleshooting

### Error de WebAssembly en el build

Si encuentras errores de WebAssembly durante el build de Astro:

1. Limpia `node_modules` y `package-lock.json`
2. Ejecuta `npm install` nuevamente
3. Verifica que estás usando Node.js >= 20

### Errores de Tailwind CSS

Si las clases personalizadas no se aplican:

1. Verifica que estén definidas en `tailwind.config.js`
2. Asegúrate de usar `@layer` en el CSS global si usas `@apply`
3. Ejecuta `npm run build` para regenerar los estilos CSS
