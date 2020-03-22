<template>
  <div class="container">
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column label="ID" min-width="50px">
        <template slot-scope="{row}">
          {{row.id.slice(0, 4)}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="100px" />
      <el-table-column prop="content" label="备注" min-width="100px" />
      <el-table-column label="二维码" min-width="60px">
        <template slot-scope="{row}">
          <el-button type="text" @click="qrcodeDetail(row.id, row.name)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="填写数量" />
      <el-table-column prop="create_time" label="创建时间" :formatter="timeFormatter" />
      <el-table-column prop="update_time" label="修改时间" :formatter="timeFormatter" />
      <el-table-column label="操作" min-width="60px">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialog.qrcodeTitle" :visible.sync="dialog.qrcode" width="350px">
      <qrcode :text="dialog.qrcodeUrl" :size="300" :margin="0" />
    </el-dialog>

    <el-dialog title="编辑二维码" :visible.sync="dialog.update" width="650px">
      <el-form label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="update.name" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="update.content" />
        </el-form-item>
        <el-transfer v-model="update.fieldIds" :data="fields" :titles="['可用字段', '已选字段']" />
      </el-form>
      <el-button slot="footer" type="primary" @click="submitUpdate">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import qrcode from 'vue-qr';

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
        label: it.name
      }));
    },

    qrcodeDetail(id, title) {
      this.qrcode.title = title;
      this.qrcode.url = `http://www.domain.com/?token=${id}`;
      this.dialog.qrcode = true;
    },

    handleUpdate(row) {
      this.$set(this, 'update', JSON.parse(JSON.stringify(row)));
      this.dialog.update = true;
    },

    submitUpdate() {
      
    },

    timeFormatter({ value }) {
      return moment(value).format('MM-DD HH:mm:SS');
    }
  },

  created() {
    this.getAllQrcode();
    this.getAllFiedls();
  }
};
</script>
