const textEl = document.getElementById('text');
const speedEl = document.getElementById('speed');

const text = 'Frontend na prática todos os dias.';
let idx = 1;

function writeText() {
  textEl.innerText = text.slice(0, idx);
  idx++;

  if (idx > text.length) {
    idx = 1;
  }

  setTimeout(writeText, speedEl.value);
}

writeText();
