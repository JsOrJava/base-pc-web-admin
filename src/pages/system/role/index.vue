<template>
    <div class="role-warpper f-skin-bg pd-20">
        <el-container>
            <el-aside class="wdith-240">
                <role-info :form-obj.sync="roleConfig.formObj" @getTableList="getTableList" />
            </el-aside>
            <el-main>
                <!-- 查询结果 -->
                <el-table
                    v-loading="listLoading"
                    class="mb-20"
                    element-loading-text="正在查询中..."
                    border
                    :data="tableData"
                    highlight-current-row
                    :tooltip-effect="'dark'"
                >
                    <el-table-column align="center" label="操作" width="260">
                        <template slot-scope="scope">
                            <el-button :type="scope.row.status === 'disable' ? 'success' : 'danger'" @click="handleStatus(scope.row)">
                                {{ scope.row.status === 'enable' ? '禁用' : '恢复' }}
                            </el-button>
                            <el-button type="primary" @click="handleUpdate(scope.row)">
                                编辑
                            </el-button>
                            <el-button type="danger" @click="handleDelete(scope.row.id)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="编号" prop="id" />

                    <el-table-column align="center" label="角色" prop="name" />

                    <el-table-column align="center" label="用户数" prop="number" />

                    <el-table-column align="center" label="备注" prop="note" show-overflow-tooltip />

                    <el-table-column align="center" label="角色状态" prop="status">
                        <template slot-scope="scope">
                            {{ scope.row.status === 'enable' ? '可用' : '禁用' }}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="创建时间" prop="createTime">
                        <template slot-scope="scope">
                            {{ parseTime(scope.row.createTime) }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import RoleInfo from './components/Role'
import { parseTime } from '@/utils'
import { 
    getAllRoles, 
    deleteRole, 
    forbidRole, 
    getDetailRole } from '@/api/system/role'

export default {
    name: 'role',
    components: { RoleInfo },
    data() {
        return {
            tableMethod: 'getAllRoles',
            listLoading: false,
            queryParams: {
                sort: 'add_time',
                order: 'desc'
            },
            tableData: [],
            roleConfig: {
                formObj: null
            },
            parseTime
        }
    },

    created() {
        this.getTableList()
    },
    
    methods: {
        async handleStatus(row) {
            const msg = row.status === 'enable' ? '禁用' : '恢复'
            const status = row.status === 'enable' ? 'disable' : 'enable'
            const { id } = row
            await this._deleteRecord(`是否要${msg}该角色?`, `确认${msg}`)
            this.forbidRole({ id, status })
        },
        async forbidRole(data) {
            await forbidRole(data)
            this.$message.success('操作成功')
            this.getTableList()
        },
        handleUpdate({ id }) {
            this.getDetailRole(id)
        },
        async getDetailRole(id) {
            const res = await getDetailRole(id)
            this.roleConfig.formObj = res.data || {}
        },
        async handleDelete(id) {
            await this._deleteRecord('是否要删除该角色?')
            this.deleteRole(id)
        },
        async deleteRole(id) {
            await deleteRole(id)
            this.$message.success('删除成功')   
            this.getTableList()
        },
        async getAllRoles() {
            this.listLoading = true
            const res = await getAllRoles()
            this.tableData = res.data || []
            this.listLoading = false
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