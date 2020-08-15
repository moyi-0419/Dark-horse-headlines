<template>
  <div class="hm-input">
    <input
      class="inpt"
      :class="status"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="upInput"
    />
    <span class="tips" v-if="TestFlag" :class="status">{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TestFlag: false,
      status: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  methods: {
    upInput(e) {
      const value = e.target.value
      this.$emit('input', e.target.value)
      if (e.target.value === '') {
        this.TestFlag = false
        this.status = ''
        return
      }

      if (this.rules.test(value)) {
        this.status = 'success'
        this.TestFlag = false
      } else {
        this.status = 'error'
        this.TestFlag = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-input {
  position: relative;
  padding-bottom: 20px;
  .inpt {
    width: 100%;
    height: 40px;
    background: transparent;
    border-bottom: 1px solid #666;
    font-size: 18px;
    &.success {
      border-color: green;
    }
    &.error {
      border-color: red;
    }
  }
  .tips {
    color: red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
