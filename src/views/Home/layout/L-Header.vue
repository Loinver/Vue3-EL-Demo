<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-11 09:10:37
-->
<template>
  <div class="header">
    <el-button type="text">
      <i class="el-icon-video-play"> </i>
      运行
    </el-button>
    <el-button type="text">
      <i class="el-icon-view"> </i>
      查看JSON
    </el-button>
    <el-button type="text">
      <i class="el-icon-download"> </i>
      导出VUE文件
    </el-button>
    <el-button type="text"> <i class="el-icon-document-copy"> </i>复制代码 </el-button>
    <el-button type="text"> <i class="el-icon-delete"> </i>清空 </el-button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.header {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  text-align: right;
  border-bottom: 1px solid $base-border-color;
  .el-button--small {
    font-size: 14px;
  }
}
</style>
