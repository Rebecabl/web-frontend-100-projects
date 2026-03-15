const button = document.getElementById('btn');
const code = document.getElementById('code');

function randomColor() {
  return Math.floor(Math.random() * 255);
}

function generateGradient() {
  const color1 = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
  const color2 = `rgb(${randomColor()},${randomColor()},${randomColor()})`;

  const gradient = `linear-gradient(90deg, ${color1}, ${color2})`;

  document.body.style.background = gradient;

  code.textContent = gradient;
}

button.addEventListener('click', generateGradient);
