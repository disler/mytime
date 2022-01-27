<template>
  <Timer />
</template>

<script lang="ts" setup>

import Timer from '/@/components/Timer.vue';

</script>

<style lang="scss">
@import "/@/styles/main.scss";

@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');

#app {
  font-family: 'Play', sans-serif;
  height: 95vh;
  width: 100%;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 290px;
}
</style>
