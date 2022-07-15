<template>
    <div>
        <Receiver standalone>
            <Renderer></Renderer>
        </Receiver>
        <MicrophoneInput v-if="populated"></MicrophoneInput>
        <Sender
            hidden
            standalone
            :controllers="defaults"
        ></Sender>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { mapMutations, mapState } from 'vuex';
    import Receiver from '@/components/Receiver.vue';
    import Renderer from '@/components/remote-sky/Renderer.vue';
    import { defaults } from '~/assets/remote-sky/defaults';

    export default Vue.extend({
        name: 'IndexPage',
        components: {
            Receiver,
            Renderer,
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

<style>
canvas {
    image-rendering: pixelated;
}
</style>