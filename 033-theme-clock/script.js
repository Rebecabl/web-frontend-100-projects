const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const toggle = document.getElementById('toggle');

function setTime() {
  const now = new Date();

  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours();

  second.style.transform = `rotate(${s * 6}deg)`;
  minute.style.transform = `rotate(${m * 6}deg)`;
  hour.style.transform = `rotate(${h * 30}deg)`;
}

setInterval(setTime, 1000);

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    toggle.innerText = 'Modo Claro';
  } else {
    toggle.innerText = 'Modo Escuro';
  }
});
