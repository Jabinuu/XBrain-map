<script setup lang="ts">
import LayoutSelect from '@/components/LayoutSelect.vue';
import { IconTags, IconAttachment, IconSettings, IconMindMapping } from '@arco-design/web-vue/es/icon';
import bus from '@/utils/bus';
import IconFont from '@/components/IconFont.vue';
const hasTooltip = ref<boolean | undefined>(undefined)
const branchType = ref<'curve' | 'straight'>('curve')
const lineWidth = ref(2)
const lineColor = ref('#000000')
const nodeShape = ref<'rectangle' | 'line' | 'capsule'>('rectangle')
const fillColor = ref('transparent')
const borderColor = ref('#000000')

function onClickSettingBtn() {
  hasTooltip.value = false
  bus.emit('sidebarVisibleChange', true)
}

function handleLineColorChange(val: any) {
  if (val === 'transparent') return
  lineColor.value = val
}

</script>

<template>
  <div id="node-toolbar-wrap" class="absolute">
    <a-card class="mb rd-8 card-shawdow">
      <div class="flex flex-items-center h8">
        <layout-select>
          <template #button="props">
            <a-tooltip mini :arrow-style="{ width: 0 }" backgroundColor="rgba(0,0,0,0.7)">
              <template #content>结构</template>
              <div class="layout-btn w12 h8 rd cursor-pointer" :class="props.selectLayout"></div>
            </a-tooltip>
          </template>
        </layout-select>
        <a-dropdown>
          <a-tooltip>
            <template #content>分支</template>
            <div class="cursor-pointer branch-btn pl2 pr2 rd h-full flex flex-items-center">
              <icon-font v-if="branchType === 'curve'" type="icon-siweidaotu1" :size="18"></icon-font>
              <icon-mind-mapping v-else class="icon-black w4.5 h4.5"></icon-mind-mapping>
            </div>
          </a-tooltip>
          <template #content>
            <div class="w30 pl1 pr1">
              <a-radio-group type="button" class="bg-white" v-model:model-value="branchType">
                <a-radio value="curve">
                  <icon-font type="icon-siweidaotu1" :size="18"></icon-font>
                </a-radio>
                <a-radio value="straight">
                  <icon-mind-mapping class="icon-black w4 h4"></icon-mind-mapping>
                </a-radio>
              </a-radio-group>
              <a-divider class="mt0 mb2" :size="2"></a-divider>
              <div class="flex justify-between rd">
                <a-input-number v-model="lineWidth" :min="1" :max="5" class="w18 rd" />
                <a-popover trigger="click" position="tr" class="w58" :arrow-style="{ visibility: 'hidden' }">
                  <div class="h8 w8 rd cursor-pointer" :style="{ backgroundColor: lineColor }"></div>
                  <template #content>
                    <color-picker @color-select-change="handleLineColorChange"></color-picker>
                  </template>
                </a-popover>
              </div>
            </div>
          </template>
        </a-dropdown>

        <a-divider direction="vertical" class="ml1 mr1 h5"></a-divider>

        <a-dropdown>
          <a-tooltip mini :arrow-style="{ width: 0 }" backgroundColor="rgba(0,0,0,0.7)">
            <template #content>节点形状</template>
            <div class="node-shape-btn-wrap w8 h8 rd p1 pl2 pr2 cursor-pointer">
              <div class="node-shape-btn h6" :class="nodeShape">
              </div>
            </div>
          </a-tooltip>

          <template #content>
            <a-radio-group :style="{ 'margin': '0 4px' }" v-model="nodeShape">
              <a-radio value="line" :style="{ 'margin-right': '8px', padding: '5px 5px' }" class="rd">
                <template #radio>
                  <div class="btn-background line w4.5 h4.5">
                  </div>
                </template>
              </a-radio>
              <a-radio value="capsule" :style="{ 'margin-right': '8px', padding: '5px 5px' }" class="rd">
                <template #radio>
                  <div class="btn-background capsule w4.5 h4.5 ">
                  </div>
                </template>
              </a-radio>
              <a-radio value="rectangle" :style="{ 'margin-right': '8px', padding: '5px 5px' }" class="rd">
                <template #radio>
                  <div class="btn-background rectangle w4.5 h4.5 ">
                  </div>
                </template>
              </a-radio>
            </a-radio-group>
          </template>
        </a-dropdown>

        <a-popover trigger="click" class="w58" :arrow-style="{ visibility: 'hidden' }">

          <a-tooltip class="opacity80 fs-0.9">
            <div class="w8 h8 flex flex-items-center justify-center cursor-pointer">
              <div v-if="fillColor === 'transparent'">
                <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                  <defs>
                    <pattern id="rect" viewBox="0,0,8,8" width="35%" height="35%">
                      <rect id="矩形" fill="#FAFAFA" x="0" y="0" width="4" height="4"></rect>
                      <rect id="矩形备份-21" fill="#FAFAFA" x="4" y="4" width="4" height="4"></rect>
                      <rect id="矩形备份-20" fill="#D9D9D9" x="4" y="0" width="4" height="4"></rect>
                      <rect id="矩形备份-22" fill="#D9D9D9" x="0" y="4" width="4" height="4"></rect>
                    </pattern>
                  </defs>
                  <circle cx="8" cy="8" r="8" fill="url(#rect)"></circle>
                </svg>
              </div>
              <div v-else>
                <div :style="{ width: '16px', height: '16px', backgroundColor: fillColor, borderRadius: '50%' }">
                </div>
              </div>
            </div>
            <template #content>填充色</template>
          </a-tooltip>
          <template #content>
            <color-picker @color-select-change="(val) => fillColor = val"></color-picker>
          </template>
        </a-popover>


        <a-popover trigger="click" class="w58" :arrow-style="{ visibility: 'hidden' }">
          <icon-btn :hasTooltip="undefined">
            <template #icon>
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                <title>编组 10</title>
                <g id="控件" stroke="none" fill="none" fill-rule="evenodd">
                  <g id="Z图标/2.编辑器/2.格式/描边" transform="translate(-6.000000, -8.000000)">
                    <g id="编组-10" transform="translate(6.000000, 8.000000)">
                      <circle id="椭圆形" :stroke="borderColor" fill="none" cx="8" cy="8" r="6.5" stroke-width="3"></circle>
                    </g>
                    <g id="编组-11" transform="translate(6.000000, 8.000000)">
                      <circle id="椭圆形2" :stroke="borderColor" fill="none" cx="8" cy="8" r="6.5" stroke-width="1"></circle>
                    </g>
                  </g>
                </g>
              </svg>
            </template>
            <template #tooltipContent>节点描边</template>
          </icon-btn>
          <template #content>
            <color-picker @color-select-change="(val) => borderColor = val"></color-picker>
          </template>
        </a-popover>



        <a-divider direction="vertical" class="ml1 mr1 h5"></a-divider>

        <icon-btn>
          <template #icon>
            <svg t="1705589367596" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4419" width="200" height="200">
              <path
                d="M384 810.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h170.666666a42.666667 42.666667 0 1 1 0 85.333333h-170.666666a42.666667 42.666667 0 0 1-42.666667-42.666666z"
                fill="#14181F" p-id="4420"></path>
              <path
                d="M512 170.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v597.333334a42.666667 42.666667 0 1 1-85.333334 0V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z"
                fill="#14181F" p-id="4421"></path>
              <path
                d="M213.333333 213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h512a42.666667 42.666667 0 0 1 42.666667 42.666666v42.666667a42.666667 42.666667 0 1 1-85.333334 0H298.666667a42.666667 42.666667 0 0 1-85.333334 0V213.333333z"
                fill="#14181F" p-id="4422"></path>
            </svg>
          </template>
          <template #tooltipContent>文字样式</template>
        </icon-btn>

        <icon-btn>
          <template #icon>
            <icon-tags class="w4.5 h4.5 icon-black" />
          </template>
          <template #tooltipContent>添加标记</template>
        </icon-btn>

        <icon-btn>
          <template #icon>
            <icon-attachment class="w4.5 h4.5 icon-black" />
          </template>
          <template #tooltipContent>添加标记</template>
        </icon-btn>

        <a-divider direction="vertical" class="ml1 mr1 h5"></a-divider>

        <icon-btn @click="onClickSettingBtn" :has-tooltip="hasTooltip">
          <template #icon>
            <icon-settings class="w4.5 h4.5 icon-black" />
          </template>
          <template #tooltipContent>打开设置</template>
        </icon-btn>

      </div>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
.card-shawdow {
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.04), 0 4px 8px 1px rgba(0, 0, 0, 0.02);
}

.layout-btn {
  background-repeat: no-repeat;
  background-position: center;
  transition: all .1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.node-shape-btn {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: all .3s;
}

.layout-btn:hover,
.branch-btn:hover,
.node-shape-btn-wrap:hover {
  background-color: rgb(242, 243, 245)
}

.arco-radio:hover,
.arco-radio.arco-radio-checked,
.arco-radio-button:hover,
.arco-radio-button.arco-radio-checked {
  background-color: rgba(231, 233, 232, 0.9);
}


:deep(.arco-card-body) {
  padding: 4px;
}

.arco-input-wrapper {
  background-color: #fff;
  border: 1px solid rgb(212, 217, 222);
}

.arco-input-wrapper:hover {
  background-color: #fff;
  border: 1px solid rgb(212, 217, 222);

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

.btn-background {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.line {
  background-image: url('https://gw.alipayobjects.com/zos/bmw-prod/6ffe619f-04e8-48c7-af45-5f0f3cf2c4a1.svg');
}

.capsule {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/3818284f-32e3-44cb-875c-1b722074ddaa.svg);
}

.rectangle {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/7b0ba540-6360-430b-a960-90c928ca037c.svg);
}
</style>
