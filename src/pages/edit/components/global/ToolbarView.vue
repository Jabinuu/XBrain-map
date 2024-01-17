<script setup lang="ts">
import IconBtn from '@/components/IconBtn.vue';
import { IconDragArrow, IconFullscreenExit, IconMinus, IconPlus } from '@arco-design/web-vue/es/icon';

const viewScale = ['20%', '50%', '75%', '100%', '150%', '200%', '300%', '400%']
</script>

<template>
  <div class="flex justify-between flex-items-center bg-white rd-8 p1 toolbar-border-shadow">
    <icon-btn>
      <template #icon>
        <icon-drag-arrow class="w4 h4 icon-black" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">拖拽</p>
        <p>Space</p>
      </template>
    </icon-btn>

    <a-divider direction="vertical" :margin="8"></a-divider>

    <icon-btn>
      <template #icon>
        <icon-fullscreen-exit class="w4 h4 icon-black" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">适应画布</p>
        <p>Ctrl+Space</p>
      </template>
    </icon-btn>

    <a-divider direction="vertical" :margin="8"></a-divider>

    <div>
      <icon-btn>
        <template #icon>
          <icon-minus class="w3.5 h3.5 icon-black" />
        </template>

      </icon-btn>

      <a-dropdown position="bottom" :popup-style="{ width: '90px' }">
        <a-button class="scale-btn" type="text">100%</a-button>
        <template #content>
          <a-doption v-for="( item, idx ) in  viewScale " :key="idx" class="fs-1">
            {{ item }}
          </a-doption>
        </template>
      </a-dropdown>

      <icon-btn>
        <template #icon>
          <icon-plus class="w3.5 h3.5 icon-black" />
        </template>

      </icon-btn>
    </div>
  </div>
</template>

<style lang="less" scoped>
.scale-btn {
  color: #262626;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 13px;
}

.scale-btn:hover,
.scale-btn:active {
  color: #262626;
  background-color: #fff;
}
</style>
