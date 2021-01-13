<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :model="form" ref="form">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select v-model="form.categoryId" clearable placeholder="请选择活动区域">
              <el-option 
              :label="item.name" 
              :value="item.id"
              v-for="item in resourceCategories"
              :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isLoading" type="primary" @click="onSubmit">搜索查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table :data="resources" stripe style="width: 100%;margin-bottom:20px;" v-loading="isLoading">
          <el-table-column label="编号" type="index" width="100">
          </el-table-column>
          <el-table-column prop="name" label="资源名称" width="180">
          </el-table-column>
          <el-table-column prop="url" label="资源路径"> </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column prop="createdTime" label="添加时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="form.size"
          :current-page.sync="form.current"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getResourcePages } from "@/services/resource";
import { getResourceCategories } from "@/services/resource-catagory";
import { Form } from "element-ui";
export default Vue.extend({
  name: "ResourceList",
  data() {
    return {
      totalCount:0,
      resources: [],
      form: {
        name: "",
        url: "",
        current:1,
        size:10, // 每页大小
        categoryId:null // 资源分类
      },
      resourceCategories:[], // 资源分类列表
      isLoading:true
    };
  },
  created() {
    this.loadResources();
    this.getResourceCategories()
  },
  methods: {
    async getResourceCategories(){
      const { data } = await getResourceCategories();
      this.resourceCategories = data.data
    },
    onSubmit() {
      this.form.current = 1 // 筛选查询从第1页开始
      this.loadResources()
      console.log("onSubmit");
    },
    resetForm(){
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 //重置回到第一页
      this.loadResources()
    },
    async loadResources() {
      this.isLoading = true
      const { data } = await getResourcePages(this.form);
      this.resources = data.data.records;
      this.totalCount = data.data.total
      this.isLoading = false
      // console.log("data", data);
    },
    handleSizeChange(val: number) {
      this.form.size = val
      this.form.current = 1 //每页大小改变重新查询第一页数据
      this.loadResources()
    },
    handleCurrentChange(val: number) {
      // 请求获取页码数据
      this.form.current = val
      this.loadResources()
    },
  },
});
</script>

<style lang="scss" scoped>
</style>