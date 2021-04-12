"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "uploader", {
  enumerable: true,
  get: function get() {
    return _uploader["default"];
  }
});
Object.defineProperty(exports, "makingImage", {
  enumerable: true,
  get: function get() {
    return _makingImage["default"];
  }
});
Object.defineProperty(exports, "Canvas", {
  enumerable: true,
  get: function get() {
    return _Canvas["default"];
  }
});
Object.defineProperty(exports, "resamplingImage", {
  enumerable: true,
  get: function get() {
    return _resamplingImage["default"];
  }
});
exports.color = exports.object = exports.number = exports.util = void 0;

var util = _interopRequireWildcard(require("./util"));

exports.util = util;

var number = _interopRequireWildcard(require("./number"));

exports.number = number;

var object = _interopRequireWildcard(require("./object"));

exports.object = object;

var color = _interopRequireWildcard(require("./color"));

exports.color = color;

var _uploader = _interopRequireDefault(require("./uploader"));

var _makingImage = _interopRequireDefault(require("./makingImage"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _resamplingImage = _interopRequireDefault(require("./resamplingImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }