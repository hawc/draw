<template>
    <div>
        <Receiver>
            <Renderer />
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
    beforeMount() {
        this.POPULATE_STORE(defaults);
    },
    methods: {
        ...mapMutations([
            'POPULATE_STORE',
        ]),
    },
});
</script>
