<script setup lang="ts">
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

</script>

<template>
  <div class="pb-0">
    <a-form :model="linkForm" @submit="handleSubmit" class="w80" layout="vertical">
      <a-form-item field="文本" label="文本">
        <a-input v-model="linkForm.text" placeholder="添加描述" />
      </a-form-item>
      <a-form-item field="链接" label="链接">
        <a-input v-model="linkForm.link" placeholder="链接地址" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" :disabled="!allowSubmit">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped></style>
