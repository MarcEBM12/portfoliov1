# Portfolio · Marcelo Barradas

Sitio bilingüe (EN/ES) con API propia: proyectos en Postgres, bot con Claude y formulario de contacto.

```
portfolio/
├── index.html        # sitio (GitHub Pages / Cloudflare Pages lo detectan en la raíz)
├── README.md
├── web/              # JavaScript del front-end (projects.js carga los proyectos desde la API)
└── api/              # Cloudflare Worker
    ├── src/index.js  # GET /projects · POST /chat · POST /contact
    ├── db/           # schema.sql y seed.sql (Neon)
    ├── wrangler.toml
    └── package.json
```

| Pieza | Uso |
|---|---|
| Cloudflare Pages | Aloja `index.html` y `web/` |
| Cloudflare Workers | API (`api/`) |
| Neon (Postgres) | Tabla `projects` |
| Upstash Redis | Límite de uso del bot y del formulario |
| Resend | Correo del formulario de contacto |
| Anthropic API | Bot para reclutadores |

## 1. Base de datos (Neon)
1. Crea un proyecto en Neon y copia la connection string.
2. En el SQL Editor ejecuta `api/db/schema.sql` y luego `api/db/seed.sql`.

## 2. API en local
```bash
cd api
cp .dev.vars.example .dev.vars   # rellena los valores
npm install
npx wrangler dev                 # http://localhost:8787
```
En otra terminal, desde la raíz: `python3 -m http.server 8080`. En `index.html` pon `window.API_BASE="http://localhost:8787"`.

## 3. Desplegar la API
```bash
cd api
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put UPSTASH_REDIS_REST_URL
npx wrangler secret put UPSTASH_REDIS_REST_TOKEN
npx wrangler secret put DATABASE_URL
npx wrangler deploy              # imprime https://portfolio-api.<tu-cuenta>.workers.dev
```

## 4. Desplegar el sitio (Cloudflare Pages)
Dashboard → Workers & Pages → Create → Pages → Connect to Git → elige el repo.
Framework preset: None · Build command: vacío · Build output directory: `/`.
Después pon la URL del Worker en `window.API_BASE` (`index.html`), añade tu dominio `*.pages.dev` a `ALLOWED_ORIGIN` y haz push.

## Hoja de ruta
- [ ] CRUD de proyectos (POST/PUT/DELETE `/admin/projects`) protegido con Clerk
- [ ] Caché de `/projects` en Upstash y filtro `?category=`
- [ ] Historial de preguntas del bot (`chat_log`) con aviso de privacidad
- [ ] Logs y panel en Grafana Cloud
- [ ] CI con GitHub Actions
