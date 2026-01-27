const panel = document.getElementById('statusPanel')
const label = panel.querySelector('.status-label')
const description = document.getElementById('description')
const buttons = document.querySelectorAll('button')

const states = {
  idle: {
    text: 'Em espera',
    desc: 'O sistema está aguardando uma ação para iniciar.'
  },
  processing: {
    text: 'Processando',
    desc: 'O sistema está executando tarefas em segundo plano.'
  },
  success: {
    text: 'Concluído',
    desc: 'A operação foi finalizada com sucesso.'
  },
  error: {
    text: 'Erro',
    desc: 'Ocorreu um problema durante a execução.'
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const status = button.dataset.status

    panel.className = `status-panel ${status}`
    label.textContent = states[status].text
    description.textContent = states[status].desc
  })
})
