const keyEl = document.getElementById("key");
const keyCodeEl = document.getElementById("keyCode");
const codeEl = document.getElementById("code");

document.addEventListener("keydown", function (event) {
  keyEl.innerText = event.key === " " ? "Espaço" : event.key;
  keyCodeEl.innerText = event.keyCode;
  codeEl.innerText = event.code;
});
