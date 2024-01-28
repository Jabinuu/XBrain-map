<script setup lang="ts">
import { IconCustomerService, IconCommand, IconMinusCircle } from '@arco-design/web-vue/es/icon';

const minusIcon = ref()
const rightPos = ref('20px')
let isMinimized = false
const shortcutVisible = ref(false)

function handleMouseEvent(type: 'enter' | 'leave') {
  if (type === 'enter') {
    (minusIcon.value as HTMLElement).classList.remove('hidden-minus');
    (minusIcon.value as HTMLElement).classList.add('show-minus')
  } else {
    (minusIcon.value as HTMLElement).classList.add('hidden-minus');
    (minusIcon.value as HTMLElement).classList.remove('show-minus')
  }
}

function minimizePrompt() {
  rightPos.value = '-20px'
  isMinimized = true
}

function handleClickWrap() {
  if (!isMinimized) return
  isMinimized = false
  rightPos.value = '20px'
}

</script>

<template>
  <div @mouseenter="handleMouseEvent('enter')" @mouseleave="handleMouseEvent('leave')" class="fixed bottom-12.5 z-100"
    :style="{ right: rightPos }">
    <div class="flex flex-col justify-between h27" @click="handleClickWrap">
      <div class="w11 h11 round bg-white  flex justify-center flex-items-center btn-shadow"
        @click="shortcutVisible = true">
        <icon-btn>
          <template #icon>
            <icon-command class="w5 h5 icon-black" />
          </template>
          <template #tooltipContent>
            <p>快捷键</p>
          </template>
        </icon-btn>
      </div>
      <div class="w11 h11 round bg-white flex justify-center flex-items-center btn-shadow">
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
    <div ref="minusIcon" class="hidden-minus absolute right--5.5 top--3.5" @click="minimizePrompt">
      <icon-minus-circle class="w5.5 h5.5 opacity-80 minus-color" />
    </div>
  </div>

  <a-drawer :width="340" :visible="shortcutVisible" @cancel="shortcutVisible = false" unmountOnClose :mask="false"
    :footer="false"
    :drawerStyle="{ boxShadow: '-6px 0 16px -8px rgba(0,0,0,.08), -9px 0 28px 0 rgba(0,0,0,.05), -12px 0 48px 16px rgba(0,0,0,.03)' }">
    <template #title>
      快捷键
    </template>
    <div>
      <h3>插入</h3>
      <div></div>
    </div>
  </a-drawer>
</template>

<style lang="less" scoped>
:deep(.arco-btn-size-medium.arco-btn-only-icon:hover) {
  background: #fff;
}

.btn-shadow {
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, .13), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 12px 24px 16px rgba(0, 0, 0, .04);
}

.minus-color {
  cursor: pointer;
  color: rgb(127, 129, 128);
}

.hidden-minus {
  transform: scale(0);
  transition: all .3s;
}

.show-minus {
  transform: scale(1);
  transition: all .3s;
}
</style>
