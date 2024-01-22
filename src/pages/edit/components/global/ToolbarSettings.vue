<script setup lang="ts">
import IconBtn from '@/components/IconBtn.vue';
import { IconBrush, IconSettings } from '@arco-design/web-vue/es/icon';
import bus from '@/utils/bus';
import { inject } from 'vue';

const showSidebar = inject('_showSidebar')
const hasTooltip = ref<boolean | undefined>(undefined)

function onlickSettings() {
  hasTooltip.value = undefined
  bus.emit('sidebarVisibleChange', true)
}

</script>

<template>
  <div class="flex justify-between flex-items-center bg-white rd-8 pl1 pr1 toolbar-border-shadow">
    <icon-btn>
      <template #icon>
        <icon-brush class="w4 h4 icon-black" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">更换主题</p>
      </template>
    </icon-btn>

    <div v-if="!showSidebar">
      <icon-btn @click="onlickSettings" :has-tooltip="hasTooltip">
        <template #icon>
          <icon-settings class="w4 h4 icon-black" />
        </template>
        <template #tooltipContent>
          <p class="text-center fs-0.9">打开设置</p>
        </template>
      </icon-btn>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
