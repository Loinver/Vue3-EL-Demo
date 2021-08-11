<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-11 14:20:59
-->
<template>
  <div class="components">我是组件列表区域</div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const allComponents = [
      {
        title: '常规组件',
        components: [],
      },
      {
        title: '布局组件',
        components: [],
      },
    ];
    return {
      allComponents,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.components {
  width: 100%;
  border-right: 1px solid $base-border-color;
}
</style>
