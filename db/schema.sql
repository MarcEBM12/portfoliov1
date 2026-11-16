CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  category    TEXT NOT NULL,
  year        INT,
  title_en    TEXT NOT NULL,
  title_es    TEXT NOT NULL,
  summary_en  TEXT NOT NULL,
  summary_es  TEXT NOT NULL,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  repo_url    TEXT,
  demo_url    TEXT,
  featured    BOOLEAN NOT NULL DEFAULT false,
  published   BOOLEAN NOT NULL DEFAULT true,
  sort_order  INT NOT NULL DEFAULT 100,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS projects_order_idx ON projects (published, featured DESC, sort_order);

-- Fase 2 (historial del bot): descomenta cuando lo implementes, sin IP ni datos personales.
-- CREATE TABLE IF NOT EXISTS chat_log (
--   id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--   session TEXT, lang TEXT, question TEXT, answer TEXT
-- );
