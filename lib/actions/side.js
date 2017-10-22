'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.visible = visible;
exports.toggle = toggle;
exports.addFiles = addFiles;
exports.removeFiles = removeFiles;
exports.updateSelected = updateSelected;
exports.updateProgress = updateProgress;

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// control visible side bar
function visible(sw) {
	return {
		type: types.SIDE_VISIBLE,
		value: sw
	};
}

// toggle side bar
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