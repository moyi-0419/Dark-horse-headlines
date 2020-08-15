<template>
  <div>
    <navbar>
      <template v-slot:textContent>编辑资料</template>
      <template v-slot:textLeft>
        <div class="iconfont iconjiantou2" @click="$router.go(-1)"></div>
      </template>
    </navbar>
    <div class="useimg">
      <img :src="headimg" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <navr name="昵称" :desc="profile.nickname" @click="showName"></navr>
    <navr name="密码" desc="******" @click="showPass"></navr>
    <navr name="性别" :desc="profile.gender === 1 ? '男' : '女'" @click="showGender"></navr>
    <van-dialog v-model="isShowNick" title="修改昵称" show-cancel-button @confirm="editNick">
      <van-field v-model="Nickname" placeholder="请输入昵称" />
    </van-dialog>
    <van-dialog v-model="isShowPass" title="修改密码" show-cancel-button @confirm="editPass">
      <van-field
        v-model="password"
        placeholder="请输入新密码"
        :right-icon="isshowpassicon ? 'closed-eye' : 'eye-o'"
        :type="isshowpassicon ? 'password' : 'text'"
        @click-right-icon="changeicon"
      />
    </van-dialog>
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="Gender" direction="horizontal">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group>
    </van-dialog>
    <div class="mask" v-show="isShowMask">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
      ></vueCropper>
      <van-button class="crop" type="primary" @click="crop">确认裁剪</van-button>
      <van-button class="cancel" type="danger" @click="cancel">取消选择</van-button>
    </div>
  </div>
</template>

<script>
import Navbar from 'components/hm-Navbar'
import Navr from 'components/hm-nav.vue'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    Navbar,
    Navr,
    VueCropper
  },
  data() {
    return {
      profile: {},
      isShowMask: false,
      isShowNick: false,
      isShowPass: false,
      isShowGender: false,
      Img: '',
      Nickname: '',
      password: '',
      Gender: '',
      isshowpassicon: true,
      NickRules: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,10}$/,
      PassRules: /^\w{3,9}$/,
      option: {
        img: this.Img,
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框 ------- 需要
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },
  created() {
    this.renderDeta()
  },
  computed: {
    headimg() {
      return this.$axios.defaults.baseURL + this.profile.head_img
    }
  },
  methods: {
    async renderDeta() {
      const id = localStorage.getItem('user-id')
      const token = localStorage.getItem('token')
      const res = await this.$axios.get(`/user/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.profile = data
      }
    },
    async editprofile(editData) {
      const id = localStorage.getItem('user-id')
      const token = localStorage.getItem('token')
      const res = await this.$axios.post(`/user_update/${id}`, editData)
      const { statusCode, message } = res.data
      if (statusCode === 200 && message === '修改成功') {
        this.renderDeta()
      }
    },
    showName() {
      this.isShowNick = true
      this.Nickname = this.profile.nickname
    },
    async editNick() {
      if (!this.NickRules.test(this.Nickname)) {
        this.$toast.fail(`昵称不合法`)
        return
      }
      this.editprofile({ nickname: this.Nickname })
    },
    showPass() {
      this.isShowPass = true
      this.password = this.profile.password
    },
    editPass() {
      console.log(`修改密码`)
      if (!this.PassRules.test(this.password)) {
        this.$toast.fail(`密码格式不合法`)
        return
      }
      this.editprofile({ password: this.password })
    },
    changeicon() {
      this.isshowpassicon = !this.isshowpassicon
    },
    showGender() {
      this.isShowGender = true
      this.Gender = this.profile.gender
    },
    editGender() {
      // console.log(this.Gender)
      this.editprofile({ gender: this.Gender })
    },
    async afterRead(file) {
      // console.log(file)
      this.isShowMask = true
      this.option.img = file.content
      // const token = localStorage.getItem('token')
      // const FD = new FormData()
      // FD.append('file', file.file)

      // const res = await this.$axios.post('/upload/', FD)
      // console.log(res)
      // const { message, statusCode, data } = res.data

      // if (statusCode === 200 && message === '文件上传成功') {
      //   this.img = data.url
      //   console.log(data)
      //   this.editprofile({ head_img: data.url })
      // }
    },
    crop() {
      // console.log(`确认裁剪`)
      this.$refs.cropper.getCropBlob(async (imgData) => {
        // console.log(imgData)
        const FD = new FormData()
        FD.append('file', imgData)
        const res = await this.$axios.post('/upload/', FD)
        // console.log(res)
        const { statusCode, message, data } = res.data
        if (statusCode === 200 && message === '文件上传成功') {
          this.editprofile({ head_img: data.url })
        }
      })
      this.isShowMask = false
    },
    cancel() {
      console.log(`取消裁剪`)
      this.isShowMask = false
    }
  }
}
</script>

<style lang="scss" scoped>
.useimg {
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 40px;
  }
  .van-uploader {
    position: fixed;
    top: 75px;
    left: 130px;
    opacity: 0;
  }
}
.van-dialog {
  padding: 0 20px;
  .van-field {
    margin: 20px 0;
    border-bottom: 1px solid rgb(70, 70, 70);
  }
}
.van-radio-group {
  height: 60px;
  padding: 0 85px;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  .crop {
    position: absolute;
    left: 30px;
    bottom: 10px;
  }
  .cancel {
    position: absolute;
    right: 30px;
    bottom: 10px;
  }
}
</style>
