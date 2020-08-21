import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
import CategoryModule from '@/store/modules/categoryModule'
import Modal from '@/store/modules/modal'
import Cart from '@/store/modules/cart'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    User,
    CategoryModule,
    Modal,
    Cart
  }
})
export default store