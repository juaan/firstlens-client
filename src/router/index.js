import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import QuestionList from '@/components/QuestionList'
import LoginPage from '@/components/LoginPage'
import SignUp from '@/components/SignUp'
import AskForm from '@/components/AskForm'
import ProductCatalog from '@/components/ProductCatalog'
import QuestionDetail from '@/components/QuestionDetail'
import Panel from '@/components/Panel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QuestionList',
      component: QuestionList
    },
    {
      path: '/questions',
      component: QuestionList
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/questions/ask',
      component: AskForm
    },
    {
      path: '/questions/:id',
      component: QuestionDetail,
      props: true
    },
    {
      path: '/users/:id',
      component: Panel,
      props: true
    }
  ]
})
