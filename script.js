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
  };
}

function drawRaindrop(drop) {
  ctx.beginPath();
  ctx.moveTo(drop.x, drop.y);
  ctx.lineTo(drop.x, drop.y + drop.length);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function updateRaindrops() {
  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    drop.y += drop.speed;

    // Reset drop when it goes beyond the canvas
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

// Create initial raindrops
for (let i = 0; i < 100; i++) {
  drops.push(createRaindrop());
}

// Start animation loop
draw();
