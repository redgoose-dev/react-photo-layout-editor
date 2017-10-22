'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isTouchDevice = isTouchDevice;
exports.sleep = sleep;
exports.getImageSize = getImageSize;
exports.checkSupportCss = checkSupportCss;
exports.loadImage = loadImage;
/**
 * is touch device
 *
 * @returns {boolean}
 */
function isTouchDevice() {
	return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

/**
 * Sleep
 *
 * @param {Number} time
 * @param {String} id
 * @return {Promise}
 */
function sleep(time) {
	var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pleTimer';

	return new Promise(function (resolve) {
		window[id] = setTimeout(resolve, time);
	});
}

/**
 * Get image size
 *
 * @param {String} src
 * @return {Promise}
 */
function getImageSize(src) {
	return new Promise(function (resolve, reject) {
		if (!(src && typeof src === 'string')) reject();

		var img = document.createElement('img');

		img.onload = function () {
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight,
				ratio: img.naturalHeight / img.naturalWidth
			});
		};

		img.onerror = function () {
			reject();
		};

		img.src = src;
	});
}

/**
 * get css prefix
 *
 * @variation {Object}
 */
var cssPrefix = exports.cssPrefix = function () {
	var styles = window.getComputedStyle(document.documentElement, '');
	var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
	var dom = 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1];

	return {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	};
}();

/**
 * check support css
 *
 * @param {String} key
 * @param {String} value
 * @return {Boolean}
 */
function checkSupportCss(key, value) {
	if (CSS && CSS.supports) {
		return CSS.supports(key, value);
	}
}

/**
 * load image
 *
 * @param {String} src
 * @return {Promise}
 */
function loadImage(src) {
	return new Promise(function (resolve) {
		if (src) {
			var image = new Image();

			image.onload = function (e) {
				resolve(image);
			};
			image.onError = function (e) {
				resolve(null);
			};

			image.setAttribute('crossOrigin', 'anonymous');
			image.src = src;
		} else {
			resolve(null);
		}
	});
}