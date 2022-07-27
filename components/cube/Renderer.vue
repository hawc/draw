<template>
    <div class="renderer">
        <div
            ref="main"
        ></div>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
    rotateR: Math.PI / 12,
    rotateB: Math.PI / 12 * 2,
    rotateG: Math.PI / 12 * 3,
    scatter: 1,
    blending: 1,
    blendingMode: 1,
    greyscale: false,
    disable: false
};

export default Vue.extend({
    computed: {
        ...mapState([
            'settings',
            'stopMultiplicator',
        ]),
    },
    data() {
        return {
            window,
        }
    },
    methods: {
        ...mapMutations([
            'SET_STOP_MULTIPLICATOR',
        ]),
        getVisibleScreenSize(camera, cameraDistance) {
            const vFOV = THREE.MathUtils.degToRad(camera.fov);
            const height = 2 * Math.tan(vFOV / 2) * cameraDistance;
            const width = height * camera.aspect;

            return {
                x: width,
                y: height,
            }
        },
        async initThree() {
            const cameraDistance = 42 * SIZE;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(12, window.innerWidth / window.innerHeight, 0.1, 2000 * SIZE);

            scene.background = new THREE.Color(0x000000);
            const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.main.appendChild(renderer.domElement);

            scene.background = new THREE.Color(0x000000);

            const bulbGeometry = new THREE.SphereBufferGeometry(0.02 * SIZE, 16, 8);
            const bulbMaterial = new THREE.MeshStandardMaterial({
                emissive: 0xffffee,
                emissiveIntensity: 1,
                color: 0x000000
            });
            OBJECTS.lights.forEach(light => {
                scene.add(this.getLight(bulbGeometry, bulbMaterial, light.position, light.intensity, light.distance));
            });

            const cubeGeometry = new THREE.BoxBufferGeometry(4 * SIZE, 4 * SIZE, 4 * SIZE);
            const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
            OBJECTS.cubes.forEach((cubeSettings, i) => {
                const cube = this.getCube(cubeGeometry, cubeMaterial, cubeSettings.position, cubeSettings.rotation);
                scene.add(cube);
            });

            scene.add(this.getPlane());

            const halftonePass = new HalftonePass(window.innerWidth, window.innerHeight, HALFTONE_PARAMS);
            
            const renderPass = new RenderPass(scene, camera);
            const composer = new EffectComposer(renderer);

            const bokehPass = new BokehPass(scene, camera, {
                focus: cameraDistance,
                aperture: 0.0005,
                maxblur: 1,
                width: window.innerWidth,
                height: window.innerHeight
            });
            bokehPass.needsSwap = true; // important to enable combination with other passes

            composer.addPass(renderPass);
            // composer.addPass(bokehPass);
            composer.addPass(halftonePass);

            camera.position.set(0.1 * SIZE, 7.8 * SIZE, cameraDistance); // lift camera...
            camera.rotation.set(-0.16, 0, 0); // ...and look down

            const animate = () => {
                requestAnimationFrame(animate);

                composer.render();
            }

            new OrbitControls(camera, renderer.domElement);
            animate();
        },
        getLight(geometry, material, position, intensity, distance) {
            const bulbLight = new THREE.PointLight(0xffffff, intensity, distance, 2);
            bulbLight.add(new THREE.Mesh(geometry, material));
            bulbLight.position.set(position.x, position.y, position.z);
            bulbLight.castShadow = true;
            bulbLight.shadow.radius = 4;
            bulbLight.shadow.mapSize.width = 2048 * 2;
            bulbLight.shadow.mapSize.height = 2048 * 2;
            bulbLight.shadow.blurSamples = 8;
            
            return bulbLight;
        },
        getCube(geometry, material, position, rotation) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(position.x * SIZE, position.y * SIZE, position.z * SIZE);
            if (rotation) {
                cube.rotation.set(rotation.x, rotation.y, rotation.z);
            }
            cube.castShadow = true;
            cube.receiveShadow = true;

            return cube;
        },
        getPlane() {
            const planeGeometry = new THREE.PlaneBufferGeometry(2000 * SIZE, 2000 * SIZE, 8, 8);
            const planeMaterial = new THREE.MeshPhongMaterial({
                color: 0x333333
            });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;
            plane.position.set(0, -2.001 * SIZE, 0);
            plane.rotation.x = -(Math.PI / 2);
            plane.rotation.z = -(Math.PI / 2);

            return plane;
        }
    },
    async mounted() {
        if (process.client) {
            await this.initThree();

            document.addEventListener('keyup', event => {
                if (event.keyCode === 32 && this.stopMultiplicator !== 0) {
                    this.SET_STOP_MULTIPLICATOR(0);
                } else {
                    this.SET_STOP_MULTIPLICATOR(1);
                }
            });
        }

    },
});
</script>