<template>
    <div class="timer-w">

        <div class="time-picker-w">
            <TimePicker v-show="timerIsNotActiveAndNotAlerting" :defaultTimeInSeconds="DEFAULT_START_TIME" @update="updateTimerFromPicker"/>
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
    import { computed, ref } from 'vue';
    import { HoursMinutesSeconds } from '../types';
    import alertAudio from "/@/../assets/test.mp4"

    const store = useStore()

    const timeDisplay = ref("00:00")
    const pause = ref(() => {})
    const resume = ref(() => {})
    const isActive = ref(false)
    const timerIsComplete = ref(false)
    const audioPlayer = ref<HTMLAudioElement | null>(null)

    const timerIsNotActiveAndNotAlerting = computed(_ => !isActive.value && !timerIsComplete.value)

    const timePulseAnimation = useAnimation("text-pulse")
    const timeShakeAnimation = useAnimation("text-shake")

    const DEFAULT_START_TIME = TimeHandler.DEFAULT_START_TIME

    function updateTimerFromPicker(hhmmss: HoursMinutesSeconds): void {
        const seconds = TimeHandler.convertHoursMinutesSecondsToSeconds(hhmmss)
        setTime(seconds)
        updateTimer()
    }

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
            playAlertSound()
        }
    }

    function preloadAudio(): void {
        audioPlayer.value = new Audio(alertAudio)
        audioPlayer.value.preload = "auto"
    }

    function playAlertSound(): void {
        // audioPlayer.value = new Audio(alertAudio)
        if (audioPlayer.value) {
            audioPlayer.value.loop = true
            audioPlayer.value.play()
        }
    }

    function stopAlertSound(): void {
        if (audioPlayer.value) {
            audioPlayer.value.pause()
            audioPlayer.value.currentTime = 0
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
        setTime(DEFAULT_START_TIME)
        updateTimer()
    }

    function stopTimer(): void {
        pause.value()
        isActive.value = false
    }

    function clickTimerComplete(): void {
        timerIsComplete.value = false
        setTimeToDefault()
        stopAlertSound()
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

    preloadAudio()
    setTimeToDefault()

</script>

<style lang="scss" scoped>

    @import "/@/styles/main.scss";

    .timer-w {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .timer-active {
        // center absolute with xy translate
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .time-picker-w {
        padding-top: 7vh;
    }

    .time {
        @include noselect;
        font-size: 20vw;
        font-weight: bold;
        color: #2c3e50;
        letter-spacing: 7px;
        cursor: pointer;
    }

    .timer-complete {
        width: 100%;
        @include flex-center-both;
    }
    .bell-w {
        @include a-shake;

        cursor: pointer;
        width: 100px;
    }

    
</style>
