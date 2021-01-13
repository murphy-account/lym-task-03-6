<template>
<div class="alloc-menu">
    <el-card>
        <div slot="header">
            <span>分配权限</span>
        </div>
    </el-card>
  <el-tree
    ref="menuTree"
    :data="menus"
    node-key="id"
    :props="defaultProps"
    show-checkbox
    :default-checked-keys="checkedKeys"
    default-expand-all
  ></el-tree>
  <div style="text-aligna:center">
      <el-button @click="resetChecked">清空</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
  </div>
</div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
export default {
  name: "allocMenu",
  props: {
    roleId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      menus: [],
      defaultProps: {
        children: "subMenuList",
        label: "name",
      },
      checkedKeys:[]
    };
  },
  created(){
      this.loadMenus()
      this.loadRoleMenus()
  },
  methods:{
      async loadRoleMenus(){
          const {data} = await getRoleMenus(this.roleId)
          this.getCheckedKeys(data.data)
      },
      resetChecked() {
        this.$refs.menuTree.setCheckedKeys([]);
      },
      getCheckedKeys(menus){
          menus.forEach(menu => {
              if(menu.selected){
                  this.checkedKeys = [...this.checkedKeys,menu.id]
                //   this.checkedKeys.push(menu.id)
              }
              if(menu.subMenuList){
                  this.getCheckedKeys(menu.subMenuList)
              }
          })
      },
      async loadMenus(){
          const {data} = await getMenuNodeList()
          this.menus = data.data
          console.log(data);
      },
      async onSave(){
         const menuIdList = this.$refs.menuTree.getCheckedKeys()
          await allocateRoleMenus({
              roleId:this.roleId,
              menuIdList
          })
          this.$message.success('操作成功')
          this.$router.back()
      }
  }
};
</script>

<style>
</style>