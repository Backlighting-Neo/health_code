<template>
  <div class="container">
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50px" />
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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'report',
  components: {
  },

  async getAllFiedls() {
    const { data } = await axios.get('/api/admin/field/all');
    this.fields = data.data.map(it => ({
      key: `${it.id}`,
      label: it.name
    }));
  },
};
</script>
