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
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { defaults } from 'assets/beton/defaults';
import { concreteTexture } from '~/static/textures/textures';

interface BetonObject {
    file: string,
    object: any,
}

interface BetonObjects {
    [key: string]: BetonObject[][];
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
            renderMatrix: [],
            objectMatrix: [],
        }
    },
    watch: {
        settings: {
            deep: true,
            handler(settings) {
                const totalColumnsMax = defaults.totalColumns.max;
                const totalRowsMax = defaults.totalRows.max;
                // fill matrix with info about content
                for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                    const columns = [];
                    for (let columnIndex = 0; columnIndex < totalColumnsMax; columnIndex++) {
                        if (rowIndex <= settings.totalRows && columnIndex <= settings.totalColumns) {
                            columns[columnIndex] = (columnIndex === settings.currentColumn ? settings.elementType : (this.renderMatrix[rowIndex][columnIndex] ?? 0));
                        } else {
                            columns[columnIndex] = null;
                        }
                    }
                    this.renderMatrix[rowIndex] = columns;
                }
            },
        },
        'settings.currentColumn'(currentColumn: number): void {
            this.objectMatrix.forEach((row, rowIndex) => {
                row.forEach((column, columnIndex) => {
                    if (row[columnIndex] !== null) {
                        if (columnIndex === currentColumn) {
                            row[columnIndex].children[0].material.color.setHex(0xff0000);
                        } else {
                            row[columnIndex].children[0].material.color.setHex(0xffffff);
                        }
                    }
                })
            });
        },
    },
    methods: {
        ...mapMutations([
            'SET_STOP_MULTIPLICATOR',
        ]),
        async initThree(): Promise<void> {
            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

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

            const spotlight = (color, intensity): THREE.PointLight => {
                const light = new THREE.PointLight(color, intensity);
                light.castShadow = true;
                light.shadow.mapSize.x = 4096;
                light.shadow.mapSize.y = 4096;

                return light;
            }

            const concreteTextureUrl = () => concreteTexture;

            const textureLoader = new THREE.TextureLoader();

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.25;
            renderer.shadowMap.enabled = true;

            this.$refs.main.appendChild(renderer.domElement);
            renderer.setSize(window.innerWidth, window.innerHeight);


            // outer array is dimension, inner is the different designs for that dimension
            const objects: BetonObjects = {
                basement: [
                    [
                        {
                            file: 'basement360-01.obj',
                            object: null,
                        },
                        {
                            file: 'basement360-01.obj', // duplicate
                            object: null,
                        },
                    ],
                    [
                        {
                            file: 'basement480-01.obj',
                            object: null,
                        },
                        {
                            file: 'basement480-01.obj', // duplicate
                            object: null,
                        },
                    ],
                    [

                    ],
                ],
                room: [
                    [
                        {
                            file: 'room360-01.obj',
                            object: null,
                        },
                        {
                            file: 'room360-02.obj',
                            object: null,
                        },
                    ],
                    [
                        {
                            file: 'room480-01.obj',
                            object: null,
                        },
                        {
                            file: 'room480-01.obj', // duplicate
                            object: null,
                        },
                    ],
                    [
                        {
                            file: 'room600-01.obj',
                            object: null,
                        },
                        {
                            file: 'room600-02.obj',
                            object: null,
                        },
                    ],
                ],
                roof: [
                    [
                        {
                            file: 'roof360-01.obj',
                            object: null,
                        },
                        {
                            file: 'roof360-01.obj', // duplicate
                            object: null,
                        },
                    ],
                    [
                        {
                            file: 'roof360-01.obj', // duplicate
                            object: null,
                        },
                        {
                            file: 'roof360-01.obj', // duplicate
                            object: null,
                        },
                    ],
                    [

                    ],
                ],
            };

            const objLoader = new OBJLoader();
            let loaded = 0;

            Object.keys(objects).forEach(objectKey => {
                const objectGroup = objects[objectKey];

                objectGroup.forEach((objectSize, objectSizeIndex) => {
                    objectSize.forEach((object, objectIndex) => {
                        objLoader.load(
                            `/obj/${ object.file }`,
                            function (object) {
                                object.traverse(function (child) {
                                    if (child instanceof THREE.Mesh) {
                                        child.geometry.computeBoundingBox();
                                    }
                                });
                                objectGroup[objectSizeIndex][objectIndex].object = object;
                                loaded++;
                            },
                            function (xhr) {
                                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                            },
                            function (error) {
                                console.log('An error occured:', error);
                            }
                        );
                    });
                });
            });

            //  What should happen next?
            /*
                When turning knobs different changes should be made to the rendered Building, e.g.:
                Knob 1: Set Building Rows
                Knob 2: Set Building Columns
                Knob 3: Change Editable Column
                Knob 4: Change Editable Row (If 0 then style full column)
                Knob 5: Change Element Width
                Knob 6: Change Element Type

                Rendering the roof is a bit more tricky, as it is combined from multiple elements.
            */

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

            const fog = new THREE.FogExp2('#000000', 0.005);
            scene.fog = fog;

            const light = new THREE.AmbientLight(0x404040);
            scene.add(light);

            const spotlight1 = spotlight('rgb(255, 200, 255)', 1);
            scene.add(spotlight1);
            spotlight1.name = 'spotlight1';
            spotlight1.position.x = 6;
            spotlight1.position.y = 8;
            spotlight1.position.z = -20;

            const spotlight2 = spotlight('rgb(255, 200, 255)', 1);
            scene.add(spotlight2);
            spotlight2.name = 'spotlight2';
            spotlight2.position.x = -16;
            spotlight2.position.y = 6;
            spotlight2.position.z = 5;

            camera.position.x = 0;
            camera.position.y = 16;
            camera.position.z = 24;
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            renderer.render(scene, camera);

            let keyframe = 0;

            const totalColumnsMax = defaults.totalColumns.max;
            const totalRowsMax = defaults.totalRows.max;

            // create matrix with maximum dimensions
            for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                const columns = [];
                for (let columnIndex = 0; columnIndex < totalColumnsMax; columnIndex++) {
                    columns[columnIndex] = null;
                }
                this.renderMatrix[rowIndex] = columns;
            }

            this.objectMatrix = JSON.parse(JSON.stringify(this.renderMatrix));

            const basicMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

            const animate = (renderer, scene, camera): void => {
                renderer.render(scene, camera);
                keyframe++;

                if (keyframe % 10 === 0) {
                    const spotlight1 = scene.getObjectByName('spotlight1');
                    spotlight1.intensity += (Math.random() - 0.5) * 0.025;
                    spotlight1.intensity = Math.abs(spotlight1.intensity);
    
                    const spotlight2 = scene.getObjectByName('spotlight2');
                    spotlight2.intensity += (Math.random() - 0.5) * 0.015;
                    spotlight2.intensity = Math.abs(spotlight2.intensity);


                    if (loaded === 14) {
                        // remove legacy objects from object matrix and fill with new ones
                        this.renderMatrix.forEach((row, rowIndex) => {
                            row.forEach((column, columnIndex) => {
                                const currentCell = this.objectMatrix[rowIndex][columnIndex];
                                if (this.renderMatrix[rowIndex][columnIndex] !== null) { // if cell qualifies for a object
                                    if (!(currentCell && currentCell.renderId === this.renderMatrix[rowIndex][columnIndex])) { // if cell content is not same as before
                                        if (currentCell) { // if there's already an object in this cell
                                            scene.remove(currentCell);
                                            this.objectMatrix[rowIndex][columnIndex] = null;
                                        }
                                        // const objectSource = this.settings.currentColumn === rowIndex ? this.settings.elementType : 0;
                                        this.objectMatrix[rowIndex][columnIndex] = objects['room'][0][this.renderMatrix[rowIndex][columnIndex]].object.clone();
                                        this.objectMatrix[rowIndex][columnIndex].children[0].material = basicMaterial.clone();
                                        this.objectMatrix[rowIndex][columnIndex].name = this.objectMatrix[rowIndex][columnIndex].uuid;
                                        this.objectMatrix[rowIndex][columnIndex].renderId = this.renderMatrix[rowIndex][columnIndex];
                                        if (columnIndex === this.settings.currentColumn) {
                                            this.objectMatrix[rowIndex][columnIndex].children[0].material.color.setHex(0xff0000);
                                        } else {
                                            this.objectMatrix[rowIndex][columnIndex].children[0].material.color.setHex(0xffffff);
                                        }
                                        scene.add(this.objectMatrix[rowIndex][columnIndex]);
                                        let posX = rowIndex * this.objectMatrix[rowIndex][columnIndex].children[0].geometry.boundingBox.max.x;
                                        let posY = columnIndex * this.objectMatrix[rowIndex][columnIndex].children[0].geometry.boundingBox.max.y;
                                        this.objectMatrix[rowIndex][columnIndex].position.set(posX, posY, 0);
                                    }
                                } else if (currentCell) { // if cell doesn't quality for an object but already has an object
                                    scene.remove(currentCell);
                                    this.objectMatrix[rowIndex][columnIndex] = null;
                                }
                            });
                        });
                    }
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
