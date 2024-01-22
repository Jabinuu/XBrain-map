<script setup lang="ts">
import { IconDown } from '@arco-design/web-vue/es/icon';

const selectedShape = ref('rectangle')
const handleSelect = (value: any) => {
  selectedShape.value = value
}
</script>

<template>
  <a-dropdown @select="handleSelect" :popup-max-height="false">
    <a-button :style="{ width: '88px', padding: '0px', 'text-align': 'none' }">
      <div class="flex flex-items-center ">
        <div :class="selectedShape" class="select-transition"></div>
        <icon-down :size="18" class="mr2" />
      </div>
    </a-button>
    <template #content>
      <a-doption class="line" value="line"></a-doption>
      <a-doption class="capsule" value="capsule"></a-doption>
      <a-doption class="rectangle" value="rectangle"></a-doption>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped>
.arco-btn-secondary {
  display: block;
  width: 100%;
  border: 1px solid #e7e9e8;
  background-color: #fff;
}

.line {
  width: 92px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('https://gw.alipayobjects.com/zos/bmw-prod/6ffe619f-04e8-48c7-af45-5f0f3cf2c4a1.svg');
}

.capsule {
  width: 92px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/3818284f-32e3-44cb-875c-1b722074ddaa.svg);
}

.rectangle {
  width: 92px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(https://gw.alipayobjects.com/zos/bmw-prod/7b0ba540-6360-430b-a960-90c928ca037c.svg);
}

.select-transition {
  transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
