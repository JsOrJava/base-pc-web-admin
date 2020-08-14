<template>
    <form-dialog
        title="重置密码"
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
                label-width="100px"
                status-icon
            >
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="form.newPassword" clearable placeholder="请输入新密码" />
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="form.checkPass" clearable placeholder="请输入确认密码" />
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
import { validator_newPassword, validator_checkPass } from '../validate/password'
// import { resetPassword } from '@/api/system-setting/admin'

export default {
    name: 'reset-password',
    props: {
        show: {
            type: Boolean,
            default: true
        },
        formObj: {
            type: [Object, Array],
            default: () => {}
        }
    },
    data() {
        return {
            form: {
                newPassword: null,
                checkPass: null
            },
            rules: {
                newPassword: [
                    { required: true, validator: validator_newPassword, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, validator: validator_checkPass.bind(this), trigger: 'blur' }
                ]
            }
        }
    },

    methods: {
        // 确定
        async handleSubmit(form) {
            await this._checkForm(this, form)
            const { id } = this.formObj
            const { newPassword, checkPass } = this.form
            const params = { id, newPassword, checkPass }

            this.resetPassword(params)
        },
        async resetPassword(params) {
            await resetPassword(params)
            this.$message.success('编辑成功')
            this.$emit('sure')
            this.handleCancel()
        },
        handleCancel() {
            this.$emit('close')
        }
    }
}
</script>
