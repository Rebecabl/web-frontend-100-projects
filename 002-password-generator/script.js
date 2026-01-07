const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*(){}[]=<>/,.';

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

generateEl.addEventListener('click', () => {
  let password = '';
  const length = +lengthEl.value;

  let chars = '';
  if (uppercaseEl.checked) chars += upperLetters;
  if (lowercaseEl.checked) chars += lowerLetters;
  if (numbersEl.checked) chars += numbers;
  if (symbolsEl.checked) chars += symbols;

  if (chars === '') {
    resultEl.innerText = 'Selecione ao menos uma opção';
    return;
  }

  for (let i = 0; i < length; i++) {
    password += getRandomChar(chars);
  }

  resultEl.innerText = password;
});
