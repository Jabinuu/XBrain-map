<script setup lang="ts">
import { IconBold, IconItalic, IconStrikethrough, IconUnderline, IconAlignLeft, IconAlignCenter, IconAlignRight, IconMenu } from '@arco-design/web-vue/es/icon';
defineProps<{
  isVisible?: boolean
}>()

const emit = defineEmits(['visibleChange'])
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
const handleCancel = () => {
  emit('visibleChange', false)
};


</script>

<template>
  <a-drawer :width="340" :visible="isVisible" unmountOnClose @cancel="handleCancel" :mask="false" :footer="false">
    <template #title>设置</template>

    <a-tabs default-active-key="1" :header-padding="false">
      <a-tab-pane key="1" title="节点">
        <a-collapse :default-active-key="[1, 2, 3]" :bordered="false">
          <a-collapse-item header="布局" :style="customStyle" :key="1">
            <div class="flex justify-between flex-item-center">
              <span>结构</span>
              <div class="w22 h8 rd border current-layout"></div>
            </div>
          </a-collapse-item>
          <a-collapse-item header="节点" :style="customStyle" :key="2">
            <div>
              <div class="flex justify-between flex-items-center mb">
                <span>节点形状</span>
                <div class="w22 h8  rd border current-node-shape"></div>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>填充颜色</span>
                <div class="w22 h8 rd border p1">
                  <div class="bg-pink h-full"></div>
                </div>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>边框颜色</span>
                <div class="w22 h8 rd border p1">
                  <div class="bg-pink h-full"></div>
                </div>
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
                <div class="w22 h8 rd border flex justify-center flex-items-center">
                  <svg width="64" viewBox="0 0 64 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64 2c-27.42 0-35.012 8-64 8" stroke="#A287E1" stroke-width="4" fill="none"
                      fill-rule="evenodd">
                    </path>
                  </svg>
                </div>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>分支粗细</span>
                <div class="w22 h8 rd border ">
                  <a-input-number :default-value="2" class="h-full w-full bg-white" :min="1" :max="5" />
                </div>
              </div>
              <div class="flex justify-between flex-items-center mb">
                <span>分支类型</span>
                <div class="w22 h8 ">
                  <a-radio-group type="button" size="large" class="mb flex rd border  bg-white">
                    <a-radio>
                      <icon-align-left class="w4 h4 icon-black " />
                    </a-radio>
                    <a-radio>
                      <icon-align-center class="w4 h4 icon-black " />
                    </a-radio>
                  </a-radio-group>
                </div>
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
            <a-button class="rd  block">添加链接</a-button>
          </a-collapse-item>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<style lang="less" scoped>
.current-layout {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/af8bdfa5-f0ae-446b-836e-1d0340d2f5c6.svg);
  background-repeat: no-repeat;
  background-position: center;
  transition: all .3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

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
</style>
