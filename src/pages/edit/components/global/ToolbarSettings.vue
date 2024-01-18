<script setup lang="ts">
import IconBtn from '@/components/IconBtn.vue';
import { IconBrush, IconSettings } from '@arco-design/web-vue/es/icon';
import Sidebar from '../sidebar/Sidebar.vue';
import { ref } from 'vue';

const showSidebar = ref(false)

</script>

<template>
  <div class="flex justify-between flex-items-center bg-white rd-8 pl1 pr1 toolbar-border-shadow">
    <a-space>
      <icon-btn>
        <template #icon>
          <icon-brush class="w4 h4 icon-black" />
        </template>
        <template #tooltipContent>
          <p class="text-center fs-0.9">更换主题</p>
        </template>
      </icon-btn>

      <icon-btn @click="showSidebar = !showSidebar">
        <template #icon>
          <icon-settings class="w4 h4 icon-black" />
        </template>
        <template #tooltipContent>
          <p class="text-center fs-0.9">打开设置</p>
        </template>
      </icon-btn>
    </a-space>
  </div>
  <Sidebar :isVisible="showSidebar" @visibleChange="showSidebar = false"></Sidebar>
</template>

<style lang="less" scoped></style>
