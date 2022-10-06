<template>
    <div>
        <Receiver standalone>
            <Renderer />
        </Receiver>
        <MicrophoneInput v-if="populated" />
        <Sender
            hidden
            standalone
            :controllers="defaults" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import Receiver from '@/components/Receiver.vue';
import Renderer from '@/components/block/Renderer.vue';
import MicrophoneInput from '@/components/MicrophoneInput.vue';
import { defaults } from '~/assets/cube/defaults';
import Sender from '@/components/Sender.vue';

export default Vue.extend({
    name: 'IndexPage',
    components: {
        MicrophoneInput,
        Receiver,
        Renderer,
        Sender,
    },
    data() {
        return {
            defaults,
        };
    },
    computed: {
        ...mapState(['populated']),
    },
    methods: {
        ...mapMutations([
            'POPULATE_STORE',
        ]),
    },
    beforeMount() {
        this.POPULATE_STORE(defaults);
    },
});
</script>
