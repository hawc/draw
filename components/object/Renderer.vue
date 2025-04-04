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
  import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
  import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
  import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
  import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
  import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
  import { GRAIN_SHADER } from 'assets/beton/shaders/grainShader';

  interface BloomParameters {
    [key: string]: string | number | null;
  }

  export default Vue.extend({
    computed: {
      ...mapState(['settings', 'stopMultiplicator']),
    },
    mounted() {
      this.initThree();

      document.addEventListener('keyup', (event) => {
        if (event.keyCode === 32 && this.stopMultiplicator !== 0) {
          this.SET_STOP_MULTIPLICATOR(0);
        } else {
          this.SET_STOP_MULTIPLICATOR(1);
        }
      });
    },
    methods: {
      ...mapMutations(['SET_STOP_MULTIPLICATOR']),
      initThree(): void {
        let params: BloomParameters = {
          exposure: this.settings.exposure,
          bloomThreshold: 0,
          bloomStrength: this.settings.bloomStrength,
          bloomRadius: this.settings.bloomRadius,
        };

        const CAMERA_DISTANCE = 8;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          0.1,
          2000,
        );

        scene.background = new THREE.Color(0x000000);
        const renderer = new THREE.WebGLRenderer({ antialias: false });
        // pixelation is fine for crt display
        // renderer.setPixelRatio(window.devicePixelRatio);
        // renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.main.appendChild(renderer.domElement);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          1.5,
          0.4,
          0.85,
        );

        bloomPass.exposure = params.exposure;
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(bloomPass);

        const grainPass = new ShaderPass(GRAIN_SHADER);
        composer.addPass(grainPass);

        const RGBShift = new ShaderPass(RGBShiftShader);
        RGBShift.uniforms.amount.value = 0;
        composer.addPass(RGBShift);

        composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.ConeGeometry(6, 9, 4, 1, true);
        geometry.parameters.openEnded = true;
        const edges = new THREE.EdgesGeometry(geometry);
        const geo = new LineSegmentsGeometry().fromEdgesGeometry(edges);
        const matLine = new LineMaterial({
          color: 0xff2222,
          linewidth: this.settings.lineWidth,
          dashed: false,
        });
        matLine.resolution.set(window.innerWidth, window.innerHeight);
        const line = new Wireframe(geo, matLine);
        line.computeLineDistances();
        line.scale.set(1, 1, 1);
        scene.add(line);
        line.position.set(0, 0, -10);
        line.scale.set(
          this.settings.size,
          this.settings.size,
          this.settings.size,
        );

        const line2 = line.clone();
        line2.scale.set(0.3, 0.3, 0.3);
        line2.position.set(0, 6, -10);
        line2.visible = false;
        scene.add(line2);

        const line3 = line.clone();
        line3.scale.set(0.3, 0.3, 0.3);
        line3.position.set(0, -6, -10);
        line2.visible = false;
        scene.add(line3);

        camera.position.set(0, 0, CAMERA_DISTANCE);

        // Too many filters - not enough performance :(

        // let counter = 1.0;
        // const grainPass = new ShaderPass(GRAIN_SHADER);
        // grainPass.renderToScreen = true;
        // composer.addPass(grainPass);

        const animate = () => {
          // counter += 0.01;
          // grainPass.uniforms["amount"].value = counter;
          requestAnimationFrame(animate);
          if (this.stopMultiplicator !== 0) {
            updateContent();
            grainPass.uniforms.rand.value = Math.random();
          }
          composer.render();
        };

        let rotation = 0;

        const updateContent = () => {
          matLine.linewidth = this.settings.lineWidth;
          params = {
            exposure: this.settings.exposure,
            bloomStrength: this.settings.bloomStrength,
            bloomRadius: this.settings.bloomRadius,
          };
          bloomPass.strength = params.bloomStrength;
          bloomPass.radius = params.bloomRadius;
          rotation = rotation + (6 * this.settings.speed) / 180;
          line.rotation.set(0, rotation, 0);
          line2.rotation.set(0, rotation, 0);
          line3.rotation.set(0, rotation, 0);
          // line.scale.y = this.settings.lineHeight;
          line.scale.set(
            this.settings.size,
            this.settings.size,
            this.settings.size,
          );
          // line2.scale.set(0.5 * this.settings.size, 0.5 * this.settings.size, 0.5 * this.settings.size);
          // camera.position.set(0, 0, CAMERA_DISTANCE - this.settings.size);
          camera.position.set(0, 0, CAMERA_DISTANCE);
          line2.visible = this.settings.showSecondary > 0.25;
          line3.visible = this.settings.showSecondary > 0.25;
          if (this.settings.showSecondary > 0.5) {
            RGBShift.uniforms.amount.value = Math.random() / 50;
          } else {
            RGBShift.uniforms.amount.value = 0;
          }
        };
        animate();
      },
    },
  });
</script>
