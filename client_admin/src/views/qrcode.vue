<template>
  <div class="container">
    <page-header>
      二维码管理
      <el-button slot="operation" type="primary" @click="create">新建二维码</el-button>
    </page-header>
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column label="ID" min-width="50px">
        <template slot-scope="{row}">
          {{row.id.slice(0, 8)}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="100px" />
      <el-table-column prop="content" label="备注" min-width="100px" />
      <el-table-column prop="count" label="填写数量" />
      <el-table-column prop="create_time" label="创建时间" :formatter="timeFormatter" />
      <el-table-column prop="update_time" label="修改时间" :formatter="timeFormatter" />
      <el-table-column label="操作" min-width="60px">
        <template slot-scope="{row}">
          <el-button type="text" @click="qrcodeDetail(row.id, row.name)">二维码</el-button>
          <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="qrcode.title" :visible.sync="dialog.qrcode" width="350px">
      <el-alert :closable="false">在图片上右键选择“图片存储为”即可下载</el-alert>
      <br/>
      <qrcode :text="qrcode.url" :size="300" :margin="0" />
    </el-dialog>

    <el-dialog :title="`${update.id === '' ? '新建' : '修改'}二维码`" :visible.sync="dialog.update" width="650px">
      <el-form label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="update.name" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="update.content" />
        </el-form-item>
        <el-transfer v-model="update.fieldIds" :data="fields" :titles="['可用字段', '已选字段']" />
      </el-form>
      <el-button slot="footer" type="primary" @click="submit">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import qrcode from 'vue-qr';
import * as common from './common';

export default {
  name: 'qrcode_display',

  components: {
    qrcode
  },
  
  data() {
    return {
      data: [],
      fields: [],

      update: {
        
      },

      qrcode: {
        title: '',
        url: ''
      },

      dialog: {
        update: false,
        qrcode: false,
      }
    };
  },

  methods: {
    async getAllQrcode() {
      const { data } = await axios.get('/api/admin/qrcode/all');
      this.data = data.data;
    },

    async getAllFiedls() {
      const { data } = await axios.get('/api/admin/field/all');
      this.fields = data.data.map(it => ({
        key: `${it.id}`,
        label: `${it.name}(${it.key})`
      }));
    },

    qrcodeDetail(id, title) {
      this.qrcode.title = title;
      this.qrcode.url = `${location.protocol}//${location.host}/#/?token=${id}`;
      this.dialog.qrcode = true;
    },

    handleUpdate(row) {
      this.$set(this, 'update', JSON.parse(JSON.stringify(row)));
      this.dialog.update = true;
    },

    create() {
      this.update = {
        id: '',
        name: '',
        content: '',
        fieldIds: []
      };
      this.dialog.update = true;
    },

    async submit() {
      if (!this.update.name) {
        return this.$notify.error('名字不能为空');
      }
      if (!this.update.content) {
        return this.$notify.error('描述不能为空');
      }
      if (!this.update.fieldIds.length === 0) {
        return this.$notify.error('至少要有一个字段');
      }

      if (!this.update.id) {
        const { data } = await axios.put('/api/admin/qrcode/new', {
          name: this.update.name,
          content: this.update.content,
          fieldIds: this.update.fieldIds
        });
        this.$notify.success('添加成功');
        this.qrcodeDetail(data.data.id, this.update.name);
      } else {
        await axios.post(`/api/admin/qrcode/update?token=${this.update.id}`, {
          name: this.update.name,
          content: this.update.content,
          fieldIds: this.update.fieldIds
        });
        this.$notify.success('修改成功');
      }

      this.dialog.update = false;
      return this.getAllQrcode();
    },

    timeFormatter: common.timeFormatter
  },

  created() {
    this.getAllQrcode();
    this.getAllFiedls();
  }
};
</script>
