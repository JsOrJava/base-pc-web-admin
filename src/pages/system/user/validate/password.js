export const validator_newPassword = (rule, value, callback) => {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (['', null, undefined].includes(value)) {
        callback(new Error('请输入密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6～16位数字和字母'))
    } else {
        callback()
    }
}

export const validator_checkPass = function (rule, value, callback) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (['', null, undefined].includes(value)) {
        callback(new Error('请输入密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6～16位数字和字母'))
    } else if (value != this.form.newPassword) {
        callback(new Error('确认密码和新密码不一致'))
    } else {
        callback()
    }
}

