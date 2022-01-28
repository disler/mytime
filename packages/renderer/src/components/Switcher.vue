<template>
  <div>
    <Toggle v-model="value" @change="emit('changed', $event)" on-label="On" off-label="Off" />
  </div>
</template>

<script lang="ts" setup>
    import Toggle from '@vueform/toggle'
    import { ref } from 'vue';

    interface Props {
        value?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        value: false,
    })

    const emit = defineEmits(['changed'])

    const value = ref(props.value)

</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style>
    .toggle-container {
        box-shadow: none !important;
    }
</style>