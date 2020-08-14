<template>
    <div class="custom-warpper f-skin-bg pd-20">
        <div class="mb-20">
            <span>客户手机号：</span>
            <el-input
                v-model="queryParams.name"
                clearable
                class="wdith-200 mr-10"
                placeholder="请输入管理员用户名"
            />
            <span>账户状态：</span>
            <el-select v-model="queryParams.roleId" placeholder="所有" class="mr-10">
                <el-option label="所有" :value="null" />
                <el-option v-for="ele in roles" :key="ele.id" :label="ele.name" :value="ele.id" />
            </el-select>
            <el-button
                class="mr-10"
                type="primary"
                icon="el-icon-search"
                @click="getTableList"
            >
                查找
            </el-button>
        </div>
        <el-table
            v-loading="listLoading"
            class="mb-20"
            size="medium"
            element-loading-text="正在查询中..."
            border
            :data="tableData"
            highlight-current-row
        >
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button :type="scope.row.status === 'disable' ? 'success' : 'danger'" @click="handleStatus(scope.row)">
                        {{ scope.row.status === 'enable' ? '禁用' : '恢复' }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="客户id" prop="id" />
            <el-table-column label="客户手机号" prop="username" />
            <el-table-column label="客户名" prop="nick" />
            <el-table-column label="头像" prop="image">
                <template slot-scope="scope">
                    <img class="f-img-width" :src="scope.row.image">
                </template>
            </el-table-column>
            <el-table-column label="微信号" prop="phone" />
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    {{ scope.row.status === 'enable' ? '有效' : '停用' }}
                </template>
            </el-table-column>
            <el-table-column label="注册时间" prop="updateTime">
                <template slot-scope="scope">
                    {{ parseTime(scope.row.updateTime) }}
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination-tool class="f-tx-right" :page-data="pageParams" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    </div>
</template>

<script>

import { parseTime } from '@/utils'

export default {
    name: 'admin',
    data() {
        return {
            tableMethod: 'getPageAdmins',
            listLoading: false,
            queryParams: {
                name: null,
                roleId: null
            },
            tableData: [],
            roles: [],
            parseTime
        }
    },

    created() {
        // this.getTableList()
        // this.getAllRoles()
    },
    
    methods: {
        async handleStatus(row) {
            const msg = row.status === 'enable' ? '禁用' : '恢复'
            const status = row.status === 'enable' ? 'disable' : 'enable'
            const { id } = row
            await this._deleteRecord(`是否要${msg}该管理员`, `确认${msg}`)
            this.forbidAdmin({ id, status })
        },
        async forbidAdmin(data) {
            await forbidAdmin(data)
            this.$message.success('操作成功')
            this.getTableList()
        },
        async getAllRoles() {
            const res = await getAllRoles()
            this.roles = res.data || []
        },
        getTableParams() {
            return {
                page: this.pageParams.currentPage,
                size: this.pageParams.pageSize,
                name: this.queryParams.name,
                roleId: this.queryParams.roleId,
            }
        },
        async getPageAdmins() {
            try {
                this.listLoading = true
                const res = await getPageAdmins(this.getTableParams())
                this.tableData = res.list || []
                this.pageParams.total = Number.parseInt(res.count)
                this.listLoading = false
            } catch (e) {
                this.listLoading = false
            }
        }
    }
}
</script>