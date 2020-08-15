import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 rem 的 js, 动态的设置了, 不同屏幕的html根元素的 font-size
import 'lib-flexible'
import axios from 'axios'
import { Toast, Button, Field, RadioGroup, Radio, Uploader, List } from 'vant'

import moment from 'moment'
import Hmnav from 'components/hm-nav'
import headerItem from 'components/hm-headerItem'
import { Dialog } from 'vant'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

//响应拦截
axios.interceptors.response.use(
  res => {
    if (
      res.data.statusCode === 401 &&
      res.data.message === '用户信息验证失败'
    ) {
      localStorage.removeItem('token')
      localStorage.removeItem('user-id')
      Toast('登录信息过期,请重新验证')
      router.push('/login')
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.filter('time', (value, srt = 'YYYY-MM-DD') => {
  return moment(value).format(srt)
})

Vue.use(Toast)
  .use(Button)
  .use(Dialog)
  .use(Field)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
  .use(List)
Vue.component('hmnav', Hmnav)
Vue.component('headerItem', headerItem)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
