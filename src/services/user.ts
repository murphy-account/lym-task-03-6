/***
 * 
 * 用户相关的请求模块
 */

import request from '@/utils/request'
 import qs from 'qs'

 interface User {
     phone: string;
     password: string;
 }
 export const login = (param: User) =>{
    return request({
        method: "POST",
        url: "/front/user/login",
        data: qs.stringify(param), // axios 默认发送的是 json格式的数据
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
 }
 export const getUserInfo = () =>{
    return request({
        method: "GET",
        url: "/front/user/getInfo",
        // headers: { "Authorization": store.state.user.access_token },
      })
 }

   