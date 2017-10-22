'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactGridLayout = require('react-grid-layout');

var _reactGridLayout2 = _interopRequireDefault(_reactGridLayout);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Cropper = require('../../Cropper');

var _Cropper2 = _interopRequireDefault(_Cropper);

var _actions = require('../../../actions');

var actions = _interopRequireWildcard(_actions);

var _lib = require('../../../lib');

var libs = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timeStamp = [];

var GridLayout = function (_React$Component) {
	_inherits(GridLayout, _React$Component);

	function GridLayout(props) {
		_classCallCheck(this, GridLayout);

		return _possibleConstructorReturn(this, (GridLayout.__proto__ || Object.getPrototypeOf(GridLayout)).call(this, props));
	}

	/**
  * on select block
  *
  * @param {String} key
  */


	_createClass(GridLayout, [{
		key: '_selectBlock',
		value: function _selectBlock() {
			var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var props = this.props;


			if (key === null) {
				props.api.grid.select([]);
				return;
			}

			switch (props.keyboard.keyName) {
				case 'CMD':
				case 'CTRL':
				case 'SHIFT':
					if (libs.object.isArray(props.tree.body.activeBlock)) {
						var newActiveBlock = Object.assign([], props.tree.body.activeBlock);
						if (newActiveBlock.indexOf(key) > -1) {
							newActiveBlock.splice(newActiveBlock.indexOf(key), 1);
						} else {
							newActiveBlock.push(key);
						}
						props.api.grid.select(newActiveBlock);
						return;
					}
					break;
			}

			props.api.grid.select([key]);
		}

		/**
   * On update blocks
   *
   * @param {String} type
   * @param {Array} layout
   * @param {HTMLElement} element
   */

	}, {
		key: '_updateBlocks',
		value: function _updateBlocks(type) {
			var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
			var props = this.props;

			/**
    * convert layout
    *
    * @return {Object}
    */

			function convertLayout() {
				var result = {};
				for (var i = 0; i < layout.length; i++) {
					result[layout[i].i.split('__')[1]] = layout[i];
				}
				return result;
			}

			switch (type) {
				case 'start':
					timeStamp[0] = new Date().getTime();
					break;

				case 'end':
					timeStamp[1] = new Date().getTime();
					if (timeStamp[1] - timeStamp[0] > 400) {
						var newLayout = convertLayout();
						var newGrid = {};
						Object.keys(props.tree.body.grid).forEach(function (k) {
							newGrid[k] = _extends({}, props.tree.body.grid[k], {
								layout: {
									x: newLayout[k].x,
									y: newLayout[k].y,
									w: newLayout[k].w,
									h: newLayout[k].h
								}
							});
						});
						props.dispatch(actions.body.updateBlocks(newGrid));
					}
					timeStamp = [];
					break;
			}
		}

		/**
   * Render item
   *
   * @param {String} k
   * @return {Component}
   */

	}, {
		key: 'renderItem',
		value: function renderItem(k) {
			var _this2 = this;

			var props = this.props;
			var _props$tree$body = props.tree.body,
			    activeBlock = _props$tree$body.activeBlock,
			    grid = _props$tree$body.grid;

			var item = grid[k];

			var key = item.indexPrefix + '__' + k;
			var active = !!(activeBlock && activeBlock.length && activeBlock.indexOf(k) > -1);

			return _react2.default.createElement(
				'div',
				{
					key: key,
					'data-grid': item.layout,
					'data-key': k,
					onClick: function onClick(event) {
						event.stopPropagation();
						_this2._selectBlock(k, !!item.image);
					},
					style: { backgroundColor: item.color || props.setting.body.blockColor },
					className: (0, _classnames2.default)({ 'ple-grid__item-active': active }) },
				item.image && _react2.default.createElement('figure', {
					style: {
						backgroundImage: 'url(\'' + item.image.src + '\')',
						backgroundPosition: item.image.position,
						backgroundSize: item.image.size
					} })
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var props = this.props;
			var setting = props.tree.body.setting;

			var bodyWidth = setting.width * setting.column + setting.innerMargin * (setting.column - 1) + setting.outerMargin * 2;

			return _react2.default.createElement(
				'div',
				{ className: 'ple-grid__wrap', onClick: function onClick() {
						return _this3._selectBlock();
					} },
				_react2.default.createElement(
					'div',
					{ className: 'ple-grid__body', style: { width: bodyWidth + 'px' } },
					_react2.default.createElement(
						_reactGridLayout2.default,
						{
							autoSize: true,
							cols: setting.column,
							rowHeight: setting.height,
							width: bodyWidth,
							margin: [setting.innerMargin, setting.innerMargin],
							containerPadding: [setting.outerMargin, setting.outerMargin],
							verticalCompact: !setting.freeMode,
							onDragStart: function onDragStart() {
								return _this3._updateBlocks('start');
							},
							onDragStop: function onDragStop(layout, oldItem, newItem, placeholder, e, element) {
								return _this3._updateBlocks('end', layout, element);
							},
							onResizeStart: function onResizeStart() {
								return _this3._updateBlocks('start');
							},
							onResizeStop: function onResizeStop(layout, oldItem, newItem, placeholder, e, element) {
								return _this3._updateBlocks('end', layout, element);
							},
							style: {
								width: '100%',
								backgroundColor: setting.bgColor
							},
							className: 'ple-grid' },
						Object.keys(props.tree.body.grid).map(function (k) {
							return _this3.renderItem(k);
						})
					),
					props.tree.cropper.visible ? _react2.default.createElement(_Cropper2.default, null) : null
				)
			);
		}
	}]);

	return GridLayout;
}(_react2.default.Component);

GridLayout.displayName = 'GridLayout';
GridLayout.defaultProps = {
	tree: null,
	dispatch: null
};
exports.default = (0, _reactRedux.connect)(function (state) {
	return Object.assign({}, state, {});
})(GridLayout);