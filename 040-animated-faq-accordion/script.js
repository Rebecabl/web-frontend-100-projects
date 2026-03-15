const questions = document.querySelectorAll('.question');

questions.forEach((q) => {
  q.addEventListener('click', () => {
    const item = q.parentElement;

    item.classList.toggle('active');
  });
});
