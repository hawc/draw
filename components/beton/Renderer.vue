<template>
    <div class="renderer">
        <div ref="main"></div>
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
            betonMaterial: null,
            cubes: [],
            renderMatrix: [],
            objectMatrix: [],
            basementRow: [],
            objectGroup: new THREE.Group(),
            basementGroup: new THREE.Group(),
            camera: null,
            objectsToLoad: 0,
            objectsReady: 0,
        }
    },
    watch: {
        'settings.totalColumns'(): void {
                this.setObjects();
        },
        'settings.totalRows'(): void {
                this.setObjects();
        },
        'settings.elementType'(elementType: number): void {
            this.renderMatrix.forEach((row: number[], rowIndex: number): void => {
                row.forEach((_column: number, columnIndex: number): void => {
                    if (rowIndex === this.settings.currentColumn && row[columnIndex] !== null) {
                        row[columnIndex] = elementType;
                    }
                })
            });
            this.setObjects();
        },
        'settings.currentColumn'(currentColumn: number): void {
            this.objectMatrix.forEach((row, rowIndex: number): void => {
                row.forEach((_column, columnIndex: number): void => {
                    if (rowIndex === currentColumn) {
                        row[columnIndex]?.children[0].material.color.setHex(0xff0000);
                    } else {
                        row[columnIndex]?.children[0].material.color.setHex(0xffffff);
                    }
                })
            });
        },
        objectsReady(objectsReady: number): void {
            if (objectsReady > 0 && objectsReady === this.objectsToLoad) {
                this.setObjects();
            }
        },
    },
    methods: {
        ...mapMutations([
            'SET_STOP_MULTIPLICATOR',
        ]),
        async initThree(): Promise<void> {
            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

            const concreteTextureUrl = () => concreteTexture;

            const textureLoader = new THREE.TextureLoader();

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.25;
            this.renderer.shadowMap.enabled = true;

            this.$refs.main.appendChild(this.renderer.domElement);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            const objLoader = new OBJLoader();

            await Object.keys(objects).forEach((objectKey: string): void => {
                const objectGroup = objects[objectKey];

                objectGroup.forEach((objectSize: BetonObject[], objectSizeIndex: number): void => {
                    objectSize.forEach((object: BetonObject, objectIndex: number): void => {
                        this.objectsToLoad++;
                        objLoader.load(
                            `/obj/${ object.file }`,
                            (object: THREE.Object3D): void => {
                                object.traverse(function (child: THREE.Mesh) {
                                    if (child instanceof THREE.Mesh) {
                                        child.geometry.computeBoundingBox();
                                    }
                                });
                                objectGroup[objectSizeIndex][objectIndex].object = object;
                                this.objectsReady++;
                            },
                            (xhr: ProgressEvent): void => {
                                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                            },
                            (error: ErrorEvent): void => {
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
            const plane = this.getPlane(1000, 1000);
            this.scene.add(plane);
            // PI / 2 = 90 degrees
            plane.rotation.x = Math.PI / 2;

            this.betonMaterial = plane.material;
            this.betonMaterial.bumpScale = 0.25;
            this.betonMaterial.roughness = 0.65;
            this.betonMaterial.metalness = 0;

            // Add a texture to the plane
            const loadedConcreteTexture = await textureLoader.load(concreteTextureUrl());
            this.betonMaterial.map = loadedConcreteTexture;
            this.betonMaterial.bumpMap = loadedConcreteTexture;
            this.betonMaterial.roughnessMap = loadedConcreteTexture;

            const concreteTextureRepetition = 32;
            ['map', 'bumpMap', 'roughnessMap'].forEach((mapName: string): void => {
                this.betonMaterial[mapName].wrapS = THREE.RepeatWrapping;
                this.betonMaterial[mapName].wrapT = THREE.RepeatWrapping;
                this.betonMaterial[mapName].repeat.set(
                    concreteTextureRepetition,
                    concreteTextureRepetition,
                );
            });
            
            this.setEnvironment();

            this.renderer.render(this.scene, this.camera);

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
                this.basementRow[rowIndex] = null;
            }

            this.objectMatrix = JSON.parse(JSON.stringify(this.renderMatrix));
            this.basementObjects = JSON.parse(JSON.stringify(this.basementRow));

            this.scene.add(this.objectGroup);
            this.scene.add(this.basementGroup);

            const animate = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void => {
                renderer.render(scene, camera);
                keyframe++;
                this.setSpotlightFlicker(keyframe, scene);
                requestAnimationFrame(() => animate(renderer, scene, camera));
            }

            new OrbitControls(this.camera, this.renderer.domElement);
            animate(this.renderer, this.scene, this.camera);
        },
        setEnvironment(): void {
            const fog = new THREE.FogExp2('#000000', 0.005);
            this.scene.fog = fog;

            const light = new THREE.AmbientLight(0x404040);
            this.scene.add(light);

            const spotlight1 = this.getSpotlight('rgb(255, 200, 255)', 1);
            this.scene.add(spotlight1);
            spotlight1.name = 'spotlight1';
            spotlight1.position.x = 6;
            spotlight1.position.y = 8;
            spotlight1.position.z = -20;

            const spotlight2 = this.getSpotlight('rgb(255, 200, 255)', 1);
            this.scene.add(spotlight2);
            spotlight2.name = 'spotlight2';
            spotlight2.position.x = -16;
            spotlight2.position.y = 6;
            spotlight2.position.z = 5;

            this.camera.position.x = 0;
            this.camera.position.y = 16;
            this.camera.position.z = 48;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
        getElementTypeForPreviousRow(rowIndex: number, columnIndex: number): number {
            if (columnIndex > 0 && this.renderMatrix[rowIndex][columnIndex - 1]) {
                return this.renderMatrix[rowIndex][columnIndex - 1];
            }

            return 0;
        },
        setObjects(): void {
            const totalColumnsMax = defaults.totalColumns.max;
            const totalRowsMax = defaults.totalRows.max;
            // fill matrix with info about content
            for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                const columns = [];
                for (let columnIndex = 0; columnIndex < totalColumnsMax; columnIndex++) {
                    if (rowIndex <= this.settings.totalRows && columnIndex <= this.settings.totalColumns) {
                        columns[columnIndex] = this.renderMatrix[rowIndex][columnIndex] ?? this.getElementTypeForPreviousRow(rowIndex, columnIndex);
                    } else {
                        columns[columnIndex] = null;
                    }
                }
                this.renderMatrix[rowIndex] = columns;
            }
            this.updateObjects(objects, this.betonMaterial);
            
            for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                if(rowIndex <= this.settings.totalRows) {
                    this.basementRow[rowIndex] = 0;
                } else {
                    this.basementRow[rowIndex] = null;
                }
            }
            this.setBasement(this.betonMaterial);

            const box = new THREE.Box3().setFromObject(this.objectGroup);
            const size = box.getSize(new THREE.Vector3());
            if (size.x > 0 && size.y > 0 && size.x > 0) {
                const newSize = new THREE.Vector3(Math.round(size.x) / 2, Math.round(size.y) / 2, Math.round(size.z) / 2);
                this.camera.position.x = Math.round(size.x) / 2;
                this.camera.position.y = Math.round(size.y);
                this.camera.lookAt(newSize);
            }
        },
        setSpotlightFlicker(keyframe: number, scene: THREE.Scene): void {
            if (keyframe % 10 === 0) {
                const spotlight1 = scene.getObjectByName('spotlight1');
                spotlight1.intensity += (Math.random() - 0.5) * 0.025;
                spotlight1.intensity = Math.abs(spotlight1.intensity);

                const spotlight2 = scene.getObjectByName('spotlight2');
                spotlight2.intensity += (Math.random() - 0.5) * 0.015;
                spotlight2.intensity = Math.abs(spotlight2.intensity);

            }
        },
        setBasement(betonMaterial: THREE.Material): void {
            this.basementRow.forEach((_elementType: null|number, elementIndex: number) => {
                // if cell should be null and has object, remove object
                if (this.basementRow[elementIndex] === null && this.basementObjects[elementIndex]) {
                    this.basementGroup.remove(this.basementObjects[elementIndex]);
                    this.basementObjects[elementIndex] = null;
                }
                // if cell has no object and should have, add object
                if (this.basementObjects[elementIndex] === null && this.basementRow[elementIndex] !== null) {
                    this.basementObjects[elementIndex] = objects.basement[0][0].object.clone();
                    this.basementObjects[elementIndex].children[0].material = betonMaterial.clone();
                    this.basementGroup.add(this.basementObjects[elementIndex]);
                    let posX = elementIndex * this.basementObjects[elementIndex].children[0].geometry.boundingBox.max.x;
                    this.basementObjects[elementIndex].position.set(posX, 0, 0);

                    this.objectGroup.position.y = this.basementObjects[elementIndex].children[0].geometry.boundingBox.max.y;
                }
            });
        },
        setRoof(): void {

        },
        updateObjects(objects: BetonObject, betonMaterial: THREE.MeshStandardMaterial): void {
            // remove legacy objects from object matrix and fill with new ones
            this.renderMatrix.forEach((row, rowIndex: number): void => {
                row.forEach((_column, columnIndex: number): void => {
                    const currentCell = this.objectMatrix[rowIndex][columnIndex];
                    const elementShouldBeRemoved = this.renderMatrix[rowIndex][columnIndex] === null && this.objectMatrix[rowIndex][columnIndex];
                    const elementShouldBeReplaced = this.renderMatrix[rowIndex][columnIndex] !== this.objectMatrix[rowIndex][columnIndex]?.renderId;

                    if (elementShouldBeRemoved || elementShouldBeReplaced) {
                        this.objectGroup.remove(currentCell);
                        this.objectMatrix[rowIndex][columnIndex] = null;
                    }

                    const elementNotYetRendered = this.renderMatrix[rowIndex][columnIndex] !== null && this.objectMatrix[rowIndex][columnIndex] === null;
                    if (elementNotYetRendered) {
                        this.objectMatrix[rowIndex][columnIndex] = objects['room'][0][this.renderMatrix[rowIndex][columnIndex]].object.clone();
                        this.objectMatrix[rowIndex][columnIndex].children[0].material = betonMaterial.clone(); // doesn't work with custom obj
                        this.objectMatrix[rowIndex][columnIndex].renderId = this.renderMatrix[rowIndex][columnIndex];
                        if (rowIndex === this.settings.currentColumn) {
                            this.objectMatrix[rowIndex][columnIndex].children[0].material.color.setHex(0xff0000);
                        } else {
                            this.objectMatrix[rowIndex][columnIndex].children[0].material.color.setHex(0xffffff);
                        }
                        this.objectGroup.add(this.objectMatrix[rowIndex][columnIndex]);
                        const posX = rowIndex * this.objectMatrix[rowIndex][columnIndex].children[0].geometry.boundingBox.max.x;
                        const posY = columnIndex * this.objectMatrix[rowIndex][columnIndex].children[0].geometry.boundingBox.max.y;
                        this.objectMatrix[rowIndex][columnIndex].position.set(posX, posY, 0);
                    }
                });
            });
        },
        getPlane(width: number, height: number): THREE.Mesh {
            const geo = new THREE.PlaneGeometry(width, height);
            const material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(geo, material as any);
            mesh.receiveShadow = true;

            return mesh;
        },
        getSpotlight(color: string, intensity: number): THREE.PointLight {
            const light = new THREE.PointLight(color, intensity);
            light.castShadow = true;
            light.shadow.mapSize.x = 4096;
            light.shadow.mapSize.y = 4096;

            return light;
        },
    },
    async mounted(): Promise<void> {
        if (process.client) {
            await this.initThree();

            document.addEventListener('keyup', (event: KeyboardEvent): void => {
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
