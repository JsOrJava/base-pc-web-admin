<template>
    <form-dialog
        :title="`${formObj?'编辑':'新增'}品牌`"
        :show.sync="show"
        :handle-close="handleCancel"
        width="50%"
        top="5vh"
    >
        <div slot="content" class="m-form__height-300">
            <el-form ref="brandForm" :model="brandForm" label-width="120px">
                <el-form-item 
                    :rules="[{ required: true, message: '品牌名称不能为空', trigger: 'blur'},
                             { min: 1, max: 16, message: '商品类型最多16位字符', trigger: 'blur'}]" 
                    label="品牌名称"
                    prop="cName"
                >
                    <el-input v-model="brandForm.cName" placeholder="请输入品牌名称" />
                </el-form-item>

                <el-form-item :rules="{ required: true, validator: validator_english, trigger: 'blur'}" label="品牌英文名称" prop="eName">
                    <el-input v-model="brandForm.eName" placeholder="请输入品牌英文名称" />
                </el-form-item>

                <el-form-item :rules="{ required: true, message: '品牌列表图片不能为空', trigger: 'visible-change'}" label="品牌logo图片" prop="image">
                    <upload-single-image
                        :img-url.sync="brandForm.image"
                    />
                    <p class="goods-explain">
                        支持jpg/jpeg/png格式，建议230px*230px
                    </p>
                </el-form-item>


                <el-form-item :rules="{ required: true, message: '类目不能为空', trigger: 'visible-change'}" label="类目" prop="category">
                    <!-- 1代表腕表;2代表箱包;3代表首饰;4代表钻石 -->
                    <el-checkbox-group v-model="brandForm.category">
                        <el-checkbox :label="1">
                            腕表
                        </el-checkbox>
                        <el-checkbox :label="2">
                            箱包
                        </el-checkbox>
                        <el-checkbox :label="3">
                            首饰
                        </el-checkbox>
                        <el-checkbox :label="4">
                            钻石
                        </el-checkbox>
                    </el-checkbox-group>
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
            }
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

    mounted() {
        // console.info(this.$router, 11111)
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

