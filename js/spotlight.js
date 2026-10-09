/* spotlight.js — posiciona os glows que seguem o cursor.
   O fundo da página usa coordenadas de viewport (--gx/--gy); cada card de
   projeto usa coordenadas relativas a si mesmo (--px/--py). */
(function () {
  'use strict';

  var root = document.documentElement;

  window.addEventListener('mousemove', function (e) {
    root.style.setProperty('--gx', e.clientX + 'px');
    root.style.setProperty('--gy', e.clientY + 'px');
  }, { passive: true });

  document.querySelectorAll('.project').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--px', (e.clientX - r.left) + 'px');
      card.style.setProperty('--py', (e.clientY - r.top) + 'px');
    }, { passive: true });
  });
})();
