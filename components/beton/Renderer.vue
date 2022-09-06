<template>
    <div class="renderer">
        <div ref="main"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { defaults } from 'assets/beton/defaults';
import { concreteTexture } from '~/static/textures/textures';
import { objects } from 'static/beton/objects';
import { RowType, ObjectType, ObjectStore } from '~/interfaces/beton/objects';

export default Vue.extend({
    computed: {
        ...mapState([
            'settings',
        ]),
    },
    data() {
        return {
            window,
            betonMaterial: null,
            cubes: [],
            objectMatrix: [],
            objectRow: [],
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
            this.objectRow.forEach((object: ObjectType, objectIndex: number): void => {
                if (objectIndex === this.settings.currentColumn && object !== null) {
                    this.objectRow[objectIndex] = elementType;
                }
            });
            this.updateObjects();
        },
        'settings.currentColumn'(currentColumn: number): void {
            this.objectMatrix.forEach((row: ObjectStore, rowIndex: number): void => {
                row.forEach((_column: THREE.Group | null, columnIndex: number): void => {
                    if (rowIndex === currentColumn) {
                        row[columnIndex]?.children[0].material.color.setHex(0xff0000);
                    } else {
                        row[columnIndex]?.children[0].material.color.setHex(0xffffff);
                    }
                })
            });
        },
        objectRow(): void {
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
        async initThree(): Promise<void> {
            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.25;
            this.renderer.shadowMap.enabled = true;

            this.$refs.main.appendChild(this.renderer.domElement);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            await this.initFloorPlane();
            await this.loadObjectFiles();
            this.initEnvironment();

            this.renderer.render(this.scene, this.camera);

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
            this.prepareObjectStore();
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
                let objectSizeIndex = 0;
                let objectIndex = 0;

                for (const objectSize of objectGroup) {
                    objectSizeIndex++;
                    objectIndex = 0;
                    for (const object of objectSize) {
                        objectIndex++;
                        const loadedObject = await objLoader.loadAsync(`/obj/${ object.file }`);
                        loadedObject.traverse((child: THREE.Mesh|any): void => {
                            if (child instanceof THREE.Mesh) {
                                child.geometry.computeBoundingBox();
                                child.material = this.betonMaterial;
                            }
                        });
                        objectGroup[objectSizeIndex - 1][objectIndex - 1].object = loadedObject;
                    }
                }
            };
        },
        initEnvironment(): void {
            const fog = new THREE.FogExp2(0x000000, 0.005);
            this.scene.fog = fog;

            const light = new THREE.AmbientLight(0x404040);
            this.scene.add(light);

            const spotlight1 = this.getSpotlight(0xffddff, 1);
            this.scene.add(spotlight1);
            spotlight1.position.set(6, 8, -20);

            const spotlight2 = this.getSpotlight(0xffddff, 1);
            this.scene.add(spotlight2);
            spotlight2.position.set(-16, 6, 5);
            this.camera.position.set(0, 16, 48);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
        getElementTypeForPreviousRow(rowIndex: number, columnIndex: number): number {
            if (columnIndex > 0 && this.objectMatrix[rowIndex][columnIndex - 1]) {
                return this.objectMatrix[rowIndex][columnIndex - 1].renderId;
            }

            return 0;
        },
        prepareObjectStore(): void {
            const totalColumnsMax = defaults.totalColumns.max;
            const totalRowsMax = defaults.totalRows.max;

            // create matrix with maximum dimensions
            for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                const columns = [];
                for (let columnIndex = 0; columnIndex < totalColumnsMax; columnIndex++) {
                    columns[columnIndex] = null;
                }
                this.objectMatrix[rowIndex] = columns;
                this.objectRow[rowIndex] = columns[0];
                this.basementRow[rowIndex] = null;
                this.roofRow[rowIndex] = null;
            }

            this.basementObjects = JSON.parse(JSON.stringify(this.basementRow));
            this.roofObjects = JSON.parse(JSON.stringify(this.roofRow));

            this.scene.add(this.objectGroup);
            this.scene.add(this.basementGroup);
            this.scene.add(this.roofGroup);
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
            const totalRowsMax = defaults.totalRows.max;
            for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                if(rowIndex <= this.settings.totalRows) {
                    this.$set(this.objectRow, rowIndex, this.objectRow[rowIndex] ?? 0);
                    this.$set(this.basementRow, rowIndex, 0);
                    this.$set(this.roofRow, rowIndex, 0);
                } else {
                    this.$set(this.objectRow, rowIndex, null);
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
        checkAndRemoveObject(objectTypes: ObjectType[], objectGroup: THREE.Group, objectStore: ObjectStore, elementIndex: number): void {
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
        getObj(type: RowType, sizeIndex: number, modelIndex: number): THREE.Object3D {
            return objects[type][sizeIndex][modelIndex].object.clone();
        },
        setMaterialColor(targetObject: THREE.Object3D, color: THREE.color): void {
            targetObject.children[0].material.color.setHex(color);
        },
        updateRenderObjects(): void {
            // remove legacy objects from object matrix and fill with new ones
            this.objectMatrix.forEach((row, rowIndex: number): void => {
                row.forEach((column, columnIndex: number): void => {
                    let object = column;
                    const objectType = this.objectRow[rowIndex];
                    const elementShouldBeRemoved = (object && (objectType === null || columnIndex > this.settings.totalColumns));
                    const elementShouldBeReplaced = objectType !== object?.renderId;
                    if (elementShouldBeRemoved || elementShouldBeReplaced) {
                        this.objectGroup.remove(object);
                        object = null;
                    }

                    const elementNotYetRendered = (objectType !== null && columnIndex <= this.settings.totalColumns) && object === null;
                    if (elementNotYetRendered) {
                        object = this.getObj('room', 0, objectType);
                        this.setBetonMaterial(object);
                        object.renderId = objectType;
                        if (rowIndex === this.settings.currentColumn) {
                            this.setMaterialColor(object, 0xff0000);
                        } else {
                            this.setMaterialColor(object, 0xffffff);
                        }
                        this.objectGroup.add(object);
                        const posX = rowIndex * this.getObjectPosX(object);
                        const posY = columnIndex * object.children[0].geometry.boundingBox.max.y;
                        object.position.set(posX, posY, 0);
                    }

                    this.objectMatrix[rowIndex][columnIndex] = object;
                });
            });
        },
        async initFloorPlane(): Promise<void> {
            const plane = this.getPlane(1000, 1000);
            this.scene.add(plane);
            // PI / 2 = 90 degrees
            plane.rotation.x = Math.PI / 2;

            const textureLoader = new THREE.TextureLoader();
            this.betonMaterial = plane.material;
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
        }
    },
});
</script>
