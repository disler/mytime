import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import {StoreInterface} from "../types"


// Create a new store instance.
const store = createStore<StoreInterface>({
    state (): StoreInterface {
        return {
            timeInSeconds: 0
        }
    },
    mutations: {
        decrementTime(state):  void {
            state.timeInSeconds -= 1
        },
        setTime(state, value: number):  void {
            state.timeInSeconds = value
        },
    },
    actions: {}
})

export const storeKey: InjectionKey<Store<StoreInterface>> = Symbol()
export function useStore () {
  return baseUseStore(storeKey)
}
export default store

