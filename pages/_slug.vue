<template>
  <div>
    <main v-if="receiverReady" class="mainClass">
      <component :is="Renderer" />
    </main>
    <Receiver v-if="slug" :page="slug" @ready="ready" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import PeerClient from '@/components/PeerClient.vue';
  import Receiver from '@/components/Receiver.vue';
  import MicrophoneInput from '@/components/MicrophoneInput.vue';
  import Sender from '@/components/Sender.vue';

  export default Vue.extend({
    name: 'IndexPage',
    components: {
      MicrophoneInput,
      Receiver,
      Sender,
      PeerClient,
    },
    asyncData({ params }) {
      const slug = params.slug;
      return { slug };
    },
    data() {
      return {
        receiverReady: false,
        pageName: '',
      };
    },
    computed: {
      Renderer() {
        return () => import(`@/components/${this.slug}/Renderer.vue`);
      },
    },
    methods: {
      ready() {
        this.receiverReady = true;
      },
    },
  });
</script>
