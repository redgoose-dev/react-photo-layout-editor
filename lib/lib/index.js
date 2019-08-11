"use strict";

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }