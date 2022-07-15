<template>
    <div hidden>
        <div class="overlay"></div>
        <canvas class="visualizer"></canvas>
    </div>
</template>

<script>
    import Vue, { nextTick } from "vue";
    import { mapActions } from 'vuex';

    export default Vue.extend({
        methods: {
            ...mapActions([
                'FIRE_EVENT',
            ]),
        },
        created() {
            let this2 = this;
            nextTick(() => {
                // Some browsers partially implement mediaDevices. We can't just assign an object
                // with getUserMedia as it would overwrite existing properties.
                // Here, we will just add the getUserMedia property if it's missing.
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = function (constraints) {
    
                        // First get ahold of the legacy getUserMedia, if present
                        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
                        // Some browsers just don't implement it - return a rejected promise with an error
                        // to keep a consistent interface
                        if (!getUserMedia) {
                            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                        }
    
                        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                        return new Promise(function (resolve, reject) {
                            getUserMedia.call(navigator, constraints, resolve, reject);
                        });
                    }
                }
    
                // set up forked web audio context, for multiple browsers
                // window. is needed otherwise Safari explodes
    
                var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                var source;
                var stream;
    
                // grab the mute button to use below
    
                var mute = document.querySelector('.mute');
    
                //set up the different audio nodes we will use for the app
    
                var analyser = audioCtx.createAnalyser();
                analyser.minDecibels = -90;
                analyser.maxDecibels = -10;
                analyser.smoothingTimeConstant = 0.85;
    
                var distortion = audioCtx.createWaveShaper();
                var gainNode = audioCtx.createGain();
                var biquadFilter = audioCtx.createBiquadFilter();
                var convolver = audioCtx.createConvolver();
    
                // set up canvas context for visualizer
    
                var canvas = document.querySelector('.visualizer');
                var canvasCtx = canvas.getContext("2d");
    
                var drawVisual;
    
                //main block for doing the audio recording
    
                if (navigator.mediaDevices.getUserMedia) {
                    console.log('getUserMedia supported.');
                    var constraints = { audio: true }
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(
                            function (stream) {
                                console.log(stream);
                                source = audioCtx.createMediaStreamSource(stream);
                                // source.connect(distortion);
                                // distortion.connect(biquadFilter);
                                // biquadFilter.connect(gainNode);
                                // convolver.connect(gainNode);
                                source.connect(analyser);
                                // analyser.connect(audioCtx.destination);
                                visualize();
                            })
                        .catch(function (err) { console.log('The following gUM error occured: ' + err); })
                } else {
                    console.log('getUserMedia not supported on your browser!');
                }
    
                function visualize() {
                    let WIDTH = canvas.width;
                    let HEIGHT = canvas.height;

                    // analyser.fftSize = 256;
                    analyser.fftSize = 32;
                    var bufferLengthAlt = analyser.frequencyBinCount;
                    var dataArrayAlt = new Uint8Array(bufferLengthAlt);
    
                    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    
                    var drawAlt = function () {
                        drawVisual = requestAnimationFrame(drawAlt);
    
                        analyser.getByteFrequencyData(dataArrayAlt);
    
                        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    
                        var barWidth = (WIDTH / bufferLengthAlt);
                        var barHeight;
                        var x = 0;
    
                        for (var i = 0; i < bufferLengthAlt; i++) {
                            barHeight = dataArrayAlt[i];
    
                            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
    
                            x += barWidth + 1;

                            let payload = {
                                commitData: {},
                                key: i,
                                value: Math.floor(barHeight/255*127),
                            };
                            if (barHeight > 0) {
                                this2.FIRE_EVENT(payload);
                            }
                        }
                    };
                    
                    drawAlt();

                    console.log("essss");
                }
            });
        },
    });
</script>