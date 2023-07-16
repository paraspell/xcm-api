import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: "none"
  },
  getters: {
  },
  mutations: {
    saveAccount(state, account){
        state.account = account
    }
  },
  actions: {
  },
  modules: {
  }
})
