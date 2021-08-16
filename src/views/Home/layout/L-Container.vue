<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-16 16:22:36
-->
<template>
  <el-scrollbar class="container">
    <el-row class="center-board" :gutter="containerConf.gutter">
      <div class="board-wrap" :ref="containerConf.refName">
        <draggable class="drawing-board" :list="drawingList" item-key="name" :animation="350" group="componentsGroup">
          <template #item="{ item, index }">
            <draggable-item
              :drawing-list="drawingList"
              :current-item="item"
              :index="index"
              :active-id="activeId"
              :container-conf="containerConf"
              @activeItem="activeFormItem"
            />
          </template>
        </draggable>
        <div v-show="!drawingList.length" class="empty-tips">从左侧拖入组件进行页面设计</div>
      </div>
    </el-row>
  </el-scrollbar>
</template>
<script>
import { defineComponent } from 'vue';
import Draggable from 'vuedraggable';
import DraggableItem from '../components/DraggableItem';
import { containerConf } from '../components/config';
import { getDrawingList, saveDrawingList, getIdGlobal, saveIdGlobal, getContainerConf } from '@/utils/db';
import drawingDefault from '../components/defaultConfig'; // 默认配置
const emptyActiveData = { style: {}, autosize: {} };
let oldActiveId;
let tempActiveData;
const drawingListInDB = getDrawingList();
const formConfInDB = getContainerConf();
const idGlobal = getIdGlobal();
export default defineComponent({
  components: {
    Draggable,
    DraggableItem,
  },
  setup() {
    let activeData; // 当前选中的组件数据
    let activeId; // 当前选中的组件id
    let drawingList = [];
    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      drawingList = drawingListInDB;
    } else {
      drawingList = drawingDefault;
    }
    console.log(drawingList);
    return { containerConf, drawingList, activeData, activeId };
  },
  methods: {
    // Todo：设置当前选中组件数据
    activeFormItem(currentItem) {
      this.activeData = currentItem;
      this.activeId = currentItem.__config__.formId;
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
  },
});
</script>
<style lang="scss" scoped>
.container {
  flex-grow: 1;
  .center-board {
    padding: 12px;
    .board-wrap {
      width: 100%;
      height: calc(100vh - 64px);
    }
    .drawing-board {
      height: 100%;
      position: relative;
    }
    .empty-tips {
      position: absolute;
      top: 40vh;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
