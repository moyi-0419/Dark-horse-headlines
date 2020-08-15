import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('views/Login/Login')
const Register = () => import('views/Register')
const Home = () => import('views/Home/Home')
const Profile = () => import('views/Profile/Profile')
const editProfile = () => import('views/Profile/childProfile/edit-profile')
const profileFocus = () => import('views/Profile/childProfile/profile-Focus')
const MyComments = () => import('views/MyComments/MyComments')
const MyCollect = () => import('views/myCollect/myCollect')
const Search = () => import('views/Home/search/search')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/edit-profile',
    name: ' dit-profile',
    component: editProfile
  },
  {
    path: '/profile-Focus',
    name: ' profile-Focus',
    component: profileFocus
  },
  {
    path: '/my-Comments',
    name: 'my-Comments',
    component: MyComments
  },
  {
    path: '/my-Collect',
    name: 'my-Collect',
    component: MyCollect
  },
  {
    path: '/Search',
    name: 'search',
    component: Search
  }
]

const tokenField = [
  '/profile',
  '/edit-profile',
  '/profile-Focus',
  '/my-Comments',
  '/my-Collect'
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (tokenField.includes(to.path)) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
