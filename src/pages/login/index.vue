<template>
    <div class="login-container">
        <div class="login-title">
            <img src="@/assets/images/login/title.png">
        </div>
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">
                    欢迎登录
                </h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <img src="@/assets/images/login/dengluyonghuming.png">
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入用户名称"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <img src="@/assets/images/login/icon_mima.png">
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="请输入登录密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-form-item prop="username" class="itme-yanzhengma">
                <span class="svg-container">
                    <img src="@/assets/images/login/yanzhengma.png">
                </span>
                <el-input
                    ref="yanzhengma"
                    v-model="loginForm.yanzhengma"
                    placeholder="请输入验证码"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
                <img class="yanzhengma-img" src="@/assets/images/login/yanzhengma.png">
            </el-form-item>

            <el-button class="login-btn" :loading="loading" @click.native.prevent="handleLogin">
                登 录
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin',
                password: '111111',
                yanzhengma: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            redirect: undefined,
            otherQuery: {}
        }
    },
    watch: {
        $route: {
            handler(route) {
                const query = route.query
                if (query) {
                    this.redirect = query.redirect
                    this.otherQuery = this.getOtherQuery(query)
                }
            },
            immediate: true
        }
    },
    created() {

    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus()
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus()
        }
    },
    destroyed() {
    },
    methods: {
        /* eslint-disable */ 
        checkCapslock({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                    this.capsTooltip = true
                } else {
                    this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    this.loading = true
                    const { roles } = await this.$store.dispatch('user/getInfo')
                    await this.$store.dispatch(
                        'permission/generateRoutes',
                        roles
                    )
                    this.$router.push({ path: '/home/detail', query: this.otherQuery })
                    // this.$store.dispatch('user/login', this.loginForm)
                    //     .then(() => {
                    //         this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                    //         this.loading = false
                    //     })
                    //     .catch(() => {
                    //         this.loading = false
                    //     })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#FFFFFF;
$light_gray:#999999;
$cursor: #999999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    font-size: 16px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 50px;
      line-height: 50px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item__content {
    height: 50px;
  }
  .el-form-item {
    border: 1px solid #F3F3F3;
    background: $bg;
    border-radius: 5px;
    color: #999999;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .itme-yanzhengma {
    width: 291px;
    position: relative;
    .yanzhengma-img {
      width: 103px;
      height: 32px;
      position: absolute;
      right: -110px;
      top: 9px;
    }
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_black:#333333;
$bg:#ffffff;

.login-container {
  height: 100%;
  width: 100%;
  background: url('../../assets/images/login/bg.png') center center / cover no-repeat;
  object-fit: fill;
  overflow: hidden;
  .login-title {
    margin-top: 19.444vh;
    margin-bottom: 52px;
    img {
      width: 43.906vw;
      margin: 0 auto;
      display: block;
    }
  }
  .login-form {
    width: 610px;
    padding: 60px 104px 60px 106px;
    margin: 0 auto;
    overflow: hidden;
    background: $bg;
  }
  .svg-container {
    color: #999999;
    vertical-align: middle;
    width: 30px;
    height: 50px;
    box-sizing: border-box;
    display: inline-block;
    img {
      width: 20px;
      margin-left: 15px;
      margin-top: 14px;
    }
  }

  .title-container {
    .title {
      font-size: 24px;
      color: $light_black;
      margin: 0 auto 37px auto;
      text-align: center;
      font-weight: 600;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-btn {
    background: #005751;
    font-size: 16px;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    color: $bg;
  }

}
</style>
