import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
    signedIn: false,
  },
  mutations: {
    fetchUser(state, user) {
      state.user = user
    },
    fetchSignedIn (state) {
      state.signedIn = !!localStorage.signedIn
    },
    fetchWorkbooks (state, workbooks) {
      state.workbooks = workbooks
    }
  },
  actions: {
    doFetchUser({commit}, user) {
      commit('fetchUser', user)
    },
    doFetchSignedIn ({commit}) {
      commit('fetchSignedIn')
    },
    doFetchWorkbooks ({commit}, workbooks) {
      commit('fetchWorkbooks', workbooks)
    }
  },
  getters,
  modules: {}
})
