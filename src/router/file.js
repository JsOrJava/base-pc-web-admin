export default {
    path: '/file',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'file',
    order: 8,
    meta: {
        title: '归档',
        icon: '404'
    },
    children: [
        {
            path: 'watch-brand',
            component: () => import('@/pages/file/watch/brand/index'),
            name: 'file-watch-brand',
            meta: { title: '腕表品牌管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'watch-series',
            component: () => import('@/pages/file/watch/series/index'),
            name: 'file-watch-series',
            meta: { title: '腕表系列管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'watch-model',
            component: () => import('@/pages/file/watch/model/index'),
            name: 'file-watch-model',
            meta: { title: '腕表型号管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'watch-parameter',
            component: () => import('@/pages/file/watch/parameter/index'),
            name: 'file-watch-parameter',
            meta: { title: '腕表参数管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'jewelry-brand',
            component: () => import('@/pages/file/jewelry/brand/index'),
            name: 'file-jewelry-brand',
            meta: { title: '首饰品牌管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'jewelry-series',
            component: () => import('@/pages/file/jewelry/series/index'),
            name: 'file-jewelry-series',
            meta: { title: '首饰系列管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'jewelry-parameter',
            component: () => import('@/pages/file/jewelry/parameter/index'),
            name: 'file-jewelry-parameter',
            meta: { title: '首饰参数管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'bag-brand',
            component: () => import('@/pages/file/bag/brand/index'),
            name: 'file-bag-brand',
            meta: { title: '包包品牌管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'bag-parameter',
            component: () => import('@/pages/file/bag/parameter/index'),
            name: 'file-bag-parameter',
            meta: { title: '包包参数管理', noCache: true, roles: ['admin'] }
        }
    ]
}
