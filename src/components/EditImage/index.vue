<template>
    <div class="tinymec-pic">
        <el-button :style="{background:color,borderColor:color}" size="mini" type="primary" @click=" dialogVisible=true">
            多图上传
        </el-button>
        <form-dialog
            title="多图上传"
            :show.sync="dialogVisible"
            :handle-close="handleCancel"
            class="editor-image"
            append-to-body
        >
            <div slot="content">
                <el-upload
                    :multiple="true"
                    :file-list="fileList"
                    :show-file-list="true"
                    :on-remove="handleRemove"
                    :on-error="handleError"
                    class="editor-slide-upload"
                    action=""
                    :http-request="tinymceImgLoad"
                    list-type="picture-card"
                >
                    <el-button size="small" type="primary">
                        点击上传
                    </el-button>
                </el-upload>
            </div>
            <div slot="footer">
                <el-button size="medium" @click="handleCancel">
                    取消
                </el-button>
                <el-button size="medium" type="primary" @click="handleSubmit">
                    确定
                </el-button>
            </div>
        </form-dialog>
    </div>
</template>

<script>
import { validationStorage, ossStorage } from '@/api/storage-oss'

export default {
    name: 'edit-image',
    props: {
        color: {
            type: String,
            default: '#1890ff'
        }
    },
    data() {
        return {
            dialogVisible: false,
            fileList: [],
            listItem: ''
        }
    },
    methods: {
        // 取消操作
        handleCancel() {
            this.dialogVisible = false
            this.fileList = []
        },
        handleSubmit() {
            if (!this.fileList.length) {
                this.$message.warning('请上传至少一张图片')
                return
            }
            this.$emit('successCBK', this.fileList)
            this.handleCancel()
        },
        handleRemove(file) {
            for (let i = 0; i < this.fileList.length; i++) {
                if (this.fileList[i].url === file.url) {
                    this.fileList.splice(i, 1)
                }
            }
        },
        handleError(err, file, fileList) {
            fileList.splice(file)
        },
        tinymceImgLoad(item) {
            const _self = this
            let temp = [..._self.fileList]
            validationStorage(item.file.type).then(res => {
                const formData = new FormData()
                const ossUrl = res.data.data.url
                formData.append('OSSAccessKeyId', res.data.data.OSSAccessKeyId)
                formData.append('Signature', res.data.data.Signature)
                formData.append('callback', res.data.data.callback)
                formData.append('key', res.data.data.key)
                formData.append('policy', res.data.data.policy)
                formData.append('Content-Type', res.data.data['Content-Type'])
                formData.append('file', item.file)
                ossStorage(ossUrl, formData).then(ossRes => {
                    if (ossRes.data.code == 0) {
                        _self.listItem = {
                            url: item.file.name
                        }
                        _self.listItem.url = ossRes.data.data.url
                        _self.fileList.push(_self.listItem)
                    } else {
                        _self.fileList = [...temp]
                        _self.$message.error(ossRes.data.errmsg)
                        return
                    }
                })
            }).catch(() => {
                _self.fileList = [...temp]
                _self.$message.error('授权失败，请重新授权')
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tinymec-pic {
  position: absolute;
  right: 5px;
  top: 0px;
}
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
