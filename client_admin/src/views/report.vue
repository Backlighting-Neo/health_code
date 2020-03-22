<template>
  <div class="container">
    <page-header>
      数据报表
      <el-button slot="operation" type="primary" @click="downloadExcel">导出到Excel</el-button>
    </page-header>
    <search-block>
      <el-form slot="form">
        <el-form-item label="二维码">
          <el-select clearable v-model="search.qrcode">
            <el-option
              v-for="item in qrcode"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="登记时间">
          <el-date-picker
            v-model="search.range"
            clearable
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
      <el-button slot="operation" type="primary" @click="getAllRegister">查询</el-button>
    </search-block>
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" fixed="left" min-width="50px" />
      <el-table-column prop="qrcode" label="二维码" fixed="left" min-width="80px" />
      <el-table-column prop="register_time" label="登记时间" fixed="left" min-width="100px" :formatter="timeFormatter" />
      <el-table-column
        v-for="col in tableFields"
        :key="col.key"
        :prop="col.key"
        :label="col.name"
        :formatter="dataTypeTransformer[col.dataType]"
      />
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
import xlsx from 'node-xlsx';
import fileSaver from 'file-saver';
import * as common from './common';

export default {
  name: 'report',

  components: {
  },

  data() {
    return {
      fields: [],
      data: [],
      qrcode: [],
      search: {
        range: []
      }
    };
  },

  computed: {
    tableFields() {
      const fields = new Set();
      this.data.forEach(it => {
        Object.keys(it).forEach(key => {
          fields.add(key);
        });
      });
      return this.fields.filter(it => fields.has(it.key));
    }
  },

  methods: {
    async getAllQrcode() {
      const { data } = await axios.get('/api/admin/qrcode/all');
      this.qrcode = data.data;
    },

    async getAllFiedls() {
      const { data } = await axios.get('/api/admin/field/all');
      this.fields = data.data;
    },

    async getAllRegister() {
      const params = {};
      if (this.search.range.length > 0) {
        params.start = +this.search.range[0];
        params.end = +this.search.range[1];
      }
      if (this.search.qrcode) {
        params.qrcode = this.search.qrcode;
      }
      const querystring = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
      const { data } = await axios.get(`/api/admin/register/all${querystring ? '?' : ''}${querystring}`);
      this.data = data.data;
    },

    downloadExcel() {
      const header = ['ID', '二维码', '登记时间'].concat(this.tableFields.map(it => it.name));
      const content = this.data.map(it => [
        it.id,
        it.qrcode,
        it.register_time,
        ...this.tableFields.map(field => {
          const value = it[field.key];
          const col = field.key;
          const dataType = field.dataType;
          return this.dataTypeTransformer[dataType](null, { property: col }, value);
        })
      ]);
      const buffer = xlsx.build([{
        name: '数据报表',
        data: [header].concat(content)
      }]);
      fileSaver.saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        '数据报表.xlsx',
      );
    },

    timeFormatter: common.timeFormatter
  },

  created() {
    this.getAllQrcode();
    this.getAllFiedls();
    this.getAllRegister();

    this.dataTypeTransformer = {
      input: (_row, _col, value) => value || '-',
      calendar: common.timeFormatter,
      radio: (_row, col, value) => {
        if (!value) return '-';
        const colName = col.property;
        const field = this.fields.find(it => it.key === colName);
        return field.extra.options.find(it => it.value === value).name;
      },
      checkbox: (_row, col, value) => {
        if (!value) return '-';
        const colName = col.property;
        const field = this.fields.find(it => it.key === colName);
        return field.extra.options.filter(it => value.includes(it.value)).map(it => it.name).join(', ');
      },
    };
  }
};
</script>
