// 总路由管理文件 index.js 写法
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

Vue.use(VueRouter)

const excludes = ['./index.js']
const context = require.context('.', true, /\.js/)
const routerMap = context
    .keys()
    .filter(url => {
        return !excludes.includes(url)
    })
    .map(url => context(url).default).sort((a, b) => a.order - b.order)
const routes = [...routerMap]

export const constantRoutes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login') // 懒加载式引入，当跳转到时才进行引入chunk
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/pages/error/404')
    }
]
export const asyncRoutes = [...routes]

const router = new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

// 捕获权限
router.beforeEach(async (to, from, next) => {
    NProgress.start()

    if (to.path == '/login') {
        // 登录页面无需权限
        next()
    } if (store.getters.name === '') {
        next('/login')
    } else if (
        store.getters.permission_routes
             && store.getters.permission_routes.length > 0
    ) {
        next()
    } else {
        const { roles } = await store.dispatch('user/getInfo')
        await store.dispatch('permission/generateRoutes', roles)

        next({ ...to, replace: true })
    }
})

router.afterEach(() => {
    NProgress.done()
})

export function resetRouter() {
    const newRouter = router
    router.matcher = newRouter.matcher // reset router
}

export default router
