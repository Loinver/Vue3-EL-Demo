<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-12 09:55:16
-->
<template>
  <div class="components">
    <div class="types" v-for="type in allComponents" :key="type.name">
      <h1 class="components-name">{{ type.name }}</h1>
      <draggable
        class="components-draggable"
        :list="type.components"
        :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
        :clone="cloneComponent"
        item-key="name"
        draggable=".components-item"
        :sort="false"
      >
        <template #item="{ element }">
          <div class="components-item">
            <div class="components-item-body">
              <!-- <svg-icon :icon-class="element.__config__.tagIcon" /> -->
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
import { deepClone } from '@/utils/index';
import { defineComponent } from 'vue';
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
    let tempActiveData; // 当前模板数据
    // 克隆组件
    const cloneComponent = (origin) => {
      const clone = deepClone(origin);
      const config = clone.__config__;
      config.span = this.formConf.span; // 生成代码时，会根据span做精简判断
      createIdAndKey(clone);
      clone.placeholder !== undefined && (clone.placeholder += config.label);
      tempActiveData = clone;
      return tempActiveData;
    };
    // 创建id和key
    const createIdAndKey = (item) => {
      const config = item.__config__;
      config.formId = ++this.idGlobal;
      config.renderKey = `${config.formId}${+new Date()}`; // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colItem') {
        item.__vModel__ = `field${this.idGlobal}`;
      } else if (config.layout === 'rowItem') {
        config.componentName = `row${this.idGlobal}`;
        !Array.isArray(config.children) && (config.children = []);
        delete config.label; // rowItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map((childItem) => this.createIdAndKey(childItem));
      }
      return item;
    };
    return {
      allComponents,
      cloneComponent,
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
