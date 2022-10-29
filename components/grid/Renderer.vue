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
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import { gsap } from 'gsap';
import { configs } from 'static/beton/configs';
import { GRAIN_SHADER } from 'assets/beton/shaders/grainShader';
import { HalftonePass } from 'assets/beton/shaders/HalftonePass.js';

if (WebGL.isWebGL2Available() === false) {
    console.error('No WebGL2 support');
}

interface NamedObjectWrapper {
    nameList: string[],
    object: THREE.Group,
}
type Dimension = 'x' | 'y' | 'z';
type DimensionProperty = 'min' | 'max';
type Side = 'front' | 'back';
enum BuildingSections {
    basement,
    ground,
    rooms,
    roof,
}

const objects = {};
const sides: Side[] = ['front', 'back'];

const betonMaterial = new THREE.MeshPhongMaterial({
    color: 0xDDDDDD,
});
let scene = null;
let camera = null;
const renderedObjects = {
    front: new THREE.Group(),
    back: new THREE.Group(),
};
let orbitControls;
let grainPass;
let halftonePassDotMatrix;
let halftonePassGrayscale;
const objLoader = new OBJLoader();

export default Vue.extend({
    data() {
        return {
            isDev: process.env.NODE_ENV === 'development',
            rendering: false,
            objectTypes: {
                front: {
                    roof: [],
                    ground: [],
                    rooms: [],
                    basement: [],
                },
                back: {
                    roof: [],
                    ground: [],
                    rooms: [],
                    basement: [],
                },
            },
            objects: {
                front: new THREE.Group(),
                back: new THREE.Group(),
            },
            highlightedObjects: [],
        };
    },
    computed: {
        ...mapState([
            'settings',
        ]),
        side(): Side {
            return this.settings.side === 0 ? 'front' : 'back';
        },
    },
    watch: {
        async 'settings.totalColumns'(): Promise<void> {
            if (!this.rendering) {
                this.rendering = true;
                await this.renderAll();
                this.highlightCurrentBuildingColumn(this.settings.currentColumn);
                this.rendering = false;
            }
        },
        async 'settings.totalRows'(): Promise<void> {
            if (!this.rendering) {
                this.rendering = true;
                await this.renderAll();
                this.highlightCurrentBuildingColumn(this.settings.currentColumn);
                this.rendering = false;
            }
        },
        'settings.side'(side: number): void {
            this.setSide(side);
            this.highlightCurrentBuildingColumn(this.settings.currentColumn);
        },
        async 'settings.columnType'(columnType: number): Promise<void> {
            if (!this.rendering) {
                this.rendering = true;
                await this.rerenderColumnOnBothSides(columnType, null);
                this.rendering = false;
            }
        },
        async 'settings.elementType'(elementType: number): Promise<void> {
            if (!this.rendering) {
                this.rendering = true;
                await this.rerenderColumnOnSide(sides[this.settings.side], null, elementType);
                this.rendering = false;
            }
        },
        'settings.currentColumn'(currentColumn: number): void {
            this.highlightCurrentBuildingColumn(currentColumn);
        },
        'settings.style'(style: number): void {
            grainPass.enabled = style !== 2;
            halftonePassDotMatrix.enabled = style === 1;
            halftonePassGrayscale.enabled = style === 2;
        },
        highlightedObjects(objects: THREE.Object3D[], oldObjects: THREE.Object3D[]): void {
            oldObjects.forEach((object) => {
                this.setMaterialColor(object, 14540253);
            });
            objects.forEach((object) => {
                this.setMaterialColor(object, 10066329);
            });
        },
    },
    async mounted(): Promise<void> {
        if (process.client) {
            await this.initThree();
        }
    },
    methods: {
        setSide(sideNumber) {
            const position = new THREE.Vector3(-40, 10, -80 * ((sideNumber - 0.5) * 2));
            if (orbitControls) {
                const lookAtTarget = new THREE.Vector3(20, 17, 0);
                gsap.to(camera.position, {
                    ...position,
                    duration: 1,
                    onUpdate() {
                        camera.lookAt(lookAtTarget);
                    },
                });
            }
        },
        async rerenderColumnOnBothSides(columnType: number | null, elementType: number | null = null): Promise<void> {
            for (const side of sides) {
                await this.rerenderColumnOnSide(side, columnType, elementType);
            }
            this.highlightCurrentBuildingColumn(this.settings.currentColumn);
        },
        async rerenderColumnOnSide(side: string, columnType: number | null, elementType: number | null = null): Promise<void> {
            const samePos = renderedObjects[side].children.find(child => child.userData.objectPosition.x === this.settings.currentColumn && child.userData.objectPosition.y === 0);
            if (!samePos) {
                console.error('None here');
                return;
            }
            await this.renderColumn(side, new THREE.Vector3(samePos.userData.columnPosition.x, samePos.userData.columnPosition.y, 0), this.settings.currentColumn, columnType, elementType);
        },
        async initThree(): Promise<void> {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
            this.renderer = new THREE.WebGLRenderer();
            // this.renderer = new THREE.WebGLRenderer({ antialias: true });
            if (!this.isDev) {
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }
            // don't need antialias because where multisampling in WebGLRenderTarget
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.25;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.$refs.main.appendChild(this.renderer.domElement);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.loadFloorObject();
            this.initEnvironment();
            const target = new THREE.WebGLMultisampleRenderTarget(window.innerWidth, window.innerHeight);
            const composer = new EffectComposer(this.renderer, target);
            // composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
            grainPass.enabled = (this.settings.style !== 2);
            halftonePassDotMatrix.enabled = (this.settings.style === 1);
            halftonePassGrayscale.enabled = (this.settings.style === 2);
            composer.render();
            sides.forEach((side) => {
                renderedObjects[side].scale.set(0.001, 0.001, 0.001);
                scene.attach(renderedObjects[side]);
            });
            await this.renderAll();
            const animate = (composer: EffectComposer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void => {
                composer.render();
                if (halftonePassGrayscale && halftonePassGrayscale.uniforms.random) {
                    halftonePassGrayscale.uniforms.random.value = (1 - Math.random());
                }
                if (this.settings.style !== 2) {
                    grainPass.uniforms.rand.value = Math.random();
                }
                requestAnimationFrame(() => animate(composer, scene, camera));
            };
            animate(composer, scene, camera);
        },
        initEnvironment(): void {
            orbitControls = new OrbitControls(camera, this.renderer.domElement);
            this.renderer.setClearColor(0x201000, 1);
            scene.fog = new THREE.FogExp2(0x301505, 0.002);
            const light = new THREE.AmbientLight(0x151000);
            scene.add(light);
            const spotlight0 = this.getSpotlight(0xffcc99, 4);
            scene.add(spotlight0);
            spotlight0.position.set(50, 60, -30);
            const spotlight1 = this.getSpotlight(0xffaa77, 1);
            scene.add(spotlight1);
            spotlight1.position.set(0, 60, 60);
            camera.position.set(-40, 10, -80 * ((this.settings.side - 0.5) * 2));
            const lookAtTarget = new THREE.Vector3(20, 17, 0);
            camera.lookAt(lookAtTarget);
            orbitControls.target = lookAtTarget;
            orbitControls.update();
        },
        highlightCurrentBuildingColumn(currentColumn: number): void {
            const selectedSide = sides[this.settings.side];
            this.highlightedObjects = renderedObjects[selectedSide].children.filter((object: THREE.Object3D) => {
                return object.userData.objectPosition.x === currentColumn;
            });
        },
        getDimension(object: THREE.Object3D, property: DimensionProperty, dimension: Dimension): number {
            return object.children[0].geometry.boundingBox[property][dimension];
        },
        async getObject(nameList: string[]): Promise<NamedObjectWrapper> {
            const result: NamedObjectWrapper = {
                nameList,
                object: null,
            };

            if (nameList.length === 0) {
                const geometry = new THREE.BoxGeometry(0, 0, 0);
                geometry.computeBoundingBox();
                const group = new THREE.Group();
                group.add(new THREE.Mesh(geometry));
                result.object = group.clone();

                return result;
            }

            if (nameList.length > 1) {
                const tempObjects = [];
                const name = nameList.toString();

                if (name in objects) {
                    result.object = objects[name].clone();

                    return result;
                }

                for (const name of nameList) {
                    if (!(name in objects)) {
                        tempObjects.push(await this.loadObjectFile(name));
                    } else {
                        tempObjects.push(objects[name].clone());
                    }
                }

                result.object = this.mergeObjects(tempObjects, nameList);

                return result;
            } else if (!(nameList[0] in objects)) {
                result.object = await this.loadObjectFile(nameList[0]);
            } else {
                result.object = objects[nameList[0]].clone();
            }
            return result;
        },
        mergeObjects(objectGroups: THREE.Group[], name: string): THREE.Group {
            const group = new THREE.Group();

            for (const objectGroup of objectGroups) {
                const obj = objectGroup.children[0].clone();
                obj.geometry.computeBoundingBox();
                group.add(obj);
            }

            let offsetX = 0;
            for (const obj of group.children) {
                obj.position.x = obj.position.x + offsetX;
                offsetX = offsetX + obj.geometry.boundingBox.max.x;
                obj.updateMatrix();
            }

            objects[name] = group.clone();

            return group;
        },
        async loadObjectFile(name: string): Promise<void> {
            const loadedObject = await objLoader.loadAsync(`/obj/objects/${name}`);
            if (loadedObject.children.length < 1) {
                throw new Error(`Missing model: ${name}`);
            }
            loadedObject.traverse((child: THREE.Mesh | any): void => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.computeBoundingBox();
                    // child.material = betonMaterial;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            objects[name] = loadedObject.clone();
            return loadedObject;
        },
        async renderAll(): Promise<void> {
            for (const side of sides) {
                this.removeObsoleteObjects(side, new THREE.Vector2(this.settings.totalColumns, this.settings.totalRows));
                const currentDimensions = new THREE.Vector3(0, 0, 0);
                for (let columnIndex = 0; columnIndex < this.settings.totalColumns; columnIndex++) {
                    const renderedColumnDimensions = await this.renderColumn(side, currentDimensions, columnIndex);
                    currentDimensions.set(currentDimensions.x + renderedColumnDimensions.x, currentDimensions.y, currentDimensions.z);
                }
            };
        },
        async renderColumn(side: Side, fullSize: THREE.Vector3, objectX: number, columnType: number = null, elementType = null): Promise<THREE.Vector3> {
            const currentColumnDimensions = fullSize.clone();
            let renderedCellDimensions;
            for (let cellIndex = 0; cellIndex < this.settings.totalRows; cellIndex++) {
                const position = new THREE.Vector2(objectX, cellIndex);
                renderedCellDimensions = await this.renderCell(side, columnType, elementType, currentColumnDimensions, position);
                currentColumnDimensions.set(currentColumnDimensions.x, currentColumnDimensions.y + renderedCellDimensions.y, currentColumnDimensions.z);
            }
            currentColumnDimensions.x = currentColumnDimensions.x + renderedCellDimensions.x;

            return renderedCellDimensions;
        },
        async renderCell(side: Side, columnType: number, elementType: number | null, columnPosition: THREE.Vector3, objectPosition: THREE.Vector2): Promise<THREE.Vector3> {
            const oldObject = renderedObjects[side].children.find(object => (object.userData.objectPosition.equals(objectPosition)));
            const buildingSection = this.getBuildingSectionByYCoordinate(objectPosition.y);
            if (elementType === null) {
                elementType = buildingSection === BuildingSections[3] ? this.getPreviousElementType(side, objectPosition) : 0;
            }
            const nameListConfig = this.getObjectFileName(columnType, buildingSection, elementType);
            const oldObjectDimensions = this.getDimensionsFromUserData(oldObject);
            const object = await this.replaceObjectIfNeeded(oldObject, oldObjectDimensions, side, objectPosition.clone(), nameListConfig.name, buildingSection, elementType, columnPosition, nameListConfig.type);

            return object.userData.dimensions;
        },
        async replaceObjectIfNeeded(result: THREE.Object3D | null, oldObjectDimensions: THREE.Vector3, side: Side, objectPosition: THREE.Vector2, nameList: string[], buildingSection: string, elementType: number, columnPosition: THREE.Vector3, objectType: string): THREE.Object3D {
            if (result) {
                if (result.userData.name === nameList?.toString() && result.userData.columnPosition.equals(columnPosition) && objectType === buildingSection) {
                    return result;
                }
                result.removeFromParent();
            }
            const generatedObject = await this.generateObject(side, nameList, objectPosition, elementType, columnPosition, buildingSection, objectType);
            this.moveNeighbors(oldObjectDimensions, generatedObject, side);

            return generatedObject;
        },
        async generateObject(side: Side, nameList: string[], objectPosition: THREE.Vector2, elementType, columnPosition, buildingSection, objectType): Promise<THREE.Object3D> {
            const object = await this.getObject(nameList);
            if (!('object' in object)) {
                console.log('err', nameList);
            }
            const objectModel = object.object;
            const dimensions = this.getObjectDimensions(objectModel);
            this.setBetonMaterial(objectModel);
            renderedObjects[side].add(objectModel);
            objectModel.userData.name = object.nameList.toString();
            objectModel.userData.objectType = objectType;
            objectModel.userData.buildingSection = buildingSection;
            objectModel.userData.dimensions = dimensions;
            objectModel.userData.objectPosition = objectPosition.clone();
            objectModel.userData.elementType = elementType;
            objectModel.userData.columnPosition = columnPosition.clone();
            if (side === 'back') {
                objectModel.scale.z = -1;
            }
            const position = columnPosition.clone();
            objectModel.position.set(position.x, position.y, 0);

            return objectModel;
        },
        removeObsoleteObjects(side: Side, objectPosition: THREE.Vector2): void {
            const results = renderedObjects[side].children.filter((object) => {
                return object.userData.objectPosition.x >= objectPosition.x || object.userData.objectPosition.y >= objectPosition.y;
            });
            results.forEach((result: THREE.Object3D): void => {
                result.removeFromParent();
            });
        },
        getDimensionsFromUserData(object: THREE.Object3D | null): THREE.Vector3 {
            return object?.userData.dimensions.clone() ?? new THREE.Vector3(0, 0, 0);
        },
        moveNeighbors(oldObjectDimensions: THREE.Vector3, newObject: THREE.Object3D, side: string): void {
            const oldX = oldObjectDimensions?.x ?? 0;
            const objectsToMove = renderedObjects[side].children.filter((object) => {
                return object.userData.objectPosition.x > newObject.userData.objectPosition.x && object.userData.objectPosition.y === newObject.userData.objectPosition.y;
            });
            const ObjectsForDistance = renderedObjects[side].children.filter((object) => {
                return object.userData.objectPosition.x < newObject.userData.objectPosition.x && object.userData.objectPosition.y === newObject.userData.objectPosition.y;
            });
            let oldDistX = 0;
            let newDistX = 0;
            ObjectsForDistance.forEach(element => oldDistX = oldDistX + element.userData.dimensions.x);
            ObjectsForDistance.forEach(element => newDistX = newDistX + element.userData.dimensions.x);
            oldDistX += oldX;
            newDistX += newObject.userData.dimensions.x;
            objectsToMove.forEach((object: THREE.Group): void => {
                object.position.x = object.position.x + (newDistX - oldDistX);
                object.userData.columnPosition.x = object.position.x;
            });
        },
        getObjectFileName(columnType: number = 0, buildingSection: string, elementType: number) {
            columnType = columnType ?? this.settings.columnType;
            const groundlength = configs[columnType].elements.ground.length;
            if (buildingSection === 'ground' && groundlength === 0) {
                buildingSection = 'rooms';
            }

            const objectlength = configs[columnType].elements[buildingSection].length;
            return { type: buildingSection, name: configs[columnType].elements[buildingSection][elementType % objectlength] };
        },
        getBuildingSectionByYCoordinate(y: number) {
            switch (y) {
                case 0:
                    return BuildingSections[0];
                case 1:
                    return BuildingSections[1];
                default:
                    return (y + 1) === this.settings.totalRows ? BuildingSections[3] : BuildingSections[2];
            }
        },
        getPreviousElement(side: Side, objectPosition: THREE.Vector2): THREE.Object3D {
            return renderedObjects[side].children.find(object => object.userData.objectPosition.x === objectPosition.x && object.userData.objectPosition.y === 1);
        },
        getPreviousElementType(side: Side, objectPosition: THREE.Vector2) {
            const object = this.getPreviousElement(side, objectPosition);

            return object?.userData.elementType ?? 0;
        },
        getObjectDimensions(objectModel: THREE.Object3D): THREE.Vector3 {
            return new THREE.Vector3(Math.max(...objectModel.children.map(child => child.position.x)) + objectModel.children[0].geometry.boundingBox.max.x - objectModel.children[0].geometry.boundingBox.min.x, objectModel.children[0].geometry.boundingBox.max.y - objectModel.children[0].geometry.boundingBox.min.y, objectModel.children[0].geometry.boundingBox.max.z - objectModel.children[0].geometry.boundingBox.min.z);
        },
        setBetonMaterial(targetObject: THREE.Object3D): void {
            for (const child of targetObject.children) {
                child.material = betonMaterial.clone();
            }
        },
        setMaterialColor(targetObject: THREE.Object3D, color: THREE.Color): void {
            for (const child of targetObject.children) {
                child.material.color.setHex(color);
            }
        },
        getPlane(width: number, height: number): Promise<THREE.Mesh> {
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
        async loadFloorObject(): Promise<void> {
            const mtlLoader = new MTLLoader();
            const materials = await mtlLoader.loadAsync('/obj/material.lib');
            objLoader.setMaterials(materials);
            const loadedObject = await objLoader.loadAsync('/obj/mars.obj');
            loadedObject.scale.set(0.007, 0.007, 0.007);
            loadedObject.rotation.y = Math.PI / 2;
            loadedObject.position.set(-110, -6.45, 22);
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
    },
});
</script>
