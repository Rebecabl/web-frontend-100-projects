const smallCups = document.querySelectorAll('.cup');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, index) => {
  cup.addEventListener('click', () => highlightCups(index));
});

function highlightCups(index) {
  if (
    smallCups[index].classList.contains('full') &&
    !smallCups[index].nextElementSibling?.classList.contains('full')
  ) {
    index--;
  }

  smallCups.forEach((cup, idx) => {
    if (idx <= index) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.height = 0;
    percentage.innerText = '';
  } else {
    const percent = (fullCups / totalCups) * 100;
    percentage.style.height = `${percent}%`;
    percentage.innerText = `${percent}%`;
  }

  const remainingLiters = 2 - (250 * fullCups) / 1000;
  liters.innerText = `${remainingLiters.toFixed(2)}L`;
}
