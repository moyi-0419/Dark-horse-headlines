<template>
  <div class="login">
    <headerItem></headerItem>
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hminput
        placeholder="请输入账号/手机号"
        type="text"
        v-model="userName"
        :rules="nameRules"
        err-msg="请输入正确的账号"
      ></hminput>
    </div>
    <div class="password">
      <hminput
        placeholder="请输入密码"
        type="password"
        v-model="userPassword"
        :rules="passRules"
        err-msg="请输入正确的密码"
      ></hminput>
    </div>
    <div class="login-btn">
      <hmbutton @click="clickLogin">登录</hmbutton>
    </div>
    <div class="register">
      没有账号？立即
      <router-link to="register">注册</router-link>
    </div>
  </div>
</template>

<script>
import hminput from 'components/hm-input'
import hmbutton from 'components/hm-button'
export default {
  created() {
    console.log(this.$route)
    const { username } = this.$route.params
    if (username) {
      this.userName = username
    }
  },
  data() {
    return {
      userName: '',
      userPassword: '',
      nameRules: /^1\d{4,10}$/,
      passRules: /^\w{3,9}$/
    }
  },
  components: {
    hminput,
    hmbutton
  },
  methods: {
    async clickLogin(value) {
      if (!this.nameRules.test(this.userName)) {
        return this.$toast('请输入正确的手机号')
      }
      if (!this.passRules.test(this.userPassword)) {
        return this.$toast('请输入正确的密码')
      }

      const res = await this.$axios.post(`http://localhost:3000/login`, {
        username: this.userName,
        password: this.userPassword
      })
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        // console.log('登陆成功')
        this.$toast.success('验证成功')
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user-id', user.id)
        this.$router.push({
          name: 'home',
          params: {}
        })
      } else {
        // console.log('登录失败')
        this.$toast.fail('验证失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  .close {
    i {
      font-size: 27px;
    }
  }
  .logo {
    text-align: center;
    i {
      font-size: 126px;
      color: #d81e06;
    }
  }
  .register {
    padding: 15px;
    font-size: 16px;
    text-align: center;
    a {
      color: rgb(196, 17, 106);
    }
  }
}
</style>
