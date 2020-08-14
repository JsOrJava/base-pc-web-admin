import request from '../request-template'

// 用户列表 
export function getPageUsers(data) {
    return request('get', '/pp/user/getPage', data)
}

// 用户编辑
export function updateUser(data) {
    return request('post', '/pp/user/update', data)
}