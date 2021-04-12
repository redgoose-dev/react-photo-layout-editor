"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBlock = addBlock;
exports.removeBlock = removeBlock;
exports.shuffleBlocks = shuffleBlocks;
exports.duplicateBlock = duplicateBlock;
exports.updateBlocks = updateBlocks;
exports.activeBlock = activeBlock;
exports.changeColorBlock = changeColorBlock;
exports.updateSetting = updateSetting;
exports.attachImages = attachImages;
exports.attachImage = attachImage;

var types = _interopRequireWildcard(require("./types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function addBlock(value) {
  return {
    type: types.GRID_ADD_BLOCK,
    value: value
  };
}

function removeBlock(keys) {
  return {
    type: types.GRID_REMOVE_BLOCK,
    keys: keys
  };
}

function shuffleBlocks(options) {
  return {
    type: types.GRID_SHUFFLE_BLOCKS,
    value: options
  };
}

function duplicateBlock(keys) {
  return {
    type: types.GRID_DUPLICATE_BLOCK,
    keys: keys
  };
}

function updateBlocks(blocks) {
  return {
    type: types.GRID_UPDATE_BLOCKS,
    value: blocks
  };
}

function activeBlock(keys) {
  return {
    type: types.GRID_ACTIVE_BLOCK,
    value: keys
  };
}

function changeColorBlock(keys, color) {
  return {
    type: types.GRID_CHANGE_COLOR,
    keys: keys,
    color: color
  };
}

function updateSetting(value) {
  return {
    type: types.GRID_SETTING_UPDATE,
    value: value
  };
}

function attachImages(images, cols, activeBlocks) {
  return {
    type: types.GRID_ATTACH_IMAGES,
    value: images,
    columns: cols,
    activeBlocks: activeBlocks
  };
}

function attachImage(keys, image) {
  return {
    type: types.GRID_ATTACH_IMAGE,
    keys: keys,
    image: image
  };
}