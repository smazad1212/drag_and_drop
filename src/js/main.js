let images = ["ruppur", "bangabandhu", "hatirjheel", "padma"];
let captured = 0;

function drag(e) {
  e.dataTransfer.setData("image", e.target.id);
}

function drop(e) {
  e.preventDefault();
  let data = e.dataTransfer.getData("image");
  if (images.includes(data)) {
    captured += 1;
    pop(e);
    anime({
      targets: '#map',
      scale: 1+(captured/20),
      easing: 'spring(1, 80, 10, 0)',
      duration: 400,
    });
  }
  let image = document.getElementById(data);
  image.remove();
  if (captured === 4) {
    anime({
      targets: '#map',
      scale: 0,
      easing: 'easeInOutBack',
      duration: 400,
      complete: function () {
        document.getElementById("map").style.display = "none";
      }
    });
    document.getElementById("instructions").style.display = "none";
    document.getElementById("map-completed").style.display = "block";
    anime({
      targets: '#map-completed',
      scale: [0, 1],
      easing: 'easeInOutBack',
      duration: 600
    });
    document.getElementById("announcement").style.display = "block";
    anime({
      targets: '#announcement',
      scale: [0, 1.2],
      easing: 'easeInOutBack',
      delay: 600,
      duration: 800,
    });
    document.getElementsByClassName("bongobondhu-img")[0].classList.add('show');
  }
}

function allowDrop(e) {
  e.preventDefault();
}

function pop (e) {
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = document.querySelector('#button').getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 30; i++) {
      createParticle(x, y);
    }
  } else {
    for (let i = 0; i < 30; i++) {
      // createParticle(e.clientX, e.clientY);
      createParticle(150, 125);
    }
  }
}

function createParticle (x, y) {
  const particle = document.createElement('particle');
  document.getElementsByClassName('overlay')[0].appendChild(particle);

  const size = Math.floor(Math.random() * 10 + 2);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.background = `hsl(0, 92%, 32%)`;

  const destinationX = x + (Math.random() - 0.5) * 2 * 150;
  const destinationY = y + (Math.random() - 0.5) * 2 * 150;

  const animation = particle.animate([
    {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
      opacity: 1
    },
    {
      transform: `translate(${destinationX}px, ${destinationY}px)`,
      opacity: 0
    }
  ], {
    duration: Math.random() * 1000 + 500,
    easing: 'cubic-bezier(0, .9, .57, 1)',
    delay: Math.random() * 200
  });

  animation.onfinish = () => {
    particle.remove();
  };
}

anime({
  targets: '#map',
  scale: [3, 1],
  easing: 'easeOutElastic(1, .5)',
  duration: 800
});

anime({
  targets: '#draggable img',
  scale: [0.6, 1],
  translateX: {
    value: [-550, 0],
    delay: anime.stagger(100),
    duration: 800
  },
  rotate: '1turn',
  easing: 'easeInOutQuart'
});
