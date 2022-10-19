<template>
    <div>
        <Renderer />
        <Sender
            standalone
            :controllers="defaults"
            class="sender" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import Receiver from '@/components/Receiver.vue';
import Renderer from '@/components/beton/Renderer.vue';
import Sender from '@/components/Sender.vue';
import { defaults } from '~/assets/beton/defaults';

export default Vue.extend({
    name: 'IndexPage',
    components: {
        Receiver,
        Renderer,
        Sender,
    },
    data() {
        return {
            defaults,
        };
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

<style>
    .sender {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
