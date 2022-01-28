<template>
    <div class="bool-setting-w">
        <div class="label">
            {{ label }}
        </div>
        <Switcher :value="value" @changed="emit('changed', $event)" />
    </div>
</template>

<script lang="ts" setup>
    import { toRefs } from 'vue';
    import Switcher from "/@/components/Switcher.vue";
    
    interface Props {
        value?: boolean
        name: string
        label: string
    }
    
    const props = defineProps<Props>()
    const {value, name, label} = toRefs(props)

    const emit = defineEmits(['changed'])

</script>

<style lang="scss" scoped>

    @import "/@/styles/main.scss";

    .bool-setting-w {
        @include flex-even;
        width: 100%;
    }
</style>
