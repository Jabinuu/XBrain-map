<script setup lang="ts">
import { onMounted } from 'vue'
import BrainMap from '^/index'
import dataSource from '~/example'
import ToolbarTopLeft from './components/global/ToolbarTopLeft.vue';
import ToolbarTopRight from './components/global/ToolbarTopRight.vue';
import GroupPromote from './components/global/GroupPromote.vue';

onMounted(async () => {  
  
  const brainMapContainer = document.getElementById('brainMapContainer')
  await BrainMap.usePlugin('Select')
  if (brainMapContainer !== null) {
    new BrainMap({
      el: brainMapContainer,
      dataSource,
      theme:'classic',
      themeConfig:{
        lineStyle:'curve',
      }
    })
  }
  
})
</script>

<template>
  <div class="toolbar-top">
    <ToolbarTopLeft></ToolbarTopLeft>
    <ToolbarTopRight></ToolbarTopRight>
  </div>
  <div class="group-promote">
    <GroupPromote></GroupPromote>
  </div>
  <div id="brainMapContainer" />

</template>

<style lang="less" scoped>

#brainMapContainer {
  width: 100vw;
  height: 100vh;
}
.toolbar-top {
  z-index: 1;
  position: absolute;
  top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
.group-promote{
  position: fixed;
  right: 20px;
  bottom: 50px;
}

</style>
