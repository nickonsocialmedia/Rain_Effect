const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drops = [];

function createRaindrop() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 20 + 5,
    speed: Math.random() * 10 + 5,
    color: getRandomNeonColor(),
  };
}

function drawRaindrop(drop) {
  ctx.beginPath();
  ctx.moveTo(drop.x, drop.y);
  ctx.lineTo(drop.x, drop.y + drop.length);
  ctx.strokeStyle = drop.color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function updateRaindrops() {
  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    drop.y += drop.speed;

    // reset drop
    if (drop.y - drop.length > canvas.height) {
      drops[i] = createRaindrop();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const drop of drops) {
    drawRaindrop(drop);
  }

  updateRaindrops();
  requestAnimationFrame(draw);
}

function getRandomNeonColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Create initial raindrops
for (let i = 0; i < 100; i++) {
  drops.push(createRaindrop());
}

// Start animation loop
draw();

// Background color transition
function transitionBackgroundColor() {
  document.body.style.transition = 'background-color 10s linear';
  document.body.style.backgroundColor = getRandomNeonColor();
}

setInterval(transitionBackgroundColor, 10000); // 10000 = 10 secs
