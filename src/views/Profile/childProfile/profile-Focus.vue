<template>
  <div id="focus">
    <header-item></header-item>·
    <hm-navbar>
      <template v-slot:textContent>
        <div>我的关注</div>
      </template>
      <template v-slot:textLeft>
        <div>
          <div class="iconfont iconjiantou2" @click="$router.go(-1)"></div>
        </div>
      </template>
    </hm-navbar>
    <hm-focus
      v-for="item in list"
      :key="item.id"
      :list="item.head_img"
      @click="editFocus(item.id)"
    >
      <template v-slot:userNick>
        <div>{{ item.nickname }}</div>
      </template>
      <template v-slot:time>
        <div>{{ item.create_date | time }}</div>
      </template>
    </hm-focus>
  </div>
</template>

<script>
import headerItem from 'components/hm-headerItem'
import hmNavbar from 'components/hm-Navbar'
import hmFocus from 'components/hm-focus'
export default {
  data() {
    return {
      list: []
    }
  },
  components: {
    headerItem,
    hmNavbar,
    hmFocus
  },
  created() {
    this.getUser_follows()
  },
  methods: {
    async getUser_follows() {
      const res = await this.$axios.get(`/user_follows`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async editFocus(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200 && message === '取消关注成功') {
        this.$toast(`已取消关注该用户`)
        this.getUser_follows()
      }
    }
  }
}
</script>

<style></style>
