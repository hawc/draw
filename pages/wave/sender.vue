<template>
  <div>
    <Sender :controllers="defaults" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import { defaults } from 'assets/wave/defaults';
import Sender from '@/components/Sender.vue';

export default Vue.extend({
  components: {
    Sender,
  },
  data() {
    return {
      defaults,
    };
  },
  beforeMount() {
    this.POPULATE_STORE(defaults);
  },
  methods: {
    ...mapMutations([
      'POPULATE_STORE',
    ]),
  },
});
</script>

<style>
    body {
        background: #000;
        color: white;
    }
</style>
