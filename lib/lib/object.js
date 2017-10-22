"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
/**
 * is array
 *
 * @param {Array} arr
 * @return {Boolean}
 */
function isArray() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return !!(arr && arr.length);
}