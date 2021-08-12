<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-12 09:08:43
-->
<template>
  <el-row>
    <el-col :span="divConfig.span">
      <div></div>
    </el-col>
  </el-row>
</template>
<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const divConfig = ref({
      span: 24, // 默认值
    });
    return {
      divConfig,
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
