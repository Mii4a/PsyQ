"use strict";

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _vueFontawesome = require("@fortawesome/vue-fontawesome");

var _bootstrapVue = require("bootstrap-vue");

require("bootstrap-vue/dist/bootstrap-vue.css");

require("bootstrap/dist/css/bootstrap.css");

var _vue = _interopRequireDefault(require("vue"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _App = _interopRequireDefault(require("./App.vue"));

var _axios = require("./axios");

require("./registerServiceWorker");

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas);

_vue["default"].use(_vueAxios["default"], {
  secured: _axios.securedAxiosInstance,
  plain: _axios.plainAxiosInstance
});

_vue["default"].use(_bootstrapVue.BootstrapVue);

_vue["default"].use(_bootstrapVue.BootstrapVueIcons);

_vue["default"].component('font-awesome-icon', _vueFontawesome.FontAwesomeIcon);

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  securedAxiosInstance: _axios.securedAxiosInstance,
  plainAxiosInstance: _axios.plainAxiosInstance,
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');