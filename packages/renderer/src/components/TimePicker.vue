<template>
    <div class="time-picker-w">

        <div class="time-picker-c">
            
            <div class="hour-w time-w">
                <VueMultiselect class="unit-multiselect" v-model="hourSelected" @Select="updateHour" :options="HOUR_OPTIONS" :allow-empty="false" deselect-label="" :max-height="200" select-label="" placeholder="" :show-labels="false"/>
                <span class="unit-text">h</span>
            </div>

            <div class="minutes-w time-w">
                <VueMultiselect class="unit-multiselect" v-model="minuteSelected" @Select="updateMinute" :options="MIN_OPTIONS" :allow-empty="false" deselect-label="" :max-height="200" select-label="" placeholder="" :show-labels="false"/>
                <span class="unit-text">m</span>
            </div>

            <div class="seconds-w time-w">
                <VueMultiselect class="unit-multiselect" v-model="secondSelected" @Select="updateSecond" :options="SEC_OPTIONS" :allow-empty="false" deselect-label="" :max-height="200" select-label="" placeholder="" :show-labels="false"/>
                <span class="unit-text">s</span>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>

    //@ts-ignore
    import VueMultiselect from 'vue-multiselect'
    import { ref } from 'vue';
    import { toRefs } from 'vue';
    import * as TimeHandler from '/@/modules/timer';
    import { HoursMinutesSeconds } from '../types';
    
    interface Props {
        defaultTimeInSeconds?: number
    }

    const emit = defineEmits(['update'])
    
    const props = defineProps<Props>()
    const {defaultTimeInSeconds} = toRefs(props)


    const secondSelected = ref(0)
    const minuteSelected = ref(0)
    const hourSelected = ref(0)

    // create an array of numbers from 0 to 59
    const SEC_OPTIONS = Array.from(Array(60).keys())
    const MIN_OPTIONS = Array.from(Array(60).keys())
    const HOUR_OPTIONS = Array.from(Array(60).keys())


    function setDefaultTime(): void {
        if (!defaultTimeInSeconds?.value) {
            return
        }
        const hhmmss = TimeHandler.convertSecondsToHoursMinutesSeconds(defaultTimeInSeconds.value)
        hourSelected.value = hhmmss.hours
        minuteSelected.value = hhmmss.minutes
        secondSelected.value = hhmmss.seconds
    }

    // v-model is updating late or is not updating at all so we need to trigger it manually
    function updateSecond(value: number): void {
        secondSelected.value = value
        triggerUpdate()
    }

    // v-model is updating late or is not updating at all so we need to trigger it manually
    function updateMinute(value: number): void {
        minuteSelected.value = value
        triggerUpdate()
    }

    // v-model is updating late or is not updating at all so we need to trigger it manually
    function updateHour(value: number): void {
        hourSelected.value = value
        triggerUpdate()
    }

    function triggerUpdate(): void {

        const hhmmss: HoursMinutesSeconds = {
            hours: hourSelected.value,
            minutes: minuteSelected.value,
            seconds: secondSelected.value
        }

        emit('update', hhmmss)
    }


    setDefaultTime()

</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss">
    .unit-multiselect{
        .multiselect__tags {
            border: none;
            background: var(--theme-input-bg-color);   
            color: var(--theme-text-color);

            input {
                background: var(--theme-input-bg-color);   
            }
        }

        .multiselect__select::before {
            border-style: none;
        }
        .multiselect__tags {
            padding-right: 25px;
        }
        .multiselect__single {
            background: var(--theme-input-bg-color);   
        }
    }
</style>

<style lang="scss" scoped>

    @import "/@/styles/main.scss";


    .time-picker-w {
        @include flex-center;
        width: 100%;
    }

    .time-picker-c {
        @include flex-apart;
        width: 250px;
        height: 50px;
    }

    .time-w {
        @include flex-apart;
        width: 70px;
    }

    .unit-text {
        line-height: 40px;
        margin-left: 5px;
    }
</style>
