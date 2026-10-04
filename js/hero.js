/* hero.js — comportamento do cenário 3D da primeira dobra:
   entrada escalonada, tilt e spotlight pelo cursor, chips flutuando,
   terminal digitando e pipeline avançando. */
(function () {
  'use strict';

  var JD = window.JD || { motion: true, ease: 'cubic-bezier(.2,.7,.2,1)' };
  var hero = document.querySelector('.hero');
  if (!hero) return;

  /* --- Entrada escalonada dos elementos do Hero -------------------------- */
  if (JD.motion) {
    hero.querySelectorAll('[data-enter]').forEach(function (el) {
      el.animate([
        { opacity: 0, transform: 'translateY(30px)' },
        { opacity: 1, transform: 'none' }
      ], {
        duration: 900,
        delay: +el.dataset.enter,
        easing: JD.ease,
        fill: 'backwards'
      });
    });

    /* Chips e pipeline: aparecem crescendo e depois flutuam para sempre.
       O índice em data-float desloca duração e delay, para nenhum par de
       elementos subir e descer em sincronia. */
    hero.querySelectorAll('[data-float]').forEach(function (el) {
      var i = +el.dataset.float;
      el.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(' + (-8 - i * 2) + 'px)' },
        { transform: 'translateY(0)' }
      ], {
        duration: 5200 + i * 700,
        delay: 1000 + i * 150,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
      el.animate([
        { opacity: 0, transform: 'scale(.9)' },
        { opacity: 1, transform: 'none' }
      ], {
        duration: 700,
        delay: 900 + i * 120,
        easing: JD.ease,
        fill: 'backwards',
        composite: 'add'
      });
    });
  }

  /* --- Tilt 3D e spotlight ----------------------------------------------- */
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    var x = e.clientX - r.left;
    var y = e.clientY - r.top;

    hero.style.setProperty('--mx', x + 'px');
    hero.style.setProperty('--my', y + 'px');

    // O tilt é desligado em telas estreitas e com reduced motion
    if (JD.motion && window.innerWidth > 820) {
      hero.style.setProperty('--ry', ((x / r.width - 0.5) * 14).toFixed(2) + 'deg');
      hero.style.setProperty('--rx', ((0.5 - y / r.height) * 10).toFixed(2) + 'deg');
    }
  }, { passive: true });

  hero.addEventListener('mouseleave', function () {
    hero.style.setProperty('--rx', '0deg');
    hero.style.setProperty('--ry', '0deg');
  });

  /* --- Terminal ----------------------------------------------------------- */
  var CMD = 'npm run build';
  var OUT = [
    ['> portfolio@2.0 build', 'muted'],
    ['> tsc && vite build', 'muted'],
    ['', 'muted'],
    ['\u2713 Compiled successfully', 'ok'],
    ['\u2713 Generating static pages', 'ok'],
    ['', 'muted'],
    ['Done.', 'fg']
  ];

  var cmdEl = hero.querySelector('[data-term-cmd]');
  var cursorEl = hero.querySelector('[data-term-cursor]');
  var outEl = hero.querySelector('[data-term-out]');

  function renderOut(n) {
    var html = '';
    for (var i = 0; i < n; i++) {
      html += '<div class="term__line--' + OUT[i][1] + '">'
        + (OUT[i][0] || '&nbsp;') + '</div>';
    }
    // A linha de status só aparece quando toda a saída já foi revelada
    if (n === OUT.length) {
      html += '<div class="term__line--ok">STATUS: ONLINE \u25CF</div>';
    }
    outEl.innerHTML = html;
  }

  if (!cmdEl || !outEl) return;

  if (!JD.motion) {
    // Sem animação, o terminal aparece com o resultado completo
    cmdEl.textContent = CMD;
    if (cursorEl) cursorEl.style.display = 'none';
    renderOut(OUT.length);
    return;
  }

  var cmdLen = 0;
  var outN = 0;
  var timer;

  function step() {
    if (cmdLen < CMD.length) {
      cmdLen++;
      cmdEl.textContent = CMD.slice(0, cmdLen);
      timer = setTimeout(step, 70);
    } else if (outN < OUT.length) {
      outN++;
      renderOut(outN);
      timer = setTimeout(step, 380);
    } else {
      // Segura o resultado na tela, limpa e recomeça o ciclo
      timer = setTimeout(function () {
        cmdLen = 0;
        outN = 0;
        cmdEl.textContent = '';
        renderOut(0);
        timer = setTimeout(step, 600);
      }, 4200);
    }
  }

  timer = setTimeout(step, 1200);

  if (cursorEl) {
    setInterval(function () {
      cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
    }, 530);
  }

  /* --- Pipeline ----------------------------------------------------------- */
  var items = hero.querySelectorAll('.pipeline__item');
  if (items.length) {
    var stage = 0;
    var paint = function () {
      items.forEach(function (el, i) {
        el.classList.toggle('is-done', i < stage);
        el.classList.toggle('is-active', i === stage);
      });
    };
    paint();
    setInterval(function () {
      stage = (stage + 1) % items.length;
      paint();
    }, 2400);
  }
})();
