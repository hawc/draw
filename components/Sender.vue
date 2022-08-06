<template>
    <div class="controlsWrapper">
        <div class="controls">
            <div
                v-for="(controller, controllerKey) in controllers"
                :key="controllerKey"
                class="row">
                <label :for="controllerKey.toString()">{{ controllerKey }}</label>
                <input
                    v-model.number="controlSettings[controllerKey]"
                    :id="controllerKey.toString()"
                    type="range"
                    :min="controller.min"
                    :max="controller.max"
                    :step="controller.step" />
            </div>
        </div>
        <div class="container container--controls">
            <p>
                {{ statusMessage }}
            </p>
        </div>
        <PeerController
            v-if="!standalone"
            ref="controller"
            @message="setMessage"
            :settings="settings"
            :options-setter="SET_OPTIONS" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import PeerController from './PeerController.vue';

export default Vue.extend({
    components: {
        PeerController,
    },
    props: {
        controllers: {
            type: Object,
            required: true,
        },
        standalone: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            statusMessage: 'Connecting...',
            controlSettings: {},
        };
    },
    watch: {
        controlSettings: {
            deep: true,
            handler(settings): void {
                this.SET_OPTIONS(settings);
                if (!this.standalone) {
                    this.$refs.controller.sendMessage({ settings });
                }
            },
        },
        settings: {
            deep: true,
            handler(settings): void {
                this.controlSettings = JSON.parse(JSON.stringify(settings));
            }
        },
    },
    computed: {
        ...mapState(['settings']),
    },
    methods: {
        ...mapActions([
            'SET_OPTIONS',
            'addMidiController',
        ]),
        setMessage(message: string): void {
            this.statusMessage = message;
        },
    },
    mounted() {
        if (process.client) {
            this.$nextTick(() => {
                this.addMidiController();
            });
        }
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
        z-index: 1;
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
        -moz-appearance: none;
        -webkit-appearance: none;
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
</style>
