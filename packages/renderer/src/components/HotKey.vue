<template>
    <div class="hotkey-w">
        <Icons :icon="`hotkey${hotKey}`" width="50px" height="50px" />
        <div class="input-w">
            <TimePicker :defaultTimeInSeconds="defaultTime" @update="emit('update', $event)"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { toRefs } from 'vue';
    import Icons from '/@/components/Icons.vue';
    import TimePicker from '/@/components/TimePicker.vue';

    interface Props {
        hotKey: 1 | 2 | 3,
        defaultTime: number
    }
    
    const props = defineProps<Props>()
    const {hotKey, defaultTime} = toRefs(props)

    const emit = defineEmits([
        'update'
    ])

</script>

<style lang="scss" scoped>

    @import "/@/styles/main.scss";

    .hotkey-w {
        @include flex-apart;
        width: 100%;
        height: 50px;

    }
</style>
