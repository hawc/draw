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
import { HalftonePass } from 'assets/beton/shaders/HalftonePass.js';

type Dimension = 'x' | 'y' | 'z';
type DimensionProperty = 'min' | 'max';
type Side = 'front' | 'back';

const FLOOR_PLANE_SIDE_LENGTH = 2000;
let scene = null;
const sides: Side[] = ['front', 'back'];
let grainPass;
let halftonePassDotMatrix;
let halftonePassGrayscale;
enum BuildingSections {
    basement,
    rooms,
    roof,
}

export default Vue.extend({
    data() {
        return {
            betonMaterial: new THREE.MeshPhongMaterial({
                color: 0xdddddd,
            }),
            // objectMatrix: {
            //     front: [],
            //     back: [],
            // },
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
                front: new THREE.Group(),
                back: new THREE.Group(),
            },
            highlightedObjects: [],
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
        objectsSize(): THREE.Vector3 {
            const roofBox = new THREE.Box3().setFromObject(this.objects[this.side]);

            return roofBox.getSize(new THREE.Vector3());
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
            this.highlightCurrentBuildingSection(this.settings.buildingSection, this.settings.currentColumn);
            this.updateObjects();
        },
        'settings.elementType'(elementType: number): void {
            const selectedSide = sides[this.settings.side];
            this.highlightedObjects.forEach(object => {
                this.renderCell(selectedSide, object.userData.buildingSection, elementType, object.userData.columnPosition, object.userData.objectPosition);
            })

            this.highlightCurrentBuildingSection(this.settings.buildingSection, this.settings.currentColumn);
        },
        'settings.currentColumn'(currentColumn: number): void {
            this.highlightCurrentBuildingSection(this.settings.buildingSection, currentColumn);
        },
        'settings.buildingSection'(buildingSection: number): void {
            this.highlightCurrentBuildingSection(buildingSection, this.settings.currentColumn);
        },
        'settings.style'(style: number): void {
            grainPass.enabled = style === 1;
            halftonePassDotMatrix.enabled = style === 1;
            halftonePassGrayscale.enabled = style === 2;
        },
        highlightedObjects(objects: THREE.Object3D[], oldObjects: THREE.Object3D[]): void {
            oldObjects.forEach(object => {
                object.children[0].material.color.setHex(0xdddddd);
            });
            objects.forEach(object => {
                object.children[0].material.color.setHex(0xff0000);
            });
        },
        floorObject(floorObject): void {
            floorObject.scale.set(0.01, 0.01, 0.01);
            floorObject.rotation.y = Math.PI / 2;
            floorObject.position.x = -24;
            scene.add(floorObject);
        },
    },
    methods: {
        highlightCurrentBuildingSection(buildingSection: number, currentColumn: number) {
            const selectedSide = sides[this.settings.side];
            this.highlightedObjects = this.objects[selectedSide].children.filter(object => {
                return object.userData.buildingSection === BuildingSections[buildingSection] && object.userData.objectPosition.x === currentColumn;
            });
        },
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

            this.prepareObjectStore();
            this.prepareRenderMatrix();
            this.updateObjects();

            const animate = (composer: EffectComposer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void => {
                composer.render();
                if (halftonePassGrayscale && halftonePassGrayscale.uniforms.random) {
                    halftonePassGrayscale.uniforms.random.value = (1 - Math.random());
                }
                if (grainPass && grainPass.uniforms.rand) {
                    grainPass.uniforms.rand.value = (1 - Math.random());
                }
                requestAnimationFrame(() => animate(composer, scene, camera));
            }

            animate(composer, scene, this.camera);
        },
        async loadFloorObject(): Promise<void> {
            const mtlLoader = new MTLLoader();
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
                        const loadedObject = await objLoader.loadAsync(`/obj/objects/${ object.file }`);
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
            }
        },
        initEnvironment(): void {
            const lookAtTarget = new THREE.Vector3(20, 17, 0);

            this.renderer.setClearColor(0xffaa77, 1);

            scene.fog = new THREE.FogExp2(0xffaa77, 0.002);

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
                sides.forEach((side: Side) => {
                    // this.objectMatrix[side][rowIndex] = JSON.parse(JSON.stringify(columns));
                    // this.objectMatrix[side][rowIndex] = JSON.parse(JSON.stringify(columns));
                    this.objectTypes[side].rooms[rowIndex] = JSON.parse(JSON.stringify(columns[0]));
                    this.objectTypes[side].basement[rowIndex] = null;
                    this.objectTypes[side].roof[rowIndex] = null;
                });
            }

            sides.forEach(side => {
                scene.add(this.objects[side]);
            });
        },
        updateObjects(): void {
            // this.prepareRenderMatrix();
            this.renderAll();
            // this.$nextTick(() => {
            //     this.setCameraPosition();
            // });
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
            const size = this.objectsSize;
            const height = size.y;
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
        getDimension(object: THREE.Object3D, property: DimensionProperty, dimension: Dimension): number {
            return object.children[0].geometry.boundingBox[property][dimension];
        },
        getObj(type: string, sizeIndex: number, modelIndex: number): THREE.Object3D {
            return objects[type][sizeIndex][modelIndex].object.clone();
        },
        setMaterialColor(targetObject: THREE.Object3D, color: THREE.Color): void {
            targetObject.children[0].material.color.setHex(color);
        },
        renderAll(): void {
            sides.forEach((side: Side) => {
                this.removeObsoleteObjects(side, new THREE.Vector2(this.settings.totalColumns, this.settings.totalRows));
                const currentDimensions = new THREE.Vector3(0, 0, side === 'front' ? 0 : 0);
                for (let columnIndex = 0; columnIndex < this.settings.totalColumns; columnIndex++) {
                    const renderedColumnDimensions = this.renderColumn(columnIndex, side, currentDimensions, columnIndex);
                    currentDimensions.set(
                        currentDimensions.x + renderedColumnDimensions.x,
                        currentDimensions.y,
                        currentDimensions.z,
                    );
                }
            });
        },
        renderColumn(columnIndex: number, side: Side, fullSize: THREE.Vector3, objectX): THREE.Vector3 {
            const currentColumnDimensions = fullSize.clone();
            let renderedCellDimensions;
            for (let cellIndex = 0; cellIndex < this.settings.totalRows; cellIndex++) {
                const isFirstCellInColumn = (cellIndex === 0);
                const isLastCellInColumn = ((cellIndex + 1) === this.settings.totalRows);
                const position = new THREE.Vector2(objectX, cellIndex);
                const buildingSection = isFirstCellInColumn ? BuildingSections[0] : (isLastCellInColumn ? BuildingSections[2] : BuildingSections[1]);
                renderedCellDimensions = this.renderCell(side, buildingSection, null, currentColumnDimensions, position);
                currentColumnDimensions.set(
                    currentColumnDimensions.x,
                    currentColumnDimensions.y + renderedCellDimensions.y,
                    currentColumnDimensions.z,
                );
            }
            currentColumnDimensions.x = currentColumnDimensions.x + renderedCellDimensions.x;

            return renderedCellDimensions;
        },
        renderCell(side: Side, buildingSection, elementType: number|null, columnPosition: THREE.Vector3, objectPosition: THREE.Vector2): THREE.Vector3 {
            if (elementType === null) {
                // move elementType info to own array
                elementType = buildingSection === 'rooms' ? this.getPreviousElementType(side, objectPosition) : 0;
            }
            const object = this.replaceObjectIfNeeded(side, objectPosition.clone(), buildingSection, elementType, columnPosition);

            return object.userData.dimensions;

        },
        removeObsoleteObjects(side: Side, objectPosition: THREE.Vector2) {
            const results = this.objects[side].children.filter(object => {
                return object.userData.objectPosition.x >= objectPosition.x || object.userData.objectPosition.y >= objectPosition.y;
            });
            results.forEach((result: THREE.Object3D) => {
                result.children[0].material.color.set(0x00ff00);
                result.removeFromParent();
            });
        },
        replaceObjectIfNeeded(side: Side, objectPosition: THREE.Vector2, buildingSection, elementType, columnPosition): boolean {
            const result = this.objects[side].children.find(object => (object.userData.objectPosition.y === objectPosition.y && object.userData.objectPosition.x === objectPosition.x));
            if (result) {
                if (result.userData.elementType === elementType && result.userData.buildingSection === buildingSection) {
                    return result;
                }
                result.removeFromParent();
            }

            return this.generateObject(side, objectPosition, buildingSection, elementType, columnPosition);
        },
        generateObject(side: Side, objectPosition: THREE.Vector2, buildingSection, elementType, columnPosition) {
            const objectModel = this.getObj(buildingSection, 0, elementType);

            const dimensions = this.getObjectDimensions(objectModel);
            this.setBetonMaterial(objectModel);
            const oo = this.objects[side].add(objectModel);
            const position = columnPosition.clone();
            objectModel.userData.dimensions = dimensions;
            objectModel.userData.objectPosition = objectPosition.clone();
            objectModel.userData.elementType = elementType;
            objectModel.userData.columnPosition = columnPosition.clone();
            objectModel.userData.buildingSection = buildingSection;
            if (side === 'back') {
                position.set(position.x + dimensions.x, position.y, -6);
            } else {
                position.z = 6;
            }
            objectModel.children[0].position = position;
            if (side === 'back') {
                objectModel.children[0].rotation.y = Math.PI;
            }
            const sameObject = this.highlightedObjects.find(highlightedObject => {
                highlightedObject.userData.objectPosition.equals(objectModel.userData.objectPosition);
            });

            return objectModel;
        },
        getPreviousElementType(side: Side, objectPosition: THREE.Vector2) {
            const object = this.objects[side].children.find(object => object.userData.objectPosition.x === objectPosition.x && object.userData.objectPosition.y === 1);

            return object?.userData.elementType ?? 0;
        },
        getObjectDimensions(objectModel: THREE.Object3D): THREE.Vector3 {
            return new THREE.Vector3(
                objectModel.children[0].geometry.boundingBox.max.x - objectModel.children[0].geometry.boundingBox.min.x,
                objectModel.children[0].geometry.boundingBox.max.y - objectModel.children[0].geometry.boundingBox.min.y,
                objectModel.children[0].geometry.boundingBox.max.z - objectModel.children[0].geometry.boundingBox.min.z,
            );
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
        getSpotlight(color: THREE.Color, intensity: number): THREE.PointLight {
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
