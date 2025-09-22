<script setup>
import * as THREE from 'three'
import { onMounted, ref, computed } from 'vue'
import { Renderer, Camera, Scene, PointLight, GltfModel } from 'troisjs'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const emits = defineEmits(['updateIsLoaded'])
/**
 * Basic Three.js refs
 */
const renderer = ref(null)
const scene = ref(null)
const camera = ref(null)
const model = ref(null)

const computedRenderer = computed(() => renderer.value.renderer)
// const computedScene = computed(() => scene.value.scene)
// const computedCamera = computed(() => camera.value.camera)

/**
 * cubenvironmentMap & hdr environmentMap
 */
const cubeTextureLoader = new THREE.CubeTextureLoader()

const cubeEnvironmentMap = cubeTextureLoader.load([
  '/environment-maps/cube/cube-01/px.jpg',
  '/environment-maps/cube/cube-01/nx.jpg',
  '/environment-maps/cube/cube-01/py.jpg',
  '/environment-maps/cube/cube-01/ny.jpg',
  '/environment-maps/cube/cube-01/pz.jpg',
  '/environment-maps/cube/cube-01/nz.jpg',
])

// const hdrEnvironmentMap = ref(null)

// const loadHDR = () => {
//   const loader = new RGBELoader()
//   loader.load(
//     './src/assets/environment-maps/cyclorama_hard_light_4k.hdr',
//     (texture) => {
//       texture.mapping = THREE.EquirectangularReflectionMapping
//       hdrEnvironmentMap.value = texture
//       console.log('HDR environment map loaded')
//     },
//     undefined,
//     (error) => {
//       console.error('An error happened during loading HDR:', error)
//     },
//   )
// }

/**
 * Animation
 */
const elapsedTime = ref(0)
const elapsedTime2 = ref(0)

// const maxRotationX = Math.PI / 3  // 최대 30도 회전
// const maxRotationZ = Math.PI / 6  // 최대 30도 회전

const animate = () => {
  if (model.value && model.value.position) {
    elapsedTime.value += 0.02
    elapsedTime2.value += 0.0001
    model.value.position.y = initialPosition.value.y + 0.0001 * Math.sin(elapsedTime.value)
    model.value.rotation.y += 0.001
    model.value.rotation.z += 0.0001
    model.value.rotation.x += 0.0001

    // x와 z 축에 대해 진자 운동 효과 적용
    // model.value.rotation.x = maxRotationX * Math.sin(elapsedTime2.value * 0.5)  // 속도 조절을 위해 elapsedTime에 계수 적용
    // model.value.rotation.z = maxRotationZ * Math.sin(elapsedTime2.value * 0.5)  // 속도 조절을 위해 elapsedTime에 계수 적용

    // console.log(model.value.rotation)
  }

  requestAnimationFrame(animate)
}

/**
 * Model & Events
 */

const initialRotation = ref({ x: 0, y: Math.PI / 20, z: Math.PI / 30 })
const initialPosition = ref(new THREE.Vector3(0, -0.15, 0))
// 모델 로드 된 후
const onLoad = (e) => {
  e.scene.environment = cubeEnvironmentMap
  computedRenderer.value.encoding = THREE.sRGBEncoding
  computedRenderer.value.toneMapping = THREE.ACESFilmicToneMapping
  computedRenderer.value.shadowMap.enabled = true
  computedRenderer.value.shadowMap.type = THREE.PCFShadowMap

  e.scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMap = cubeEnvironmentMap
      child.material.envMapIntensity = 5
      child.material.needsUpdate = true
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  // computedRenderer.value.antialias = true

  setTimeout(() => {
    emits('updateIsLoaded')
  }, 1500)
}

// 모델 로드 진행 중
const onProgress = () => {
}

// 모델 로드 에러 시
const onError = () => {
}

// Vue Component Cycle
onMounted(() => {
  if (model.value && model.value.position) {
    animate()
  }
})

</script>

<template>
  <div class="display-scene">
    <Renderer ref="renderer" :alpha="true" :orbit-ctrl="true" :resize="true" :antialias="true" :auto-clear="true">
      <Camera ref="camera" :position="{ x: 0, y: -1, z: 1.5 }" :fov="15" />
      <Scene ref="scene">
        <PointLight :position="{ y: 50, z: 50 }" />
        <GltfModel ref="model" :position="initialPosition" :rotation="initialRotation"
          src="/models/potted-plant-04/potted_plant_04_4k.gltf" @load="onLoad" @progress="onProgress"
          @error="onError" />
      </Scene>
    </Renderer>
  </div>
</template>

<style lang="scss" scoped>
.display-scene {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>