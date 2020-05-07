"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _About = _interopRequireDefault(require("@/views/About.vue"));

var _Home = _interopRequireDefault(require("@/views/Home.vue"));

var _Signin = _interopRequireDefault(require("@/views/Signin.vue"));

var _Signup = _interopRequireDefault(require("@/views/Signup.vue"));

var _WorkbooksHome = _interopRequireDefault(require("@/views/WorkbooksHome.vue"));

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  name: 'Home',
  component: _Home["default"]
}, {
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: _About["default"]
}, {
  path: '/signup',
  name: 'Signup',
  component: _Signup["default"]
}, {
  path: '/signin',
  name: 'Signin',
  component: _Signin["default"]
}, {
  path: '/workbooks-home',
  name: 'WorkbooksHome',
  component: _WorkbooksHome["default"]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;