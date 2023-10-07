import * as THREE from 'three'
// 道路
import roadMesh from './road.js'
// 光源
import sun from './light.js'
// 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 添加光源
scene.add(sun)
// 添加道路
scene.add(roadMesh)

// 添加高楼
// var buildingGeometry = new THREE.BoxGeometry(1, 5, 1)
// var buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
// for (var i = 0; i < 10; i++) {
//   var buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial)
//   buildingMesh.position.x = Math.random() * 10 - 5
//   buildingMesh.position.y = 2.5
//   scene.add(buildingMesh)
// }

// 添加广告牌
// var adGeometry = new THREE.PlaneGeometry(2, 1)
// var adTexture = new THREE.TextureLoader().load('path_to_your_ad_image.jpg')
// var adMaterial = new THREE.MeshBasicMaterial({ map: adTexture, transparent: true })
// var adMesh = new THREE.Mesh(adGeometry, adMaterial)
// adMesh.position.y = 4
// scene.add(adMesh)

// 添加控制器
var controls = new OrbitControls(camera, renderer.domElement)

// 渲染循环
function animate() {
  requestAnimationFrame(animate)
  // sunMesh.rotation.y += 0.01
  controls.update() // 更新控制器状态
  renderer.render(scene, camera)
}
animate()
