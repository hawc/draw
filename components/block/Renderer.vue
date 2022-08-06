<template>
    <div class="renderer">
        <div
            ref="main"
        ></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { concreteTexture, metalTexture } from '~/static/textures/textures';

const SIZE = 1; // dynamic scene size for edge debugging

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
    disable: false
};

type ScreenSize = {
    x: number,
    y: number,
}

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
            cubes: [],
        }
    },
    methods: {
        ...mapMutations([
            'SET_STOP_MULTIPLICATOR',
        ]),
        async initThree(): Promise<void> {
            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(
                // Field of view
                45,
                // Aspect ratio
                window.innerWidth / window.innerHeight,
                // Near clipping plane (beyond which nothing is visible)
                1,
                // Far clipping plane (beyond which nothing is visible)
                1000
            );


            /**
             * Create a Three.js sphere.
             * @param {number} radius The sphere's radius in Units.
             * @return The Three.js sphere
             */
            const getCube = (radius, material) => {
                const cubeGeometry = new THREE.BoxBufferGeometry(radius * 2, radius * 2, radius * 2);
                const cubeMaterial = new THREE.MeshPhysicalMaterial(material);
                // const geo = new THREE.BoxGeometry(radius * 5, radius * 5, radius * 5);
                // const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
                mesh.castShadow = true;

                return mesh;
            };

            /**
             * Create a Three.js plane with both sides rendered.
             * @param {number} w The plane's width
             * @param {number} h The plane's height
             * @return The Three.js plane
             */
            const plane = (w, h) => {
                const geo = new THREE.PlaneGeometry(w, h);
                const material = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    side: THREE.DoubleSide,
                });
                const mesh = new THREE.Mesh(geo, material);
                mesh.receiveShadow = true;

                return mesh;
            }

            /**
             * Create a Three.js spotlight
             * @param {number} color The light's color (preferably in hexadecimal)
             * @param {number} intensity The light's intensity
             * @return The Three.js spotlight
             */
            const spotlight = (color, intensity) => {
                const light = new THREE.PointLight(color, intensity);
                light.castShadow = true;
                light.shadow.mapSize.x = 4096;
                light.shadow.mapSize.y = 4096;

                return light;
            }

            /**
             * Url to a concrete texture from https://codepen.io/jo12bar/pen/LjgVgV
             * @return The url
             */
            const concreteTextureUrl = () => concreteTexture;

            /**
             * Url to a metal texture from https://codepen.io/jo12bar/pen/GvYpgM
             * @return The url
             */
            const metalTextureUrl = () => metalTexture;


            const textureLoader = new THREE.TextureLoader();


            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.25;
            renderer.shadowMap.enabled = true;

            this.$refs.main.appendChild(renderer.domElement);
            renderer.setSize(window.innerWidth, window.innerHeight);

            let envmaploader = new THREE.PMREMGenerator(renderer);

            let box1;
            let box1Material;

            new RGBELoader().setPath('/hdr/').load('dikhololo_night_2k.hdr', function (hdrmap) {
                let envmap = envmaploader.fromCubemap(hdrmap);
                // Add a sphere
                box1 = getCube(2, { color: 0x222222, envMap: envmap.texture });
                scene.add(box1);
                box1.name = 'box1';
                box1.position.y = 2;

                box1Material = box1.material;
                const metalTexture = textureLoader.load(metalTextureUrl());

                box1Material.bumpMap = metalTexture;
                box1Material.roughnessMap = metalTexture;
                box1Material.bumpMap.wrapS = THREE.RepeatWrapping;
                box1Material.bumpMap.wrapT = THREE.RepeatWrapping;
                box1Material.roughnessMap.wrapS = THREE.RepeatWrapping;
                box1Material.roughnessMap.wrapT = THREE.RepeatWrapping;
                box1Material.bumpMap.repeat.set(
                    box1.scale.x,
                    box1.scale.y
                );
                box1Material.roughnessMap.repeat.set(
                    box1.scale.x,
                    box1.scale.y
                );
                box1Material.bumpScale = 0.25;
                box1Material.roughness = 0.95;
                box1Material.metalness = 0;

            });

            // Add a plane
            const plane1 = plane(1000, 1000);
            scene.add(plane1);
            // PI / 2 = 90 degrees
            plane1.rotation.x = Math.PI / 2;

            const plane1Material = plane1.material;
            plane1Material.bumpScale = 0.25;
            plane1Material.roughness = 0.65;
            plane1Material.metalness = 0;

            // Add a texture to the plane
            const loadedConcreteTexture = textureLoader.load(concreteTextureUrl());
            plane1Material.map = loadedConcreteTexture;
            plane1Material.bumpMap = loadedConcreteTexture;
            plane1Material.roughnessMap = loadedConcreteTexture;

            const concreteTextureRepetition = 32;
            ['map', 'bumpMap', 'roughnessMap'].forEach(mapName => {
                plane1Material[mapName].wrapS = THREE.RepeatWrapping;
                plane1Material[mapName].wrapT = THREE.RepeatWrapping;
                plane1Material[mapName].repeat.set(
                    concreteTextureRepetition,
                    concreteTextureRepetition
                );
            })

            // const fog = new THREE.Fog('#000000', 40, 90);
            const fog = new THREE.FogExp2('#000000', 0.01);
            scene.fog = fog;


            // Add first spotlight
            const spotlight1 = spotlight('rgb(255, 200, 255)', 1);
            scene.add(spotlight1);
            spotlight1.name = 'spotlight1';
            spotlight1.position.x = 6;
            spotlight1.position.y = 8;
            spotlight1.position.z = -20;

            // Add second spotlight
            const spotlight2 = spotlight('rgb(255, 200, 255)', 1);
            scene.add(spotlight2);
            spotlight2.name = 'spotlight2';
            spotlight2.position.x = -16;
            spotlight2.position.y = 6;
            spotlight2.position.z = 5;

            // Position camera
            camera.position.x = 0;
            camera.position.y = 16;
            camera.position.z = 24;
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            renderer.render(scene, camera);

            let keyframe = 0;

            const animate = (renderer, scene, camera) => {
                renderer.render(scene, camera);
                keyframe++;

                if (keyframe % 20 === 0) {
                    const bloomStrength = Math.floor(this.settings.bloomStrength * 2); // 0 - 10
                    if (box1) {
                        box1.scale.y = bloomStrength;
                        box1.position.y = 2 * box1.scale.y;
                        box1Material.bumpMap.repeat.set(
                            box1.scale.x,
                            box1.scale.y
                        );
                        box1Material.roughnessMap.repeat.set(
                            box1.scale.x,
                            box1.scale.y
                        );
                    }
    
                    const spotlight1 = scene.getObjectByName('spotlight1');
                    spotlight1.intensity += (Math.random() - 0.5) * 0.025;
                    spotlight1.intensity = Math.abs(spotlight1.intensity);
    
                    const spotlight2 = scene.getObjectByName('spotlight2');
                    spotlight2.intensity += (Math.random() - 0.5) * 0.015;
                    spotlight2.intensity = Math.abs(spotlight2.intensity);
                }

                requestAnimationFrame(() => animate(renderer, scene, camera));
            }

            new OrbitControls(camera, renderer.domElement);
            animate(renderer, scene, camera);
        },
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
