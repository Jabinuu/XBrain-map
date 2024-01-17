<script setup lang="ts">
import TooltipBtn from '@/components/TooltipBtn.vue';
import { IconSave, IconUndo, IconRedo } from '@arco-design/web-vue/es/icon'

</script>

<template>
  <div class="toolbar-top-left-wrap">
    <tooltip-btn>
      <template #btnContent>
        <icon-save class="icon" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">保存</p>
        <p>ctrl+s</p>
      </template>
    </tooltip-btn>


    <a-divider direction="vertical" :margin="8" />

    <tooltip-btn>
      <template #btnContent>
        <icon-undo class="icon" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">撤销</p>
        <p>ctrl+z</p>
      </template>
    </tooltip-btn>

    <tooltip-btn>
      <template #btnContent>
        <icon-redo class="icon" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">重做</p>
        <p>ctrl+y</p>
      </template>
    </tooltip-btn>


  </div>
</template>

<style lang="less" scoped>
.toolbar-top-left-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  padding: 4px;
  border-radius: 6px;
  background-color: #fff;
}
</style>
