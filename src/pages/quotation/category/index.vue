<template>
    <div class="brand-wrapper f-skin-bg pd-20">
        <el-form inline class="mb20">
            <el-form-item>
                <el-button 
                    type="success" 
                    icon="el-icon-edit" 
                    @click="handleCreateBrand"
                >
                    添加
                </el-button>
            </el-form-item>
        </el-form>

        <el-table
            v-loading="listLoading"
            :data="tableData"
            element-loading-text="正在查询中..."
            border
            fit
            highlight-current-row
        >
            <el-table-column align="center" label="类别ID" prop="cName" />
            <el-table-column align="center" label="类别名称" prop="cName" />
            <el-table-column align="center" label="备注" prop="remark" />

            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEditBrand(scope.row)">
                        编辑
                    </el-button>
                    <el-button type="danger" size="mini" @click="handleDeleteBrand(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination-tool :page-data="pageParams" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    </div>
</template>

<script>
// import { getLuReclaimBrand, deleteLuReclaimBrand } from '@/api/recovery'
import { AddCategoryModal } from './popup'

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
            tableData: []
        }
    },

    created() {
        // this.check()
        this.handleCreateBrand()
    },

    methods: {
        // 添加品牌
        handleCreateBrand() {
            AddCategoryModal.popup().then(res => {})
        },
        // 编辑品牌
        handleEditBrand(ele) {
            AddCategoryModal.popup({ formObj: { ...ele } }).then(res => {}) 
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
