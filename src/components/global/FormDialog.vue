<template>
    <el-dialog
        v-bind="$attrs"
        :title="title"
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        v-on="$listeners"
    >
        <div>
            <slot name="content" />
        </div>

        <div slot="footer" class="dialog-footer">
            <slot name="footer" />
        </div>
    </el-dialog>
</template>

<script>

export default {
    name: 'index',
    props: {
        show: {
            type: [Boolean],
            default: false
        },
        title: {
            type: [String],
            default: '提示'
        },
        width: {
            type: [String],
            default: '50%'
        },
        handleClose: {
            type: [Function, Object],
            default() { this.$emit('update:show', false) }
        }
    }

}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #cecece;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__footer {
    padding: 0 20px 20px;
    border-top: 1px solid #cecece;
  }
  .dialog-footer {
    padding-top: 20px;
    text-align: right;
  }
}
</style>
