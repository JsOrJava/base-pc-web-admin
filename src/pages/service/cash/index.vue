<template>
    <div class="brand-wrapper f-skin-bg pd-20">
        <el-form inline class="mb20">
            <el-form-item label="编号：">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入品牌名称" 
                />
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入品牌名称" 
                />
            </el-form-item>
            <el-form-item label="提交时间：">
                <el-date-picker
                    v-model="queryParams.time"
                    end-placeholder="结束日期"
                    type="datetimerange"
                    unlink-panels
                    start-placeholder="开始日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                />
            </el-form-item>
            <el-form-item label="所属类目：">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入品牌名称" 
                />
            </el-form-item>
            <el-form-item label="所属品牌：">
                <el-input 
                    v-model="queryParams.name" 
                    clearable 
                    class="wdith-200" 
                    placeholder="请输入品牌名称" 
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
            <el-table-column align="center" label="请求编号" prop="cName" />
            <el-table-column align="center" label="名称" prop="cName" />
            <el-table-column align="center" label="图片" prop="images">
                <template slot-scope="scope">
                    <img :src="scope.row.image" class="t-img--w200">
                </template>
            </el-table-column>
            <el-table-column 
                align="center" 
                label="类目" 
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
            <el-table-column align="center" label="品牌" prop="images">
                <template slot-scope="scope">
                    <img :src="scope.row.image" class="t-img--w200">
                </template>
            </el-table-column>
            <el-table-column align="center" label="参数详情" prop="images">
                <template slot-scope="scope">
                    <img :src="scope.row.image" class="t-img--w200">
                </template>
            </el-table-column>
            <el-table-column align="center" label="图片详情" prop="images">
                <template slot-scope="scope">
                    <img :src="scope.row.image" class="t-img--w200">
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户昵称" prop="cName" />

            <el-table-column align="center" label="手机号" prop="remark" />

            <el-table-column align="center" label="微信号" prop="remark" />

            <el-table-column align="center" label="提交时间" prop="remark" />

            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
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
    },

    methods: {
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
