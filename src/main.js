import Vue from 'vue'
import Cookies from 'js-cookie'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'
import './icons' // icon

import './filters'
import './directives'
import './components/global/index'

Vue.config.productionTip = false
import 'babel-polyfill'

import mixin from './mixins/index'

Vue.mixin(mixin)

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
