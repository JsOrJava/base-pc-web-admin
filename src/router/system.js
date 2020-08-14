// 分区路由文件写法

export default {
    path: '/system',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'system',
    order: 0,
    meta: {
        title: '系统设置',
        icon: '404'
    },
    children: [
        {
            path: 'role',
            component: () => import('@/pages/system/role/index'),
            name: 'system-role',
            meta: { title: '角色管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'user',
            component: () => import('@/pages/system/user/index'),
            name: 'system-user',
            meta: { title: '管理员管理', noCache: true, roles: ['admin'] }
        }
    ]
}
