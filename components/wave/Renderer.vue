<template>
    <div class="renderer">
        <div ref="main"></div>
        <div class="overlay overlay--wave"></div>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import * as THREE from 'three';

export default Vue.extend({
    computed: {
        ...mapState([
            'settings',
            'stopMultiplicator',
        ]),
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
            const CAMERA_DISTANCE = 8;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);

            scene.background = new THREE.Color(0x00000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.main.appendChild(renderer.domElement);

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const cube = new THREE.Mesh(geometry, material);

            camera.position.z = CAMERA_DISTANCE;
            camera.position.x = -(this.getVisibleScreenSize(camera, CAMERA_DISTANCE).x / 2);

            const animate = () => {
                requestAnimationFrame(animate);
                if (this.stopMultiplicator !== 0) {
                    updateContent();
                }
                renderer.render(scene, camera);
            }

            let keyframe = 0;
            let lastCube = cube.clone();

            const updateContent = () => {
                keyframe++;
                // if ((keyframe % (11 - Math.floor(10 * this.settings.speed))) === 0) {
                const newCube = cube.clone();
                newCube.scale.x = this.settings.lineWidth;
                newCube.scale.y = this.settings.lineHeight;
                newCube.position.set(lastCube.position.x + (this.settings.lineWidth + this.settings.lineDistance), 0, 0);
                scene.add(newCube);
                camera.position.x = camera.position.x + (this.settings.lineWidth + this.settings.lineDistance);
                lastCube = newCube;
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

<style>
main.wave {
    filter: brightness(105%) grayscale(100%) contrast(5000%);
}
.overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: scale(2) translate(-50%, -50%);
    pointer-events: none;
}
.overlay--wave {
    background-image: url(https://grainy-gradients.vercel.app/noise.svg);
    filter: contrast(110%) brightness(100%);
}
</style>