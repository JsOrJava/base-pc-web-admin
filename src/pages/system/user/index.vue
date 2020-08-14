<template>
    <div class="admin-warpper f-skin-bg pd-20">
        <el-container>
            <el-aside class="wdith-240">
                <user-info 
                    :form-obj.sync="adminConfig.formObj" 
                    :roles="roles"
                    @getTableList="getTableList"
                    @refreshData="getPageUsers"
                />
            </el-aside>
            <el-main>
                <div class="mb-20">
                    <span>角色：</span>
                    <el-select v-model="queryParams.roleId" placeholder="所有" class="mr-10">
                        <el-option label="所有" :value="null" />
                        <el-option v-for="ele in roles" :key="ele.id" :label="ele.name" :value="ele.id" />
                    </el-select>
                    <span>管理员用户名：</span>
                    <el-input
                        v-model="queryParams.name"
                        clearable
                        class="wdith-200 mr-10"
                        placeholder="请输入管理员用户名"
                    />
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
                    <el-table-column align="center" label="操作" width="360">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="handleUpdatePassword(scope.row)">
                                修改密码
                            </el-button>
                            <el-button
                                :type="scope.row.status === 'disable' ? 'success' : 'danger'" 
                                @click="handleStatus(scope.row)"
                            >
                                {{ scope.row.status ? '禁用' : '恢复' }}
                            </el-button>
                            <el-button type="primary" @click="handleUpdate(scope.row)">
                                编辑
                            </el-button>
                            <el-button type="danger" @click="handleDelete(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="编号" prop="userId" />
                    <el-table-column align="center" label="用户名" prop="username" />
                    <el-table-column align="center" label="昵称" prop="nick" />
                    <el-table-column align="center" label="角色" prop="roleName" />
                    <el-table-column align="center" label="图片" prop="avatar">
                        <template slot-scope="scope">
                            <img class="f-img-width" :src="scope.row.avatar">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态" prop="status">
                        <template slot-scope="scope">
                            {{ scope.row.status === 'enable' ? '有效' : '停用' }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="手机号" prop="phone" />
                    <el-table-column align="center" label="最后登录时间" prop="lastLoginTime">
                        <template slot-scope="scope">
                            {{ parseTime(scope.row.lastLoginTime) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="备注" prop="note" />
                </el-table>

                <!-- 分页 -->
                <pagination-tool 
                    :page-data="pageParams" 
                    @handleSizeChange="handleSizeChange" 
                    @handleCurrentChange="handleCurrentChange"
                />
            </el-main>
        </el-container>
    </div>
</template>

<script>

import UserInfo from './components/User'
import { UpdatePasswordModal } from './popup'
import { parseTime } from '@/utils'
import { getPageUsers } from '@/api/system/user'

export default {
    name: 'admin',
    components: { UserInfo },
    data() {
        return {
            tableMethod: 'getPageUsers',
            listLoading: false,
            queryParams: {
                name: null,
                roleId: null
            },
            tableData: [],
            roles: [],
            adminConfig: {
                formObj: null
            },
            updatePasswordConfig: {
                show: false,
                formObj: null
            },
            parseTime
        }
    },

    created() {
        this.getTableList()
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
        handleUpdatePassword(row) {
            UpdatePasswordModal.popup().then(res => {
                this.getPageAdmins()
            })
        },
        handleUpdate({ id }) {
            this.getDetailAdmin(id)
        },
        async getDetailAdmin(id) {
            const res = await getDetailAdmin(id)
            this.adminConfig.formObj = res.data || {}
        },
        async handleDelete({ id }) {
            await this._deleteRecord('是否要删除该管理员吗?')
            this.deleteAdmin(id)
        },
        async deleteAdmin(id) {
            await deleteAdmin(id)
            this.$message.success('删除成功')
            this.isResetPageSize()
            this.getPageAdmins()
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
        async getPageUsers() {
            try {
                this.listLoading = true
                const res = await getPageUsers(this.queryParams)
                this.tableData = res.data.records || []
                this.pageParams.total = Number.parseInt(res.data.total)
                this.listLoading = false
            } catch (e) {
                this.listLoading = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    /deep/ .el-main {
        padding-top: 0;
        padding-right: 0;
    }
</style>