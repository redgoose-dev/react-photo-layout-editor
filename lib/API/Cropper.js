'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cropper = function () {
	function Cropper(store) {
		_classCallCheck(this, Cropper);

		this.store = store;
	}

	/**
  * open cropper
  *
  * @param {Number} key
  */


	_createClass(Cropper, [{
		key: 'open',
		value: function open(key) {
			var state = this.store.getState();
			var item = null;

			try {
				item = state.tree.body.grid[key];
				if (!item.image) throw 'Not found image in item';
			} catch (e) {
				alert(e);
				return;
			}

			this.store.dispatch(actions.cropper.open(key, item));
		}
	}, {
		key: 'close',


		/**
   * close cropper
   *
   * @param {Number} key
   * @param {String} position
   * @param {String} size
   */
		value: function close(key, position, size) {
			this.store.dispatch(actions.cropper.close(key, position, size));
		}
	}]);

	return Cropper;
}();

exports.default = Cropper;