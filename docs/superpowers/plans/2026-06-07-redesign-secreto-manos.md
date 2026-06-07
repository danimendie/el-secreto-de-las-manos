# Rediseño El Secreto de las Manos — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir el sitio actual (oscuro, 11 secciones, quiz como camino obligado) en una landing corta, clara y luminosa cuyo único objetivo es que el visitante escriba por WhatsApp.

**Architecture:** Sitio estático vanilla (HTML/CSS/JS), sin build, servido por GitHub Pages con dominio `www.secretodelasmanos.lat`. Se reescriben `index.html` y los tokens de `css/base.css`; se crea un `css/landing.css` nuevo para los 8 bloques; se conservan y reestilan los módulos JS interactivos (`quiz.js`, `deck.js`, `hand-explorer.js`, `main.js`, `animations.js`). Tarot-first, amor al frente sin excluir otros temas.

**Tech Stack:** HTML5, CSS3 (custom properties), JavaScript ES6 vanilla, Phosphor Icons, Google Fonts (Playfair Display / Cormorant Garamond / Inter), `wa.me` deep links.

**Spec de referencia:** `docs/superpowers/specs/2026-06-07-redesign-secreto-manos-design.md`

---

## Nota sobre verificación

Este proyecto NO tiene framework de tests ni test runner. La verificación de cada tarea es
**visual y manual** sirviendo el sitio localmente y mirándolo en el navegador (mobile-first
con DevTools en ancho ~390px). Comando único de preview para todas las tareas:

```bash
cd web-actual && python3 -m http.server 8080
# abrir http://localhost:8080  (DevTools → device toolbar → iPhone)
```

Dejá el server corriendo durante toda la implementación. Cada tarea termina con un commit
en la rama `redesign/landing-tarot`.

---

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `index.html` | Reescribir | 8 bloques nuevos, orden Tarot-first, copy nuevo |
| `css/base.css` | Modificar (`:root` + globals) | Tokens de la paleta clara, reset, tipografías |
| `css/landing.css` | Crear | Estilos de los 8 bloques nuevos + hero + sticky |
| `css/components.css` | Modificar | Botones, badges, glass → versión clara |
| `css/quiz.css` | Modificar | Quiz opcional sobre fondo claro |
| `css/result.css` | Modificar | Pantalla de resultado del quiz, fondo claro |
| `css/sections.css` | Eliminar del `<link>` | Reemplazado por `landing.css` |
| `css/layout.css` | Modificar | Container/header/footer claros |
| `js/main.js` | Modificar | Mensajes WA standalone, quitar portal CTA/loader/ads-autoquiz, sticky bar |
| `js/quiz.js` | Conservar | Lógica del quiz (lanzado desde bloque opcional) |
| `js/deck.js` | Conservar | Mazo de tarot + modal |
| `js/hand-explorer.js` | Conservar | Explorador de mano (bloque Manos) |
| `js/animations.js` | Conservar | Reveals al scroll, contadores |
| `js/countdown.js` | Eliminar del `<link>` | Regalo/countdown fuera de alcance |
| `js/result.js` | Modificar | Quitar lógica de regalo/countdown |

---

## Task 1: Tokens de la paleta clara

**Files:**
- Modify: `css/base.css:11-138` (bloque `:root`)

- [ ] **Step 1: Reemplazar el bloque `:root` de colores por la paleta clara**

Reemplazá las secciones de color (fondos, púrpuras, violetas, dorado, blancos) dentro de
`:root` por estos tokens. Conservá tipografías, escalas, espaciados, radios, transiciones y
z-index tal cual están.

```css
:root {
  /* ── Fondos (claro) ── */
  --bg-base:    #FBF9F5;   /* hueso, fondo principal */
  --bg-tint:    #F7F1EA;   /* secciones alternas */
  --bg-strip:   #F3EDE3;   /* tira de confianza */
  --bg-card:    #FFFFFF;   /* tarjetas */
  --bg-overlay: rgba(36, 31, 43, 0.55); /* overlays de modal */

  /* ── Tinta de marca (ciruela) ── */
  --plum:       #7A3B6B;
  --plum-deep:  #5E2C53;
  --plum-soft:  rgba(122, 59, 107, 0.10);

  /* ── Dorado (acento secundario) ── */
  --gold:       #B8923D;
  --gold-soft:  rgba(184, 146, 61, 0.12);

  /* ── WhatsApp ── */
  --wa-green:   #25D366;
  --wa-green-d: #1da851;

  /* ── Texto ── */
  --ink:        #241F2B;
  --ink-soft:   #5C5564;
  --ink-faint:  #9B94A3;

  /* ── Líneas / bordes ── */
  --line:       #EEE4D8;
  --line-soft:  rgba(36, 31, 43, 0.08);

  /* ── Tipografías (sin cambios) ── */
  --font-ritual:  'Cormorant Garamond', Georgia, serif;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-ui:      'Inter', -apple-system, sans-serif;
```

Mantené desde `--text-xs` en adelante exactamente como estaba. Ajustá `--shadow-*` a sombras
suaves para fondo claro:

```css
  --shadow-sm:  0 1px 4px rgba(36,31,43,0.06);
  --shadow-md:  0 6px 18px rgba(36,31,43,0.08);
  --shadow-lg:  0 14px 40px rgba(36,31,43,0.10);
  --shadow-glow-plum: 0 8px 24px rgba(122,59,107,0.25);
  --shadow-wa:  0 8px 24px rgba(37,211,102,0.33);
```

- [ ] **Step 2: Aplicar fondo y color base al `body`**

En `css/base.css`, en la regla `body`, agregá/asegurá:

```css
body {
  background-color: var(--bg-base);
  color: var(--ink);
  font-family: var(--font-ui);
  /* conservar el resto de propiedades existentes */
}
```

Y actualizá el `<meta name="theme-color">` en `index.html` (línea ~7) a `#FBF9F5`.

- [ ] **Step 3: Verificar**

Abrí http://localhost:8080. El fondo debe verse hueso claro y el texto oscuro. Es normal que
las secciones se vean rotas (todavía usan estilos oscuros): solo confirmá que el fondo global
es claro y no hay texto blanco invisible sobre claro.

- [ ] **Step 4: Commit**

```bash
git add css/base.css index.html
git commit -m "feat: paleta clara Editorial Luminoso en tokens base"
```

---

## Task 2: Config de WhatsApp (mensajes standalone)

**Files:**
- Modify: `js/main.js:15-34` (CONFIG)

- [ ] **Step 1: Reemplazar MESSAGES por versiones sin "diagnóstico"**

El quiz ya no es el camino principal, así que los mensajes no deben asumir que la persona lo
completó. Reemplazá `CONFIG.MESSAGES`:

```js
  MESSAGES: {
    tarot:   'Hola, quiero una lectura de Tarot 🔮',
    manos:   'Hola, quiero una lectura de Manos ✋',
    default: 'Hola, vi la web y quiero una lectura ✨',
  },
```

Confirmá que `WHATSAPP_NUMBER` sea `'595992158077'` (ya lo está).

- [ ] **Step 2: Verificar**

En el navegador, tocá cualquier botón con `js-wa-trigger` existente. Debe abrir
`wa.me/595992158077` con un mensaje sin la frase "completé el diagnóstico".

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: mensajes de WhatsApp standalone (quiz opcional)"
```

---

## Task 3: Esqueleto de index.html + links de assets

**Files:**
- Modify: `index.html` (head links + estructura completa del `<body>`)

- [ ] **Step 1: Ajustar los `<link>`/`<script>` del head y quitar lo descartado**

En `<head>`: quitá el `<link>` a `css/sections.css` y agregá `css/landing.css` después de
`components.css`. Mantené `base.css`, `layout.css`, `components.css`, `quiz.css`, `result.css`.

En el cierre del `<body>`: quitá `<script src="js/countdown.js">`. Mantené `main.js`,
`quiz-copy.js`, `quiz.js`, `result-copy.js`, `result.js`, `animations.js`, `deck.js`,
`hand-explorer.js`.

- [ ] **Step 2: Reemplazar el `<body>` por el esqueleto de 8 bloques**

Dejá `noise-overlay` FUERA (se elimina). Reemplazá header + main + footer por esta estructura
contenedora (cada bloque se completa en su tarea; por ahora dejá los `<!-- TODO bloque N -->`
como anclas vacías para no romper el render):

```html
<body>
  <header id="site-header" class="site-header" role="banner">
    <!-- bloque header (Task 4) -->
  </header>

  <main id="main" role="main">
    <!-- bloque 1: hero (Task 4) -->
    <!-- bloque 2: tira de confianza (Task 5) -->
    <!-- bloque 3: temas (Task 6) -->
    <!-- bloque 4: cómo funciona (Task 7) -->
    <!-- bloque 5: lecturas (Task 8) -->
    <!-- bloque 6: test opcional (Task 9) -->
    <!-- bloque 7: testimonios (Task 10) -->
    <!-- bloque 8: faq + cta final (Task 11) -->
  </main>

  <footer class="site-footer" role="contentinfo">
    <!-- footer (Task 12) -->
  </footer>

  <!-- sticky WA bar mobile + floating desktop (Task 12) -->
  <!-- modal tarot (lo provee deck.js / queda como en el actual, Task 8) -->
</body>
```

- [ ] **Step 3: Crear `css/landing.css` vacío con cabecera**

```css
/* ============================================================
   landing.css — El Secreto de las Manos (rediseño claro)
   Estilos de los 8 bloques de la landing. Usa tokens de base.css
   ============================================================ */
```

- [ ] **Step 4: Verificar**

La página carga sin errores 404 en consola (Network tab). Se ve casi vacía: es lo esperado.

- [ ] **Step 5: Commit**

```bash
git add index.html css/landing.css
git commit -m "feat: esqueleto de 8 bloques y links de assets"
```

---

## Task 4: Header + Bloque 1 (Hero)

**Files:**
- Modify: `index.html` (header + hero), `css/landing.css`, `css/layout.css` (header claro)

- [ ] **Step 1: HTML del header (simplificado)**

Nav corta acorde a la nueva estructura. CTA de header = WhatsApp.

```html
<header id="site-header" class="site-header" role="banner">
  <div class="container header-container">
    <a href="#hero" class="header-logo" aria-label="El Secreto de las Manos — inicio">
      <span class="logo-text">El Secreto de las Manos</span>
    </a>
    <nav class="main-nav" aria-label="Navegación principal">
      <ul class="nav-list" role="list">
        <li><a href="#lecturas" class="nav-link">Lecturas</a></li>
        <li><a href="#como-funciona" class="nav-link">Cómo funciona</a></li>
        <li><a href="#testimonios" class="nav-link">Testimonios</a></li>
        <li><a href="#faq" class="nav-link">FAQ</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      <button class="btn btn-wa btn-sm js-wa-trigger" data-wa-service="default">Escribir</button>
    </div>
    <button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú">
      <span class="menu-line"></span><span class="menu-line"></span><span class="menu-line"></span>
    </button>
  </div>
  <div id="mobile-menu" class="mobile-menu" aria-hidden="true" role="dialog" aria-label="Menú">
    <nav class="mobile-nav" aria-label="Navegación móvil">
      <a href="#lecturas" class="mobile-nav-link">Lecturas</a>
      <a href="#como-funciona" class="mobile-nav-link">Cómo funciona</a>
      <a href="#testimonios" class="mobile-nav-link">Testimonios</a>
      <a href="#faq" class="mobile-nav-link">FAQ</a>
    </nav>
    <div class="mobile-menu-footer">
      <button class="btn btn-wa btn-full js-wa-trigger" data-wa-service="default">Escribir por WhatsApp</button>
    </div>
  </div>
</header>
```

- [ ] **Step 2: HTML del hero (general)**

```html
<section id="hero" class="hero" aria-label="Inicio">
  <div class="container hero-inner">
    <span class="eyebrow hero-eyebrow">Lectura de Tarot · por WhatsApp</span>
    <h1 class="hero-title">Las cartas tienen<br>algo para decirte</h1>
    <p class="hero-subtitle">Una lectura de Tarot personal sobre lo que hoy te tiene en duda. A tu ritmo, por WhatsApp.</p>
    <button class="btn btn-wa btn-lg js-wa-trigger" data-wa-service="default">
      <i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i> Escribir por WhatsApp
    </button>
    <p class="hero-microcopy">Sin videollamada · Sin compromiso</p>
  </div>
</section>
```

- [ ] **Step 3: Botón WhatsApp + header claro + hero en `css/landing.css`**

```css
/* Botón WhatsApp (CTA primario) */
.btn-wa {
  background: var(--wa-green);
  color: #fff;
  border: none;
  border-radius: var(--r-full);
  font-family: var(--font-ui);
  font-weight: var(--fw-semibold);
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  cursor: pointer;
  box-shadow: var(--shadow-wa);
  transition: transform var(--t-fast) var(--ease-out), background var(--t-fast);
}
.btn-wa:hover { background: var(--wa-green-d); transform: translateY(-1px); }
.btn-wa.btn-sm { padding: 9px 18px; font-size: var(--text-sm); }
.btn-wa.btn-lg { padding: 16px 32px; font-size: var(--text-md); }
.btn-wa.btn-full { width: 100%; justify-content: center; }

/* Header claro */
.site-header {
  position: fixed; inset: 0 0 auto 0; z-index: var(--z-header);
  background: transparent; transition: background var(--t-base), box-shadow var(--t-base), transform var(--t-base);
}
.site-header.is-scrolled {
  background: rgba(251,249,245,0.85); backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}
.site-header.is-hidden { transform: translateY(-100%); }
.header-container { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; }
.logo-text { font-family: var(--font-display); color: var(--ink); font-size: var(--text-md); }
.nav-link { color: var(--ink-soft); text-decoration: none; font-size: var(--text-sm); }
.nav-link:hover { color: var(--plum); }

/* Hero */
.hero {
  min-height: 92vh; display: flex; align-items: center; justify-content: center;
  text-align: center; background: var(--bg-base);
  padding: 100px 0 60px;
}
.hero-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; max-width: 560px; }
.eyebrow { font-family: var(--font-ui); font-size: var(--text-xs); letter-spacing: var(--ls-wider); text-transform: uppercase; font-weight: var(--fw-semibold); }
.hero-eyebrow { color: var(--plum); }
.hero-title { font-family: var(--font-display); font-weight: 600; color: var(--ink); font-size: clamp(34px, 9vw, var(--text-4xl)); line-height: var(--lh-tight); }
.hero-subtitle { font-size: var(--text-md); color: var(--ink-soft); line-height: var(--lh-relaxed); max-width: 28ch; }
.hero-microcopy { font-size: var(--text-xs); color: var(--ink-faint); }
```

(Conservá las reglas existentes de `.menu-toggle`, `.menu-line`, `.mobile-menu` que ya estén en
`components.css`/`layout.css`; si usan colores oscuros hardcodeados, cambialos a `var(--ink)`.)

- [ ] **Step 4: Verificar**

En mobile (~390px) el hero llena la pantalla: eyebrow ciruela, título serif, subtítulo, botón
verde de WhatsApp visible sin scrollear, microcopy abajo. El botón abre WhatsApp con el mensaje
`default`. Header transparente arriba, se vuelve claro con blur al scrollear.

- [ ] **Step 5: Commit**

```bash
git add index.html css/landing.css css/layout.css css/components.css
git commit -m "feat: header claro y hero general Tarot-first"
```

---

## Task 5: Bloque 2 (Tira de confianza)

**Files:**
- Modify: `index.html` (después del hero), `css/landing.css`

- [ ] **Step 1: HTML**

```html
<section class="trust-strip" aria-label="En números">
  <div class="container trust-row">
    <div class="trust-item"><span class="trust-num" data-counter="847">0</span><span class="trust-suffix">+</span><span class="trust-label">lecturas</span></div>
    <span class="trust-div" aria-hidden="true"></span>
    <div class="trust-item"><span class="trust-num" data-counter="96">0</span><span class="trust-suffix">%</span><span class="trust-label">recomienda</span></div>
    <span class="trust-div" aria-hidden="true"></span>
    <div class="trust-item"><span class="trust-num" data-counter="4">0</span><span class="trust-suffix"> años</span><span class="trust-label">de práctica</span></div>
  </div>
</section>
```

> Nota: `data-counter` ya es consumido por `animations.js` (usa `window.animateCounter`).
> No hace falta JS nuevo.

- [ ] **Step 2: CSS en `css/landing.css`**

```css
.trust-strip { background: var(--bg-strip); border-block: 1px solid var(--line); }
.trust-row { display: flex; align-items: center; justify-content: center; gap: 18px; padding: 16px 0; flex-wrap: wrap; }
.trust-item { display: flex; flex-direction: column; align-items: center; line-height: 1.1; }
.trust-num, .trust-suffix { font-family: var(--font-display); color: var(--ink); font-size: var(--text-lg); }
.trust-label { font-size: var(--text-xs); color: var(--ink-soft); margin-top: 2px; }
.trust-div { width: 1px; height: 28px; background: var(--line); }
```

- [ ] **Step 3: Verificar**

Bajo el hero aparece una tira clara con los 3 números. Al entrar en viewport, los números
animan de 0 a su valor (847+, 96%, 4 años).

- [ ] **Step 4: Commit**

```bash
git add index.html css/landing.css
git commit -m "feat: tira de confianza con contadores"
```

---

## Task 6: Bloque 3 (Temas — amor al frente)

**Files:**
- Modify: `index.html`, `css/landing.css`

- [ ] **Step 1: HTML**

```html
<section id="temas" class="section temas" aria-label="Con qué te puede ayudar">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="eyebrow gold">¿Con qué te puede ayudar?</span>
    </div>
    <div class="tema-featured" data-reveal>
      <span class="tema-tag">Lo que más nos consultan ❤</span>
      <h3 class="tema-featured-title">Amor y pareja</h3>
      <p class="tema-featured-desc">¿Te quiere? ¿Vuelve? ¿Avanza esta relación? Claridad sobre tu vínculo y lo que sentís.</p>
      <button class="btn btn-wa btn-sm js-wa-trigger" data-wa-service="tarot">Consultar por el amor</button>
    </div>
    <div class="tema-grid" data-reveal>
      <div class="tema-card"><h4>Trabajo y dinero</h4><p>Decisiones y rumbo</p></div>
      <div class="tema-card"><h4>Una decisión</h4><p>Cuando no sabés qué hacer</p></div>
      <div class="tema-card"><h4>Familia</h4><p>Vínculos y conflictos</p></div>
      <div class="tema-card"><h4>Tu momento</h4><p>Claridad personal</p></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
.section { padding: var(--sp-16) 0; }
.section-header { text-align: center; margin-bottom: var(--sp-8); }
.eyebrow.gold { color: var(--gold); }

.tema-featured {
  background: var(--plum); color: #fff; border-radius: var(--r-xl);
  padding: var(--sp-8) var(--sp-6); text-align: center; max-width: 520px; margin: 0 auto var(--sp-4);
  box-shadow: var(--shadow-glow-plum);
}
.tema-tag { font-size: var(--text-xs); letter-spacing: var(--ls-wide); text-transform: uppercase; color: #e7c9df; font-weight: var(--fw-semibold); }
.tema-featured-title { font-family: var(--font-display); font-size: var(--text-2xl); margin: 8px 0; }
.tema-featured-desc { color: #f0dcea; font-size: var(--text-base); margin-bottom: var(--sp-5); line-height: var(--lh-relaxed); }
.tema-featured .btn-wa { background: #fff; color: var(--plum-deep); box-shadow: none; }
.tema-featured .btn-wa:hover { background: #f3e9f0; }

.tema-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); max-width: 520px; margin: 0 auto; }
.tema-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-base); padding: var(--sp-4); text-align: center; }
.tema-card h4 { font-family: var(--font-ui); font-weight: var(--fw-semibold); color: var(--ink); font-size: var(--text-base); }
.tema-card p { color: var(--ink-faint); font-size: var(--text-sm); margin-top: 2px; }
```

- [ ] **Step 3: Verificar**

Tarjeta ciruela grande "Amor y pareja" destacada con su botón (abre WA con mensaje `tarot`),
y debajo grilla 2×2 blanca con los otros 4 temas. Reveal al scroll funciona.

- [ ] **Step 4: Commit**

```bash
git add index.html css/landing.css
git commit -m "feat: bloque de temas con amor destacado"
```

---

## Task 7: Bloque 4 (Cómo funciona)

**Files:**
- Modify: `index.html`, `css/landing.css`

- [ ] **Step 1: HTML**

```html
<section id="como-funciona" class="section section-tint proceso" aria-label="Cómo funciona">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="eyebrow gold">Cómo funciona</span>
      <h2 class="section-title">Simple, personal, a tu ritmo</h2>
    </div>
    <div class="proceso-steps" data-reveal>
      <div class="proceso-step"><span class="proceso-num">1</span><h3>Nos contás tu duda</h3><p>Por WhatsApp, lo que estás atravesando: amor, una decisión, lo que sea.</p></div>
      <div class="proceso-step"><span class="proceso-num">2</span><h3>Hacemos tu lectura</h3><p>Una lectura de Tarot personal, pensada para tu situación.</p></div>
      <div class="proceso-step"><span class="proceso-num">3</span><h3>La recibís por WhatsApp</h3><p>En audio o texto. La escuchás o leés cuando quieras, las veces que quieras.</p></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
.section-tint { background: var(--bg-tint); }
.section-title { font-family: var(--font-display); color: var(--ink); font-size: var(--text-2xl); margin-top: 6px; }
.proceso-steps { display: grid; gap: var(--sp-6); max-width: 760px; margin: 0 auto; }
@media (min-width: 720px) { .proceso-steps { grid-template-columns: repeat(3,1fr); } }
.proceso-step { text-align: center; }
.proceso-num { font-family: var(--font-display); color: var(--plum); font-size: var(--text-3xl); display: block; }
.proceso-step h3 { font-family: var(--font-ui); font-weight: var(--fw-semibold); color: var(--ink); font-size: var(--text-md); margin: 6px 0; }
.proceso-step p { color: var(--ink-soft); font-size: var(--text-sm); line-height: var(--lh-relaxed); }
```

- [ ] **Step 3: Verificar**

3 pasos en columna (mobile) / fila (desktop ≥720px), número ciruela grande, fondo tinte.

- [ ] **Step 4: Commit**

```bash
git add index.html css/landing.css
git commit -m "feat: bloque cómo funciona (3 pasos)"
```

---

## Task 8: Bloque 5 (Las lecturas — Tarot+mazo, luego Manos, con precio)

**Files:**
- Modify: `index.html`, `css/landing.css`, `css/components.css` (modal claro)

- [ ] **Step 1: Componente de precio (snippet reutilizable)**

Se usa en ambas lecturas. Marcado:

```html
<div class="price">
  <span class="price-old">120.000 Gs</span>
  <span class="price-now">80.000 Gs</span>
  <span class="price-badge">Oferta</span>
</div>
```

CSS:

```css
.price { display: inline-flex; align-items: baseline; gap: 8px; margin: var(--sp-3) 0; }
.price-old { color: var(--ink-faint); text-decoration: line-through; font-size: var(--text-base); }
.price-now { color: var(--ink); font-family: var(--font-display); font-size: var(--text-xl); }
.price-badge { background: var(--gold-soft); color: var(--gold); font-size: var(--text-xs); font-weight: var(--fw-semibold); padding: 3px 8px; border-radius: var(--r-full); text-transform: uppercase; letter-spacing: var(--ls-wide); }
```

- [ ] **Step 2: HTML del bloque lecturas (Tarot primero con el mazo)**

Reutiliza el marcado interactivo del mazo (`#deck-stage`, `#tarot-reshuffle`) que ya consume
`deck.js`, y del explorador de mano que consume `hand-explorer.js`. Estructura:

```html
<section id="lecturas" class="section lecturas" aria-label="Las lecturas">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="eyebrow gold">Las lecturas</span>
      <h2 class="section-title">Tarot, y también Manos</h2>
    </div>

    <!-- TAROT (estrella) -->
    <div class="reading-block" data-reveal>
      <div class="reading-visual">
        <div class="tarot-deck-wrapper" id="tarot-deck-visual">
          <p class="tarot-hint">— Elegí una carta y descubrí qué energía quiere hablarte hoy —</p>
          <div class="deck-stage" id="deck-stage"></div>
          <div class="tarot-bottom">
            <button class="btn btn-outline btn-sm" id="tarot-reshuffle"><i class="ph-bold ph-arrows-left-right"></i> Barajar de nuevo</button>
          </div>
        </div>
      </div>
      <div class="reading-text">
        <span class="eyebrow plum">Lectura de Tarot</span>
        <h3 class="reading-title">El espejo de lo que estás viviendo</h3>
        <p class="reading-desc">El Tarot no predice: ilumina. Cada carta refleja una energía de tu situación y te ayuda a ver con claridad lo que desde adentro cuesta nombrar.</p>
        <ul class="check-list"><li>Ideal para el amor, decisiones y encrucijadas</li><li>Claridad sobre vínculos, trabajo o tu momento</li><li>Una perspectiva externa que te devuelve el centro</li></ul>
        <div class="price"><span class="price-old">120.000 Gs</span><span class="price-now">80.000 Gs</span><span class="price-badge">Oferta</span></div>
        <button class="btn btn-wa btn-lg js-wa-trigger" data-wa-service="tarot">Reservar lectura de Tarot</button>
      </div>
    </div>

    <!-- MANOS (secundaria) -->
    <div class="reading-block reading-block-reverse" data-reveal>
      <div class="reading-visual">
        <!-- conservar el SVG + hotspots del explorador de mano del index actual (líneas 728-789) -->
      </div>
      <div class="reading-text">
        <span class="eyebrow plum">Lectura de Manos</span>
        <h3 class="reading-title">El mapa que traés desde siempre</h3>
        <p class="reading-desc">Las líneas de la palma revelan cómo procesás la vida: tus patrones emocionales, tu forma de decidir, tu vínculo con el tiempo.</p>
        <ul class="check-list"><li>Patrones de carácter, emoción y pensamiento</li><li>Cómo te relacionás con el cambio y el amor</li><li>Una lectura sobre quién sos, no solo qué vivís</li></ul>
        <div class="price"><span class="price-old">120.000 Gs</span><span class="price-now">80.000 Gs</span><span class="price-badge">Oferta</span></div>
        <button class="btn btn-wa btn-lg js-wa-trigger" data-wa-service="manos">Reservar lectura de Manos</button>
      </div>
    </div>
  </div>
</section>
```

> Copiá el SVG de la mano y los 3 `.hotspot` desde `index.html` actual (líneas 728-789) dentro
> de `.reading-visual` del bloque Manos, para que `hand-explorer.js` siga funcionando.

- [ ] **Step 3: CSS del bloque lecturas + reestilar mazo/modal a claro**

```css
.reading-block { display: grid; gap: var(--sp-8); align-items: center; margin-bottom: var(--sp-16); }
@media (min-width: 860px) { .reading-block { grid-template-columns: 1fr 1fr; } .reading-block-reverse .reading-visual { order: 2; } }
.eyebrow.plum { color: var(--plum); }
.reading-title { font-family: var(--font-display); color: var(--ink); font-size: var(--text-xl); margin: 6px 0 10px; }
.reading-desc { color: var(--ink-soft); line-height: var(--lh-relaxed); }
.check-list { list-style: none; margin: var(--sp-4) 0; display: grid; gap: 8px; }
.check-list li { position: relative; padding-left: 26px; color: var(--ink-soft); font-size: var(--text-sm); }
.check-list li::before { content: "✓"; position: absolute; left: 0; color: var(--gold); font-weight: 700; }
.tarot-hint { color: var(--ink-faint); font-size: var(--text-sm); text-align: center; margin-bottom: var(--sp-4); }
.btn-outline { background: transparent; border: 1px solid var(--plum); color: var(--plum); border-radius: var(--r-full); padding: 8px 16px; cursor: pointer; }
```

En `css/components.css`: cualquier color oscuro hardcodeado del mazo (`.deck-stage`, cartas) y
del modal (`.tarot-modal-*`) cambialo a tokens claros (`--bg-card`, `--ink`, `--line`,
overlay `--bg-overlay`). El reverso de las cartas puede quedar ciruela (`--plum`).

- [ ] **Step 4: Mantener el modal de tarot al final del `<body>`**

Copiá el bloque `<div class="tarot-modal-overlay" id="tarot-modal">…</div>` del index actual
(líneas 1055-1079) tal cual; `deck.js` lo usa. Actualizá el botón del modal a
`class="btn btn-wa btn-sm"`.

- [ ] **Step 5: Verificar**

Bloque Tarot primero: mazo interactivo (tocar carta abre modal claro), precio con 120k tachado
→ 80k + badge Oferta, botón verde (mensaje `tarot`). Debajo, bloque Manos con explorador de
mano (hotspots con tooltip), precio y botón (mensaje `manos`). En desktop, alternan lados.

- [ ] **Step 6: Commit**

```bash
git add index.html css/landing.css css/components.css
git commit -m "feat: bloque de lecturas Tarot-first con mazo, manos y precio"
```

---

## Task 9: Bloque 6 (Test opcional)

**Files:**
- Modify: `index.html`, `css/landing.css`, `js/main.js`, `js/quiz.js` (verificar `activateQuiz`)

- [ ] **Step 1: HTML del bloque + sección quiz reubicada**

Tarjeta discreta que lanza el quiz:

```html
<section class="section test-opcional" aria-label="Test opcional">
  <div class="container">
    <div class="test-card" data-reveal>
      <p class="test-q">¿No sabés cuál elegir?</p>
      <p class="test-sub">Hacé el test de 30 segundos y te decimos qué lectura va con vos.</p>
      <button class="btn btn-outline btn-lg" id="open-quiz">Hacer el test</button>
      <p class="test-note">Opcional · No necesitás registrarte</p>
    </div>
  </div>
</section>
```

Mantené la `<section id="quiz" class="section-quiz" hidden>` y la `<section id="loader" hidden>`
y `<section id="section-result" hidden>` del index actual (las usa `quiz.js`/`result.js`).
Colocalas justo después de este bloque. Quitá del result HTML el `#result-gift` completo
(regalo/countdown fuera de alcance).

- [ ] **Step 2: Disparar el quiz desde el botón**

En `js/main.js`, dentro de la init (reemplazando `setupPortalCTA`), agregá:

```js
function setupQuizTrigger() {
  const btn = document.getElementById('open-quiz');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (typeof window.activateQuiz === 'function') window.activateQuiz();
  });
}
```

Y en `DOMContentLoaded` reemplazá `setupPortalCTA();` por `setupQuizTrigger();`. Quitá la
auto-activación del quiz en `detectAdsMode` (el bloque `setTimeout(... activateQuiz ...)`):
en el rediseño los ads caen al hero, no al quiz.

- [ ] **Step 3: CSS**

```css
.test-card { border: 1px dashed var(--gold); border-radius: var(--r-lg); padding: var(--sp-8); text-align: center; max-width: 480px; margin: 0 auto; background: var(--bg-card); }
.test-q { font-family: var(--font-display); color: var(--ink); font-size: var(--text-lg); }
.test-sub { color: var(--ink-soft); font-size: var(--text-sm); margin: 6px 0 var(--sp-4); }
.test-note { color: var(--ink-faint); font-size: var(--text-xs); margin-top: 10px; }
```

- [ ] **Step 4: Reestilar quiz/loader/result a claro**

En `css/quiz.css` y `css/result.css`: reemplazá fondos oscuros y glows por `--bg-base`/
`--bg-tint`, textos a `--ink`/`--ink-soft`, acentos a `--plum`/`--gold`. El quiz debe leerse
sobre fondo claro. Quitá reglas de `#result-gift`, `.gift-*`, countdown.

- [ ] **Step 5: Verificar**

El botón "Hacer el test" abre el quiz (5 preguntas) sobre fondo claro. Al terminar muestra el
resultado claro, con su CTA a WhatsApp, SIN bloque de regalo ni countdown. El resto de la
landing sigue accesible (el quiz no es obligatorio).

- [ ] **Step 6: Commit**

```bash
git add index.html css/landing.css css/quiz.css css/result.css js/main.js
git commit -m "feat: test opcional que lanza el quiz, sin regalo/countdown"
```

---

## Task 10: Bloque 7 (Testimonios)

**Files:**
- Modify: `index.html`, `css/landing.css`

- [ ] **Step 1: HTML (reusa imágenes en `img/`)**

```html
<section id="testimonios" class="section section-tint testimonios" aria-label="Testimonios">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="eyebrow gold">Lo que dicen</span>
      <h2 class="section-title">Claridad real, momentos reales</h2>
    </div>
    <div class="testi-quotes" data-reveal>
      <blockquote class="testi-quote"><p>"Llegué sin saber qué preguntar y con una sola lectura entendí por qué seguía atada a esa relación."</p><cite>Valentina R. · Tarot</cite></blockquote>
      <blockquote class="testi-quote"><p>"Me dio una claridad sobre mi pareja que no esperaba. Muy preciso y muy gentil."</p><cite>Lucía M. · Tarot</cite></blockquote>
    </div>
    <div class="testi-shots" data-reveal>
      <p class="testi-shots-label">Lo que nos escriben después de cada lectura</p>
      <div class="testi-track" role="list">
        <div class="testi-shot" role="listitem"><img src="img/testimonio-01.jpg" alt="Testimonio de clienta" loading="lazy"></div>
        <div class="testi-shot" role="listitem"><img src="img/testimonio-02.jpg" alt="Testimonio de clienta" loading="lazy"></div>
        <div class="testi-shot" role="listitem"><img src="img/testimonio-03.jpg" alt="Testimonio de clienta" loading="lazy"></div>
        <div class="testi-shot" role="listitem"><img src="img/testimonio-04.jpg" alt="Testimonio de cliente" loading="lazy"></div>
        <div class="testi-shot" role="listitem"><img src="img/testimonio-05.jpg" alt="Testimonio de clienta" loading="lazy"></div>
        <div class="testi-shot" role="listitem"><img src="img/testimonio-06.jpg" alt="Testimonio de clienta" loading="lazy"></div>
        <div class="testi-shot" role="listitem"><img src="img/testimonio-07.jpg" alt="Testimonio de clienta" loading="lazy"></div>
        <div class="testi-shot" role="listitem"><img src="img/testimonio-08.jpg" alt="Testimonio de clienta" loading="lazy"></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
.testi-quotes { display: grid; gap: var(--sp-4); max-width: 720px; margin: 0 auto var(--sp-10); }
@media (min-width: 720px) { .testi-quotes { grid-template-columns: 1fr 1fr; } }
.testi-quote { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-lg); padding: var(--sp-6); }
.testi-quote p { font-family: var(--font-ritual); font-style: italic; color: var(--ink); font-size: var(--text-md); line-height: var(--lh-relaxed); }
.testi-quote cite { display: block; margin-top: var(--sp-3); font-style: normal; color: var(--plum); font-size: var(--text-sm); }
.testi-shots-label { text-align: center; color: var(--ink-soft); font-size: var(--text-sm); margin-bottom: var(--sp-4); }
.testi-track { display: flex; gap: var(--sp-3); overflow-x: auto; padding-bottom: var(--sp-3); scroll-snap-type: x mandatory; }
.testi-shot { flex: 0 0 auto; width: 150px; scroll-snap-align: start; }
.testi-shot img { border-radius: var(--r-base); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
```

- [ ] **Step 3: Verificar**

2 testimonios en tarjetas claras + carrusel horizontal de capturas (scroll táctil con snap).

- [ ] **Step 4: Commit**

```bash
git add index.html css/landing.css
git commit -m "feat: bloque de testimonios con capturas"
```

---

## Task 11: Bloque 8 (FAQ + CTA final)

**Files:**
- Modify: `index.html`, `css/landing.css`, `js/main.js` (acordeón)

- [ ] **Step 1: HTML FAQ (4 preguntas) + CTA final**

```html
<section id="faq" class="section faq" aria-label="Preguntas frecuentes">
  <div class="container container-md">
    <div class="section-header" data-reveal><span class="eyebrow gold">Dudas</span><h2 class="section-title">Lo que suelen preguntar</h2></div>
    <div class="faq-accordion" data-reveal>
      <div class="faq-item"><button class="faq-q" aria-expanded="false"><span>¿Necesito creer en el Tarot para que funcione?</span><span class="faq-ico" aria-hidden="true">+</span></button><div class="faq-a"><div class="faq-a-inner"><p>No. Trabaja con simbolismo e interpretación, no con fe. Muchas llegan con escepticismo y se van con algo útil.</p></div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false"><span>¿Cómo es a distancia?</span><span class="faq-ico" aria-hidden="true">+</span></button><div class="faq-a"><div class="faq-a-inner"><p>Todo por WhatsApp. Nos contás tu situación y recibís tu lectura en audio o texto. Sin videollamadas.</p></div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false"><span>¿Cuánto tarda en llegar?</span><span class="faq-ico" aria-hidden="true">+</span></button><div class="faq-a"><div class="faq-a-inner"><p>En general entre 24 y 48 horas desde la confirmación. Si hay urgencia lo coordinamos.</p></div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false"><span>¿Cuánto cuesta?</span><span class="faq-ico" aria-hidden="true">+</span></button><div class="faq-a"><div class="faq-a-inner"><p>Cada lectura está en oferta a 80.000 Gs (precio normal 120.000 Gs). Coordinamos el pago por WhatsApp.</p></div></div></div>
    </div>
  </div>
</section>

<section class="section cta-final" aria-label="Reservar">
  <div class="container container-sm">
    <div class="cta-final-inner" data-reveal>
      <h2 class="cta-final-title">Tu lectura te está esperando</h2>
      <p class="cta-final-sub">Escribinos y en un mensaje coordinamos todo. Sin compromiso.</p>
      <div class="price"><span class="price-old">120.000 Gs</span><span class="price-now">80.000 Gs</span><span class="price-badge">Oferta</span></div>
      <button class="btn btn-wa btn-lg js-wa-trigger" data-wa-service="default"><i class="ph-fill ph-whatsapp-logo"></i> Escribir por WhatsApp</button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
.faq-item { border-bottom: 1px solid var(--line); }
.faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; background: none; border: none; cursor: pointer; padding: var(--sp-4) 0; text-align: left; color: var(--ink); font-size: var(--text-base); font-family: var(--font-ui); }
.faq-ico { color: var(--gold); font-size: var(--text-lg); transition: transform var(--t-fast); }
.faq-q[aria-expanded="true"] .faq-ico { transform: rotate(45deg); }
.faq-a { overflow: hidden; max-height: 0; transition: max-height var(--t-base) var(--ease-out); }
.faq-a-inner { padding: 0 0 var(--sp-4); color: var(--ink-soft); font-size: var(--text-sm); line-height: var(--lh-relaxed); }
.cta-final { text-align: center; background: var(--bg-tint); }
.cta-final-inner { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.cta-final-title { font-family: var(--font-display); color: var(--ink); font-size: var(--text-2xl); }
.cta-final-sub { color: var(--ink-soft); }
```

- [ ] **Step 3: JS del acordeón en `js/main.js`**

Agregá y registrá en init:

```js
function setupFaq() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const open = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!open));
      const panel = q.nextElementSibling;
      panel.style.maxHeight = open ? '0' : panel.scrollHeight + 'px';
    });
  });
}
```

Llamá `setupFaq();` dentro de `DOMContentLoaded`.

- [ ] **Step 4: Verificar**

Acordeón abre/cierra suave (ícono + rota a ×). La 4ª pregunta menciona el precio. CTA final
con precio ancla y botón verde (mensaje `default`).

- [ ] **Step 5: Commit**

```bash
git add index.html css/landing.css js/main.js
git commit -m "feat: FAQ acordeón y CTA final con precio"
```

---

## Task 12: Footer + Sticky WhatsApp (mobile) + flotante (desktop)

**Files:**
- Modify: `index.html`, `css/landing.css`, `js/main.js`

- [ ] **Step 1: HTML footer + sticky + flotante**

```html
<footer class="site-footer" role="contentinfo">
  <div class="container footer-grid">
    <div class="footer-brand">
      <span class="footer-logo">El Secreto de las Manos</span>
      <p class="footer-tagline">Lecturas espirituales personales. Tarot y lectura de palma.</p>
      <button class="btn btn-wa btn-sm js-wa-trigger" data-wa-service="default">Escribir por WhatsApp</button>
    </div>
    <nav class="footer-links" aria-label="Lecturas"><span class="footer-nav-title">Lecturas</span><ul role="list"><li><button class="footer-link js-wa-trigger" data-wa-service="tarot">Tarot</button></li><li><button class="footer-link js-wa-trigger" data-wa-service="manos">Manos</button></li></ul></nav>
    <nav class="footer-links" aria-label="Info"><span class="footer-nav-title">Info</span><ul role="list"><li><a href="#como-funciona" class="footer-link">Cómo funciona</a></li><li><a href="#faq" class="footer-link">Preguntas</a></li></ul></nav>
  </div>
  <div class="footer-bottom container">
    <p>© 2026 El Secreto de las Manos · Todos los derechos reservados.</p>
    <p class="footer-disclaimer">Las lecturas son de orientación personal y no reemplazan atención profesional de salud mental.</p>
  </div>
</footer>

<button class="floating-wa js-wa-trigger" data-wa-service="default" aria-label="WhatsApp"><i class="ph-fill ph-whatsapp-logo"></i></button>

<div class="sticky-wa" id="sticky-wa" aria-hidden="true">
  <button class="btn btn-wa btn-full js-wa-trigger" data-wa-service="default">Escribir por WhatsApp</button>
</div>
```

- [ ] **Step 2: CSS**

```css
.site-footer { background: var(--ink); color: rgba(255,255,255,0.85); padding: var(--sp-16) 0 var(--sp-10); }
.footer-grid { display: grid; gap: var(--sp-8); }
@media (min-width: 720px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr; } }
.footer-logo { font-family: var(--font-display); color: #fff; font-size: var(--text-md); }
.footer-tagline { color: rgba(255,255,255,0.6); font-size: var(--text-sm); margin: 8px 0 var(--sp-4); }
.footer-nav-title { color: var(--gold); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--ls-wide); }
.footer-links ul { list-style: none; margin-top: 10px; display: grid; gap: 8px; }
.footer-link { background: none; border: none; color: rgba(255,255,255,0.75); cursor: pointer; font-size: var(--text-sm); text-decoration: none; padding: 0; }
.footer-link:hover { color: #fff; }
.footer-bottom { margin-top: var(--sp-10); padding-top: var(--sp-6); border-top: 1px solid rgba(255,255,255,0.12); font-size: var(--text-xs); color: rgba(255,255,255,0.45); display: grid; gap: 6px; }

.floating-wa { position: fixed; right: 18px; bottom: 18px; width: 56px; height: 56px; border-radius: 50%; background: var(--wa-green); color: #fff; border: none; font-size: 28px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-wa); cursor: pointer; z-index: var(--z-overlay); }
@media (max-width: 719px) { .floating-wa { display: none; } }

.sticky-wa { position: fixed; left: 0; right: 0; bottom: 0; padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); background: rgba(251,249,245,0.95); backdrop-filter: blur(8px); border-top: 1px solid var(--line); z-index: var(--z-overlay); transform: translateY(120%); transition: transform var(--t-base) var(--ease-out); }
.sticky-wa.is-visible { transform: translateY(0); }
@media (min-width: 720px) { .sticky-wa { display: none; } }
```

- [ ] **Step 3: JS para mostrar la sticky bar al scrollear (mobile)**

En `js/main.js` agregá y registrá:

```js
function setupStickyWa() {
  const bar = document.getElementById('sticky-wa');
  if (!bar) return;
  const onScroll = () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.classList.toggle('is-visible', pct > CONFIG.STICKY_FOOTER_THRESHOLD);
    bar.setAttribute('aria-hidden', pct > CONFIG.STICKY_FOOTER_THRESHOLD ? 'false' : 'true');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
```

Llamá `setupStickyWa();` en `DOMContentLoaded`.

- [ ] **Step 4: Verificar**

Footer oscuro (contraste con la página clara) con links que abren WhatsApp. En mobile, al
pasar ~40% de scroll aparece la barra verde fija abajo; en desktop, botón flotante redondo.

- [ ] **Step 5: Commit**

```bash
git add index.html css/landing.css js/main.js
git commit -m "feat: footer, sticky WhatsApp mobile y botón flotante desktop"
```

---

## Task 13: Limpieza (quitar lo oscuro/no usado)

**Files:**
- Modify: `js/main.js`, `js/result.js`; Delete: `css/sections.css`, `js/countdown.js`

- [ ] **Step 1: Quitar funciones muertas de main.js**

Eliminá `setupPortalCTA` (si quedó) y la auto-activación de quiz en `detectAdsMode`. Dejá
`detectAdsMode` solo marcando `data-mode="ads"` (sin auto-quiz). Verificá que `DOMContentLoaded`
llame: `setupHeader, setupMobileMenu, setupWhatsAppTriggers, setupQuizTrigger, setupFaq,
setupStickyWa, detectAdsMode`.

- [ ] **Step 2: Quitar lógica de regalo/countdown de result.js**

En `js/result.js`, eliminá todo lo que toque `#result-gift`, `gift*`, `giftActive` y countdown
(p.ej. líneas alrededor de 256). El resultado debe poblar header, párrafos, checklist y el CTA
principal, sin regalo.

- [ ] **Step 3: Borrar archivos no usados**

```bash
git rm css/sections.css js/countdown.js
```

Confirmá que ningún `<link>`/`<script>` los referencie (ya quitados en Task 3).

- [ ] **Step 4: Verificar**

Recargá con caché desactivada. Consola sin errores 404 ni `undefined function`. El flujo
completo (hero → temas → proceso → lecturas → test → testimonios → faq → cta) se ve claro y
coherente. El quiz opcional funciona de punta a punta sin regalo.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: quitar portal/loader/regalo/countdown y CSS oscuro no usado"
```

---

## Task 14: QA final (accesibilidad, mobile, deploy)

**Files:**
- Modify: según hallazgos

- [ ] **Step 1: Checklist de accesibilidad**

Verificá manualmente: foco visible en botones/links (agregá `:focus-visible { outline: 2px
solid var(--plum); outline-offset: 2px; }` global si falta); navegación por teclado en menú,
acordeón y modal (Escape cierra modal/menú); todos los `<img>` con `alt`; contraste de texto
sobre fondos (ink sobre base = AA).

- [ ] **Step 2: Checklist mobile (DevTools ~390px y ~360px)**

Sin scroll horizontal; hero entra sin cortar el botón; sticky bar no tapa el CTA final (agregá
`padding-bottom` al `body` o margin al último bloque si hace falta); imágenes de testimonios
cargan con lazy.

- [ ] **Step 3: Verificar links de WhatsApp**

Probá los 3 servicios (default/tarot/manos) y confirmá que cada uno abre `wa.me/595992158077`
con su mensaje correcto.

- [ ] **Step 4: Confirmar GitHub Pages**

Verificá que `CNAME` sigue con `www.secretodelasmanos.lat` y que no se rompió ninguna ruta
relativa de assets (`img/`, `css/`, `js/`, `data/`).

- [ ] **Step 5: Commit final + push de la rama**

```bash
git add -A
git commit -m "fix: ajustes finales de accesibilidad y mobile"
git push -u origin redesign/landing-tarot
```

- [ ] **Step 6: Abrir PR**

Crear PR de `redesign/landing-tarot` → `main` describiendo el rediseño. (Pedir confirmación
al usuario antes de mergear a `main`, ya que `main` es lo que publica GitHub Pages.)

---

## Self-Review (cobertura del spec)

- §2 Objetivo WhatsApp → Tasks 2,4,6,8,11,12 (CTAs + sticky). ✓
- §3 Landing corta / quiz opcional / Tarot-first / amor al frente → Tasks 3,6,8,9. ✓
- §4 Paleta Editorial Luminoso → Task 1 (tokens) + cada task usa tokens. ✓
- §5 8 bloques en orden → Tasks 4-12. ✓
- §6 Conservar/reescribir/eliminar → Tasks 8 (deck/hand), 9 (quiz), 13 (limpieza). ✓
- §7 CTA WhatsApp + número + mensajes → Task 2. ✓
- §7b Precio/oferta ancla → Task 8 (componente) + 11 (faq/cta). ✓
- §8 Fuera de alcance (sin framework/backend/countdown) → respetado; countdown removido Task 13. ✓
- §9 Criterios de aceptación → Task 14 QA. ✓
