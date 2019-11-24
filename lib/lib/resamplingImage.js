"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = resamplingImage;

var lib = _interopRequireWildcard(require("./"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// default options
var defaultOptions = {
  image: null,
  width: 100,
  height: 100,
  reSampleCount: 1,
  bgColor: 'rgba(255,255,255,1)',
  cw: 0,
  ch: 0,
  cx: 0,
  cy: 0,
  dw: 0,
  dh: 0,
  dx: 0,
  dy: 0
};
/**
 * resize
 *
 * @param {Object} options
 * @param {Number} count
 * @param {Canvas} parentCanvas
 * @return {Promise}
 */

function resize(options, count, parentCanvas) {
  return new Promise(function (resolve) {
    function func(count, parentCanvas) {
      var max = Math.pow(2, count);
      var canvasForResize = new lib.Canvas(options.width * max, options.height * max, options.bgColor);
      canvasForResize.ctx.drawImage(parentCanvas.el, 0, 0, parentCanvas.el.width * 0.5, parentCanvas.el.height * 0.5);

      if (count > 0) {
        func(count - 1, canvasForResize);
      } else {
        resolve(canvasForResize);
      }
    }

    func(count - 1, parentCanvas);
  });
}
/**
 * resampling image
 *
 * @param {Object} options
 * @return {Promise}
 */


function resamplingImage(options) {
  // assign options
  options = Object.assign({}, defaultOptions, options);
  return new Promise(function (resolve, reject) {
    if (!options.image) reject('not found image'); // set reSample count

    options.reSampleCount = Math.min(4, options.reSampleCount);
    options.reSampleCount = Math.max(0, options.reSampleCount);
    var reSampleMax = Math.pow(2, options.reSampleCount); // set canvas

    var canvas = new lib.Canvas(options.width * reSampleMax, options.height * reSampleMax, options.bgColor);
    canvas.ctx.drawImage(options.image, options.cx, // cx
    options.cy, // cy
    options.cw, // cw
    options.ch, // ch
    options.dx * reSampleMax, // dx
    options.dy * reSampleMax, // dy
    options.dw * reSampleMax, // dw
    options.dh * reSampleMax // dh
    );

    if (options.reSampleCount > 0) {
      resize(options, options.reSampleCount, canvas).then(resolve);
    } else {
      resolve(canvas);
    }
  });
}