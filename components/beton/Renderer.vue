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
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { defaults } from 'assets/beton/defaults';
import { objects } from 'static/beton/objects';
import { RowType, ObjectType, ObjectStore } from '~/interfaces/beton/objects';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GRAIN_SHADER } from 'assets/beton/shaders/grainShader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js';

const FLOOR_PLANE_SIDE_LENGTH = 2000;
let scene = null;
const sides = ['front', 'back'];
let grainPass;
let halftonePassDotMatrix;
let halftonePassGrayscale;

type Dimension = 'x' | 'y' | 'z';
type DimensionProperty = 'min' | 'max';

export default Vue.extend({
    data() {
        return {
            betonMaterial: new THREE.MeshPhongMaterial({
                color: 0xdddddd,
            }),
            objectMatrix: {
                front: [],
                back: [],
            },
            basementObjects: {
                front: [],
                back: [],
            },
            roofObjects: {
                front: [],
                back: [],
            },
            objectTypes: {
                front: {
                    roof: [],
                    rooms: [],
                    basement: [],
                },
                back: {
                    roof: [],
                    rooms: [],
                    basement: [],
                },
            },
            objects: {
                front: {
                    roof: new THREE.Group(),
                    rooms: new THREE.Group(),
                    basement: new THREE.Group(),
                },
                back: {
                    roof: new THREE.Group(),
                    rooms: new THREE.Group(),
                    basement: new THREE.Group(),
                },
            },
            floorObject: null,
            camera: null,
        }
    },
    computed: {
        ...mapState([
            'settings',
        ]),
        side() {
            return this.settings.side === 0 ? 'front' : 'back';
        },
        objectTypesSide() {
            // only necessary for watcher
            return this.objectTypes[this.side];
        },
        sizes() {
            const roomsBox = new THREE.Box3().setFromObject(this.objects[this.side].rooms);
            const basementBox = new THREE.Box3().setFromObject(this.objects[this.side].basement);
            const roofBox = new THREE.Box3().setFromObject(this.objects[this.side].roof);
            
            return {
                rooms: roomsBox.getSize(new THREE.Vector3()),
                basement: basementBox.getSize(new THREE.Vector3()),
                roof: roofBox.getSize(new THREE.Vector3()),
            }
        },
    },
    watch: {
        'settings.totalColumns'(): void {
            this.updateObjects();
        },
        'settings.totalRows'(): void {
            this.updateObjects();
        },
        'settings.side'(): void {
            this.updateObjects();
        },
        'settings.elementType'(elementType: number): void {
            this.objectTypes[this.side].rooms.forEach((object: ObjectType, objectIndex: number): void => {
                if (objectIndex === this.settings.currentColumn && object !== null) {
                    this.objectTypes[this.side].rooms[objectIndex] = elementType;
                }
            });
            this.updateObjects();
        },
        'settings.currentColumn'(currentColumn: number): void {
            sides.forEach(side => {
                this.objectMatrix[side].forEach((row: ObjectStore, rowIndex: number): void => {
                    row.forEach((_column: THREE.Group | null, columnIndex: number): void => {
                        if (rowIndex === currentColumn && sides[this.settings.side] === side) {
                            console.log(row[columnIndex])
                            row[columnIndex]?.children[0].material.color.setHex(0xff0000);
                        } else {
                            row[columnIndex]?.children[0].material.color.setHex(0xdddddd);
                        }
                    })
                });
            });
        },
        'settings.style'(style) {
            grainPass.enabled = style === 1;
            halftonePassDotMatrix.enabled = style === 1;
            halftonePassGrayscale.enabled = style === 2;
        },
        floorObject(floorObject): void {
            floorObject.scale.set(0.008,0.008,0.008);
            floorObject.rotation.y = Math.PI / 2;
            floorObject.position.x = -24;
            scene.add(floorObject);
        },
    },
    methods: {
        async initThree(): Promise<void> {
            scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);

            this.renderer = new THREE.WebGLRenderer();
            // don't need antialias because where multisampling in WebGLRenderTarget
            // this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.25;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            this.$refs.main.appendChild(this.renderer.domElement);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            await this.initFloorPlane();
            await this.loadObjectFiles();
            await this.loadFloorObject();
            this.initEnvironment();

            const target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
                samples: 2,
            })

            const composer = new EffectComposer(this.renderer, target);
            composer.addPass(new RenderPass(scene, this.camera));
            grainPass = new ShaderPass(GRAIN_SHADER);
            composer.addPass(grainPass);
            halftonePassDotMatrix = new HalftonePass(window.innerWidth, window.innerHeight, {
                    shape: 1,
                    radius: 4,
                    scatter: 0,
                    blending: 1,
                    blendingMode: 0,
                    greyscale: false,
                });
            halftonePassGrayscale = new HalftonePass(window.innerWidth, window.innerHeight, {
                    shape: 1,
                    radius: 2,
                    scatter: 1,
                    blending: 1,
                    blendingMode: 0,
                    greyscale: true,
                });
            composer.addPass(halftonePassDotMatrix);
            composer.addPass(halftonePassGrayscale);
            grainPass.enabled = (this.settings.style === 1);
            halftonePassDotMatrix.enabled = (this.settings.style === 1);
            halftonePassGrayscale.enabled = (this.settings.style === 2);

            composer.render();



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
                renderer.render();
                if (halftonePassDotMatrix && halftonePassDotMatrix.uniforms.random) {
                    halftonePassDotMatrix.uniforms.random.value = (1 - Math.random());
                }
                if (halftonePassGrayscale && halftonePassGrayscale.uniforms.random) {
                    halftonePassGrayscale.uniforms.random.value = (1 - Math.random());
                }
                if (grainPass && grainPass.uniforms.rand) {
                    grainPass.uniforms.rand.value = (1 - Math.random());
                }
                requestAnimationFrame(() => animate(renderer, scene, camera));
            }

            animate(composer, scene, this.camera);
        },
        async loadFloorObject(): Promise<void> {
            var mtlLoader = new MTLLoader();
            const materials = await mtlLoader.loadAsync('/obj/material.lib');
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            const loadedObject = await objLoader.loadAsync('/obj/mars.obj');
            const textureLoader = new TGALoader();
            const loadedNormalsTexture = await textureLoader.load('/obj/MarsEnv_nrm.tga');
            const loadedSpecTexture = await textureLoader.load('/obj/MarsEnv_spc.tga');
            const loadedMapTexture = await textureLoader.load('/obj/MarsEnv_diff.tga');
            loadedObject.children[0].material.normalMap = loadedNormalsTexture;
            loadedObject.children[0].material.specularMap = loadedSpecTexture;
            loadedObject.children[0].material.map = loadedMapTexture;
            // loadedObject.children[0].castShadow = true;
            loadedObject.children[0].receiveShadow = true;
            this.floorObject = loadedObject;
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
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });
                        objectGroup[objectSizeIndex - 1][objectIndex - 1].object = loadedObject;
                    }
                }
            };
        },
        initEnvironment(): void {
            const lookAtTarget = new THREE.Vector3(20, 17, 0);

            this.renderer.setClearColor(0xffaa77, 1);

            const fog = new THREE.FogExp2(0xffaa77, 0.002);
            scene.fog = fog;

            const light = new THREE.AmbientLight(0x202020);
            scene.add(light);

            const spotlight0 = this.getSpotlight(0xffcccc, 4);
            scene.add(spotlight0);
            spotlight0.position.set(50, 60, -30);

            this.camera.position.set(90, 30, -160);
            this.camera.lookAt(lookAtTarget);
            
            const orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
            orbitControls.target = lookAtTarget;
            orbitControls.update();
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
                sides.forEach(side => {
                    this.objectMatrix[side][rowIndex] = JSON.parse(JSON.stringify(columns));
                    this.objectMatrix[side][rowIndex] = JSON.parse(JSON.stringify(columns));
                    this.objectTypes[side].rooms[rowIndex] = JSON.parse(JSON.stringify(columns[0]));
                    this.objectTypes[side].basement[rowIndex] = null;
                    this.objectTypes[side].roof[rowIndex] = null;
                });
            }

            sides.forEach(side => {
                this.basementObjects[side] = JSON.parse(JSON.stringify(this.objectTypes[side].basement));
                this.roofObjects[side] = JSON.parse(JSON.stringify(this.objectTypes[side].roof));

                scene.add(this.objects[side].rooms);
                scene.add(this.objects[side].basement);
                scene.add(this.objects[side].roof);
            });
        },
        updateObjects(): void {
            this.prepareRenderMatrix();
            this.updateRenderObjects();
            this.setBasement();
            this.setRoof();
            // this.$nextTick(() => {
            //     this.setCameraPosition();
            // })
        },
        prepareRenderMatrix(): void {
            const totalRowsMax = defaults.totalRows.max;
            sides.forEach(side => {
                for (let rowIndex = 0; rowIndex < totalRowsMax; rowIndex++) {
                    if(rowIndex <= this.settings.totalRows) {
                        this.$set(this.objectTypes[side].rooms, rowIndex, this.objectTypes[side].rooms[rowIndex] ?? 0);
                        this.$set(this.objectTypes[side].basement, rowIndex, 0);
                        this.$set(this.objectTypes[side].roof, rowIndex, 0);
                    } else {
                        this.$set(this.objectTypes[side].rooms, rowIndex, null);
                        this.$set(this.objectTypes[side].basement, rowIndex, null);
                        this.$set(this.objectTypes[side].roof, rowIndex, null);
                    }
                }
            });
        },
        setCameraPosition(): void {
            const size = this.sizes.rooms;
            const height = this.sizes.rooms.y + this.sizes.basement.y + this.sizes.roof.y;
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
            sides.forEach(side => {
                this.objectTypes[side].basement.forEach((_elementType: null|number, elementIndex: number): void => {
                    // if cell should be null and has object, remove object
                    this.checkAndRemoveObject(this.objectTypes[side].basement, this.objects[side].basement, this.basementObjects[side], elementIndex);
                    // if cell has no object and should have, add object
                    let object = this.basementObjects[side][elementIndex];
                    if (object === null && this.objectTypes[side].basement[elementIndex] !== null) {
                        object = this.getObj('basement', 0, 0);
                        this.setBetonMaterial(object);
                        this.objects[side].basement.add(object);
                        this.basementObjects[side][elementIndex] = object;

                        if (side === 'back') {
                            object.children[0].rotation.y = Math.PI;
                        }
                        const posX = elementIndex * this.getDimension(object, 'max', 'x') + (side === 'back' ? this.getDimension(object, 'max', 'x') : 0);
                        const posZ = side === 'back' ? this.getDimension(object, 'min', 'z') * 2 : 0;
                        object.children[0].position.set(posX, 0, posZ);

                        this.objects[side].rooms.position.y = object.children[0].geometry.boundingBox.max.y;
                    }
                });
            });
        },
        setRoof(): void {
            sides.forEach(side => {
                this.objectTypes[side].roof.forEach((_elementType: null|number, elementIndex: number): void => {
                    // if cell should be null and has object, remove object
                    this.checkAndRemoveObject(this.objectTypes[side].roof, this.objects[side].roof, this.roofObjects[side], elementIndex);
                    // if cell has no object and should have, add object
                    let object = this.roofObjects[side][elementIndex];
                    if (object === null && this.objectTypes[side].roof[elementIndex] !== null) {
                        object = this.getObj('roof', 0, 0);
                        this.setBetonMaterial(object);
                        this.objects[side].roof.add(object);
                        this.roofObjects[side][elementIndex] = object;
                    }
                    // update position for all roof objects
                    if (object) {
                        if (side === 'back') {
                            object.children[0].rotation.y = Math.PI;
                        }
                        const posX = elementIndex * this.getDimension(object, 'max', 'x') + (side === 'back' ? this.getDimension(object, 'max', 'x') : 0);
                        const posY = this.sizes.rooms.y + this.sizes.basement.y;
                        const posZ = side === 'back' ? this.getDimension(object, 'min', 'z') * 2 : 0;
                        object.children[0].position.set(posX, posY, posZ);
                    }
                });
            });
        },
        getDimension(object: THREE.Object3D, property: DimensionProperty, dimension: Dimension): number {
            return object.children[0].geometry.boundingBox[property][dimension];
        },
        getObj(type: RowType, sizeIndex: number, modelIndex: number): THREE.Object3D {
            return objects[type][sizeIndex][modelIndex].object.clone();
        },
        setMaterialColor(targetObject: THREE.Object3D, color: THREE.Color): void {
            targetObject.children[0].material.color.setHex(color);
        },
        updateRenderObjects(): void {
            // remove legacy objects from object matrix and fill with new ones
            sides.forEach(side => {
                this.objectMatrix[side].forEach((row, rowIndex: number): void => {
                    row.forEach((column, columnIndex: number): void => {
                        let object = column;
                        const objectType = this.objectTypes[side].rooms[rowIndex];
                        const elementShouldBeRemoved = (object && (objectType === null || columnIndex > this.settings.totalColumns));
                        const elementShouldBeReplaced = objectType !== object?.renderId;
                        if (elementShouldBeRemoved || elementShouldBeReplaced) {
                            this.objects[side].rooms.remove(object);
                            object = null;
                        }

                        const elementNotYetRendered = (objectType !== null && columnIndex <= this.settings.totalColumns) && object === null;
                        if (elementNotYetRendered) {
                            object = this.getObj('room', 0, objectType);
                            this.setBetonMaterial(object);
                            object.renderId = objectType;
                            // if (rowIndex === this.settings.currentColumn && side === sides[this.settings.side]) {
                            //     this.setMaterialColor(object, 0xff0000);
                            // } else {
                            //     this.setMaterialColor(object, 0xdddddd);
                            // }
                            this.objects[side].rooms.add(object);

                            if (side === 'back') {
                                object.children[0].rotation.y = Math.PI;
                            }
                            const posX = rowIndex * this.getDimension(object, 'max', 'x') + (side === 'back' ? object.children[0].geometry.boundingBox.max.x : 0);
                            const posY = columnIndex * object.children[0].geometry.boundingBox.max.y;
                            const posZ = side === 'back' ? object.children[0].geometry.boundingBox.min.z * 2 : 0;
                            object.children[0].position.set(posX, posY, posZ);
                        }

                        this.objectMatrix[side][rowIndex][columnIndex] = object;
                    });
                });
                
            });
        },
        async initFloorPlane(): Promise<void> {
            const plane = await this.getPlane(FLOOR_PLANE_SIDE_LENGTH, FLOOR_PLANE_SIDE_LENGTH);
            scene.add(plane);
            // PI / 2 = 90 degrees
            plane.position.y = -70;
            plane.rotation.x = Math.PI / 2;
            // this.betonMaterial = await this.getMaterial(concreteTexture);
        },
        async getMaterial(texture: string): Promise<THREE.MeshStandardMaterial> {
            const material = new THREE.MeshStandardMaterial({
                color: 0xdddddd,
                side: THREE.DoubleSide,
            });
            material.bumpScale = 0.25;
            material.roughness = 1;
            material.metalness = 0;
            const textureLoader = new THREE.TextureLoader();
            const loadedConcreteTexture = await textureLoader.load(texture);
            material.map = loadedConcreteTexture;
            material.bumpMap = loadedConcreteTexture;

            const concreteTextureRepetition = 64;
            ['map', 'bumpMap'].forEach((mapName: string): void => {
                material[mapName].wrapS = THREE.RepeatWrapping;
                material[mapName].wrapT = THREE.RepeatWrapping;
                material[mapName].repeat.set(
                    concreteTextureRepetition,
                    concreteTextureRepetition,
                );
            });

            return material;
        },
        async getPlane(width: number, height: number): Promise<THREE.Mesh> {
            const geo = new THREE.PlaneGeometry(width, height);
            // const material = await this.getMaterial(require('@/assets/beton/grass.jpeg'));
            const material = this.betonMaterial.clone();
            material.side = THREE.DoubleSide;
            const mesh = new THREE.Mesh(geo, material);
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
        }
    },
});
</script>
