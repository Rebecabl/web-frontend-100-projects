const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let currentStep = 1;

next.addEventListener('click', () => {
  currentStep++;
  if (currentStep > circles.length) {
    currentStep = circles.length;
  }
  update();
});

prev.addEventListener('click', () => {
  currentStep--;
  if (currentStep < 1) {
    currentStep = 1;
  }
  update();
});

function update() {
  circles.forEach((circle, index) => {
    if (index < currentStep) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });

  progress.style.width =
    ((currentStep - 1) / (circles.length - 1)) * 100 + '%';

  prev.disabled = currentStep === 1;
  next.disabled = currentStep === circles.length;
}
