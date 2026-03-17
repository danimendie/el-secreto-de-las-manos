/**
 * result.js — El Secreto de las Manos v2
 * Lógica de la pantalla de diagnóstico (Fase 3)
 *
 * Responsabilidades:
 * - Observar cuando quiz.js activa el loader (#loader pierde hidden)
 * - Ciclar frases rituales durante el loader (3 mensajes × 1.4s)
 * - Leer quizDiagnosis de sessionStorage
 * - Calcular porcentaje de afinidad
 * - Seleccionar párrafos dinámicos desde window.RESULT_COPY
 * - Poblar el DOM del #section-result
 * - Revelar elementos progresivamente (stagger)
 * - Mostrar bloque regalo con delay + iniciar countdown
 * - Manejar caso de recarga de página (diagnosis en session, loader oculto)
 *
 * Depende de: data/result-copy.js, js/countdown.js
 * Ningún cambio a quiz.js ni a main.js necesario.
 */

'use strict';

/* ─────────────────────────────────────────────────────
   CONSTANTES
   ───────────────────────────────────────────────────── */
const LOADER_PHRASES = [
  'Leyendo tus respuestas…',
  'Interpretando tu energía…',
  'Preparando tu diagnóstico…',
];

const REVEAL_STEPS = [
  { id: 'result-header',      delay: 0   },
  { id: 'result-para-1',      delay: 340 },
  { id: 'result-offer-block', delay: 700 }, // bloque 2x1 unificado (checklist + countdown + CTA)
];
// GIFT_APPEAR_DELAY eliminado — la oferta es inmediata y única


/* ─────────────────────────────────────────────────────
   INICIALIZACIÓN
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const loaderSection = document.getElementById('loader');
  if (!loaderSection) return;

  // ── Flujo normal: quiz acaba de terminar ──
  // MutationObserver detecta cuando quiz.js elimina hidden del loader.
  // NO se desconecta: así funciona correctamente si el usuario rehace el quiz.
  // La bandera _loaderSequenceRunning evita ejecuciones concurrentes.
  let _loaderSequenceRunning = false;

  const observer = new MutationObserver(() => {
    if (!loaderSection.hasAttribute('hidden')) {
      if (!_loaderSequenceRunning) {
        _loaderSequenceRunning = true;
        const diagnosis = getDiagnosis();
        if (diagnosis) startLoaderSequence(diagnosis);
      }
    } else {
      // Loader se ocultó → resetear bandera para el próximo run
      _loaderSequenceRunning = false;
    }
  });
  observer.observe(loaderSection, { attributes: true, attributeFilter: ['hidden'] });

  // ── Flujo de recarga: hay diagnosis en session pero loader está oculto ──
  const diagnosis = getDiagnosis();
  if (diagnosis && loaderSection.hasAttribute('hidden')) {
    const resultSection = document.getElementById('section-result');
    if (resultSection && resultSection.hasAttribute('hidden')) {
      buildResult(diagnosis);
      resultSection.removeAttribute('hidden');
      revealAllImmediate();
      // Retomar countdown si sigue activo
      const stored  = sessionStorage.getItem('giftCountdownStart');
      const active  = sessionStorage.getItem('giftActive');
      const expired = stored
        ? Math.floor((Date.now() - parseInt(stored, 10)) / 1000) >= 20 * 60
        : false;
      if (active === 'true' && !expired) {
        if (typeof window.startCountdown === 'function') window.startCountdown();
      }
    }
  }
});


/* ─────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────── */
function getDiagnosis() {
  try {
    return JSON.parse(sessionStorage.getItem('quizDiagnosis') || 'null');
  } catch {
    return null;
  }
}

/**
 * Calcula el porcentaje de afinidad con el resultado ganador.
 * Total siempre = 10 (cada pregunta da exactamente 2 pts distribuidos).
 * Resultado posible: 50% – 100%.
 */
function getAffinityPct(diagnosis) {
  const total   = (diagnosis.scoreT || 0) + (diagnosis.scoreM || 0);
  if (!total) return 70; // fallback defensivo
  const winning = diagnosis.resultado === 'tarot' ? diagnosis.scoreT : diagnosis.scoreM;
  return Math.round((winning / total) * 100);
}

/**
 * Determina la clave de variante de párrafo basada en P1 + P2.
 * P1 ext = [0,3] (situación concreta / pregunta puntual)
 * P2 recent = [0,2] (algo reciente / evento reciente)
 */
function getVariantKey(diagnosis) {
  const isExt    = [0, 3].includes(diagnosis.p1);
  const isRecent = [0, 2].includes(diagnosis.p2);
  return `${isExt ? 'ext' : 'int'}_${isRecent ? 'recent' : 'deep'}`;
}

/**
 * Determina la clave del tercer párrafo basada en P3.
 * P3 situacion = [0,2] (qué pasa en la situación / qué decisión tomar)
 */
function getP3Key(diagnosis) {
  return [0, 2].includes(diagnosis.p3) ? 'situacion' : 'patron';
}


/* ─────────────────────────────────────────────────────
   SECUENCIA DEL LOADER RITUAL
   Cicla 3 frases cada 1.4s, luego transiciona al resultado
   ───────────────────────────────────────────────────── */
function startLoaderSequence(diagnosis) {
  const phraseEl = document.getElementById('loader-phrase');
  let phraseIndex = 0;

  if (phraseEl) phraseEl.textContent = LOADER_PHRASES[0];

  const cycleInterval = setInterval(() => {
    phraseIndex++;

    if (phraseIndex >= LOADER_PHRASES.length) {
      clearInterval(cycleInterval);
      setTimeout(() => transitionToResult(diagnosis), 500);
      return;
    }

    if (phraseEl) {
      phraseEl.classList.add('is-fading');
      setTimeout(() => {
        if (!phraseEl) return;
        phraseEl.textContent = LOADER_PHRASES[phraseIndex];
        phraseEl.classList.remove('is-fading');
        phraseEl.classList.add('is-appearing');
        setTimeout(() => phraseEl.classList.remove('is-appearing'), 400);
      }, 300);
    }
  }, 1400);
}


/* ─────────────────────────────────────────────────────
   TRANSICIÓN LOADER → RESULTADO
   ───────────────────────────────────────────────────── */
function transitionToResult(diagnosis) {
  const loaderSection = document.getElementById('loader');
  const resultSection = document.getElementById('section-result');

  buildResult(diagnosis);

  if (loaderSection) {
    loaderSection.classList.add('is-exiting');
    setTimeout(() => {
      loaderSection.setAttribute('hidden', '');
      loaderSection.classList.remove('is-exiting');

      if (resultSection) {
        resultSection.removeAttribute('hidden');
        resultSection.classList.add('is-entering');
        void resultSection.offsetWidth; // forzar reflow
        setTimeout(() => {
          resultSection.classList.remove('is-entering');
          revealProgressively(diagnosis);
        }, 60);
      }
    }, 420);
  }
}


/* ─────────────────────────────────────────────────────
   BUILD RESULT
   Pobla todos los elementos del DOM con el copy correcto
   ───────────────────────────────────────────────────── */
function buildResult(diagnosis) {
  const copy = window.RESULT_COPY?.[diagnosis.resultado];
  if (!copy) return;

  const variantKey  = getVariantKey(diagnosis);
  const affinity    = getAffinityPct(diagnosis);
  const paragraphs  = copy.paragraphs[variantKey] || copy.paragraphs.ext_recent;

  // Eyebrow
  const eyebrowEl = document.getElementById('result-eyebrow');
  if (eyebrowEl) eyebrowEl.textContent = copy.eyebrow;

  // Título
  const titleEl = document.getElementById('result-title');
  if (titleEl) titleEl.textContent = copy.title;

  // Badge de afinidad
  const badgeEl = document.getElementById('result-affinity-badge');
  if (badgeEl) badgeEl.textContent = `${affinity}% afinidad`;

  // Párrafo 1 (visible)
  const para1 = document.getElementById('result-para-1');
  if (para1) para1.textContent = paragraphs[0];

  // Gancho del 2x1
  const hookEl = document.getElementById('offer-hook-text');
  if (hookEl) hookEl.textContent = copy.offerHook;

  // Checklist
  const checklistEl = document.getElementById('result-checklist');
  if (checklistEl) {
    checklistEl.innerHTML = copy.checklist
      .map(item => `<li>${item}</li>`)
      .join('');
  }

  // CTA único — apunta al servicio; giftActive=true hará que main.js use el mensaje 2x1
  const ctaEl = document.getElementById('result-cta');
  if (ctaEl) {
    ctaEl.textContent = copy.cta;
    ctaEl.setAttribute('data-wa-service', diagnosis.resultado);
  }

  // Activar oferta regalo desde el inicio (main.js usará el mensaje _gift automáticamente)
  sessionStorage.setItem('giftActive', 'true');

  // Iniciar countdown
  if (typeof window.startCountdown === 'function') {
    window.startCountdown();
  }
}


/* ─────────────────────────────────────────────────────
   REVELACIÓN PROGRESIVA
   Cada bloque aparece con un delay escalonado
   ───────────────────────────────────────────────────── */
function revealProgressively(diagnosis) {
  REVEAL_STEPS.forEach(({ id, delay }) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => el.classList.add('is-revealed'), delay);
  });
}

// Para el caso de recarga: todos los elementos visibles de inmediato
function revealAllImmediate() {
  REVEAL_STEPS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('is-revealed', 'no-animation');
    }
  });
}


/* ─────────────────────────────────────────────────────
   REVELAR RESULTADO GUARDADO
   Llamado desde main.js cuando el usuario quiere volver
   a su resultado sin rehacer el quiz.
   ───────────────────────────────────────────────────── */
window.revealSavedResult = function () {
  const diagnosis = getDiagnosis();
  if (!diagnosis) return;

  const resultSection = document.getElementById('section-result');
  if (!resultSection) return;

  buildResult(diagnosis);
  resultSection.scrollTop = 0;
  resultSection.removeAttribute('hidden');
  resultSection.classList.add('is-entering');
  void resultSection.offsetWidth; // forzar reflow

  setTimeout(() => {
    resultSection.classList.remove('is-entering');
    revealAllImmediate();
  }, 60);
};
