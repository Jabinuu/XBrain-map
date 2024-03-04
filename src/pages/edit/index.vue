<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import BrainMap from 'brain-map/index'
import dataSource from 'brain-map/src/example'
import ToolbarTopLeft from './components/global/ToolbarTopLeft.vue';
import ToolbarTopRight from './components/global/ToolbarTopRight.vue';
import GroupPrompt from './components/global/GroupPrompt.vue';
import NodeToolbar from './components/node/NodeToolbar.vue';
import bus from '@/utils/bus';
import Sidebar from './components/sidebar/Sidebar.vue';
import AddLink from '@/components/AddLink.vue';
import { useContextMenu } from '@/hooks/useContextMenu';
import Node from 'brain-map/src/node/Node';

export interface MenuListItem {
  text: string
  key: string
  shortcut?: string
  disable?: () => boolean
  children?: MenuListItem[]
  action?: () => void
}

enum EnumCommandName {
  INSERT_CHILD_NODE = 'INSERT_CHILD_NODE',
  INSERT_SIBLING_NODE = 'INSERT_SIBLING_NODE',
  DELETE_NODE = 'DELETE_NODE',
  DELETE_SINGLE_NODE = 'DELETE_SINGLE_NODE',
  SET_NODE_EXPAND = 'SET_NODE_EXPAND',
  SET_NODE_ACTIVE = 'SET_NODE_ACTIVE',
  SET_NODE_DATA = 'SET_NODE_DATA',
  SET_NODE_EDIT = 'SET_NODE_EDIT',
  SET_NODE_TEXT = 'SET_NODE_TEXT',
  CLEAR_ACTIVE_NODE = 'CLEAR_ACTIVE_NODE',
  RESIZE_NODE = 'RESIZE_NODE',
  UNDO = 'UNDO',
  REDO = 'REDO',
  SET_NODE_STYLE = 'SET_NODE_STYLE'
}

let brainMap: BrainMap
let showNodeToolbar = ref(false)
const brainMapContainer = ref()
const mainContainer = ref()
const eventList = ['node_active', 'clear_active', '_contextmenu', 'draw_mousedown', 'node_mousedown']
const showSidebar = ref(false)
const showAddLink = ref(false)
let activeNodes: Node[] = []

provide('_showSidebar', showSidebar)
onMounted(() => {
  init()
  bindEvent()
  openContextMenu()
})

// 初始化编辑层
function init() {
  if (brainMapContainer.value !== null) {
    brainMap = new BrainMap({
      el: brainMapContainer.value,
      dataSource,
      theme: 'classic',
      themeConfig: {
        lineStyle: 'curve',
      }
    })
    // BrainMap.usePlugin('Select', brainMap)
  }

  // 转发事件
  eventList.forEach((item) => {
    brainMap.on(item, (args) => {
      bus.emit(item, args)
    })
  })
}

function bindEvent() {
  bus.on('sidebarVisibleChange', (e: any) => {
    if (!e) {
      brainMapContainer.value.style.marginRight = 0
      mainContainer.value.style.width = '100vw'
      brainMapContainer.value.style.width = '100%'
      if (brainMap.svg) {
        brainMap.svg.css('width', '100%')
      }
      showNodeToolbar.value = false
    } else {
      mainContainer.value.style.marginRight = 280 + 'px'
      mainContainer.value.style.width = 'calc(100vw - 280px)'
      brainMapContainer.value.style.width = 'calc(100vw - 280px)'
      if (brainMap.svg) {
        brainMap.svg.css('width', '100%')
      }
    }
    showSidebar.value = e
  })

  bus?.on('node_active', (manipulateNodes: any) => {

    activeNodes = [...manipulateNodes[0]]
    // 激活节点时显示编辑工具栏
    showNodeToolbar.value = true
    nextTick(() => {
      const _nodeToolbar = document.getElementById('node-toolbar-wrap')

      if (_nodeToolbar) {
        const nodeDom = document.querySelector('.bm-node.active')
        if (nodeDom) {
          const rect = nodeDom.getBoundingClientRect()
          const { left, top, width } = rect

          const toolbarWidth = _nodeToolbar.clientWidth
          const toolbarHeight = _nodeToolbar.clientHeight
          _nodeToolbar.style.left = (left - (Math.abs(width - toolbarWidth) >> 1)) + 'px'
          _nodeToolbar.style.top = (top - toolbarHeight) + 'px'
        }
      }
    })
  })



  bus.on('clear_active', () => {
    showNodeToolbar.value = false
  })

  bus.on('show_link', (val: any) => {
    showAddLink.value = val
  })
}

function openContextMenu() {
  const drawMenuList: MenuListItem[] = [{
    text: '回到根节点',
    key: 'backToRoot',
    action() {
      console.log('回到根节点');
    }
  }, {
    text: '展开所有',
    key: 'expandAll',
    action() {
      console.log('展开所有');
    }
  }, {
    text: '收起所有',
    key: 'collapseAll',
    action() {
      console.log('收起所有');
    },
  }, {
    text: '适应画布',
    key: 'fixDrawing',
    action() {
      console.log('适应画布');
    },
  }, {
    text: '禅模式',
    key: 'zenMode',
    action() {
      console.log('禅模式');
    }
  }]

  const nodeMenuList: MenuListItem[] = [{
    text: '插入',
    key: 'insert',
    children: [{
      text: '子级',
      key: 'child',
      action() {
        brainMap.execCommand(EnumCommandName.INSERT_CHILD_NODE, [...activeNodes])
        hide()
      }
    }, {
      text: '父级',
      key: 'parent',
      action() {
        hide()
      }
    }, {
      text: '同级',
      key: 'pair',
      action() {
        brainMap.execCommand(EnumCommandName.INSERT_SIBLING_NODE, [...activeNodes])
        hide()
      }
    }],
    action() {
      console.log('插入');
    },
  }, {
    text: '折叠',
    key: 'expand',
    action() {
      if (!activeNodes.length) return
      brainMap.execCommand(EnumCommandName.SET_NODE_EXPAND, [...activeNodes])
      hide()
    },
  }, {
    text: '剪切',
    key: 'cut',
    action() {
      console.log('剪切');
    },
  }, {
    text: '复制',
    key: 'copy',
    action() {
      console.log('复制');
    },
  }, {
    text: '粘贴',
    key: 'paste',
    action() {
      console.log('粘贴');
    },
  }, {
    text: '删除',
    key: 'remove',
    action() {
      brainMap.execCommand(EnumCommandName.DELETE_NODE, [...activeNodes])
      hide()
    },
  }, {
    text: '删除单个节点',
    key: 'removeSingle',
    action() {
      if (activeNodes.length > 1) {
        alert('没有激活节点或多个激活节点不支持删除单个节点~')
        return
      }
      brainMap.execCommand(EnumCommandName.DELETE_SINGLE_NODE, [...activeNodes])
      hide()
    },
  }]

  const { show, hide } = useContextMenu()
  bus.on('_contextmenu', (e: any) => {
    const menuList = e.currentTarget.classList.contains('bm-node') ? nodeMenuList : drawMenuList
    show(menuList, e.clientX, e.clientY)
  })
  window.addEventListener('mousedown', () => {
    hide()
  })

  bus.on('node_mousedown', () => {
    hide()
  })
}

</script>

<template>
  <div class="absolute left-0 mr70" ref="mainContainer">
    <div class="toolbar-top">
      <toolbar-top-left></toolbar-top-left>
      <toolbar-top-right></toolbar-top-right>
    </div>
    <group-prompt></group-prompt>
    <div id="brainMapContainer" ref="brainMapContainer" />
    <node-toolbar v-show="showNodeToolbar && !showSidebar"></node-toolbar>
  </div>
  <Sidebar v-show="showSidebar" class="absolute right-0"></Sidebar>
  <add-link v-if="showAddLink"></add-link>
</template>

<style lang="less" scoped>
.contariner {
  overflow: hidden;
}

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
