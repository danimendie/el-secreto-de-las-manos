/**
 * animations.js — El Secreto de las Manos v2
 * Animaciones y comportamientos de las secciones de scroll (Fase 5)
 *
 * Responsabilidades:
 * - Inicializar el reveal observer de main.js para [data-reveal]
 * - Animar contadores numéricos al entrar en viewport
 * - Asignar delays de stagger a hijos de [data-stagger-children]
 * - Manejar el acordeón del FAQ
 * - Mostrar el sticky footer mobile al hacer scroll
 * - Mostrar el floating WhatsApp button al hacer scroll (desktop)
 *
 * Depende de: js/main.js (window.setupRevealObserver, window.animateCounter)
 */

'use strict';

/* ─────────────────────────────────────────────────────
   INICIALIZACIÓN
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  setupReveal();
  setupCounters();
  setupStagger();
  setupFAQ();
  setupScrollVisibility();
});


/* ─────────────────────────────────────────────────────
   REVEAL OBSERVER
   Activa [data-reveal] → .is-visible via helper de main.js
   ───────────────────────────────────────────────────── */
function setupReveal() {
  if (typeof window.setupRevealObserver === 'function') {
    window.setupRevealObserver();
  }
}


/* ─────────────────────────────────────────────────────
   CONTADORES NUMÉRICOS
   Observa [data-counter] y anima al entrar en viewport
   Solo dispara una vez por elemento
   ───────────────────────────────────────────────────── */
function setupCounters() {
  var counterEls = document.querySelectorAll('[data-counter]');
  if (!counterEls.length) return;
  if (typeof window.animateCounter !== 'function') return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-counter'), 10);
      if (isNaN(target)) return;
      observer.unobserve(el);
      window.animateCounter(el, target, 1800);
    });
  }, { threshold: 0.5 });

  counterEls.forEach(function (el) {
    observer.observe(el);
  });
}


/* ─────────────────────────────────────────────────────
   STAGGER DE HIJOS
   Para cada [data-stagger-children], asigna --reveal-delay
   incremental a cada hijo directo con [data-reveal]
   ───────────────────────────────────────────────────── */
function setupStagger() {
  var containers = document.querySelectorAll('[data-stagger-children]');
  containers.forEach(function (container) {
    var baseDelay = parseInt(container.getAttribute('data-stagger-base') || '0', 10);
    var step      = parseInt(container.getAttribute('data-stagger-step') || '120', 10);
    var children  = container.querySelectorAll('[data-reveal]');
    children.forEach(function (child, i) {
      child.style.setProperty('--reveal-delay', (baseDelay + i * step) + 'ms');
    });
  });
}


/* ─────────────────────────────────────────────────────
   ACORDEÓN FAQ
   Clic en .faq-question → toggle .is-open en .faq-item
   Solo un item abierto a la vez
   ───────────────────────────────────────────────────── */
function setupFAQ() {
  var faqSection = document.getElementById('section-faq');
  if (!faqSection) return;

  faqSection.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-question');
    if (!btn) return;

    var item   = btn.closest('.faq-item');
    if (!item) return;

    var isOpen = item.classList.contains('is-open');

    // Cerrar todos
    faqSection.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('is-open');
      var q = i.querySelector('.faq-question');
      if (q) q.setAttribute('aria-expanded', 'false');
    });

    // Abrir el clickeado si estaba cerrado
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}


/* ─────────────────────────────────────────────────────
   VISIBILIDAD EN SCROLL
   Floating WA (desktop) y sticky footer (mobile):
   - Aparecen cuando el usuario scrollea ≥ 40% de la página
   - Se ocultan al llegar al 92%+ (CTA final visible — evita
     duplicar el botón de reserva en la sección de cierre)
   ───────────────────────────────────────────────────── */
function setupScrollVisibility() {
  var floatingWA   = document.querySelector('.floating-wa');
  var stickyFooter = document.querySelector('.sticky-footer-mobile');

  if (!floatingWA && !stickyFooter) return;

  function onScroll() {
    var scrolled    = window.scrollY + window.innerHeight;
    var total       = document.documentElement.scrollHeight;
    var pct         = scrolled / total;
    var shouldShow  = pct >= 0.40 && pct < 0.92;

    if (floatingWA) {
      floatingWA.classList.toggle('is-visible', shouldShow);
    }
    if (stickyFooter) {
      stickyFooter.classList.toggle('is-visible', shouldShow);
      stickyFooter.setAttribute('aria-hidden', String(!shouldShow));
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // evaluar estado inicial
}
