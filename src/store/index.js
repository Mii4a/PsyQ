import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: ''
  },
  mutations: {
    fetchSignedIn (state) {
      state.signedIn = !!localStorage.signedIn
    },
    checkSignedIn(state) {
      if (state.signedIn == localStorage.signedIn) {

      }
    }
  },
  actions: {
    doFetchSignedIn ({commit}) {
      commit('fetchSignedIn')
    }
  },
  modules: {}
})
