/**
 * countdown.js — El Secreto de las Manos v2
 * Timer de 20 minutos para la oferta regalo (Fase 3)
 *
 * Comportamiento:
 * - Lee sessionStorage para determinar si el timer ya arrancó
 * - Si ya arrancó: retoma desde donde estaba (persiste entre recargas)
 * - Si no arrancó: registra el timestamp de inicio
 * - Actualiza #cd-minutes y #cd-seconds cada segundo
 * - Al expirar: oculta el countdown, muestra mensaje elegante, desactiva CTA
 *
 * API pública: window.startCountdown()
 * sessionStorage key: 'giftCountdownStart' (timestamp ms)
 * sessionStorage key: 'giftActive' (boolean string)
 */

'use strict';

const COUNTDOWN_KEY      = 'giftCountdownStart';
const GIFT_ACTIVE_KEY    = 'giftActive';
const DURATION_SECONDS   = 20 * 60; // 20 minutos

let _tickTimer = null;


/* ─────────────────────────────────────────────────────
   INICIAR O RETOMAR EL COUNTDOWN
   ───────────────────────────────────────────────────── */
function startCountdown() {
  if (_tickTimer !== null) return; // ya está corriendo

  const stored  = sessionStorage.getItem(COUNTDOWN_KEY);
  const now     = Date.now();
  let startTime;

  if (stored) {
    startTime = parseInt(stored, 10);

    // Verificar si ya expiró antes de que JS arranque
    const elapsed = Math.floor((now - startTime) / 1000);
    if (elapsed >= DURATION_SECONDS) {
      handleExpired();
      return;
    }
  } else {
    startTime = now;
    sessionStorage.setItem(COUNTDOWN_KEY, String(startTime));
  }

  sessionStorage.setItem(GIFT_ACTIVE_KEY, 'true');
  tick(startTime);
}


/* ─────────────────────────────────────────────────────
   TICK — se llama cada segundo
   ───────────────────────────────────────────────────── */
function tick(startTime) {
  const elapsed   = Math.floor((Date.now() - startTime) / 1000);
  const remaining = DURATION_SECONDS - elapsed;

  if (remaining <= 0) {
    renderCountdown(0);
    handleExpired();
    return;
  }

  renderCountdown(remaining);

  _tickTimer = setTimeout(() => tick(startTime), 1000);
}


/* ─────────────────────────────────────────────────────
   RENDERIZAR TIEMPO
   ───────────────────────────────────────────────────── */
function renderCountdown(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const mmEl = document.getElementById('cd-minutes');
  const ssEl = document.getElementById('cd-seconds');

  if (mmEl) mmEl.textContent = String(mins).padStart(2, '0');
  if (ssEl) ssEl.textContent = String(secs).padStart(2, '0');
}


/* ─────────────────────────────────────────────────────
   EXPIRACIÓN
   Elegante: no desaparece bruscamente — mensaje sutil
   ───────────────────────────────────────────────────── */
function handleExpired() {
  if (_tickTimer !== null) {
    clearTimeout(_tickTimer);
    _tickTimer = null;
  }

  sessionStorage.setItem(GIFT_ACTIVE_KEY, 'false');

  const countdownWrapper = document.getElementById('gift-countdown-wrapper');
  const expiredMsg       = document.getElementById('gift-expired-msg');
  const giftCta          = document.getElementById('result-cta'); // único CTA del 2x1

  // Fade out el countdown, mostrar mensaje
  if (countdownWrapper) {
    countdownWrapper.classList.add('is-fading-out');
    setTimeout(() => {
      countdownWrapper.setAttribute('hidden', '');
      countdownWrapper.classList.remove('is-fading-out');
    }, 450);
  }

  if (expiredMsg) {
    setTimeout(() => {
      expiredMsg.removeAttribute('hidden');
      expiredMsg.classList.add('is-appearing');
    }, 500);
  }

  if (giftCta) {
    giftCta.setAttribute('disabled', '');
    giftCta.classList.add('is-expired');
  }
}


/* ─────────────────────────────────────────────────────
   EXPONER GLOBALMENTE
   ───────────────────────────────────────────────────── */
window.startCountdown = startCountdown;
