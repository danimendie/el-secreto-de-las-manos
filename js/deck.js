/**
 * deck.js — El Secreto de las Manos v2
 * Mazo interactivo de tarot: spread / collapse / modal
 *
 * Refactorización del script inline del secreto-index.html original.
 * - IIFE autónomo, sin dependencias externas
 * - Se activa cuando #deck-stage entra al viewport (IntersectionObserver)
 * - Modal con CTA a WhatsApp
 * - Imágenes: Rider-Waite, Wikimedia Commons (dominio público)
 */
(function () {
  'use strict';

  var stage = document.getElementById('deck-stage');
  if (!stage) return;

  var instructionEl = document.getElementById('tarot-instruction');
  var reshuffleBtn  = document.getElementById('tarot-reshuffle');

  /* ── 22 Arcanos Mayores ── */
  var CARDS = [
    { n: 'El Loco',        img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',             kw: 'Libertad · Salto de fe · Nuevos comienzos',      d: 'Algo nuevo quiere nacer en tu vida. No necesitás tener todo resuelto para dar el primer paso.' },
    { n: 'El Mago',        img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',         kw: 'Poder · Creatividad · Manifestación',             d: 'Tenés todos los recursos que necesitás. Es momento de confiar en tu capacidad de crear.' },
    { n: 'La Sacerdotisa', img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',   kw: 'Intuición · Misterio · Sabiduría interior',       d: 'Lo que buscás no está afuera. Hacé silencio y escuchá lo que ya sabés.' },
    { n: 'La Emperatriz',  img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',          kw: 'Abundancia · Nutrición · Sensualidad',            d: 'Tu energía creativa y emocional está floreciendo. Permitite recibir.' },
    { n: 'El Emperador',   img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',          kw: 'Estructura · Autoridad · Estabilidad',            d: 'Es momento de poner límites claros y tomar el liderazgo de tu propia vida.' },
    { n: 'El Hierofante',  img: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',       kw: 'Tradición · Guía · Creencias',                   d: 'Estás en proceso de aprendizaje. Puede llegar una guía importante sobre tu camino.' },
    { n: 'Los Amantes',    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg',                     kw: 'Elección · Unión · Valores',                     d: 'Hay una decisión importante frente a vos. Se trata de elegir quién querés ser.' },
    { n: 'El Carro',       img: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',          kw: 'Victoria · Control · Dirección',                 d: 'Vas a lograr lo que te propusiste, pero requiere dirección clara.' },
    { n: 'La Fuerza',      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',         kw: 'Valor · Paciencia · Compasión',                  d: 'La verdadera fuerza es sostener con amor lo que es difícil. Tenés más capacidad de lo que creés.' },
    { n: 'El Ermitaño',    img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',           kw: 'Introspección · Sabiduría · Silencio',            d: 'Es momento de retirarte hacia adentro. La respuesta que buscás afuera vive dentro tuyo.' },
    { n: 'La Rueda',       img: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg', kw: 'Ciclos · Destino · Cambio',                      d: 'Algo está girando. Las cosas están cambiando aunque no puedas verlo.' },
    { n: 'La Justicia',    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',          kw: 'Verdad · Equilibrio · Karma',                    d: 'La balanza se está equilibrando. Actuá con integridad.' },
    { n: 'El Colgado',     img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',       kw: 'Pausa · Rendición · Perspectiva',                d: 'No es el momento de actuar. Soltá el control y mirá desde otro ángulo.' },
    { n: 'La Muerte',      img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',            kw: 'Transformación · Final · Renacimiento',           d: 'Algo tiene que terminar para que algo nuevo pueda nacer.' },
    { n: 'La Templanza',   img: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg',       kw: 'Equilibrio · Paciencia · Alquimia',               d: 'El camino es la integración de los opuestos. Ir despacio para encontrar la alquimia correcta.' },
    { n: 'El Diablo',      img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',            kw: 'Apego · Sombra · Liberación',                    d: 'Hay algo que te tiene más atado de lo que reconocés. El primer paso es ver la cadena.' },
    { n: 'La Torre',       img: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',            kw: 'Ruptura · Revelación · Verdad',                  d: 'Algo se está derrumbando. La verdad que emerge vale más que la ilusión que tenías.' },
    { n: 'La Estrella',    img: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',             kw: 'Esperanza · Sanación · Inspiración',              d: 'Hay una energía de sanación genuina disponible para vos ahora.' },
    { n: 'La Luna',        img: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',             kw: 'Ilusión · Inconsciente · Misterio',               d: 'Las cosas no son lo que parecen. Confiá en tu intuición.' },
    { n: 'El Sol',         img: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',              kw: 'Alegría · Éxito · Claridad',                     d: 'Claridad, vitalidad, alegría genuina. Permitite brillar sin culpa.' },
    { n: 'El Juicio',      img: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg',        kw: 'Despertar · Llamado · Perdón',                   d: 'Hay un llamado que no podés seguir ignorando. Es momento de perdonarte.' },
    { n: 'El Mundo',       img: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg',            kw: 'Completud · Logro · Integración',                d: 'Un ciclo importante llegó a su culminación. Celebrá este momento.' }
  ];

  /* ── Ornamentos SVG para el reverso de las cartas ── */
  var ORNAMENTS = [
    '<svg viewBox="0 0 80 128" fill="none"><path d="M36 44 A14 14 0 1 0 36 84 A10 10 0 1 1 36 44Z" stroke="rgba(220,185,120,0.18)" stroke-width="0.6" fill="rgba(220,185,120,0.02)"/><circle cx="52" cy="50" r="1" fill="rgba(220,185,120,0.22)"/><circle cx="55" cy="68" r="0.7" fill="rgba(220,185,120,0.16)"/></svg>',
    '<svg viewBox="0 0 80 128" fill="none"><polygon points="40,36 43,52 56,47 47,57 56,67 43,62 40,78 37,62 24,67 33,57 24,47 37,52" stroke="rgba(220,185,120,0.16)" stroke-width="0.5" fill="rgba(220,185,120,0.015)"/><circle cx="40" cy="57" r="4" stroke="rgba(220,185,120,0.12)" stroke-width="0.5"/><circle cx="40" cy="57" r="1.5" fill="rgba(220,185,120,0.08)"/></svg>',
    '<svg viewBox="0 0 80 128" fill="none"><ellipse cx="40" cy="62" rx="20" ry="11" stroke="rgba(220,185,120,0.12)" stroke-width="0.5"/><circle cx="40" cy="62" r="7" stroke="rgba(220,185,120,0.14)" stroke-width="0.5"/><circle cx="40" cy="62" r="3" fill="rgba(220,185,120,0.04)" stroke="rgba(220,185,120,0.10)" stroke-width="0.4"/><circle cx="40" cy="62" r="1.2" fill="rgba(220,185,120,0.10)"/></svg>'
  ];

  var N        = 10;
  var cardEls  = [];
  var isSpread = false;
  var isLocked = false;

  /* ── Construir cartas ── */
  for (var i = 0; i < N; i++) {
    var card = document.createElement('div');
    card.className       = 'deck-card';
    card.dataset.index   = i;
    card.style.zIndex    = i + 1;

    var starsHTML = '';
    var numStars  = 2 + Math.floor(Math.random() * 3);
    for (var s = 0; s < numStars; s++) {
      var sx    = (14 + Math.random() * 72).toFixed(1);
      var sy    = (10 + Math.random() * 78).toFixed(1);
      var dur   = (4  + Math.random() * 5).toFixed(1);
      var delay = (Math.random() * 6).toFixed(1);
      starsHTML += '<span class="card-star" style="left:' + sx + '%;top:' + sy + '%;--dur:' + dur + 's;--delay:' + delay + 's">✦</span>';
    }

    card.innerHTML =
      '<div class="card-inner">' +
        '<div class="card-face">' +
          '<div class="card-ornament">' + ORNAMENTS[i % 3] + '</div>' +
          starsHTML +
          '<span class="card-corner tl"></span>' +
          '<span class="card-corner tr"></span>' +
          '<span class="card-corner bl"></span>' +
          '<span class="card-corner br"></span>' +
        '</div>' +
      '</div>';

    stage.appendChild(card);
    cardEls.push(card);
  }

  /* ── Animación spread ── */
function spreadCards() {
  if (isSpread) return;
  isSpread = true;
  cardEls.forEach(function (el, i) {
    setTimeout(function () {
      el.style.opacity = '';
      el.style.transform = '';
      el.classList.remove('collapsing');
      el.classList.add('spread');
    }, 60 * i);
  });
  setTimeout(function () {
    if (instructionEl) instructionEl.classList.add('visible');
  }, 60 * N + 500);
}

  /* ── Animación collapse ── */
  function collapseCards(callback) {
    if (instructionEl) instructionEl.classList.remove('visible');
    if (reshuffleBtn)  reshuffleBtn.style.display = 'none';
    var half = Math.floor(N / 2);
    cardEls.forEach(function (el, i) {
      var dist = Math.abs(i - (N - 1) / 2);
      setTimeout(function () {
        el.classList.remove('spread');
        el.classList.add('collapsing');
      }, dist * 40);
    });
    setTimeout(function () {
      cardEls.forEach(function (el) {
        el.classList.remove('collapsing');
        el.style.opacity   = '0';
        el.style.transform = 'translateY(40px) scale(0.92)';
      });
      isSpread = false;
      if (callback) callback();
    }, half * 40 + 450);
  }

  /* ── Activar al entrar al viewport ── */
  var deckObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      spreadCards();
      deckObserver.disconnect();
    }
  }, { threshold: 0.15 });
  deckObserver.observe(stage);

  /* ── Click en carta → modal ── */
  stage.addEventListener('click', function (e) {
    var el = e.target.closest('.deck-card');
    if (!el || isLocked || !isSpread) return;
    isLocked = true;

    var pick = CARDS[Math.floor(Math.random() * CARDS.length)];

    cardEls.forEach(function (c) {
      if (c !== el) c.classList.add('dimmed');
    });
    el.classList.add('chosen');

    setTimeout(function () {
      var img     = document.getElementById('modal-img');
      var name    = document.getElementById('modal-name');
      var kw      = document.getElementById('modal-keywords');
      var meaning = document.getElementById('modal-meaning');
      var modal   = document.getElementById('tarot-modal');

      if (img)     img.src               = pick.img;
      if (name)    name.textContent      = pick.n;
      if (kw)      kw.textContent        = pick.kw;
      if (meaning) meaning.textContent   = pick.d;
      if (modal)   modal.classList.add('active');
      if (reshuffleBtn) reshuffleBtn.style.display = 'inline-flex';
    }, 450);
  });

  /* ── Resetear estado de cartas ── */
  function resetCards() {
    var modal = document.getElementById('tarot-modal');
    if (modal) modal.classList.remove('active');
    isLocked = false;
    cardEls.forEach(function (el, i) {
      el.classList.remove('dimmed', 'chosen');
      var inner = el.querySelector('.card-inner');
      if (inner) inner.style.transform = '';
      el.style.zIndex = i + 1;
    });
  }

  /* ── Reshuffle ── */
  function reshuffle() {
    var modal = document.getElementById('tarot-modal');
    if (modal) modal.classList.remove('active');
    isLocked = false;
    cardEls.forEach(function (el) {
      el.classList.remove('dimmed', 'chosen');
      var inner = el.querySelector('.card-inner');
      if (inner) inner.style.transform = '';
    });
    collapseCards(function () {
      setTimeout(spreadCards, 300);
    });
  }

  /* ── Listeners modal ── */
  if (reshuffleBtn) reshuffleBtn.addEventListener('click', reshuffle);

  var modalOtra  = document.getElementById('modal-otra');
  var modalClose = document.getElementById('modal-close');
  var tarotModal = document.getElementById('tarot-modal');

  if (modalOtra)  modalOtra.addEventListener('click', resetCards);
  if (modalClose) modalClose.addEventListener('click', resetCards);

  if (tarotModal) {
    tarotModal.addEventListener('click', function (e) {
      if (e.target === tarotModal) resetCards();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') resetCards();
  });

})();
