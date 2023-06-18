<template>
  <div class="controlsWrapper">
    <div v-if="controllers" class="controls">
      <slot></slot>
      <PeerController
        ref="controller"
        :settings="settings"
        :options-setter="SET_OPTIONS"
        @message="setMessage"
      />
      <template v-if="!useExternal">
        <div
          v-for="(controller, controllerKey) in controllers"
          :key="controllerKey"
          class="row"
        >
          <label :for="controllerKey.toString()">{{
            getTranslation(controllerKey.toString())
          }}</label>
          <input
            :id="controllerKey.toString()"
            v-model.number="controlSettings[controllerKey]"
            type="range"
            :min="controller.min"
            :max="controller.max"
            :step="controller.step"
          />
        </div>
      </template>
      <p v-if="isExternal">
        {{ statusMessage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapState } from 'vuex';
  import PeerController from './PeerController.vue';
  import { getTranslation } from '@/static/translations';

  export default Vue.extend({
    components: {
      PeerController,
    },
    props: {
      controllers: {
        type: Object,
        default: () => {},
      },
      useExternal: {
        type: Boolean,
        default: false,
      },
      isExternal: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        statusMessage: 'Connecting...',
        controlSettings: {},
      };
    },
    computed: {
      ...mapState(['settings']),
    },
    watch: {
      controlSettings: {
        deep: true,
        handler(settings): void {
          this.SET_OPTIONS(settings);
          if (this.useExternal) {
            this.$refs.controller.sendMessage({ settings });
          }
        },
      },
      settings: {
        deep: true,
        handler(settings): void {
          this.controlSettings = JSON.parse(JSON.stringify(settings));
        },
      },
    },
    mounted() {
      if (process.client) {
        this.$nextTick(() => {
          this.ADD_MIDI_CONTROLLER();
        });
      }
    },
    methods: {
      ...mapActions(['SET_OPTIONS', 'ADD_MIDI_CONTROLLER']),
      setMessage(message: string): void {
        this.statusMessage = message;
      },
      getTranslation,
    },
  });
</script>

<style scoped>
  hr {
    position: relative;
    height: 4px;
    width: 4px;
    margin: 20px auto;
    border: none;
    background: hotpink;
    overflow: visible;
  }
  hr::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    height: 4px;
    width: 4px;
    left: -10px;
    background: hotpink;
  }
  hr::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    height: 4px;
    width: 4px;
    right: -10px;
    background: hotpink;
  }
  .row {
    padding: 3px 0;
  }
  .center {
    text-align: center;
  }
  .controls {
    color: white;
    background-color: black;
    z-index: 1;
  }
  .sender .container--controls {
    display: none;
  }
  a:link {
    color: white;
  }
  a:hover,
  a:focus,
  a:active {
    color: rgb(192, 192, 192);
  }
  button {
    appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: none;
    display: inline-block;
    justify-content: flex-start;
    padding: 10px 20px;
    position: relative;
    vertical-align: top;
    background: white;
    color: black;
    line-height: 1;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
    text-decoration: none;
  }
  button:hover {
    background: #eee;
  }
  button:active,
  button:focus {
    background: #ccc;
  }
  button[disabled],
  .button.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .controlsWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .controlsWrapper.standalone {
    position: absolute;
    top: 0;
    right: 0;
  }
  .controls {
    padding: 20px;
    overflow-y: auto;
  }
  .controls > .row {
    display: flex;
    background: black;
    color: white;
    padding: 0 4px !important;
  }
  .controls label {
    display: flex;
    flex-grow: 1;
    padding-right: 10px;
    font-size: 12px;
    justify-content: flex-end;
    height: 24px;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .controls input,
  .controls select {
    display: inline-block;
    vertical-align: top;
    margin: 0;
    accent-color: hotpink;
    padding: 2px 4px;
    border: 0;
    border-radius: 5px;
  }
  .controls input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    align-self: center;
    height: 1px;
    padding: 0;
    background: #ffffff;
  }
  .controls input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 16px;
    width: 16px;
    background: #fff;
  }
  .controls input[type='range']::-moz-range-thumb {
    appearance: none;
    height: 16px;
    width: 16px;
    background: #fff;
  }
</style>
