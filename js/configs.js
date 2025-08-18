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


