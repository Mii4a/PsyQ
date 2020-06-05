import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exit: false,
    signedIn: false,
    user: [],
  },
  mutations: {
    fetchUser(state, user) {
      state.user = user
    },
    fetchSignedIn (state) {
      state.signedIn = !!localStorage.signedIn
    },
    fetchExit (state) {
      state.exit = true
    }
  },
  actions: {
    doFetchUser({commit}, user) {
      commit('fetchUser', user)
    },
    doFetchSignedIn ({commit}) {
      commit('fetchSignedIn')
    },
    doFetchExit ({commit}) {
      commit('fetchExit')
    }
  },
  getters,
  modules: {}
})
