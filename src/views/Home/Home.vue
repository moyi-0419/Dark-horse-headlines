<template>
  <div class="hm-home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search" @click="searchClick">
        <i class="iconfont iconsearch"></i>
        <span>搜索</span>
      </div>
      <div class="right" @click="goProfile">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goProfile() {
      this.$router.push('/profile')
    },
    searchClick() {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-home {
  .header {
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: #ff0000;
    color: #fff;
    text-align: center;
    .left {
      width: 70px;
      i {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      background-color: rgba(255, 255, 255, 0.5);
      height: 36px;
      line-height: 36px;
      margin-top: 7px;
      border-radius: 18px;
      text-align: center;
      span {
        font-style: 14px;
        margin-right: 5px;
      }
    }
    .right {
      width: 50px;
      i {
        font-size: 24px;
      }
    }
  }
}
</style>