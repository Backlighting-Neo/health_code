<template>
  <div class="container">
    <page-header>
      字段维护
      <el-button slot="operation" type="primary">新建字段</el-button>
    </page-header>
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50px" fixed="left" />
      <el-table-column prop="key" label="键值" fixed="left" />
      <el-table-column prop="name" label="名字" min-width="100px" />
      <el-table-column prop="dataType" label="数据类型" :formatter="dataTypeFormatter" />
      <el-table-column prop="nullable" label="必填" :formatter="nullableFormatter" width="60px" />
      <el-table-column prop="create_time" label="创建时间" min-width="100px" :formatter="timeFormatter" />
      <el-table-column prop="update_time" label="修改时间" min-width="100px" :formatter="timeFormatter" />
      <el-table-column prop="content" label="备注" />
      <el-table-column label="操作" fixed="right">
        <template>
          <el-button type="text" @click="handleUpdate">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`${update.id === '' ? '新建' : '修改'}字段`" :visible.sync="dialog.update" width="550px">
      <el-form label-width="60px">
        <el-form-item label="键值">
          <el-input v-model="update.name" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import * as common from './common';

export default {
  name: 'fields',

  components: {
  },

  data() {
    return {
      data: [],
      update: {},
      dialog: {
        update: false
      }
    };
  },

  methods: {
    async getAllFiedls() {
      const { data } = await axios.get('/api/admin/field/all');
      this.data = data.data;
    },

    timeFormatter: common.timeFormatter,

    dataTypeFormatter(_row, _col, value) {
      return common.DataTypeEnum[value] || value;
    },

    nullableFormatter(_row, _col, value) {
      return value ? '否' : '是';
    }
  },

  created() {
    this.getAllFiedls();
  }
};
</script>
