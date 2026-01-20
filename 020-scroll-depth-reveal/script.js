const blocks = document.querySelectorAll('.reveal');

function onScrollReveal() {
  const triggerPoint = window.innerHeight * 0.8;

  blocks.forEach(block => {
    const top = block.getBoundingClientRect().top;

    if (top < triggerPoint) {
      block.classList.add('show');
    }
  });
}

window.addEventListener('scroll', onScrollReveal);
onScrollReveal();
