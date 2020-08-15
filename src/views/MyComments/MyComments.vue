<template>
  <div class="my-comments">
    <hm-navbar>
      <template v-slot:textContent>
        <div>我的跟帖</div>
      </template>
      <template v-slot:textLeft>
        <div>
          <div class="iconfont iconjiantou2" @click="$router.go(-1)"></div>
        </div>
      </template>
    </hm-navbar>
    <div class="item" v-for=" item in list " :key="item.id">
      <div class="time">{{item.create_date |time('YYYY-MM-DD HH-mm-ss')}}</div>
      <div class="parent" v-if="item.parent">
        <p>回复：{{item.parent.user.nickname}}</p>
        <span>{{item.parent.content}}</span>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="origin">
        <p class="one-txt-cut">{{item.post.title}}</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="100"
      :immediate-check="false"
    />
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
      list: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getcomments()
  },
  methods: {
    async getcomments() {
      const res = await this.$axios.get(`/user_comments`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        if (data.length < this.pageSize) {
          //   console.log(1)
          this.finished = true
        }
        // console.log(this.list)
      }
    },
    onLoad() {
      this.pageIndex++
      this.getcomments()
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  line-height: 30px;
  .time {
    color: #999;
    font-size: 12px;
  }
  .content {
    color: #000;
    font-style: 14px;
  }
  .origin {
    color: #888;
    font-style: 12px;
    display: flex;
    margin-top: 10px;
    .one-txt-cut {
      flex: 1;
    }
  }
  .parent {
    margin: 10px 0;
    background-color: #ddd;
    padding: 10px;
    border: 5px;
    p {
      font-size: 12px;
      color: rgb(131, 129, 129);
    }
    span {
      font-style: 14px;
    }
  }
}
</style>