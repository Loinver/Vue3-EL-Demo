<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-10 15:28:07
-->
<template>
  <div class="components">我是组件列表区域</div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.components {
  width: 100%;
  border-right: 1px solid $base-border-color;
}
</style>
