/**
 * result.js — El Secreto de las Manos v2
 * Lógica de la pantalla de diagnóstico
 *
 * Responsabilidades:
 * - Observar cuando quiz.js activa el loader (#loader pierde hidden)
 * - Ciclar frases rituales durante el loader (3 mensajes × 1.4s)
 * - Leer quizDiagnosis de sessionStorage
 * - Calcular porcentaje de afinidad
 * - Seleccionar párrafos dinámicos desde window.RESULT_COPY
 * - Poblar el DOM del #section-result
 * - Revelar elementos progresivamente (stagger)
 *
 * Depende de: data/result-copy.js
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
  { id: 'result-header',            delay: 0    },
  { id: 'result-para-1',            delay: 380  },
  { id: 'result-para-2',            delay: 660  },
  { id: 'result-para-3',            delay: 940  },
  { id: 'result-checklist-wrapper', delay: 1220 },
  { id: 'result-cta-wrapper',       delay: 1600 },
];


/* ─────────────────────────────────────────────────────
   INICIALIZACIÓN
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const loaderSection = document.getElementById('loader');
  if (!loaderSection) return;

  // Flujo normal: quiz acaba de terminar
  const observer = new MutationObserver(() => {
    if (!loaderSection.hasAttribute('hidden')) {
      observer.disconnect();
      const diagnosis = getDiagnosis();
      if (diagnosis) startLoaderSequence(diagnosis);
    }
  });
  observer.observe(loaderSection, { attributes: true, attributeFilter: ['hidden'] });

  // Flujo de recarga: hay diagnosis en session pero loader está oculto
  const diagnosis = getDiagnosis();
  if (diagnosis && loaderSection.hasAttribute('hidden')) {
    const resultSection = document.getElementById('section-result');
    if (resultSection && resultSection.hasAttribute('hidden')) {
      buildResult(diagnosis);
      resultSection.removeAttribute('hidden');
      revealAllImmediate();
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
 */
function getAffinityPct(diagnosis) {
  const total   = (diagnosis.scoreT || 0) + (diagnosis.scoreM || 0);
  if (!total) return 70;
  const winning = diagnosis.resultado === 'tarot' ? diagnosis.scoreT : diagnosis.scoreM;
  return Math.round((winning / total) * 100);
}

/**
 * Determina la clave de variante de párrafo basada en P1 + P2.
 */
function getVariantKey(diagnosis) {
  const isExt    = [0, 3].includes(diagnosis.p1);
  const isRecent = [0, 2].includes(diagnosis.p2);
  return `${isExt ? 'ext' : 'int'}_${isRecent ? 'recent' : 'deep'}`;
}

/**
 * Determina la clave del tercer párrafo basada en P3.
 */
function getP3Key(diagnosis) {
  return [0, 2].includes(diagnosis.p3) ? 'situacion' : 'patron';
}


/* ─────────────────────────────────────────────────────
   SECUENCIA DEL LOADER RITUAL
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
        void resultSection.offsetWidth;
        setTimeout(() => {
          resultSection.classList.remove('is-entering');
          revealProgressively();
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
  const p3Key       = getP3Key(diagnosis);
  const affinity    = getAffinityPct(diagnosis);
  const paragraphs  = copy.paragraphs[variantKey] || copy.paragraphs.ext_recent;
  const p3Sentence  = copy.p3[p3Key];

  const eyebrowEl = document.getElementById('result-eyebrow');
  if (eyebrowEl) eyebrowEl.textContent = copy.eyebrow;

  const titleEl = document.getElementById('result-title');
  if (titleEl) titleEl.textContent = copy.title;

  const badgeEl = document.getElementById('result-affinity-badge');
  if (badgeEl) badgeEl.textContent = `${affinity}% afinidad`;

  const para1 = document.getElementById('result-para-1');
  const para2 = document.getElementById('result-para-2');
  const para3 = document.getElementById('result-para-3');
  if (para1) para1.textContent = paragraphs[0];
  if (para2) para2.textContent = paragraphs[1];
  if (para3) para3.textContent = p3Sentence;

  const checklistEl = document.getElementById('result-checklist');
  if (checklistEl) {
    checklistEl.innerHTML = copy.checklist
      .map(item => `<li>${item}</li>`)
      .join('');
  }

  const ctaEl = document.getElementById('result-cta');
  if (ctaEl) {
    ctaEl.textContent = copy.cta;
    ctaEl.setAttribute('data-wa-service', diagnosis.resultado);
  }
}


/* ─────────────────────────────────────────────────────
   REVELACIÓN PROGRESIVA
   ───────────────────────────────────────────────────── */
function revealProgressively() {
  REVEAL_STEPS.forEach(({ id, delay }) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => el.classList.add('is-revealed'), delay);
  });
}

function revealAllImmediate() {
  REVEAL_STEPS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('is-revealed', 'no-animation');
    }
  });
}
