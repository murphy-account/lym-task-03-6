<template>
  <div class="advert">course
    <el-button @click="$router.push({name:'user',query:{userId},params:{aaa:111}})">123</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:'course',
    data(){
      return {
        userId:'857857'
      }
    }
}) 
</script>

<style lang="scss" scoped>

</style>