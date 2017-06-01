/**
 * is touch device
 *
 * @returns {boolean}
 */
export function isTouchDevice()
{
	return (
		('ontouchstart' in window) ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0)
	);
}


/**
 * Sleep
 *
 * @param {Number} time
 * @param {String} id
 * @return {Promise}
 */
export function sleep(time, id='pleTimer')
{
	return new Promise((resolve) => {
		window[id] = setTimeout(resolve, time);
	});
}


/**
 * Get image size
 *
 * @param {String} src
 * @return {Promise}
 */
export function getImageSize(src)
{
	return new Promise((resolve, reject) => {
		if (!(src && typeof src === 'string')) reject();

		let img = document.createElement('img');

		img.onload = function()
		{
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight,
				ratio: img.naturalHeight / img.naturalWidth,
			});
		};

		img.onerror = function()
		{
			reject();
		};

		img.src = src;
	});
}


/**
 * Get css prefix
 *
 * @variation {Object}
 */
export const cssPrefix = (function()
{
	const styles = window.getComputedStyle(document.documentElement, '');
	const pre = (Array.prototype.slice
		.call(styles)
		.join('')
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	)[1];
	const dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

	return {
		dom: dom,
		lowercase: pre,
		css: `-${pre}-`,
		js: pre[0].toUpperCase() + pre.substr(1)
	};
})();