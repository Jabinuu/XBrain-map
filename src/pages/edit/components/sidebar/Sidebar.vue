<script setup lang="ts">
import { IconBold, IconItalic, IconStrikethrough, IconUnderline, IconAlignLeft, IconAlignCenter, IconAlignRight, IconMenu, IconMindMapping } from '@arco-design/web-vue/es/icon';
import bus from '@/utils/bus'
import LayoutSelect from '@/components/LayoutSelect.vue'
import ShapeSelect from './ShapeSelect.vue';
import ColorPicker from '@/components/ColorPicker.vue'
import IconFont from '@/components/IconFont.vue';

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

const fontSize = ref(14)
const nodeFillColor = ref('transparent')
const borderColor = ref('transparent')
const lineColor = ref('#000000')
const fontColor = ref('#000000')
const isFillTransparent = computed(() => nodeFillColor.value === 'transparent')
const isBorderTransparent = computed(() => borderColor.value === 'transparent')
const shapeBorderWidth = ref(2)
const resizeNode = ref(true)
const branchType = ref<'straight' | 'curve'>('curve')
const rainbowBranch = ref(true)
const borderThinByLayer = ref(false)
const fontSettings = ref([])
const alignMode = ref('left')

function handleCancel() {
  bus.emit('sidebarVisibleChange', false)
}

function handleNodeFillChange(val: string) {
  nodeFillColor.value = val
}

function handleBorderColorChange(val: string) {
  borderColor.value = val
}

function handleLineColorChange(val: string) {
  if (val === 'transparent') return
  lineColor.value = val
}

function handleFontColorChange(val: string) {
  if (val === 'transparent') return
  fontColor.value = val
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
                <shape-select></shape-select>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>填充颜色</span>
                <a-popover trigger="click" position="tr" class="w58">
                  <div v-if="!isFillTransparent" class="w22 h8 rd border p1 cursor-pointer">
                    <div class="h-full" :style="{ backgroundColor: nodeFillColor }"></div>
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
                    <div class="h-full" :style="{ backgroundColor: borderColor }"></div>
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
                  <a-input-number class="h-full w-full bg-white" :min="1" :max="5" v-model="shapeBorderWidth" />
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
                      <path d="M64 2c-27.42 0-35.012 8-64 8" :stroke="lineColor" stroke-width="4" fill="none"
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
                  <a-input-number :default-value="2" class="h-full w-full bg-white" :min="1" :max="5" />
                </div>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>分支类型</span>
                <a-radio-group type="button" size="large" class="w22 h8 border rd" v-model="branchType">
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
          <a-checkbox-group class="mb5 flex" v-model:model-value="fontSettings" @change="console.log(fontSettings)">
            <a-checkbox value="1">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-bold class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
            <a-checkbox value="2">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-italic class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
            <a-checkbox value="3">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-strikethrough class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
            <a-checkbox value="4">
              <template #checkbox="{ checked }">
                <a-tag :checked="checked" checkable color="arcoblue">
                  <icon-underline class="w4.5 h4.5 icon-black" />
                </a-tag>
              </template>
            </a-checkbox>
          </a-checkbox-group>

          <div class="flex justify-between flex-items-center mb">
            <span>字号</span>
            <a-select class="w22 h8" v-model="fontSize" :trigger-props="{ autoFitPopupMinWidth: true }">
              <a-option v-for="(item, idx) in fontSizeList" :key="idx" :label="item.label" :value="item.value" />
            </a-select>
          </div>
          <div class="flex justify-between flex-items-center mb">
            <span>文本颜色</span>
            <a-popover trigger="click" position="tr" class="w58">
              <div class="w22 h8 rd border p1 cursor-pointer">
                <div class="h-full" :style="{ backgroundColor: fontColor }"></div>
              </div>
              <template #content>
                <color-picker @color-select-change="handleFontColorChange"></color-picker>
              </template>
            </a-popover>
          </div>
        </div>

        <a-collapse :default-active-key="[1, 2]" :bordered="false">
          <a-collapse-item header="对齐方式" :style="customStyle" :key="1">
            <a-radio-group type="button" size="large" class="mb flex rd border" v-model="alignMode">
              <a-radio value="left">
                <icon-align-left class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="center">
                <icon-align-center class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="right">
                <icon-align-right class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="all">
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
