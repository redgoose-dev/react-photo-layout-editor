'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jquery = require('jquery/dist/jquery.slim');

var _jquery2 = _interopRequireDefault(_jquery);

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

var _ToggleSideButton = require('./ToggleSideButton');

var _ToggleSideButton2 = _interopRequireDefault(_ToggleSideButton);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Items = require('./Items');

var _Items2 = _interopRequireDefault(_Items);

var _lib = require('../../lib');

var lib = _interopRequireWildcard(_lib);

var _selectItems = require('./selectItems');

var _selectItems2 = _interopRequireDefault(_selectItems);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Side = function (_React$Component) {
	_inherits(Side, _React$Component);

	function Side(props) {
		_classCallCheck(this, Side);

		var _this = _possibleConstructorReturn(this, (Side.__proto__ || Object.getPrototypeOf(Side)).call(this, props));

		_this.dragTarget = null;
		_this.dragPosition = [];
		_this.$gridItems = null;
		_this.$dragItem = null;
		_this.uploading = false;
		return _this;
	}

	/**
  * get gridster item
  * 포인트 위치에 있는 gridster블럭을 가져온다.
  *
  * @return {Object} gridster item
  */


	_createClass(Side, [{
		key: 'getGridsterItem',
		value: function getGridsterItem() {
			var _this2 = this;

			var props = this.props;

			var target = null;
			this.$gridItems = (0, _jquery2.default)(props.element).find('.ple-grid > div');

			this.$gridItems.each(function (n, el) {
				var $this = (0, _jquery2.default)(el);
				var pos = $this.offset();
				if (pos.left < _this2.dragPosition[0] && pos.left + $this.width() > _this2.dragPosition[0] && pos.top < _this2.dragPosition[1] && pos.top + $this.height() > _this2.dragPosition[1]) {
					target = $this.data('key');
					return false;
				}
			});

			return target;
		}

		/**
   * On select items
   *
   * @param {Number} key
   */

	}, {
		key: '_selectItem',
		value: function _selectItem(key) {
			var props = this.props;

			var selected = (0, _selectItems2.default)(props, key);
			props.api.side.select(selected);
		}

		/**
   * Remove items
   */

	}, {
		key: '_removeItems',
		value: function _removeItems() {
			var props = this.props;

			var keys = props.api.side.getKeys('selected');

			if (keys.length) {
				if (confirm('Do you really want to delete it?')) {
					props.api.side.remove(keys);
				}
			} else {
				if (!confirm('Delete all?')) return;
				keys = props.api.side.getKeys('all');
				props.api.side.remove(keys);
			}
		}

		/**
   * upload
   *
   * @param {FileList} files
   */

	}, {
		key: '_upload',
		value: function _upload(files) {
			var props = this.props;

			props.api.side.upload(files);
		}

		/**
   * Attach images to grid
   */

	}, {
		key: '_attach',
		value: function _attach() {
			try {
				var keys = this.props.api.side.getKeys('selected');
				var result = this.props.api.side.attachToGrid(keys);
				if (result) throw result;
			} catch (e) {
				alert(e.message);
			}
		}
	}, {
		key: '_dragStartItem',
		value: function _dragStartItem(evt) {
			var _this3 = this;

			var props = this.props;

			// for firefox

			evt.dataTransfer.setData('text/plain', null);

			this.$gridItems = (0, _jquery2.default)(props.element).find('.ple-grid > div');
			this.$gridItems.on('dragover', function (e) {
				e.preventDefault();
				if ((0, _jquery2.default)(e.currentTarget).hasClass('ple-grid__item-hover')) return;
				(0, _jquery2.default)(e.currentTarget).addClass('ple-grid__item-hover');
			}).on('dragleave', function (e) {
				e.preventDefault();
				(0, _jquery2.default)(e.currentTarget).removeClass('ple-grid__item-hover');
			}).on('drop', function (e) {
				e.preventDefault();
				(0, _jquery2.default)(e.currentTarget).removeClass('ple-grid__item-hover');
				_this3.dragTarget = (0, _jquery2.default)(e.currentTarget).data('key');
			});
		}
	}, {
		key: '_dragEndItem',
		value: function _dragEndItem(e) {
			var props = this.props;


			this.$gridItems.off();
			this.$gridItems = null;

			// check drag target
			if (this.dragTarget === null) return;

			// play redux
			props.dispatch(actions.body.attachImage(this.dragTarget, (0, _jquery2.default)(e.currentTarget).data('image')));

			// empty dragTarget
			this.dragTarget = null;
		}
	}, {
		key: '_touchStartItem',
		value: function _touchStartItem(e) {
			this.$dragItem = (0, _jquery2.default)(e.currentTarget).clone().removeAttr('draggable').addClass('ple-side__placeholder').width((0, _jquery2.default)(e.currentTarget).width()).height((0, _jquery2.default)(e.currentTarget).height());

			(0, _jquery2.default)('body').append(this.$dragItem);
		}
	}, {
		key: '_touchMoveItem',
		value: function _touchMoveItem(e) {
			if (!lib.util.checkSupportCss('touch-action', 'pan-y')) {
				e.preventDefault();
			}

			var touch = e.nativeEvent.touches[0];
			this.dragPosition = [touch.pageX, touch.pageY];
			this.$dragItem.css({
				left: touch.pageX - this.$dragItem.width() * 0.5,
				top: touch.pageY - this.$dragItem.height() * 0.5
			});
		}
	}, {
		key: '_touchEndItem',
		value: function _touchEndItem(e) {
			var props = this.props;


			this.$dragItem.remove();
			this.$dragItem = null;

			if (this.dragPosition.length > 0) {
				this.dragTarget = this.getGridsterItem();

				// check drag target
				if (this.dragTarget === null) return;

				// play redux
				props.dispatch(actions.body.attachImage(this.dragTarget, (0, _jquery2.default)(e.currentTarget).data('image')));
				this.dragPosition = [];
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var props = this.props;


			return _react2.default.createElement(
				'aside',
				{ className: 'ple-side' },
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('ple-side__wrap', { 'ple-side__wrap-show': props.tree.side.visible }) },
					_react2.default.createElement('span', {
						onClick: function onClick() {
							return props.api.side.toggleSelectAll(false);
						},
						className: 'ple-side__background' }),
					_react2.default.createElement(_ToggleSideButton2.default, {
						show: props.tree.side.visible,
						onClick: function onClick() {
							return props.api.util.toggleSide(undefined);
						} }),
					_react2.default.createElement(_Navigation2.default, {
						onAttach: function onAttach() {
							return _this4._attach();
						},
						onToggleSelect: function onToggleSelect() {
							return props.api.side.toggleSelectAll();
						},
						onUpload: function onUpload(e) {
							return _this4._upload(e);
						},
						onRemove: function onRemove() {
							return _this4._removeItems();
						} }),
					_react2.default.createElement(_Items2.default, {
						files: props.tree.side.files,
						onSelect: function onSelect(e) {
							return _this4._selectItem(e);
						},
						onDragStart: function onDragStart(e) {
							return _this4._dragStartItem(e);
						},
						onDragEnd: function onDragEnd(e) {
							return _this4._dragEndItem(e);
						},
						onTouchStart: function onTouchStart(e) {
							return _this4._touchStartItem(e);
						},
						onTouchMove: function onTouchMove(e) {
							return _this4._touchMoveItem(e);
						},
						onTouchEnd: function onTouchEnd(e) {
							return _this4._touchEndItem(e);
						},
						progress: props.tree.side.progressPercent })
				)
			);
		}
	}]);

	return Side;
}(_react2.default.Component);

Side.displayName = 'Side';
Side.defaultProps = {
	tree: {}, // data tree in reduce
	setting: {}, // setting in reduce
	api: {}, // api
	dispatch: null // redux dispatch
};
exports.default = (0, _reactRedux.connect)(function (state) {
	return Object.assign({}, state);
})(Side);