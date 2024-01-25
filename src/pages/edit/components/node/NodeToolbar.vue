<script setup lang="ts">
import LayoutSelect from '@/components/LayoutSelect.vue';
import {
  IconTags, IconAttachment, IconSettings, IconMindMapping, IconBold, IconCheck,
  IconItalic, IconStrikethrough, IconUnderline, IconAlignCenter, IconAlignLeft, IconAlignRight, IconMenu, IconFontColors
} from '@arco-design/web-vue/es/icon';
import bus from '@/utils/bus';
import IconFont from '@/components/IconFont.vue';
import IconBtn from '@/components/IconBtn.vue';

const hasTooltip = ref<boolean | undefined>(undefined)
const branchType = ref<'curve' | 'straight'>('curve')
const lineWidth = ref(2)
const lineColor = ref('#000000')
const nodeShape = ref<'rectangle' | 'line' | 'capsule'>('rectangle')
const fillColor = ref('transparent')
const borderColor = ref('#000000')
const borderWidth = ref(2)
const fontStyle = ref([])
const alignMode = ref<'left' | 'center' | 'right' | 'all'>('left')
const fontSizeList = ref([12, 14, 16, 18, 22, 24, 32, 36, 48, 64, 92])
const fontSize = ref(14)
const fontColor = ref('#000000')

function onClickSettingBtn() {
  hasTooltip.value = false
  bus.emit('sidebarVisibleChange', true)
}

function handleLineColorChange(val: any) {
  if (val === 'transparent') return
  lineColor.value = val
}

function showCheckIcon(val: string) {
  return alignMode.value === val ? 'show' : 'hidden'
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

        <a-popover trigger="click" class="w58" :position="'br'" :arrow-style="{ visibility: 'hidden' }">
          <a-tooltip class="opacity80 fs-0.9">
            <div class="w8 h8 flex flex-items-center justify-center cursor-pointer ">
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
              <div v-else class="inset-shadow">
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

        <a-popover trigger="click" :position="'br'" :arrow-style="{ visibility: 'hidden' }"
          :content-style="{ padding: '4px 6px 6px' }">
          <icon-btn :hasTooltip="undefined">
            <template #icon>
              <svg v-if="borderColor !== 'transparent'" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                <title>编组 10</title>
                <g id="控件" stroke="none" fill="none" fill-rule="evenodd">
                  <g id="Z图标/2.编辑器/2.格式/描边" transform="translate(-6.000000, -8.000000)">
                    <g id="编组-10" transform="translate(6.000000, 8.000000)">
                      <circle id="椭圆形" stroke="#e8e8e8" fill="none" cx="8" cy="8" r="6.5" stroke-width="3">
                      </circle>
                    </g>
                    <g id="编组-11" transform="translate(6.000000, 8.000000)">
                      <circle id="椭圆形2" :stroke="borderColor" fill="none" cx="8" cy="8" r="6.5" stroke-width="2">
                      </circle>
                    </g>
                  </g>
                </g>
              </svg>
              <svg v-else width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                <title>透明环</title>
                <g id="控件" stroke="none" stroke-width="0.5" fill="none" fill-rule="evenodd">
                  <g id="透明环" transform="translate(-0.000000, 0.000000)">
                    <path
                      d="M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 Z M8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 Z"
                      id="形状" fill="#FAFAFA"></path>
                    <path
                      d="M8,13 L8,12.999 L8,16 C6.91549955,16 5.88140117,15.7842031 4.93830231,15.3932066 L6.08631593,12.6207031 C6.67578581,12.8651081 7.32214006,13 8,13 Z M11.5247537,11.5462815 L13.6458509,13.6678364 C12.905585,14.4052487 12.0216994,14.9985887 11.0398062,15.4022444 L9.89058451,12.6302127 C10.5062584,12.3785637 11.0605479,12.0076869 11.5247537,11.5462815 Z M4.48114009,11.5521301 L2.36015992,13.6738177 C1.61882513,12.9368948 1.02109994,12.0556625 0.612650477,11.075787 L3.38472128,9.92671467 C3.64106728,10.5400536 4.01611047,11.091429 4.48114009,11.5521301 Z M16,7.999 C16,9.08450045 15.7842031,10.1185988 15.3932066,11.0616977 L12.6207031,9.91368407 C12.8651081,9.32421419 13,8.67785994 13,8 L16,7.999 Z M3,8 L2.999,8 L4.45652404e-11,8 C4.45652404e-11,6.91549955 0.215796936,5.88140117 0.606793361,4.93830231 L3.37929685,6.08631593 C3.13489185,6.67578581 3,7.32214006 3,8 Z M13.6398401,2.32618229 C14.3811749,3.06310522 14.9789001,3.94433749 15.3873495,4.92421296 L12.6152787,6.07328533 C12.3589327,5.45994637 11.9838895,4.90857096 11.5188599,4.44786988 L13.6398401,2.32618229 Z M8,9.09494702e-13 C9.0848864,9.09494702e-13 10.1193348,0.215950555 11.0627045,0.607210861 L9.91368407,3.37929685 C9.32421419,3.13489185 8.67785994,3 8,3 L7.999,9.09494702e-13 L8,9.09494702e-13 Z M2.37521442,2.31125673 C2.36817981,2.31821274 2.36115804,2.32518171 2.35414914,2.33216359 C2.47280694,2.21398682 2.594547,2.10004476 2.71975554,1.98995348 L2.91043586,1.82748893 C3.08291716,1.68509277 3.26177813,1.54957175 3.44628096,1.42161318 L3.44587689,1.42189343 C3.64121394,1.28642097 3.84244471,1.15967042 4.04944431,1.04189047 L4.04893797,1.04217859 L4.35587152,0.876283146 L4.35587152,0.876283146 L4.67022901,0.723755702 L4.96019384,0.597755619 L6.10941549,3.36978734 L6.08230453,3.38096211 C6.01729624,3.40798236 5.95298109,3.43633501 5.88939319,3.46598597 L6.10941549,3.36978734 C6.00994969,3.41044274 5.91208604,3.45421002 5.81594555,3.50096817 C5.67093771,3.57146782 5.52925326,3.64913643 5.39194239,3.73324727 C5.36336599,3.75074884 5.33464738,3.76874189 5.30612657,3.78701662 C5.2498994,3.8230481 5.19464208,3.86003397 5.14017772,3.89807688 C5.13087827,3.90457251 5.12161081,3.91109266 5.11236658,3.91764341 C5.0411436,3.96811355 4.9712726,4.02042159 4.90284866,4.07448042 C4.89157281,4.08338639 4.8797933,4.09277659 4.86805733,4.10221872 C4.81544399,4.14455883 4.76415727,4.18754838 4.71376093,4.2315324 C4.69109675,4.25131063 4.66840717,4.2714759 4.64590384,4.29184316 L4.61016998,4.32449924 L4.61016998,4.32449924 L4.47532075,4.45364446 L4.47532075,4.45364446 L2.35414914,2.33216359 L2.359,2.326 L2.36467214,2.32170046 L2.361,2.325 Z"
                      id="形状结合" fill="#D9D9D9"></path>
                  </g>
                </g>
              </svg>
            </template>
            <template #tooltipContent>节点描边</template>
          </icon-btn>

          <template #content>
            <div class=" flex">
              <a-input-number v-model="borderWidth" :min="1" :max="10" :style="{ width: '70px', marginRight: '10px' }"
                class="rd" />
              <a-popover trigger="click" class="w58" :position="'br'" :arrow-style="{ visibility: 'hidden' }">
                <div class="p0.5 border rd">
                  <div v-if="borderColor !== 'transparent'" class="h7 w7 rd cursor-pointer"
                    :style="{ backgroundColor: borderColor }"></div>
                  <div v-else class="h7 w7 rd cursor-pointer">
                    <svg width="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 30L30 0" stroke="#D0021B" fill="none" fill-rule="evenodd" stroke-linecap="square">
                      </path>
                    </svg>
                  </div>
                </div>
                <template #content>
                  <color-picker @color-select-change="(val) => borderColor = val"></color-picker>
                </template>
              </a-popover>
            </div>
          </template>
        </a-popover>

        <a-divider direction="vertical" class="ml1 mr1 h5"></a-divider>

        <a-dropdown trigger="click" :arrow-style="{ visibility: 'hidden' }" position="bl">
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

          <template #content>
            <div class="ml1 mr1">
              <a-checkbox-group v-model:model-value="fontStyle" @change="console.log(fontStyle)">
                <a-checkbox value="1" :style="{ marginRight: 0, paddingLeft: 0 }">
                  <template #checkbox="{ checked }">
                    <a-tag :checked="checked" checkable color="arcoblue">
                      <icon-bold class="w4.5 h4.5 icon-black" />
                    </a-tag>
                  </template>
                </a-checkbox>
                <a-checkbox value="2" :style="{ marginRight: 0, paddingLeft: '4px' }">
                  <template #checkbox="{ checked }">
                    <a-tag :checked="checked" checkable color="arcoblue">
                      <icon-italic class="w4.5 h4.5 icon-black" />
                    </a-tag>
                  </template>
                </a-checkbox>
                <a-checkbox value="3" :style="{ marginRight: 0, paddingLeft: '4px' }">
                  <template #checkbox="{ checked }">
                    <a-tag :checked="checked" checkable color="arcoblue">
                      <icon-strikethrough class="w4.5 h4.5 icon-black" />
                    </a-tag>
                  </template>
                </a-checkbox>
                <a-checkbox value="4" :style="{ marginRight: 0, paddingLeft: '4px' }">
                  <template #checkbox="{ checked }">
                    <a-tag :checked="checked" checkable color="arcoblue">
                      <icon-underline class="w4.5 h4.5 icon-black" />
                    </a-tag>
                  </template>
                </a-checkbox>
              </a-checkbox-group>

              <a-divider :size="2" :margin="4"></a-divider>
              <div class="flex">
                <a-dropdown trigger="click" :content-style="{ maxHeight: '500px' }">
                  <a-tooltip class="fs-0.9 opacity70" :arrow-style="{ width: 0 }" mini>
                    <div
                      class=" w12 flex flex-items-center justify-center p1 hover:bg-hover cursor-pointer rd font-size-4 ">
                      <span>{{ fontSize }}</span>
                      <span class=" font-bold">px</span>
                    </div>
                    <template #content>
                      字号
                    </template>
                  </a-tooltip>
                  <template #content>
                    <a-doption v-for="(item, idx) in fontSizeList" :key="idx" class="font-size-4"
                      @click="fontSize = item">
                      <template #icon>
                        <icon-check class="w4.5 h4.5" :style="{ visibility: fontSize === item ? 'show' : 'hidden' }" />
                      </template>
                      {{ `${item}px` }}
                    </a-doption>
                  </template>
                </a-dropdown>
                <a-popover trigger="click" class="w58" :position="'br'" :arrow-style="{ visibility: 'hidden' }">
                  <icon-btn>
                    <template #icon>
                      <icon-font-colors class="w4.5 h4.5" :style="{ color: fontColor }" />
                    </template>
                    <template #tooltipContent>字色</template>
                  </icon-btn>
                  <template #content>
                    <color-picker @color-select-change="(val) => fontColor = val"></color-picker>
                  </template>
                </a-popover>

                <a-dropdown trigger="click" :content-style="{ paddingLeft: '4px' }">
                  <icon-btn>
                    <template #icon>
                      <icon-align-left v-if="alignMode === 'left'" class="w4.5 h4.5 icon-black" />
                      <icon-align-center v-else-if="alignMode === 'center'" class="w4.5 h4.5 icon-black" />
                      <icon-align-right v-else-if="alignMode === 'right'" class="w4.5 h4.5 icon-black" />
                      <icon-menu v-else class="w4.5 h4.5 icon-black" />
                    </template>
                    <template #tooltipContent>
                      对齐方式
                    </template>
                  </icon-btn>

                  <template #content>
                    <a-doption @click="alignMode = 'left'">
                      <template #icon>
                        <icon-check :style="{ visibility: showCheckIcon('left') }" class="w4.5 h4.5 mr2" />
                        <icon-align-left class="w4.5 h4.5" />
                      </template>
                      <template #default>左对齐</template>
                    </a-doption>
                    <a-doption @click="alignMode = 'center'">
                      <template #icon>
                        <icon-check :style="{ visibility: showCheckIcon('center') }" class="w4.5 h4.5 mr2" />
                        <icon-align-center class="w4.5 h4.5" />
                      </template>
                      <template #default>居中对齐</template>
                    </a-doption>
                    <a-doption @click="alignMode = 'right'">
                      <template #icon>
                        <icon-check :style="{ visibility: showCheckIcon('right') }" class="w4.5 h4.5 mr2" />
                        <icon-align-right class="w4.5 h4.5" />
                      </template>
                      <template #default>右对齐</template>
                    </a-doption>
                    <a-doption @click="alignMode = 'all'">
                      <template #icon>
                        <icon-check :style="{ visibility: showCheckIcon('all') }" class="w4.5 h4.5 mr2" />
                        <icon-menu class="w4.5 h4.5" />
                      </template>
                      <template #default>两端对齐</template>
                    </a-doption>
                  </template>
                </a-dropdown>
              </div>

            </div>
          </template>
        </a-dropdown>



        <icon-btn>
          <template #icon>
            <icon-tags class="w4.5 h4.5 icon-black" />
          </template>
          <template #tooltipContent>添加标记</template>
        </icon-btn>

        <a-popover trigger="click" :arrow-style="{ width: 0 }">
          <icon-btn>
            <template #icon>
              <icon-attachment class="w4.5 h4.5 icon-black" />
            </template>
            <template #tooltipContent>添加链接</template>
          </icon-btn>

          <template #content>
            <add-link></add-link>
          </template>
        </a-popover>



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

.inset-shadow {
  border-radius: 50%;
  box-shadow: 0 0 1.5px 0 rgb(0, 0, 0);
}
</style>
