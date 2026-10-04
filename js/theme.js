/* theme.js — alterna tema claro/escuro e persiste a escolha.
   O tema inicial é aplicado por um script inline no <head> do index.html,
   antes da primeira pintura, para a página não piscar na cor errada. */
(function () {
  'use strict';

  var KEY = 'juliodev-theme';
  var root = document.documentElement;
  var button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  var icon = button.querySelector('i');

  function current() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function render() {
    var light = current() === 'light';
    // No escuro, oferecemos o sol (ir para o claro); no claro, a lua.
    if (icon) icon.className = light ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    button.setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
    button.setAttribute('aria-pressed', String(light));
  }

  button.addEventListener('click', function () {
    var next = current() === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      /* Modo privado ou storage bloqueado: o tema vale só para esta sessão. */
    }
    render();
  });

  render();
})();
