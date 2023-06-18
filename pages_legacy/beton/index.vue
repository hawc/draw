<template>
  <div>
    <main v-if="receiverReady" class="mainClass">
      <Renderer />
    </main>
    <Receiver page="beton" @ready="ready" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import PeerClient from '@/components/PeerClient.vue';
  import Receiver from '@/components/Receiver.vue';
  import Renderer from '@/components/beton/Renderer.vue';
  import MicrophoneInput from '@/components/MicrophoneInput.vue';
  import Sender from '@/components/Sender.vue';

  export default Vue.extend({
    name: 'IndexPage',
    components: {
      MicrophoneInput,
      Receiver,
      Renderer,
      Sender,
      PeerClient,
    },
    data() {
      return {
        receiverReady: false,
      };
    },
    methods: {
      ready() {
        this.receiverReady = true;
      },
    },
  });
</script>
