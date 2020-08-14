// 分区路由文件写法

export default {
    path: '/client',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'client',
    order: 1,
    meta: {
        title: '客户管理',
        icon: '404'
    },
    children: [
        {
            path: 'custom',
            component: () => import('@/pages/client/custom/index'),
            name: 'custom',
            meta: { title: '客户管理', noCache: true, roles: ['admin'] }
        }
    ]
}
