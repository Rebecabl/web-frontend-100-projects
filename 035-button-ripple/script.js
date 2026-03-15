const button = document.querySelector('.ripple');

button.addEventListener('click', function (e) {
  const circle = document.createElement('span');
  circle.classList.add('circle');

  const rect = this.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  circle.style.left = x - 50 + 'px';
  circle.style.top = y - 50 + 'px';

  this.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 600);
});
