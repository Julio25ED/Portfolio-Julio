var typed = new Typed(".txt3", {
  strings: ["Desenvolvedor de Software", "Seja bem-vindo ao meu portifólio"],
  typeSpeed: 90,
  backSpeed: 90,
  backDelay: 500,
  loop: true
})

const header = document.querySelector('.header');

// Adiciona um "listener" para o evento de rolagem (scroll)
window.addEventListener('scroll', () => {
  // Verifica se a posição de rolagem vertical (Y) é maior que 0
  if (window.scrollY > 0) {
    header.classList.add('scrolled'); // Se o usuário rolou, adiciona a classe
  } else {
    header.classList.remove('scrolled'); // Se estiver no topo, remove a classe
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.3 
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Seleciona todos os elementos com a classe 'scroll-animate'
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');

    // Começa a observar cada um desses elementos
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.scroll-animate');
  elementsToAnimate.forEach(el => observer.observe(el));
});



