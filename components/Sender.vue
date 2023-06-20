<template>
  <div v-if="controllers" class="controlsWrapper" :class="{ isExternal }">
    <div v-if="!isExternal" class="controlsHeader">
      <button class="closeButton" @click="showControls = !showControls">
        <template v-if="showControls">
          ×
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            viewBox="0 0 100 125"
            style="padding: 2px"
          >
            <path
              d="m95.88 44.94-10.94-3.01a2.49 2.49 0 0 1-1.52-1.44l-2.84-6.85a2.48 2.48 0 0 1 .06-2.09l5.66-9.86c.33-.57.25-1.44-.18-1.93 0 0-1.4-1.66-2.62-2.88a53.18 53.18 0 0 0-2.87-2.63 1.81 1.81 0 0 0-1.93-.19l-9.86 5.6a2.5 2.5 0 0 1-2.1.06l-6.85-2.86a2.5 2.5 0 0 1-1.44-1.53L55.5 4.05c-.17-.63-.85-1.55-1.5-1.55h-7.77c-.66 0-1.33.9-1.5 1.53l-3.02 11.1c-.18.62-.83 1.4-1.45 1.6l-6.87 2.88a2.5 2.5 0 0 1-2.1-.05l-9.83-5.65a1.84 1.84 0 0 0-1.94.18s-1.65 1.39-2.86 2.62c-1.24 1.21-2.64 2.87-2.64 2.87-.42.5-.5 1.37-.18 1.94l5.61 9.87c.32.57.35 1.5.05 2.08l-2.88 6.87c-.2.61-.89 1.26-1.52 1.43L4.15 44.74c-.63.16-1.17.83-1.2 1.5l-.03 7.75c.03.65.58 1.33 1.2 1.5l10.93 3.02a2.5 2.5 0 0 1 1.51 1.44l2.85 6.87c.3.58.27 1.51-.05 2.08l-5.67 9.86c-.33.57-.25 1.44.18 1.94 0 0 1.4 1.65 2.61 2.9 1.22 1.18 2.86 2.6 2.86 2.6.5.42 1.37.5 1.94.18l9.87-5.6c.57-.32 1.5-.35 2.1-.06l6.86 2.88c.62.2 1.27.89 1.44 1.51l2.94 11.07c.17.64.84 1.32 1.5 1.32h7.77c.65 0 1.33-.68 1.5-1.31l3.03-11c.18-.62.83-1.33 1.45-1.52l6.87-2.86a2.5 2.5 0 0 1 2.1.06l9.82 5.66c.56.32 1.44.24 1.93-.17 0 0 1.66-1.4 2.9-2.63 1.2-1.2 2.61-2.86 2.61-2.86.43-.5.5-1.37.19-1.94l-5.61-9.87a2.5 2.5 0 0 1-.06-2.1l2.87-6.85c.21-.62.9-1.26 1.53-1.44l10.95-2.94a1.78 1.78 0 0 0 1.22-1.5l.02-7.78a1.75 1.75 0 0 0-1.2-1.5zm-35.12 16.1a15.26 15.26 0 1 1-21.52-21.62 15.26 15.26 0 0 1 21.52 21.62z"
            />
          </svg>
        </template>
      </button>
    </div>
    <div v-show="showControls" class="controlsContent" style="width: 100%">
      <div class="controls">
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
        showControls: true,
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
          this.controlSettings = { ...settings };
        },
      },
    },
    mounted() {
      if (process.client) {
        this.$nextTick(() => {
          this.ADD_MIDI_CONTROLLER();
        });
        this.controlSettings = { ...this.settings };
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
  .controlsHeader {
    position: absolute;
    top: 20px;
    right: 20px;
    text-align: right;
    height: 0;
    overflow: visible;
    z-index: 2;
  }
  .closeButton {
    display: inline-block;
    color: black;
    background: white;
    padding: 0;
    margin: 0;
    box-shadow: none;
    height: 16px;
    width: 16px;
    border-radius: 0;
    border: none;
  }
  .closeButton:active,
  .closeButton:focus,
  .closeButton:hover {
    color: black;
    background: white;
    border: none;
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
    width: 310px;
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
  .controlsContent {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .controlsWrapper:not(.isExternal) {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .controls {
    padding: 20px;
    overflow-y: auto;
  }
  .controls > .row {
    display: flex;
    background: black;
    color: white;
    padding: 0 !important;
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
  .controls label.checkboxLabel {
    display: block;
    text-align: left;
  }
  .controls label.checkboxLabel input {
    position: relative;
    appearance: none;
    background: white;
    border: 1px solid black;
    width: 16px;
    height: 16px;
    display: inline-block;
    border-radius: 0;
    padding: 0;
  }
  .controls label.checkboxLabel input:checked::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 3px;
    width: 8px;
    height: 8px;
    background: black;
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
