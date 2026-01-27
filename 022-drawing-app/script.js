const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colorInput = document.getElementById('color');
const sizeInput = document.getElementById('size');
const sizeValue = document.getElementById('sizeValue');
const clearBtn = document.getElementById('clear');

canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

let painting = false;
let brushSize = sizeInput.value;
let brushColor = colorInput.value;

sizeValue.textContent = brushSize;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', endPosition);

colorInput.addEventListener('change', e => {
  brushColor = e.target.value;
});

sizeInput.addEventListener('input', e => {
  brushSize = e.target.value;
  sizeValue.textContent = brushSize;
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
