// 分区路由文件写法

export default {
    path: '/video',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    name: 'video',
    order: 6,
    meta: {
        title: '视频管理',
        icon: '404'
    },
    children: [
        {
            path: 'category',
            component: () => import('@/pages/video/category/index'),
            name: 'video-category',
            meta: { title: '视频类别管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'manage',
            component: () => import('@/pages/video/manage/index'),
            name: 'video-manage',
            meta: { title: '视频管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'comment',
            component: () => import('@/pages/video/manage/comment'),
            name: 'video-manage-comment',
            hidden: true,
            meta: { title: '评论管理', noCache: true, roles: ['admin'] }
        },
        {
            path: 'detail',
            component: () => import('@/pages/video/manage/detail'),
            name: 'video-manage-detail',
            hidden: true,
            meta: { title: '回复详情', noCache: true, roles: ['admin'] }
        }
    ]
}
