'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setting = setting;
exports.grid = grid;
exports.activeBlock = activeBlock;

var _types = require('../actions/types');

var types = _interopRequireWildcard(_types);

var _lib = require('../lib');

var libs = _interopRequireWildcard(_lib);

var _defaults = require('./defaults');

var defaults = _interopRequireWildcard(_defaults);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
	var action = arguments[1];

	switch (action.type) {
		case types.INIT_PLE:
			try {
				return _extends({}, state, action.preference.body.setting);
			} catch (e) {
				return state;
			}

		case types.GRID_SETTING_UPDATE:
			return _extends({}, state, action.value);
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
	var action = arguments[1];

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
					newState[lastGridId++] = _extends({
						color: defaults.setting.body.blockColor
					}, _grid[o], {
						indexPrefix: shuffleIndex
					});
				});
			} catch (e) {
				newState = {};
			}
			return newState;

		case types.GRID_ADD_BLOCK:
			newState[lastGridId++] = _extends({
				color: defaults.setting.body.blockColor,
				layout: { x: Infinity, y: Infinity, w: 1, h: 1 }
			}, action.value, {
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
				return _extends({}, newState[k], {
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
	var action = arguments[1];

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