const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = window.innerWidth;
  const cssHeight = window.innerHeight;

  canvas.style.width = cssWidth + 'px';
  canvas.style.height = cssHeight + 'px';

  canvas.width = Math.round(cssWidth * dpr);
  canvas.height = Math.round(cssHeight * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw(cssWidth, cssHeight);
}

function draw(w, h) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#9bd';
  ctx.font = '20px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
  ctx.fillText('Matrix Transformation Visualiser', 16, 36);
}

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
window.addEventListener('DOMContentLoaded', resize);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  resize();
}
