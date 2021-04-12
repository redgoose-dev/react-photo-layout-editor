"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var core = _interopRequireWildcard(require("./core"));

var body = _interopRequireWildcard(require("./body"));

var _side = _interopRequireDefault(require("./side"));

var cropper = _interopRequireWildcard(require("./cropper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = (0, _redux.combineReducers)({
  // settings
  setting: core.setting,
  // api
  api: core.api,
  // keyboard event
  keyboard: core.keyboard,
  // element
  element: core.element,
  // data tree
  tree: (0, _redux.combineReducers)({
    side: _side["default"],
    body: (0, _redux.combineReducers)({
      setting: body.setting,
      grid: body.grid,
      activeBlock: body.activeBlock
    }),
    cropper: (0, _redux.combineReducers)({
      visible: cropper.visible,
      item: cropper.item,
      key: cropper.key
    })
  })
});

exports["default"] = _default;