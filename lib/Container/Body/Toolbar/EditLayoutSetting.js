'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery/dist/jquery.slim');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactSimpleColorpicker = require('react-simple-colorpicker');

var _reactSimpleColorpicker2 = _interopRequireDefault(_reactSimpleColorpicker);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditLayoutSetting = function (_React$Component) {
	_inherits(EditLayoutSetting, _React$Component);

	function EditLayoutSetting(props) {
		_classCallCheck(this, EditLayoutSetting);

		var _this = _possibleConstructorReturn(this, (EditLayoutSetting.__proto__ || Object.getPrototypeOf(EditLayoutSetting)).call(this, props));

		_this.state = _extends({}, props.defaultSetting, props.setting, {
			popup_bgColor: false
		});
		return _this;
	}

	_createClass(EditLayoutSetting, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			var props = this.props;


			this.setState(_extends({}, props.defaultSetting, props.setting));
		}
	}, {
		key: 'activeBgColorPopup',
		value: function activeBgColorPopup(sw, e) {
			var _this2 = this;

			var state = this.state;

			var cTarget = e ? e.currentTarget : null;

			sw = sw || !state.popup_bgColor;

			if (sw) {
				(0, _jquery2.default)(document).on('click.pleEditBgColor', function (e) {
					if ((0, _jquery2.default)(e.target).closest('.ple-edit-bgColor__popup').length) return;
					if (!(e.target === cTarget) && !(e.target.parentNode === cTarget)) {
						_this2.activeBgColorPopup(false);
					}
				});
			} else {
				(0, _jquery2.default)(document).off('click.pleEditBgColor');
			}

			this.setState({ popup_bgColor: sw });
		}
	}, {
		key: '_submit',
		value: function _submit(e) {
			e.preventDefault();
			this.props.submit(this.state);
		}
	}, {
		key: '_reset',
		value: function _reset() {
			this.setState(_extends({}, this.props.defaultSetting));
		}
	}, {
		key: '_change',
		value: function _change(e) {
			var value = e.target.value || '';
			switch (e.target.type) {
				case 'text':
					this.setState(_defineProperty({}, e.target.name, value));
					break;
				case 'number':
					value = value || 0;
					this.setState(_defineProperty({}, e.target.name, parseInt(value)));
					break;
			}
		}
	}, {
		key: '_openBgColorPicker',
		value: function _openBgColorPicker(e) {
			e.persist();
			this.activeBgColorPopup(null, e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var state = this.state,
			    props = this.props;


			return _react2.default.createElement(
				'form',
				{ onSubmit: function onSubmit(e) {
						return _this3._submit(e);
					}, className: 'ple-edit-setting' },
				_react2.default.createElement(
					'fieldset',
					{ className: 'ple-edit-setting__form' },
					_react2.default.createElement(
						'legend',
						null,
						'Settings form'
					),
					_react2.default.createElement(
						'h1',
						{ className: 'ple-edit-setting__title' },
						'Settings'
					),
					_react2.default.createElement(
						'dl',
						null,
						_react2.default.createElement(
							'dt',
							null,
							_react2.default.createElement(
								'label',
								{ htmlFor: 'frm_width' },
								'Width'
							)
						),
						_react2.default.createElement(
							'dd',
							{ className: 'ple-type-input' },
							_react2.default.createElement('input', {
								type: 'number', name: 'width', id: 'frm_width',
								min: 1, max: 999, maxLength: 3,
								value: state.width,
								onChange: function onChange(e) {
									return _this3._change(e);
								},
								style: { width: '72px' },
								required: true }),
							_react2.default.createElement(
								'span',
								null,
								'px'
							)
						)
					),
					_react2.default.createElement(
						'dl',
						null,
						_react2.default.createElement(
							'dt',
							null,
							_react2.default.createElement(
								'label',
								{ htmlFor: 'frm_height' },
								'Height'
							)
						),
						_react2.default.createElement(
							'dd',
							{ className: 'ple-type-input' },
							_react2.default.createElement('input', {
								type: 'number', name: 'height', id: 'frm_height',
								min: 1, max: 999,
								value: state.height,
								onChange: function onChange(e) {
									return _this3._change(e);
								},
								style: { width: '72px' },
								required: true }),
							_react2.default.createElement(
								'span',
								null,
								'px'
							)
						)
					),
					_react2.default.createElement(
						'dl',
						null,
						_react2.default.createElement(
							'dt',
							null,
							_react2.default.createElement(
								'label',
								{ htmlFor: 'frm_column' },
								'Column'
							)
						),
						_react2.default.createElement(
							'dd',
							{ className: 'ple-type-input' },
							_react2.default.createElement('input', {
								type: 'number', name: 'column', id: 'frm_column',
								min: 1, max: 99,
								value: state.column,
								onChange: function onChange(e) {
									return _this3._change(e);
								},
								style: { width: '54px' },
								required: true }),
							_react2.default.createElement(
								'span',
								null,
								'ea'
							)
						)
					),
					_react2.default.createElement(
						'dl',
						{ className: 'ple-type-input' },
						_react2.default.createElement(
							'dt',
							null,
							_react2.default.createElement(
								'label',
								{ htmlFor: 'frm_outerMargin' },
								'Outer margin'
							)
						),
						_react2.default.createElement(
							'dd',
							null,
							_react2.default.createElement('input', {
								type: 'number', name: 'outerMargin', id: 'frm_outerMargin',
								min: 0, max: 500,
								value: state.outerMargin,
								onChange: function onChange(e) {
									return _this3._change(e);
								},
								style: { width: '58px' },
								required: true }),
							_react2.default.createElement(
								'span',
								null,
								'px'
							)
						)
					),
					_react2.default.createElement(
						'dl',
						{ className: 'ple-type-input' },
						_react2.default.createElement(
							'dt',
							null,
							_react2.default.createElement(
								'label',
								{ htmlFor: 'frm_innerMargin' },
								'Inner margin'
							)
						),
						_react2.default.createElement(
							'dd',
							null,
							_react2.default.createElement('input', {
								type: 'number', name: 'innerMargin', id: 'frm_innerMargin',
								min: 0, max: 500,
								value: state.innerMargin,
								onChange: function onChange(e) {
									return _this3._change(e);
								},
								style: { width: '58px' },
								required: true }),
							_react2.default.createElement(
								'span',
								null,
								'px'
							)
						)
					),
					_react2.default.createElement(
						'dl',
						null,
						_react2.default.createElement(
							'dt',
							null,
							_react2.default.createElement(
								'label',
								{ htmlFor: 'frm_bgColor' },
								'Bg color'
							)
						),
						_react2.default.createElement(
							'dd',
							null,
							_react2.default.createElement(
								'div',
								{ className: 'ple-edit-bgColor' },
								_react2.default.createElement(
									'span',
									{ className: (0, _classnames2.default)('ple-edit-bgColor__inputBox', {
											'ple-edit-bgColor__inputBox-active': state.popup_bgColor
										}) },
									_react2.default.createElement('input', {
										type: 'text',
										name: 'bgColor',
										id: 'frm_bgColor',
										value: state.bgColor,
										onChange: function onChange(e) {
											return _this3._change(e);
										},
										onClick: function onClick(e) {
											return _this3._openBgColorPicker(e);
										},
										readOnly: true,
										required: true,
										className: 'ple-edit-bgColor__input',
										style: { backgroundColor: state.bgColor }
									})
								),
								state.popup_bgColor && _react2.default.createElement(
									'div',
									{ className: 'ple-edit-bgColor__popup' },
									_react2.default.createElement(
										'div',
										{ className: 'ple-edit-bgColor__picker' },
										_react2.default.createElement(_reactSimpleColorpicker2.default, {
											onChange: function onChange(color) {
												return _this3.setState({ bgColor: color });
											},
											color: state.bgColor })
									)
								)
							)
						)
					),
					_react2.default.createElement(
						'dl',
						null,
						_react2.default.createElement(
							'dt',
							null,
							_react2.default.createElement(
								'label',
								{ htmlFor: 'frm_freeMode' },
								'Free mode'
							)
						),
						_react2.default.createElement(
							'dd',
							{ className: 'ple-type-checkbox' },
							_react2.default.createElement(
								'label',
								null,
								_react2.default.createElement('input', {
									type: 'radio', name: 'freeMode', id: 'frm_freeMode',
									onChange: function onChange() {
										return _this3.setState({ freeMode: true });
									},
									checked: state.freeMode }),
								_react2.default.createElement(
									'span',
									null,
									'true'
								)
							),
							_react2.default.createElement(
								'label',
								null,
								_react2.default.createElement('input', {
									type: 'radio', name: 'freeMode',
									onChange: function onChange() {
										return _this3.setState({ freeMode: false });
									},
									checked: !state.freeMode }),
								_react2.default.createElement(
									'span',
									null,
									'false'
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'nav',
					{ className: 'ple-edit-setting__buttons' },
					_react2.default.createElement(
						'span',
						null,
						_react2.default.createElement(
							'button',
							{ type: 'button', onClick: function onClick() {
									return _this3._reset();
								} },
							'Reset'
						)
					),
					_react2.default.createElement(
						'span',
						null,
						_react2.default.createElement(
							'button',
							{ type: 'submit', className: 'ple-submit' },
							'Apply'
						)
					)
				)
			);
		}
	}]);

	return EditLayoutSetting;
}(_react2.default.Component);

EditLayoutSetting.displayName = 'EditLayoutSetting';
EditLayoutSetting.defaultProps = {
	submit: function submit(e) {},
	setting: null,
	defaultSetting: {
		width: 100,
		height: 100,
		column: 5,
		outerMargin: 10,
		innerMargin: 10,
		freeMode: false,
		bgColor: 'rgba(255,255,255,1)'
	}
};
exports.default = EditLayoutSetting;