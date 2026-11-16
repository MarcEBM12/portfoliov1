// Carga los proyectos desde la API (Neon). Si algo falla, se conservan las tarjetas estáticas del HTML.
(async function () {
  const base = window.API_BASE, box = document.getElementById("pj");
  if (!base || !box) return;

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  };
  const bi = (tag, en, es) => {          // texto en inglés + español pequeño debajo
    const e = el(tag, "", en);
    const s = el("i", "es", es);
    s.lang = "es";
    e.appendChild(s);
    return e;
  };
  const link = (url, en, es) => {
    if (!/^https:\/\//.test(url || "")) return null;
    const a = bi("a", en, es);
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    return a;
  };
  const card = (p) => {
    const c = el("article", "card");
    c.append(bi("h3", p.title_en, p.title_es), bi("p", p.summary_en, p.summary_es));
    const tags = el("div", "tags");
    [p.category, p.year, ...(p.tags || [])].filter(Boolean).forEach((t) => tags.appendChild(el("span", "", String(t))));
    c.appendChild(tags);
    [link(p.repo_url, "Code", "Código"), link(p.demo_url, "Demo", "Demo")].filter(Boolean).forEach((a) => c.appendChild(a));
    return c;
  };

  try {
    const r = await fetch(base + "/projects");
    if (!r.ok) return;
    const { projects } = await r.json();
    if (projects && projects.length) box.replaceChildren(...projects.map(card));
  } catch (e) { /* sin API: contenido estático */ }
})();
