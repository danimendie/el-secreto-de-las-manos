# Rediseño El Secreto de las Manos — Diseño

**Fecha:** 2026-06-07
**Repo:** github.com/danimendie/el-secreto-de-las-manos · dominio `www.secretodelasmanos.lat` (GitHub Pages)
**Stack:** HTML/CSS/JS vanilla (estático, sin build)

---

## 1. Problema

El sitio actual no convierte con tráfico pagado de Meta. La gente que llega desde el ad
rebota antes de entender la propuesta.

**Causa raíz (no es la audiencia, es la fricción):** el visitante de un ad llega frío,
distraído, en mobile, con ~3 segundos de paciencia. El sitio actual le exige esfuerzo
para entender qué es, qué gana y qué tiene que hacer:

- Hero poético y abstracto (*"Algo en vos ya sabe la respuesta"*) que no comunica la oferta.
- Fondo casi negro (`#020008`), grano y glows: clima cargado.
- 11 secciones y un quiz de 5 pasos como camino principal hacia la acción.
- El CTA real (WhatsApp) queda lejos y diluido entre varios caminos.

Principio rector del rediseño: **Don't Make Me Think.** Menos, más obvio, un solo camino.

## 2. Objetivo

**Una sola conversión: que el visitante escriba por WhatsApp.**

Métrica de éxito cualitativa: en los primeros 3 segundos en mobile, la persona entiende
*qué es* (lectura de Tarot), *qué gana* (claridad sobre lo que está atravesando, sobre todo
en el amor) y *qué hacer* (tocar el botón verde de WhatsApp).

## 3. Decisiones clave

| Tema | Decisión |
|------|----------|
| Camino principal | WhatsApp directo. Quiz y mazo de tarot se conservan como anzuelo **opcional**, nunca bloquean. |
| Longitud | Landing corta: 8 bloques (antes 11 secciones). |
| Lectura estrella | **Tarot** primero. Manos pasa a secundario (la marca se llama "de las Manos", pero el producto que vende es Tarot). |
| Ángulo emocional | **Amor / pareja** es el dolor principal, pero **no exclusivo**. Hero general → bloque de temas con amor al frente. |
| Clima visual | "Editorial Luminoso": claro, aireado, premium. |
| Stack | Se mantiene vanilla estático. Framework descartado (overkill, peor carga, sin beneficio). |

## 4. Identidad visual — "Editorial Luminoso"

Tokens nuevos (reemplazan la paleta oscura en `css/base.css`):

```
--bg-base:    #FBF9F5;  /* casi blanco, hueso */
--bg-tint:    #F7F1EA;  /* secciones alternas */
--bg-strip:   #F3EDE3;  /* tira de confianza */
--ink:        #241F2B;  /* texto principal */
--ink-soft:   #5C5564;  /* texto secundario */
--ink-faint:  #9B94A3;  /* microcopy */
--plum:       #7A3B6B;  /* tinta de marca (acento principal) */
--plum-deep:  #5E2C53;  /* hover / contraste */
--gold:       #B8923D;  /* acento secundario, eyebrows */
--wa-green:   #25D366;  /* CTA WhatsApp */
--line:       #EEE4D8;  /* divisores */
```

- **Tipografías:** se conservan las families ya cargadas — serif (Playfair Display /
  Cormorant Garamond) para títulos, Inter para UI. Cambia el color, no la familia.
- Se eliminan/atenúan: `noise-overlay`, glows intensos, partículas. Si se conserva alguna
  textura, debe ser sutil sobre fondo claro.
- Contraste y accesibilidad: texto `--ink` sobre `--bg-base` cumple AA. Verde WhatsApp con
  texto blanco para el CTA.

## 5. Estructura (orden del scroll, mobile-first)

1. **Hero (general)** — eyebrow "Lectura de Tarot · WhatsApp" · título *"Las cartas tienen
   algo para decirte"* · subtítulo *"Una lectura de Tarot personal sobre lo que hoy te tiene
   en duda. A tu ritmo, por WhatsApp."* · botón verde WhatsApp · microcopy "Sin videollamada
   · Sin compromiso".
2. **Tira de confianza** — 847+ lecturas · 96% recomienda · 4 años de práctica.
3. **¿Con qué te puede ayudar?** — tarjeta destacada grande **Amor y pareja**
   (*"Lo que más nos consultan"*, *"¿Te quiere? ¿Vuelve? ¿Avanza?"*) + grilla 2×2 de temas
   secundarios: Trabajo y dinero · Una decisión · Familia · Tu momento personal. Cierre con
   CTA suave a WhatsApp.
4. **Cómo funciona** — 3 pasos: *Nos contás tu duda → Hacemos tu lectura → La recibís por
   WhatsApp (audio o texto)*.
5. **Las lecturas** — bloque Tarot primero, con el **mazo interactivo** (`deck.js`) como
   anzuelo lúdico; bloque Manos después (más breve, con el explorador de mano `hand-explorer.js`).
   Cada bloque con su botón WhatsApp.
6. **Test opcional** — tarjeta discreta: *"¿No sabés cuál elegir? Hacé el test de 30s"*.
   Lanza el quiz existente (`quiz.js`). No bloquea ni precede a nada.
7. **Testimonios** — 2-3 frases + carrusel de capturas reales de WhatsApp (imágenes ya en `img/`).
8. **FAQ + CTA final** — acordeón de 3-4 preguntas que reducen objeciones + bloque de cierre
   con botón WhatsApp grande.

Persistentes: **barra verde fija de WhatsApp** en mobile (siempre visible) y botón flotante
en desktop.

## 6. Componentes a conservar / adaptar / eliminar

**Conservar (adaptando estilos a la paleta clara):**
- `js/quiz.js` + `data/quiz-copy.js` — quiz de diagnóstico (ahora opcional, lanzado desde bloque 6).
- `js/deck.js` — mazo de tarot interactivo + modal.
- `js/hand-explorer.js` — explorador de mano (bloque Manos secundario).
- `js/countdown.js` — solo si se mantiene la oferta/regalo con countdown (a confirmar; por
  defecto se **omite** del nuevo flujo para no agregar fricción).
- `js/main.js` — header, menú mobile, trigger de WhatsApp (`js-wa-trigger` / `data-wa-service`).
- `js/animations.js` — reveals al scroll (suavizados).
- Imágenes de testimonios en `img/`.

**Reescribir:**
- `index.html` — recorte a los 8 bloques, copy nuevo, orden Tarot-first.
- `css/base.css` — tokens nuevos (paleta clara).
- `css/sections.css`, `css/components.css`, `css/layout.css` — adaptar a fondo claro,
  recortar lo que ya no se usa.
- `css/result.css`, `css/quiz.css` — reestilar para el quiz opcional sobre paleta clara.

**Eliminar / atenuar:**
- Portal ritual full-screen (`#portal`) como pantalla de entrada → reemplazado por hero directo.
- Loader ritual entre quiz y resultado → simplificar o quitar.
- `noise-overlay`, glows intensos, partículas.
- Bloque "diferencial" extenso → su mensaje se condensa en el hero/temas.

## 7. CTA de WhatsApp

- Mecanismo existente: botones con clase `js-wa-trigger` y atributo `data-wa-service`
  (`default` / `tarot` / `manos`). Se mantiene.
- **Número de WhatsApp:** `595992158077` (Paraguay).
- Link `https://wa.me/595992158077?text=<mensaje-encodeado>`.
- Mensajes pre-escritos por servicio:
  - `default`: "Hola, vi la web y quiero una lectura ✨"
  - `tarot`: "Hola, quiero una lectura de Tarot 🔮"
  - `manos`: "Hola, quiero una lectura de Manos ✋"

## 7b. Precio y oferta (ancla de conversión)

- Precio vigente: **80.000 Gs** (guaraníes) para Tarot y para Manos.
- Precio "original": **120.000 Gs**, mostrado tachado como ancla de descuento permanente
  ("siempre en oferta").
- Presentación: `<s>120.000 Gs</s> 80.000 Gs` con etiqueta tipo "Oferta" / "−33%".
- Dónde aparece: en cada bloque de lectura (Tarot y Manos) cerca de su CTA, y opcionalmente
  un recordatorio sutil en el CTA final. No en el hero (el hero se mantiene limpio).

## 8. Fuera de alcance (YAGNI)

- No se agrega framework ni build system.
- No se agrega backend, pagos online ni reservas con calendario (la reserva es por WhatsApp).
- No se rediseña el logo ni la identidad de marca más allá de la paleta/colores.
- El regalo con countdown queda fuera por defecto (re-evaluable luego).

## 9. Criterios de aceptación

- [ ] En mobile, el hero comunica qué/qué gano/qué hago sin scrollear, con CTA WhatsApp visible.
- [ ] Existe un camino a WhatsApp a ≤1 toque desde cualquier punto del scroll (barra fija).
- [ ] Paleta clara aplicada de forma consistente; sin fondo oscuro residual.
- [ ] El quiz y el mazo funcionan pero son opcionales (no bloquean la conversión).
- [ ] Tarot aparece antes que Manos; el amor lidera el bloque de temas sin excluir los demás.
- [ ] La página carga sin build, sirve en GitHub Pages, y mantiene el dominio del CNAME.
- [ ] Accesibilidad básica: contraste AA en texto, foco visible, navegación por teclado en
      acordeón/menú/modal.
