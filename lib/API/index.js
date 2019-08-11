"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Side = _interopRequireDefault(require("./Side"));

var _Grid = _interopRequireDefault(require("./Grid"));

var _Cropper = _interopRequireDefault(require("./Cropper"));

var _Util = _interopRequireDefault(require("./Util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function API(store) {
  this.side = new _Side["default"](store);
  this.grid = new _Grid["default"](store);
  this.cropper = new _Cropper["default"](store);
  this.util = new _Util["default"](store);
}

var _default = API;
exports["default"] = _default;