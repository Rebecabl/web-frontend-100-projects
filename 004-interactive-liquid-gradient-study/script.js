const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let width, height
let time = 0

function resize() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
}

window.addEventListener('resize', resize)
resize()

function draw() {
  time += 0.01

  const gradient = ctx.createLinearGradient(
    0,
    height * Math.sin(time),
    width,
    height * Math.cos(time)
  )

  gradient.addColorStop(0, '#ff6ec7')
  gradient.addColorStop(0.5, '#6a5cff')
  gradient.addColorStop(1, '#00ffd5')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  requestAnimationFrame(draw)
}

draw()
