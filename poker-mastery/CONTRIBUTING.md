# Poker Mastery - Guía de Contribución

¡Gracias por tu interés en contribuir a Poker Mastery! Este documento describe el proceso para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Guía de Estilo de Commits](#guía-de-estilo-de-commits)
- [Licencia](#licencia)

## Código de Conducta

Este proyecto adhiere al [Código de Conducta del Contribuyente](CODE_OF_CONDUCT.md). Al participar, se espera que mantengas este código. Por favor reporta cualquier comportamiento inaceptable a los mantenedores del proyecto.

## Cómo Contribuir

### 1. Reportar Issues

Antes de crear un issue, por favor:
- Busca en issues existentes para evitar duplicados
- Usa el template apropiado (Bug Report o Feature Request)
- Incluye pasos claros para reproducir bugs
- Proporciona contexto (navegador, OS, versión)

### 2. Enviar Pull Requests

1. **Fork** el repositorio
2. Crea una **rama** desde `main`: `git checkout -b feature/tu-feature`
3. Implementa tus cambios siguiendo los estándares de código
4. Ejecuta las verificaciones: `npm run lint`, `npm run check`, `npm run test`
5. **Commit** tus cambios siguiendo [Conventional Commits](#guía-de-estilo-de-commits)
6. **Push** a tu rama: `git push origin feature/tu-feature`
7. Abre un **Pull Request** hacia `main`

### 3. Revisión de Código

Todos los PRs deben ser revisados por al menos un mantenedor antes del merge.

## Estándares de Código

### TypeScript

- Usa modo estricto (`strict: true` en tsconfig.json)
- Evita `any` cuando sea posible
- Usa interfaces en lugar de type aliases para objetos
- Exporta tipos cuando se reutilicen

### CSS / Tailwind

- Usa clases utilitarias de Tailwind CSS
- No uses CSS en línea cuando sea evitable
- Respeta el design system (colores, tipografía, espaciado)
- Mantén accesibilidad WCAG 2.1 AA

### Componentes Astro + Vue

- Usa Astro para contenido estático (páginas, lecciones)
- Usa Vue para interactividad (calculadoras, trainers)
- Los componentes Vue deben ir en `src/components/interactive/`
- No mezcles lógica de negocio en los templates

### Archivos

- Nombres en kebab-case para archivos y carpetas
- PascalCase para componentes Vue y exports
- camelCase para variables y funciones
- UPPER_SNAKE_CASE para constantes

## Proceso de Pull Request

1. Tu PR será asignado automáticamente a un revisor
2. Las verificaciones de CI deben pasar (lint, typecheck, build, test)
3. Se requerirá al menos una aprobación antes del merge
4. Usa "Squash and merge" para mantener el historial limpio

## Guía de Estilo de Commits

Este proyecto sigue [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[ámbito opcional]: <descripción>
```

### Tipos permitidos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva característica |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Cambios de formato (espacios, comillas, etc.) |
| `refactor` | Refactorización de código |
| `perf` | Mejora de rendimiento |
| `test` | Agregar o corregir tests |
| `chore` | Tareas de mantenimiento |
| `ci` | Cambios en configuración de CI |
| `build` | Cambios en build system o dependencias |

### Ejemplos

```
feat(curso): agregar lección de rangos preflop
fix(herramientas): corregir cálculo de ICM en burbuja
docs(readme): actualizar instrucciones de instalación
chore(deps): actualizar astro a v5.0.0
```

## Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la [Licencia MIT](LICENSE).
