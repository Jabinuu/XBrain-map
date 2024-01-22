<script setup lang="ts">

const itemWrap = ref()
const selectLayout = ref('standard-r')

function handleSelectLayout(e: Event) {
  const arr = Array.from((itemWrap.value as HTMLElement).children)
  arr.forEach((child) => {
    child.classList.remove('bg-select')
  });

  (e.target as HTMLElement).classList.add('bg-select')
}

function handleShowDropdown(visible: boolean) {
  if (!visible) return
  nextTick(() => {
    const arr = Array.from((itemWrap.value as HTMLElement).children)
    arr.forEach((child) => {
      if (child.classList.contains(selectLayout.value)) {
        child.classList.add('bg-select')
      }
    });
  })
}

function handleSelect(value: any) {
  selectLayout.value = value
}
</script>

<template>
  <a-dropdown position="br" @select="handleSelect" @popup-visible-change="handleShowDropdown">
    <div class="w22 h8 rd border current-layout cursor-pointer" :class="selectLayout" />
    <template #content>
      <div class="flex w42 flex-wrap pl2.75 pr2.75 layout-select" ref="itemWrap">
        <a-doption class="standard-r rd" @click="handleSelectLayout" value="standard-r">
        </a-doption>
        <a-doption class="indent-br rd" @click="handleSelectLayout" value="indent-br">
        </a-doption>
        <a-doption class="indent-tr rd" @click="handleSelectLayout" value="indent-tr">
        </a-doption>
        <a-doption class="timeline-r rd" @click="handleSelectLayout" value="timeline-r">
        </a-doption>
      </div>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped>
.current-layout {
  background-repeat: no-repeat;
  background-position: center;
  transition: all .1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.layout-select>li {
  width: 48px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
}

.arco-btn-secondary {
  display: block;
  width: 100%;
  border: 1px solid #e7e9e8;
  background-color: #fff;
}

.standard-r {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/af8bdfa5-f0ae-446b-836e-1d0340d2f5c6.svg);
}

.indent-br {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/103fb753-229b-4717-9e49-356f013b3309.svg);
}

.indent-tr {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/15763057-474a-4b44-a999-3058a5328e9a.svg);
}

.timeline-r {
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/56c34bb7-b888-4103-bc03-3124cd7b99a3.svg);
}
</style>
