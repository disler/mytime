<template>
    <div class="settings-w">
        <div class="back-w">
            <Icons icon="back" width="25px" height="30px" @click="clickExit" />
        </div>
        

        <div class="content-w">
            <!-- <div class="left-w">
                left
            </div> -->
            <div class="right-w">
                <HotKey :hotKey="1" :defaultTime="hotKey1Time" @update="updateHotKeyTime(1, $event)"/>
                <HotKey :hotKey="2" :defaultTime="hotKey2Time" @update="updateHotKeyTime(2, $event)"/>
                <HotKey :hotKey="3" :defaultTime="hotKey3Time" @update="updateHotKeyTime(3, $event)"/>
                <BoolSetting name="darkMode" label="Dark mode" :value="darkModeEnabled" @changed="changeDarkMode" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icons from '/@/components/Icons.vue';
import BoolSetting from '/@/components/BoolSetting.vue';
import HotKey from '/@/components/HotKey.vue';
import { useStore } from '../store';
import { computed, ref } from 'vue';
import { goDarkMode, goLightMode } from '../modules/settings';
import { HoursMinutesSeconds, HotKey as HotKeyType } from '../types';
import * as TimeHandler from '/@/modules/timer';
import * as UserConfig from '/@/modules/userConfig';
const store = useStore()

const darkModeEnabled = computed(_ => store.state.settingsDarkMode)
const hotKey1Time = computed(_ => store.state.hotKey1Time)
const hotKey2Time = computed(_ => store.state.hotKey2Time)
const hotKey3Time = computed(_ => store.state.hotKey3Time)


function clickExit(): void {
    store.commit("setWindowMode", 'timer')
}

function changeDarkMode(value: boolean): void {
    store.commit('setSettingsDarkMode', value)
    triggerThemeChange(value)
}

function triggerThemeChange(value: boolean): void {
    if (value) {
        goDarkMode()
        return
    }
    goLightMode()
}

function updateHotKeyTime(hotKey: HotKeyType, hhmmss: HoursMinutesSeconds): void {
    if (hotKey === 1) {
        store.commit('setHotKey1Time', TimeHandler.convertHoursMinutesSecondsToSeconds(hhmmss))
    }
    else if (hotKey === 2) {
        store.commit('setHotKey2Time', TimeHandler.convertHoursMinutesSecondsToSeconds(hhmmss))
    }
    else if (hotKey === 3) {
        store.commit('setHotKey3Time', TimeHandler.convertHoursMinutesSecondsToSeconds(hhmmss))
    }

    // qqq dump hotkey values into user settings

    console.log(`hotKey`, hotKey)
    console.log(`hhmmss`, hhmmss)

    UserConfig.saveConfig({})
}

triggerThemeChange(darkModeEnabled.value)
    
</script>

<style lang="scss" scoped>

    @import "/@/styles/main.scss";

    .settings-w {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .back-w {
        position:absolute;
        top: 10px;
        left: 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .content-w {
        @include flex-center-both;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 350px;
        height: 300px;
        // border: 1px solid;

        .left-w {
            width: 50%;
            height: 100%;
        }

        .right-w {
            width: 100%;
            height: 100%;

            div {
                padding: 10px 0;
            }
        }
    }
</style>
