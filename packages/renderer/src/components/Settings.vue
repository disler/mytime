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
                <BoolSetting name="darkMode" label="Dark mode" :value="darkModeEnabled" @changed="changeDarkMode" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icons from '/@/components/Icons.vue';
import BoolSetting from '/@/components/BoolSetting.vue';
import { useStore } from '../store';
import { computed, ref } from 'vue';
import { goDarkMode, goLightMode } from '../modules/settings';

const store = useStore()

const darkModeEnabled = computed(_ => store.state.settingsDarkMode)

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
            width: 50%;
            height: 100%;
        }
    }
</style>
