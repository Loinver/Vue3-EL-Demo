<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-12 09:57:10
-->
<template>
  <div class="components">
    <div class="types" v-for="type in allComponents" :key="type.name">
      <h1 class="components-name">{{ type.name }}</h1>
      <draggable
        class="components-draggable"
        :list="type.components"
        :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
        item-key="name"
        draggable=".components-item"
        :sort="false"
      >
        <template #item="{ element }">
          <div class="components-item">
            <div class="components-item-body">
              {{ element.__config__.label }}
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import { defineComponent, h } from 'vue';
import { inputComponents, selectComponents, layoutComponents } from '../components/config';
export default defineComponent({
  components: {
    draggable,
  },
  setup() {
    // 定义组件列表
    const allComponents = [
      {
        name: '输入型组件',
        components: inputComponents,
      },
      {
        name: '选择型组件',
        components: selectComponents,
      },
      {
        name: '布局型组件',
        components: layoutComponents,
      },
    ];
    console.log(h(allComponents[0].components));
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
  &-name {
    font-size: 14px;
    padding: 20px 5px 10px;
  }
  &-draggable {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-item {
    width: 50%;
    padding: 5px;
    &-body {
      padding: 8px 10px;
      background: #f6f7ff;
      font-size: 12px;
      cursor: move;
      border: 1px dashed #f6f7ff;
      border-radius: 3px;
      &:hover {
        border: 1px dashed #787be8;
        color: #787be8;
      }
    }
  }
}
</style>
