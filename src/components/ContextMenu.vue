<script setup lang="ts">
defineProps(['menuList'])

let childItemList = ref('')

function onMouseEnter(item: any) {
  if (!item.children || item.children.length === 0) return
  childItemList.value = item.key
  console.log(childItemList.value);

}
</script>

<template>
  <div class="w46 bg-white context-menu-wrap border-rd-2 pt2 pb2" @mousedown.stop>
    <div v-for="item in menuList" :key="item.key" @click="item.action" @mouseenter="onMouseEnter(item)"
      class="transition-400 relative h8 line-height-8 pl4 pr4 cursor-pointer hover:bg-hover relative"
      @mouseleave="childItemList = ''">
      {{ item.text }}
      <span v-if="item.children && item.children.length">></span>

      <!-- subMenu -->
      <div v-if="childItemList === item.key" class="absolute" :style="{ left: '184px', top: 0 }">
        <div class="ml1 w46 bg-white rd context-menu-wrap pt2 pb2">
          <div v-for="child in item.children" :key="child.key"
            class="transition-400 relative h8 line-height-8 pl4 pr4 cursor-pointer hover:bg-hover relative"
            @click.stop="child.action">
            {{ child.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.context-menu-wrap {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.13);
}
</style>
