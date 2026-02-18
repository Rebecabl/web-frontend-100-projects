const btn = document.getElementById('btn');
const container = document.getElementById('toast-container');

btn.addEventListener('click', () => {
  createToast();
});

function createToast() {
  const toast = document.createElement('div');
  toast.classList.add('toast');

  const mensagens = [
    'Salvo com sucesso',
    'Alteração aplicada',
    'Bem-vindo',
    'Notificação enviada',
    'Atualizado',
  ];

  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
  toast.innerText = msg;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
