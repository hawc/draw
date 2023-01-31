<template>
  <div class="renderer">
    <div ref="main" class="main"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
  import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
  import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

  if (WebGL.isWebGL2Available() === false) {
    console.error('No WebGL2 support');
  }

  let scene;
  let camera;
  let renderer;
  let composer;
  let outlinePass;
  let outlinePass2;

  export default Vue.extend({
    data() {
      return {
        isDev: process.env.NODE_ENV === 'development',
        rotation: new THREE.Vector3(0, 0, 0),
      };
    },
    computed: {
      ...mapState(['settings']),
    },
    watch: {},
    mounted(): void {
      if (process.client) {
        this.initThree();
      }
    },
    methods: {
      initThree(): void {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          30,
          window.innerWidth / window.innerHeight,
          1,
          1000,
        );
        camera.position.z = 100;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.shadowMap.enabled = true;
        if (!this.isDev) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        this.$refs.main.appendChild(renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);

        composer = new EffectComposer(renderer);

        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        outlinePass = new OutlinePass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          scene,
          camera,
        );
        outlinePass2 = new OutlinePass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          scene,
          camera,
        );

        composer.addPass(outlinePass);
        outlinePass.visibleEdgeColor.set(0xff00000);
        outlinePass2.visibleEdgeColor.set(0xff00000);
        outlinePass.hiddenEdgeColor.set(0xff00000);
        outlinePass2.hiddenEdgeColor.set(0xff00000);

        this.initEnvironment();
        this.initContent();

        this.animate();
      },
      animate() {
        composer.render();
        scene.children.forEach((child) => {
          child.rotation.y += 0.01;
          // child.rotation.set(...this.rotation);
        });
        requestAnimationFrame(() => this.animate());
      },
      initContent() {
        const planet = new THREE.Group();
        const planetColor = 0xffffff;
        const sphereGeometry = new THREE.SphereGeometry(10, 32, 64);
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: planetColor,
        });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        planet.add(sphereMesh);

        const torusGeometry = new THREE.TorusGeometry(15, 3, 12, 120);
        const torusMaterial = new THREE.MeshBasicMaterial({
          color: planetColor,
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.rotation.x = 1.2;
        torus.scale.z = 0.1;
        console.log(torus);
        planet.add(torus);
        console.log(planet.children);

        outlinePass.selectedObjects = planet.children[0];
        outlinePass2.selectedObjects = planet.children[1];

        scene.add(planet);
      },
      initEnvironment(): void {
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        renderer.setClearColor(0x000000, 1);
        // const light = new THREE.AmbientLight(0x000000);
        // scene.add(light);
        orbitControls.update();
      },
      getSpotlight(color: THREE.Color, intensity: number): THREE.PointLight {
        const light = new THREE.PointLight(color, intensity);
        light.castShadow = true;
        light.shadow.mapSize.x = 4096;
        light.shadow.mapSize.y = 4096;

        return light;
      },
    },
  });
</script>

<style scoped>
  .renderer {
    width: 100vw;
    height: 100vh;
  }
  .main {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    height: 100%;
    width: 100%;
  }
  .box {
    display: flex;
    background-color: black;
  }
  canvas {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
  }
</style>
