'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setting = setting;
exports.api = api;
exports.keyboard = keyboard;
exports.element = element;

var _types = require('../actions/types');

var types = _interopRequireWildcard(_types);

var _Keyboard = require('../lib/Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _defaults = require('./defaults');

var defaults = _interopRequireWildcard(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setting() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	var newState = Object.assign({}, state);

	switch (action.type) {
		case types.INIT_PLE:
			newState = Object.assign({}, {
				base: _extends({}, defaults.setting.base, {
					uploadScript: action.preference.uploadScript || defaults.setting.base.uploadScript,
					uploadParamsConvertFunc: action.preference.uploadParamsConvertFunc || defaults.setting.base.uploadParamsConvertFunc,
					updateStoreFunc: action.preference.updateStoreFunc || defaults.setting.base.updateStoreFunc
				}),
				side: _extends({}, defaults.setting.side, action.preference.side),
				body: _extends({}, defaults.setting.body, action.preference.body)
			});
			return newState;

		default:
			return state;
	}
}

function api() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case types.INIT_PLE:
			return action.api;

		default:
			return state;
	}
}

function keyboard() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case types.INIT_PLE:
			return new _Keyboard2.default();

		default:
			return state;
	}
}

function element() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case types.INIT_PLE:
			return action.element;

		default:
			return state;
	}
}