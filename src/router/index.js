import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Index from '../components/index'
import Register from '../components/login/register'
import mysign from '../components/sign/mysign'
import mymeeting from '../components/metting/mymeeting'
import Create1 from '../components/metting/creatmeeting1'
import Create2 from '../components/metting/createmeeting2'
import Create3 from '../components/metting/createmeeting3'
import Erweima from '../components/metting/erweima'

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
    },
    //我的签到
    {
      path:'/mysign',
      component:mysign,
      meta:{
        title:'我的签到'
      }
    },
    {
      path:'/mymeeting',
      name:'mymeeting',
      component:mymeeting,
      meta:{
        title:'我的会议'
      }
    },
    {
      name:"creatmeeting",
      path:"/creat_meeting1",
      component:Create1,
      meta:{
        title:"创建会议"
      }
    },
    {
      name:"creatmeeting2",
      path:"/creat_meeting2",
      component:Create2,
      meta:{
        title:"创建会议"
      }
    },
    {
      name:"creatmeeting3",
      path:"/creat_meeting3",
      component:Create3,
      meta:{
        title:"创建会议"
      }
    },
    {
      name:"erweima",
      path:"/erweima",
      component:Erweima,
      meta:{
        title:"二维码"
      }
    }
  ]
})
