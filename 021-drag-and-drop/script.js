const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');

let draggedCard = null;

cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    setTimeout(() => card.style.display = 'none', 0);
  });

  card.addEventListener('dragend', () => {
    draggedCard.style.display = 'block';
    draggedCard = null;
  });
});

columns.forEach(column => {
  column.addEventListener('dragover', e => {
    e.preventDefault();
    column.classList.add('drag-over');
  });

  column.addEventListener('dragleave', () => {
    column.classList.remove('drag-over');
  });

  column.addEventListener('drop', () => {
    column.classList.remove('drag-over');
    column.appendChild(draggedCard);
  });
});
