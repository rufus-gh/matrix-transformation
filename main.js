const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

  overallMatrix = math.multiply(matrix, overallMatrix);

  draw();
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
    // vertical lines
    for (let x=Math.trunc(canvas.width / 4);x<canvas.width;x+=Math.trunc(canvas.width / 70)) {
      drawLine(x,0,x,canvas.height);
    }
    for (let y=Math.trunc(canvas.height / 4);y<canvas.height;y+=Math.trunc(canvas.width / 70)) {
      drawLine(0,y,canvas.width,y);
    }

    for (let x=Math.trunc(canvas.width / 4);x>0;x-=Math.trunc(canvas.width / 70)) {
      drawLine(x,0,x,canvas.height);
    }
    for (let y=Math.trunc(canvas.height / 4);y>0;y-=Math.trunc(canvas.width / 70)) {
      drawLine(0,y,canvas.width,y);
    }

    ctx.beginPath();
    ctx.arc(canvasCoords(0,0)[0], canvasCoords(0,0)[1], 5, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    drawLine(0, Math.trunc(canvas.height / 4), canvas.width, Math.trunc(canvas.height / 4), 5, "white");
    drawLine(Math.trunc(canvas.width / 4), 0, Math.trunc(canvas.width / 4), canvas.height, 5, "white");
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  drawGrid();
  //drawVector(2, 0);
  drawVector(0, 2);
}

window.addEventListener('resize', resize);
resize();