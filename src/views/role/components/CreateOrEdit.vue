<template>
  <div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="role"
    >
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="role.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="saveOrUpdateRole()">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {saveOrUpdateRole, getRoleById} from '@/services/menu'
export default {
  name: "CreateOrEditRole",
  props:{
      roleId:{
          type:[String, Number]
      },
      isEdit:{
          type:Boolean,
          default:false
      }
  },
  data(){
      return {
        labelPosition: 'top',
        role: {
          code: '',
          name: '',
          description: ''
        }
      }
  },
  created(){
      if(this.isEdit){
          console.log('这是编辑操作');
          this.loadRole()
      }
  },
  methods:{
      async saveOrUpdateRole(){
          const {data}  = await saveOrUpdateRole(this.role)
          this.$message.success('操作成功')
          this.$emit('success')

      },
      async loadRole(){
        const {data} = await getRoleById(this.roleId)
        console.log(data)
        this.role = data.data
      }
  }
};
</script>

<style>
</style>