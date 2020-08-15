<template>
  <div class="my-Collect">
    <hm-navbar>
      <template v-slot:textContent>
        <div>我的收藏</div>
      </template>
      <template v-slot:textLeft>
        <div>
          <div class="iconfont iconjiantou2" @click="$router.go(-1)"></div>
        </div>
      </template>
    </hm-navbar>
    <div class="item" v-for=" item in list" :key="item.id">
      <div class="content">
        <div class="title">{{item.title}}</div>
        <div class="bottom">
          <span>{{item.user.nickname}}</span>
          <span class="pps">{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="image">
        <img :src="item.cover[0].url" alt />
      </div>
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
      list: []
    }
  },
  created() {
    this.getCollect()
  },
  methods: {
    async getCollect() {
      const res = await this.$axios.get(`/user_star`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-Collect {
  .item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 16px;
        color: #333333;
      }
      .bottom {
        .pps {
          font-size: 12px;
          color: rgb(131, 127, 127);
          font-weight: 550;
        }
        span {
          font-size: 12px;
          color: rgb(131, 127, 127);
          padding-right: 15px;
        }
      }
    }
    .image {
      width: 120px;
      height: 75px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>