import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import {StoreInterface, WindowMode} from "../types"
import * as Timer from "../modules/timer"


// Create a new store instance.
const store = createStore<StoreInterface>({
    state (): StoreInterface {
        return {
            timeInSeconds: 0,
            windowMode: 'timer',
            settingsDarkMode: true,
            hotKey1Time: Timer.DEFAULT_HOT_KEY_1,
            hotKey2Time: Timer.DEFAULT_HOT_KEY_2,
            hotKey3Time: Timer.DEFAULT_HOT_KEY_3,
        }
    },
    mutations: {
        decrementTime(state):  void {
            state.timeInSeconds -= 1
        },
        setTime(state, value: number):  void {
            state.timeInSeconds = value
        },
        setWindowMode(state, value: WindowMode):  void {
            state.windowMode = value
        },
        setSettingsDarkMode(state, value: boolean):  void {
            state.settingsDarkMode = value
        },
        setHotKey1Time(state, value: number):  void {
            state.hotKey1Time = value
        },
        setHotKey2Time(state, value: number):  void {
            state.hotKey2Time = value
        },
        setHotKey3Time(state, value: number):  void {
            state.hotKey3Time = value
        }

    },
    actions: {}
})

export const storeKey: InjectionKey<Store<StoreInterface>> = Symbol()
export function useStore () {
  return baseUseStore(storeKey)
}
export default store

