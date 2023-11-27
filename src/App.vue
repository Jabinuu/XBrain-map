<script setup lang="ts">
import { onMounted } from 'vue'
import { drawRect } from '~/rect'

onMounted(() => {
  const drawing = document.getElementById('drawing')
  if (drawing)
    drawRect(drawing)
})
</script>

<template>
  <div id="drawing" />
</template>

<style scoped>
#drawing{
  width: 200px;
  height: 200px;
}
</style>
