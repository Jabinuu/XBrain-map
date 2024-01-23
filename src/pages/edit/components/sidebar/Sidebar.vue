<script setup lang="ts">
import { IconBold, IconItalic, IconStrikethrough, IconUnderline, IconAlignLeft, IconAlignCenter, IconAlignRight, IconMenu } from '@arco-design/web-vue/es/icon';
import bus from '@/utils/bus'
import LayoutSelect from './LayoutSelect.vue'
import ShapeSelect from './ShapeSelect.vue';
import ColorPicker from '@/components/ColorPicker.vue'

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
const isFillTransparent = computed(() => nodeFillColor.value === 'transparent')
const isBorderTransparent = computed(() => borderColor.value === 'transparent')

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
              <layout-select></layout-select>
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
                  <a-input-number :default-value="2" class="h-full w-full bg-white" :min="1" :max="5" />
                </div>
              </div>
              <div>
                <a-checkbox>手动设置节点尺寸</a-checkbox>
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
                <a-radio-group type="button" size="large" class="w22 h8 border rd">
                  <a-radio value="1">
                    <div class="h6 flex flex-items-center">
                      <svg t="1705977959264" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="2478" width="16" height="16">
                        <path
                          d="M504.618667 245.333333A227.285333 227.285333 0 0 0 277.333333 472.618667v57.642666a248.405333 248.405333 0 0 0 248.405334 248.405334h252.928a32 32 0 0 1 0 64h-252.928A312.405333 312.405333 0 0 1 213.333333 530.261333v-57.6a291.285333 291.285333 0 0 1 291.285334-291.328h274.048a32 32 0 0 1 0 64h-274.048z"
                          fill="#2C2722" p-id="2479"></path>
                        <path
                          d="M138.666667 512a32 32 0 0 1 32-32h682.666666a32 32 0 0 1 0 64H170.666667a32 32 0 0 1-32-32z"
                          fill="#2C2722" p-id="2480"></path>
                      </svg>
                    </div>
                  </a-radio>
                  <a-radio value="2">
                    <div class="h6 flex flex-items-center">
                      <svg t="1705978489676" class=" icon-black " viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="13902" width="14" height="14">
                        <path
                          d="M715.52 162.368h246.208a47.68 47.68 0 0 0 0-95.36H715.52a47.68 47.68 0 0 0 0 95.36M961.728 861.632H715.52a47.68 47.68 0 0 0 0 95.36h246.272a47.68 47.68 0 0 0 0-95.36M961.728 464.32H715.52a47.68 47.68 0 0 0 0 95.36h246.272a47.68 47.68 0 0 0 0-95.36M298.816 162.368h257.664a47.68 47.68 0 0 0 0-95.36H298.816a158.912 158.912 0 0 0-156.8 160.576v226.56H62.336a47.68 47.68 0 0 0 0 95.36H142.08v246.912a158.912 158.912 0 0 0 156.736 160.576h257.664a47.68 47.68 0 0 0 0-95.36H298.816a63.872 63.872 0 0 1-62.272-65.216V549.504h319.936a47.68 47.68 0 0 0 0-95.36h-320v-226.56a63.872 63.872 0 0 1 62.336-65.28"
                          fill="#333333" p-id="13903"></path>
                      </svg>
                    </div>
                  </a-radio>
                </a-radio-group>
              </div>
              <div class="mb">
                <a-checkbox>彩虹分支</a-checkbox>
              </div>
              <div>
                <a-checkbox>分支线条宽度逐渐变细</a-checkbox>
              </div>
            </div>
          </a-collapse-item>
        </a-collapse>
      </a-tab-pane>

      <a-tab-pane key="2">
        <template #title>文本</template>
        <div style="margin-left: 20px; margin-right: 18px;">
          <div class="flex justify-around mb">
            <icon-btn :hasTooltip="false">
              <template #icon>
                <icon-bold class="w4.5 h4.5 icon-black" />
              </template>
            </icon-btn>
            <icon-btn :hasTooltip="false">
              <template #icon>
                <icon-italic class="w4.5 h4.5 icon-black" />
              </template>
            </icon-btn>
            <icon-btn :hasTooltip="false">
              <template #icon>
                <icon-strikethrough class="w4.5 h4.5 icon-black" />
              </template>
            </icon-btn>
            <icon-btn :hasTooltip="false">
              <template #icon>
                <icon-underline class="w4.5 h4.5 icon-black" />
              </template>
            </icon-btn>
          </div>
          <div class="flex justify-between flex-items-center mb">
            <span>字号</span>
            <a-select class="w22 h8" v-model="fontSize" :trigger-props="{ autoFitPopupMinWidth: true }">
              <a-option v-for="(item, idx) in fontSizeList" :key="idx" :label="item.label" :value="item.value" />
            </a-select>
          </div>
          <div class="flex justify-between flex-items-center mb">
            <span>文本颜色</span>
            <div class="w22 h8 border rd p1">
              <div class="bg-pink h-full"></div>
            </div>
          </div>
        </div>

        <a-collapse :default-active-key="[1, 2]" :bordered="false">
          <a-collapse-item header="对齐方式" :style="customStyle" :key="1">
            <a-radio-group type="button" size="large" class="mb flex rd border ">
              <a-radio value="Beijing">
                <icon-align-left class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="Shanghai">
                <icon-align-center class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="Guangzhou">
                <icon-align-right class="w4 h4 icon-black " />
              </a-radio>
              <a-radio value="Shenzhen">
                <icon-menu class="w4 h4 icon-black " />
              </a-radio>
            </a-radio-group>

          </a-collapse-item>
          <a-collapse-item header="链接" :style="customStyle" :key="2">
            <a-button class="rd block">添加链接</a-button>
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
</style>
