<script setup>
  import * as THREE from 'three'
  import { onMounted, ref, computed } from 'vue'
  import { Renderer, Camera, Scene, PointLight, GltfModel } from 'troisjs'
  // import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

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
    './src/assets/environment-maps/cube/cube-01/px.jpg',
    './src/assets/environment-maps/cube/cube-01/nx.jpg',
    './src/assets/environment-maps/cube/cube-01/py.jpg',
    './src/assets/environment-maps/cube/cube-01/ny.jpg',
    './src/assets/environment-maps/cube/cube-01/pz.jpg',
    './src/assets/environment-maps/cube/cube-01/nz.jpg',
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

  const animate = () => {
    if (model.value && model.value.position) {
      elapsedTime.value += 0.02
      model.value.position.y = initialPosition.value.y + 0.0001 * Math.sin(elapsedTime.value)
      model.value.rotation.y += 0.001
      model.value.rotation.z += 0.0001
    }

    requestAnimationFrame(animate)
  }

  /**
   * Model & Events
   */

  const initialRotation = ref({ x: 0, y: Math.PI / 20 , z: Math.PI / 30 })
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

    computedRenderer.value.antialias = true
  }

  // 모델 로드 진행 중
  const onProgress = () => {
  }

  // 모델 로드 에러 시
  const onError = () => {
  }

  // Vue Component Cycle
  onMounted(()=>{
    if (model.value && model.value.position) {
      animate()
    }
  })

</script>

<template>
  <section>
    <Renderer
      ref="renderer"
      :alpha="true"
      :orbit-ctrl="true"
      :resize="true"
    >
      <Camera
        ref="camera"
        :position="{ x: 0, y: -1, z: 1.5 }"
        :fov="15"
      />
      <Scene ref="scene">
        <PointLight :position="{ y: 50, z: 50 }" />
        <GltfModel
          ref="model"
          :position="initialPosition"
          :rotation="initialRotation"
          src="./src/assets/models/potted-plant-04/potted_plant_04_4k.gltf"
          @load="onLoad"
          @progress="onProgress"
          @error="onError"
        />
      </Scene>
    </Renderer>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>