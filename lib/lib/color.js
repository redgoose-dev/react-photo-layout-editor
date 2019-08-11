"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbToHex = rgbToHex;

/**
 * rgba to hex
 *
 * @param {String} color
 * @return {String}
 */
function rgbToHex(color) {
  color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return color && color.length === 4 ? "#" + ("0" + parseInt(color[1], 10).toString(16)).slice(-2) + ("0" + parseInt(color[2], 10).toString(16)).slice(-2) + ("0" + parseInt(color[3], 10).toString(16)).slice(-2) : '';
}