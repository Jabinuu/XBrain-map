<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';
const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4422272_evq52frv8ye.js?spm=a313x.manage_type_myprojects.i1.10.23c73a818oxsn4&file=font_4422272_evq52frv8ye.js' });
defineProps(['type', 'size'])
</script>
<template>
  <icon-font :type="type" :size="size"></icon-font>
</template>
<style lang="less" scoped></style>
