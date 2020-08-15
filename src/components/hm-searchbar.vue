<template>
  <div class="searchbar">
    <div class="box">
      <!-- iconfont -->
      <div class="left" @click="$router.go(-1)">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <!-- 搜索条 -->
      <div class="content">
        <div class="input">
          <i class="iconfont iconsearch"></i>
          <input type="text" placeholder="通灵兽消失术" />
        </div>
      </div>
      <!-- button -->
      <div class="right">
        <button>搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.searchbar {
  .box {
    display: flex;
    line-height: 40px;
    padding: 0 15px;
    margin-top: 10px;
    .left {
      i {
        font-weight: 600;
        font-size: 20px;
        margin-right: 10px;
      }
    }
    .content {
      flex: 1;
      position: relative;
      i {
        font-size: 18px;
        position: absolute;
        top: 2px;
        left: 10px;
      }
      .input {
        text-align: center;
        input {
          width: 100%;
          border-radius: 20px;
          border: 1px solid #ccc;
          padding: 0 35px;
        }
      }
    }
    .right {
      color: #5e5e5e;
      button {
        height: 20px;
        font-weight: 550;
        line-height: 20px;
        margin-left: 10px;
      }
    }
  }
}
</style>