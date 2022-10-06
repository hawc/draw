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
import { ObjectType, ObjectStore } from '~/interfaces/beton/objects';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GRAIN_SHADER } from 'assets/beton/shaders/grainShader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { HalftonePass } from 'assets/beton/shaders/HalftonePass.js';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

if (WebGL.isWebGL2Available() === false) {
    console.error('No WebGL2 support');
}

type Dimension = 'x' | 'y' | 'z';
type DimensionProperty = 'min' | 'max';
type Side = 'front' | 'back';
enum BuildingSections {
    basement,
    rooms,
    roof,
}

const objectWidths: number[] = [240, 360, 600];
const FLOOR_PLANE_SIDE_LENGTH = 2000;
const sides: Side[] = ['front', 'back'];

const betonMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
});
let scene = null;
let camera = null;
let renderedObjects = {
    front: new THREE.Group(),
    back: new THREE.Group(),
};
let grainPass;
let halftonePassDotMatrix;
let halftonePassGrayscale;
const objLoader = new OBJLoader();

export default Vue.extend({
    data() {
        return {
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
        }
    },
    computed: {
        ...mapState([
            'settings',
        ]),
        side(): Side {
            return this.settings.side === 0 ? 'front' : 'back';
        },
        objectTypesSide() {
            // only necessary for watcher
            return this.objectTypes[this.side];
        },
    },
    watch: {
        'settings.totalColumns'(): void {
            this.updateObjects();
            this.highlightCurrentBuildingSection(this.settings.buildingSection, this.settings.currentColumn);
        },
        'settings.totalRows'(): void {
            this.updateObjects();
            this.highlightCurrentBuildingSection(this.settings.buildingSection, this.settings.currentColumn);
        },
        'settings.side'(): void {
            this.highlightCurrentBuildingSection(this.settings.buildingSection, this.settings.currentColumn);
            this.updateObjects();
        },
        'settings.elementType'(elementType: number): void {
            this.rerenderColumnOnBothSides(elementType);
        },
        'settings.elementWidth'(): void {
            this.rerenderColumnOnBothSides();
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
                object.children[0].material.color.setHex(0x999999);
            });
        },
    },
    methods: {
        rerenderColumnOnBothSides(elementType: number|null = null): void {
            sides.forEach(side => {
                renderedObjects[side].children.filter(object => object.userData.objectPosition.x === this.settings.currentColumn && (object.userData.elementWidth !== this.settings.elementWidth || object.userData.buildingSection === BuildingSections[this.settings.buildingSection])).forEach(object => {
                    const columnPosition = object.userData.columnPosition;
                    this.renderCell(side, object.userData.buildingSection, elementType, null, columnPosition, object.userData.objectPosition);
                });
            });

            this.highlightCurrentBuildingSection(this.settings.buildingSection, this.settings.currentColumn);
        },
        async initThree(): Promise<void> {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);

            this.renderer = new THREE.WebGLRenderer();
        	this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

            const target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)

            const composer = new EffectComposer(this.renderer, target);
            composer.addPass(new RenderPass(scene, camera));
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

            sides.forEach(side => {
                scene.add(renderedObjects[side]);
            });

            this.updateObjects();

            // const lookAtTarget = new THREE.Vector3(20, 17, 0);
            const animate = (composer: EffectComposer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void => {
                // camera.position.set(180 * (this.settings.x - 1), 180 * this.settings.y, -160 * (this.settings.z - 1));
                // camera.lookAt(lookAtTarget);
                composer.render();
                if (halftonePassGrayscale && halftonePassGrayscale.uniforms.random) {
                    halftonePassGrayscale.uniforms.random.value = (1 - Math.random());
                }
                if (grainPass && grainPass.uniforms.rand) {
                    grainPass.uniforms.rand.value = (1 - Math.random());
                }
                requestAnimationFrame(() => animate(composer, scene, camera));
            }

            animate(composer, scene, camera);
        },
        async loadFloorObject(): Promise<void> {
            const mtlLoader = new MTLLoader();
            const materials = await mtlLoader.loadAsync('/obj/material.lib');
            objLoader.setMaterials(materials);
            const loadedObject = await objLoader.loadAsync('/obj/mars.obj');
            loadedObject.scale.set(0.01, 0.01, 0.01);
            loadedObject.rotation.y = Math.PI / 2;
            loadedObject.position.x = -24;
            const textureLoader = new TGALoader();
            const loadedNormalsTexture = await textureLoader.load('/obj/MarsEnv_nrm.tga');
            const loadedSpecTexture = await textureLoader.load('/obj/MarsEnv_spc.tga');
            const loadedMapTexture = await textureLoader.load('/obj/MarsEnv_diff.tga');
            loadedObject.children[0].material.normalMap = loadedNormalsTexture;
            loadedObject.children[0].material.specularMap = loadedSpecTexture;
            loadedObject.children[0].material.map = loadedMapTexture;
            loadedObject.children[0].receiveShadow = true;
            scene.add(loadedObject);
        },
        async loadObjectFiles(): Promise<void> {
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
                        loadedObject.scale.set(0.001, 0.001, 0.001);
                        loadedObject.traverse((child: THREE.Mesh|any): void => {
                            if (child instanceof THREE.Mesh) {
                                child.geometry.computeBoundingBox();
                                child.material = betonMaterial;
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

            const spotlight1 = this.getSpotlight(0xffaa77, 1);
            scene.add(spotlight1);
            spotlight1.position.set(0, 60, 60);

            camera.position.set(90, 30, -160);
            // camera.lookAt(lookAtTarget);
            
            const orbitControls = new OrbitControls(camera, this.renderer.domElement);
            orbitControls.target = lookAtTarget;
            orbitControls.update();
        },
        updateObjects(): void {
            this.renderAll();
        },
        highlightCurrentBuildingSection(buildingSection: number, currentColumn: number): void {
            const selectedSide = sides[this.settings.side];
            this.highlightedObjects = renderedObjects[selectedSide].children.filter(object => {
                return object.userData.buildingSection === BuildingSections[buildingSection] && object.userData.objectPosition.x === currentColumn;
            });
        },
        checkAndRemoveObject(objectTypes: ObjectType[], objectGroup: THREE.Group, objectStore: ObjectStore, elementIndex: number): void {
            if (objectTypes[elementIndex] === null && objectStore[elementIndex]) {
                objectGroup.remove(objectStore[elementIndex]);
                objectStore[elementIndex] = null;
            }
        },
        setBetonMaterial(targetObject: THREE.Object3D): void {
            targetObject.children[0].material = betonMaterial.clone();
        },
        getDimension(object: THREE.Object3D, property: DimensionProperty, dimension: Dimension): number {
            return object.children[0].geometry.boundingBox[property][dimension];
        },
        getObj(type: string, sizeIndex: number, modelIndex: number): THREE.Object3D {
            const objectType = objects[type];
            const objectSize = objectType[sizeIndex % objectType.length];
            const objectModel = objectSize[modelIndex % objectSize.length];
            return objectModel.object.clone();
        },
        setMaterialColor(targetObject: THREE.Object3D, color: THREE.Color): void {
            targetObject.children[0].material.color.setHex(color);
        },
        renderAll(): void {
            sides.forEach((side: Side) => {
                this.removeObsoleteObjects(side, new THREE.Vector2(this.settings.totalColumns, this.settings.totalRows));
                const currentDimensions = new THREE.Vector3(0, 0, side === 'front' ? 0 : 0);
                for (let columnIndex = 0; columnIndex < this.settings.totalColumns; columnIndex++) {
                    const renderedColumnDimensions = this.renderColumn(side, currentDimensions, columnIndex);
                    currentDimensions.set(
                        currentDimensions.x + renderedColumnDimensions.x,
                        currentDimensions.y,
                        currentDimensions.z,
                    );
                }
            });
        },
        renderColumn(side: Side, fullSize: THREE.Vector3, objectX: number): THREE.Vector3 {
            const currentColumnDimensions = fullSize.clone();
            let renderedCellDimensions;
            for (let cellIndex = 0; cellIndex < this.settings.totalRows; cellIndex++) {
                const isFirstCellInColumn = (cellIndex === 0);
                const isLastCellInColumn = ((cellIndex + 1) === this.settings.totalRows);
                const position = new THREE.Vector2(objectX, cellIndex);
                const buildingSection = isFirstCellInColumn ? BuildingSections[0] : (isLastCellInColumn ? BuildingSections[2] : BuildingSections[1]);
                renderedCellDimensions = this.renderCell(side, buildingSection, null, null, currentColumnDimensions, position);
                currentColumnDimensions.set(
                    currentColumnDimensions.x,
                    currentColumnDimensions.y + renderedCellDimensions.y,
                    currentColumnDimensions.z,
                );
            }
            currentColumnDimensions.x = currentColumnDimensions.x + renderedCellDimensions.x;

            return renderedCellDimensions;
        },
        renderCell(side: Side, buildingSection: string, elementType: number|null, elementWidth: number|null, columnPosition: THREE.Vector3, objectPosition: THREE.Vector2): THREE.Vector3 {
            const oldObject = renderedObjects[side].children.find(object => (object.userData.objectPosition.y === objectPosition.y && object.userData.objectPosition.x === objectPosition.x));
            if (elementType === null) {
                // move elementType info to own array
                elementType = buildingSection === BuildingSections[2] ? this.getPreviousElementType(side, objectPosition) : 0;
            }
            if (elementWidth === null) {
                const inHighlightedObjects = this.settings.currentColumn === objectPosition.x;
                elementWidth = inHighlightedObjects ? this.settings.elementWidth : ((oldObject?.userData.elementWidth || this.getPreviousElementWidth(side, objectPosition)) ?? 0);
            }
            const object = this.replaceObjectIfNeeded(oldObject, side, objectPosition.clone(), buildingSection, elementType, elementWidth, columnPosition);
            
            return object.userData.dimensions;

        },
        removeObsoleteObjects(side: Side, objectPosition: THREE.Vector2): void {
            const results = renderedObjects[side].children.filter(object => {
                return object.userData.objectPosition.x >= objectPosition.x || object.userData.objectPosition.y >= objectPosition.y;
            });
            results.forEach((result: THREE.Object3D) => {
                result.children[0].material.color.set(0x00ff00);
                result.removeFromParent();
            });
        },
        replaceObjectIfNeeded(result: THREE.Object3D, side: Side, objectPosition: THREE.Vector2, buildingSection: string, elementType: number, elementWidth: number, columnPosition: THREE.Vector3): THREE.Object3D {
            let resultDimensions;
            if (result) {
                if (result.userData.elementWidth === elementWidth && result.userData.elementType === elementType && result.userData.buildingSection === buildingSection) {
                    return result;
                }
                resultDimensions = result.userData.dimensions.clone();
                result.removeFromParent();
            }
 
            const generatedObject = this.generateObject(side, objectPosition, buildingSection, elementType, elementWidth, columnPosition);

            this.moveNeighbors(resultDimensions, generatedObject, side);
            
            return generatedObject;
        },
        moveNeighbors(oldObjectDimensions: THREE.Vector3, newObject: THREE.Object3D, side: string): void {
            const oldX = oldObjectDimensions?.x ?? 0;
            const objectsToMove = renderedObjects[side].children.filter(object => {
                return object.userData.objectPosition.x > newObject.userData.objectPosition.x && object.userData.objectPosition.y === newObject.userData.objectPosition.y;
            });

            const ObjectsForDistance = renderedObjects[side].children.filter(object => {
                return object.userData.objectPosition.x < newObject.userData.objectPosition.x && object.userData.objectPosition.y === newObject.userData.objectPosition.y;
            });

            let widthX = 0;
            let oldDistX = 0;
            let newDistX = 0;
            ObjectsForDistance.forEach(element => oldDistX += element.userData.dimensions.x);
            ObjectsForDistance.forEach(element => newDistX += element.userData.dimensions.x);
            oldDistX += oldX;
            newDistX += newObject.userData.dimensions.x;

            ObjectsForDistance.forEach(element => {
                widthX += element.userData.dimensions.x;
            });

            objectsToMove.forEach(object => {
                object.children[0].position.x = object.children[0].position.x + (newDistX - oldDistX);
                object.userData.columnPosition.x = object.children[0].position.x;
            });
        },
        generateObject(side: Side, objectPosition: THREE.Vector2, buildingSection: string, elementType, elementWidth, columnPosition): THREE.Object3D {
            const objectModel = this.getObj(buildingSection, elementWidth, elementType);
            const dimensions = this.getObjectDimensions(objectModel);
            this.setBetonMaterial(objectModel);
            renderedObjects[side].add(objectModel);
            const position = columnPosition.clone();
            objectModel.userData.dimensions = dimensions;
            objectModel.userData.objectPosition = objectPosition.clone();
            objectModel.userData.elementType = elementType;
            objectModel.userData.elementWidth = elementWidth;
            objectModel.userData.columnPosition = columnPosition.clone();
            objectModel.userData.buildingSection = buildingSection;
            if (side === 'back') {
                objectModel.scale.z = -0.001;
                position.z = -6000;
            } else {
                position.z = 6000;
            }
            objectModel.children[0].position.set(position.x, position.y, position.z);

            return objectModel;
        },
        getPreviousElement(side: Side, objectPosition: THREE.Vector2): THREE.Object3D {
            return renderedObjects[side].children.find(object => object.userData.objectPosition.x === objectPosition.x && object.userData.objectPosition.y === 1);
        },
        getPreviousElementType(side: Side, objectPosition: THREE.Vector2) {
            const object = this.getPreviousElement(side, objectPosition);

            return object?.userData.elementType ?? 0;
        },
        getPreviousElementWidth(side: Side, objectPosition: THREE.Vector2) {
            const object = this.getPreviousElement(side, objectPosition);

            return object?.userData.elementWidth ?? 0;
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
            plane.position.y = -70;
            plane.rotation.x = Math.PI / 2;
        },
        async getPlane(width: number, height: number): Promise<THREE.Mesh> {
            const geo = new THREE.PlaneGeometry(width, height);
            const material = betonMaterial.clone();
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
