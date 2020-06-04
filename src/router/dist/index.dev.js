"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateAnswer = _interopRequireDefault(require("@/components/CreateAnswer.vue"));

var _CreatePsychology = _interopRequireDefault(require("@/components/CreatePsychology.vue"));

var _CreateQuestion = _interopRequireDefault(require("@/components/CreateQuestion.vue"));

var _CreateWorkbook = _interopRequireDefault(require("@/components/CreateWorkbook.vue"));

var _Create = _interopRequireDefault(require("@/views/Create.vue"));

var _Home = _interopRequireDefault(require("@/views/Home.vue"));

var _HomeAfterSignedIn = _interopRequireDefault(require("@/views/HomeAfterSignedIn.vue"));

var _PsychologyIndex = _interopRequireDefault(require("@/views/PsychologyIndex.vue"));

var _PsychologyShow = _interopRequireDefault(require("@/views/PsychologyShow.vue"));

var _Question = _interopRequireDefault(require("@/views/Question.vue"));

var _Result = _interopRequireDefault(require("@/views/Result.vue"));

var _Signin = _interopRequireDefault(require("@/views/Signin.vue"));

var _Signup = _interopRequireDefault(require("@/views/Signup.vue"));

var _WorkbookShow = _interopRequireDefault(require("@/views/WorkbookShow.vue"));

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/create',
  name: 'Create',
  component: _Create["default"],
  children: [{
    path: '/create/answer',
    name: 'CreateAnswer',
    component: _CreateAnswer["default"]
  }, {
    path: '/create/psychology',
    name: 'CreatePsychology',
    component: _CreatePsychology["default"]
  }, {
    path: '/create/question',
    name: 'CreateQuestion',
    component: _CreateQuestion["default"]
  }, {
    path: '/create/workbook',
    name: 'CreateWorkbook',
    component: _CreateWorkbook["default"]
  }]
}, {
  path: '/',
  name: 'Home',
  component: _Home["default"]
}, {
  path: '/home',
  name: 'HomeAfterSignedIn',
  component: _HomeAfterSignedIn["default"]
}, {
  path: '/psychologies',
  name: 'PsychologyIndex',
  component: _PsychologyIndex["default"]
}, {
  path: '/psychologies/:id',
  name: 'psychologyShow',
  component: _PsychologyShow["default"]
}, {
  path: '/question',
  name: 'question',
  component: _Question["default"]
}, {
  path: '/result',
  name: 'result',
  component: _Result["default"]
}, {
  path: '/signin',
  name: 'Signin',
  component: _Signin["default"]
}, {
  path: '/signup',
  name: 'Signup',
  component: _Signup["default"]
}, {
  path: '/workbooks/:id',
  name: 'workbookShow',
  component: _WorkbookShow["default"]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;