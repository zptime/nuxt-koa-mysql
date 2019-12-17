<template>
  <div class="user-content">
    <el-button-group class="user-tools">
      <el-button @click="handleAdd()" type="primary" icon="el-icon-circle-plus-outline">
        新增
      </el-button>
    </el-button-group>
    <el-table :data="userData" stripe border class="user-table">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column prop="user_id" label="用户ID" />
      <el-table-column prop="user_account" label="账号" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.user_avatar ? scope.row.user_avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" shape="square" />
        </template>
      </el-table-column>
      <el-table-column prop="role_name" label="角色名" />
      <el-table-column prop="role_description" label="角色描述" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">
            修改
          </el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" title="新增用户">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="活动名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button @click="dialogFormVisible = false" type="primary">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUser, addUser, updateUser, deleteUser } from '~/server/api'
export default {
  data () {
    return {
      userData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      const result = await getAllUser(this.$axios)
      this.userData = result.data
    },
    async handleAdd () {
      // this.dialogFormVisible = true
      const result = await addUser(this.$axios, {
        'user_account': 'mary',
        'user_name': '李四'
      })
      if (result.code === 0) {
        this.$message('新增成功')
      }
    },
    async handleEdit (index, row) {
      const result = await updateUser(this.$axios, row.user_id)
      if (result.code === 0) {
        this.$message('修改成功')
      }
    },
    async handleDelete (index, row) {
      const result = await deleteUser(this.$axios, row.user_id)
      if (result.code === 0) {
        this.$message('删除成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-content {
  .user-tools{
    margin-bottom: 20px;
  }
}
</style>
