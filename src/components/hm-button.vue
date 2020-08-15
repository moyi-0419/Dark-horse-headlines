<template>
  <button class="hm-botton" @click="btnClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    btnClick(e) {
      // console.log(`登录成功`)
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-botton {
  width: 100%;
  height: 45px;
  margin-top: 20px;
  background-color: #cc3300;
  color: #f8e4dd;
  border-radius: 20px;
  font-size: 18px;
}
</style>