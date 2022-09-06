<template>
    <div>
        <canvas
            :hidden="!isDev"
            class="audioCanvas"
            ref="visualizer"
        ></canvas>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { mapActions } from 'vuex';

    export default Vue.extend({
        data() {
            return {
                isDev: process.env.NODE_ENV === 'development',
                analyser: null,
                canvas: null,
                canvasCtx: null,
                drawVisual: null,
                bufferLength: null,
                dataArray: null,
                WIDTH: null,
                HEIGHT: null,
            };
        },
        methods: {
            ...mapActions([
                'FIRE_EVENT',
            ]),
            visualize(): void {
                this.WIDTH = this.canvas.width;
                this.HEIGHT = this.canvas.height;

                this.analyser.fftSize = 32;
                this.bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(this.bufferLength);

                this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

                this.drawBars();

            },
            drawBars(): void {
                this.drawVisual = requestAnimationFrame(this.drawBars);

                this.analyser.getByteFrequencyData(this.dataArray);

                if (this.isDev) {
                    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                }

                let barWidth = (this.WIDTH / this.bufferLength);
                let barHeight;
                let x = 0;

                for (let i = 0; i < this.bufferLength; i++) {
                    barHeight = this.dataArray[i];

                    if (this.isDev) {
                        this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
                        this.canvasCtx.fillRect(x, this.HEIGHT - barHeight / 2, barWidth, barHeight / 2);
                    }

                    x += barWidth + 1;

                    let payload = {
                        commitData: {},
                        key: i,
                        value: Math.floor(barHeight / 2),
                    };
                    if (barHeight > 0) {
                        this.FIRE_EVENT(payload);
                    }
                }
            },
            initAudioInput(): void {
                const audioCtx = new window.AudioContext();
                let source;

                this.analyser = audioCtx.createAnalyser();
                this.analyser.minDecibels = -90;
                this.analyser.maxDecibels = -10;
                this.analyser.smoothingTimeConstant = 0.85;

                this.canvas = this.$refs.visualizer;
                this.canvasCtx = this.canvas.getContext('2d');

                if (navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ audio: true })
                    .then((stream: MediaStream) => {
                        source = audioCtx.createMediaStreamSource(stream);
                        source.connect(this.analyser);
                        this.visualize();
                    })
                    .catch((err: Error) => console.error(`The following error occured: ${ err }`));
                } else {
                    console.error('getUserMedia not supported on your browser!');
                }
            },
            clickHandler(): void {
                this.initAudioInput();
                document.body.removeEventListener('click', this.clickHandler);
            },
        },
        mounted() {
            document.body.addEventListener('click', this.clickHandler);
        }
    });
</script>

<style scoped>
.audioCanvas {
    border: 2px solid white;
    z-index: 500;
    position: absolute;
    bottom: 0;
    left: 0;
    top: auto !important;
    width: 150px !important;
    height: 150px !important;
    transform: none !important;
}
</style>