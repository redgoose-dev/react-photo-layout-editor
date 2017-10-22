'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _jquery = require('jquery/dist/jquery.slim');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactSimpleColorpicker = require('react-simple-colorpicker');

var _reactSimpleColorpicker2 = _interopRequireDefault(_reactSimpleColorpicker);

var _actions = require('../../../actions');

var actions = _interopRequireWildcard(_actions);

var _lib = require('../../../lib');

var libs = _interopRequireWildcard(_lib);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _EditLayoutSetting = require('./EditLayoutSetting');

var _EditLayoutSetting2 = _interopRequireDefault(_EditLayoutSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_React$Component) {
	_inherits(Toolbar, _React$Component);

	function Toolbar(props) {
		_classCallCheck(this, Toolbar);

		var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

		_this.state = {
			active: {
				setting: false,
				editBlockColor: false
			},
			visible: {
				setting: true,
				shuffle: true,
				add: true,
				select: true,
				edit: false,
				removeImage: false,
				duplicate: false,
				removeBlock: false,
				editColor: false
			}
		};
		return _this;
	}

	_createClass(Toolbar, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var state = this.state,
			    props = this.props;


			var newState = Object.assign({}, state);
			var updated = false;

			// select block
			if (props.tree.body.activeBlock.length !== nextProps.tree.body.activeBlock.length) {
				var active = !!nextProps.tree.body.activeBlock.length;
				newState.visible = Object.assign({}, newState.visible, {
					edit: false,
					removeImage: false,
					duplicate: active,
					removeBlock: active,
					editColor: active
				});
				updated = true;
			}

			if (nextProps.tree.body.activeBlock[0]) {
				// check image block
				var isImage = false;
				nextProps.tree.body.activeBlock.some(function (k) {
					if (nextProps.tree.body.grid[k].image) {
						isImage = true;
						return true;
					}
				});

				// select image block
				var block = nextProps.tree.body.grid[nextProps.tree.body.activeBlock[0]];
				newState.visible = Object.assign({}, newState.visible, {
					removeImage: isImage,
					edit: !!(block && block.image)
				});
				updated = true;
			}

			if (updated) {
				this.setState(newState);
			}
		}
	}, {
		key: 'changeActive',
		value: function changeActive(keyName, userSW, event) {
			var _this2 = this;

			var state = this.state;

			var sw = userSW || !state.active[keyName];
			var cTarget = event ? event.currentTarget : null;

			if (sw) {
				(0, _jquery2.default)(document).on('click.pleToolbar', function (e) {
					if ((0, _jquery2.default)(e.target).closest('.ple-toolbar__pop').length) return;
					if (!(e.target === cTarget) && !(e.target.parentNode === cTarget)) {
						_this2.changeActive(keyName, false);
					}
				});
			} else {
				(0, _jquery2.default)(document).off('click.pleToolbar');
			}

			this.setState({
				active: _extends({}, state.active, _defineProperty({
					setting: false,
					editColor: false
				}, keyName, sw))
			});
		}
	}, {
		key: 'deactivate',
		value: function deactivate() {
			var _this3 = this;

			(0, _jquery2.default)(document).off('click.pleToolbar');
			return new Promise(function (reject) {
				_this3.setState({
					active: {
						setting: false,
						editColor: false
					}
				}, reject);
			});
		}

		/**
   * Submit edit setting
   *
   * @param {Object} state
   * @return {Boolean}
   */

	}, {
		key: 'submitEditSetting',
		value: function submitEditSetting(state) {
			var _this4 = this;

			// update setting
			this.props.dispatch(actions.body.updateSetting(state));

			// close palette
			libs.util.sleep(50).then(function () {
				return _this4.changeActive('setting', false);
			});

			return false;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var state = this.state,
			    props = this.props;

			var activeBlockColor = '#fff';

			if (_typeof(props.tree.body.grid) === 'object' && libs.object.isArray(props.tree.body.activeBlock)) {
				var n = props.tree.body.activeBlock[0];
				activeBlockColor = props.tree.body.grid[n] && props.tree.body.grid[n].color ? props.tree.body.grid[n].color : props.setting.body.blockColor;
			}

			return _react2.default.createElement(
				'nav',
				{ className: 'ple-toolbar' },
				_react2.default.createElement(
					'div',
					{ className: 'ple-toolbar__wrap' },
					state.visible.setting && _react2.default.createElement(
						_Button2.default,
						{
							iconClass: 'ple-ico-setting',
							className: (0, _classnames2.default)('ple-edit-setting', {
								'ple-toolbar__block-active': state.active.setting
							}),
							onClick: function onClick(e) {
								e.persist();
								if (!state.active.setting) {
									_this5.deactivate().then(function () {
										_this5.changeActive('setting', null, e);
									});
								}
							},
							title: 'Edit preference' },
						_react2.default.createElement(_EditLayoutSetting2.default, {
							submit: function submit(e) {
								return _this5.submitEditSetting(e);
							},
							setting: props.tree.body.setting,
							defaultSetting: props.setting.body.setting })
					),
					state.visible.shuffle && _react2.default.createElement(_Button2.default, {
						iconClass: 'ple-ico-arrow-random',
						onClick: function onClick() {
							return props.api.grid.shuffle();
						},
						title: 'Shuffle block' }),
					state.visible.add && _react2.default.createElement(_Button2.default, {
						iconClass: 'ple-ico-plus',
						onClick: function onClick() {
							return props.api.grid.add();
						},
						title: 'Add block' }),
					state.visible.select && _react2.default.createElement(_Button2.default, {
						iconClass: 'ple-ico-select',
						onClick: function onClick() {
							return props.api.grid.toggleSelectAll();
						},
						title: 'Toggle select block' }),
					state.visible.edit && _react2.default.createElement(_Button2.default, {
						iconClass: 'ple-ico-pencil',
						className: 'ple-toolbar__block-key',
						onClick: function onClick() {
							return props.api.cropper.open(props.tree.body.activeBlock[0]);
						},
						title: 'Edit block' }),
					state.visible.removeImage && _react2.default.createElement(_Button2.default, {
						iconClass: 'ple-ico-empty',
						className: 'ple-toolbar__block-key',
						onClick: function onClick() {
							return props.api.grid.removeImages(props.tree.body.activeBlock);
						},
						title: 'Remove image in block' }),
					state.visible.duplicate && _react2.default.createElement(_Button2.default, {
						iconClass: 'ple-ico-duplicate',
						className: 'ple-toolbar__block-key',
						onClick: function onClick() {
							if (props.tree.body.activeBlock === null) {
								alert('Not found select block');
								return;
							}
							props.dispatch(actions.body.duplicateBlock(props.tree.body.activeBlock));
						},
						title: 'Duplicate block' }),
					state.visible.removeBlock && _react2.default.createElement(_Button2.default, {
						iconClass: 'ple-ico-trash',
						className: 'ple-toolbar__block-key',
						onClick: function onClick() {
							if (props.tree.body.activeBlock === null) {
								alert('Not found select block');
								return;
							}
							props.api.grid.remove(props.tree.body.activeBlock);
						},
						title: 'Remove block' }),
					state.visible.editColor && _react2.default.createElement(
						_Button2.default,
						{
							iconClass: 'ple-ico-palette',
							className: (0, _classnames2.default)('ple-edit-color', 'ple-toolbar__block-key', { 'ple-toolbar__block-active': state.active.editColor }),
							onClick: function onClick(e) {
								e.persist();
								if (!state.active.editColor) {
									_this5.deactivate().then(function () {
										return _this5.changeActive('editColor', null, e);
									});
								}
							},
							title: 'Change color' },
						_react2.default.createElement(
							'div',
							{ className: 'ple-colorPicker__wrap' },
							_react2.default.createElement(_reactSimpleColorpicker2.default, {
								onChange: function onChange(color) {
									if (!color) return;
									props.dispatch(actions.body.changeColorBlock(props.tree.body.activeBlock, color));
								},
								color: activeBlockColor,
								className: 'ple-colorPicker__body' })
						)
					)
				)
			);
		}
	}]);

	return Toolbar;
}(_react2.default.Component);

Toolbar.displayName = 'Toolbar';
Toolbar.defaultProps = {
	dispatch: null,
	tree: null
};
exports.default = (0, _reactRedux.connect)(function (state) {
	return Object.assign({}, state, {});
})(Toolbar);