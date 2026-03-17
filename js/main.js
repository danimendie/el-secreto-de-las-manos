/**
 * main.js — El Secreto de las Manos v2
 * Header inteligente · Menu mobile · WhatsApp trigger · Modo Ads
 */

'use strict';

/* ─────────────────────────────────────────────────────────────
   CONFIGURACIÓN
   Reemplazar WHATSAPP_NUMBER con el número real (formato: 549XXXXXXXXXX)
   ───────────────────────────────────────────────────────────── */
const CONFIG = {
  WHATSAPP_NUMBER: '595992158077', // Paraguay: 595 + número sin 0 inicial

  MESSAGES: {
    tarot:
      'Hola, completé el diagnóstico y me recomendó la Lectura de Tarot. Me gustaría reservar. ✨',
    manos:
      'Hola, completé el diagnóstico y me recomendó la Lectura de Manos. Me gustaría reservar. 🌿',
    tarot_gift:
      'Hola, completé el diagnóstico y me recomendó el Tarot. Quiero reservar el 2x1 — Tarot + Lectura de Manos incluida. ✨',
    manos_gift:
      'Hola, completé el diagnóstico y me recomendó la Lectura de Manos. Quiero reservar el 2x1 — Manos + Tarot incluido. 🌿',
    default:
      'Hola, me gustaría reservar una lectura. ✨',
  },

  HEADER_SCROLL_THRESHOLD: 80,   // px: header empieza a oscurecer
  HEADER_HIDE_THRESHOLD: 250,    // px: header se oculta al bajar
  STICKY_FOOTER_THRESHOLD: 40,   // %: sticky footer aparece al N% de scroll
};


/* ─────────────────────────────────────────────────────────────
   INICIALIZACIÓN
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupMobileMenu();
  setupWhatsAppTriggers();
  setupPortalCTA();
  setupResultNavigation();
  setupRestartQuiz();
  detectAdsMode();
});


/* ─────────────────────────────────────────────────────────────
   HEADER INTELIGENTE
   Comportamiento:
   - Transparente al inicio
   - .is-scrolled → fondo glass oscuro
   - .is-hidden   → se oculta al scrollear hacia abajo
   - Reaparece al scrollear hacia arriba o hover
   ───────────────────────────────────────────────────────────── */
function setupHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentY = window.scrollY;
    const direction = currentY > lastScrollY ? 'down' : 'up';

    // Oscurecer al scrollear
    if (currentY > CONFIG.HEADER_SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
      header.classList.remove('is-hidden');
    }

    // Ocultar/mostrar según dirección
    if (currentY > CONFIG.HEADER_HIDE_THRESHOLD) {
      if (direction === 'down') {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Reaparecer al hover cerca del borde superior
  header.addEventListener('mouseenter', () => {
    header.classList.remove('is-hidden');
  });
}


/* ─────────────────────────────────────────────────────────────
   MENU MOBILE
   Toggle del drawer con animación y bloqueo de scroll del body
   ───────────────────────────────────────────────────────────── */
function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };

  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  const toggleMenu = () => {
    menu.classList.contains('is-open') ? close() : open();
  };

  toggle.addEventListener('click', toggleMenu);

  // Cerrar al hacer clic en un link del menu
  menu.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', close);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      toggle.focus();
    }
  });
}


/* ─────────────────────────────────────────────────────────────
   WHATSAPP TRIGGER
   Construye la URL con el mensaje correcto según el servicio.
   Detecta si hay oferta regalo activa (countdown en curso).
   Lee el servicio de: data-wa-service → sessionStorage → default
   ───────────────────────────────────────────────────────────── */
function setupWhatsAppTriggers() {
  // Delegación de eventos en el document
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-wa-service], .js-wa-trigger');
    if (!trigger) return;

    e.preventDefault();

    // Determinar servicio
    const service =
      trigger.dataset.waService ||
      sessionStorage.getItem('selectedService') ||
      'default';

    // Determinar si hay regalo activo
    const giftActive = sessionStorage.getItem('giftActive') === 'true';
    const messageKey = giftActive ? `${service}_gift` : service;

    const message =
      CONFIG.MESSAGES[messageKey] || CONFIG.MESSAGES[service] || CONFIG.MESSAGES.default;

    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    // Tracking de eventos Meta Pixel
    if (typeof window.fbq === 'function') {
      const waLocation =
        trigger.closest('#section-result') ? 'result'  :
        trigger.closest('#site-header')    ? 'header'  :
        trigger.closest('#mobile-menu')    ? 'header'  : 'default';

      window.fbq('trackCustom', 'WhatsAppClick', { location: waLocation });

      if (trigger.id === 'result-cta') {
        window.fbq('trackCustom', 'Offer2x1Click');
      }
    }
  });

  // Guardar servicio seleccionado en sessionStorage
  document.querySelectorAll('[data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      sessionStorage.setItem('selectedService', btn.dataset.service);
    });
  });
}


/* ─────────────────────────────────────────────────────────────
   PORTAL CTA
   Si el usuario ya tiene un resultado en sesión: abre el resultado guardado.
   Si no: inicia el quiz normalmente.
   ───────────────────────────────────────────────────────────── */
function setupPortalCTA() {
  const cta = document.getElementById('portal-cta');
  if (!cta) return;

  // Actualizar texto del CTA según si ya hay resultado guardado
  updatePortalCTA();

  cta.addEventListener('click', () => {
    const hasDiagnosis = !!sessionStorage.getItem('quizDiagnosis');
    if (hasDiagnosis && typeof window.revealSavedResult === 'function') {
      // Ocultar portal y mostrar el resultado guardado
      const portal = document.getElementById('portal');
      if (portal) portal.setAttribute('hidden', '');
      window.revealSavedResult();
    } else if (typeof window.activateQuiz === 'function') {
      window.activateQuiz();
    }
  });
}

/**
 * Actualiza el texto del CTA del portal según si hay resultado en sesión.
 * Llamado en setupPortalCTA() y cada vez que se cierra o reinicia el resultado.
 */
function updatePortalCTA() {
  const cta = document.getElementById('portal-cta');
  if (!cta) return;
  const hasDiagnosis = !!sessionStorage.getItem('quizDiagnosis');
  cta.textContent = hasDiagnosis
    ? 'Ver mi diagnóstico →'
    : 'Empezar el diagnóstico gratuito →';
}


/* ─────────────────────────────────────────────────────────────
   NAVEGACIÓN DESDE EL RESULTADO
   Permite al usuario salir del overlay del resultado y volver
   a explorar la landing normalmente.
   ───────────────────────────────────────────────────────────── */
function setupResultNavigation() {
  const resultSection = document.getElementById('section-result');
  if (!resultSection) return;

  function closeResult(targetId) {
    resultSection.setAttribute('hidden', '');

    // Restaurar el portal para que el usuario pueda volver a su resultado
    // usando el CTA (que ahora dirá "Ver mi diagnóstico →")
    const portal = document.getElementById('portal');
    if (portal) portal.removeAttribute('hidden');
    updatePortalCTA();

    const target = targetId ? document.getElementById(targetId) : null;
    requestAnimationFrame(() => {
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Botón "Seguir explorando" — cierra el overlay y navega a #como-funciona
  const exploreBtn = document.querySelector('.js-close-result');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => closeResult('como-funciona'));
  }

  // Nav links del header y mobile menu — si el resultado está visible, cerrarlo primero
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', e => {
      if (resultSection.hasAttribute('hidden')) return; // resultado no visible → comportamiento normal
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      closeResult(href.slice(1));
    });
  });
}


/* ─────────────────────────────────────────────────────────────
   REINICIO DEL QUIZ
   El botón .js-restart-quiz limpia la sesión y arranca el quiz desde cero.
   El usuario lo activa explícitamente desde el resultado.
   ───────────────────────────────────────────────────────────── */
function setupRestartQuiz() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.js-restart-quiz');
    if (!btn) return;

    // Limpiar todos los datos de sesión del quiz
    ['quizDiagnosis', 'quizResult', 'selectedService', 'giftActive', 'giftCountdownStart']
      .forEach(key => sessionStorage.removeItem(key));

    // Ocultar el resultado si está visible
    const resultSection = document.getElementById('section-result');
    if (resultSection) resultSection.setAttribute('hidden', '');

    // Actualizar CTA (ahora sin resultado guardado)
    updatePortalCTA();

    // Arrancar el quiz fresco
    if (typeof window.activateQuiz === 'function') {
      window.activateQuiz();
    }
  });
}


/* ─────────────────────────────────────────────────────────────
   DETECCIÓN DE MODO ADS
   Si ?src=ads está en la URL:
   - Agrega data-mode="ads" al <html>
   - El header empieza oculto
   - En Fase 2: el quiz se activará automáticamente
   ───────────────────────────────────────────────────────────── */
function detectAdsMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('src') !== 'ads') return;

  document.documentElement.setAttribute('data-mode', 'ads');

  const header = document.getElementById('site-header');
  if (header) {
    header.classList.add('ads-mode');
  }

  // Fase 2: activar quiz automáticamente en modo ads
  setTimeout(() => {
    if (typeof window.activateQuiz === 'function') {
      window.activateQuiz();
    }
  }, 500);
}


/* ─────────────────────────────────────────────────────────────
   UTILIDADES COMPARTIDAS
   Disponibles globalmente para módulos de fases siguientes
   ───────────────────────────────────────────────────────────── */

/**
 * Anima un número desde 0 hasta el valor objetivo.
 * Usado por los contadores (Fase 5).
 * @param {HTMLElement} el - Elemento cuyo textContent se actualiza
 * @param {number} target  - Número final
 * @param {number} duration - Duración en ms
 */
window.animateCounter = function (el, target, duration = 1500) {
  const fps = 60;
  const steps = duration / (1000 / fps);
  const increment = target / steps;
  let current = 0;

  const update = () => {
    current += increment;
    if (current < target) {
      el.textContent = Math.ceil(current);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(update);
};

/**
 * Observa elementos con [data-reveal] y agrega .is-visible al entrar al viewport.
 * Usado por animations.js (Fase 5).
 */
window.setupRevealObserver = function () {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
};
