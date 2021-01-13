import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'
const request = axios.create({
    //配置选项
})
function redirectLogin() {
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

function refreshToken() {
    return axios.create()({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
            // 这个refreshtoken只能用一次，在多次请求的时候会出问题
            refreshtoken: store.state.user.refresh_token
        })
    })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
    // console.log('接口请求进来了', config)
    // 这里改写config的配置信息来实现业务功能的统一处理
    const { user } = store.state
    if (user && user.access_token) {
        config.headers.Authorization = user.access_token
    }
    // 这里要返回config 否则请求失败
    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false // 控制刷新token的状态
let requests: any = [] // 存储刷新token期间过来的401请求，解决多次请求其他接口重试的问题
request.interceptors.response.use(function (response) { // 状态码为2xx都会进入这里
    // console.log('请求响应成功了', response);
    // 如果是自定义状态码，那么错误处理都写到这里。

    return response;
}, async function (error) { // 超出2xx状态码都执行这里
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('失败了', error);

    if (error.response) { // 请求发出去收到响应了，但是状态码超出了2xx范围
        const { status } = error.response
        if (status === 400) {
            Message.error('请求参数错误')

        } else if (status === 401) {
            // TOKEN 无效 
            if (!store.state.user) {
                redirectLogin()
                return Promise.reject(error)
            }
            // 尝试刷新获取新的token
            // 刷新token
            if (!isRefreshing) {
                isRefreshing = true // 开启刷新状态
                return refreshToken().then(res => {
                    if (!res.data.success) {
                        throw new Error('刷新 Token 失败')
                    }
                    // 把刷新拿到的新的更新到容器和本地存储中
                    store.commit('setUser', res.data.content)
                    // 把requests队列的请求发出去
                    requests.forEach((cb: () => any)  => cb())
                    // 重置requests 数组
                    requests = []
                    return request(error.config)
                }).catch(err => {
                    // 把当前登录用户状态清除
                    store.commit('setUser', null)
                    redirectLogin()
                    // console.log(err)
                    return Promise.reject(error)
                }).finally(()=>{
                    isRefreshing = false // 重置刷新状态
                })
            }

            // 刷新状态下，把请求挂起放到requests数组中~~~~~~~~~~~~~~~~~~~~~
            return new Promise(resolve =>{
                requests.push(()=>{
                    resolve(request(error.config))
                })
            })

        } else if (status === 403) {
            Message.error('没有权限，请联系管理员')
        } else if (status === 404) {
            Message.error('请求资源不存在')
        } else if (status >= 500) {
            Message.error('服务端错误，请联系管理员')
        }
    } else if (error.request) { // 请求发出去没有收到响应
        Message.error('请求超时，请刷新重试')
        // console.log(error.request);
    } else {  // 在设置请求时发生了一些事情触发了一个错误
        // Something happened in setting up the request that triggered an Error
        Message.error(`请求失败：${error.message}`)
    }

    // 把请求失败的错误对象继续抛出，扔给下一个上一个调用者
    return Promise.reject(error)
});


export default request