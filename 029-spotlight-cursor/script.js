const spotlight = document.getElementById('spotlight');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  spotlight.style.background = `
    radial-gradient(
      circle 160px at ${x}px ${y}px,
      transparent 0%,
      rgba(0,0,0,0.96) 80%
    )
  `;
});
