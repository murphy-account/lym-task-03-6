import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName:'layout' */'@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName:'home' */'@/views/home/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName:'menu' */'@/views/menu/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName:'resource' */'@/views/resource/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName:'advert' */'@/views/advert/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName:'advert-space' */'@/views/advert-space/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName:'course' */'@/views/course/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName:'role' */'@/views/role/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/user',
        name: 'user',
        props:true,
        component: () => import(/* webpackChunkName:'user' */'@/views/user/index.vue'),
        meta:{ // 这是在定义的时候给路由的一个自己配的数据，可以用来判断页面是否需要登录权限
          requiresAuth:true //自定义数据
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName:'menu-create' */'@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName:'menu-edit' */'@/views/menu/edit.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:'login' */'@/views/login/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName:'404' */'@/views/error-page/404.vue')
  },
]

// 在路由的index.ts文件中加入
// 代码插入到 new VueRouter()之前
// const resolveOriginal = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location: any) {
//   return (resolveOriginal.call(this, location) as any).catch((err: any) => err)
// }
const router = new VueRouter({
  routes
})


// 全局路由守卫：任何页面的访问都要经过这里
// to:要去哪里的路由信息
// from:从哪里来的路由
// next:通行的标志
// 现在是没有注释掉路由守卫的状态
router.beforeEach((to,from,next) => {
  console.log('进入了路由全局守卫','to.matched',to.matched);
  // to.matched 是一个数组（匹配到是路由记录)
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.state.user){
      //跳转到登录页面
      next({
        name:'login',
        query: { // 通过url 传递查询字符串参数
          redirect:to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  // 路由守卫一定要用next,否则页面无法显示
  
})


export default router
