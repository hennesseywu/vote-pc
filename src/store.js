import Vue from 'vue'
import Vuex from 'vuex'
//子module
import login from './pages/login/module'
import nav1 from  './pages/nav1/module'
import syzxEnter from  './pages/syzxEnter/module'
Vue.use(Vuex)

export default new Vuex.Store({
  //全局state
  state: {
    isLogin:false
  },
  //全局mutations
  mutations: {

  },
  //全局actions
  actions: {

  },
  //子vuex
  modules: {
    login,nav1,syzxEnter
  }
})