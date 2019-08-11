"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Canvas
 */
var Canvas =
/**
 * constructor
 *
 * @param {Number} width
 * @param {Number} height
 * @param {String} bgColor
 */
function Canvas() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 150;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var bgColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';

  _classCallCheck(this, Canvas);

  this.el = document.createElement('canvas');
  this.ctx = this.el.getContext('2d');
  this.el.width = width;
  this.el.height = height;
  this.ctx.fillStyle = bgColor;
  this.ctx.fillRect(0, 0, width, height);
};

exports["default"] = Canvas;