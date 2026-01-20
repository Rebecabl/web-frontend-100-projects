const comparison = document.querySelector('.comparison');
const after = document.querySelector('.after');
const lens = document.querySelector('.lens');

comparison.addEventListener('mousemove', (e) => {
  const rect = comparison.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  after.style.clipPath = `circle(60px at ${x}px ${y}px)`;

  lens.style.left = `${x}px`;
  lens.style.top = `${y}px`;
  lens.style.opacity = 1;
});

comparison.addEventListener('mouseleave', () => {
  after.style.clipPath = 'circle(0 at 50% 50%)';
  lens.style.opacity = 0;
});
