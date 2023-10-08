import * as THREE from 'three'

const sun = new THREE.DirectionalLight(0xffdddd, 2)
sun.position.set(300, 200, -100)
sun.castShadow = true

const otherLight = new THREE.AmbientLight(0xffdddd, 0.1)
export { sun, otherLight }
