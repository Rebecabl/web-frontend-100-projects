document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  document.body.style.background = `radial-gradient(circle at ${x}px ${y}px,#3498db,#111)`;
});
