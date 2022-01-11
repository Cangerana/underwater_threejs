import * as THREE from 'https://cdn.skypack.dev/three@0.126.1';
import * as dat from 'dat.gui'


const gui = new dat.GUI()
const world = {
  plane: {
    width: 10,
  }
}

gui.add(world.plane, 'width', 1, 500)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)

document.body.appendChild(renderer.domElement)

camera.position.z = 5

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10)
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(planeMesh)

const { array } = planeMesh.geometry.attributes.position

for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]
    array[i+2] = z + Math.random()
}

const light = new THREE.DirectionalLight(
    0xFFFFFF,
    1
)

light.position.set(0, 0, 1)

scene.add(light)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()