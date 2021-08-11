<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-11 15:33:00
-->
<template>
  <div class="components">
    <div class="types" v-for="type in allComponents" :key="type.title">
      <h1>{{ type.title }}</h1>
      <ul v-for="item in type.components" :key="item.id">
        {{
          item.name
        }}
      </ul>
    </div>
  </div>
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
