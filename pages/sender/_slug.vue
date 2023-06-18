<template>
  <div class="sender">
    <Sender v-if="defaults && mounted" :controllers="defaults" is-external />
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapMutations } from 'vuex';
  import Sender from '@/components/Sender.vue';

  export default Vue.extend({
    name: 'DetailPage',
    components: {
      Sender,
    },
    asyncData({ params }) {
      const slug = params.slug;
      return { slug };
    },
    data() {
      return {
        defaults: null,
      };
    },
    async beforeMount() {
      this.defaults = await import(`~/assets/${this.slug}/defaults`).then(
        (defaultsImport) => defaultsImport.defaults,
      );
      this.POPULATE_STORE(this.defaults);
      this.mounted = true;
    },
    methods: {
      ...mapMutations(['POPULATE_STORE']),
    },
  });
</script>

<style>
  body {
    background: #000;
    color: white;
  }
</style>
