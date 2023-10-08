import * as THREE from 'three'
import { ROAD_LENGTH, ROAD_WIDTH } from '../constans'

const roadImg = require('../assets/imgs/roadTexture.jpg')
const roadTexture = new THREE.TextureLoader().load(roadImg)
roadTexture.wrapS = THREE.RepeatWrapping
roadTexture.wrapT = THREE.RepeatWrapping
roadTexture.repeat.set(1, 100)

const roadGeometry = new THREE.PlaneGeometry(100, ROAD_LENGTH)
const roadMaterial = new THREE.MeshStandardMaterial({ map: roadTexture })
const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial)
roadMesh.receiveShadow = true

roadMesh.rotation.x = -Math.PI / 2
roadMesh.position.z = -ROAD_LENGTH / 2 + 10
roadMesh.position.y = -0.001

export default roadMesh
