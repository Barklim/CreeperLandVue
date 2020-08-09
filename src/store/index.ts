import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
import CategoryModule from '@/store/modules/categoryModule'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    User,
    CategoryModule
  }
})
export default store