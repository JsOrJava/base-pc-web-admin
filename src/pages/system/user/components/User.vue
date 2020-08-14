<template>
    <div class="admin-form__wrapper f-padding-20">
        <h3 class="f-margin-bottom10 f-tx-center">
            {{ formObj?'编辑':'新增' }}管理员
        </h3>
        <el-form
            ref="form"
            size="small"
            :model="form"
            :rules="rules"
            label-width="100px"
            status-icon
            :label-position="'top'"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>

            <el-form-item label="昵称" prop="nick">
                <el-input v-model="form.nick" />
            </el-form-item>

            <el-form-item v-if="!formObj" label="初始密码" prop="password">
                <el-input v-model="form.password" />
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" />
            </el-form-item>

            <el-form-item label="角色名称：" prop="roleId">
                <el-select v-model="form.roleId" placeholder="请选择角色">
                    <el-option
                        v-for="item in roles"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>

            <el-form-item v-if="false" label="图片" prop="videoPicture">
                <upload-single-image
                    :img-url.sync="form.videoPicture"
                />
                <p class="goods-explain">
                    支持jpg/jpeg/png格式，建议495px*495px
                </p>
            </el-form-item>

            <el-form-item :label="`备注(${(form.note || {}).length || 0}/300)`" prop="note">
                <el-input
                    v-model="form.note"
                    type="textarea"
                    placeholder="请输入备注内容"
                    rows="4"
                    maxlength="300"
                />
            </el-form-item>
        </el-form>
        <div class="f-tx-center">
            <el-button v-if="formObj" type="danger" size="small" @click="handleReset">
                重置
            </el-button>
            <el-button v-else size="small" @click="handleCancel">
                取消
            </el-button>
            <el-button size="small" type="primary" @click="handleSubmit('form')">
                确定
            </el-button>
        </div>
    </div>
</template>
<script>
// import { saveAdmin, updateAdmin } from '@/api/system-setting/admin';
import formRules from '../validate/rules'

export default {
    name: 'admin-edit',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        formObj: {
            type: [Object, Array],
            default: null
        },
        roles: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            form: {},
            rules: formRules
        }
    },

    watch: {
        formObj: {
            handler(val) {
                if (val) {
                    this.$set(this, 'form', JSON.parse(JSON.stringify(val)))
                }
            },
            deep: true
        }
    },

    methods: {
        // 确定
        async handleSubmit(form) {
            await this._checkForm(this, form)

            const { id, image, nick, note, password, phone, roleId, status, username } = this.form
            const params = { id, image, nick, note, password, phone, roleId, status, username }

            this.formObj ? this.updateAdmin(params) : this.saveAdmin(params)
        },
        async saveAdmin(params) {
            await saveAdmin(params)
            this.$message.success('新增成功')
            this.$emit('getTableList')
            this.handleCancel()
        },
        async updateAdmin(params) {
            await updateAdmin(params)
            this.$message.success('编辑成功')
            this.$emit('refreshData')
            this.handleReset()
        },
        resetForm(form = 'form') {
            this.$refs[form].resetFields()
            this.$refs[form].clearValidate()
            this.$set(this, 'form', {})
        },
        handleReset() {
            this.$emit('update:formObj', null)
            this.resetForm()
        },
        // 取消操作
        handleCancel() {
            this.resetForm()
        }
    }
}
</script>
<style lang="scss" scoped>
    .admin-form__wrapper {
        box-sizing: border-box;
        border: 1px solid #ebeef5;
    }
     /deep/ .el-form {
            max-height: calc(100vh - 300px);
            overflow-y: auto;
        }
    /deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
    /deep/ .el-form--label-top .el-form-item__label {
        padding: 0;
    }
</style>