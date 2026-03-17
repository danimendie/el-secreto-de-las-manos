/**
 * quiz.js — El Secreto de las Manos v2
 * Lógica completa del quiz de diagnóstico (5 preguntas)
 * Fase 2
 *
 * Depende de: data/quiz-copy.js (window.QUIZ_DATA)
 * Expone: window.activateQuiz()
 */

'use strict';

/* ─────────────────────────────────────────────────────
   ESTADO DEL QUIZ
   ───────────────────────────────────────────────────── */
const QUIZ_STATE = {
  currentQuestion: -1,  // -1 = intro
  answers: [],          // { questionId, optionIndex, scoreT, scoreM }[]
  totalT: 0,
  totalM: 0,
  isTransitioning: false,
};


/* ─────────────────────────────────────────────────────
   ACTIVAR QUIZ
   Llamado desde main.js al hacer clic en el portal CTA
   o automáticamente en modo ads.
   ───────────────────────────────────────────────────── */
function activateQuiz() {
  const portal  = document.getElementById('portal');
  const quiz    = document.getElementById('quiz');
  if (!quiz) return;

  const isAds = document.documentElement.getAttribute('data-mode') === 'ads';

  if (portal) {
    if (isAds) {
      // Modo ads: ocultar el portal sin animación — evitar flash
      portal.setAttribute('hidden', '');
    } else {
      portal.classList.add('is-exiting');
    }
  }

  const delay = isAds ? 0 : 480;

  setTimeout(() => {
    if (portal && !isAds) {
      portal.setAttribute('hidden', '');
      portal.classList.remove('is-exiting');
    }

    quiz.removeAttribute('hidden');
    quiz.classList.add('is-entering');

    // Forzar reflow para que la animación arranque limpia
    void quiz.offsetWidth;

    setTimeout(() => {
      quiz.classList.remove('is-entering');
      startQuiz(); // Ir directo a Q1 — intro slide eliminado por ser fricción innecesaria
    }, 60);
  }, delay);
}


/* ─────────────────────────────────────────────────────
   INTRO SLIDE
   ───────────────────────────────────────────────────── */
function showIntro() {
  const intro = document.getElementById('quiz-intro');
  if (!intro) return;

  // Activar el slide de intro
  intro.classList.remove('is-hidden');
  intro.classList.add('is-active');

  // Botón "Comenzar"
  const startBtn = document.getElementById('quiz-start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startQuiz, { once: true });
  }
}


/* ─────────────────────────────────────────────────────
   INICIAR QUIZ (post-intro)
   ───────────────────────────────────────────────────── */
function startQuiz() {
  const intro    = document.getElementById('quiz-intro');
  const progress = document.querySelector('.quiz-progress');

  // Salida del intro
  if (intro) {
    intro.classList.add('is-exiting');
    setTimeout(() => {
      intro.classList.add('is-hidden');
      intro.classList.remove('is-active', 'is-exiting');
    }, 380);
  }

  // Mostrar barra de progreso
  if (progress) {
    setTimeout(() => progress.classList.add('is-visible'), 200);
  }

  // Renderizar primera pregunta
  QUIZ_STATE.currentQuestion = 0;
  setTimeout(() => renderQuestion(0), 320);
}


/* ─────────────────────────────────────────────────────
   RENDERIZAR PREGUNTA
   Crea el slide dinámicamente y lo inyecta en el wrapper
   ───────────────────────────────────────────────────── */
function renderQuestion(index) {
  const data    = window.QUIZ_DATA[index];
  const wrapper = document.getElementById('quiz-questions-wrapper');
  if (!wrapper || !data) return;

  // Actualizar progress bar
  updateProgress(index + 1);

  // Crear elemento del slide
  const slide = document.createElement('div');
  slide.className = 'quiz-slide quiz-question is-entering';
  slide.id = `quiz-q${data.id}`;
  slide.setAttribute('data-question-index', String(index));

  const markers = ['A', 'B', 'C', 'D'];

  slide.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-question-inner">
        <p class="quiz-question-number">Pregunta ${index + 1} <span>/ 5</span></p>
        <h2 class="quiz-question-text">${data.question}</h2>
        <div class="quiz-options" role="list">
          ${data.options.map((opt, i) => `
            <button
              class="quiz-option"
              role="listitem"
              data-question="${index}"
              data-option="${i}"
              aria-label="${opt.text}"
            >
              <span class="option-marker" aria-hidden="true">${markers[i]}</span>
              <span class="option-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  wrapper.appendChild(slide);

  // Doble rAF para que el browser procese is-entering antes de activar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      slide.classList.remove('is-entering');
      slide.classList.add('is-active');
    });
  });

  // Eventos de selección
  slide.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (QUIZ_STATE.isTransitioning) return;
      selectAnswer(index, parseInt(btn.dataset.option, 10));
    });
  });
}


/* ─────────────────────────────────────────────────────
   SELECCIONAR RESPUESTA
   Registra, anima, auto-avanza
   ───────────────────────────────────────────────────── */
function selectAnswer(questionIndex, optionIndex) {
  QUIZ_STATE.isTransitioning = true;

  const data   = window.QUIZ_DATA[questionIndex];
  const option = data.options[optionIndex];
  const slide  = document.getElementById(`quiz-q${data.id}`);

  // Registrar respuesta
  QUIZ_STATE.answers.push({
    questionId: data.id,
    optionIndex,
    scoreT: option.scoreT,
    scoreM: option.scoreM,
  });
  QUIZ_STATE.totalT += option.scoreT;
  QUIZ_STATE.totalM += option.scoreM;

  // Visual: marcar opción seleccionada
  if (slide) {
    const buttons = slide.querySelectorAll('.quiz-option');
    buttons[optionIndex]?.classList.add('is-selected');
  }

  // Completar luna correspondiente
  completeMoon(questionIndex + 1);

  // Esperar feedback visual → avanzar
  setTimeout(() => {
    const nextIndex = questionIndex + 1;

    // Salida del slide actual
    if (slide) {
      slide.classList.add('is-exiting');
      setTimeout(() => slide.remove(), 380);
    }

    if (nextIndex < window.QUIZ_DATA.length) {
      QUIZ_STATE.currentQuestion = nextIndex;
      QUIZ_STATE.isTransitioning = false;
      renderQuestion(nextIndex);
    } else {
      // Quiz terminado
      finishQuiz();
    }
  }, 520);
}


/* ─────────────────────────────────────────────────────
   ACTUALIZAR PROGRESS BAR
   Moons + fill bar + label
   ───────────────────────────────────────────────────── */
function updateProgress(step) {
  const fill  = document.getElementById('quiz-progress-fill');
  const label = document.getElementById('quiz-progress-label');
  const bar   = document.querySelector('.quiz-progress');

  const pct = ((step - 1) / 5) * 100;
  if (fill)  fill.style.width = `${pct}%`;
  if (label) label.textContent = `Pregunta ${step} de 5`;
  if (bar)   bar.setAttribute('aria-valuenow', String(step));

  // Estados de las lunas
  for (let i = 1; i <= 5; i++) {
    const moon = document.querySelector(`.moon-${i}`);
    if (!moon) continue;

    moon.classList.remove('is-active', 'is-completed');

    if (i < step) {
      moon.classList.add('is-completed');
    } else if (i === step) {
      moon.classList.add('is-active');
    }
  }
}

function completeMoon(step) {
  const moon = document.querySelector(`.moon-${step}`);
  if (!moon) return;
  moon.classList.remove('is-active');
  moon.classList.add('is-completed');
}


/* ─────────────────────────────────────────────────────
   FINALIZAR QUIZ
   Calcula resultado, guarda en sessionStorage, transiciona
   ───────────────────────────────────────────────────── */
function finishQuiz() {
  const result = calculateResult();

  // Persistir en sessionStorage
  sessionStorage.setItem('quizResult',      result);
  sessionStorage.setItem('selectedService', result);

  // Estructura compacta para Fase 3 (result.js la consume directamente)
  const byId = Object.fromEntries(QUIZ_STATE.answers.map(a => [a.questionId, a.optionIndex]));
  sessionStorage.setItem('quizDiagnosis', JSON.stringify({
    p1:       byId[1] ?? null,
    p2:       byId[2] ?? null,
    p3:       byId[3] ?? null,
    p4:       byId[4] ?? null,
    p5:       byId[5] ?? null,
    resultado: result,
    scoreT:   QUIZ_STATE.totalT,
    scoreM:   QUIZ_STATE.totalM,
  }));

  // Completar la barra al 100%
  const fill  = document.getElementById('quiz-progress-fill');
  const label = document.getElementById('quiz-progress-label');
  if (fill)  fill.style.width = '100%';
  if (label) label.textContent = 'Diagnóstico completado';

  // Transicionar al loader
  setTimeout(transitionToLoader, 600);
}


/* ─────────────────────────────────────────────────────
   CALCULAR RESULTADO
   Lógica: total T vs M → desempate P3 → desempate P5
   ───────────────────────────────────────────────────── */
function calculateResult() {
  if (QUIZ_STATE.totalT > QUIZ_STATE.totalM) return 'tarot';
  if (QUIZ_STATE.totalM > QUIZ_STATE.totalT) return 'manos';

  // Empate: tiebreaker P3 (id:3)
  const p3 = QUIZ_STATE.answers.find(a => a.questionId === 3);
  if (p3 && p3.scoreT !== p3.scoreM) {
    return p3.scoreT > p3.scoreM ? 'tarot' : 'manos';
  }

  // Fallback: tiebreaker P5 (id:5)
  const p5 = QUIZ_STATE.answers.find(a => a.questionId === 5);
  if (p5 && p5.scoreT !== p5.scoreM) {
    return p5.scoreT > p5.scoreM ? 'tarot' : 'manos';
  }

  // Último recurso
  return 'tarot';
}


/* ─────────────────────────────────────────────────────
   TRANSICIÓN AL LOADER (Fase 3 placeholder)
   ───────────────────────────────────────────────────── */
function transitionToLoader() {
  const quizSection   = document.getElementById('quiz');
  const loaderSection = document.getElementById('loader');

  if (quizSection) {
    quizSection.classList.add('is-exiting');
  }

  setTimeout(() => {
    if (quizSection) {
      quizSection.setAttribute('hidden', '');
      quizSection.classList.remove('is-exiting');
    }

    if (loaderSection) {
      loaderSection.removeAttribute('hidden');
      loaderSection.classList.add('is-entering');
    }

    QUIZ_STATE.isTransitioning = false;
  }, 480);
}


/* ─────────────────────────────────────────────────────
   EXPONER GLOBALMENTE
   main.js llama window.activateQuiz()
   ───────────────────────────────────────────────────── */
window.activateQuiz = activateQuiz;
