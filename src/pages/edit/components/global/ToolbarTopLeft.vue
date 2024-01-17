<script setup lang="ts">
import IconBtn from '@/components/IconBtn.vue';
import { IconSave, IconUndo, IconRedo } from '@arco-design/web-vue/es/icon'

</script>

<template>
  <div class="toolbar-top-left-wrap rd-8 toolbar-border-shadow">
    <icon-btn>
      <template #icon>
        <icon-save class="w4.5 h4.5 icon-black" />
      </template>
      <template #tooltipContent>
        <p class="text-center fs-0.9">保存</p>
        <p>Ctrl+S</p>
      </template>
    </icon-btn>


    <a-divider direction="vertical" :margin="8" />

    <a-space>
      <icon-btn>
        <template #icon>
          <icon-undo class="w4.5 h4.5 icon-black" />
        </template>
        <template #tooltipContent>
          <p class="text-center fs-0.9">撤销</p>
          <p>Ctrl+Z</p>
        </template>
      </icon-btn>

      <icon-btn>
        <template #icon>
          <icon-redo class="w4.5 h4.5 icon-black" />
        </template>
        <template #tooltipContent>
          <p class="text-center fs-0.9">重做</p>
          <p>Ctrl+Y</p>
        </template>
      </icon-btn>
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.toolbar-top-left-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  background-color: #fff;
}
</style>
