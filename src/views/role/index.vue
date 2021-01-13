<template>
  <div class="advert">
    <role-list></role-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoleList from './components/List.vue'
export default Vue.extend({
    name:'resource',
    components:{
      RoleList
    }
}) 
</script>

<style lang="scss" scoped>

</style>