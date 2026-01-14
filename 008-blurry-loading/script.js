const loadingText = document.getElementById('loading')
const bg = document.querySelector('.bg')

let load = 0

const interval = setInterval(blurring, 30)

function blurring() {
  load++

  if (load > 99) {
    clearInterval(interval)
  }

  loadingText.innerText = `${load}%`
  loadingText.style.opacity = scale(load, 0, 100, 1, 0)
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

function scale(num, inMin, inMax, outMin, outMax) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
