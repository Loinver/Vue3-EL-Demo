<!--
 * @Description: 详情
 * @Version:
 * @Author: Linyer
 * @Date: 2021-02-23 10:27:42
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-10 09:15:26
-->
<template>
  <div>1111</div>
  <div class="demo">
    <l-header></l-header>
    <l-middle></l-middle>
  </div>
</template>
<script>
import LHeader from './components/l-header.vue';
import LMiddle from './components/l-middle.vue';
export default {
  components: { LHeader, LMiddle },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    console.log(this.$api);
  },
};
</script>
<style lang="scss" scoped>
.demo {
  width: 1200px;
  margin: 50px auto;
}
</style>
