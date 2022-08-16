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

type ObjectType = 'basement'|'roof'|'room';

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
            roofRow: [],
            objectGroup: new THREE.Group(),
            basementGroup: new THREE.Group(),
            roofGroup: new THREE.Group(),
            camera: null,
            sizes: {
                objects: 0,
                roof: 0,
                basement: 0,
            }
        }
    },
    watch: {
        'settings.totalColumns'(): void {
                this.updateObjects();
        },
        'settings.totalRows'(): void {
                this.updateObjects();
        },
        'settings.elementType'(elementType: number): void {
            this.renderMatrix.forEach((row: number[], rowIndex: number): void => {
                row.forEach((_column: number, columnIndex: number): void => {
                    if (rowIndex === this.settings.currentColumn && row[columnIndex] !== null) {
                        row[columnIndex] = elementType;
                    }
                })
            });
            this.updateObjects();
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
        renderMatrix(): void {
            const objectsBox = new THREE.Box3().setFromObject(this.objectGroup);
            this.sizes.objects = objectsBox.getSize(new THREE.Vector3());
        },
        basementRow(): void {
            const basementBox = new THREE.Box3().setFromObject(this.basementGroup);
            this.sizes.basement = basementBox.getSize(new THREE.Vector3());
        },
        roofRow(): void {
            const roofBox = new THREE.Box3().setFromObject(this.roofGroup);
            this.sizes.roof = roofBox.getSize(new THREE.Vector3());
        },
    },
    methods: {
        ...mapMutations([
            'SET_STOP_MULTIPLICATOR',
        ]),
        async initThree(): Promise<void> {
            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.25;
            this.renderer.shadowMap.enabled = true;

            this.$refs.main.appendChild(this.renderer.domElement);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            await this.loadObjectFiles();

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

            const textureLoader = new THREE.TextureLoader();
            await this.initBetonMaterial(plane.material, textureLoader, concreteTexture);
            this.setEnvironment();

            this.renderer.render(this.scene, this.camera);

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
                this.roofRow[rowIndex] = null;
            }

            this.objectMatrix = JSON.parse(JSON.stringify(this.renderMatrix));
            this.basementObjects = JSON.parse(JSON.stringify(this.basementRow));
            this.roofObjects = JSON.parse(JSON.stringify(this.roofRow));

            this.scene.add(this.objectGroup);
            this.scene.add(this.basementGroup);
            this.scene.add(this.roofGroup);

            this.updateObjects();

            const animate = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void => {
                renderer.render(scene, camera);
                requestAnimationFrame(() => animate(renderer, scene, camera));
            }

            new OrbitControls(this.camera, this.renderer.domElement);
            animate(this.renderer, this.scene, this.camera);
        },
        async loadObjectFiles(): Promise<void> {
            const objLoader = new OBJLoader();

            for (const objectKey of Object.keys(objects)) {
                const objectGroup = objects[objectKey];
                let objectSizeIndex = -1;
                let objectIndex = -1;

                for (const objectSize of objectGroup) {
                    objectSizeIndex++;
                    objectIndex = -1;
                    for (const object of objectSize) {
                        objectIndex++;
                        const loadedObject = await objLoader.loadAsync(`/obj/${ object.file }`);
                        loadedObject.traverse((child: THREE.Mesh|any): void => {
                            if (child instanceof THREE.Mesh) {
                                child.geometry.computeBoundingBox();
                            }
                        });
                        objectGroup[objectSizeIndex][objectIndex].object = loadedObject;
                    }
                }
            };
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
        updateObjects(): void {
            this.prepareRenderMatrix();
            this.updateRenderObjects();
            this.setBasement();
            this.$nextTick(() => {
                this.setRoof();
            })
            // this.$nextTick(() => {
            //     this.setCameraPosition();
            // })
        },
        prepareRenderMatrix(): void {
            const totalColumnsMax = defaults.totalColumns.max;
            const totalRowsMax = defaults.totalRows.max;
            // main objects
            for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                const columns = [];
                for (let columnIndex = 0; columnIndex < totalColumnsMax; columnIndex++) {
                    if (rowIndex <= this.settings.totalRows && columnIndex <= this.settings.totalColumns) {
                        columns[columnIndex] = this.renderMatrix[rowIndex][columnIndex] ?? this.getElementTypeForPreviousRow(rowIndex, columnIndex);
                    } else {
                        columns[columnIndex] = null;
                    }
                }
                this.$set(this.renderMatrix, rowIndex, columns);
            }
            // basement & roof
            for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                if(rowIndex <= this.settings.totalRows) {
                    this.$set(this.basementRow, rowIndex, 0);
                    this.$set(this.roofRow, rowIndex, 0);
                } else {
                    this.$set(this.basementRow, rowIndex, null);
                    this.$set(this.roofRow, rowIndex, null);
                }
            }
        },
        setCameraPosition(): void {
            const size = this.sizes.objects;
            const height = this.sizes.objects.y + this.sizes.basement.y + this.sizes.roof.y;
            if (size.x > 0 && height > 0 && size.x > 0) {
                const newSize = new THREE.Vector3(Math.round(size.x) / 2, Math.round(height) / 2, Math.round(size.z) / 2);
                this.camera.position.x = Math.round(size.x) / 2;
                this.camera.position.y = Math.round(height);
                this.camera.lookAt(newSize);
            }
        },
        checkAndRemoveObject(objectTypes: any, objectGroup: any, objectStore: any, elementIndex: number): void {
            if (objectTypes[elementIndex] === null && objectStore[elementIndex]) {
                objectGroup.remove(objectStore[elementIndex]);
                objectStore[elementIndex] = null;
            }
        },
        setBetonMaterial(targetObject: THREE.Object3D): void {
            targetObject.children[0].material = this.betonMaterial.clone();
        },
        setBasement(): void {
            this.basementRow.forEach((_elementType: null|number, elementIndex: number): void => {
                // if cell should be null and has object, remove object
                this.checkAndRemoveObject(this.basementRow, this.basementGroup, this.basementObjects, elementIndex);
                // if cell has no object and should have, add object
                let object = this.basementObjects[elementIndex];
                if (object === null && this.basementRow[elementIndex] !== null) {
                    object = this.getObj('basement', 0, 0);
                    this.setBetonMaterial(object);
                    this.basementGroup.add(object);
                    this.basementObjects[elementIndex] = object;

                    let posX = elementIndex * this.getObjectPosX(object);
                    object.position.set(posX, 0, 0);

                    this.objectGroup.position.y = object.children[0].geometry.boundingBox.max.y;
                }
            });
        },
        setRoof(): void {
            this.roofRow.forEach((_elementType: null|number, elementIndex: number): void => {
                // if cell should be null and has object, remove object
                this.checkAndRemoveObject(this.roofRow, this.roofGroup, this.roofObjects, elementIndex);
                // if cell has no object and should have, add object
                let object = this.roofObjects[elementIndex];
                if (object === null && this.roofRow[elementIndex] !== null) {
                    object = this.getObj('roof', 0, 0);
                    this.setBetonMaterial(object);
                    this.roofGroup.add(object);
                    this.roofObjects[elementIndex] = object;
                }
                // update position for all roof objects
                if (object) {
                    let posX = elementIndex * this.getObjectPosX(object);
                    object.position.set(posX, this.sizes.objects.y + this.sizes.basement.y, 0);
                }
            });
        },
        getObjectPosX(object: THREE.Object3D): number {
            return object.children[0].geometry.boundingBox.max.x;
        },
        getObj(type: ObjectType, sizeIndex: number, modelIndex: number): THREE.Object3D {
            return objects[type][sizeIndex][modelIndex].object.clone();
        },
        setMaterialColor(targetObject: THREE.Object3D, color: THREE.color): void {
            targetObject.children[0].material.color.setHex(color);
        },
        updateRenderObjects(): void {
            // remove legacy objects from object matrix and fill with new ones
            this.renderMatrix.forEach((row, rowIndex: number): void => {
                row.forEach((_column, columnIndex: number): void => {
                    const currentCell = this.objectMatrix[rowIndex][columnIndex];
                    const currentCellType = this.renderMatrix[rowIndex][columnIndex];
                    const elementShouldBeRemoved = currentCellType === null && currentCell;
                    const elementShouldBeReplaced = currentCellType !== currentCell?.renderId;

                    if (elementShouldBeRemoved || elementShouldBeReplaced) {
                        this.objectGroup.remove(currentCell);
                        this.objectMatrix[rowIndex][columnIndex] = null;
                    }

                    const elementNotYetRendered = currentCellType !== null && this.objectMatrix[rowIndex][columnIndex] === null;
                    if (elementNotYetRendered) {
                        this.objectMatrix[rowIndex][columnIndex] = this.getObj('room', 0, currentCellType);
                        this.setBetonMaterial(this.objectMatrix[rowIndex][columnIndex]);
                        this.objectMatrix[rowIndex][columnIndex].renderId = currentCellType;
                        if (rowIndex === this.settings.currentColumn) {
                            this.setMaterialColor(this.objectMatrix[rowIndex][columnIndex], 0xff0000);
                        } else {
                            this.setMaterialColor(this.objectMatrix[rowIndex][columnIndex], 0xffffff);
                        }
                        this.objectGroup.add(this.objectMatrix[rowIndex][columnIndex]);
                        const posX = rowIndex * this.objectMatrix[rowIndex][columnIndex].children[0].geometry.boundingBox.max.x;
                        const posY = columnIndex * this.objectMatrix[rowIndex][columnIndex].children[0].geometry.boundingBox.max.y;
                        this.objectMatrix[rowIndex][columnIndex].position.set(posX, posY, 0);
                    }
                });
            });
        },
        async initBetonMaterial(material: THREE.MeshStandardMaterial, textureLoader: THREE.TextureLoader, concreteTexture: string): Promise<void> {
            this.betonMaterial = material;
            this.betonMaterial.bumpScale = 0.25;
            this.betonMaterial.roughness = 0.65;
            this.betonMaterial.metalness = 0;

            // Add a texture to the plane
            const loadedConcreteTexture = await textureLoader.load(concreteTexture);
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
        },
        getPlane(width: number, height: number): THREE.Mesh {
            const geo = new THREE.PlaneGeometry(width, height);
            const material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(geo, material);
            mesh.receiveShadow = true;

            return mesh;
        },
        getSpotlight(color: string, intensity: number): THREE.PointLight {
            const light = new THREE.PointLight(color, intensity);
            light.castShadow = true;
            light.shadow.mapSize.x = 4096 / 2;
            light.shadow.mapSize.y = 4096 / 2;

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
