<template>
    <div class="brand-wrapper f-skin-bg pd-20">
        <el-form inline class="mb20">
            <el-form-item label="参数名称：">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入品牌名称" 
                />
            </el-form-item>
            <el-form-item label="类目级别：">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入品牌名称" 
                />
            </el-form-item>
            <el-form-item>
                <el-button 
                    class="mr-10" 
                    type="primary" 
                    icon="el-icon-search" 
                    @click="getTableList"
                >
                    查找
                </el-button>
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
            <el-table-column align="center" label="编号" prop="cName" />
            <el-table-column align="center" label="名称" prop="cName" />
            <el-table-column align="center" label="级别" prop="cName" />

            <el-table-column 
                align="center" 
                label="父类名称" 
                prop="category" 
                width="130"
            >
                <!-- 1代表腕表;2代表箱包;3代表首饰;4代表钻石 -->
                <template slot-scope="scope">
                    <template v-for="(ele) in JSON.parse(scope.row.category)">
                        {{ ['', '腕表', '箱包', '首饰', '钻石'][ele] }}
                    </template>
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否参与发布" prop="images">
                <template slot-scope="scope">
                    <img :src="scope.row.image" class="t-img--w200">
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否参与筛选" prop="images">
                <template slot-scope="scope">
                    <img :src="scope.row.image" class="t-img--w200">
                </template>
            </el-table-column>

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
import { AddParameterModal } from './popup'

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
            AddParameterModal.popup().then(res => {})
        },
        // 编辑品牌
        handleEditBrand(ele) {
            AddParameterModal.popup({ formObj: { ...ele } }).then(res => {}) 
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
