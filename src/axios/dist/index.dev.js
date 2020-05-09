"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plainAxiosInstance = exports.securedAxiosInstance = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var API_URL = 'http://localhost:3000';

var securedAxiosInstance = _axios["default"].create({
  baseURL: API_URL,
  withCredentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN
  }
});

exports.securedAxiosInstance = securedAxiosInstance;

var plainAxiosInstance = _axios["default"].create({
  baseURL: API_URL,
  withCredentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN
  }
});

exports.plainAxiosInstance = plainAxiosInstance;
securedAxiosInstance.interceptors.request.use(function (config) {
  var method = config.method.toUpperCase();

  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = _objectSpread({}, config.headers, {
      'X-CSRF-TOKEN': localStorage.csrf
    });
  }

  return config;
});
securedAxiosInstance.interceptors.response.use(null, function (error) {
  if (error.response && error.response.config && error.response.status === 401) {
    // If 401 by expired access cookie, we do a refresh request
    return plainAxiosInstance.post(process.env.VUE_APP_API + 'refresh', {}, {
      headers: {
        'X-CSRF-TOKEN': localStorage.csrf
      }
    }).then(function (response) {
      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true; // After another successfull refresh - repeat original request

      var retryConfig = error.response.config;
      retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf;
      return plainAxiosInstance.request(retryConfig);
    })["catch"](function (error) {
      delete localStorage.csrf;
      delete localStorage.signedIn; // redirect to signin if refresh fails

      location.replace('/');
      return Promise.reject(error);
    });
  } else {
    return Promise.reject(error);
  }
});