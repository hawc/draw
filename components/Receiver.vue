<template>
    <div>
        <main>
            <slot name="default" />
        </main>
        <div class="container">
            <p class="statusMessage">
                {{ peerID ? peerID : 'Not connected.' }}
                <a
                    v-if="peerID"
                    :href="`${ $route.fullPath }/sender?k=${ peerID }`"
                    target="_new"
                >
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

<script>
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
        }
    },
    computed: {
        ...mapState(['settings']),
    },
    methods: {
        ...mapActions([
            'SET_OPTIONS',
        ]),
        setMessage(message) {
            this.peerID = message;
        },
    },
});
</script>
