<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-16 15:55:23
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
        :clone="cloneComponent"
        @end="onEnd"
      >
        <template #item="{ element }">
          <div class="components-item" @click="addComponent(element)">
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
import { defineComponent, reactive } from 'vue';
import { deepClone } from '@/utils/index';
import { useStore } from 'vuex';
import { inputComponents, selectComponents, layoutComponents, containerConf } from '../components/config';
export default defineComponent({
  components: {
    draggable,
  },
  setup() {
    const store = useStore();
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
    const tempActiveData = reactive({});
    return {
      allComponents,
      tempActiveData,
      containerConf,
      store,
    };
  },
  methods: {
    fetchData(component) {
      const { dataType, method, url } = component.__config__;
      if (dataType === 'dynamic' && method && url) {
        this.setLoading(component, true);
        this.$axios({
          method,
          url,
        }).then((resp) => {
          this.setLoading(component, false);
          this.setRespData(component, resp.data);
        });
      }
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.fetchData(this.tempActiveData);
        this.activeData = this.tempActiveData;
        this.activeId = this.idGlobal;
      }
      console.log('[ this.tempActiveData ]', this.tempActiveData);
    },
    // 添加组件
    addComponent(item) {
      const clone = this.cloneComponent(item);
      this.fetchData(clone);
      this.activeFormItem(clone);
      // this.drawingList.push(clone);
      console.log(1111);
      this.store.dispatch('main/setDrawList', clone);
    },
    // 克隆组件
    cloneComponent(origin) {
      const clone = deepClone(origin);
      const config = clone.__config__;
      config.span = this.containerConf.span; // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone);
      clone.placeholder !== undefined && (clone.placeholder += config.label);
      this.tempActiveData = clone;
      return this.tempActiveData;
    },
    // 创建Id和Key
    createIdAndKey(item) {
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
    },
    // Todo：设置当前选中组件数据
    activeFormItem(currentItem) {
      this.activeData = currentItem;
      this.activeId = currentItem.__config__.formId;
    },
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
      background: $base-background-color;
      font-size: 12px;
      cursor: move;
      border: 1px dashed $base-background-color;
      border-radius: 3px;
      &:hover {
        border: 1px dashed $base-border-color-active;
        color: $base-border-color-active;
      }
    }
  }
}
</style>
