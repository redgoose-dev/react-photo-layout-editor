"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.open = open;
exports.close = close;

var types = _interopRequireWildcard(require("./types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function open(key, item) {
  return {
    type: types.CROPPER_OPEN,
    item: item,
    key: key
  };
}

function close(key, position, size) {
  return {
    type: types.CROPPER_CLOSE,
    key: key,
    position: position,
    size: size
  };
}