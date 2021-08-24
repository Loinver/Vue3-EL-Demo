<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-24 13:32:38
-->
<template>
  <div>
    <div class="container-wrap">
      <div class="left">
        <l-header @handleHeaderButton="handleHeaderButton"></l-header>
        <div class="body">
          <l-components class="components"></l-components>
          <l-container></l-container>
        </div>
      </div>
      <l-property class="right"></l-property>
    </div>
    <el-drawer v-model="data.drawer" :withHeader="false" size="40%" destroy-on-close>
      <L-MonacoEditor></L-MonacoEditor>
    </el-drawer>
  </div>
</template>
<script>
import LHeader from './layout/L-Header.vue';
import LComponents from './layout/L-Components.vue';
import LContainer from './layout/L-Container.vue';
import LMonacoEditor from './layout/L-MonacoEditor.vue';
import LProperty from './layout/L-Property.vue';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
export default {
  components: {
    LHeader,
    LComponents,
    LContainer,
    LProperty,
    LMonacoEditor,
  },
  setup() {
    let data = reactive({
      drawer: false,
    });

    const handleHeaderButton = (value) => {
      //运行：run-code，查看代码：check-code，导出文件：export-file，复制代码：copy-code 清空：clear
      let ev = {
        'run-code': '运行',
        'export-file': '导出文件',
        'copy-code': '复制代码',
        clear: '清空',
      };
      switch (value) {
        case 'check-code':
          data.drawer = !data.drawer;
          break;
        default:
          ElMessage.success({
            message: `点击了 ${ev[value]} 按钮`,
            type: 'success',
          });
          break;
      }
    };
    return {
      handleHeaderButton,
      data,
    };
  },
  created() {
    console.log(this.$api);
  },
};
</script>
<style lang="scss">
.container-wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  .left {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .body {
      flex-grow: 1;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .components {
        width: 250px;
        flex-shrink: 0;
      }
    }
  }
  .right {
    width: 250px;
    flex-shrink: 0;
    height: 100%;
  }
}
</style>
