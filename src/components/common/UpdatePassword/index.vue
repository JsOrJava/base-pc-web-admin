<template>
    <form-dialog
        title="编辑密码"
        :show.sync="show"
        width="600px"
        :handle-close="handleCancel"
    >
        <div slot="content">
            <el-form
                ref="form"
                size="medium"
                :model="form"
                :rules="rules"
                label-width="120px"
                status-icon
            >
                <el-form-item label="请输入原密码" prop="oldPassword">
                    <el-input
                        v-model="form.oldPassword"
                        placeholder="请输入6～16位由数字和字母组成的登录密码"
                        type="password"
                    />
                </el-form-item>
                <el-form-item label="请输入新密码" prop="newPassword">
                    <el-input
                        v-model="form.newPassword"
                        placeholder="请输入6～16位由数字和字母组成的登录密码"
                        type="password"
                    />
                </el-form-item>
                <el-form-item label="请确认新密码" prop="checkPass">
                    <el-input
                        v-model="form.checkPass"
                        placeholder="请输入6～16位由数字和字母组成的登录密码"
                        type="password"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button size="medium" @click="handleCancel">
                取消
            </el-button>
            <el-button size="medium" type="primary" @click="handleSubmit('form')">
                确定
            </el-button>
        </div>
    </form-dialog>
</template>
<script>
import { validatorOldpass, validator_passWord, validatePass2 } from './validate/rules'
// import { changePassword } from '@/api/system-setting/admin';

export default {
    name: 'edit-account',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        formObj: {
            type: [Object, Array],
            default: null
        }
    },
    data() {
        return {
            form: {
                oldPassword: null,
                newPassword: null,
                checkPass: null
            },
            rules: {
                oldPassword: [
                    { required: true, validator: validatorOldpass, trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, validator: validator_passWord, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, validator: validatePass2.bind(this), trigger: 'blur' }
                ] 
            }
        }
    },

    watch: {
        formObj: {
            handler(val) {
                if (val) {
                    this.$set(this, 'form', JSON.parse(JSON.stringify(val)))
                }
            }
        }
    },

    methods: {
        // 确定
        async handleSubmit(form) {
            await this._checkForm(this, form)

            const { oldPassword, newPassword, checkPass } = this.form
            const params = { oldPassword, newPassword, checkPass }

            this.changePassword(params)
        },
        async changePassword(params) {
            await changePassword(params)
            this.$message.success('修改成功，请重新登录！')
            this.handleCancel()

            bus.$emit('log_out', true)
        },
        resetForm(form = 'form') {
            this.$refs[form].resetFields()
            this.$refs[form].clearValidate()
        },
        handleCancel() {
            this.$emit('update:show', false)
            this.resetForm()
        }
    }
}
</script>
