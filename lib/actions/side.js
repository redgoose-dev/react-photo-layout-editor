"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visible = visible;
exports.toggle = toggle;
exports.addFiles = addFiles;
exports.removeFiles = removeFiles;
exports.updateSelected = updateSelected;
exports.updateProgress = updateProgress;

var types = _interopRequireWildcard(require("./types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// control visible side bar
function visible(sw) {
  return {
    type: types.SIDE_VISIBLE,
    value: sw
  };
} // toggle side bar


function toggle() {
  return {
    type: types.SIDE_TOGGLE
  };
}

function addFiles() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    type: types.SIDE_ADD_FILES,
    files: files
  };
}

function removeFiles() {
  var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    type: types.SIDE_REMOVE_FILES,
    keys: keys
  };
}

function updateSelected(value) {
  return {
    type: types.SIDE_UPDATE_SELECTED,
    value: value
  };
}

function updateProgress(percent) {
  return {
    type: types.SIDE_UPDATE_PROGRESS,
    value: percent
  };
}