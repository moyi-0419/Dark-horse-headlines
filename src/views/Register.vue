<template>
  <div class="register">
    <headerItem></headerItem>
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="userName">
      <hminput
        placeholder="用户名/手机号码"
        type="text"
        v-model="userName"
        :rules="/^1\d{4,10}$/"
        err-msg="账号格式不正确"
      ></hminput>
    </div>
    <div class="nickName">
      <hminput
        placeholder="昵称"
        type="text"
        v-model="userNick"
        :rules="/^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,10}$/"
        err-msg="昵称不合法"
      ></hminput>
    </div>
    <div class="password">
      <hminput
        placeholder="密码"
        type="password"
        v-model="userPassword"
        :rules="/^\w{3,9}$/"
        err-msg="密码格式不正确"
      ></hminput>
    </div>
    <div class="button-hm">
      <hmbutton @click="registerClick">注册</hmbutton>
    </div>
  </div>
</template>

<script>
import hminput from 'components/hm-input'
import hmbutton from 'components/hm-button'
export default {
  data() {
    return {
      userName: null,
      userNick: null,
      userPassword: null
    }
  },
  props: [],
  components: {
    hminput,
    hmbutton
  },
  methods: {
    async registerClick(e) {
      const res = await this.$axios.post(`http://localhost:3000/register`, {
        username: this.userName,
        nickname: this.userNick,
        password: this.userPassword
      })
      console.log(res)
      const { message, statusCode } = res.data

      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.userName
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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
}
</style>
