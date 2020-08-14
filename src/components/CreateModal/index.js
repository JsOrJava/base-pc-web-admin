import Vue from 'vue'
import router from '@/router'

const createModal = (options, component) => {
    const popup = (props) => {
        return new Promise((resolve, reject) => {
            let VueModal = Vue.extend(component)
            let instance = new VueModal({
                router,
                propsData: {
                    ...props,
                },
                mounted() {
                    this.$on('close', (res = false) => {
                        this.destory()
                        res && reject(res)
                    })
                    this.$on('sure', (res) => {
                        this.destory()
                        resolve(res)
                    })
                },
                destroyed() {
                    document.body.removeChild(instance.$el)
                },
                methods: {
                    destory() {
                        setTimeout(() => {
                            this.$off('close')
                            this.$off('sure')
                            this.$destroy()
                        }, 300)
                    }
                }
            })
            instance.$mount()
            document.body.appendChild(instance.$el)
        })
    }
    return {
        popup
    }
}

export default createModal
