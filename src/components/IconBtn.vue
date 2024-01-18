<script setup lang="ts">
defineProps({
  hasTooltip: {
    type: Boolean,
    default: undefined
  }
})
</script>

<template>
  <a-tooltip mini background-color="rgba(0,0,0,0.7)" :popup-visible="hasTooltip" :arrow-style="{ width: 0 }">
    <a-button type="text">
      <template #icon>
        <slot name="icon"></slot>
      </template>

    </a-button>
    <template #content>
      <slot name="tooltipContent"></slot>
    </template>
  </a-tooltip>
</template>

<style lang="less" scoped></style>
