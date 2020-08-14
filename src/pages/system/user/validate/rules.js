import validators from '@/utils/regexp'

export const validator_passWord = (rule, value, callback) => {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (['', null, undefined].includes(value)) {
        callback(new Error('请输入密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6～16位数字和字母'))
    } else {
        callback()
    }
}

export const validator_phone = (rule, value, callback) => {
    if (['', null, undefined].includes(value)) {
        callback(new Error('请输入手机号码'))
    } else if (!validators.isMobile(value)) {
        callback(new Error('请输入正确的手机号码'))
    } else {
        callback()
    }
}

const rules = {
    image: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
    username: [
        { required: true, message: '用户名称不能为空', trigger: 'blur' }
    ],
    nick: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
    password: [
        { required: true, validator: validator_passWord, trigger: 'blur' }
    ],
    phone: [{ required: true, validator: validator_phone, trigger: 'blur' }],
    roleId: [
        { required: true, message: '角色不能为空', trigger: 'visible-change' }
    ]
}

export default rules