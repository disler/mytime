<template>
    <div class="icon-w">
        <template v-if="icon === 'bell'">
            <svg :width="width" :height="height" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M79.6875 75H77.3438V41.7969C77.3438 28.0176 67.1582 16.6211 53.9062 14.7266V10.9375C53.9062 8.7793 52.1582 7.03125 50 7.03125C47.8418 7.03125 46.0938 8.7793 46.0938 10.9375V14.7266C32.8418 16.6211 22.6562 28.0176 22.6562 41.7969V75H20.3125C18.584 75 17.1875 76.3965 17.1875 78.125V81.25C17.1875 81.6797 17.5391 82.0312 17.9688 82.0312H39.0625C39.0625 88.0664 43.9648 92.9688 50 92.9688C56.0352 92.9688 60.9375 88.0664 60.9375 82.0312H82.0312C82.4609 82.0312 82.8125 81.6797 82.8125 81.25V78.125C82.8125 76.3965 81.416 75 79.6875 75ZM50 86.7188C47.4121 86.7188 45.3125 84.6191 45.3125 82.0312H54.6875C54.6875 84.6191 52.5879 86.7188 50 86.7188Z" :fill="fill"/>
            </svg>
        </template>
    </div>
</template>

<script lang="ts" setup>
    import { toRefs } from 'vue';
    
    interface Props {
        icon: string
        width?: string
        height?: string
        fill?: string
    }
    
    const props = withDefaults(defineProps<Props>(), {
        height: '100',
        width: '100',
        fill: '#333',
    })
    const {icon, width, height, fill} = toRefs(props)

</script>

<style lang="scss" scoped>
    
</style>
