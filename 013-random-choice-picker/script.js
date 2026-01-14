const textarea = document.getElementById("textarea");
const tagsEl = document.getElementById("tags");

textarea.focus();

textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);

  if (e.key === "Enter") {
    e.target.value = "";
    randomSelect();
  }
});

function createTags(input) {
  const tags = input
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag !== "");

  tagsEl.innerHTML = "";

  tags.forEach(tag => {
    const span = document.createElement("span");
    span.classList.add("tag");
    span.innerText = tag;
    tagsEl.appendChild(span);
  });
}

function randomSelect() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unHighlightTag(tag) {
  tag.classList.remove("highlight");
}
