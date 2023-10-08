import * as THREE from 'three'
// 道路
import roadMesh from './road.js'
// 光源
import { sun, otherLight } from './light.js'
// 轨道控制器
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { buildingGroup } from './building.js'
import { Clock } from 'three'
import { SPEED, CAMERA_HEIGHT, START_Z } from '../constans/index.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

// 创建场景
export const scene = new THREE.Scene()

const sky = require('../assets/hdr/sky.hdr')
new RGBELoader().load(sky, (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.flipY = true
  scene.background = texture
})

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.aspect = window.innerWidth / window.innerHeight

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 添加光源
scene.add(sun)
scene.add(otherLight)
// 添加道路
scene.add(roadMesh)
// 添加高楼
scene.add(buildingGroup)

// 添加控制器
var controls = new PointerLockControls(camera, document.body)
controls.getObject().position.set(0, CAMERA_HEIGHT, -START_Z)
scene.add(controls.getObject())

window.addEventListener(
  'resize',
  () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  },
  false
)

document.addEventListener(
  'click',
  () => {
    // 锁定鼠标光标
    document.body.requestPointerLock =
      document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock
    document.body.requestPointerLock()
  },
  false
)

document.addEventListener('keydown', onKeyDown, false)
document.addEventListener('keyup', onKeyUp, false)

let moveForward = false,
  moveBackward = false,
  moveLeft = false,
  moveRight = false,
  accelerate = false

const clock = new Clock()
const control = controls.getObject()
const velocity = new THREE.Vector3()
const direction = new THREE.Vector3()

function onKeyDown(event) {
  switch (event.keyCode) {
    case 87: // w
      moveForward = true
      break
    case 83: // s
      moveBackward = true
      break
    case 65: // a
      moveLeft = true
      break
    case 68: // d
      moveRight = true
      break
    case 32: // space
      accelerate = true
      break
  }
}

function onKeyUp(event) {
  switch (event.keyCode) {
    case 87: // w
      moveForward = false
      break
    case 83: // s
      moveBackward = false
      break
    case 65: // a
      moveLeft = false
      break
    case 68: // d
      moveRight = false
      break
    case 32: // space
      accelerate = false
      break
  }
}

function move() {
  const delta = clock.getDelta()
  velocity.z -= velocity.z * 6 * delta
  velocity.x -= velocity.x * 6 * delta
  direction.z = Number(moveForward) - Number(moveBackward)
  direction.x = Number(moveLeft) - Number(moveRight)
  direction.normalize()
  let s = accelerate ? 2 : 1
  if (moveForward || moveBackward) {
    velocity.z -= direction.z * SPEED * delta * s
  }
  if (moveRight || moveLeft) {
    velocity.x -= direction.x * SPEED * delta * s
  }
  //根据速度值移动控制器
  control.translateZ(velocity.z * delta)
  control.translateX(velocity.x * delta)
  control.position.y = CAMERA_HEIGHT
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate)
  move()
  renderer.render(scene, camera)
}
animate()
