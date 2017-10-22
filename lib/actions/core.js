'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function init(api, preference, element) {
	return {
		type: types.INIT_PLE,
		api: api,
		preference: preference,
		element: element
	};
}