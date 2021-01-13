<template>
  <div class="advert">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <el-table :data="menus" style="width: 100%">
        <el-table-column  label="编号" type="index" >
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" >
        </el-table-column>
        <el-table-column prop="level" label="菜单级数"> </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column  label="操作"> 
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getAllMenus ,deleteMenu} from '@/services/menu'
export default Vue.extend({
  name: "menu",
  data(){
    return {
      menus: []
    }
  },
  created(){
    this.loadAllMenus()
  },
  methods:{
    async loadAllMenus(){
      const {data} = await getAllMenus()
      if(data.code === '000000'){
        this.menus = data.data
      }
      console.log(data)
      
    },
    handleEdit(item: any){
      // console.log('handleEdit')
      this.$router.push({
        name:'menu-edit',
        params:{
          id:item.id
        }
      })
      
    },
    handleDelete(item: any){
      this.$confirm('确认删除吗？','删除提示',{}).then(async ()=>{
        const {data} = await deleteMenu(item.id)
        if(data.code == '000000'){
          this.$message.success('删除成功')
          this.loadAllMenus() // 更新列表
        }
      }).catch(err =>{
        this.$message.info('已取消删除')
      })
    }
  }
});
</script>

<style lang="scss" scoped>
</style>