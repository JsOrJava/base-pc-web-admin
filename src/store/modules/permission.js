import router, { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    SET_ROUTES_EMPTY: (state, routes) => {
        state.addRoutes = []
        state.routes = []
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        // asyncRoutes - 用JSON.parse(JSON.stringify()) 无法拷贝import函数;

        return new Promise(async resolve => {
            let accessedRoutes
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(
                    asyncRoutes,
                    roles
                )
            }

            // 解决重定向404问题
            const newPermission = accessedRoutes.concat(
                {
                    path: '*',
                    redirect: '/404'
                }
            )

            // router.options.routes = newPermission;
            // console.info(newPermission)
            router.addRoutes(newPermission)

            commit(
                'SET_ROUTES',
                accessedRoutes
            )
            resolve(accessedRoutes)
        })
    },
    emptyRoutes({ commit }, roles) {
        commit('SET_ROUTES_EMPTY', [])
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

