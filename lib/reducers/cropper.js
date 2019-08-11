"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visible = visible;
exports.item = item;
exports.key = key;

var types = _interopRequireWildcard(require("../actions/types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function visible() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.CROPPER_OPEN:
      return true;

    case types.CROPPER_CLOSE:
      return false;

    default:
      return state;
  }
}

function item() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.CROPPER_OPEN:
      return action.item;

    case types.CROPPER_CLOSE:
      return null;

    default:
      return state;
  }
}

function key() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.CROPPER_OPEN:
      return action.key;

    case types.CROPPER_CLOSE:
      return null;

    default:
      return state;
  }
}