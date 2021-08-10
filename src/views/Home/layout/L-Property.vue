<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-10 15:28:11
-->
<template>
  <div class="property">我是组件编辑属性区域</div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.property {
  width: 100%;
  border-left: 1px solid $base-border-color;
}
</style>
