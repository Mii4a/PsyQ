
import CreateAnswer from '@/components/CreateAnswer.vue'
import CreatePsychology from '@/components/CreatePsychology.vue'
import CreateQuestion from '@/components/CreateQuestion.vue'
import CreateWorkbook from '@/components/CreateWorkbook.vue'
import Create from '@/views/Create.vue'
import Home from '@/views/Home.vue'
import HomeAfterSignedIn from '@/views/HomeAfterSignedIn.vue'
import PsychologyIndex from '@/views/PsychologyIndex.vue'
import PsychologyShow from '@/views/PsychologyShow.vue'
import Question from '@/views/Question.vue'
import Result from '@/views/Result.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import WorkbookShow from '@/views/WorkbookShow.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/create',
    name: 'Create',
    component: Create,
    children: [
      {
        path: '/create/answer',
        name: 'CreateAnswer',
        component: CreateAnswer
      },
      {
        path: '/create/psychology',
        name: 'CreatePsychology',
        component: CreatePsychology
      },
      {
        path: '/create/question',
        name: 'CreateQuestion',
        component: CreateQuestion
      },
      {
        path: '/create/workbook',
        name: 'CreateWorkbook',
        component: CreateWorkbook
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'HomeAfterSignedIn',
    component: HomeAfterSignedIn
  },
  {
    path: '/psychologies',
    name: 'PsychologyIndex',
    component: PsychologyIndex
  },
  {
    path: '/psychologies/:id',
    name: 'psychologyShow',
    component: PsychologyShow
  },
  {
    path: '/question',
    name: 'question',
    component: Question
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/workbooks/:id',
    name: 'workbookShow',
    component: WorkbookShow
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
