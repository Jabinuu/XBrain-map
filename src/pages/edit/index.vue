<script setup lang="ts">
import { onMounted } from 'vue'
import BrainMap from '^/index'
import dataSource from '~/example'
import ToolbarTopLeft from './components/global/ToolbarTopLeft.vue';
import ToolbarTopRight from './components/global/ToolbarTopRight.vue';
import GroupPrompt from './components/global/GroupPrompt.vue';
import NodeToolbar from './components/node/NodeToolbar.vue';
import Node from '^/src/node/Node';
import bus from '@/utils/bus';

let brainMap: BrainMap

let showNodeToolbar = ref(false)
const brainMapContainer = ref()
const eventList = ['node_active', 'clear_active']

onMounted(() => {
  init()
})

// 初始化编辑层
async function init() {
  await BrainMap.usePlugin('Select')
  if (brainMapContainer.value !== null) {
    brainMap = new BrainMap({
      el: brainMapContainer.value,
      dataSource,
      theme: 'classic',
      themeConfig: {
        lineStyle: 'curve',
      }
    })
  }

  // 转发事件
  eventList.forEach((item) => {
    brainMap.on(item, (args) => {
      bus.emit(item, args)
    })
  })

  bus?.on('node_active', (e: any) => {
    showNodeToolbar.value = true
    nextTick(() => {
      const node: Node = e[0]
      const _nodeToolbar = document.getElementById('node-toolbar-wrap')

      if (_nodeToolbar) {
        const toolbarWidth = _nodeToolbar.clientWidth
        const toolbarHeight = _nodeToolbar.clientHeight
        _nodeToolbar.style.left = (node.left - (Math.abs(node.width - toolbarWidth) / 2)) + 'px'
        _nodeToolbar.style.top = (node.top - toolbarHeight) + 'px'
      }
    })
  })

  bus.on('clear_active', () => {
    showNodeToolbar.value = false
  })
}


</script>

<template>
  <div class="toolbar-top">
    <toolbar-top-left></toolbar-top-left>

    <toolbar-top-right></toolbar-top-right>
  </div>

  <div class="group-prompt">
    <group-prompt></group-prompt>
  </div>

  <div id="brainMapContainer" ref="brainMapContainer" />
  <node-toolbar v-show="showNodeToolbar"></node-toolbar>
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
