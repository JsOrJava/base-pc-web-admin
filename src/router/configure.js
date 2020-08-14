export default {
    path: '/configure',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'configure',
    order: 7,
    meta: {
        title: '配置管理',
        icon: '404'
    },
    children: [
        {
            path: 'edition',
            component: () => import('@/pages/configure/edition/index'),
            name: 'video-category',
            meta: { title: '版本管理', noCache: true, roles: ['admin'] }
        }
    ]
}