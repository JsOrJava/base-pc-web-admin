// 分区路由文件写法

export default {
    path: '/quotation',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'quotation',
    order: 5,
    meta: {
        title: '行情管理',
        icon: '404'
    },
    children: [
        {
            path: 'watch',
            component: () => import('@/pages/quotation/watch/index'),
            name: 'quotation-watch',
            meta: { title: '腕表商品管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'add-watch',
            component: () => import('@/pages/quotation/watch/add-watch'),
            name: 'quotation-watch-add-watch',
            hidden: true,
            meta: { title: '添加腕表商品', noCache: true, roles: ['admin'] }
        },
        {
            path: 'edit-watch',
            component: () => import('@/pages/quotation/watch/add-watch'),
            name: 'quotation-watch-edit-watch',
            hidden: true,
            meta: {
                title: '编辑腕表商品',
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'jewelry',
            component: () => import('@/pages/quotation/jewelry/index'),
            name: 'quotation-jewelry',
            meta: { title: '首饰商品管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'add-jewelry',
            component: () => import('@/pages/quotation/jewelry/add-jewelry'),
            name: 'quotation-jewelry-add-jewelry',
            hidden: true,
            meta: { title: '添加首饰商品', noCache: true, roles: ['admin'] }
        },
        {
            path: 'edit-jewelry',
            component: () => import('@/pages/quotation/jewelry/add-jewelry'),
            name: 'quotation-jewelry-edit-jewelry',
            hidden: true,
            meta: {
                title: '编辑首饰商品',
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'bag',
            component: () => import('@/pages/quotation/bag/index'),
            name: 'quotation-bag',
            meta: { title: '包包商品管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'add-bag',
            component: () => import('@/pages/quotation/bag/add-bag'),
            name: 'quotation-bag-add-bag',
            hidden: true,
            meta: { title: '添加包包商品', noCache: true, roles: ['admin'] }
        },
        {
            path: 'edit-bag',
            component: () => import('@/pages/quotation/bag/add-bag'),
            name: 'quotation-bag-edit-bag',
            hidden: true,
            meta: {
                title: '编辑包包商品',
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'category',
            component: () => import('@/pages/quotation/category/index'),
            name: 'quotation-category',
            meta: {
                title: '首饰类别管理',
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'parameter',
            component: () => import('@/pages/quotation/parameter/index'),
            name: 'quotation-parameter',
            meta: {
                title: '首饰其他参数管理',
                noCache: true,
                roles: ['admin']
            }
        }
    ]
}
