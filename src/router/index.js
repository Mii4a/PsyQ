import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import WorkbookIndex from '@/views/WorkbookIndex.vue'
import WorkbookShow from '@/views/WorkbookShow.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/workbooks',
    name: 'WorkbookIndex',
    component: WorkbookIndex
  },
  {
    path: 'workbook/:id',
    name: 'WorkbookShow',
    component: WorkbookShow
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
