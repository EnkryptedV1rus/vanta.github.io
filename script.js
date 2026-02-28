const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: -9999, y: -9999 };
const dpr = window.devicePixelRatio || 1;

/* ===== RESIZE ===== */
function resize() {
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener("resize", resize);

/* ===== MOUSE TRACKING ===== */
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  document.documentElement.style.setProperty("--x", e.clientX + "px");
  document.documentElement.style.setProperty("--y", e.clientY + "px");
});

window.addEventListener("mouseleave", () => {
  mouse.x = -9999;
  mouse.y = -9999;
});

/* ===== PARTICLE CLASS ===== */
class Particle {
  constructor() {
    this.baseX = Math.random() * window.innerWidth;
    this.baseY = Math.random() * window.innerHeight;
    this.x = this.baseX;
    this.y = this.baseY;
    this.size = Math.random() * 1.6 + 0.4;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 120;

    // 🔥 repel from mouse
    if (dist < repelRadius) {
      const force = (repelRadius - dist) / repelRadius;
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * force * 0.7;
      this.vy += Math.sin(angle) * force * 0.7;
    }

    // smooth return home
    this.vx += (this.baseX - this.x) * 0.01;
    this.vy += (this.baseY - this.y) * 0.01;

    // friction
    this.vx *= 0.92;
    this.vy *= 0.92;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ===== INIT ===== */
function initParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 6);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();

/* ===== LOOP ===== */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}
animate();
