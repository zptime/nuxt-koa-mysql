<template>
  <div class="user-content">
    <el-table
      :data="userData"
      stripe
      border
      class="user-table"
    >
      <el-table-column prop="user_id" label="用户ID" />
      <el-table-column prop="user_account" label="账号" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.user_avatar ? scope.row.user_avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" shape="square" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">
            编辑
          </el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllUser } from '~/server/api'
export default {
  data () {
    return {
      userData: []
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
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="scss" scoped>
.user-content {
  align-items: flex-start;
}
</style>
