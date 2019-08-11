"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setting = setting;
exports.api = api;
exports.keyboard = keyboard;
exports.element = element;

var types = _interopRequireWildcard(require("../actions/types"));

var _Keyboard = _interopRequireDefault(require("../lib/Keyboard"));

var defaults = _interopRequireWildcard(require("./defaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState = Object.assign({}, state);

  switch (action.type) {
    case types.INIT_PLE:
      newState = Object.assign({}, {
        base: _objectSpread({}, defaults.setting.base, {
          uploadScript: action.preference.uploadScript || defaults.setting.base.uploadScript,
          uploadParamsConvertFunc: action.preference.uploadParamsConvertFunc || defaults.setting.base.uploadParamsConvertFunc,
          updateStoreFunc: action.preference.updateStoreFunc || defaults.setting.base.updateStoreFunc,
          callback: action.preference.callback || defaults.setting.base.callback
        }),
        side: _objectSpread({}, defaults.setting.side, {}, action.preference.side),
        body: _objectSpread({}, defaults.setting.body, {}, action.preference.body)
      });
      return newState;

    default:
      return state;
  }
}

function api() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.INIT_PLE:
      return action.api;

    default:
      return state;
  }
}

function keyboard() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.INIT_PLE:
      return new _Keyboard["default"]();

    default:
      return state;
  }
}

function element() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.INIT_PLE:
      return action.element;

    default:
      return state;
  }
}