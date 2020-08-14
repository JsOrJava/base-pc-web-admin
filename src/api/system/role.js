import request from '../request-template'

// 删除角色 
export function deleteRole(id) {
    return request('delete', '/pp/role/delete', { data: { id } })
}

// 新增角色
export function saveRole(data) {
    return request('post', '/pp/role/save', data)
}

// 更新角色
export function updateRole(data) {
    return request('post', '/pp/role/update', data)
}

// 权限列表
export function getPrivilegeRole(data) {
    return request('get', '/pp/role/privilege', data)
}

// 禁用恢复角色
export function forbidRole(data) {
    return request('post', '/pp/role/forbid', data)
}

// 获取角色列表
export function getAllRoles(data) {
    return request('get', '/pp/role/getAll', data)
}

// 角色详情
export function getDetailRole(id) {
    return request('get', '/pp/role/getDetail', { id })
}