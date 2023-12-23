<script setup lang="ts">
import { onMounted } from 'vue'
import BrainMap from '^/index'
import dataSource from '~/example'

onMounted(() => {
  const brainMapContainer = document.getElementById('brainMapContainer')

  if (brainMapContainer !== null) {
    new BrainMap({
      el: brainMapContainer,
      dataSource
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
