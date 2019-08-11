"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makingImage;

var _jquery = _interopRequireDefault(require("jquery/dist/jquery.slim"));

var lib = _interopRequireWildcard(require("./"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get image size
 *
 * @param {String} type
 * @param {int} cw container width
 * @param {int} ch container height
 * @param {int} iw image width
 * @param {int} ih image height
 * @return {Object}
 */
function getImageSize(type, cw, ch, iw, ih) {
  var size = {
    width: 0,
    height: 0
  };

  switch (type) {
    case 'cover':
      if (cw > ch) {
        size.width = cw;
        size.height = ih * (cw / iw);

        if (ch > size.height) {
          size.width = iw * (ch / ih);
          size.height = ch;
        }
      } else {
        size.width = iw * (ch / ih);
        size.height = ch;

        if (cw > size.width) {
          size.width = cw;
          size.height = ih * (cw / iw);
        }
      }

      break;

    case 'width':
      size.width = cw;
      size.height = ih * (cw / iw);
      break;

    case 'height':
      size.width = iw * (ch / ih);
      size.height = ch;
      break;

    default:
      size.width = cw;
      size.height = ch;
      break;
  }

  return {
    width: Math.round(size.width),
    height: Math.round(size.height)
  };
}
/**
 * export grid
 *
 * @param {HTMLElement} el
 * @param {Array} grids
 * @return {Array}
 */


function makeQueue(el, grids) {
  if (!(el && grids)) return null;
  var $items = (0, _jquery["default"])(el).children();
  var result = [];
  $items.each(function (key, item) {
    var $item = (0, _jquery["default"])(item);
    var grid = grids[$item.data('key')];
    var image = grid.image;

    if (image) {
      image = {
        src: image.src,
        position: image.position.split(' '),
        size: image.size === 'cover' ? null : image.size.split(' ')
      };
    }

    result.push({
      //key: $item.data('key'),
      x: $item.position().left,
      y: $item.position().top,
      width: $item.width(),
      height: $item.height(),
      image: image || null,
      color: grid.color || 'rgba(255,255,255,1)'
    });
  });
  return result;
}
/**
 * make block
 *
 * @param {Object} queue
 * @param {Object} options
 * @return {Promise}
 */


function makeBlock() {
  var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve) {
    lib.util.loadImage(queue.image ? queue.image.src : null).then(function (image) {
      if (image) {
        var realSize = {
          width: image.naturalWidth,
          height: image.naturalHeight
        };
        var size = {};
        var position = {}; // get size and position image

        if (queue.image.size) {
          size = getImageSize('width', parseInt(queue.image.size[0]), 0, realSize.width, realSize.height);
          position.x = parseInt(queue.image.position[0]);
          position.y = parseInt(queue.image.position[1]);
        } else {
          size = getImageSize('cover', queue.width, queue.height, realSize.width, realSize.height);
          position.x = queue.width * 0.5 - size.width * 0.5;
          position.y = queue.height * 0.5 - size.height * 0.5;
        } // resize image


        lib.resamplingImage({
          image: image,
          reSampleCount: options.sampling,
          width: queue.width,
          height: queue.height,
          cx: 0,
          cy: 0,
          cw: realSize.width,
          ch: realSize.height,
          dx: position.x,
          dy: position.y,
          dw: size.width,
          dh: size.height,
          bgColor: queue.color
        }).then(function (res) {
          resolve({
            width: queue.width,
            height: queue.height,
            x: queue.x,
            y: queue.y,
            image: res
          });
        });
      } else {
        resolve({
          width: queue.width,
          height: queue.height,
          x: queue.x,
          y: queue.y,
          color: queue.color,
          image: new lib.Canvas(queue.width, queue.height, queue.color)
        });
      }
    });
  });
}
/**
 * draw block
 * 캔버스에다가 블럭을 그려준다.
 *
 * @param {Canvas} canvas
 * @param {Object} block
 */


function drawBlock(canvas, block) {
  return new Promise(function (resolve) {
    canvas.ctx.drawImage(block.image.el, block.x, block.y, block.width, block.height);
    resolve(block.image.el);
  });
}
/**
 * Get image size
 *
 * @param {Object} el
 * @param {String} format
 * @param {int} quality
 * @return {Object}
 */


function canvasToBase64() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.75;

  switch (format) {
    case 'png':
      format = 'image/png';
      break;

    case 'jpg':
    default:
      format = 'image/jpeg';
      break;
  }

  return el.toDataURL(format, format === 'image/jpeg' ? quality : undefined);
}
/**
 * making image
 *
 * @param {HTMLElement} el `.ple-grid` element
 * @param {Object} data
 * @param {Object} options
 * @return {Promise}
 */


function makingImage(el) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var defer = _jquery["default"].Deferred(); // resolve, notify, reject


  var queues = makeQueue(el, data.grid);
  var current = 0;
  var queueTotal = queues.length; // make canvas

  var canvas = new lib.Canvas(el.offsetWidth, el.offsetHeight, data.setting.bgColor); // send progress event

  defer.notify(queueTotal, current++, null);
  /**
   * play
   * 큐 플레이. 이미지를 만들고 캔버스에 그리고나서 결과는 `confirm`에서 받는다.
   *
   * @param {Object} queue
   * @return {Promise}
   */

  function play(queue) {
    return new Promise(function (resolve, reject) {
      makeBlock(queue, options).then(function (block) {
        drawBlock(canvas, block).then(resolve, reject);
      }, reject);
    });
  }
  /**
   * confirm
   * 큐를 하나 삭제하고 계속 `play`함수를 실행할지 종료할지 결정한다.
   *
   * @param {Canvas} image
   */


  function confirm(image) {
    // 큐 하나빼기
    queues.splice(0, 1); // send progress event

    defer.notify(queueTotal, current++, image); // check queues

    if (queues.length) {
      play(queues[0]).then(confirm, error);
    } else {
      end();
    }
  }
  /**
   * error
   *
   * @param {String} err
   */


  function error(err) {
    defer.reject(err);
  }
  /**
   * end
   * `play`가 모두 끝났을때 호출. `done`으로 내보낸다.
   */


  function end() {
    switch (options.output) {
      case 'base64':
        defer.resolve(canvasToBase64(canvas.el, options.format, options.quality));
        break;

      case 'canvas':
      default:
        defer.resolve(canvas.el);
        break;
    }
  } // check queue


  if (queues.length) {
    // play queue
    play(queues[0]).then(confirm, error);
  } else {
    // not found queues
    error('not found queue');
  }

  return defer.promise();
}