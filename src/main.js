// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)

import router from './router'


//使用进度条
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// NProgress.inc(0.2)

//兼容es6 promise
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

//微信中动态的设置标
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)



//vux
import Vuex from 'vuex'
import {
  ConfigPlugin,
  DatetimePlugin,
  BusPlugin,
  DevicePlugin,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  WechatPlugin,
  AjaxPlugin,
  base64,
  cookie
} from 'vux'
Vue.use(Vuex)
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)
Vue.use(VueWechatTitle)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})


//设置http
Vue.http.defaults.retry = 1; //重试次数
Vue.http.defaults.retryDelay = 1000;//重试延时
Vue.http.defaults.shouldRetry = (error) => true;//重试条件，默认只要是错误都需要重试
Vue.http.defaults.timeout = 30000;//延迟时间


Vue.http.defaults.url = "http://baidu.com"


//响应拦截重试
Vue.http.interceptors.response.use(undefined, (err) => {
  var config = err.config;
  // 判断是否配置了重试
  if(!config || !config.retry) return Promise.reject(err);

  if(!config.shouldRetry || typeof config.shouldRetry != 'function') {
    return Promise.reject(err);
  }

  //判断是否满足重试条件
  if(!config.shouldRetry(err)) {
    return Promise.reject(err);
  }

  // 设置重置次数，默认为0
  config.__retryCount = config.__retryCount || 0;

  // 判断是否超过了重试次数
  if(config.__retryCount >= config.retry) {
    Vue.$vux.toast.show({
      type: 'cancel',
      text: '网络超时，请检查网络连接，然后刷新页面',
      time: 5000
    })
    return Promise.reject(err);
  }

  //重试次数自增
  config.__retryCount += 1;

  //延时处理
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  //重新发起axios请求
  return backoff.then(function() {
    return Vue.http(config);
  });
});


//设置vuex  --  sync
import { sync } from 'vuex-router-sync'
const store = new Vuex.Store({})
store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false,
    direction: 'forward',
    userInfo: null,
    url: null,
    title: null,
    lecture: null,
  },
  mutations:{
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    },
    setUserInfo(state, payload) {
      if (state.userInfo === null) {
        state.userInfo = payload.userInfo
      } else {
        Object.assign(state.userInfo, payload.userInfo)
      }
    },
    setUrl(state, payload) {
      state.url = payload
    },
    setTitle(state, payload) {
      state.title = payload
    },
    setLecture(state, payload) {
      state.lecture = payload.lecture
    },
  },
  actions: {
    setUserInfo(context) {//
      context.commit('setUserInfo')
    }
  }
})
sync(store, router)



router.beforeEach(function (to,from,next) {//全局前置守卫
  store.commit('setTitle', to.meta.title)

    if(to.meta.isChecked){
      console.log("请登录")
      var isLogin = sessionStorage.getItem('isLogin');
      if(isLogin){
        console.log(to.fullPath)
        next();
      }else{
        console.log(to.fullPath)
        next({ //第一次登录
          path:'/login'
        })
      }
    }else{
    //已经登录
    store.commit('updateLoadingStatus', {
      isLoading: true
    })
    next()
  }
})
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})







FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
