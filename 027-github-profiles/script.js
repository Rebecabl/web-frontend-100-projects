const API_URL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = '';
  }
});

async function getUser(username) {
  const res = await fetch(API_URL + username);
  const data = await res.json();

  createUserCard(data);
  getRepos(username);
}

async function getRepos(username) {
  const res = await fetch(API_URL + username + '/repos?sort=created');
  const data = await res.json();

  addReposToCard(data);
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
      <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
      <div class="user-info">
        <h2>${user.name || user.login}</h2>
        <p>${user.bio || ''}</p>

        <ul>
          <li><strong>${user.followers}</strong> seguidores</li>
          <li><strong>${user.following}</strong> seguindo</li>
          <li><strong>${user.public_repos}</strong> repos</li>
        </ul>

        <div id="repos"></div>
      </div>
    </div>
  `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos.slice(0, 6).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');

    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}
