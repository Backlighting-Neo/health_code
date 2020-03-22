<template>
  <div class="container">
    <page-header>
      字段维护
      <el-button slot="operation" type="primary" @click="create">新建字段</el-button>
    </page-header>
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50px" fixed="left" />
      <el-table-column prop="key" label="键值" fixed="left" />
      <el-table-column prop="name" label="名称" min-width="100px" />
      <el-table-column prop="dataType" label="数据类型" :formatter="dataTypeFormatter" />
      <el-table-column prop="nullable" label="必填" :formatter="nullableFormatter" width="60px" />
      <el-table-column prop="create_time" label="创建时间" min-width="100px" :formatter="timeFormatter" />
      <el-table-column prop="update_time" label="修改时间" min-width="100px" :formatter="timeFormatter" />
      <el-table-column prop="content" label="备注" />
      <el-table-column label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`${update.id === -1 ? '新建' : '修改'}字段`" :visible.sync="dialog.update" width="550px">
      <el-form label-width="80px">
        <el-form-item label="键值">
          <el-input v-model="update.key" :disabled="update.id !== -1" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="update.name" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="update.content" />
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="update.dataType">
            <el-option
              v-for="(key, value) in constant.DataTypeEnum"
              :key="key"
              :value="value"
              :label="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="必填">
          <el-switch
            v-model="update.nullable"
            active-text="非必填"
            inactive-text="必填"
          />
        </el-form-item>
        <el-form-item label="附加数据">
          <vue-json-editor v-model="update.extra" mode="code" />
        </el-form-item>
      </el-form>
      <el-button slot="footer" type="primary" @click="submit">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import vueJsonEditor from 'vue-json-editor';
import * as common from './common';

export default {
  name: 'fields',

  components: {
    vueJsonEditor
  },

  data() {
    return {
      constant: Object.freeze({
        DataTypeEnum: common.DataTypeEnum
      }),
      data: [],
      update: {},
      dialog: {
        update: false
      }
    };
  },

  methods: {
    async getAllFields() {
      const { data } = await axios.get('/api/admin/field/all');
      this.data = data.data;
    },

    handleUpdate(row) {
      this.update = JSON.parse(JSON.stringify(row));
      this.dialog.update = true;
    },

    async submit() {
      const { id, key, name, content, dataType, nullable, extra } = this.update;

      if (!key) return this.$notify.error('键值不能为空');
      if (!name) return this.$notify.error('名字不能为空');
      if (!dataType) return this.$notify.error('数据类型不能为空');
      if (dataType === 'radio' && !extra.options) return this.$notify.error('单选类型必须有extra.options');
      if (dataType === 'checkbox' && !extra.options) return this.$notify.error('复选类型必须有extra.options');
      
      if (id === -1) {
        const { data } = await axios.put('/api/admin/field/new', {
          key, name, content, dataType, nullable, extra
        });
        this.$notify.success('添加成功');
      } else {
        await axios.post(`/api/admin/field/update?id=${id}`, {
          name, content, dataType, nullable, extra
        });
        this.$notify.success('修改成功');
      }

      this.dialog.update = false;
      return this.getAllFields();
    },

    create() {
      this.update = {
        id: -1,
        key: '',
        name: '',
        content: '',
        dataType: 'input',
        nullable: true,
        extra: {}
      };
      this.dialog.update = true;
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
    this.getAllFields();
  }
};
</script>
