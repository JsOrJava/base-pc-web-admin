<template>
    <form-dialog
        :title="`${formObj?'编辑':'新增'}首饰类别`"
        :show.sync="show"
        :handle-close="handleCancel"
        width="50%"
        top="5vh"
    >
        <div slot="content" class="m-form__height-300">
            <el-form ref="brandForm" :model="brandForm" label-width="120px">
                <el-form-item label="app类型:" prop="appType" :rules="{required:true,message:'请选择一个类型',trigger:'change'}">
                    <el-select v-model="brandForm.appType" size="small" placeholder="请选择设备">
                        <el-option v-for="item in device" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="app版本:" prop="appVersion" :rules="{required:true,message:'请输入版本',trigger:'blur'}">
                    <el-input v-model="brandForm.appVersion" placeholder="请输入版本" width="500" />
                </el-form-item>
                <el-form-item label="包名:" prop="packageName" :rules="{required:true,message:'请输入包名',trigger:'blur'}">
                    <el-input v-model="brandForm.packageName" placeholder="请输入包名" width="500" />
                </el-form-item>
                <el-form-item label="app下载地址:" prop="downloadUrl" :rules="{required:true,message:'请输入下载地址',trigger:'blur'}">
                    <el-input v-model="brandForm.downloadUrl" placeholder="请输入下载地址" />
                </el-form-item>
                <el-form-item label="审核标准:" prop="audit" :rules="{required:true,message:'请选择审核结果',trigger:'change'}">
                    <el-select v-model="brandForm.audit" size="small" placeholder="请选择审核结果">
                        <el-option v-for="item in assign" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>

                <el-form-item label="是否需要强更:" prop="updateStyle" :rules="{required:true,message:'请选择强制更新类型',trigger:'change'}">
                    <el-select v-model="brandForm.updateStyle" size="small" placeholder="请选择审核结果">
                        <el-option v-for="item in updateStyles" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
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
            device: [
                {
                    id: 0,
                    name: '安卓'
                },
                {
                    id: 1,
                    name: 'ios'
                }
            ],
            assign: [
                {
                    id: 0,
                    name: '审核中'
                },
                {
                    id: 1,
                    name: '审核成功'
                }
            ],
            updateStyles: [
                {
                    id: 1,
                    name: '推荐更新'
                },
                {
                    id: 2,
                    name: '强制更新'
                }
            ]
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

