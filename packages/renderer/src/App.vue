<template>
  <div ref="scrollable" class="scrollable">
    <div class="sections-w">
      <div class="section">
        <Timer />
      </div>
      <div class="section">
        <Settings />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue';
import { useStore } from '/@/store/index';
import Timer from '/@/components/Timer.vue';
import Settings from '/@/components/Settings.vue';

const store = useStore()
const scrollable = ref<HTMLElement | null>(null)

const darkModeEnabled = computed(_ => store.state.settingsDarkMode)

function toggleSettings(openSettings: boolean): void {
  const scrollElement = scrollable.value

  if (openSettings) {
    scrollElement?.scrollTo({
      left: window.innerWidth,
      behavior: 'smooth',
    }) 
    
    return
  }

  scrollElement?.scrollTo({
    left: 0,
    behavior: 'smooth',
  }) 
}

watch(() => store.state.windowMode, (newValue, oldValue) => {
  const openSettings = newValue === 'settings'
  toggleSettings(openSettings)
})

</script>

<style lang="scss">
@import "/@/styles/main.scss";

@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');

:root {
  --theme-bg-color: white;
  --theme-text-color: #2c3e50;
  --theme-input-bg-color: #eee;
  --toggle-border-on: #555555;
  --toggle-bg-on: #777;
}

html {
  background: var(--theme-bg-color);
  color: var(--theme-text-color);
}

body {
  margin: 0;
}


#app {


  font-family: 'Play', sans-serif;
  height: 95vh;
  width: 100%;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 290px;
  min-width: 320px;
  padding: 0;

}



.scrollable {
  height: 100%;
  width: auto;
  overflow-x: hidden;
  overflow-y: hidden;

  .sections-w {
    width: 200vw;
    height: 100%;
    display: flex;
    .section {
      height: 100%;
      width: 100vw;
    }
  }

}
</style>
