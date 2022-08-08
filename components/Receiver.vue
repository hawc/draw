<template>
    <div>
        <main :class="mainClass">
            <slot name="default"></slot>
        </main>
        <div class="container">
            <p :hidden="standalone"
                class="statusMessage">
                <span :hidden="!isProduction">{{ peerID ? peerID : 'Not connected.' }}</span>
                <a
                    v-if="peerID"
                    class="joystick"
                    :href="`${ $route.fullPath }/sender?k=${ peerID }`"
                    target="_new">
                    🕹
                </a>
            </p>
            <PeerClient
                v-if="!standalone"
                @message="setMessage"
                :settings="settings"
                :options-setter="SET_OPTIONS"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import PeerClient from './PeerClient.vue';

export default Vue.extend({
    components: { 
        PeerClient,
    },
    data() {
        return {
            peerID: '',
        };
    },
    props: {
        standalone: {
            type: Boolean,
            default: false,
        },
        mainClass: {
            type: String,
            default: '',
        }
    },
    computed: {
        ...mapState(['settings']),
        isProduction() {
            return process.env.NODE_ENV === 'production';
        },
    },
    methods: {
        ...mapActions([
            'SET_OPTIONS',
        ]),
        setMessage(message: string): void {
            this.peerID = message;
        },
    },
});
</script>
