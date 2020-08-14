export default {
    path: '/home',
    name: 'home',
    component: () => import('@/layout'), // 懒加载式引入，当跳转到时才进行引入chunk
    redirect: 'noRedirect',
    order: 100,
    meta: {
        title: 'home',
        icon: '404'
    },
    children: [
        {
            path: 'detail',
            component: () => import('@/pages/home'),
            name: 'home-detail',
            meta: { title: 'homeDetail', noCache: true, roles: ['admin'] }
        },
        {
            path: 'template',
            component: () => import('@/pages/home'),
            name: 'home-template',
            meta: { title: 'homeTemplate', noCache: true, roles: ['admin'] }
        }
    ]
}
