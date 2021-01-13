<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view/> 
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(){
    return {
      a:1,
      b:'2'
    }
  },
  methods:{
    aaa(){
      this.a
    }
  }
})
</script>

<style lang="scss" scoped>
h1{
  color:$success-color;
}
</style>
