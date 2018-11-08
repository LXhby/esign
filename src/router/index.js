import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Index from '../components/index'
import Register from '../components/login/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title:'登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        title:'注册'
      }
    },
    {
      path:'/',
      name:'index',
      component:Index,
      meta:{
        title:"个人中心",
        isChecked:true
      }
    }
  ]
})
