<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-07-21 17:47:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-05 16:04:37
-->
<template>
  <ul class="flex">
    <button @click="handleGetRequest">发起get请求</button>
    <button @click="handlePostRequest">发起post请求</button>
    <router-link :to="{ name: 'test' }">跳转test</router-link>
    <router-link :to="{ name: 'five' }">跳转five</router-link>
    <router-link :to="{ name: 'five' }">跳转</router-link>
  </ul>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({}),
  created() {
    console.log(process.env);
  },
  methods: {
    handleGetRequest() {
      this.$api.getIndex({ a: 1 });
    },
    handlePostRequest() {
      this.$api.login({ a: 1, b: 2 });
    },
  },
};
</script>

<style scoped></style>
