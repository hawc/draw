<template>
    <div>
        <canvas
            :hidden="!isDev"
            class="audioCanvas"
            ref="visualizer"
        ></canvas>
    </div>
</template>

<script>
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
            };
        },
        methods: {
            ...mapActions([
                'FIRE_EVENT',
            ]),
            visualize() {
                let WIDTH = this.canvas.width;
                let HEIGHT = this.canvas.height;

                this.analyser.fftSize = 32;
                const bufferLengthAlt = this.analyser.frequencyBinCount;
                const dataArrayAlt = new Uint8Array(bufferLengthAlt);

                this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                const drawAlt = () => {
                    this.drawVisual = requestAnimationFrame(drawAlt);

                    this.analyser.getByteFrequencyData(dataArrayAlt);

                    if (this.isDev) {
                        this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                        this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                    }

                    let barWidth = (WIDTH / bufferLengthAlt);
                    let barHeight;
                    let x = 0;

                    for (let i = 0; i < bufferLengthAlt; i++) {
                        barHeight = dataArrayAlt[i];

                        if (this.isDev) {
                            this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
                            this.canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
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
                };

                drawAlt();

            },
            initAudioInput() {
                var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                var source;

                this.analyser = audioCtx.createAnalyser();
                this.analyser.minDecibels = -90;
                this.analyser.maxDecibels = -10;
                this.analyser.smoothingTimeConstant = 0.85;

                this.canvas = this.$refs.visualizer;
                this.canvasCtx = this.canvas.getContext('2d');

                if (navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ audio: true })
                    .then((stream) => {
                        source = audioCtx.createMediaStreamSource(stream);
                        source.connect(this.analyser);
                        this.visualize();
                    })
                    .catch((err) => console.log(`The following gUM error occured: ${ err }`));
                } else {
                    console.log('getUserMedia not supported on your browser!');
                }
            },
            clickHandler() {
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