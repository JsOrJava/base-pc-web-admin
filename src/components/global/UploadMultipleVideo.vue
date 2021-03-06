/**
 * @Description: 上传个视频 - 核心思想复杂类型引用类型公用同一个指针
*/
<template>
    <div class="upload-file__wrapper clear">
        <template v-for="(ele, index) in faceUrlList">
            <div :key="index" class="video-wh fl mr10">
                <video class="child" :src="ele.url" controls="controls">
                    您的浏览器不支持 video 标签。
                </video>
                <i class="el-icon-circle-plus-outline expanded-icon u-btn__cursor--p" title="放大视频" @click="handlePictureCardPreview(ele)" />
                <i class="el-icon-delete delete-icon u-btn__cursor--p" title="删除视频" @click="handleRemove(ele)" />
            </div>
        </template>
        <el-upload
            class="fl mr10"
            :class="faceUrlList.length >=limit ? 'conceal--upload__image' : ''"
            accept=".mp4,.ogg"
            :headers="headers_"
            :action="''"
            :http-request="getAuthorizationT"
            :data="dataParams"
            list-type="picture-card"
            :limit="limit"
            :multiple="multiple"
            :file-list="faceUrlList"
            :show-file-list="showFileList"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-preview="handlePictureCardPreview"
        >
            <slot name="content">
                <i class="el-icon-plus" />
            </slot>
        </el-upload>
        <div v-if="false" @click="changeValue">
            {{ value_ }}
        </div>
        <el-dialog
            title="视频展示"
            top="15vh"
            width="540px"
            :visible.sync="dialogConfig.dialogVisible"
            append-to-body
        >
            <video class="w480" style="max-height: 480px;" :src="dialogConfig.dialogImageUrl" controls="controls">
                您的浏览器不支持 video 标签。
            </video>
        </el-dialog>
    </div>
</template>
<script>
import { validationStorage, ossStorage } from '@/api/storage-oss'

export default {
    name: 'upload-image',
    components: {},
    props: {
        dataParams: { // 上传时附带的额外参数
            type: [Object, Number, String],
            default: () => {}
        },
        showFileList: { // 是否显示已经上传的图片
            type: [Boolean, Number, String],
            default: false
        },
        type: { // 图片所属类型 默认 1  人脸 或者 （证件 或者其他 ）2
            type: [Number, String],
            default: 1
        },
        limit: { // 限制图片上传数量 - 默认三张
            type: [Number, String],
            default: 3
        },
        multiple: {
            type: [Boolean, Number, String],
            default: true
        },
        mb: { // 限制图片上传大小 单位 M  人脸400kb默认
            type: [Number, String],
            default: 400
        },
        photoList: { // 要处理的图片集合
            type: [Array, Object],
            default: () => [
                {
                    url: '',
                    fileId: ''
                }
            ]
        },
        headers: { // 暂时废弃
            type: [Object, Boolean],
            default: () => {}
        },
        actionvalue: { // 暂时废弃
            type: [String],
            default: ''
        },
        formValidateObj: { // 表单图片验证
            type: [Object],
            default: () => {}
        },
        value: { // v-model语法模拟
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            faceUrlList: [], // 图片集合
            // 弹框参数
            dialogConfig: {
                dialogVisible: false, // 是否显示
                dialogImageUrl: '' // 图片地址
            }
        }
    },
    computed: {
    // 测试v-model 语法糖
        value_: {
            set(val) {
                this.$emit('input', val)
            },
            get() {
                return this.value
            }
        }
    },
    watch: {
    // 监听photoList的改变
        photoList: {
            handler(val, oldVal) {
                this.faceUrlList = val
            },
            deep: true
        }
    },
    mounted() {
    // 默认赋值
        this.faceUrlList = this.photoList
    },
    methods: {
    // 改变值
        changeValue() {
            this.value_ = !this.value_
            this.$emit('change', this.value_)
        },
        // 图片上传超过限制
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        // 上传图片
        async getAuthorizationT(item) {
            try {
                let res = await validationStorage(item.file.type)
                const formData = new FormData()
                const ossUrl = res.data.data.url
                const arr = ['OSSAccessKeyId', 'Signature', 'callback', 'key', 'policy', 'Content-Type']
                arr.forEach(neItem => {
                    formData.append(neItem, res.data.data[neItem])
                })
                formData.append('file', item.file)
                let ossRes = await ossStorage(ossUrl, formData)
                if (ossRes.data.errno === 0) {
                    this.faceUrlList.push(
                        { url: ossRes.data.data.url,
                            fileId: ossRes.data.data.fileId,
                            uid: ossRes.data.data.fileId, 
                            name: item.file.name }
                    )
                    // 对外开发添加
                    // this.faceUrlList 最新图片集合
                    // file新增的图片 - 后期可以针对单独触发方法 todo
                    this.$emit('changePhoto', this.faceUrlList, item.file)
                } else {
                    this.$message.error(ossRes.data.errmsg)
                }
            } catch (err) {
                this.$message.error('授权失败，请重新授权')
            }
        },
        // 删除文件
        handleRemove(file, fileList) {
            let temp = this.faceUrlList
            temp.forEach((ele, index) => {
                if (ele.url === file.url) {
                    this.faceUrlList.splice(index, 1)
                    this.$message({
                        message: '照片删除成功',
                        type: 'success'
                    })
                }
            })
            // 对外开发删除
            // this.faceUrlList 剩余图片集合
            // file被删除的图片 - 后期可以针对单独触发方法 todo
            this.$emit('changePhoto', this.faceUrlList, file)
        },
        // 点击文件列表中已上传的文件时的钩子
        handlePictureCardPreview(file) {
            this.dialogConfig.dialogImageUrl = file.url
            this.dialogConfig.dialogVisible = true
        },
        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        handleChange(file, fileList) {
        }
    }
}
</script>
<style lang="scss" scoped>
  .upload-file__wrapper {
    /deep/ .el-upload--picture-card{
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      line-height: 146px;
      vertical-align: top;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
    }
    .conceal--upload__image /deep/ .el-upload--picture-card {
      display: none;
    }
    .video-wh {
      width: 148px;
      height: 148px;
      position: relative;
      .child {
        width: 100%;
        height: 100%;
      }
      .expanded-icon {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 18px;
        color: green;
        background-color: #d8dce5;
      }
      .delete-icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 18px;
        color: red;
        background-color: #d8dce5;
      }
    }
  }
</style>
