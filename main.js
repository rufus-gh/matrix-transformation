const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fpsDisplay = document.getElementById('fps');

let overallMatrix = [[1,0],[0,1]];
matrix = overallMatrix;

const inputs = document.querySelectorAll(".matrix-input");

function readMatrixFromInputs() {
  const a = parseFloat(inputs[0].value) || 0;
  const b = parseFloat(inputs[1].value) || 0;
  const c = parseFloat(inputs[2].value) || 0;
  const d = parseFloat(inputs[3].value) || 0;

  matrix = [
    [a, b],
    [c, d]
  ];

  startMatrix = overallMatrix;
  goalMatrix = math.multiply(matrix, overallMatrix);

  smooth(0);
}

function smooth(t) {
  overallMatrix = math.add(math.multiply(startMatrix, 1-t), math.multiply(goalMatrix, t));

  t += 0.1

  document.querySelector('#applyBtn').disabled = true;

  if (t <= 1) {
    setTimeout(()=> {smooth(t)}, 20);
  } else {
    document.querySelector('#applyBtn').disabled = false;
  }
}

function reset() {
  overallMatrix = [[1,0],[0,1]];
  draw();
}

document.getElementById("applyBtn").addEventListener("click", readMatrixFromInputs);
document.getElementById("reset").addEventListener("click", reset);

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw();
}

function drawLine(x1, y1, x2, y2, thickness=3, color="#b0b0b0ff") {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.stroke();
}

function canvasCoords(x, y) {

  let array = [x, y];

  x = math.multiply(overallMatrix, array)[0];
  y = math.multiply(overallMatrix, array)[1];

  canvasX = Math.trunc(canvas.width / 4) + x*Math.trunc(canvas.width / 70);
  canvasY = Math.trunc(canvas.height / 4) - y*Math.trunc(canvas.width / 70);
    
  return [canvasX, canvasY]
}

function drawVector(x, y) {
  let [x1, y1] = canvasCoords(0,0);
  let [x2, y2] = canvasCoords(x,y);

  drawLine(x1, y1, x2, y2, 5, "red");
  ctx.beginPath();
  ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

function drawGrid() {
    const gridSpacing = Math.trunc(canvas.width / 70);
    const gridRange = 100;
    
    for (let x = -gridRange; x <= gridRange; x++) {
      let [x1, y1] = canvasCoords(x, -gridRange);
      let [x2, y2] = canvasCoords(x, gridRange);
      drawLine(x1, y1, x2, y2);
    }
    
    for (let y = -gridRange; y <= gridRange; y++) {
      let [x1, y1] = canvasCoords(-gridRange, y);
      let [x2, y2] = canvasCoords(gridRange, y);
      drawLine(x1, y1, x2, y2);
    }

    ctx.beginPath();
    ctx.arc(canvasCoords(0,0)[0], canvasCoords(0,0)[1], 5, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    let [axisX1, axisY1] = canvasCoords(-gridRange, 0);
    let [axisX2, axisY2] = canvasCoords(gridRange, 0);
    drawLine(axisX1, axisY1, axisX2, axisY2, 5, "white");
    
    let [axisX3, axisY3] = canvasCoords(0, -gridRange);
    let [axisX4, axisY4] = canvasCoords(0, gridRange);
    drawLine(axisX3, axisY3, axisX4, axisY4, 5, "white");
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  drawGrid();
  //drawVector(2, 0);
  drawVector(0, 2);
}

let lastFpsSample = performance.now();
let frameCount = 0;

function render(now) {
  frameCount += 1;

  if (now - lastFpsSample >= 500) {
    const fps = Math.round((frameCount * 1000) / (now - lastFpsSample));
    fpsDisplay.textContent = `FPS: ${fps}`;
    frameCount = 0;
    lastFpsSample = now;
  }

  draw();
  requestAnimationFrame(render);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(render);