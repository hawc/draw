<template>
  <div>
    <div v-if="amounted">
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
          <a
            :title="peerID"
            class="joystick"
            :href="`${$route.fullPath}${
              $route.fullPath.substr(-1) === '/' ? '' : '/'
            }sender?k=${peerID}`"
            target="_new"
          >
            <PeerClient
              :settings="settings"
              :options-setter="SET_OPTIONS"
              @message="setMessage"
            />
          </a>
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
        amounted: false,
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
      this.amounted = true;
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
