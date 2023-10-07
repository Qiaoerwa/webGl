import * as THREE from 'three'

const sun = new THREE.DirectionalLight(0xffdddd, 1)
sun.position.set(30, 60, -20)
sun.castShadow = true

export default sun
