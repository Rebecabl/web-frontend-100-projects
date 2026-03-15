const btn = document.getElementById('btn');
const colorText = document.getElementById('color');

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

btn.addEventListener('click', () => {
  const color = '#' + randomColor();

  document.body.style.background = color;
  colorText.innerText = color;
});
