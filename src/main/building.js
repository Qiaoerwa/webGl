import * as THREE from 'three'
import { ROAD_WIDTH, START_Z } from '../constans'

const buildingGroup = new THREE.Group()
const buildingImg1 = require('../assets/imgs/buildingTexture1.jpg')
const buildingImg2 = require('../assets/imgs/buildingTexture2.jpg')

const buildingAry = {
  left: [
    { img: buildingImg1, size: [3, 30, 12], repeat: [0.8, 1.1] },
    { img: buildingImg2, size: [2, 4, 18], repeat: [5, 1.4] }
  ]
}

buildingAry.left.forEach((build, i) => {
  const texture = new THREE.TextureLoader().load(build.img)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(build.repeat[0], build.repeat[1])
  const buildingGeometry = new THREE.BoxGeometry(build.size[0], build.size[1], build.size[2])
  const buildingMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide
  })
  const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial)
  buildingMesh.castShadow = true
  buildingMesh.position.set(-build.size[0] / 2 - ROAD_WIDTH / 2 + 1, build.size[1] / 2, -START_Z)
  if (i > 0) {
    const depth = buildingGroup.children[i - 1].position.z - buildingAry.left[i - 1].size[2] / 2 - Math.random() * 0.5
    buildingMesh.position.z = depth - build.size[2] / 2
  }
  buildingGroup.add(buildingMesh)
})

export { buildingGroup }
