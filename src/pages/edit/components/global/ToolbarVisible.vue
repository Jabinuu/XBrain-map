<script setup lang="ts">
import IconBtn from '@/components/IconBtn.vue';
import { IconDoubleRight } from '@arco-design/web-vue/es/icon';
</script>

<template>
  <div class='bg-white flex flex-items-center rd-8 pl1 pr1 toolbar-border-shadow'>
    <icon-btn>
      <template #icon>
        <icon-double-right class="w4 h4 icon-black" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">隐藏工具栏</p>
        <p class="text-center fs-0.9">Ctrl+.</p>
      </template>
    </icon-btn>
  </div>
</template>

<style lang="less" scoped></style>
