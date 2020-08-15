
<template>
  <div id="app">
    <router-view>
      <login></login>
    </router-view>
  </div>
</template>

<script>
import Login from 'views/Login/Login.vue'
import Regist from 'views/Register.vue'
export default {
  components: {
    Login,
    Regist
  }
}
</script>

<style lang="scss">
@import url('./style/base.css');
@import url('./style/iconfont.css');
</style>
