<template>
    <el-form-item v-bind="$attrs" v-on="$listeners">
        <el-select v-model="labelVal" filterable>
            <el-option
                v-for="item in configList"
                :key="item.id"
                :label="item.name"
                :value="item.id" 
            />
        </el-select>
    </el-form-item>
</template>

<script>
// import { getCategoryById } from '@/api/goods'

export default {
    name: 'dsync-form-item',
    // 设置绑定参数
    model: {
        prop: 'value',
        event: 'selected'
    },
    props: {
    // 接收绑定参数
        value: [String, Number],
        // 输入框宽度
        width: String,
        // 输入框宽度
        method: {
            type: [String],
            default: 'getCategoryById'
        },
        // id
        id: {
            type: [Number, String],
            default: ''
        }
    },
    data() {
        return {
            labelVal: null, // 显示值
            configList: []
        }
    },
    watch: {
        labelVal(val) {
            if (!val) {
                this.$emit('selected', null)
            } else {
                this.$emit('selected', val)
            }
        },
        value(val) {
            this.labelModel = val
        }
    },
    created() {
        this.id && this.getDataList()
    },
    methods: {
        async getDataList() {
            try {
                const res = await getCategoryById({ id: this.id })
                this.configList = res.data || []
            } catch (err) {
                this.$message.error(err && err.msg)
            }
        }
    }
}
</script>

<style scoped>

</style>
