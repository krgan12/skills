document.addEventListener("DOMContentLoaded", () => {

  particlesJS("particles", {
    particles: {
      number: { value: 0 }
    }
  });

  const icons = document.querySelectorAll('.icon');

  const nodes = [];

  icons.forEach(icon => {
    const node = {
      el: icon,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5
    };
    nodes.push(node);
  });

    const title = document.querySelector('.title');
const rect = title.getBoundingClientRect();

const padding = 150;

const bounds = {
  left: rect.left - padding,
  right: rect.right + padding,
  top: rect.top - padding,
  bottom: rect.bottom + padding
};

 let isPaused = false;

  function animateIcons() {
    nodes.forEach(node => {
      const minSpeed = 0.6;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);

      if (speed < minSpeed) {
        node.vx += (Math.random() - 0.5) * 0.5;
        node.vy += (Math.random() - 0.5) * 0.5;
      }

      if (!isPaused) {
        node.x += node.vx;
        node.y += node.vy;
      }
      // bounce
      // if (node.x < bounds.left || node.x > bounds.right) node.vx *= -1;
      // if (node.y < bounds.top || node.y > bounds.bottom) node.vy *= -1;

      if (node.x < bounds.left) {
        node.x = bounds.left;
        node.vx *= -1;
      }

      if (node.x > bounds.right) {
        node.x = bounds.right;
        node.vx *= -1;
      }

      if (node.y < bounds.top) {
        node.y = bounds.top;
        node.vy *= -1;
      }

      if (node.y > bounds.bottom) {
        node.y = bounds.bottom;
        node.vy *= -1;
      }

      const maxSpeed = 1.5;
      node.vx = Math.max(-maxSpeed, Math.min(maxSpeed, node.vx));
      node.vy = Math.max(-maxSpeed, Math.min(maxSpeed, node.vy));

      node.el.style.left = node.x + "px";
      node.el.style.top = node.y + "px";
    });

    requestAnimationFrame(animateIcons);
  }

  animateIcons();

  const canvas = document.getElementById("connections");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {

    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const opacity = Math.max(0.2, 1 - dist / 400);

    ctx.beginPath();
    ctx.moveTo(nodes[i].x + 30, nodes[i].y + 30);
    ctx.lineTo(nodes[j].x + 30, nodes[j].y + 30);

    ctx.strokeStyle = `rgba(0,255,136,${opacity})`;
    ctx.lineWidth = 1.5;
    // ctx.setLineDash([4, 6]);
    ctx.setLineDash([-9, -10]);

    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00FF88";

    ctx.stroke();
  }
}

    requestAnimationFrame(drawConnections);
  }

  const toggleBtn = document.getElementById("toggleBtn");

  toggleBtn.addEventListener("click", () => {
    isPaused = !isPaused;

    toggleBtn.textContent = isPaused ? "Play" : "Pause"
  });


  drawConnections(); // 🔥 THIS WAS MISSING

});