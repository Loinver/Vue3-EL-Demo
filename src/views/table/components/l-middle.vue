<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 09:05:23
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-10 11:01:18
-->
<template>
  <el-form :inline="true" :model="searchForm" class="demo-form-inline">
    <el-form-item label="审批人">
      <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="searchForm.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table row-key="date" border ref="filterTable" :data="tableData" style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180"
      column-key="date"
      :filters="[
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' },
      ]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址" :formatter="formatter"> </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[
        { text: '家', value: '家' },
        { text: '公司', value: '公司' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { reactive, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司',
      },
    ]);
    const searchForm = reactive({
      user: '',
      region: '',
    });

    const formatter = (row) => {
      return row.address;
    };
    const filterTag = (value, row) => {
      return row.tag === value;
    };
    const filterHandler = (value, row, column) => {
      const property = column['property'];
      return row[property] === value;
    };
    const onSubmit = () => {
      console.log('查询');
    };
    return {
      tableData,
      searchForm,
      formatter,
      filterTag,
      filterHandler,
      onSubmit,
    };
  },
  watch: {
    'searchForm.user': 'handleSearch',
  },
  created() {
    const musicType = this.$api.login({
      phone: '13655554444',
      password: '1223',
    });
    if (musicType) {
      console.log(musicType);
    }
  },
  methods: {
    handleSearch() {
      console.log('触发了查询');
    },
  },
});
</script>
<style lang=""></style>
