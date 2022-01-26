import {createApp} from 'vue';
import App from '/@/App.vue';
import store, { storeKey } from './store'


const app = createApp(App);

app.use(store, storeKey);

// Handy conditional
app.config.globalProperties.$iff = function(cond: boolean | undefined, result: any, fallback: any = ''): void {
	return cond ? result : fallback
}


declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $iff: (cond: boolean | undefined, result: string, fallback?: string) => boolean;
    }
}

app.mount('#app');
