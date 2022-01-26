import { ref, computed } from "vue";
import { useTimeoutFn } from '@vueuse/core'

export default function useAnimation(animationType: string) {
    
    const animationClassName = `a-${animationType}`;

    const isAnimating = ref(false)
    const animationClass = computed(_ => isAnimating.value ? animationClassName : '')

    function animate(): void {
        isAnimating.value = true;

        useTimeoutFn(() => {
            isAnimating.value = false;
        }, 1000)
    }

    return {
        animationClass,
        animate,
    }
}