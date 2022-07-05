<template>
    <div>
        <img v-if="qrcodeImage" :src="qrcodeImage" alt="QR Code" />
    </div>
</template>

<script>
import Vue from 'vue';
import QRCode from 'qrcode';
import Peer from 'peerjs';

export default Vue.extend({
    props: {
        settings: {
            type: Object,
            required: true,
        },
        optionsSetter: {
            type: Function,
            required: true,
        }
    },
    data() {
        return {
            peer: null,
            peerID: 'Connecting...',
            key: '',
            qrcodeImage: '',
            connection: null,
        };
    },
    watch: {
        peerID(message) {
            this.$emit('message', message);
        },
    },
    methods: {
        initPeer() {
            this.generateQrCode(`https://${ location.hostname }${ this.$route.fullPath }/sender?k=${ this.key }`);

            this.peer.on('open', () => {
                this.peerID = `${ this.peer.id }`;

                this.peer.on('connection', (connection) => {
                    this.connection = connection;
                    connection.on('open', () => {
                        this.sendMessage({ settings: this.settings });
                    });
                    connection.on('data', (data) => {
                        if ('settings' in data) {
                            this.optionsSetter(data.settings);
                        }
                    });
                });

                this.peer.on('close', () => {
                    console.log('closed');
                });
            });
        },
        sendMessage(data = {}) {
            if (this.connection) {
                this.connection.send(data);
            }
        },
        generateQrCode(text) {
            QRCode.toDataURL(text).then(image => this.qrcodeImage = image);
        },
    },
    mounted() {
        const key = this.$getKey();
        this.key = key;

        this.peer = new Peer(key, {
            host: location.hostname,
            path: '/peer',
            port: process.env.NODE_ENV === 'production' ? 443 : 9001, // using port 443 on prod because the nginx proxy redirects wss the traffic
            secure: process.env.NODE_ENV === 'production',
            debug: 3,
            config: {
                iceServers: [
                    {
                        urls: "turn:openrelay.metered.ca:80",
                        username: "openrelayproject",
                        credential: "openrelayproject",
                    },
                    {
                        urls: "turn:openrelay.metered.ca:443",
                        username: "openrelayproject",
                        credential: "openrelayproject",
                    },
                ],
            },
        });
    
        this.initPeer();
    },
});
</script>
