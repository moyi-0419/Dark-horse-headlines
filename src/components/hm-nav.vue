<template>
  <div class="hmnav" @click="fn">
    <div class="left">{{ name }}</div>
    <div class="center">{{ desc }}</div>
    <div class="right">
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '我的关注'
    },
    desc: {
      type: String
    }
  },
  methods: {
    fn(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.hmnav {
  display: flex;
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0px 15px;
  .left {
    font-size: 15px;
    color: rgb(8, 8, 8);
  }
  .center {
    flex: 1;
    text-align: right;
    font-size: 12px;
  }
  .right {
    padding: 0 10px;
  }
}
</style>
