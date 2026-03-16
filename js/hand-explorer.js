/**
 * hand-explorer.js — El Secreto de las Manos v2
 * Explorador interactivo de la mano con hotspots y tooltips
 *
 * Hotspots:
 *   - Línea del corazón (.hs-corazon)
 *   - Línea de la cabeza (.hs-cabeza)
 *   - Línea de la vida   (.hs-vida)
 *
 * Desktop: tooltip en hover
 * Mobile:  tooltip en tap (toggle, cierra al tocar afuera)
 * Pulso:   animación CSS continua en cada punto
 */
(function () {
  'use strict';

  var container = document.getElementById('hand-explorer-visual');
  if (!container) return;

  var hotspots = Array.prototype.slice.call(container.querySelectorAll('.hotspot'));
  var buttons  = Array.prototype.slice.call(container.querySelectorAll('.js-hs-btn'));

  /* ── Detectar dispositivo táctil ── */
  function isCoarse() {
    return window.matchMedia('(pointer: coarse)').matches;
  }

  /* ── Cerrar todos los tooltips ── */
  function closeAll() {
    hotspots.forEach(function (h) {
      h.classList.remove('is-active');
    });
  }

  /* ── Configurar cada botón ── */
  buttons.forEach(function (btn) {
    var hotspot = btn.closest('.hotspot');

    /* Desktop: hover sobre el hotspot completo */
    hotspot.addEventListener('mouseenter', function () {
      if (!isCoarse()) hotspot.classList.add('is-active');
    });
    hotspot.addEventListener('mouseleave', function () {
      if (!isCoarse()) hotspot.classList.remove('is-active');
    });

    /* Mobile: tap toggle */
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!isCoarse()) return;
      var wasActive = hotspot.classList.contains('is-active');
      closeAll();
      if (!wasActive) hotspot.classList.add('is-active');
    });
  });

  /* ── Cerrar al tocar fuera del explorador (mobile) ── */
  document.addEventListener('click', function (e) {
    if (!isCoarse()) return;
    if (!container.contains(e.target)) closeAll();
  });

})();
