<script setup lang="ts">
import { onMounted } from 'vue'
import BrainMap from '^/index'
import dataSource from '~/example'

onMounted(async () => {
  const brainMapContainer = document.getElementById('brainMapContainer')
  await BrainMap.usePlugin('Select')
  if (brainMapContainer !== null) {
    new BrainMap({
      el: brainMapContainer,
      dataSource,
      theme:'classic'
    })
  }
  
})
</script>

<template>
  <div id="brainMapContainer" />
</template>

<style scoped>
#brainMapContainer {
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
}
</style>
