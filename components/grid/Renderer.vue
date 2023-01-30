<template>
  <div class="renderer">
    <div
      ref="main"
      class="main">
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue';
import { mapState } from 'vuex';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

if (WebGL.isWebGL2Available() === false) {
    console.error('No WebGL2 support');
}
let scene = null;
let camera = null;
let renderer = null;
let orbitControls;
let text = null;

function Canvas (parent) {
    const renderer = new THREE.WebGLRenderer();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    let scene = new THREE.Scene();
    renderer.setClearColor(0x00f0f0);
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.PlaneGeometry( 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    camera.position.set(0,0,150)
    plane.position.set(0,0,0)
    geometry.scale(100,100,100)
    camera.lookAt(0,0,0)

    orbitControls = new OrbitControls(camera, renderer.domElement);
    // renderer.setClearColor(0x000000, 1);
    const light = new THREE.AmbientLight(0x151000);
    scene.add(light);
    // camera.position.set(-40, 10, -80 * ((this.settings.side - 0.5) * 2));
    // const lookAtTarget = new THREE.Vector3(20, 17, 0);
    // camera.lookAt(lookAtTarget);
    // orbitControls.target = lookAtTarget;
    orbitControls.update();

    renderer.render(scene, camera);
    parent.appendChild(renderer.domElement);
    const animate = (): void => {
        renderer.render(scene, camera);
        requestAnimationFrame(() => animate());
    };
    animate();

    return plane;
}

function Element( x, y, z, ry ) {
    const div = document.createElement( 'div' );
    div.classList.add('box');

    // const textSpan = document.createElement( 'span' );
    // textSpan.style.width = '480px';
    // textSpan.style.height = '360px';
    // textSpan.style.border = '0px';
    // textSpan.style.color = 'white';
    // textSpan.textContent = 'demo';
    // div.appendChild( textSpan );

    // const object = new CSS3DObject( div );
    // object.position.set( x, y, z );
    // object.rotation.y = ry;
    text = Canvas(div);

    return div;
}

export default Vue.extend({
    data() {
        return {
            isDev: process.env.NODE_ENV === 'development',
            text: null,
            lineText: null,
        };
    },
    computed: {
        ...mapState([
            'settings',
        ]),
    },
    watch: {
        'settings.width'(width) {
            this.$refs.main.querySelector('.box').style.width = `${ 100 / width }%`;
            // this.text.scale.set(width, 1, 1);
        }
    },
    async mounted(): Promise<void> {
        if (process.client) {
            await this.initThree();
        }
    },
    methods: {
        async initThree(): Promise<void> {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
            // renderer = new CSS3DRenderer();
            if (!this.isDev) {
                // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }
            // this.$refs.main.appendChild(renderer.domElement);
            // renderer.setSize(window.innerWidth, window.innerHeight);
            // this.initEnvironment();
            
            // const loader = new FontLoader();
            // const group = new THREE.Group();
            for (let index = 0; index < this.settings.totalRows; index++) {
                const row = document.createElement( 'div' );
                row.classList.add('row');
                for (let index = 0; index < this.settings.totalColumns; index++) {
                    row.appendChild(Element( 0, 0, 240, 0 ));
                }
                this.$refs.main.appendChild(row);
            }
            this.text = text;
            // group.add( Element( 0, 0, 240, 0 ) );
            // group.add( Element( 240, 0, 0, Math.PI / 2 ) );
            // group.add( Element( 0, 0, - 240, Math.PI ) );
            // group.add( Element( - 240, 0, 0, - Math.PI / 2 ) );
            // scene.add( group );
            /*
            loader.load('https://threejs-plactice.vercel.app/fontloader/fonts/helvetiker_regular.typeface.json', ( font ) => {

                const color = 0x006699;

                const matDark = new THREE.LineBasicMaterial( {
                    color: color,
                    side: THREE.DoubleSide
                } );

                const matLite = new THREE.MeshBasicMaterial( {
                    color: color,
                    transparent: true,
                    opacity: 0.4,
                    side: THREE.DoubleSide
                } );

                const message = '   Three.js\nSimple text.';
                const shapes = font.generateShapes( message, 100 );
                const geometry = new THREE.ShapeGeometry( shapes );
                geometry.computeBoundingBox();
                const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
                geometry.translate( xMid, 0, 0 );
                // make shape ( N.B. edge view not visible )
                this.text = new THREE.Mesh( geometry, matLite );
                this.text.position.z = - 150;
                scene.add( this.text );
                // make line shape ( N.B. edge view remains visible )
                const holeShapes = [];
                for ( let i = 0; i < shapes.length; i ++ ) {
                    const shape = shapes[ i ];
                    if ( shape.holes && shape.holes.length > 0 ) {
                        for ( let j = 0; j < shape.holes.length; j ++ ) {
                            const hole = shape.holes[ j ];
                            holeShapes.push( hole );
                        }
                    }
                }
                shapes.push.apply( shapes, holeShapes );
                this.lineText = new THREE.Object3D();
                for ( let i = 0; i < shapes.length; i ++ ) {
                    const shape = shapes[ i ];
                    const points = shape.getPoints();
                    const geometry = new THREE.BufferGeometry().setFromPoints( points );
                    geometry.translate( xMid, 0, 0 );
                    const lineMesh = new THREE.Line( geometry, matDark );
                    this.lineText.add( lineMesh );
                }
                scene.add( this.lineText );
            });
            */


            // const animate = (): void => {
            //     renderer.render(scene, camera);
            //     requestAnimationFrame(() => animate());
            // };
            // animate();
        },
        // initEnvironment(): void {
        //     orbitControls = new OrbitControls(camera, renderer.domElement);
        //     // renderer.setClearColor(0x000000, 1);
        //     const light = new THREE.AmbientLight(0x151000);
        //     scene.add(light);
        //     camera.position.set(-40, 10, -80 * ((this.settings.side - 0.5) * 2));
        //     const lookAtTarget = new THREE.Vector3(20, 17, 0);
        //     camera.lookAt(lookAtTarget);
        //     orbitControls.target = lookAtTarget;
        //     orbitControls.update();
        // },
        // getSpotlight(color: THREE.Color, intensity: number): THREE.PointLight {
        //     const light = new THREE.PointLight(color, intensity);
        //     light.castShadow = true;
        //     light.shadow.mapSize.x = 4096;
        //     light.shadow.mapSize.y = 4096;

        //     return light;
        // },
    },
});
</script>

<style scoped>
.renderer {
    width: 100vw;
    height: 100vh;
}
.main {
    display: flex;
    flex-direction: column;
}
.row {
    display: flex;
    height: 100%;
    width: 100%;

}
.box {
    display: flex;
    background-color: black;
}
canvas {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
}
</style>