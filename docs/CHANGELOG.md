# WealthLens — CHANGELOG

Registro de progreso por sesión y decisiones de arquitectura del proyecto.  
Formato: decisiones de arquitectura (🏛️), progreso técnico (✅), pendiente (⏳).

---

## Sesión 1 — Planificación y diseño del programa
*Abril 2026*

### Progreso
✅ Definición del objetivo del programa de aprendizaje (20 semanas, 4-6h/semana)  
✅ Elección de la aplicación a construir: **WealthLens** — gestión de cartera financiera e inmobiliaria  
✅ Definición del alcance v1: portfolio financiero, inmuebles, dashboard global, exportación IA-ready  
✅ Selección del stack tecnológico completo  
✅ Diseño del plan de aprendizaje en 8 módulos  
✅ Documento de referencia generado: `WealthLens_Plan_Aprendizaje_v2.md`  

### Contexto de la decisión — aplicación elegida
**Problema:** Portseido (herramienta actual) no soporta inmuebles alquilados con su lógica propia, y no exporta datos estructurados para análisis con IA.  
**Solución:** Construir WealthLens como proyecto de aprendizaje que resuelve un problema real.  
**Alternativa descartada:** App de gestión de controles ISO 27001 — viable técnicamente pero con duplicación respecto al trabajo en Solvd. Queda como proyecto #2 una vez completado WealthLens.

### 🏛️ Decisión de arquitectura — Stack tecnológico
**Decisión:** React + Vite (frontend), Azure Functions Node.js (backend), Azure AD B2C (auth), Azure Cosmos DB (DB), Azure Static Web Apps + GitHub Actions (DevOps).  
**Razón:** Ecosistema Azure coherente con el entorno profesional (Allianz/Solvd). Serverless elimina gestión de servidores. JavaScript unificado en frontend y backend elimina cambio de contexto.  
**Alternativa descartada:** Firebase/Supabase — más rápido de arrancar pero menos representativo del mercado enterprise.

---

## Sesión 2 — M1: Entorno y repositorio
*Abril 2026*

### Progreso
✅ Instalación de Node.js 20 LTS (vía cuenta admin por restricciones del Mac corporativo)  
✅ Verificación del entorno: `node --version`, `npm --version`, `git --version`  
✅ Configuración de Git con identidad de usuario  
✅ Creación de cuenta GitHub (usuario: UYESP)  
✅ Configuración de autenticación SSH entre Mac y GitHub  
✅ Creación de la estructura monorepo en local  
✅ Creación del repositorio `wealthlens` en GitHub  
✅ Primer commit y push: estructura inicial del proyecto  
✅ **Hito M1 completado** 🟢  

### Estructura del repositorio tras M1
```
wealthlens/
├── frontend/
├── backend/
└── README.md
```

### 🏛️ Decisión de arquitectura — Monorepo vs Polyrepo
**Decisión:** Monorepo — frontend y backend en el mismo repositorio Git.  
**Razón:** Equipo de uno, frontend y backend fuertemente acoplados (cambios en API implican cambios en frontend), pipeline de CI/CD más simple con un solo repositorio.  
**Alternativa descartada:** Polyrepo (repos separados por componente) — beneficio principal es autonomía entre equipos, irrelevante para un proyecto personal.  
**Referencia:** Google, Meta, Microsoft usan monorepos. React, Angular y Vue están en monorepos.

### Notas técnicas
- Mac corporativo con cuenta estándar sin permisos `sudo` — instalación realizada desde cuenta admin.
- Recomendación futura: evaluar NVM (Node Version Manager) para gestionar versiones de Node sin permisos de administrador.

---

## Sesión 3 — M2: Design System & UI estática
*Abril 2026*

### Progreso
✅ Inicialización del proyecto React 18 con Vite en `frontend/`  
✅ Instalación y configuración de Tailwind CSS v4  
✅ Instalación y configuración de Shadcn/ui  
✅ Creación de la estructura de carpetas del frontend  
✅ Construcción del layout base: sidebar de navegación + área de contenido  
✅ Construcción de `Dashboard.jsx` con datos hardcoded  
✅ Construcción de `Portfolio.jsx` con tabla de 6 posiciones  
✅ Construcción de `Inmuebles.jsx` con 2 propiedades  
✅ Construcción de `NuevaPositionSheet.jsx` — formulario panel lateral  
✅ Commit M2: `8647b73` — 38 archivos, 8.522 líneas  
✅ **Hito M2 completado** 🟢  

### Estructura del frontend tras M2
```
frontend/src/
├── App.jsx                        ← navegación por estado (useState)
├── components/
│   ├── Layout.jsx                 ← top bar + área de contenido
│   ├── Sidebar.jsx                ← nav dark con íconos Lucide
│   ├── NuevaPositionSheet.jsx     ← formulario panel lateral (Sheet)
│   └── ui/                        ← 7 componentes Shadcn/ui
└── pages/
    ├── Dashboard.jsx              ← 4 cards + distribución + brokers + resumen inmobiliario
    ├── Portfolio.jsx              ← tabla de posiciones con G/P calculado
    └── Inmuebles.jsx              ← propiedades con equity y rentabilidades
```

### 🏛️ Decisión de arquitectura — Component-Based Architecture
**Decisión:** UI organizada en componentes con responsabilidad única. `Layout` no sabe qué página muestra. `Sidebar` no sabe de datos. Cada página solo tiene sus propios datos.  
**Patrón aplicado:** Separation of Concerns — cada componente hace una cosa y la hace bien.  
**Framework mental:** Atomic Design — `ui/` contiene átomos (Button, Card, Badge), `NuevaPositionSheet` es una molécula, las páginas son organismos completos.

### 🏛️ Decisión de arquitectura — Tailwind v4 vs v3
**Decisión:** Tailwind CSS v4 (última versión disponible).  
**Razón:** Usa plugin de Vite en lugar de PostCSS — configuración más simple y mejor integración. Shadcn/ui ya es compatible con v4.  
**Trade-off asumido:** v4 más reciente, menos recursos en Stack Overflow si hay problemas. Aceptable para proyecto personal de aprendizaje. En proyecto corporativo con equipo grande se habría elegido v3 por estabilidad.

### 🏛️ Decisión de arquitectura — useState vs React Router para navegación
**Decisión:** Navegación implementada con `useState` en `App.jsx` en lugar de React Router.  
**Razón:** M2 es UI estática. React Router se añadirá en M3 cuando sea necesario. Cambio localizado en un solo archivo.  
**Principio aplicado:** YAGNI (You Aren't Gonna Need It) — no añadir complejidad antes de necesitarla.

### 🏛️ Decisión de arquitectura — Sheet vs Modal para el formulario
**Decisión:** Panel lateral deslizante (Sheet de Shadcn) en lugar de modal para el formulario de nueva posición.  
**Razón:** Formularios con 6-7 campos necesitan espacio vertical. El Sheet desliza desde el lateral y mantiene el contexto de la pantalla visible al fondo — mejor UX en apps de dashboard.  
**Patrón aplicado:** El Sheet es un componente controlado — recibe `open` y `onClose` como props desde Portfolio. Portfolio no sabe nada del interior del formulario. Separation of Concerns.

### Convención de commits establecida
```
feat(Mx): descripción    ← nueva funcionalidad del módulo x
fix: descripción         ← corrección de bug
arch: descripción        ← decisión de arquitectura
docs: descripción        ← documentación
```

---

## Próxima sesión — M3: React funcional y estado

### Qué viene
⏳ Añadir React Router para navegación real entre páginas  
⏳ Implementar `useState` y `useContext` para estado global de la cartera  
⏳ CRUD completo en memoria: añadir, editar y borrar posiciones  
⏳ Formulario de alta de inmueble  
⏳ Cálculos automáticos: rentabilidad, totales, distribución porcentual  
⏳ Gráficos con Recharts: distribución por tipo de activo  

### Patrón de arquitectura a cubrir en M3
**Unidirectional Data Flow y State Management** — el patrón Flux, por qué los datos fluyen en una sola dirección en React, cuándo usar estado local vs estado global, trade-offs entre Context API / Redux / Zustand.

---

## Registro de hitos

| Hito | Estado | Sesión | Commit |
|------|--------|--------|--------|
| 🟢 Entorno listo | ✅ Completado | Sesión 2 | primer push |
| 🟢 UI estática | ✅ Completado | Sesión 3 | `8647b73` |
| 🟢 App dinámica | ⏳ Pendiente | M3 | — |
| 🚀 Primera URL pública | ⏳ Pendiente | M4 | — |
| 🟢 API funcionando | ⏳ Pendiente | M5 | — |
| 🔐 Login real | ⏳ Pendiente | M6 | — |
| 💾 Datos persistentes | ⏳ Pendiente | M7 | — |
| 🏁 WealthLens v1 | ⏳ Pendiente | M8 | — |
