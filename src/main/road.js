import * as THREE from 'three'

const roadImg = require('../assets/imgs/roadTexture.jpg')
const roadTexture = new THREE.TextureLoader().load(roadImg)
roadTexture.wrapS = THREE.RepeatWrapping
roadTexture.wrapT = THREE.RepeatWrapping
roadTexture.repeat.set(1, 100)

const roadGeometry = new THREE.PlaneGeometry(10, 1000)
const roadMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: roadTexture
})
const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial)
roadMesh.rotation.x = -Math.PI / 2
roadMesh.position.y = -1
roadMesh.position.z = -490

export default roadMesh
