<template>
    <div class="timer-w">

        <div class="time-picker-w">
            <!-- <TimePicker /> -->
        </div>
        
        <div v-if="!timerIsComplete" class="timer-active">
            <div class="time" @click="clickTime" :class="[timePulseAnimation.animationClass.value, timeShakeAnimation.animationClass.value]">
                {{timeDisplay}}
            </div>
        </div>

        <div v-else class="timer-complete" @click="clickTimerComplete">
            <div class="bell-w">
                <Icons icon="bell" />
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from '/@/store/index';
    import Icons from '/@/components/Icons.vue';
    import TimePicker from '/@/components/TimePicker.vue';
    import * as TimeHandler from '/@/modules/timer';
    import { useIntervalFn } from '@vueuse/core'
    import useAnimation from '/@/hooks/useAnimation';
    import { ref } from 'vue';

    const store = useStore()

    const timeDisplay = ref("00:00")
    const pause = ref(() => {})
    const resume = ref(() => {})
    const isActive = ref(false)
    const timerIsComplete = ref(false)
    const timePulseAnimation = useAnimation("text-pulse")
    const timeShakeAnimation = useAnimation("text-shake")

    function updateTimer(): void {
        const seconds = store.state.timeInSeconds
        const hms = TimeHandler.convertSecondsToHoursMinutesSeconds(seconds)
        const display = TimeHandler.formatHoursMinutesSeconds(hms)
        timeDisplay.value = display
    }

    function checkTimerFinished(): void {
        if (store.state.timeInSeconds < 0) {
            timerIsComplete.value = true
            stopTimer()
        }
    }

    function startTimer(): void {

        updateTimer()

        const useIntervalFnValues = useIntervalFn(() => {
            store.commit("decrementTime")
            updateTimer()
            checkTimerFinished()
        }, 1000)

        pause.value = useIntervalFnValues.pause
        resume.value = useIntervalFnValues.resume
        isActive.value = useIntervalFnValues.isActive.value
    }

    function setTime(seconds: number): void {
        store.commit("setTime", seconds)
    }

    function setTimeToDefault(): void {
        setTime(TimeHandler.DEFAULT_START_TIME)
        updateTimer()
    }

    function stopTimer(): void {
        pause.value()
        isActive.value = false
    }

    function clickTimerComplete(): void {
        timerIsComplete.value = false
        setTimeToDefault()
    }

    function clickTime(): void {
        if (isActive.value) {
            stopTimer()
            timeShakeAnimation.animate()
            return
        } 
        startTimer()
        timePulseAnimation.animate()
    }

    setTimeToDefault()

</script>

<style lang="scss" scoped>

    @import "/@/styles/main.scss";


    .time {
        @include noselect;
        font-size: 15vw;
        font-weight: bold;
        color: #2c3e50;
        letter-spacing: 7px;
        cursor: pointer;
    }
    .bell-w {
        @include a-shake;
        cursor: pointer;
    }
</style>
