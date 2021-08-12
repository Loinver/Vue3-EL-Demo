<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-12 09:48:25
-->
<template>
  <div class="container-wrap">
    <div class="left">
      <l-header></l-header>
      <div class="body">
        <l-components class="components"></l-components>
        <l-container></l-container>
      </div>
    </div>
    <l-property class="right"></l-property>
  </div>
</template>
<script>
import LHeader from './layout/L-Header.vue';
import LComponents from './layout/L-Components.vue';
import LContainer from './layout/L-Container.vue';
import LProperty from './layout/L-Property.vue';
import {} from 'vue';
export default {
  components: {
    LHeader,
    LComponents,
    LContainer,
    LProperty,
  },
  setup() {
    return {};
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
    width: 200px;
    flex-shrink: 0;
    height: 100%;
  }
}
</style>
