'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = base;

var _types = require('../actions/types');

var types = _interopRequireWildcard(_types);

var _defaults = require('./defaults');

var defaults = _interopRequireWildcard(_defaults);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var nextFileId = 0;

/**
 * Reducers
 */

// base
function base() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults.side;
	var action = arguments[1];

	var newState = Object.assign({}, state);
	var files = {};

	switch (action.type) {
		case types.INIT_PLE:
			try {
				action.preference.side.files.forEach(function (o) {
					files[nextFileId++] = { image: o, active: false };
				});
				return _extends({}, state, action.preference.side, {
					files: _extends({}, state.files, files)
				});
			} catch (e) {
				return state;
			}

		case types.SIDE_VISIBLE:
			return _extends({}, state, {
				visible: action.value
			});

		case types.SIDE_TOGGLE:
			return _extends({}, state, {
				visible: !state.visible
			});

		case types.SIDE_ADD_FILES:
			action.files.forEach(function (o) {
				files[nextFileId++] = { image: o, active: false };
			});
			return _extends({}, newState, {
				files: _extends({}, newState.files, files)
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
			return _extends({}, state, {
				progressPercent: action.value
			});

		default:
			return state;
	}
}