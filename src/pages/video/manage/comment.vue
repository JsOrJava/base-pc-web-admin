<template>
    <div class="brand-wrapper f-skin-bg pd-20">
        <el-form inline class="mb20">
            <el-form-item label="用户昵称:">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入用户昵称" 
                />
            </el-form-item>
            <el-form-item label="评论内容">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入品牌名称" 
                />
            </el-form-item>
            <el-form-item label="评论时间：">
                <el-date-picker
                    v-model="queryParams.time"
                    end-placeholder="结束日期"
                    type="datetimerange"
                    unlink-panels
                    start-placeholder="开始日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                />
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    icon="el-icon-search" 
                    @click="getTableList"
                >
                    查找
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
            <el-table-column align="center" label="评论ID" prop="cName" />
            <el-table-column align="center" label="头像" prop="cName" />
            <el-table-column align="center" label="昵称" prop="cName" />
            <el-table-column align="center" label="用户ID" prop="remark" />
            <el-table-column align="center" label="内容" prop="remark" />
            <el-table-column align="center" label="评论时间" prop="remark" />

            <el-table-column align="center" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleReplyDetail(scope.row)">
                        回复详情
                    </el-button>
                    <el-button type="primary" size="mini" @click="handleEditBrand(scope.row)">
                        回复
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
import { ReplyModal } from './popup'

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
        handleReplyDetail() {
            this.$router.push({ name: 'video-manage-detail' })
        },
        // 添加品牌
        handleCreateBrand() {
            ReplyModal.popup().then(res => {})
        },
        // 编辑品牌
        handleEditBrand(ele) {
            ReplyModal.popup({ formObj: { ...ele } }).then(res => {}) 
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
