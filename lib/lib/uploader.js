'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = uploader;

var _jquery = require('jquery/dist/jquery.slim');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * local upload
 *
 * @param {File} file
 * @return {Promise}
 */
function local(file) {
	var defer = _jquery2.default.Deferred();
	var reader = new FileReader();

	reader.addEventListener('load', function (e) {
		defer.resolve({
			name: file.name,
			type: file.type,
			size: file.size,
			url: e.target.result
		});
	});
	reader.addEventListener('error', function (e) {
		defer.reject(e.target);
	});

	reader.readAsDataURL(file);

	return defer.promise();
}

/**
 * external upload
 *
 * @param {String} script
 * @param {File} file
 * @return {Promise}
 */
function external(script, file) {
	var defer = _jquery2.default.Deferred();
	var xhr = new XMLHttpRequest();

	if (!(typeof FormData === 'function' || (typeof FormData === 'undefined' ? 'undefined' : _typeof(FormData)) === 'object')) {
		defer.reject('not support browser', file);
		return null;
	}
	var formData = new FormData();

	function onLoad(e) {
		try {
			var result = JSON.parse(e.target.responseText);
			if (result.state === 'success') {
				defer.resolve(result.data);
			} else {
				throw 'server error';
			}
		} catch (e) {
			defer.reject(e);
		}
	}

	function onProgress(event) {
		var loaded = event.loaded,
		    total = event.total;

		defer.notify('progress', loaded, total);
	}

	formData.append('files[]', file);
	xhr.open('post', script, true);

	xhr.addEventListener('load', onLoad);
	xhr.upload.addEventListener('progress', onProgress);

	xhr.send(formData);

	// start queue
	defer.notify('start');

	return defer.promise();
}

/**
 * upload multiple files
 *
 */
function uploader(files, script) {
	var defer = _jquery2.default.Deferred();
	var total = files.length;
	var count = 0;

	function upload() {
		if (count >= total) {
			defer.resolve();
			return;
		}

		if (script) {
			external(script, files[count]).done(function (data) {
				defer.notify('done', { count: count, data: data });
				count++;
				upload();
			}).progress(function (state, loaded, total) {
				defer.notify(state, state === 'progress' && { loaded: loaded, total: total });
			}).fail(function (error) {
				defer.reject(error);
			});
		} else {
			local(files[count]).done(function (data) {
				defer.notify('done', { count: count, data: data });
				count++;
				upload();
			}).fail(function () {});
		}
	}

	upload(0);

	return defer.promise();
}