<template>
    <div>
        <Sender :controllers="defaults" />
    </div>
</template>

<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import { defaults } from 'assets/beton/defaults';
import Sender from '@/components/Sender.vue';

export default Vue.extend({
    components: {
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
    }
});
</script>

<style>
    body {
        background: #131200;
        color: white;
    }
</style>