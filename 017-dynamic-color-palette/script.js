const palette = document.getElementById("palette");
const button = document.getElementById("generate");

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function generatePalette() {
  palette.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = randomColor();
    const div = document.createElement("div");

    div.classList.add("color");
    div.style.background = color;

    const text = document.createElement("span");
    text.innerText = color.toUpperCase();

    div.appendChild(text);

    div.addEventListener("click", () => {
      navigator.clipboard.writeText(color);
      div.classList.add("copied");

      setTimeout(() => {
        div.classList.remove("copied");
      }, 800);
    });

    palette.appendChild(div);
  }
}

button.addEventListener("click", generatePalette);

generatePalette();
