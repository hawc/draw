<template>
  <div></div>
</template>

<script lang="ts">
  import Vue from 'vue';
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
    },
    data() {
      return {
        peer: null,
        connection: null,
        controlSettings: {},
      };
    },
    watch: {
      controlSettings: {
        deep: true,
        handler(settings) {
          this.optionsSetter(settings);
          this.sendMessage({ settings });
        },
      },
      settings: {
        deep: true,
        handler(settings) {
          this.controlSettings = JSON.parse(JSON.stringify(settings));
        },
      },
    },
    mounted() {
      this.peer = new PeerJS(this.$getKey(), {
        host: location.hostname,
        path: '/peer',
        port: process.env.NODE_ENV === 'production' ? 443 : 9001, // using port 443 on prod because the nginx proxy redirects wss the traffic
        secure: process.env.NODE_ENV === 'production',
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
      showCallContent(): void {
        this.$emit('message', 'Please connect.');
      },
      sendMessage(data = {}): void {
        if (this.connection) {
          this.connection.send(data);
        }
      },
      resetStoreSettings(): void {
        // We need to clear the store to refresh the DOM
        // TODO: Only pre-populate store on renderer side
        const resetSettings = JSON.parse(JSON.stringify(this.settings));
        Object.keys(resetSettings).forEach(
          (key) => (resetSettings[key] = null),
        );
        this.optionsSetter(resetSettings);
      },
      connectPeers(): void {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('k');
        if (code) {
          this.connection = this.peer.connect(code);
          this.connection.on('open', () => {
            this.resetStoreSettings();
            this.connection.on('data', (data) => {
              if ('settings' in data) {
                this.optionsSetter(data.settings);
                this.controlSettings = data.settings;
              }
            });
            this.connection.on('close', () => {
              this.showCallContent();
            });

            this.$emit('message', "You're connected.");
          });
          this.connection.on('error', (error) => {
            console.error('Error connecting: ', error);
          });
        }
      },
      call(): void {
        this.connectPeers();
      },
      recall(): void {
        this.connection = this.peer.reconnect();
        this.$emit('message', "You're connected.");
      },
      hangUp(): void {
        this.connection.close();
        this.showCallContent();
      },
      initPeer(): void {
        this.peer.on('open', () => {
          this.$emit('message', 'Please connect.');
          this.call();

          this.peer.on('close', () => {
            this.showCallContent();
          });

          this.peer.on('disconnected', () => {
            this.$emit('message', 'You are Disconnected. Please reload.');
          });
        });

        this.peer.on('error', (data) => {
          console.error(data);
        });
      },
    },
  });
</script>
