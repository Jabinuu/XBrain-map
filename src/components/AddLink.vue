<script setup lang="ts">
import bus from '@/utils/bus';
const linkForm = ref({
  text: '',
  link: ''
})
const allowSubmit = computed(() => {
  const { text, link } = linkForm.value
  return text !== '' && link !== ''
})

function handleSubmit(data: any) {
  console.log(data.values);
}

function handleClickCancel() {
  bus.emit('show_link', false)
}
</script>

<template>
  <div class="fixed top-20 left-20 b-rd-1.5 bg-white p4 pb-0">
    <a-form :model="linkForm" @submit="handleSubmit" class="w80" layout="vertical">
      <a-form-item field="文本" label="文本">
        <a-input v-model="linkForm.text" placeholder="添加描述" />
      </a-form-item>
      <a-form-item field="链接" label="链接">
        <a-input v-model="linkForm.link" placeholder="链接地址" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" class="mr" :disabled="!allowSubmit">确定</a-button>
        <a-button @click="handleClickCancel">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped></style>
