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
      complete: function () {
        anime({
          targets: '#announcement',
          scale: 1,
          easing: 'spring(1, 80, 10, 0)',
          duration: 400,
        });
      }
    });
    document.getElementsByClassName("bongobondhu-img")[0].classList.add('show');
  }
}

function allowDrop(e) {
  e.preventDefault();
}

anime({
  targets: '#map',
  scale: [3, 1],
  easing: 'easeOutElastic(1, .5)',
  duration: 800
});
anime({
  targets: '#draggable img',
  translateX: {
    value: [-250, 0],
    delay: anime.stagger(100),
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 600,
    easing: 'easeInOutSine'
  },
  scale: {
    value: [0.6, 1],
    duration: 800,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250
});