const slider = document.getElementById('slider')
const image = document.querySelector('.image-wrapper img')
const valueText = document.querySelector('.value')

slider.addEventListener('input', () => {
  const blurValue = slider.value
  image.style.filter = `blur(${blurValue}px)`
  valueText.textContent = `Desfoque: ${blurValue}px`
})
