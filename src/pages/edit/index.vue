<script setup lang="ts">
import { onMounted } from 'vue'
import BrainMap from '^/index'
import dataSource from '~/example'
import ToolbarTopLeft from './components/global/ToolbarTopLeft.vue';
import ToolbarTopRight from './components/global/ToolbarTopRight.vue';
import GroupPrompt from './components/global/GroupPrompt.vue';

onMounted(async () => {
  const brainMapContainer = document.getElementById('brainMapContainer')
  await BrainMap.usePlugin('Select')
  if (brainMapContainer !== null) {
    new BrainMap({
      el: brainMapContainer,
      dataSource,
      theme: 'classic',
      themeConfig: {
        lineStyle: 'curve',
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

  <div class="group-prompt">
    <GroupPrompt></GroupPrompt>
  </div>

  <div id="brainMapContainer" />
</template>

<style lang="less" scoped>
#brainMapContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.toolbar-top {
  z-index: 1;
  position: absolute;
  top: 14px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
}

.group-prompt {
  z-index: 1;
  position: fixed;
  right: 20px;
  bottom: 50px;
}

:deep(.icon) {
  width: 18px;
  height: 18px;
  color: #262626;
}

:deep(.toolbar-border-shadow) {
  border: 1px solid rgba(239, 240, 240, 0.9);
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.04), 0 4px 8px 1px rgba(0, 0, 0, 0.02)
}
</style>
