<template>
  <div>
    <div v-if="mounted">
      <MicrophoneInput v-if="useAudio && populated" />
      <Sender
        :use-external="useExternal"
        :controllers="defaults"
        class="standalone"
      >
        <label for="useExternal" class="checkboxLabel">
          <input
            id="useExternal"
            type="checkbox"
            @change="useExternal = !useExternal"
          />
          {{ getTranslation('useExternal') }}
        </label>
        <label for="useAudio" class="checkboxLabel">
          <input id="useAudio" type="checkbox" @change="useAudio = !useAudio" />
          {{ getTranslation('useAudio') }}
        </label>
        <div v-if="useExternal">
          <PeerClient
            :page="page"
            :settings="settings"
            :options-setter="SET_OPTIONS"
            @message="setMessage"
          />
        </div>
      </Sender>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapMutations, mapActions, mapState } from 'vuex';
  import PeerClient from '@/components/PeerClient.vue';
  import MicrophoneInput from '@/components/MicrophoneInput.vue';
  import Sender from '@/components/Sender.vue';
  import { getTranslation } from '@/static/translations';

  export default Vue.extend({
    components: {
      MicrophoneInput,
      Sender,
      PeerClient,
    },
    props: {
      page: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        useExternal: false,
        useAudio: false,
        peerID: '',
        mounted: false,
        defaults: null,
      };
    },
    computed: {
      ...mapState(['populated', 'settings']),
    },
    async beforeMount() {
      this.defaults = await import(`~/assets/${this.page}/defaults`).then(
        (defaultsImport) => defaultsImport.defaults,
      );
      this.POPULATE_STORE(this.defaults);
      this.mounted = true;
      this.$emit('ready');
    },
    methods: {
      ...mapMutations(['POPULATE_STORE']),
      ...mapActions(['SET_OPTIONS']),
      getTranslation,
      setMessage(message: string): void {
        this.peerID = message;
      },
    },
  });
</script>
