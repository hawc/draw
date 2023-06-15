<template>
  <div>
    <Receiver standalone>
      <Renderer />
    </Receiver>
    <!-- <MicrophoneInput v-if="populated" /> -->
    <Sender standalone :controllers="defaults" class="standalone" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapMutations, mapState } from 'vuex';
  import Receiver from '@/components/Receiver.vue';
  import Renderer from '@/components/ink/Renderer.vue';
  import MicrophoneInput from '@/components/MicrophoneInput.vue';
  import { defaults } from '~/assets/ink/defaults';
  import Sender from '@/components/Sender.vue';

  export default Vue.extend({
    name: 'IndexPage',
    components: {
      MicrophoneInput,
      Receiver,
      Renderer,
      Sender,
    },
    data() {
      return {
        defaults,
      };
    },
    computed: {
      ...mapState(['populated']),
    },
    beforeMount() {
      this.POPULATE_STORE(defaults);
    },
    methods: {
      ...mapMutations(['POPULATE_STORE']),
    },
  });
</script>
