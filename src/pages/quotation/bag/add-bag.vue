<template>
    <div class="add-watch__wrapper f-skin-bg pd-20"> 
        <h3>商品信息</h3>
        <el-form ref="form" :model="form" label-width="160px">
            <section>
                <h4>主要信息</h4>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="商品名称：">
                            <el-input v-model="form.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最低行情价（￥）：">
                            <el-input v-model="form.name" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="国内售价（￥）：">
                            <el-input v-model="form.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最高行情价（￥）：">
                            <el-input v-model="form.name" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="品牌：">
                            <el-input v-model="form.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图片（点击可更换）：">
                            <upload-single-image :img-url.sync="form.name" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </section>

            <section>
                <h4>基本参数</h4>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <dsync-form-item
                            :id="form.id"
                            :key="form.name"
                            v-model="form.name"
                            :label="'款式：'"
                            :prop="'款式：'"
                            :rules="{ required: true, message: `所属${form.name}不能为空`, trigger: 'change'}"
                        />
                    </el-col>
                    <el-col :span="8">
                        <dsync-form-item
                            :id="form.id"
                            :key="form.name"
                            v-model="form.name"
                            :label="'款式：'"
                            :prop="'款式：'"
                            :rules="{ required: true, message: `所属${form.name}不能为空`, trigger: 'change'}"
                        />
                    </el-col>
                    <el-col :span="8">
                        <dsync-form-item
                            :id="form.id"
                            :key="form.name"
                            v-model="form.name"
                            :label="'款式：'"
                            :prop="'款式：'"
                            :rules="{ required: true, message: `所属${form.name}不能为空`, trigger: 'change'}"
                        />
                    </el-col>
                </el-row>
            </section>
        </el-form>
        <div class="mt-20 f-tx-center">
            <el-button @click="routerBack">
                取 消
            </el-button>
            <el-button type="primary" @click="routerBack">
                确 定
            </el-button>
        </div>
    </div>
</template>

<script>
import DsyncFormItem from './components/DsyncFormItem'

export default {
    name: 'add-watch',
    components: { DsyncFormItem },
    data() {
        return {
            form: {}
        }
    }
}
</script>