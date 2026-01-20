const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const target = +counter.dataset.target;
  let current = 0;

  const duration = 1600; // tempo total da animação
  const startTime = performance.now();

  function animate(time) {
    const progress = Math.min((time - startTime) / duration, 1);

    // easing (suave de verdade)
    const eased = 1 - Math.pow(1 - progress, 3);

    current = Math.floor(eased * target);
    counter.innerText = current;

    counter.classList.add('active');

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      counter.innerText = target;
      counter.classList.remove('active');
      counter.classList.add('done');
    }
  }

  requestAnimationFrame(animate);
});
