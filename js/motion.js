/* motion.js — define se a página pode animar e roda os laços decorativos
   que existem em mais de uma seção (glows que derivam, pontos que pulsam).
   Carregado antes dos outros scripts; todos leem window.JD.motion. */
(function () {
  'use strict';

  var reduce = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var JD = window.JD = window.JD || {};
  JD.motion = !reduce;
  JD.ease = 'cubic-bezier(.2,.7,.2,1)';

  if (!JD.motion) return;

  // Glows do fundo, do Hero e do Contato
  document.querySelectorAll('[data-drift]').forEach(function (el) {
    el.animate([
      { transform: 'translate(0,0)' },
      { transform: 'translate(-60px,40px)' },
      { transform: 'translate(0,0)' }
    ], { duration: 18000, iterations: Infinity, easing: 'ease-in-out' });
  });

  // Pontos de status: "building..." no card do Sobre, "Trabalho atual" na timeline
  document.querySelectorAll('[data-pulse]').forEach(function (el) {
    el.animate([
      { opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }
    ], { duration: 1600, iterations: Infinity });
  });
})();
