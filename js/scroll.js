/* scroll.js — comportamento ligado à rolagem: barra de progresso no topo,
   item de nav da seção visível e revelação dos blocos ao entrarem na tela. */
(function () {
  'use strict';

  var JD = window.JD || { motion: true, ease: 'cubic-bezier(.2,.7,.2,1)' };
  var SECTIONS = ['home', 'sobre', 'stack', 'experiencia', 'projetos', 'contato'];

  var bar = document.querySelector('[data-progress]');
  var links = document.querySelectorAll('.nav__link, .nav__logo');
  var active = '';

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;

    if (bar) {
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }

    // A seção corrente é a última que já cruzou 40% da altura da viewport
    var current = SECTIONS[0];
    SECTIONS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
    });

    if (current === active) return;
    active = current;

    links.forEach(function (link) {
      if (link.getAttribute('href') === '#' + current) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* --- Scroll reveal ------------------------------------------------------ */
  if (!JD.motion) return;

  var targets = document.querySelectorAll('[data-reveal],[data-grow]');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el = entry.target;
      io.unobserve(el);

      var grow = el.hasAttribute('data-grow');
      var frames = grow
        ? [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }]
        : [{ opacity: 0, transform: 'translateY(30px)' },
           { opacity: 1, transform: 'none' }];

      el.classList.remove('is-hidden');
      el.style.transform = '';

      el.animate(frames, {
        duration: grow ? 1400 : 800,
        easing: JD.ease
      });
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) {
    // O que já está visível no carregamento não é escondido para depois
    // aparecer — só o que está abaixo da primeira dobra é revelado.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    if (el.hasAttribute('data-grow')) {
      el.style.transform = 'scaleY(0)';
    } else {
      el.classList.add('is-hidden');
    }
    io.observe(el);
  });
})();
