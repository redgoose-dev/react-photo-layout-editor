'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _core = require('./core');

var core = _interopRequireWildcard(_core);

var _body = require('./body');

var body = _interopRequireWildcard(_body);

var _side = require('./side');

var _side2 = _interopRequireDefault(_side);

var _cropper = require('./cropper');

var cropper = _interopRequireWildcard(_cropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _redux.combineReducers)({

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
		side: _side2.default,
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