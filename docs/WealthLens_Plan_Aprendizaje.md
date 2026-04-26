# WealthLens — Plan de Aprendizaje
**Aplicación de gestión de cartera financiera e inmobiliaria**  
Versión 1.0 · Abril 2026

---

## 1. Contexto y objetivo

### Quién eres
Ingeniero en Telecomunicaciones, 50 años. Technology Manager con experiencia en gestión de proyectos de software, arquitectura de sistemas, y liderazgo técnico. Conocimiento conceptual sólido de microservicios, contenedores, DevOps y SDLC. Experiencia práctica limitada con código hands-on.

### Qué quieres conseguir
Construir una aplicación web real y completa — con frontend, backend, autenticación, base de datos y despliegue — que integre todos los conceptos de forma práctica. El objetivo no es convertirte en ingeniero de software, sino tener la experiencia hands-on suficiente para liderar con criterio técnico real y aprovechar herramientas de IA como Claude Code al máximo nivel.

### Por qué WealthLens
Tienes carteras en 5-6 bancos y 3 brokers internacionales. Usas Portseido como herramienta actual, pero tiene dos limitaciones concretas que esta app resuelve:
1. **No soporta inmuebles alquilados** con su lógica propia (valor, hipoteca, alquiler, rentabilidad)
2. **No exporta datos estructurados para análisis con IA**

---

## 2. La aplicación — WealthLens

### Descripción
Aplicación web personal para la gestión consolidada de cartera financiera (acciones, ETFs, fondos, crypto) e inmobiliaria. Actualización automática de precios vía API. Dashboard global de patrimonio neto. Exportación de datos para análisis con IA.

### Módulos del producto

#### Módulo 1 — Portfolio financiero
- Registro de posiciones por broker (nombre, ticker, tipo de activo, cantidad, precio de compra, divisa)
- Actualización automática de precios una vez al día (API externa)
- Rentabilidad por posición: valor actual, ganancia/pérdida en € y %
- Agrupación por broker y por tipo de activo
- Vista de distribución (pesos % de cada activo sobre el total)

#### Módulo 2 — Inmuebles
- Alta de inmuebles con: descripción, ubicación, valor de compra, valor estimado actual
- Hipoteca: importe pendiente, cuota mensual, tipo de interés
- Ingresos: alquiler mensual bruto
- Gastos: IBI, comunidad, seguro, mantenimiento estimado
- Cálculo automático: rentabilidad bruta y neta, equity (valor - hipoteca)

#### Módulo 3 — Dashboard global
- Patrimonio neto total = portfolio financiero + equity inmobiliario
- Distribución por clase de activo (gráfico de tarta)
- Evolución del patrimonio en el tiempo (gráfico de línea)
- Resumen de rentabilidades

#### Módulo 4 — Exportación IA-ready
- Exportar toda la cartera a CSV y JSON estructurado
- Prompt preformateado para análisis con Claude

### Fuera de alcance (v1)
- Importación de extractos de brokers (lo hace Portseido)
- Análisis de dividendos detallado
- Comparación con benchmarks (S&P 500, etc.)
- Multi-usuario / compartir cartera

---

## 3. Stack tecnológico

```
┌─────────────────────────────────────────────┐
│              Usuario / Browser               │
└─────────────────────────────────────────────┘
                      │
┌─────────────────────────────────────────────┐
│         Frontend — React + Vite             │
│     Tailwind CSS · Shadcn/ui components     │
└─────────────────────────────────────────────┘
                      │
┌─────────────────────────────────────────────┐
│      Azure Static Web Apps (Hosting)        │
│   Deploy automático · HTTPS · CDN global    │
└─────────────────────────────────────────────┘
          │                │              │
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│    Azure     │  │   Azure AD   │  │    Azure     │
│  Functions   │  │     B2C      │  │  Cosmos DB   │
│  (API REST)  │  │    (Auth)    │  │  (Storage)   │
│   Node.js    │  │  JWT tokens  │  │    NoSQL     │
└──────────────┘  └──────────────┘  └──────────────┘
                      │
┌─────────────────────────────────────────────┐
│       DevOps — GitHub + GitHub Actions      │
│    CI/CD automático · build · test · deploy │
└─────────────────────────────────────────────┘
```

### Tecnologías y justificación

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend framework** | React 18 + Vite | Estándar de mercado. Las IAs lo conocen a la perfección. Vite arranca en segundos. |
| **Design system** | Tailwind CSS + Shadcn/ui | Design tokens desde el día 1. Componentes listos (botones, formularios, tablas). |
| **Gráficos** | Recharts | Biblioteca React-native para charts. Simple y bien documentada. |
| **Backend** | Azure Functions (Node.js) | Serverless: no gestionas servidores. Deploy trivial. JavaScript compartido con frontend. |
| **Autenticación** | Azure AD B2C | Gratuito hasta 50.000 usuarios/mes. Login con email, Google o Microsoft incluido. |
| **Base de datos** | Azure Cosmos DB | NoSQL serverless. Tier gratuito para aprender. SDK de Node.js muy simple. |
| **Hosting** | Azure Static Web Apps | Git push → app en internet en 2 minutos. HTTPS incluido. |
| **CI/CD** | GitHub + GitHub Actions | Pipeline automático. El estándar de la industria. |
| **API de precios** | Alpha Vantage (free tier) | 25 calls/día gratuitas. Suficiente para actualización diaria. |
| **Control de versiones** | Git + GitHub | Obligatorio. Fundamento de todo lo demás. |

### Herramientas de desarrollo
- **Editor:** VS Code con extensiones: ESLint, Prettier, GitLens, Azure Functions, Tailwind IntelliSense
- **Terminal:** iTerm2 o terminal integrado de VS Code
- **Runtime:** Node.js 20 LTS
- **Package manager:** npm
- **Claude Code:** Copiloto de desarrollo — revisar código, completar implementaciones, debuggear

---

## 4. Plan de aprendizaje — 20 semanas

**Ritmo:** 4-6 horas/semana  
**Duración:** ~5 meses  
**Metodología:** Cada módulo termina con algo funcionando y, desde M4, desplegado en internet.

---

### M1 — Fundamentos y entorno (semanas 1-2)
**Objetivo:** Tener el entorno de desarrollo 100% listo y dominar el workflow básico de Git.

**Qué instalar y configurar:**
- Node.js 20 LTS + npm
- VS Code + extensiones clave
- Git + cuenta GitHub
- Azure CLI
- Azure Functions Core Tools

**Qué aprender:**
- Comandos Git esenciales: `init`, `add`, `commit`, `push`, `pull`, `branch`, `merge`
- Estructura de un proyecto Node.js (package.json, node_modules, scripts)
- Terminal básica en macOS

**Entregable:** Repositorio en GitHub con un archivo README. Push desde tu Mac. Pipeline de trabajo establecido.

**Recursos:**
- [Git - la guía sencilla](https://rogerdudler.github.io/git-guide/index.es.html)
- [Node.js - primeros pasos](https://nodejs.org/es/learn/getting-started/introduction-to-nodejs)

---

### M2 — Design System & UI estática (semanas 3-5)
**Objetivo:** Construir las pantallas de WealthLens en HTML/React estático. Sin lógica, sin datos reales.

**Qué construyes:**
- Layout base con sidebar de navegación
- Pantalla Dashboard con cards de resumen y placeholders de gráficos
- Pantalla Portfolio financiero con tabla de posiciones (datos hardcoded)
- Pantalla Inmuebles con cards de cada propiedad
- Formulario de alta de posición

**Conceptos clave:**
- JSX: HTML dentro de JavaScript
- Componentes funcionales de React
- Props: pasar datos entre componentes
- Tailwind CSS: utility classes, responsive design, dark mode
- Shadcn/ui: instalar y usar componentes preconstruidos

**Entregable:** App estática funcionando en `localhost:5173`. Todas las pantallas navegables.

**Recursos:**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [React - Tutorial oficial](https://es.react.dev/learn)

---

### M3 — React funcional y estado (semanas 6-8)
**Objetivo:** La app cobra vida. Los datos se gestionan en memoria con estado real de React.

**Qué construyes:**
- CRUD completo en memoria: añadir, editar y borrar posiciones del portfolio
- CRUD de inmuebles
- Cálculos automáticos: rentabilidad, totales, distribución porcentual
- Gráficos con Recharts: distribución por tipo de activo, evolución de patrimonio
- Routing entre pantallas con React Router

**Conceptos clave:**
- `useState`: estado local de un componente
- `useEffect`: efectos secundarios y ciclo de vida
- `useContext`: estado global compartido entre componentes
- React Router: navegación entre páginas
- Recharts: componentes de gráficos

**Entregable:** App completamente funcional en local. Puedes añadir posiciones, ver el dashboard actualizado, navegar entre secciones. Todo en memoria (se pierde al recargar — eso lo arreglamos en M7).

---

### M4 — Tu primer deploy (semana 9)
**Objetivo:** La app está en internet, con HTTPS, accesible desde cualquier dispositivo.

**Qué configuras:**
- Azure Static Web Apps (tier gratuito)
- GitHub Actions: workflow automático de build y deploy
- Variables de entorno

**Conceptos clave:**
- CI/CD: qué pasa entre `git push` y "app en internet"
- Build de producción: cómo Vite empaqueta tu app en archivos estáticos
- Variables de entorno: separar configuración del código
- YAML: sintaxis básica para pipelines

**Entregable:** URL pública de WealthLens. Cada vez que hagas `git push`, la app se actualiza automáticamente en ~2 minutos.

---

### M5 — Backend / API REST (semanas 10-13)
**Objetivo:** Crear los endpoints de la API que el frontend consumirá.

**Qué construyes:**
- Azure Functions project con Node.js
- Endpoints REST para portfolio: `GET /positions`, `POST /positions`, `PUT /positions/{id}`, `DELETE /positions/{id}`
- Endpoints para inmuebles: mismo patrón CRUD
- Endpoint para precios: llamada a Alpha Vantage API
- Job de actualización de precios (Timer Trigger diario)

**Conceptos clave:**
- HTTP: verbos (GET, POST, PUT, DELETE), códigos de estado, headers
- REST: convenciones de diseño de APIs
- JSON: formato de intercambio de datos
- Azure Functions: estructura, triggers, bindings
- `fetch` en Node.js: llamadas a APIs externas
- CORS: por qué el browser bloquea peticiones cross-origin y cómo resolverlo

**Entregable:** API funcionando en Azure. Puedes hacer llamadas con Postman o Thunder Client y ver respuestas reales (aún con datos en memoria).

---

### M6 — Autenticación (semanas 14-16)
**Objetivo:** Login real. Solo tú puedes acceder a tu cartera.

**Qué configuras:**
- Azure AD B2C tenant y user flow
- Registro e inicio de sesión con email
- Integración en el frontend: MSAL.js (Microsoft Authentication Library)
- Protección de la API: validación de JWT tokens en Azure Functions

**Conceptos clave:**
- OAuth 2.0 y OpenID Connect: el flujo de autenticación moderno
- JWT (JSON Web Token): qué es, qué contiene, cómo se valida
- Flujo de autenticación: redirect, callback, token storage
- Rutas protegidas en React: redirigir al login si no estás autenticado
- Middleware de autenticación en el backend

**Entregable:** La app requiere login. Sin autenticación, no se puede acceder. El token del usuario viaja en cada petición a la API.

---

### M7 — Base de datos (semanas 17-18)
**Objetivo:** Los datos persisten. Tu cartera se guarda aunque cierres el navegador.

**Qué configuras:**
- Azure Cosmos DB (serverless tier)
- SDK de Node.js para Cosmos DB
- Conexión desde Azure Functions
- Asociar datos al usuario autenticado (cada usuario ve solo sus datos)

**Conceptos clave:**
- NoSQL vs SQL: cuándo usar cada uno
- Cosmos DB: containers, items, partition keys
- CRUD con SDK: `create`, `read`, `upsert`, `delete`
- Seguridad: nunca exponer credenciales de DB en el frontend
- Índices: por qué afectan al rendimiento de las consultas

**Entregable:** Los datos del portfolio y los inmuebles se guardan en la nube. Cierras el navegador, vuelves, y todo está ahí.

---

### M8 — Integración final (semanas 19-20)
**Objetivo:** App completa, pulida, funcionando de extremo a extremo.

**Qué completas:**
- Módulo de exportación: CSV y JSON de toda la cartera
- Prompt preformateado para análisis con Claude
- Actualización automática de precios (Alpha Vantage, una vez al día)
- Polish de UI: estados de carga, manejo de errores, mensajes vacíos
- Testing manual end-to-end
- Review de arquitectura: qué harías diferente, qué aprendiste

**Conceptos clave:**
- UX de estados: loading, error, empty, success
- Error handling: try/catch en async/await
- Optimización básica: caché de precios, lazy loading
- Reflexión arquitectónica: trade-offs del stack elegido

**Entregable final:** WealthLens v1 completa y desplegada. Tu cartera real gestionada por una app que construiste tú de principio a fin.

---

## 5. Metodología de aprendizaje con Claude Code

**La dinámica correcta — en este orden:**

1. **Entiende el concepto** (10-15 min): Lee la documentación oficial o un artículo. Forma una imagen mental de qué hace y por qué.
2. **Intenta implementarlo tú** (20-30 min): Aunque salga mal o incompleto. El intento activa el aprendizaje.
3. **Usa Claude Code como par** (tiempo variable): "Revisa esto", "qué está fallando aquí", "completa esta función". Lee lo que genera antes de continuar.
4. **Explícatelo a ti mismo** (5 min): Si puedes explicar en voz alta qué hace el código, lo has entendido. Si no puedes, vuelve al paso 1.

**Cómo NO usar Claude Code:**
- No pedir "escríbeme toda la pantalla de portfolio" desde cero sin haber intentado nada
- No copiar código sin leerlo
- No avanzar al siguiente módulo si no entiendes lo que hiciste en el actual

**Prompts útiles para Claude Code:**
- "Revisa este componente React y dime qué está mal"
- "Explícame línea a línea qué hace esta función"
- "¿Cuál es la forma idiomática de hacer X en React?"
- "Refactoriza esto para que sea más limpio, y explícame cada cambio"

---

## 6. Modelo de datos (referencia)

### Position (activo financiero)
```json
{
  "id": "uuid",
  "userId": "string",
  "ticker": "AAPL",
  "name": "Apple Inc.",
  "type": "stock | etf | fund | crypto",
  "broker": "Interactive Brokers",
  "quantity": 10,
  "avgBuyPrice": 150.00,
  "currency": "USD",
  "currentPrice": 175.00,
  "lastPriceUpdate": "2026-04-25T00:00:00Z",
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### Property (inmueble)
```json
{
  "id": "uuid",
  "userId": "string",
  "name": "Piso Madrid - Calle Mayor",
  "location": "Madrid, España",
  "purchasePrice": 250000,
  "currentValue": 310000,
  "mortgage": {
    "outstanding": 180000,
    "monthlyPayment": 850,
    "interestRate": 2.5
  },
  "income": {
    "monthlyRent": 1200
  },
  "expenses": {
    "ibi": 600,
    "community": 1200,
    "insurance": 300,
    "maintenance": 500
  },
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### Cálculos clave (inmuebles)
- **Equity:** `currentValue - mortgage.outstanding`
- **Ingresos anuales:** `income.monthlyRent × 12`
- **Gastos anuales:** `ibi + community + insurance + maintenance + (mortgage.monthlyPayment × 12)`
- **Rentabilidad bruta:** `(ingresos anuales / currentValue) × 100`
- **Rentabilidad neta:** `((ingresos - gastos sin hipoteca) / currentValue) × 100`

---

## 7. Costes estimados (Azure)

| Servicio | Tier | Coste estimado |
|---------|------|---------------|
| Azure Static Web Apps | Free | 0 €/mes |
| Azure AD B2C | Free (hasta 50k usuarios) | 0 €/mes |
| Azure Cosmos DB | Serverless (uso mínimo) | < 1 €/mes |
| Azure Functions | Consumption (uso mínimo) | < 1 €/mes |
| **Total** | | **< 5 €/mes** |

Alpha Vantage: plan gratuito (25 calls/día). Suficiente para uso personal.

---

## 8. Repositorio GitHub — estructura inicial

```
wealthlens/
├── frontend/                  # React app
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Pantallas principales
│   │   ├── hooks/             # Custom hooks
│   │   ├── context/           # Estado global
│   │   ├── services/          # Llamadas a la API
│   │   └── utils/             # Funciones de cálculo
│   ├── public/
│   └── package.json
├── backend/                   # Azure Functions
│   ├── positions/             # Función CRUD posiciones
│   ├── properties/            # Función CRUD inmuebles
│   ├── prices/                # Función actualización precios
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml         # Pipeline CI/CD
└── README.md
```

---

## 9. Hitos y checkpoints

| Hito | Semana | Descripción |
|------|--------|-------------|
| 🟢 Entorno listo | 2 | Node, VS Code, Git, GitHub. Primer commit. |
| 🟢 UI estática | 5 | Todas las pantallas de WealthLens navegables en local. |
| 🟢 App dinámica | 8 | CRUD completo en memoria. Gráficos funcionando. |
| 🚀 **Primera URL pública** | 9 | WealthLens en internet. Comparte el link. |
| 🟢 API funcionando | 13 | Endpoints REST probados con Postman. |
| 🔐 Login real | 16 | Solo tú puedes entrar. JWT validado. |
| 💾 Datos persistentes | 18 | La cartera sobrevive al cierre del navegador. |
| 🏁 **WealthLens v1** | 20 | App completa con precios automáticos y exportación. |

---

## 10. Próximo paso inmediato

**M1, Día 1 — Instalar el entorno en tu MacBook:**

```bash
# 1. Instalar Homebrew (si no lo tienes)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Instalar Node.js 20 LTS
brew install node@20

# 3. Verificar instalación
node --version   # debe mostrar v20.x.x
npm --version    # debe mostrar 10.x.x

# 4. Instalar Git (ya debería estar en macOS)
git --version

# 5. Configurar Git con tu identidad
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

Cuando tengas esto listo, dime y arrancamos con la creación del repositorio en GitHub y la estructura inicial del proyecto.

---

*Documento generado en abril 2026 · WealthLens Learning Plan v1.0*
