<script setup lang="ts">

import { IconUnorderedList, IconTags, IconAttachment, IconSettings } from '@arco-design/web-vue/es/icon';


</script>

<template>
  <div id="node-toolbar-wrap" class="absolute">
    <a-card class="mb rd-8 card-shawdow">
      <div class="flex flex-items-center h8">
        <a-tooltip mini :arrow-style="{ width: 0 }" backgroundColor="rgba(0,0,0,0.7)">
          <template #content>
            结构
          </template>
          <div class="layout-btn w12 h8 rd"></div>
        </a-tooltip>
        <icon-btn>
          <template #icon>
            <icon-unordered-list class="w4.5 h4.5 icon-black" />
          </template>
          <template #tooltipContent>
            分支
          </template>
        </icon-btn>

        <a-divider direction="vertical" class="ml1 mr1 h5"></a-divider>

        <a-tooltip mini :arrow-style="{ width: 0 }" backgroundColor="rgba(0,0,0,0.7)">
          <template #content>
            节点形状
          </template>
          <div class="node-shape-btn-wrap w8 h8 rd p1 pl2 pr2">
            <div class="node-shape-btn h6">
            </div>
          </div>
        </a-tooltip>

        <icon-btn :hasTooltip="undefined">
          <template #icon>
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
          </template>
          <template #tooltipContent>填充色</template>
        </icon-btn>

        <icon-btn :hasTooltip="undefined">
          <template #icon>
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
              <title>编组 10</title>
              <g id="控件" stroke="none" fill="none" fill-rule="evenodd">
                <g id="Z图标/2.编辑器/2.格式/描边" transform="translate(-6.000000, -8.000000)">
                  <g id="编组-10" transform="translate(6.000000, 8.000000)">
                    <circle id="椭圆形" stroke="#69B1E4" fill="none" cx="8" cy="8" r="6.5" stroke-width="3"></circle>
                  </g>
                  <g id="编组-11" transform="translate(6.000000, 8.000000)">
                    <circle id="椭圆形2" stroke="#69B1E4" fill="none" cx="8" cy="8" r="6.5" stroke-width="1"></circle>
                  </g>
                </g>
              </g>
            </svg>
          </template>
          <template #tooltipContent>节点描边</template>
        </icon-btn>

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

        <icon-btn>
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
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/af8bdfa5-f0ae-446b-836e-1d0340d2f5c6.svg);
  background-repeat: no-repeat;
  background-position: center;
}

.node-shape-btn {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/3818284f-32e3-44cb-875c-1b722074ddaa.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.layout-btn:hover,
.node-shape-btn-wrap:hover {
  background-color: rgb(242, 243, 245)
}

:deep(.arco-card-body) {
  padding: 4px;
}
</style>
