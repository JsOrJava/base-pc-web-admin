<template>
    <div class="role-form__wrapper f-padding-20">
        <h3 class="f-margin-bottom10 f-tx-center">
            {{ formObj?'编辑':'新增' }}角色
        </h3>
        <el-form
            ref="form"
            size="small"
            :model="form"
            :rules="rules"
            label-width="100px"
            status-icon
            :label-position="'top'"
            class="f-margin-bottom20"
        >
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入角色名称" size="mini" clearable />
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
            
            <el-form-item label="权限" prop="privilege">
                <el-tree
                    ref="tree"
                    :data="data"
                    :props="defaultProps"
                    node-key="name"
                    show-checkbox
                    highlight-current
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
import { 
    saveRole, 
    updateRole, 
    getPrivilegeRole } from '@/api/system/role'
import formRules from '../validate/rules'

export default {
    name: 'role-edit',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        formObj: {
            type: [Object],
            default: null
        }
    },
    data() {
        return {
            form: {
                name: null,
                note: null,
                privilege: []
            },
            rules: formRules,
            defaultProps: {
                children: 'list',
                label: 'name'
            },
            data: []
        }
    },

    watch: {
        formObj: {
            handler(val) {
                if (val) {
                    this.$set(this, 'form', JSON.parse(JSON.stringify(val)))
                    this.$refs.tree.setCheckedKeys(this.form.privilege)
                }
            },
            deep: true
        }
    },

    created() {
        this.getPrivilegeRole()
    },

    methods: {
        getCheckedKeys() {
            let arr = this.$refs.tree.getCheckedNodes()
            return arr.filter((item, index) => item && item.parent_id != 0).map((item, index) => item.name)
        },
        // 确定
        async handleSubmit(form) {
            this.form.privilege = this.getCheckedKeys()

            await this._checkForm(this, form)

            const { id, name, note, privilege } = this.form
            const params = { id, name, note, privilege }

            this.formObj ? this.updateRole(params) : this.saveRole(params)
        },
        async saveRole(params) {
            await saveRole(params)
            this.$message.success('新增成功')
            this.$emit('getTableList')
            this.handleCancel()
        },
        async updateRole(params) {
            await updateRole(params)
            this.$message.success('编辑成功')
            this.$emit('getTableList')
            this.handleReset()
        },
        resetForm(form = 'form') {
            this.$refs[form].resetFields()
            this.$refs[form].clearValidate()
            this.$set(this, 'form', {})
            this.$refs.tree.setCheckedKeys([])
        },
        handleReset() {
            this.$emit('update:formObj', null)
            this.resetForm()
        },
        handleCancel() {
            this.resetForm()
        },
        async getPrivilegeRole() {
            const res = await getPrivilegeRole()
            this.data = res.data || []
        },
    }
}
</script>
<style lang="scss" scoped>
    .role-form__wrapper {
        box-sizing: border-box;
        border: 1px solid #ebeef5;
    }
     /deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
    /deep/ .el-form--label-top .el-form-item__label {
        padding: 0;
    }
    /deep/ .el-tree {
         max-height: 400px;
         overflow-y: auto;
         border: 1px solid #ebeef5;
         padding: 5px;
    }
</style>