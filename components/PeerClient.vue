<template>
  <a :title="peerID" class="joystick" :href="link" target="_new">
    <img v-if="qrcodeImage" :src="qrcodeImage" alt="QR Code" />
  </a>
</template>

<script lang="ts">
  import Vue from 'vue';
  import QRCode from 'qrcode';
  import PeerJS from 'peerjs';

  export default Vue.extend({
    props: {
      settings: {
        type: Object,
        required: true,
      },
      optionsSetter: {
        type: Function,
        required: true,
      },
      page: {
        type: String,
        required: true,
      },
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
    computed: {
      isProd() {
        return process.env.NODE_ENV === 'production';
      },
      link() {
        return `${location.protocol}/sender/${this.page}?k=${this.key}`;
      },
    },
    watch: {
      peerID(message): void {
        this.$emit('message', message);
      },
    },
    mounted() {
      const key = this.$getKey();
      this.key = key;

      this.peer = new PeerJS(key, {
        host: location.hostname,
        path: '/peer',
        port: this.isProd ? 443 : 9001, // using port 443 on prod because the nginx proxy redirects wss the traffic
        secure: this.isProd,
        // debug: 3,
        config: {
          iceServers: [
            {
              urls: 'turn:openrelay.metered.ca:80',
              username: 'openrelayproject',
              credential: 'openrelayproject',
            },
            {
              urls: 'turn:openrelay.metered.ca:443',
              username: 'openrelayproject',
              credential: 'openrelayproject',
            },
          ],
        },
      });

      this.initPeer();
    },
    methods: {
      initPeer(): void {
        this.generateQrCode(this.link);

        this.peer.on('open', () => {
          this.peerID = `${this.peer.id}`;

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
            console.log('Connection closed');
          });
        });
      },
      sendMessage(data = {}): void {
        if (this.connection) {
          this.connection.send(data);
        }
      },
      generateQrCode(text: string): void {
        QRCode.toDataURL(text).then((image) => (this.qrcodeImage = image));
      },
    },
  });
</script>
