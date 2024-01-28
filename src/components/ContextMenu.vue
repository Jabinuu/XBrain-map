<script setup lang="ts">
defineProps(['menuList'])

let childItemList = ref('')

function onMouseEnter(item: any) {
  if (!item.children || item.children.length === 0) return
  childItemList.value = item.key
}
</script>

<template>
  <div class="w40 h65 bg-pink">
    <div v-for="item in menuList" :key="item.key" @click="item.action" @mouseenter="onMouseEnter(item)" class="relative"
      @mouseleave="childItemList = ''">
      {{ item.text }}
      <span v-if="item.children && item.children.length">></span>

      <div v-if="childItemList === item.key" :style="{ left: '160px', top: 0 }" class="absolute">
        <div v-for="child in item.children" :key="child.key" class="w40 bg-pink" @click.stop="child.action">
          {{ child.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
