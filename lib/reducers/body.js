"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setting = setting;
exports.grid = grid;
exports.activeBlock = activeBlock;

var types = _interopRequireWildcard(require("../actions/types"));

var libs = _interopRequireWildcard(require("../lib"));

var defaults = _interopRequireWildcard(require("./defaults"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var lastGridId = 0;
var shuffleIndex = 0;
/**
 * setting
 *
 * @param {Object} state
 * @param {*} action
 * @return {Object}
 */

function setting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults.setting.body.setting;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.INIT_PLE:
      try {
        return _objectSpread(_objectSpread({}, state), action.preference.body.setting);
      } catch (e) {
        return state;
      }

    case types.GRID_SETTING_UPDATE:
      return _objectSpread(_objectSpread({}, state), action.value);
  }

  return state;
}
/**
 * grid
 *
 * @param {Object} state
 * @param {*} action
 * @return {Object}
 */


function grid() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState = Object.assign({}, state);

  switch (action.type) {
    case types.INIT_PLE:
      var _grid = {};

      try {
        if (action.preference.body.grid instanceof Array) {
          action.preference.body.grid.forEach(function (o, k) {
            _grid[k] = o;
          });
        } else if (_typeof(action.preference.body.grid) === 'object') {
          _grid = action.preference.body.grid;
        } else {
          throw 'error';
        }

        Object.keys(_grid).forEach(function (o) {
          newState[lastGridId++] = _objectSpread(_objectSpread({
            color: defaults.setting.body.blockColor
          }, _grid[o]), {}, {
            indexPrefix: shuffleIndex
          });
        });
      } catch (e) {
        newState = {};
      }

      return newState;

    case types.GRID_ADD_BLOCK:
      newState[lastGridId++] = _objectSpread(_objectSpread({
        color: defaults.setting.body.blockColor,
        layout: {
          x: Infinity,
          y: Infinity,
          w: 1,
          h: 1
        }
      }, action.value), {}, {
        indexPrefix: shuffleIndex
      });
      return newState;

    case types.GRID_REMOVE_BLOCK:
      if (!action.keys || !action.keys.length) return state;
      action.keys.forEach(function (o) {
        delete newState[o];
      });
      return newState;

    case types.GRID_SHUFFLE_BLOCKS:
      return Object.keys(newState).map(function (k) {
        return _objectSpread(_objectSpread({}, newState[k]), {}, {
          layout: {
            x: libs.number.randomRange(0, action.value.x - 1),
            y: libs.number.randomRange(0, action.value.y - 1),
            w: libs.number.randomRange(1, action.value.w),
            h: libs.number.randomRange(1, action.value.h)
          },
          indexPrefix: shuffleIndex++
        });
      });

    case types.GRID_DUPLICATE_BLOCK:
      action.keys.forEach(function (k) {
        if (!newState[k]) return;
        newState[lastGridId++] = Object.assign({}, newState[k]);
      });
      return newState;

    case types.GRID_CHANGE_COLOR:
      action.keys.forEach(function (k) {
        if (!newState[k]) return;
        newState[k].color = action.color;
      });
      return newState;

    case types.GRID_ATTACH_IMAGES:
      if (!libs.object.isArray(action.value)) return state;

      if (action.activeBlocks && action.activeBlocks.length) {
        Object.keys(newState).forEach(function (k) {
          if (!action.value.length) return;
          if (action.activeBlocks.indexOf(k) === -1) return;
          newState[k].image = {
            src: action.value.splice(0, 1)[0],
            position: '50% 50%',
            size: 'cover'
          };
        });
      } else {
        Object.keys(newState).forEach(function (k) {
          if (newState[k].image) return;
          if (!action.value || !action.value.length) return;
          newState[k].image = {
            src: action.value.splice(0, 1)[0],
            position: '50% 50%',
            size: 'cover'
          };
        });

        if (action.value.length) {
          action.value.forEach(function (o, k) {
            newState[lastGridId++] = {
              color: defaults.setting.body.blockColor,
              layout: {
                x: (Object.keys(state).length + k) % action.columns,
                y: Infinity,
                w: 1,
                h: 1
              },
              image: {
                src: o,
                position: '50% 50%',
                size: 'cover'
              },
              indexPrefix: shuffleIndex
            };
          });
        }
      }

      return newState;

    case types.GRID_ATTACH_IMAGE:
      if (!(action.image && typeof action.image === 'string')) return state;
      if (!newState[action.keys]) return state;
      newState[action.keys].image = {
        src: action.image,
        position: '50% 50%',
        size: 'cover'
      };
      return newState;

    case types.GRID_UPDATE_BLOCKS:
      return Object.assign({}, state, action.value);

    case types.CROPPER_CLOSE:
      if (!newState[action.key]) return state;

      if (action.position) {
        newState[action.key].image.position = action.position;
      }

      if (action.size) {
        newState[action.key].image.size = action.size;
      }

      return newState;
  }

  return state;
}
/**
 * active block
 *
 * @param {Array} state
 * @param {*} action
 * @return {Array}
 */


function activeBlock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState = Object.assign([], state);

  switch (action.type) {
    case types.GRID_ACTIVE_BLOCK:
      return action.value;

    case types.GRID_REMOVE_BLOCK:
      if (action.keys && action.keys.length) {
        action.keys.forEach(function (o) {
          if (newState.indexOf(o) < 0) return;
          newState.splice(newState.indexOf(o), 1);
        });
        return newState;
      }

      return [];
  }

  return state;
}