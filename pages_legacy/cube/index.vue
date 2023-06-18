<template>
  <div>
    <Receiver>
      <Renderer />
    </Receiver>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapMutations } from 'vuex';
  import Receiver from '@/components/Receiver.vue';
  import Renderer from '@/components/cube/Renderer.vue';
  import { defaults } from '~/assets/cube/defaults';

  export default Vue.extend({
    name: 'IndexPage',
    components: {
      Receiver,
      Renderer,
    },
    beforeMount() {
      this.POPULATE_STORE(defaults);
    },
    methods: {
      ...mapMutations(['POPULATE_STORE']),
    },
  });
</script>
