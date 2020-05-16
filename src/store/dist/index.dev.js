"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _getters = _interopRequireDefault(require("./getters.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    user: [],
    signedIn: false,
    workbooks: []
  },
  mutations: {
    fetchUser: function fetchUser(state, user) {
      state.user = user;
    },
    fetchSignedIn: function fetchSignedIn(state) {
      state.signedIn = !!localStorage.signedIn;
    },
    fetchWorkbooks: function fetchWorkbooks(state, workbooks) {
      state.workbooks = workbooks;
    }
  },
  actions: {
    doFetchUser: function doFetchUser(_ref, user) {
      var commit = _ref.commit;
      commit('fetchUser', user);
    },
    doFetchSignedIn: function doFetchSignedIn(_ref2) {
      var commit = _ref2.commit;
      commit('fetchSignedIn');
    },
    doFetchWorkbooks: function doFetchWorkbooks(_ref3, workbooks) {
      var commit = _ref3.commit;
      commit('fetchWorkbooks', workbooks);
    }
  },
  getters: _getters["default"],
  modules: {}
});

exports["default"] = _default;