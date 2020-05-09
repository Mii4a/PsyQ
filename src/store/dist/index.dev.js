"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    signedIn: ''
  },
  mutations: {
    fetchSignedIn: function fetchSignedIn(state) {
      state.signedIn = !!localStorage.signedIn;
    },
    checkSignedIn: function checkSignedIn(state) {
      if (state.signedIn == localStorage.signedIn) {}
    }
  },
  actions: {
    doFetchSignedIn: function doFetchSignedIn(_ref) {
      var commit = _ref.commit;
      commit('fetchSignedIn');
    }
  },
  modules: {}
});

exports["default"] = _default;