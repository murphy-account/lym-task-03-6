/***
 * 
 * 资源相关的请求模块
 */

import request from '@/utils/request'

 export const getResourcePages = (data: any) =>{
    return request({
        method: "POST",
        url: "/boss/resource/getResourcePages",
        data
      })
 }

