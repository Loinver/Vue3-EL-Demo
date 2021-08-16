<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 13:41:41
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-13 10:45:04
-->
<template>
  <el-scrollbar class="container">
    <el-row class="center-board" :gutter="containerConf.gutter">
      <div class="board-wrap" :ref="containerConf.refName">
        <draggable class="drawing-board" :list="selectAll" item-key="name" :animation="350" group="componentsGroup">
          <template #item="{ item, index }">
            <draggable-item
              :key="item.renderKey"
              :drawing-list="drawingList"
              :current-item="item"
              :index="index"
              :active-id="activeId"
              :container-conf="containerConf"
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
export default defineComponent({
  components: {
    Draggable,
    DraggableItem,
  },
  setup() {
    let selectAll = [];
    let drawingList = [];
    return { selectAll, containerConf, drawingList };
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
