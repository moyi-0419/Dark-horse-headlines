<template>
  <div class="focus">
    <div class="images">
      <img :src="isImageSrc" alt />
    </div>
    <div class="center">
      <p>
        <slot name="userNick"></slot>
      </p>
      <span>
        <slot name="time"></slot>
      </span>
    </div>
    <div class="off-focus">
      <button @click="btnClick">取消关注</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      image: ''
    }
  },
  created() {
    // console.log(this.list)
  },
  computed: {
    isImageSrc() {
      return this.$axios.defaults.baseURL + this.list
    }
  },
  methods: {
    btnClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.focus {
  display: flex;
  //   margin-top: 10px;
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #ccc;
  .images {
    width: 60px;
    height: 60px;
    margin-top: 10px;
    margin-left: 15px;
    text-align: center;
    line-height: 60px;
    img {
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    position: relative;
    padding-left: 30px;
    line-height: 60px;
    font-size: 16px;
    span {
      position: absolute;
      top: 20px;
      font-size: 12px;
      color: grey;
    }
  }
  .off-focus {
    padding-right: 20px;
    button {
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      background-color: #e1e1e1;
      border-radius: 20px;
      color: #333;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>
