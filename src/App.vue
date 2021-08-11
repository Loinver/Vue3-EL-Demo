<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-03-31 10:09:56
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-10 14:01:18
-->
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script>
import { defineComponent } from 'vue';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default defineComponent({
  data() {
    return {
      locale: zhCn,
      Text: '测试一哈',
    };
  },
});
</script>
