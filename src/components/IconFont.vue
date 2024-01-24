<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';
const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4422272_51qwpgpbcvt.js?spm=a313x.manage_type_myprojects.i1.10.23c73a81wDzUbu&file=font_4422272_51qwpgpbcvt.js' });
defineProps(['type', 'size'])
</script>
<template>
  <icon-font :type="type" :size="size"></icon-font>
</template>
<style lang="less" scoped></style>
