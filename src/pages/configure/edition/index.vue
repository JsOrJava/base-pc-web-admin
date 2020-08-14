<template>
    <div class="brand-wrapper f-skin-bg pd-20">
        <el-table
            v-loading="listLoading"
            :data="tableData"
            element-loading-text="正在查询中..."
            border
            fit
            highlight-current-row
        >
            <el-table-column prop="appType" label="app类型" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.appType==0?"安卓":"ios" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="appVersion" label="app版本" align="center" />
            <el-table-column prop="packageName" label="包名" align="center" />
            <el-table-column prop="audit" label="审核标志" align="center">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.audit==0?"审核中":"审核成功" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="audit" label="是否需要强更" align="center">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.updateStyle==1?"推荐更新":scope.row.updateStyle==2 ? "强制更新" : '--' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="downloadUrl" label="app下载地址" width="120" align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEditBrand(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination-tool :page-data="pageParams" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    </div>
</template>

<script>
// import { getLuReclaimBrand, deleteLuReclaimBrand } from '@/api/recovery'
import { AddEditionModal } from './popup'

export default {
    name: 'brand',
    data() {
        return {
            method: 'getLuReclaimBrand',
            listLoading: false,
            queryParams: {
                name: null,
                category: null,
            },
            tableData: [{}]
        }
    },

    created() {
        // this.check()
        this.handleCreateBrand()
    },

    methods: {
        // 添加品牌
        handleCreateBrand() {
            AddEditionModal.popup().then(res => {})
        },
        // 编辑品牌
        handleEditBrand(ele) {
            AddEditionModal.popup({ formObj: { ...ele } }).then(res => {}) 
        },
        // 删除品牌
        async handleDeleteBrand(row) {
            await this._deleteRecord('是否确认删除该品牌')
            this.deleteLuReclaimBrand(row.id)
        },
        async deleteLuReclaimBrand(id) {
            await deleteLuReclaimBrand(id)
            this.$message.success('删除成功')
            this.check()
        },
        // 设置查询参数
        getParams() {
            return {
                ...this.queryParams,
                page: this.PAGINATION.currentPage,
                size: this.PAGINATION.pageSize
            }
        },
        // 获取品牌数据
        async getLuReclaimBrand() {
            this.tableConfig.listLoading = true
            const res = await getLuReclaimBrand(this.queryParams)
            this.tableConfig.list = res.data.records || []
            this.PAGINATION.total = Number(res.data.total)
            this.tableConfig.listLoading = false
        },
        handleFilterStatus(val) {
            this.queryParams.category = val
            this.check()
        }
    }
}
</script>
