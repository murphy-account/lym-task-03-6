import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化的功能
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录用户状态
  },
  mutations: {
    // 修改容器数据使用mutation
    setUser(state,payload){
      state.user = JSON.parse(payload) 
      // 为了防止页面刷新数据丢失，我们需要本地存储
      window.localStorage.setItem('user',payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
