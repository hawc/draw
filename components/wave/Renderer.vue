<template>
    <div class="renderer">
        <div ref="main"></div>
        <div class="overlay overlay--grain"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import * as THREE from 'three';

interface ScreenSize {
    x: number;
    y: number;
}

export default Vue.extend({
    computed: {
        ...mapState([
            'settings',
            'stopMultiplicator',
        ]),
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
        ...mapMutations([
            'SET_STOP_MULTIPLICATOR',
        ]),
        getVisibleScreenSize(camera: THREE.PerspectiveCamera, cameraDistance: THREE.cameraDistance): ScreenSize {
            const vFOV = THREE.MathUtils.degToRad(camera.fov);
            const height = 2 * Math.tan(vFOV / 2) * cameraDistance;
            const width = height * camera.aspect;

            return {
                x: width,
                y: height,
            };
        },
        initThree(): void {
            const CAMERA_DISTANCE = 8;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);

            scene.background = new THREE.Color(0x00000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.main.appendChild(renderer.domElement);

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
            const cube = new THREE.Mesh(geometry, material);

            camera.position.z = CAMERA_DISTANCE;
            camera.position.x = -(this.getVisibleScreenSize(camera, CAMERA_DISTANCE).x / 2);

            const animate = () => {
                requestAnimationFrame(animate);
                if (this.stopMultiplicator !== 0) {
                    updateContent();
                }
                renderer.render(scene, camera);
            };

            let lastCube = cube.clone();

            const updateContent = () => {
                const newCube = cube.clone();
                newCube.scale.x = this.settings.lineWidth;
                newCube.scale.y = this.settings.lineHeight;
                newCube.position.set(lastCube.position.x + (this.settings.lineWidth + this.settings.lineDistance), 0, 0);
                scene.add(newCube);
                camera.position.x = camera.position.x + (this.settings.lineWidth + this.settings.lineDistance);
                lastCube = newCube;
            };
            animate();
        },
    },
});
</script>
