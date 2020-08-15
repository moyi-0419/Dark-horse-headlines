<template>
  <div class="home">
    <div class="header-hm">
      <div class="left">
        <slot name="textLeft"></slot>
      </div>
      <div class="content">
        <slot name="textContent"></slot>
      </div>
      <div class="right">
        <slot name="textRight"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {}
}
</script>

<style lang="scss" scoped>
.home {
  .header-hm {
    display: flex;
    background-color: #f2f2f2;
    border-bottom: 1px solid rgb(168, 166, 166);
    .left {
      width: 60px;
      height: 44px;
      line-height: 44px;
      text-align: center;
    }
    .content {
      flex: 1;
      text-align: center;
      line-height: 44px;
      color: #333333;
      font-size: 16px;
      font-weight: 600;
    }
    .right {
      width: 60px;
      height: 44px;
    }
  }
}
</style>
