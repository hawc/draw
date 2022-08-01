<template>
    <div>
        <Receiver>
            <Renderer></Renderer>
        </Receiver>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { mapMutations } from 'vuex';
    import Receiver from '@/components/Receiver.vue';
    import Renderer from '@/components/beton/Renderer.vue';
    import { defaults } from '~/assets/beton/defaults';

    export default Vue.extend({
        name: 'IndexPage',
        components: {
            Receiver,
            Renderer,
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
