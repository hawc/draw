<template>
    <div class="renderer">
        <canvas
            id="canvasDump"
            ref="canvasDump"
            class="skyCanvas"></canvas>
        <main></main>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import p5 from 'p5';
import gifshot from 'gifshot';
import colormap from 'colormap';
import colorscale from 'colormap/colorScale';
import frag from '@/assets/remote-sky/threshold.frag';
import vert from '@/assets/remote-sky/threshold.vert';
import { textures } from 'assets/remote-sky/defaults';

let back = null;
let front = null;

const modelTypes = [
    'box',
    'sphere',
    'torus',
];

export default Vue.extend({
    data() {
        return {
            backLayer: null,
            frontLayer: null,
            mediaRecorder: null,
            skyColors: [
                '#00000f', '#8a6da2', '#f8eeff',
            ],
            colors: Object.keys(colorscale),
            shades: 40,
            color1: '#000000',
            color2: '#000000',
            color3: '#000000',
        };
    },
    computed: {
        ...mapState([
            'settings',
            'stopMultiplicator',
            'isRecording',
            'isRecordingNow',
            'gifData',
        ]),
        sizeRatio() {
            return document.querySelector('main canvas').offsetWidth / 800;
        },
        pixelDensity() {
            return (1.7 - this.settings.pixelation) * ((0.5 / window.devicePixelRatio) * this.sizeRatio);
        },
        maxDimension() {
            return Math.max(window.innerWidth, window.innerHeight);
        },
    },
    watch: {
        'settings.colorName'(value) {
            if (value !== null) {
                this.getColorMap(value);
            }
        },
        'settings.colorPadding'(value) {
            if (value !== null) {
                this.getColorMap(this.settings.colorName);
            }
        },
    },
    methods: {
        ...mapMutations([
            'SET_IS_RECORDING',
            'SET_IS_RECORDING_NOW',
            'SET_CURRENT_RECORD_STATUS',
            'SET_STOP_MULTIPLICATOR',
            'SET_GIF_DATA',
            'SET_DL_READY',
            'SET_DL_GIF',
            'SET_DL_NAME',
            'PUSH_GIF_DATA',
        ]),
        getColorMap(colorMapIndex) {
            const colors = colormap({
                colormap: this.colors[colorMapIndex],
                nshades: this.shades,
                format: 'hex',
                alpha: 1,
            });
            this.color1 = colors[this.settings.colorPadding];
            this.color2 = colors[(colors.length - (colors.length % 2)) / 2];
            this.color3 = colors[colors.length - 1 - this.settings.colorPadding];
        },
        hexToRgb(hex) {
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            return result
                ? new Float32Array([
                    parseInt(result[1], 16) / 255,
                    parseInt(result[2], 16) / 255,
                    parseInt(result[3], 16) / 255,
                ])
                : null;
        },
        getImageData(canvas1, canvas2, width, height) {
            const c = this.$refs.canvasDump;
            c.width = width;
            c.height = height;
            const context = c.getContext('2d');
            context.imageSmoothingEnabled = false;

            context.drawImage(canvas1, 0, 0, canvas1.width, canvas1.height, 0, 0, width, height);
            context.drawImage(canvas2, 0, 0, canvas2.width, canvas2.height, 0, 0, width, height);

            return c.toDataURL();
        },
        createGif(images) {
            this.SET_IS_RECORDING_NOW(false);
            this.SET_CURRENT_RECORD_STATUS('render');
            gifshot.createGIF({
                images,
                gifWidth: this.maxDimension,
                gifHeight: this.maxDimension,
                numWorkers: 4,
                sampleInterval: 500,
                interval: 0.03,
                progressCallback: (captureProgress) => {
                    this.renderStatus = captureProgress;
                },
            }, (object) => {
                if (!object.error) {
                    const image = object.image;
                    this.SET_DL_NAME(`planet-${textures[this.settings.globeTexture]}.gif`);
                    this.SET_DL_GIF(image);
                    this.SET_DL_READY(true);
                    this.recordButtonDisabled = false;
                    this.SET_CURRENT_RECORD_STATUS('done');
                    this.SET_GIF_DATA([]);
                } else {
                    this.recordButtonDisabled = false;
                    this.SET_CURRENT_RECORD_STATUS('error');
                    this.SET_GIF_DATA([]);
                }
            });
        },
        initP5() {
            let loadedRingsTexture;
            let loadedRingsTexture2;

            const loadedTextures = [];

            this.backLayer = (p) => {
                let bgShader;
                let loadedBgTexture;
                let backgroundGraphic;
                p.setup = () => {
                    loadedBgTexture = p.loadImage(require('@/assets/textures/bg.jpg'), (img) => {
                        p.image(img, -400, -400, 800, 800);
                    });
                    p.frameRate(30);
                    const backCanvas = p.createCanvas(800, 800, p.WEBGL);
                    backCanvas.class('skyCanvas');
                    backgroundGraphic = p.createGraphics(800, 800, p.WEBGL);
                    bgShader = p.createShader(vert, frag);
                    p.shader(bgShader);
                    bgShader.setUniform('thresholdValue', 0.4);
                    p.setAttributes('preserveDrawingBuffer', true);
                };
                p.draw = () => {
                    backgroundGraphic.clear();
                    p.pixelDensity(this.pixelDensity);
                    const diameter = 2 + (1.6 * ((this.settings.globeDiameter / 170) - 0.5));
                    backgroundGraphic.image(loadedBgTexture, -400 * diameter, -400 * diameter, 800 * diameter, 800 * diameter);
                    bgShader.setUniform('color1', this.hexToRgb(this.$shadeHexColor(this.color1, 0.7)));
                    bgShader.setUniform('color2', this.hexToRgb('#00000f'));
                    bgShader.setUniform('color3', this.hexToRgb(this.$shadeHexColor(this.color2, 0.7)));
                    bgShader.setUniform('tex0', backgroundGraphic);
                    p.rect(0, 0, p.width, p.height);
                };
            };
            this.frontLayer = (p) => {
                let frontShader;
                let planetGraphic;
                p.setup = () => {
                    p.createDiv().class('root');

                    textures.forEach((texture) => {
                        loadedTextures.push(p.loadImage(require(`@/assets/textures/${texture}.jpg`)));
                    });
                    loadedRingsTexture = p.loadImage(require('@/assets/textures/2d2.png'));
                    loadedRingsTexture2 = p.loadImage(require('@/assets/textures/2d-donut.png'));
                    p.frameRate(30);
                    const frontCanvas = p.createCanvas(800, 800, p.WEBGL);
                    frontCanvas.class('skyCanvas');
                    p.setAttributes('preserveDrawingBuffer', true);
                    p.setAttributes('alpha', true);
                    planetGraphic = p.createGraphics(800, 800, p.WEBGL);
                    frontShader = p.createShader(vert, frag);
                };

                let frame = 1;
                let loopCount = 0;
                let recordingLoop = null;
                p.draw = () => {
                    frame = frame + 0.0075 * this.settings.rotationSpeed * this.stopMultiplicator;
                    loopCount = Math.floor(frame / (2 * Math.PI));
                    const frameRotation = (Math.round(frame % (2 * Math.PI) * 100) / 100);
                    if (this.isRecordingNow) {
                        this.SET_CURRENT_RECORD_STATUS('record');
                        this.PUSH_GIF_DATA(this.getImageData(back.canvas, front.canvas, this.maxDimension, this.maxDimension));
                    }
                    if (frameRotation <= 0.1) {
                        if (this.isRecording) {
                            this.SET_IS_RECORDING_NOW(true);
                            recordingLoop = loopCount;
                            this.SET_IS_RECORDING(false);
                        }

                        if (this.isRecordingNow && loopCount > recordingLoop) {
                            this.SET_IS_RECORDING_NOW(false);
                            this.createGif(this.gifData);
                        }
                    }
                    const modelTypeName = modelTypes[this.settings.modelType] ?? 'sphere';
                    planetGraphic.clear();

                    p.pixelDensity(this.pixelDensity);
                    planetGraphic.background(p.color(255, 0, 0));
                    planetGraphic.noStroke();
                    planetGraphic.fill(p.color(176, 176, 176));
                    planetGraphic.texture(modelTypeName !== 'sphere' ? loadedRingsTexture2 : loadedRingsTexture);

                    planetGraphic.push();
                    planetGraphic.rotateY(frame);
                    planetGraphic.rotateZ(0.25);
                    planetGraphic.rotateX(-0.25);
                    planetGraphic.rotateY(frame * 2);

                    planetGraphic.push();
                    const globeDiameter = this.settings.globeDiameter;
                    const colorPresetUsed = this.colorPreset;
                    planetGraphic.texture(loadedTextures[this.settings.globeTexture ?? 0]);

                    switch (modelTypeName) {
                        case 'box':
                            planetGraphic[modelTypeName](globeDiameter + 20);
                            break;
                        default:
                            planetGraphic[modelTypeName](globeDiameter, 24, 24);
                    }

                    planetGraphic.pop();

                    planetGraphic.push();
                    planetGraphic.rotateX(0);
                    planetGraphic.rotateY(0);
                    planetGraphic.rotateZ(0);
                    planetGraphic.rotateX(Math.PI / 2);
                    let torusDetailY = 2;
                    switch (modelTypeName) {
                        case 'torus':
                            torusDetailY = 24;
                            break;
                        case 'box':
                            torusDetailY = 4;
                            break;
                    }
                    const torusCount = this.settings.ringsCount;
                    const ringsDiameter = this.settings.ringsDiameter;
                    const ringsDistance = this.settings.ringsDistance * 100;
                    let ringBefore = 0;
                    const tilt = this.settings.ringsTilt;
                    if (torusCount >= 1) {
                        planetGraphic.push();
                        ringBefore = ringsDistance + globeDiameter + 30;
                        planetGraphic.rotateX(tilt * -1);
                        planetGraphic.torus(ringBefore, 4 + ringsDiameter, 48, torusDetailY);
                        planetGraphic.pop();
                    }
                    if (torusCount >= 2) {
                        planetGraphic.push();
                        ringBefore = ringBefore + 20 + (ringsDiameter * 2);
                        planetGraphic.rotateX(tilt * 2);
                        planetGraphic.rotateZ(frame * -0.025);
                        planetGraphic.torus(ringBefore, ringsDiameter, 48, torusDetailY);
                        planetGraphic.pop();
                    }
                    if (torusCount >= 3) {
                        planetGraphic.push();
                        ringBefore = ringBefore + 50 + (ringsDiameter * 2);
                        planetGraphic.rotateZ(frame * -0.1);
                        planetGraphic.rotateX(tilt * 0.3);
                        planetGraphic.torus(ringBefore, 11 + ringsDiameter, 48, torusDetailY);
                        planetGraphic.pop();
                    }
                    if (torusCount >= 4) {
                        planetGraphic.push();
                        ringBefore = ringBefore + 20 + (ringsDiameter * 2);
                        planetGraphic.rotateZ(frame * -0.015);
                        planetGraphic.rotateX(tilt * -1.5);
                        planetGraphic.torus(ringBefore, ringsDiameter / 2, 48, torusDetailY);
                        planetGraphic.pop();
                    }
                    planetGraphic.pop();

                    planetGraphic.pop();
                    const threshold = parseFloat(this.settings.contrast);
                    p.shader(frontShader);
                    frontShader.setUniform('tex0', planetGraphic);
                    if (colorPresetUsed) {
                        frontShader.setUniform('color1', this.hexToRgb(this.colorPresets[colorPresetUsed][0]));
                        frontShader.setUniform('color2', this.hexToRgb(this.colorPresets[colorPresetUsed][1]));
                        frontShader.setUniform('color3', this.hexToRgb(this.colorPresets[colorPresetUsed][2]));
                    } else {
                        frontShader.setUniform('color1', this.hexToRgb(this.color1));
                        frontShader.setUniform('color2', this.hexToRgb(this.color2));
                        frontShader.setUniform('color3', this.hexToRgb(this.color3));
                    }
                    frontShader.setUniform('thresholdValue', threshold);

                    p.rect(0, 0, p.width, p.height);
                };
            };

            back = new p5(this.backLayer);
            front = new p5(this.frontLayer);
        },
    },
    mounted() {
        this.getColorMap(this.settings.colorName);
        this.initP5();

        document.addEventListener('keyup', (event) => {
            if (event.keyCode === 32 && this.stopMultiplicator !== 0) {
                this.SET_STOP_MULTIPLICATOR(0);
            } else {
                this.SET_STOP_MULTIPLICATOR(1);
            }
        });
    },
});
</script>
