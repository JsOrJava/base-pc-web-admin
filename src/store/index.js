import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const vuexLocal = new VuexPersist({
    storage: window.sessionStorage
})

const store = new Vuex.Store({
    modules,
    getters,
    state: {

    },
    mutations: {

    },
    actions: {

    },
    plugins: [vuexLocal.plugin]
})

export default store
