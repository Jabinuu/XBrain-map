<script setup lang="ts">
import { IconCustomerService, IconCommand } from '@arco-design/web-vue/es/icon';
</script>

<template>
  <div class="flex flex-col justify-between h24">
    <div class="w11 h11 round bg-white  flex justify-center flex-items-center">
      <icon-btn>
        <template #icon>
          <icon-command class="w5 h5 icon-black  " />
        </template>
        <template #tooltipContent>
          <p>快捷键</p>
        </template>
      </icon-btn>
    </div>

    <div class="w11 h11 round bg-white flex justify-center flex-items-center">
      <icon-btn class="no-color">
        <template #icon>
          <icon-customer-service class="w5 h5 icon-black  " />
        </template>
        <template #tooltipContent>
          <p>联系我</p>
        </template>
      </icon-btn>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-btn-size-medium.arco-btn-only-icon:hover) {
  background: #fff;
}
</style>
