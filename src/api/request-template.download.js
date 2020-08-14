import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        Message({
            type: 'error',
            message: response.data.msg
        })
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const disposition = response.headers['content-disposition']
        const fileName = decodeURI(
            disposition.substring(
                disposition.indexOf('filename=') + 9,
                disposition.length
            )
        )
        let blob = new Blob([response.data], {
            type: 'application/vnd.ms-excel'
        })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        link.remove()
    },
    error => {
        if (error && error.response) {
            let res = {}
            res.code = error.response.status
            res.message = throwErr(error.response.status, error.response)
            Message({
                type: 'error',
                message: res.message
            })
            return Promise.reject(res)
        }
        return Promise.reject(error)
    }
)

export default function request(method, url, data) {
    method = method.toLocaleLowerCase()
    data.size = null
    data.page = null
    if (method === 'get') {
        return service.get(url, {
            params: clearParams(data),
            responseType: 'blob'
        })
    }
}
// axios捕错
export const throwErr = (code, response) => {
    let message = '请求错误'
    switch (code) {
        case 400:
            message = '请求错误'
            break
        case 401:
            message = '未授权，请登录'
            break
        case 403:
            message = '拒绝访问'
            break
        case 404:
            message = `请求地址出错: ${response.config.url}`
            break
        case 408:
            message = '请求超时'
            break
        case 500:
            message = '服务器内部错误'
            break
        case 501:
            message = '服务未实现'
            break
        case 502:
            message = '网关错误'
            break
        case 503:
            message = '服务不可用'
            break
        case 504:
            message = '网关超时'
            break
        case 505:
            message = 'HTTP版本不受支持'
            break
        default:
    }
    return message
}

// 清除无用参数
export const clearParams = params => {
    if (params) {
        const paramsKeys = Object.keys(params)
        paramsKeys.forEach(item => {
            if (['', null, undefined].includes(params[item])) {
                delete params[item]
            }
        })
    }
    return params
}