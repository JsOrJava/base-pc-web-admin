// 分区路由文件写法

export default {
    path: '/service',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'service',
    order: 3,
    meta: {
        title: '业务管理',
        icon: '404'
    },
    children: [
        {
            path: 'buy',
            component: () => import('@/pages/service/buy/index'),
            name: 'service-buy',
            meta: { title: '求购请求管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'cash',
            component: () => import('@/pages/service/cash/index'),
            name: 'service-cash',
            meta: { title: '套现请求管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'pay',
            component: () => import('@/pages/service/pay/index'),
            name: 'service-pay',
            meta: { title: '套现请求管理', noCache: true, roles: ['admin'] }
        }
    ]
}
