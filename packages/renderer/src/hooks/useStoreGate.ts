import { useStore } from "../store";

export default function useStoreGate() {

    const store = useStore();

    // Getters
	// const firebaseUser = computed(() => store.state.firebaseUser)
	
    // Mutations
	// const setFirebaseUser = (v: any) => store.commit('setFirebaseUser', v)
	
	// Actions
	// async function markWebConvertLiveUpdateAsSeen(webConvertLiveUpdate: LbWebConvertLiveUpdate) {
	// 	await dbMarkWebConvertLiveUpdateAsSeen(webConvertLiveUpdate)
	// }

    return {

    }
}