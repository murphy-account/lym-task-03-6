<template>
  <div>
    <el-form :model="formInline" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询搜索</el-button>
        <el-button type="primary" plain @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain @click="handleAdd">添加角色</el-button>
    <el-table :data="roles" style="width: 100%">
      <el-table-column label="编号" type="index"> </el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push({
            name:'alloc-menu',
            params:{
              roleId:scope.row.id
            }
            })"
            >分配菜单</el-button
          >
          <el-button size="mini" @click="handleDelete(scope.row)"
            >分配资源</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
        <el-dialog
        :title="isEdit ? '编辑角色' : '添加角色'"
        :visible.sync="dialogVisible"
        width="30%">
<create-or-edit v-if="dialogVisible" :is-edit="isEdit" :role-id="roleId" @cancel="dialogVisible = false" @success = "onSuccess"></create-or-edit>        </el-dialog>
  </div>
</template>

<script>
import { queryRoleList, deleteRole } from "@/services/menu";
import  CreateOrEdit from './CreateOrEdit.vue'
export default {
    components:{
        CreateOrEdit
    },
  data() {
    return {
      dialogVisible:false,
      roles: [],
      formInline: {
        user: "",
        region: "",
      },
      roleId:null,
      isEdit:false
    };
  },
  created() {
    this.queryRoleList();
  },
  methods: {
    async queryRoleList() {
      const { data } = await queryRoleList();
      this.roles = data.data;
      //   console.log()
    },
    onSubmit() {
      console.log("submit!");
    },
    onSuccess(){
        this.dialogVisible = false
        this.queryRoleList()
    },
    handleEdit(role){
        this.dialogVisible = true
        this.roleId = role.id
        this.isEdit = true
    },
    handleAdd(){
        this.isEdit = false
        this.dialogVisible = true
    },
    async handleDelete(role){
        try {
            await this.$confirm(`确认删除角色：${role.name}?`,'删除提示')
            await deleteRole(role.id)
            this.$message.success('删除成功')
            this.queryRoleList()
        } catch (err) {
            if(err && err.response) {
                this.$message.error('删除失败，请重试')
            } else {
                this.$message.info('取消删除')
            }
        }
    }
  },
};
</script>

<style>
</style>