const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0a0e27)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(2, 2)

const uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
}

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;

    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    float noise(vec2 p) {
      return sin(p.x) * sin(p.y);
    }

    void main() {
      vec2 uv = vUv;

      float t = uTime * 0.5;

      float n =
        sin((uv.x + t) * 6.0) +
        sin((uv.y + t) * 6.0) +
        sin((uv.x + uv.y + t) * 6.0);

      float mouseDist = distance(uv, uMouse);
      n += 0.6 / (mouseDist + 0.2);

      vec3 color1 = vec3(0.95, 0.35, 0.15);
      vec3 color2 = vec3(0.04, 0.05, 0.15);

      vec3 color = mix(color1, color2, n * 0.15 + 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

function animate() {
  uniforms.uTime.value += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()

window.addEventListener('mousemove', (e) => {
  uniforms.uMouse.value.x = e.clientX / window.innerWidth
  uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight
})

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
})
