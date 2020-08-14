// 分区路由文件写法

export default {
    path: '/error',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'ErrorPages',
    order: 110,
    meta: {
        title: 'Error Pages',
        icon: '404'
    },
    children: [
        {
            path: '401',
            component: () => import('@/pages/error/401'),
            name: 'Page401',
            meta: { title: '401', noCache: true, roles: ['admin'] }
        },
        {
            path: '404',
            component: () => import('@/pages/error/404'),
            name: 'Page404',
            meta: { title: '404', noCache: true, roles: ['admin'] }
        }
    ]
}
