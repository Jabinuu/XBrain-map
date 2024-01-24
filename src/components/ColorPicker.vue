<script setup lang="ts">
import { IconCheck } from '@arco-design/web-vue/es/icon';

const emit = defineEmits(['colorSelectChange'])

const colorThemePanel = ref([
  ['#262626', '#ffffff', '#00AEBF', '#0086FF', '#15CA52'],
  ['#FF880F', '#8958E5', '#E53385', '#F35D4B', '#456FF3']
])

const colorGradient: Record<string, string[]> = {
  'transparent': ['#D8DAD9', '#BEC0BF', '#8A8F8D', '#585A5A', '#262626', '#000000'],
  '#262626': ['#D8DAD9', '#BEC0BF', '#8A8F8D', '#585A5A', '#262626', '#000000'],
  '#ffffff': ['#ffffff', '#FAFAFA', '#F4F5F5', '#EFF0F0', '#E7E9E8'],
  '#00AEBF': ['#CCEFF2', '#99DFE5', '#4DC6D2', '#00AEBF', '#008B99', '#00464C'],
  '#0086FF': ['#CCE7FF', '#99CFFF', '#4DAAFF', '#0086FF', '#006BCC', '#003666'],
  '#15CA52': ['#D0F4DC', '#A1EABA', '#5BDA86', '#15CA52', '#11A242', '#085121'],
  '#FF880F': ['#FFE7CF', '#FFCF9F', '#FFAB58', '#FF880F', '#CC6C0D', '#663606'],
  '#8958E5': ['#E7DEFA', '#D0BCF5', '#AC8AED', '#8958E5', '#6E46B7', '#37235C'],
  '#E53385': ['#FAD6E7', '#F5ADCE', '#ED70AA', '#E53385', '#B7296A', '#5C1435'],
  '#F35D4B': ['#FCDFDB', '#FABEB7', '#F68E81', '#F35D4B', '#C24A3C', '#61251E'],
  '#456FF3': ['#DAE2FC', '#B5C5FA', '#7D9AF6', '#456FF3', '#3759C2', '#1C2C61']
}
const selectedColor = ref('transparent')
const selectedColorGradient = ref('transparent')
const colorWrap = ref()
const colorGradientWrap = ref()
const checkIconColor = computed(() => selectedColor.value === '#ffffff' ? '#8A8F8D' : '#fff')

function handleClickColor(value: string, e: Event) {
  selectedColor.value = value
  // 选择默认色彩梯度
  if (value === '#262626') {
    selectedColorGradient.value = colorGradient[value][4];
  } else if (value === '#ffffff') {
    selectedColorGradient.value = colorGradient[value][0];
  } else if (value === 'transparent') {
    selectedColorGradient.value = 'transparent';
  } else {
    selectedColorGradient.value = colorGradient[value][3];
  }
  emit('colorSelectChange', selectedColorGradient.value)
}

function handleClickColorGrdient(idx: number) {
  if (selectedColor.value === 'transparent') {
    selectedColor.value = '#262626'
  }
  selectedColorGradient.value = colorGradient[selectedColor.value][idx];
  emit('colorSelectChange', selectedColorGradient.value)
}
</script>

<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" title="主题配色">
      <div class="mb mt0.4 ml0.5" ref="colorWrap">
        <div class="flex mb2.5">
          <div class="w5.5 h5.5 rd-2.75 mr2.5 cursor-pointer relative color-panel-item-clear"
            @click="handleClickColor('transparent', $event)">
            <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="画板" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path
                  d="M11,0 C17.0751322,0 22,4.92486775 22,11 C22,17.0751322 17.0751322,22 11,22 C4.92486775,22 0,17.0751322 0,11 C0,4.92486775 4.92486775,0 11,0 Z M18.3946074,4.26790206 L4.35813667,18.4758142 C6.12432994,20.0461195 8.45076961,21 11,21 C16.5228475,21 21,16.5228475 21,11 C21,8.4071184 20.0131727,6.04472267 18.3946074,4.26790206 Z M11,1 C5.4771525,1 1,5.4771525 1,11 C1,13.6137372 2.00276603,15.9932658 3.64457137,17.7748591 L17.6861018,3.56375204 C15.9146055,1.96991792 13.570571,1 11,1 Z"
                  id="形状" fill="currentColor" fill-rule="nonzero"></path>
              </g>
            </svg>
          </div>
          <div v-for="(item, idx) in colorThemePanel[0]" :key="idx"
            class="w5.5 h5.5 rd-2.75 mr2.5 cursor-pointer relative color-panel-item" :style="{ backgroundColor: item }"
            @click="handleClickColor(item, $event)" :class="{ 'color-panel-item-active': selectedColor === item }">
          </div>
        </div>
        <div class="flex">
          <div v-for="(item, idx) in colorThemePanel[1]" :key="idx"
            class="w5.5 h5.5 rd-2.75 mr2.5 cursor-pointer relative color-panel-item" :style="{ backgroundColor: item }"
            @click="handleClickColor(item, $event)" :class="{ 'color-panel-item-active': selectedColor === item }">
          </div>
        </div>
      </div>
      <div class="mb">
        颜色梯度
      </div>
      <div class="flex mb ml0.5" ref="colorGradientWrap">
        <div v-for="(item, idx) in  colorGradient[selectedColor] " :key="idx" :style="{ backgroundColor: item }"
          class="w5.5 h5.5 mr2.5 cursor-pointer rd-2.75 relative color-panel-item" @click="handleClickColorGrdient(idx)">
          <icon-check v-if="selectedColor !== 'transparent' && selectedColorGradient === item" class="icon-check-pos"
            :style="{ color: checkIconColor }"></icon-check>
        </div>
      </div>
      <div class="mb">
        自定义颜色
      </div>
      <div class="cursor-pointer w5.5">
        <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>编组 3</title>
          <defs>
            <pattern id="pattern-1" width="100%" height="100%" patternUnits="objectBoundingBox">
              <use xlink:href="#image-2"></use>
            </pattern>
            <image id="image-2" width="22" height="22"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAAD1UlEQVQ4EV2US5IcNRRFn5Tf+tNtYxwBEwgGrIAh4bn3wyLYCWNmTAiW4GAAE0ZAYBoauz9VlZWZkjhXmdVtnNGvpcqUjq7ue5L78v6T1CYzxYJYEitFNNvQbmi3tFu17/TP39Z8cweztHeWDsRRYVaenD08nl5BlAyueT/QjrSRlj/T0IJOSVvR1oQb+NYBU8xQ9Uv6eRJj80TBS97VtA3tyORAn+bx+wzVmAk2qZRS/bYzmB0+wLNqvlW8E3gQnDiDs1p9I1zHbgR7zwrjfTnE0oIfTXCFHg9IAIFl1Ug/0ebdsEJDKCfZ13vUnmP22E7M993GUnmyQ3204JIl0SF4Wvm8JHpCdgis7SvJ6Z64A3o7xzl52DCDtxmcxtp64COLBCbqkWpBNFZgJU5Kl/yIb73FN0BpM3zPQgxUWM/c4gi4GCb4sLBYH+ymvbNRknmU+R1d+ayFVH7p2ln8m/gH6FtgskI2YIG8S1RK6Y8fsMcReA+8N191Fk9rOy5u7c/mTmxTrR5RKfUbkjX+jto/iGvAskNQEibPBFVSyuIA2AVLnih4g/qIHWl/sAD8t+1rRp3sUz5dSvnPhQUiXgGWvyqvWWX2S54F6lhgUgb8HJEKgMAisijWn9tfmyv7/vlP9vWPhZ2+q7GBNOowSN0MSkzPZaWWKP3hgo6j+FlZNZWYFAtzilCb7xdW3D2zp6++sv2331gMPzDzX2ayBRU7xjsPSSXD9HOgGHD0E4iaNmBubDLQH3dW3j63J68/spe/vAHwIs9P8VdL4RpfKAVOQ1IZ5GpH/rzI5DFAFyqAQIcW6Mo81VLcP7WLm4V9cXW0D/cotEsUfcYCdNOKfzdAVdA5c/zGm8g4gqrY5S3/D9qtTTvZ7b19fNPbs/1giyFaV3lr+yfA9ubkGsfFpZbFDvQFp97mspjAKPUodcPS/GlSu+tiVnl5HG1zClZxagbOeuukdAegn+GqbnabdCapJidbeqqi2wJsiAUWLK04LTPoAuCum6BSW5D2oEvEEGBrAChM4wRXwt15AZ2SSnfFOvsqcNU3tuqDbbsAPNqaWAJtuDs94Kj967ZwbD8t6ave4iNct7kWSCVXL6dMNlRDASRk2KoHyAKLMQCNVnHTK9lR3Hyw8RbleduofoRrgNR7FLP9mkt3ASADgWsB/ZbSGm8LwDo/KvOIHT5SwA77UsM7VCedEsbwPWkQ8LIB2gKRj62CfgswQ+kraRNY59NxWgFn1TodSpiu/En1u/DyAZqBE7SmX4fJghK1ui6lQ2ICO62CEqWQJdyMDnC+yLkKZuX/AbGnTbHOz/X+AAAAAElFTkSuQmCC">
            </image>
          </defs>
          <g id="fd" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="色板+取色器" transform="translate(-734.000000, -262.000000)">
              <g id="编组-3" transform="translate(734.000000, 262.000000)">
                <g id="编组-4" fill="url(#pattern-1)">
                  <path
                    d="M11,0 C17.0751322,0 22,4.92486775 22,11 C22,17.0751322 17.0751322,22 11,22 C4.92486775,22 0,17.0751322 0,11 C0,4.92486775 4.92486775,0 11,0 Z M11,3 C6.581722,3 3,6.581722 3,11 C3,15.418278 6.581722,19 11,19 C15.418278,19 19,15.418278 19,11 C19,6.581722 15.418278,3 11,3 Z"
                    id="形状结合"></path>
                </g>
                <g id="1.line/2.功能类/更多-无框" transform="translate(5.000000, 5.000000)" fill="currentColor"
                  fill-rule="nonzero">
                  <g id="more" transform="translate(0.000000, 0.000000)">
                    <rect id="矩形" opacity="0" x="0" y="0" width="12" height="12"></rect>
                    <path
                      d="M10.641,6 C10.641,5.48223305 10.221267,5.0625 9.7035,5.0625 C9.18573305,5.0625 8.766,5.48223305 8.766,6 C8.766,6.51776695 9.18573305,6.9375 9.7035,6.9375 C10.221267,6.9375 10.641,6.51776695 10.641,6 Z M6.9375,6 C6.9375,5.48223305 6.51776695,5.0625 6,5.0625 C5.48223305,5.0625 5.0625,5.48223305 5.0625,6 C5.0625,6.51776695 5.48223305,6.9375 6,6.9375 C6.51776695,6.9375 6.9375,6.51776695 6.9375,6 Z M3.23475,6 C3.23475,5.48223305 2.81501695,5.0625 2.29725,5.0625 C1.77948305,5.0625 1.35975,5.48223305 1.35975,6 C1.35975,6.51776695 1.77948305,6.9375 2.29725,6.9375 C2.81501695,6.9375 3.23475,6.51776695 3.23475,6 Z"
                      id="形状"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" title="默认配色">
      <div class="mb mt0.4 ml0.5" ref="colorWrap">
        <div class="flex mb2.5">
          <div class="w5.5 h5.5 rd-2.75 mr2.5 cursor-pointer relative color-panel-item-clear"
            @click="handleClickColor('transparent', $event)">
            <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>画板</title>
              <g id="画板" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path
                  d="M11,0 C17.0751322,0 22,4.92486775 22,11 C22,17.0751322 17.0751322,22 11,22 C4.92486775,22 0,17.0751322 0,11 C0,4.92486775 4.92486775,0 11,0 Z M18.3946074,4.26790206 L4.35813667,18.4758142 C6.12432994,20.0461195 8.45076961,21 11,21 C16.5228475,21 21,16.5228475 21,11 C21,8.4071184 20.0131727,6.04472267 18.3946074,4.26790206 Z M11,1 C5.4771525,1 1,5.4771525 1,11 C1,13.6137372 2.00276603,15.9932658 3.64457137,17.7748591 L17.6861018,3.56375204 C15.9146055,1.96991792 13.570571,1 11,1 Z"
                  id="形状" fill="currentColor" fill-rule="nonzero"></path>
              </g>
            </svg>
          </div>
          <div v-for="(item, idx) in colorThemePanel[0]" :key="idx"
            class="w5.5 h5.5 rd-2.75 mr2.5 cursor-pointer relative color-panel-item" :style="{ backgroundColor: item }"
            @click="handleClickColor(item, $event)">
          </div>
        </div>
        <div class="flex">
          <div v-for="(item, idx) in colorThemePanel[1]" :key="idx"
            class="w5.5 h5.5 rd-2.75 mr2.5 cursor-pointer relative color-panel-item" :style="{ backgroundColor: item }"
            @click="handleClickColor(item, $event)">
          </div>
        </div>
      </div>
      <div class="mb">
        颜色梯度
      </div>
      <div class="flex mb ml0.5" ref="colorGradientWrap">
        <div v-for="(item, idx) in  colorGradient[selectedColor] " :key="idx" :style="{ backgroundColor: item }"
          class="w5.5 h5.5 mr2.5 cursor-pointer rd-2.75 relative color-panel-item" @click="handleClickColorGrdient(idx)">
          <icon-check v-if="selectedColor !== 'transparent' && selectedColorGradient === item" class="icon-check-pos"
            :style="{ color: checkIconColor }"></icon-check>
        </div>
      </div>
      <div class="mb">
        自定义颜色
      </div>
      <div class="cursor-pointer w5.5">
        <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>编组 3</title>
          <defs>
            <pattern id="pattern-1" width="100%" height="100%" patternUnits="objectBoundingBox">
              <use xlink:href="#image-2"></use>
            </pattern>
            <image id="image-2" width="22" height="22"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAAD1UlEQVQ4EV2US5IcNRRFn5Tf+tNtYxwBEwgGrIAh4bn3wyLYCWNmTAiW4GAAE0ZAYBoauz9VlZWZkjhXmdVtnNGvpcqUjq7ue5L78v6T1CYzxYJYEitFNNvQbmi3tFu17/TP39Z8cweztHeWDsRRYVaenD08nl5BlAyueT/QjrSRlj/T0IJOSVvR1oQb+NYBU8xQ9Uv6eRJj80TBS97VtA3tyORAn+bx+wzVmAk2qZRS/bYzmB0+wLNqvlW8E3gQnDiDs1p9I1zHbgR7zwrjfTnE0oIfTXCFHg9IAIFl1Ug/0ebdsEJDKCfZ13vUnmP22E7M993GUnmyQ3204JIl0SF4Wvm8JHpCdgis7SvJ6Z64A3o7xzl52DCDtxmcxtp64COLBCbqkWpBNFZgJU5Kl/yIb73FN0BpM3zPQgxUWM/c4gi4GCb4sLBYH+ymvbNRknmU+R1d+ayFVH7p2ln8m/gH6FtgskI2YIG8S1RK6Y8fsMcReA+8N191Fk9rOy5u7c/mTmxTrR5RKfUbkjX+jto/iGvAskNQEibPBFVSyuIA2AVLnih4g/qIHWl/sAD8t+1rRp3sUz5dSvnPhQUiXgGWvyqvWWX2S54F6lhgUgb8HJEKgMAisijWn9tfmyv7/vlP9vWPhZ2+q7GBNOowSN0MSkzPZaWWKP3hgo6j+FlZNZWYFAtzilCb7xdW3D2zp6++sv2331gMPzDzX2ayBRU7xjsPSSXD9HOgGHD0E4iaNmBubDLQH3dW3j63J68/spe/vAHwIs9P8VdL4RpfKAVOQ1IZ5GpH/rzI5DFAFyqAQIcW6Mo81VLcP7WLm4V9cXW0D/cotEsUfcYCdNOKfzdAVdA5c/zGm8g4gqrY5S3/D9qtTTvZ7b19fNPbs/1giyFaV3lr+yfA9ubkGsfFpZbFDvQFp97mspjAKPUodcPS/GlSu+tiVnl5HG1zClZxagbOeuukdAegn+GqbnabdCapJidbeqqi2wJsiAUWLK04LTPoAuCum6BSW5D2oEvEEGBrAChM4wRXwt15AZ2SSnfFOvsqcNU3tuqDbbsAPNqaWAJtuDs94Kj967ZwbD8t6ave4iNct7kWSCVXL6dMNlRDASRk2KoHyAKLMQCNVnHTK9lR3Hyw8RbleduofoRrgNR7FLP9mkt3ASADgWsB/ZbSGm8LwDo/KvOIHT5SwA77UsM7VCedEsbwPWkQ8LIB2gKRj62CfgswQ+kraRNY59NxWgFn1TodSpiu/En1u/DyAZqBE7SmX4fJghK1ui6lQ2ICO62CEqWQJdyMDnC+yLkKZuX/AbGnTbHOz/X+AAAAAElFTkSuQmCC">
            </image>
          </defs>
          <g id="fd" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="色板+取色器" transform="translate(-734.000000, -262.000000)">
              <g id="编组-3" transform="translate(734.000000, 262.000000)">
                <g id="编组-4" fill="url(#pattern-1)">
                  <path
                    d="M11,0 C17.0751322,0 22,4.92486775 22,11 C22,17.0751322 17.0751322,22 11,22 C4.92486775,22 0,17.0751322 0,11 C0,4.92486775 4.92486775,0 11,0 Z M11,3 C6.581722,3 3,6.581722 3,11 C3,15.418278 6.581722,19 11,19 C15.418278,19 19,15.418278 19,11 C19,6.581722 15.418278,3 11,3 Z"
                    id="形状结合"></path>
                </g>
                <g id="1.line/2.功能类/更多-无框" transform="translate(5.000000, 5.000000)" fill="currentColor"
                  fill-rule="nonzero">
                  <g id="more" transform="translate(0.000000, 0.000000)">
                    <rect id="矩形" opacity="0" x="0" y="0" width="12" height="12"></rect>
                    <path
                      d="M10.641,6 C10.641,5.48223305 10.221267,5.0625 9.7035,5.0625 C9.18573305,5.0625 8.766,5.48223305 8.766,6 C8.766,6.51776695 9.18573305,6.9375 9.7035,6.9375 C10.221267,6.9375 10.641,6.51776695 10.641,6 Z M6.9375,6 C6.9375,5.48223305 6.51776695,5.0625 6,5.0625 C5.48223305,5.0625 5.0625,5.48223305 5.0625,6 C5.0625,6.51776695 5.48223305,6.9375 6,6.9375 C6.51776695,6.9375 6.9375,6.51776695 6.9375,6 Z M3.23475,6 C3.23475,5.48223305 2.81501695,5.0625 2.29725,5.0625 C1.77948305,5.0625 1.35975,5.48223305 1.35975,6 C1.35975,6.51776695 1.77948305,6.9375 2.29725,6.9375 C2.81501695,6.9375 3.23475,6.51776695 3.23475,6 Z"
                      id="形状"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </a-tab-pane>

  </a-tabs>
</template>

<style lang="less" scoped>
.color-panel-item-clear {
  color: #e7e9e8;
}

.color-panel-item {
  box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.3);
}

.color-panel-item:hover::after,
.color-panel-item-active::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #BEC0BF;
}

.icon-check-pos {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
