<template>
  <div class="renderer">
    <div ref="main"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapMutations, mapState } from 'vuex';
  import * as THREE from 'three';
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
  import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { HalftonePass } from '~/assets/cube/shaders/HalftonePass.js';

  const SIZE = 1; // dynamic scene size for edge debugging
  const OBJECTS = {
    lights: [
      {
        position: { x: 50 * SIZE, y: 30 * SIZE, z: -15 * SIZE },
        intensity: 40,
        distance: 100 * SIZE,
      },
      {
        position: { x: -32 * SIZE, y: 7 * SIZE, z: -8 * SIZE },
        intensity: 7,
        distance: 1000 * SIZE,
      },
    ],
    cubes: [
      {
        position: { x: -0.7, y: 0, z: -0.75 },
        rotation: { x: 0, y: 0.17, z: 0 },
      },
      {
        position: { x: 1, y: 0, z: -5.5 },
        rotation: { x: 0, y: -0.28, z: 0 },
      },
      {
        position: { x: 3.4, y: 0, z: -11 },
        rotation: { x: 0, y: 0.36, z: 0 },
      },
      {
        position: { x: -4.5, y: 0, z: -14 },
        rotation: { x: 0, y: 0.1, z: 0 },
      },
    ],
  };

  const HALFTONE_PARAMS = {
    shape: 1,
    radius: 12,
    scatter: 0,
    blending: 1,
    blendingMode: 0,
    greyscale: false,
    hideR: false,
    hideG: true,
    hideB: true,
    disable: false,
  };

  export default Vue.extend({
    data() {
      return {
        window,
        cubes: [],
      };
    },
    computed: {
      ...mapState(['settings', 'stopMultiplicator']),
    },
    mounted() {
      if (process.client) {
        this.initThree();

        document.addEventListener('keyup', (event) => {
          if (event.keyCode === 32 && this.stopMultiplicator !== 0) {
            this.SET_STOP_MULTIPLICATOR(0);
          } else {
            this.SET_STOP_MULTIPLICATOR(1);
          }
        });
      }
    },
    methods: {
      ...mapMutations(['SET_STOP_MULTIPLICATOR']),
      initThree(): void {
        const cameraDistance = 42 * SIZE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          12,
          window.innerWidth / window.innerHeight,
          0.1,
          2000 * SIZE,
        );

        scene.background = new THREE.Color(0x000000);
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          logarithmicDepthBuffer: true,
        });
        renderer.debug.checkShaderErrors = true;
        renderer.autoClear = true;
        renderer.autoClearDepth = true;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.main.appendChild(renderer.domElement);

        scene.background = new THREE.Color(0x000000);

        const bulbGeometry = new THREE.SphereBufferGeometry(0.02 * SIZE, 16, 8);
        const bulbMaterial = new THREE.MeshBasicMaterial({
          emissive: 0xffffee,
          emissiveIntensity: 1,
          color: 0x000000,
        });
        OBJECTS.lights.forEach((light: THREE.PointLight): void => {
          scene.add(
            this.getLight(
              bulbGeometry,
              bulbMaterial,
              light.position,
              light.intensity,
              light.distance,
            ),
          );
        });

        const cubeGeometry = new THREE.BoxBufferGeometry(
          4 * SIZE,
          4 * SIZE,
          4 * SIZE,
        );
        const cubeMaterial = new THREE.MeshPhongMaterial({
          transparent: true,
          color: 0x222222,
        });
        OBJECTS.cubes.forEach((cubeSettings, i) => {
          const cube = this.getCube(
            cubeGeometry,
            cubeMaterial,
            cubeSettings.position,
            cubeSettings.rotation,
          );
          this.cubes[i] = cube;
          scene.add(cube);
        });

        scene.add(this.getPlane());

        const halftonePass = new HalftonePass(
          window.innerWidth,
          window.innerHeight,
          HALFTONE_PARAMS,
        );

        const renderPass = new RenderPass(scene, camera);
        const composer = new EffectComposer(renderer);

        const bokehPass = new BokehPass(scene, camera, {
          focus: cameraDistance,
          aperture: 0.0005,
          maxblur: 1,
          width: window.innerWidth,
          height: window.innerHeight,
        });
        bokehPass.needsSwap = true; // important to enable combination with other passes

        composer.addPass(renderPass);
        // composer.addPass(bokehPass);
        composer.addPass(halftonePass);

        camera.position.set(0.1 * SIZE, 7.8 * SIZE, cameraDistance); // lift camera...
        camera.rotation.set(-0.16, 0, 0); // ...and look down

        let keyframe = 0;
        const animate = () => {
          keyframe++;
          requestAnimationFrame(animate);
          this.switchCubeOpacity(keyframe);
          // this.switchCubes(keyframe);
          // this.switchChannels(keyframe, halftonePass);
          composer.render();
        };

        new OrbitControls(camera, renderer.domElement);
        animate();
      },
      getLight(
        geometry: THREE.SphereBufferGeometry,
        material: THREE.MeshBasicMaterial,
        position: THREE.Vector3,
        intensity: number,
        distance: number,
      ): THREE.PointLight {
        const bulbLight = new THREE.PointLight(
          0xffffff,
          intensity,
          distance,
          2,
        );
        bulbLight.add(new THREE.Mesh(geometry, material));
        bulbLight.position.set(position.x, position.y, position.z);
        bulbLight.castShadow = true;
        bulbLight.shadow.radius = 4;
        bulbLight.shadow.mapSize.width = 2048 * 2;
        bulbLight.shadow.mapSize.height = 2048 * 2;
        bulbLight.shadow.blurSamples = 8;

        return bulbLight;
      },
      getCube(
        geometry: THREE.BoxBufferGeometry,
        material: THREE.MeshPhongMaterial,
        position: THREE.Vector3,
        rotation: THREE.Vector3,
      ): THREE.Mesh {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
          position.x * SIZE,
          position.y * SIZE,
          position.z * SIZE,
        );
        if (rotation) {
          cube.rotation.set(rotation.x, rotation.y, rotation.z);
        }
        cube.castShadow = true;
        cube.receiveShadow = true;

        return cube;
      },
      getPlane(): THREE.Mesh {
        const planeGeometry = new THREE.PlaneBufferGeometry(
          2000 * SIZE,
          2000 * SIZE,
          8,
          8,
        );
        const planeMaterial = new THREE.MeshPhongMaterial({
          color: 0x333333,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.position.set(0, -2.001 * SIZE, 0);
        plane.rotation.x = -(Math.PI / 2);
        plane.rotation.z = -(Math.PI / 2);

        return plane;
      },
      switchChannels(keyframe: number, halftonePass: HalftonePass): void {
        if (keyframe % 90 === 0) {
          halftonePass.uniforms.hideR.value = false;
          halftonePass.uniforms.hideG.value = true;
          halftonePass.uniforms.hideB.value = true;
        }
        if (keyframe % 90 === 30) {
          halftonePass.uniforms.hideR.value = true;
          halftonePass.uniforms.hideG.value = false;
          halftonePass.uniforms.hideB.value = true;
        }
        if (keyframe % 90 === 60) {
          halftonePass.uniforms.hideR.value = true;
          halftonePass.uniforms.hideG.value = true;
          halftonePass.uniforms.hideB.value = false;
        }
      },
      switchCubeOpacity(keyframe: number): void {
        this.cubes[0].material.opacity = (keyframe % 100) / 100;
      },
      switchCubes(keyframe: number): void {
        if (keyframe % 90 === 0) {
          this.cubes[1].visible = true;
          this.cubes[2].visible = false;
          this.cubes[3].visible = false;
        }
        if (keyframe % 90 === 30) {
          this.cubes[1].visible = false;
          this.cubes[2].visible = true;
          this.cubes[3].visible = false;
        }
        if (keyframe % 90 === 60) {
          this.cubes[1].visible = false;
          this.cubes[2].visible = false;
          this.cubes[3].visible = true;
        }
      },
    },
  });
</script>

<style scoped>
  .renderer {
    filter: brightness(1000%) grayscale(100%) contrast(5000%);
  }
</style>
