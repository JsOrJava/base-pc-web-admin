const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/

export const validatorOldpass = (rule, value, callback) => {
    if (['', null, undefined].includes(value)) {
        callback(new Error('请输入原密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6～16位数字和字母'))
    } else {
        callback()
    }
}

export const validator_passWord = (rule, value, callback) => {
    if (['', null, undefined].includes(value)) {
        callback(new Error('请输入新密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6～16位数字和字母'))
    } else {
        callback()
    }
}

export const validatePass2 = function (rule, value, callback) {
    if (['', null, undefined].includes(value)) {
        callback(new Error('请输入确认密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6～16位数字和字母'))
    } else if (value != this.form.newPassword) {
        callback(new Error('确认密码和新密码不一致'))
    } else {
        callback()
    }
}