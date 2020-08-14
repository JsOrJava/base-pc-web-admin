<template>
    <div class="home-wrap f-va-tx-middle">
        欢迎来到管理端 
        <el-button type="primary" @click="$router.push('/error/404')">
            进入
        </el-button>
        <p class="">
            {{ 222 | convertCurrencyFilter }}
        </p>

        <div id="home" class="mb-20">
            <h1> tinyMce的使用</h1>
            <tinymce ref="richText" v-model="form.answer" @on-upload-complete="onEditorUploadComplete" />
        </div>

        <el-table
            class="mb-20"
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination-tool 
            class="f-tx-right"
            :page-data="pageParams" 
            @handleSizeChange="handleSizeChange" 
            @handleCurrentChange="handleCurrentChange"
        />
    </div>
</template>

<script>
import tinymce from '@/components/TinyMce/index'

export default {
    name: 'index',
    components: {
        tinymce,
    },
    data() {
        return {
            content: '欢迎来到首页',
            showCounter: true, // 定时圈显示
            tableMethod: 'apiTableData',
            queryParams: {
                name: null
            },
            form: {
                mobile: null,
                image: null,
                gallerylList: []
            },
            detail: null,
            dialogVisible: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            loginForm: {
                username: 'admin',
                password: '111111'
            },
        }
    },

    created() {

        const arr = [3, 2, 4, 1, 5]
        for (let i = 0; i < arr.length - 1; i++) {
            let change = true // 交互标志
            for (let y = arr.length - 1; y > i; y--) {
                let temp = null
                if (arr[y] < arr[y - 1]) {
                    change = false
                    temp = arr[y - 1]
                    arr[y - 1] = arr[y]
                    arr[y] = temp
                }
            }
            if (change) {
                break
            }
        }


        for (let i = 0; i < arr.length; i++) {
            for (let y = 0; y < arr.length - 1 - i; y++) {
                let temp = null
                if (arr[y] > arr[y + 1]) {
                    temp = arr[y]
                    arr[y] = arr[y + 1]
                    arr[y + 1] = temp
                }
            }
        }
    },

    async mounted() {
        // const { roles } = await this.$store.dispatch('user/getInfo')
        // await this.$store.dispatch(
        //     'permission/generateRoutes',
        //     roles
        // )
    },

    methods: {
        onEditorUploadComplete(res) {
            if (res.code == 0) {
                this.$message({
                    type: 'success',
                    message: '上传成功'
                })
            } else {
                this.$message({
                    type: 'error',
                    message: res.msg
                })
            }
        },
        async handleSubmit(form) {
            await this._checkForm(this, form)
        },
        handleDelete({ date }) {
            this._deleteRecord()
        },
        getTableParams() {
            return {
                ...this.queryParams,
                page: this.pageParams.currentPage,
                size: this.pageParams.pageSize,
            }
        },
        async apiTableData() {
            const res = await Promise.resolve([])
            this.tableData = res
        },
    }
}
</script>

<style lang="scss" scoped>
    .home-wrap {
        padding: 40px;
    }
</style>