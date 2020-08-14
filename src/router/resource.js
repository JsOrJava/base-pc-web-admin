// 分区路由文件写法

export default {
    path: '/resource',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'resource',
    order: 2,
    meta: {
        title: '资源管理',
        icon: '404'
    },
    children: [
        {
            path: 'brand',
            component: () => import('@/pages/resource/brand/index'),
            name: 'resource-brand',
            meta: { title: '品牌管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'model',
            component: () => import('@/pages/resource/model/index'),
            name: 'resource-model',
            meta: { title: '型号管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'series',
            component: () => import('@/pages/resource/series/index'),
            name: 'resource-series',
            meta: { title: '系列管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'parameter',
            component: () => import('@/pages/resource/parameter/index'),
            name: 'resource-parameter',
            meta: { title: '参数管理', noCache: true, roles: ['admin'] }
        }
    ]
}
