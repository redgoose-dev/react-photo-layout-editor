'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = API;

var _Side = require('./Side');

var _Side2 = _interopRequireDefault(_Side);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Cropper = require('./Cropper');

var _Cropper2 = _interopRequireDefault(_Cropper);

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function API(store) {

	this.side = new _Side2.default(store);
	this.grid = new _Grid2.default(store);
	this.cropper = new _Cropper2.default(store);
	this.util = new _Util2.default(store);
}