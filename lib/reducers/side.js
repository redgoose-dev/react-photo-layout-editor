"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = base;

var types = _interopRequireWildcard(require("../actions/types"));

var defaults = _interopRequireWildcard(require("./defaults"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nextFileId = 0;
/**
 * Reducers
 */
// base

function base() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults.side;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState = Object.assign({}, state);
  var files = {};

  switch (action.type) {
    case types.INIT_PLE:
      try {
        action.preference.side.files.forEach(function (o) {
          files[nextFileId++] = {
            image: o,
            active: false
          };
        });
        return _objectSpread({}, state, {}, action.preference.side, {
          files: _objectSpread({}, state.files, {}, files)
        });
      } catch (e) {
        return state;
      }

    case types.SIDE_VISIBLE:
      return _objectSpread({}, state, {
        visible: action.value
      });

    case types.SIDE_TOGGLE:
      return _objectSpread({}, state, {
        visible: !state.visible
      });

    case types.SIDE_ADD_FILES:
      action.files.forEach(function (o) {
        files[nextFileId++] = {
          image: o,
          active: false
        };
      });
      return _objectSpread({}, newState, {
        files: _objectSpread({}, newState.files, {}, files)
      });

    case types.SIDE_REMOVE_FILES:
      if (!action.keys.length) return state;
      action.keys.forEach(function (o) {
        delete newState.files[o];
      });
      return newState;

    case types.SIDE_UPDATE_SELECTED:
      if (!(action.value && Object.keys(action.value).length)) return state;
      Object.keys(action.value).forEach(function (k) {
        if (!newState.files[k]) return;
        newState.files[k].active = action.value[k].active;
      });
      return newState;

    case types.SIDE_UPDATE_PROGRESS:
      return _objectSpread({}, state, {
        progressPercent: action.value
      });

    default:
      return state;
  }
}