document.addEventListener('DOMContentLoaded', function() {
const container = document.getElementById('stars-container');

  // Estrelas pequenas 
createStars(container, 500, 1, '5s');

  // Estrelas médias
createStars(container, 100, 2, '10s');

  // Estrelas grandes 
createStars(container, 30, 3, '35s');
});

function createStars(container, count, size, duration) {
for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const starSize = (Math.random() * size) + 0.5;
    star.style.width = `${starSize}px`;
    star.style.height = `${starSize}px`;
    
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    
    star.style.opacity = Math.random() * 0.7 + 0.3;
    
    star.style.animationDuration = duration;
    star.style.animationDelay = `${Math.random() * 20}s`;
    
    star.style.animationName = `floatStar${Math.floor(Math.random() * 3) + 1}`;
    
    container.appendChild(star);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes floatStar1 {
0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(${Math.random() * 6 - 3}vw, ${Math.random() * 4 - 2}vh); }
      50% { transform: translate(${Math.random() * 8 - 4}vw, ${Math.random() * 6 - 3}vh); }
      75% { transform: translate(${Math.random() * 4 - 2}vw, ${Math.random() * 2 - 1}vh); }
    }
    @keyframes floatStar2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(${Math.random() * 5 - 2.5}vw, ${Math.random() * 3 - 1.5}vh) rotate(180deg); }
    }
    @keyframes floatStar3 {
0% { transform: translate(0, 0); }
      50% { transform: translate(${Math.random() * 4 - 2}vw, ${Math.random() * 4 - 2}vh); }
    100% { transform: translate(0, 0); }
    }
`;
document.head.appendChild(style);
}