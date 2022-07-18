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
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
        initThree() {
            let params = {
                exposure: this.settings.exposure,
                bloomThreshold: 0,
                bloomStrength: this.settings.bloomStrength,
                bloomRadius: this.settings.bloomRadius,
            };

            const CAMERA_DISTANCE = 50;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 2000);

            camera.useQuaternion = true;
            var am_light = new THREE.AmbientLight(0x555555); // soft white light
            scene.add(am_light);

            scene.background = new THREE.Color(0x000000);
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            // renderer.toneMapping = THREE.ReinhardToneMapping;
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.$refs.main.appendChild(renderer.domElement);
/*
            const light = new THREE.SpotLight();
            light.intensity = 10;
            light.target = scene;
            light.castShadow = true;
            light.position.set(100, 15, -10);
            // light.position.set(0,0,2);
            // light.rotation.set(0.25,40,20);
            // light.shadow.mapSize.width = 512;
            // light.shadow.mapSize.height = 512;
            // light.shadow.camera.near = 0.25;
            // light.shadow.camera.far = 100;
            light.shadow.camera.fov = 1;
            // light.shadow.camera.position.set(200,200,0);
            // light.shadow.camera.rotation.set(-0.1,1,0);
            scene.add(light);
*/

            const bulbGeometry = new THREE.SphereBufferGeometry(0.02, 16, 8);
            const bulbLight = new THREE.DirectionalLight(0xffffff, 5, 100, 2);
            const bulbMat = new THREE.MeshStandardMaterial({
                emissive: 0xffffee,
                emissiveIntensity: 1,
                color: 0x000000
            });
            bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
            bulbLight.position.set(10, 5, -2);
            bulbLight.castShadow = true;
            scene.add(bulbLight); 
            
            const bulbLight2 = new THREE.DirectionalLight(0xffffff, 5, 100, 2);
            bulbLight2.add(new THREE.Mesh(bulbGeometry, bulbMat));
            bulbLight2.position.set(-15, 5, -5);
            bulbLight2.castShadow = true;
            scene.add(bulbLight2);
            // const helper = new THREE.CameraHelper(light.shadow.camera);
            // scene.add(helper);

            // new OrbitControls(camera, renderer.domElement)
            
            const composer = new EffectComposer(renderer);
            const renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass);

            const bokehPass = new BokehPass(scene, camera, {
                focus: 2,
                aperture: 0.00006,
                maxblur: 0.03,
                width: window.innerWidth,
                height: window.innerHeight
            });
            bokehPass.renderToScreen = true;
            composer.addPass(bokehPass);

            // const RGBShift = new ShaderPass(RGBShiftShader);
            // RGBShift.uniforms['amount'].value = 0;
            // composer.addPass(RGBShift);


            const geometry = new THREE.BoxBufferGeometry(4, 4, 4);
            const material = new THREE.MeshPhongMaterial({ color: 0x222222 });
            const cube = new THREE.Mesh(geometry, material);
            const cube2 = new THREE.Mesh(geometry, material);
            const cube3 = new THREE.Mesh(geometry, material);
            cube.position.set(5, 0, -15);
            cube2.position.set(10, 0, -50);
            cube3.position.set(2, 0, -3);
            cube.rotation.set(0, -5, 0);
            cube3.rotation.set(0, 0.1, 0);
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube2.castShadow = true;
            cube2.receiveShadow = true;
            cube3.castShadow = true;
            cube3.receiveShadow = true;
            scene.add(cube);
            scene.add(cube2);
            scene.add(cube3);
            bulbLight.target = cube3;
            bulbLight2.target = cube3;

            var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
            var mat = new THREE.MeshPhongMaterial({ color: 0x333333, side: THREE.DoubleSide });
            var plane = new THREE.Mesh(geo, mat);
            plane.receiveShadow = true;
            plane.position.set(0,-2.03,0);
            plane.rotation.x = -(Math.PI / 2);
            plane.rotation.z = -(Math.PI / 2);
            scene.add(plane);

            camera.position.set(0, 7, CAMERA_DISTANCE); // lift camera...
            camera.rotation.set(-0.12, 0, 0); // ... and look down

            const animate = () => {
                requestAnimationFrame(animate);
                if (this.stopMultiplicator !== 0) {
                    updateContent();
                }
                composer.render();
            }

            let rotation = 0;

            const updateContent = () => {
                // rotation = rotation + (6 * this.settings.speed / 180);
                // cube.rotation.set(0, rotation, 0);
                // camera.position.set(0, 0, CAMERA_DISTANCE);
                // if (this.settings.showSecondary > 0.5) {
                //     RGBShift.uniforms['amount'].value = Math.random() / 50;
                // } else {
                //     RGBShift.uniforms['amount'].value = 0;
                // }
            }
            animate();
        },
    },
    mounted() {
        this.initThree();

        document.addEventListener('keyup', event => {
            if (event.keyCode === 32 && this.stopMultiplicator !== 0) {
                this.SET_STOP_MULTIPLICATOR(0);
            } else {
                this.SET_STOP_MULTIPLICATOR(1);
            }
        });
    },
});
</script>