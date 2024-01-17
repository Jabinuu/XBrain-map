<script setup lang="ts">
import ToolbarSettings from './ToolbarSettings.vue';
import ToolbarView from './ToolbarView.vue';
import ToolbarVisible from './ToolbarVisible.vue'
</script>

<template>
  <div class="flex justify-between w90 ">
    <toolbar-view></toolbar-view>
    <toolbar-settings></toolbar-settings>
    <toolbar-visible></toolbar-visible>

  </div>
</template>

<style lang="less" scoped></style>
