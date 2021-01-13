/***
 * 
 * 用户相关的请求模块
 */

import request from '@/utils/request'

 export const createOrUpdateMenu = (data: any) =>{
    return request({
        method: "POST",
        url: "/boss/menu/saveOrUpdate",
        data
      })
 }

 export const getEditMenuInfo = (id: string | number = -1) =>{
    return request({
        method: "GET",
        url: "/boss/menu/getEditMenuInfo",
        params:{
            id
        }
      })
 }

 export const getAllMenus = () =>{
  return request({
      method: "GET",
      url: "/boss/menu/getAll",
    })
}

export const deleteMenu = (id: number) =>{
  return request({
      method: "DELETE",
      url: `/boss/menu/${id}`,
    })
}

export const queryRoleList = (id: number) =>{
  return request({
      method: "GET",
      url: "/boss/role/all",
    })
}
export const saveOrUpdateRole = (data: any) =>{
  return request({
      method: "POST",
      url: "/boss/role/saveOrUpdate",
      data
    })
}

export const deleteRole = (id: number) =>{
  return request({
      method: "DELETE",
      url: `/boss/role/${id}`,
    })
}