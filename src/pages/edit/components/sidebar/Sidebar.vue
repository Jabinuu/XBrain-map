<script setup lang="ts">
import { IconBold, IconItalic, IconStrikethrough, IconUnderline, IconAlignLeft, IconAlignCenter, IconAlignRight, IconMenu, IconMindMapping } from '@arco-design/web-vue/es/icon';
import bus from '@/utils/bus'
import LayoutSelect from '@/components/LayoutSelect.vue'
import ShapeSelect from './ShapeSelect.vue';
import ColorPicker from '@/components/ColorPicker.vue'
import IconFont from '@/components/IconFont.vue';
import Node from '^/src/node/Node'
import { onMounted } from 'vue';

defineProps<{
  isVisible?: boolean
}>()

const customStyle = {
  borderRadius: '6px',
  marginBottom: '12px',
  border: 'none',
  overflow: 'hidden',
}

const fontSizeList = [{
  value: 12,
  label: '12px'
}, {
  value: 14,
  label: '14px'
}, {
  value: 16,
  label: '16px'
}, {
  value: 18,
  label: '18px'
}, {
  value: 22,
  label: '22px'
}, {
  value: 24,
  label: '24px'
}, {
  value: 32,
  label: '32px'
}, {
  value: 36,
  label: '36px'
}, {
  value: 48,
  label: '48px'
}, {
  value: 64,
  label: '64px'
}, {
  value: 92,
  label: '92px'
}]

const resizeNode = ref(true)
const rainbowBranch = ref(true)
const borderThinByLayer = ref(false)
const activeNodes = ref()

const style = ref<Record<string, any>>({
  fontSize: -1,
  fillColor: '',
  borderColor: '',
  lineColor: '',
  color: '',
  borderWidth: -1,
  lineStyle: '',
  fontStyle: false,
  textUnderline: false,
  textLineThrough: false,
  fontWeight: false,
  textAlign: 'left',
  shape: '',
  lineWidth: -1
})
const isFillTransparent = computed(() => style.value.fillColor === 'transparent')
const isBorderTransparent = computed(() => style.value.borderColor === 'transparent')

onMounted(() => {
  bus.on('node_active', (manipulateNodes: any) => {
    activeNodes.value = [...manipulateNodes[0]]
    initSidebar()
  })
})

function handleCancel() {
  bus.emit('sidebarVisibleChange', false)
}

function handleNodeFillChange(val: string) {
  style.value.fillColor = val;
  (activeNodes.value[0] as Node).setStyle('fillColor', val)
}

function handleBorderColorChange(val: string) {
  style.value.borderColor = val;
  (activeNodes.value[0] as Node).setStyle('borderColor', val)
}

function handleLineColorChange(val: any) {
  if (val === 'transparent') return
  style.value.lineColor = val;
  (activeNodes.value[0] as Node).setStyle('lineColor', val)
}

function handleFontColorChange(val: any) {
  if (val === 'transparent') return
  style.value.color = val;
  (activeNodes.value[0] as Node).setStyle('color', val)
}

function handleFontWeight(val: any) {
  let _val
  if (val) {
    _val = 'bold'
  } else {
    _val = 'normal'
  }
  activeNodes.value[0].setStyle('fontWeight', _val)
}

function handleFontStyle(val: any) {
  let _val
  if (val) {
    _val = 'italic'
  } else {
    _val = 'normal'
  }
  activeNodes.value[0].setStyle('fontStyle', _val)
}

function handleTextDecoration() {
  let val = ''
  const { textLineThrough, textUnderline } = style.value
  if (textUnderline && !textLineThrough) {
    val = 'underline'
  } else if (!textUnderline && textLineThrough) {
    val = 'line-through'
  } else if (textUnderline && textLineThrough) {
    val = 'underline line-through'
  }

  activeNodes.value[0].setStyle('textDecoration', val)
}

function initSidebar() {
  ['fontSize',
    'fillColor',
    'borderColor',
    'lineColor',
    'color',
    'borderWidth',
    'lineStyle',
    'shape',
    'lineWidth',
    'textAlign'
  ]
  .forEach((prop) => {
      style.value[prop] = (activeNodes.value[0] as Node).getStyle(prop)
    })

  if(!['left','right','center','justify'].includes(style.value.textAlign)){
    style.value.textAlign = 'left'
  }
  style.value.textLineThrough = false
  style.value.textUnderline = false
  style.value.fontWeight = false
  style.value.fontStyle = false;

  ['fontStyle', 'fontWeight', 'textDecoration'].forEach((prop) => {
    const val = (activeNodes.value[0] as Node).getStyle(prop)
    if (prop === 'fontWeight' && val === 'bold') {
      style.value.fontWeight = true
    } else if (prop === 'fontStyle' && val === 'italic') {
      style.value.fontStyle = true
    } else if (prop === 'textDecoration' && val === 'underline') {
      style.value.textUnderline = true
    } else if (prop === 'textDecoration' && val === 'line-through') {
      style.value.textLineThrough = true
    } else if (prop === 'textDecoration' && val.split(' ').length === 2) {
      style.value.textLineThrough = true
      style.value.textUnderline = true
    }
  })
}
</script>

<template>
  <div class="w70  bg-white sidebar-shadow">
    <div class="flex justify-between mt flex-items-center pl pb2 border-b-1">
      <span class="font-size-4">设置</span>
      <div class="w4 h4 cancel-btn mr4" @click="handleCancel">
      </div>
    </div>
    <a-tabs default-active-key="1" class="main-tabs">
      <a-tab-pane key="1" title="节点">
        <a-collapse :default-active-key="[1, 2, 3]" :bordered="false">
          <a-collapse-item header="布局" :style="customStyle" :key="1">
            <div class="flex justify-between flex-items-center">
              <span>结构</span>
              <layout-select position="br">
                <template #button="{ selectLayout }">
                  <div class="w22 h8 rd border current-layout cursor-pointer" :class="selectLayout" />
                </template>
              </layout-select>
            </div>
          </a-collapse-item>
          <a-collapse-item header="节点" :style="customStyle" :key="2">
            <div>
              <div class="flex justify-between flex-items-center mb">
                <span>节点形状</span>
                <shape-select :active-nodes="activeNodes"></shape-select>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>填充颜色</span>
                <a-popover trigger="click" position="tr" class="w58">
                  <div v-if="!isFillTransparent" class="w22 h8 rd border p1 cursor-pointer">
                    <div class="h-full" :style="{ backgroundColor: style.fillColor }"></div>
                  </div>
                  <div v-else class="w22 h8 rd border cursor-pointer">
                    <svg width="90" viewBox="0 0 90 32" xmlns="http://www.w3.org/2000/svg" class="larkui-popover-trigger">
                      <path d="M0 30L86 0" stroke="#D0021B" fill="none" fill-rule="evenodd" stroke-linecap="square">
                      </path>
                    </svg>
                  </div>
                  <template #content>
                    <color-picker @color-select-change="handleNodeFillChange"></color-picker>
                  </template>
                </a-popover>

              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>边框颜色</span>
                <a-popover trigger="click" position="tr" class="w58">
                  <div v-if="!isBorderTransparent" class="w22 h8 rd border p1 cursor-pointer">
                    <div class="h-full" :style="{ backgroundColor: style.borderColor }"></div>
                  </div>
                  <div v-else class="w22 h8 rd border cursor-pointer">
                    <svg width="90" viewBox="0 0 90 32" xmlns="http://www.w3.org/2000/svg" class="larkui-popover-trigger">
                      <path d="M0 30L86 0" stroke="#D0021B" fill="none" fill-rule="evenodd" stroke-linecap="square">
                      </path>
                    </svg>
                  </div>
                  <template #content>
                    <color-picker @color-select-change="handleBorderColorChange"></color-picker>
                  </template>
                </a-popover>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>边框粗细</span>
                <div class="w22 h8 rd border ">
                  <a-input-number class="h-full w-full bg-white" :min="1" :max="5" v-model="style.borderWidth"
                    @change="activeNodes[0].setStyle('borderWidth', style.borderWidth)" />
                </div>
              </div>
              <div>
                <a-checkbox v-model="resizeNode">手动设置节点尺寸</a-checkbox>
              </div>
            </div>
          </a-collapse-item>
          <a-collapse-item header="分支" :style="customStyle" :key="3">
            <div>
              <div class="flex justify-between flex-items-center mb">
                <span>分支颜色</span>
                <a-popover trigger="click" position="tr" class="w58">
                  <div class="w22 h8 rd border flex justify-center flex-items-center">
                    <svg width="64" viewBox="0 0 64 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M64 2c-27.42 0-35.012 8-64 8" :stroke="style.lineColor" stroke-width="4" fill="none"
                        fill-rule="evenodd">
                      </path>
                    </svg>
                  </div>
                  <template #content>
                    <color-picker @color-select-change="handleLineColorChange"></color-picker>
                  </template>
                </a-popover>

              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>分支粗细</span>
                <div class="w22 h8 rd border ">
                  <a-input-number :default-value="2" class="h-full w-full bg-white" :min="1" :max="5"
                    v-model="style.lineWidth" @change="activeNodes[0].setStyle('lineWidth', style.lineWidth)" />
                </div>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>分支类型</span>
                <a-radio-group type="button" size="large" class="w22 h8 border rd" v-model="style.lineStyle"
                  @change="activeNodes[0].setStyle('lineStyle', style.lineStyle)">
                  <a-radio value="curve" class="branch">
                    <div class="h6 flex flex-items-center">
                      <icon-font type="icon-siweidaotu1" :size="18"></icon-font>
                    </div>
                  </a-radio>
                  <a-radio value="straight">
                    <div class=" h6 flex flex-items-center">
                      <icon-mind-mapping class="icon-black"></icon-mind-mapping>
                    </div>
                  </a-radio>
                </a-radio-group>
              </div>
              <div class="mb">
                <a-checkbox v-model="rainbowBranch">彩虹分支</a-checkbox>
              </div>
              <div>
                <a-checkbox v-model="borderThinByLayer">分支线条宽度逐渐变细</a-checkbox>
              </div>
            </div>
          </a-collapse-item>
        </a-collapse>
      </a-tab-pane>

      <a-tab-pane key="2">
        <template #title>文本</template>
        <div style="margin-left: 20px; margin-right: 18px;">
          <div class="mb5 flex justify-around">
            <a-checkbox v-model="style.fontWeight" @change="handleFontWeight">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-bold class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
            <a-checkbox v-model="style.fontStyle" @change="handleFontStyle">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-italic class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
            <a-checkbox v-model="style.textUnderline" @change="handleTextDecoration">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-strikethrough class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
            <a-checkbox v-model="style.textLineThrough" @change="handleTextDecoration">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-underline class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
          </div>

          <div class="flex justify-between flex-items-center mb">
            <span>字号</span>
            <a-select class="w22 h8" v-model="style.fontSize" :trigger-props="{ autoFitPopupMinWidth: true }"
              @change="activeNodes[0].setStyle('fontSize', style.fontSize)">
              <a-option v-for="(item, idx) in fontSizeList" :key="idx" :label="item.label" :value="item.value" />
            </a-select>
          </div>
          <div class="flex justify-between flex-items-center mb">
            <span>文本颜色</span>
            <a-popover trigger="click" position="tr" class="w58">
              <div class="w22 h8 rd border p1 cursor-pointer">
                <div class="h-full" :style="{ backgroundColor: style.color }"></div>
              </div>
              <template #content>
                <color-picker @color-select-change="handleFontColorChange"></color-picker>
              </template>
            </a-popover>
          </div>
        </div>

        <a-collapse :default-active-key="[1, 2]" :bordered="false">
          <a-collapse-item header="对齐方式" :style="customStyle" :key="1">
            <a-radio-group type="button" size="large" class="mb flex rd border" v-model="style.textAlign" @change="activeNodes[0].setStyle('textAlign',style.textAlign)">
              <a-radio value="left">
                <icon-align-left class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="center" >
                <icon-align-center class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="right">
                <icon-align-right class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="justify">
                <icon-menu class="w4 h4 icon-black " />
              </a-radio>
            </a-radio-group>
          </a-collapse-item>

          <a-collapse-item header="链接" :style="customStyle" :key="2">
            <a-popover trigger="click" :arrow-style="{ width: 0 }" :popup-style="{ top: '200px', left: '200px' }">
              <a-button class="rd block">添加链接</a-button>
              <template #content>
                <add-link></add-link>
              </template>
            </a-popover>

          </a-collapse-item>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="less" scoped>
.current-node-shape {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/3818284f-32e3-44cb-875c-1b722074ddaa.svg);
  background-repeat: no-repeat;
  background-position: center;
  transition: all .3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

:deep(.arco-collapse-item-content) {
  background: #fff;
}

.arco-btn-secondary {
  display: block;
  width: 100%;
  border: 1px solid #e7e9e8;
  background-color: #fff;
}

.arco-radio-button {
  flex: auto;
  text-align: center;
}

.cancel-btn {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/3a5cc682-0502-44f1-80cf-4a8de2d89e1e.svg);
}

:deep(.main-tabs .arco-tabs-content) {
  height: calc(100vh - 90px);
  overflow: auto;
}

.sidebar-shadow {
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.08);
}

:deep(.shape-select) {
  border-color: #e5e7eb;
}

.current-layout {
  background-repeat: no-repeat;
  background-position: center;
  transition: all .1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.standard-r {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/af8bdfa5-f0ae-446b-836e-1d0340d2f5c6.svg);
}

.indent-br {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/103fb753-229b-4717-9e49-356f013b3309.svg);
}

.indent-tr {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/15763057-474a-4b44-a999-3058a5328e9a.svg);
}

.timeline-r {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/56c34bb7-b888-4103-bc03-3124cd7b99a3.svg);
}

:deep(.branch>.arco-radio-button-content) {
  padding: 0 10px;
}
</style>
