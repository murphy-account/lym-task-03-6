<template>
  <div class="advert">用户管理
    <el-button @click="$router.push({name:'course',params:{exe:'111'}})">123{{aaa}}</el-button>
    <el-button @click="con()">打印$router</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:'user',
    props:['aaa'],
    methods:{
      con(){
        console.log(this.$route,'传过来的参数aaa',this.aaa,'userId',)
      }
    }
}) 
</script>

<style lang="scss" scoped>

</style>