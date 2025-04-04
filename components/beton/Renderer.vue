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
  import { gsap } from 'gsap';
  import { configs } from 'static/beton/configs';
  import { GRAIN_SHADER } from 'assets/beton/shaders/grainShader';
  import { HalftonePass } from 'assets/beton/shaders/HalftonePass.js';

  interface NamedObjectWrapper {
    nameList: string[];
    object: THREE.Group;
  }
  interface ObjectIdentifier {
    type: string;
    name: string;
  }
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
    color: 0xffffff,
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
      ...mapState(['settings']),
      side(): Side {
        return this.settings.side === 0 ? 'front' : 'back';
      },
      currentColumn(): number {
        return this.$limitNumber(this.settings.currentColumn, {
          min: 0,
          max: this.settings.totalColumns - 1,
          step: 1,
          default: 0,
        });
      },
    },
    watch: {
      async 'settings.totalColumns'(): Promise<void> {
        if (!this.rendering) {
          this.rendering = true;
          await this.renderAll();
          this.highlightCurrentBuildingColumn(this.currentColumn);
          this.rendering = false;
        }
      },
      async 'settings.totalRows'(): Promise<void> {
        if (!this.rendering) {
          this.rendering = true;
          await this.renderAll();
          this.highlightCurrentBuildingColumn(this.currentColumn);
          this.rendering = false;
        }
      },
      'settings.side'(side: number): void {
        this.setSide(side);
        this.highlightCurrentBuildingColumn(this.currentColumn);
      },
      async 'settings.columnType'(columnType: number): Promise<void> {
        if (!this.rendering) {
          this.rendering = true;
          await this.rerenderColumnOnBothSides(
            columnType,
            this.settings.elementType,
          );
          this.rendering = false;
        }
      },
      async 'settings.elementType'(elementType: number): Promise<void> {
        if (!this.rendering) {
          this.rendering = true;
          const similarObjectInSamePlace = renderedObjects[
            this.side
          ].children.find((object: THREE.Group): boolean => {
            const sameOnOtherSide = renderedObjects[
              this.side === 'front' ? 'back' : 'front'
            ].children.find((objectOnOtherSide) =>
              objectOnOtherSide.userData.objectPosition.equals(
                object.userData.objectPosition,
              ),
            );
            return (
              object.userData.objectPosition.x === this.currentColumn &&
              object.userData.buildingSection === 'rooms' &&
              object.userData.dimensions.equals(
                sameOnOtherSide.userData.dimensions,
              )
            );
          });
          if (similarObjectInSamePlace) {
            await this.rerenderColumnOnSide(
              sides[this.settings.side],
              this.settings.columnType,
              elementType,
            );
          } else {
            // if different columnType is in the same position we need to make sure both sides have the same width
            await this.rerenderColumnOnBothSides(
              this.settings.columnType,
              elementType,
            );
          }
          this.rendering = false;
        }
      },
      currentColumn(currentColumn: number): void {
        this.highlightCurrentBuildingColumn(currentColumn);
      },
      'settings.style'(style: number): void {
        grainPass.enabled = style !== 2;
        halftonePassDotMatrix.enabled = style === 1;
        halftonePassGrayscale.enabled = style === 2;
      },
      highlightedObjects(
        objects: THREE.Object3D[],
        oldObjects: THREE.Object3D[],
      ): void {
        oldObjects.forEach((object: THREE.Object3D): void => {
          this.setMaterialColor(object, 0xffffff);
        });
        objects.forEach((object: THREE.Object3D): void => {
          this.setMaterialColor(object, 0xdddddd);
        });
      },
    },
    async mounted(): Promise<void> {
      if (process.client) {
        await this.initThree();
      }
    },
    methods: {
      async initThree(): Promise<void> {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          30,
          window.innerWidth / window.innerHeight,
          1,
          1000,
        );
        this.renderer = new THREE.WebGLRenderer();
        // this.renderer = new THREE.WebGLRenderer({ antialias: true });
        if (!this.isDev) {
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.25;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.$refs.main.appendChild(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.loadFloorObject();
        this.initEnvironment();
        const target = new THREE.WebGLRenderTarget(
          window.innerWidth,
          window.innerHeight,
          { samples: 4 },
        );
        const composer = new EffectComposer(this.renderer, target);
        if (!this.isDev) {
          composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        this.initShaders(composer);
        composer.render();
        sides.forEach((side: Side): void => {
          renderedObjects[side].scale.set(0.001, 0.001, 0.001);
          scene.attach(renderedObjects[side]);
        });
        await this.renderAll();
        const animate = (
          composer: EffectComposer,
          scene: THREE.Scene,
          camera: THREE.PerspectiveCamera,
        ): void => {
          composer.render();
          if (halftonePassGrayscale && halftonePassGrayscale.uniforms.random) {
            halftonePassGrayscale.uniforms.random.value = 1 - Math.random();
          }
          if (this.settings.style !== 2) {
            grainPass.uniforms.rand.value = Math.random();
          }
          requestAnimationFrame(() => animate(composer, scene, camera));
        };
        animate(composer, scene, camera);
      },
      initShaders(composer: EffectComposer): void {
        composer.addPass(new RenderPass(scene, camera));
        grainPass = new ShaderPass(GRAIN_SHADER);
        composer.addPass(grainPass);
        halftonePassDotMatrix = new HalftonePass(
          window.innerWidth,
          window.innerHeight,
          {
            shape: 1,
            radius: 4,
            scatter: 0,
            blending: 1,
            blendingMode: 0,
            greyscale: false,
          },
        );
        halftonePassGrayscale = new HalftonePass(
          window.innerWidth,
          window.innerHeight,
          {
            shape: 1,
            radius: 2,
            scatter: 1,
            blending: 1,
            blendingMode: 0,
            greyscale: true,
          },
        );
        composer.addPass(halftonePassDotMatrix);
        composer.addPass(halftonePassGrayscale);
        grainPass.enabled = this.settings.style !== 2;
        halftonePassDotMatrix.enabled = this.settings.style === 1;
        halftonePassGrayscale.enabled = this.settings.style === 2;
      },
      initEnvironment(): void {
        orbitControls = new OrbitControls(camera, this.renderer.domElement);
        this.renderer.setClearColor(0x201000, 1);
        scene.fog = new THREE.FogExp2(0x301505, 0.002);
        const light = new THREE.AmbientLight(0x151000);
        scene.add(light);
        const spotlight0 = this.getSpotlight(0xffcc99, 3);
        scene.add(spotlight0);
        spotlight0.position.set(50, 60, -30);
        const spotlight1 = this.getSpotlight(0xffaa77, 1);
        scene.add(spotlight1);
        spotlight1.position.set(0, 60, 60);
        camera.position.set(60, 10, -80 * ((this.settings.side - 0.5) * 2));
        const lookAtTarget = new THREE.Vector3(10, 17, 0);
        camera.lookAt(lookAtTarget);
        orbitControls.target = lookAtTarget;
        orbitControls.update();
      },
      setSide(sideNumber: number): void {
        const position = new THREE.Vector3(
          60,
          10,
          -80 * ((sideNumber - 0.5) * 2),
        );
        if (orbitControls) {
          const lookAtTarget = new THREE.Vector3(10, 17, 0);
          gsap.to(camera.position, {
            ...position,
            duration: 1,
            onUpdate() {
              camera.lookAt(lookAtTarget);
            },
          });
        }
      },
      async rerenderColumnOnBothSides(
        columnType: number | null,
        elementType: number | null = null,
      ): Promise<void> {
        for (const side of sides) {
          await this.rerenderColumnOnSide(side, columnType, elementType);
        }
        this.highlightCurrentBuildingColumn(this.currentColumn);
      },
      async rerenderColumnOnSide(
        side: string,
        columnType: number | null,
        elementType: number | null = null,
      ): Promise<void> {
        const objectWithSamePosition = renderedObjects[side].children.find(
          (child: THREE.Group): boolean => {
            return (
              child.userData.objectPosition.x === this.currentColumn &&
              child.userData.objectPosition.y === 0
            );
          },
        );
        await this.renderColumn(
          side,
          new THREE.Vector3(
            objectWithSamePosition.userData.columnPosition.x,
            objectWithSamePosition.userData.columnPosition.y,
            0,
          ),
          this.currentColumn,
          columnType,
          elementType,
        );
      },
      highlightCurrentBuildingColumn(currentColumn: number): void {
        const selectedSide = sides[this.settings.side];
        this.highlightedObjects = renderedObjects[selectedSide].children.filter(
          (object: THREE.Group): boolean => {
            return object.userData.objectPosition.x === currentColumn;
          },
        );
      },
      async getObject(nameList: string[]): Promise<NamedObjectWrapper> {
        const name = nameList.toString();
        const result: NamedObjectWrapper = {
          nameList,
          object: null,
        };

        switch (nameList.length) {
          case 0: {
            const geometry = new THREE.BoxGeometry(0, 0, 0);
            geometry.computeBoundingBox();
            const group = new THREE.Group();
            group.add(new THREE.Mesh(geometry));
            result.object = group.clone();

            return result;
          }
          case 1: {
            if (!(name in objects)) {
              result.object = await this.loadObjectFile(name);
            } else {
              result.object = objects[name].clone();
            }

            return result;
          }
          default: {
            const tempObjects = [];

            if (name in objects) {
              result.object = objects[name].clone();

              return result;
            }

            for (const objectName of nameList) {
              if (!(objectName in objects)) {
                tempObjects.push(await this.loadObjectFile(objectName));
              } else {
                tempObjects.push(objects[objectName].clone());
              }
            }

            result.object = this.mergeObjects(tempObjects, nameList);

            return result;
          }
        }
      },
      mergeObjects(objectGroups: THREE.Group[], name: string): THREE.Group {
        const group = new THREE.Group();

        for (const objectGroup of objectGroups) {
          const child = objectGroup.children[0].clone();
          child.geometry.computeBoundingBox();
          group.add(child);
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
          this.removeObsoleteObjects(
            side,
            new THREE.Vector2(
              this.settings.totalColumns,
              this.settings.totalRows,
            ),
          );
          const currentDimensions = new THREE.Vector3(0, 0, 0);
          for (
            let columnIndex = 0;
            columnIndex < this.settings.totalColumns;
            columnIndex++
          ) {
            const renderedColumnDimensions = await this.renderColumn(
              side,
              currentDimensions,
              columnIndex,
            );
            currentDimensions.set(
              currentDimensions.x + renderedColumnDimensions.x,
              currentDimensions.y,
              currentDimensions.z,
            );
          }
        }
      },
      async renderColumn(
        side: Side,
        fullSize: THREE.Vector3,
        objectX: number,
        columnType: number = 0,
        elementType = 0,
      ): Promise<THREE.Vector3> {
        const currentColumnDimensions = fullSize.clone();
        let renderedCellDimensions;
        for (
          let cellIndex = 0;
          cellIndex < this.settings.totalRows;
          cellIndex++
        ) {
          const position = new THREE.Vector2(objectX, cellIndex);
          renderedCellDimensions = await this.renderCell(
            side,
            columnType,
            elementType,
            currentColumnDimensions,
            position,
          );
          currentColumnDimensions.set(
            currentColumnDimensions.x,
            currentColumnDimensions.y + renderedCellDimensions.y,
            currentColumnDimensions.z,
          );
        }
        currentColumnDimensions.x =
          currentColumnDimensions.x + renderedCellDimensions.x;

        return renderedCellDimensions;
      },
      async renderCell(
        side: Side,
        columnType: number = 0,
        elementType: number = 0,
        columnPosition: THREE.Vector3,
        objectPosition: THREE.Vector2,
      ): Promise<THREE.Vector3> {
        const oldObject = renderedObjects[side].children.find((object) =>
          object.userData.objectPosition.equals(objectPosition),
        );
        const buildingSection = this.getBuildingSectionByYCoordinate(
          objectPosition.y,
        );
        if (buildingSection === BuildingSections[3]) {
          // for roof elements, the elementType is always based on if it's the first or last column.
          elementType = 0;
          if (objectPosition.x === this.settings.totalColumns - 1) {
            elementType = 2;
          }
          if (objectPosition.x === 0) {
            elementType = 1;
          }
        }
        const nameListConfig = this.getObjectFileName(
          columnType,
          buildingSection,
          elementType,
        );
        const oldObjectDimensions = this.getDimensionsFromUserData(oldObject);
        const object = await this.replaceObjectIfNeeded(
          oldObject,
          oldObjectDimensions,
          side,
          objectPosition.clone(),
          nameListConfig.name,
          buildingSection,
          elementType,
          columnType,
          columnPosition,
          nameListConfig.type,
        );

        return object.userData.dimensions;
      },
      async replaceObjectIfNeeded(
        result: THREE.Object3D | null,
        oldObjectDimensions: THREE.Vector3,
        side: Side,
        objectPosition: THREE.Vector2,
        nameList: string[],
        buildingSection: string,
        elementType: number,
        columnType,
        columnPosition: THREE.Vector3,
        objectType: string,
      ): THREE.Object3D {
        if (result) {
          if (
            result.userData.name === nameList?.toString() &&
            result.userData.columnPosition.equals(columnPosition) &&
            objectType === buildingSection
          ) {
            return result;
          }
          result.removeFromParent();
        }
        const generatedObject = await this.generateObject(
          side,
          nameList,
          objectPosition,
          elementType,
          columnType,
          columnPosition,
          buildingSection,
          objectType,
        );
        this.moveNeighbors(oldObjectDimensions, generatedObject, side);

        return generatedObject;
      },
      async generateObject(
        side: Side,
        nameList: string[],
        objectPosition: THREE.Vector2,
        elementType,
        columnType,
        columnPosition,
        buildingSection,
        objectType,
      ): Promise<THREE.Object3D> {
        const object = await this.getObject(nameList);
        const objectModel = object.object;
        const dimensions = this.getObjectDimensions(objectModel);
        this.setBetonMaterial(objectModel);
        renderedObjects[side].add(objectModel);
        objectModel.userData = {
          name: object.nameList.toString(),
          objectType,
          elementType,
          columnType,
          buildingSection,
          dimensions,
          objectPosition: objectPosition.clone(),
          columnPosition: columnPosition.clone(),
        };
        if (side === 'back') {
          objectModel.scale.z = -1;
        }
        const position = columnPosition.clone();
        objectModel.position.set(position.x, position.y, 0);

        return objectModel;
      },
      removeObsoleteObjects(side: Side, objectPosition: THREE.Vector2): void {
        const results = renderedObjects[side].children.filter((object) => {
          return (
            object.userData.objectPosition.x >= objectPosition.x ||
            object.userData.objectPosition.y >= objectPosition.y
          );
        });
        results.forEach((result: THREE.Object3D): void => {
          result.removeFromParent();
        });
      },
      getDimensionsFromUserData(object: THREE.Object3D | null): THREE.Vector3 {
        return (
          object?.userData.dimensions.clone() ?? new THREE.Vector3(0, 0, 0)
        );
      },
      moveNeighbors(
        oldObjectDimensions: THREE.Vector3,
        newObject: THREE.Object3D,
        side: string,
      ): void {
        const oldX = oldObjectDimensions?.x ?? 0;
        const objectsToMove = renderedObjects[side].children.filter(
          (object) => {
            return (
              object.userData.objectPosition.x >
                newObject.userData.objectPosition.x &&
              object.userData.objectPosition.y ===
                newObject.userData.objectPosition.y
            );
          },
        );
        const ObjectsForDistance = renderedObjects[side].children.filter(
          (object) => {
            return (
              object.userData.objectPosition.x <
                newObject.userData.objectPosition.x &&
              object.userData.objectPosition.y ===
                newObject.userData.objectPosition.y
            );
          },
        );
        let oldDistX = 0;
        let newDistX = 0;
        ObjectsForDistance.forEach(
          (element) => (oldDistX = oldDistX + element.userData.dimensions.x),
        );
        ObjectsForDistance.forEach(
          (element) => (newDistX = newDistX + element.userData.dimensions.x),
        );
        oldDistX += oldX;
        newDistX += newObject.userData.dimensions.x;
        objectsToMove.forEach((object: THREE.Group): void => {
          object.position.x = object.position.x + (newDistX - oldDistX);
          object.userData.columnPosition.x = object.position.x;
        });
      },
      getObjectFileName(
        columnType: number,
        buildingSection: string,
        elementType: number,
      ): ObjectIdentifier {
        const groundlength = configs[columnType].elements.ground.length;
        if (buildingSection === 'ground' && groundlength === 0) {
          buildingSection = 'rooms';
        }

        const objectlength =
          configs[columnType].elements[buildingSection].length;
        return {
          type: buildingSection,
          name: configs[columnType].elements[buildingSection][
            elementType % objectlength
          ],
        };
      },
      getBuildingSectionByYCoordinate(y: number): string {
        switch (y) {
          case 0:
            return BuildingSections[0];
          case 1:
            return BuildingSections[1];
          default:
            return y + 1 === this.settings.totalRows
              ? BuildingSections[3]
              : BuildingSections[2];
        }
      },
      getPreviousElement(
        side: Side,
        objectPosition: THREE.Vector2,
      ): THREE.Object3D {
        return renderedObjects[side].children.find(
          (object) =>
            object.userData.objectPosition.x === objectPosition.x &&
            object.userData.objectPosition.y === 1,
        );
      },
      getPreviousElementType(
        side: Side,
        objectPosition: THREE.Vector2,
      ): number {
        const object = this.getPreviousElement(side, objectPosition);

        return object?.userData.elementType ?? 0;
      },
      getObjectDimensions(objectModel: THREE.Object3D): THREE.Vector3 {
        const x = objectModel.children
          .map((child: THREE.Object3D) => child.geometry.boundingBox.max.x)
          .reduce(
            (accumulator: number, value: number): number => accumulator + value,
          );
        const y =
          objectModel.children[0].geometry.boundingBox.max.y -
          objectModel.children[0].geometry.boundingBox.min.y;
        const z =
          objectModel.children[0].geometry.boundingBox.max.z -
          objectModel.children[0].geometry.boundingBox.min.z;

        return new THREE.Vector3(x, y, z);
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
      getSpotlight(color: THREE.Color, intensity: number): THREE.SpotLight {
        const light = new THREE.SpotLight(color, intensity);
        light.angle = Math.PI / 3;
        light.penumbra = 1.13;
        light.castShadow = true;
        light.shadow.mapSize.x = 2 * 4096;
        light.shadow.mapSize.y = 2 * 4096;
        light.shadow.radius = 20;

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
        const loadedNormalsTexture = await textureLoader.load(
          '/obj/MarsEnv_nrm.tga',
        );
        const loadedSpecTexture = await textureLoader.load(
          '/obj/MarsEnv_spc.tga',
        );
        const loadedMapTexture = await textureLoader.load(
          '/obj/MarsEnv_diff.tga',
        );
        loadedObject.children[0].material.normalMap = loadedNormalsTexture;
        loadedObject.children[0].material.specularMap = loadedSpecTexture;
        loadedObject.children[0].material.map = loadedMapTexture;
        loadedObject.children[0].receiveShadow = true;
        scene.add(loadedObject);
      },
    },
  });
</script>
