<template>
    <div :class="{'f-tx-right': algin === 'right', 'f-tx-left': algin === 'left'}">
        <el-pagination
            v-bind="$attrs"
            background
            :current-page="pageData.currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageData.pageSize"
            :layout="pageLayout"
            :total="pageData.total"
            class="m-pagination"
            v-on="$listeners"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
export default {
    name: 'pagination-tool',
    props: {
        algin: {
            type: String,
            default: 'right'
        },
        pageLayout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        pageData: {
            type: Object,
            default: () => ({ currentPage: 0, pageSize: 20, total: 0 })
        }
    },
    data() {
        return {}
    },
    methods: {
        handleSizeChange(val) {
            const param = {
                currentPage: this.pageData.currentPage,
                pageSize: val
            }
            this.$emit('handleSizeChange', param)
        },
        handleCurrentChange(val) {
            const param = {
                currentPage: val,
                pageSize: this.pageData.pageSize
            }
            this.$emit('handleCurrentChange', param)
        }
    }
}
</script>

<style scoped>
 .m-pagination{
   bottom: 0;
   font-weight: normal;
   padding: 15px 0;
 }
</style>
