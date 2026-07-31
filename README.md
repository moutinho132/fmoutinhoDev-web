# fmoutinhoDev - Portafolio y Plataforma Educativa

Portafolio profesional de Fernando Moutinho, Hub de YouTube y Plataforma Educativa Interactiva.

## Características

- **Portafolio Profesional**: CV, experiencia y proyectos destacados
- **Carrusel de YouTube**: Videos más vistos del canal @fmoutinhoDev
- **Playgrounds Interactivos**:
  - SQL Editor (SQLite en WebAssembly)
  - JavaScript Sandbox
  - Git Simulator con visualización de commits

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Estilos**: Tailwind CSS + Shadcn/UI
- **Motores Interactivos**: sql.js (WASM), Web Workers para JS
- **Tracking**: Meta Pixel, Google Analytics

## Estructura del Proyecto

```
src/
├── app/                    # Páginas (App Router)
│   ├── page.tsx           # Homepage
│   ├── playground/        # Playgrounds interactivos
│   ├── cursos/            # Catálogo de cursos
│   ├── privacidad/        # Política de Privacidad
│   └── terminos/          # Términos de Servicio
├── components/
│   ├── layout/            # Header y Footer
│   ├── sections/          # Secciones de página
│   ├── playground/        # Componentes de playgrounds
│   ├── ads/               # Componentes publicitarios
│   └── ui/                # Componentes UI base
└── lib/                   # Utilidades y helpers
```

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

## Configuración

### Meta Pixel
Reemplaza `YOUR_PIXEL_ID` en `src/app/layout.tsx` con tu ID de píxel de Meta.

### Google Analytics
Reemplaza `GA_MEASUREMENT_ID` en `src/app/layout.tsx` con tu ID de medición de Google Analytics.

## Licencia

Uso personal y educativo. Contactar para uso comercial.
