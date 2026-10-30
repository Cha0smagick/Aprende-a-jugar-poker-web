# Poker Mastery

## Scripts Disponibles

### Desarrollo

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

### Calidad de Código

```bash
# Linter
npm run lint

# Auto-fix de linter
npm run lint:fix

# Formateo con Prettier
npm run format

# Verificación de tipos TypeScript
npm run check
```

### Testing

```bash
# Tests unitarios (Vitest)
npm run test

# Tests end-to-end (Playwright)
npm run test:e2e
```

### Utilidades

```bash
# Validar contenido de colecciones
npm run validate:content

# Generar templates de diplomas
npm run generate:diplomas
```

## Estructura de Ramas

| Rama | Propósito | Protegida |
|------|-----------|-----------|
| `main` | Producción estable | Sí |
| `develop` | Integración de features | Sí |
| `feature/*` | Nuevas características | No |
| `fix/*` | Correcciones de bugs | No |
| `hotfix/*` | Correcciones críticas en producción | No |

## Flujo de Trabajo (Git Flow Simplificado)

1. Crea una rama `feature/*` desde `develop`
2. Implementa y prueba tus cambios
3. Abre un PR hacia `develop`
4. Después de revisión y aprobaciones, haz merge a `develop`
5. Cuando estés listo para release, haz PR de `develop` a `main`
6. El deploy a producción es automático desde `main`

## Contacto

Para preguntas sobre el proyecto, abre un issue en GitHub o usa las discusiones del repositorio.
