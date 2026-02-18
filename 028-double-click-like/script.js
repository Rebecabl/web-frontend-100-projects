const img = document.getElementById('img');
const heart = document.getElementById('heart');
const count = document.getElementById('count');

let likes = 0;

img.addEventListener('dblclick', () => {
  likes++;
  count.textContent = likes;

  heart.classList.add('active');

  setTimeout(() => {
    heart.classList.remove('active');
  }, 600);
});
