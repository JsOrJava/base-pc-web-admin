<template>
    <form-dialog
        :title="`${formObj?'编辑':'新增'}参数`"
        :show.sync="show"
        :handle-close="handleCancel"
        width="50%"
        top="5vh"
    >
        <div slot="content" class="m-form__height-300">
            <el-form ref="brandForm" :model="brandForm" label-width="140px">
                <el-form-item 
                    :rules="{ required: true, validator: validator_english, trigger: 'blur'}" 
                    label="父类目级别"
                    prop="eName"
                >
                    <el-select v-model="brandForm.roleId" placeholder="所有" class="mr-10">
                        <el-option label="所有" :value="null" />
                        <el-option v-for="ele in roles" :key="ele.id" :label="ele.name" :value="ele.id" />
                    </el-select>
                </el-form-item>

                <el-form-item 
                    :rules="{ required: true, message: '品牌列表图片不能为空', trigger: 'visible-change'}" 
                    label="父类目名称" 
                    prop="image"
                >
                    <el-select v-model="brandForm.roleId" placeholder="所有" class="mr-10">
                        <el-option label="所有" :value="null" />
                        <el-option v-for="ele in roles" :key="ele.id" :label="ele.name" :value="ele.id" />
                    </el-select>
                    <p>该类目的一级类目为：腕表</p>
                </el-form-item>
                <el-form-item 
                    :rules="[{ required: true, message: '系列名称不能为空', trigger: 'blur'},
                             { min: 1, max: 16, message: '商品类型最多16位字符', trigger: 'blur'}]" 
                    label="类目名称"
                    prop="cName"
                >
                    <el-input v-model="brandForm.cName" placeholder="请输入品牌名称" />
                </el-form-item>
                <el-form-item label="是否参与发布：" prop="remark">
                    <el-radio v-model="brandForm.radio" label="1">
                        参与
                    </el-radio>
                    <el-radio v-model="brandForm.radio" label="2">
                        不参与
                    </el-radio>
                </el-form-item>
                <el-form-item label="是否参与筛选：" prop="remark">
                    <el-radio v-model="brandForm.radio" label="1">
                        参与
                    </el-radio>
                    <el-radio v-model="brandForm.radio" label="2">
                        不参与
                    </el-radio>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input
                        v-model="brandForm.remark"
                        type="textarea"
                        placeholder="请输入备注内容"
                        rows="4"
                        maxlength="300"
                        show-word-limit 
                    />
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button size="medium" @click="handleCancel">
                取消
            </el-button>
            <el-button size="medium" type="primary" @click="handleSubmit('brandForm')">
                确定
            </el-button>
        </div>
    </form-dialog>
</template>
<script>
// import { saveLuReclaimBrand, updateLuReclaimBrand } from '@/api/recovery'

export default {
    name: 'add-brand',
    props: {
        show: {
            type: Boolean,
            default: true
        },
        formObj: {
            type: [Object, Array],
            default: null
        }
    },
    data() {
        return {
            brandForm: {
                category: []
            },
            roles: []
        }
    },

    watch: {
        formObj: {
            handler(val) {
                if (val) {
                    this.$set(this, 'brandForm', JSON.parse(JSON.stringify(val)))
                    this.$set(this.brandForm, 'category', JSON.parse(val.category))
                }
            },
            deep: true
        }
    },

    methods: {
    // 确定
        async handleSubmit(form) {
            await this._checkForm(this, form)

            const category = JSON.stringify(this.brandForm.category)
            const { id, cName, eName, image, remark } = this.brandForm
            const params = { id, cName, eName, category, image, remark }

            this.formObj ? this.updateLuReclaimBrand(params) : this.saveLuReclaimBrand(params)
        },
        // 新增品牌
        async saveLuReclaimBrand(params) {
            await saveLuReclaimBrand(params)
            this.$message.success('新增成功')
            this.$emit('sure')
            this.handleCancel()
        },
        // 编辑品牌
        async updateLuReclaimBrand(params) {
            await updateLuReclaimBrand(params)
            this.$message.success('编辑成功')
            this.$emit('sure')
            this.handleCancel()
        },
        // 取消操作
        handleCancel() {
            this.$emit('close', true)
        },
        // 英文名称校验
        validator_english(rule, value, callback) {
            const reg = /^[a-zA-Z\s`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#¥%⋯⋯&*（）——\-+={}|《》？：“”【】、；‘’，。、]*$/
            if (['', null, undefined].includes(value)) {
                callback(new Error('请输入英文名称'))
            } else if (value.length > 32) {
                callback(new Error('请输入最多输入32个字符'))
            } else if (!reg.test(value)) {
                callback(new Error('请输入字母、符号和空格组合的英文名称'))
            } else {
                callback()
            }
        }
    }
}
</script>

