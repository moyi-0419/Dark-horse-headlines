<template>
  <div class="profile">
    <hm-navbar>
      <template v-slot:textLeft>
        <div>
          <div class="iconfont iconjiantou2" @click="$router.go(-1)"></div>
        </div>
      </template>
      <template v-slot:textContent>
        <div>个人中心</div>
      </template>
    </hm-navbar>
    <!-- 用户头像 -->
    <div class="info" @click="$router.push('/edit-profile')">
      <div class="userHeadPortrait">
        <img :src="headerimg" alt />
      </div>
      <!-- 用户信息和时间 -->
      <div class="username">
        <div class="name">
          <i class="iconfont iconxingbienan" v-if="profile.data.gender == 1"></i>
          <i class="iconfont iconxingbienv" v-else></i>
          <span>{{ profile.data.nickname }}</span>
        </div>
        <div class="tim">{{ profile.create_date | time }}</div>
      </div>
      <!-- 字体图标 -->
      <div class="iconf">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hmnav name="我的关注" desc="关注的用户" @click="$router.push('/profile-Focus')"></hmnav>
      <hmnav name="我的跟帖" desc="跟帖/回复" @click="$router.push('/my-Comments')"></hmnav>
      <hmnav name="我的收藏" desc="文章/视频" @click="$router.push('/my-Collect')"></hmnav>
      <hmnav name="设置" @click.native="$router.push('/edit-profile')"></hmnav>
      <van-button id="vantbtn" type="info" @click="clickBtn">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import HmNavbar from 'components/hm-Navbar'
export default {
  components: {
    HmNavbar
  },
  data() {
    return {
      profile: {
        data: {}
      }
    }
  },
  async created() {
    const Token = localStorage.getItem('token')
    const userId = localStorage.getItem('user-id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: Token
      }
    })
    this.profile = res.data
    console.log(this.profile)
  },
  computed: {
    headerimg() {
      return this.$axios.defaults.baseURL + this.profile.data.head_img
    }
  },
  methods: {
    async clickBtn() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '点击确定退出'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user-id')
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  #vantbtn {
    width: 100%;
    height: 49px;
    line-height: 49px;
    border-radius: 24px;
    margin-top: 30px;
  }
  .info {
    display: flex;
    padding: 25px;
    border-bottom: 5px solid #e4e4e4;

    .userHeadPortrait {
      img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
      }
    }
    .username {
      flex: 1;
      padding: 15px;
      .name {
        .iconxingbienan {
          color: rgba(42, 10, 223, 0.781);
        }
        .iconxingbienv {
          color: rgba(228, 62, 145, 0.836);
        }
        span {
          font-size: 15px;
        }
      }
      .tim {
        font-size: 12px;
        color: rgb(146, 146, 146);
      }
    }
    .iconf {
      padding: 25px;
      height: 30px;
      line-height: 30px;
      width: 70px;
      text-align: center;
    }
  }
}
</style>
