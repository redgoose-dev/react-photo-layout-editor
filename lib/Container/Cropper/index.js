'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _jquery = require('jquery/dist/jquery.slim');

var _jquery2 = _interopRequireDefault(_jquery);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _lib = require('../../lib');

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


// library


var Cropper = function (_React$Component) {
	_inherits(Cropper, _React$Component);

	function Cropper(props) {
		_classCallCheck(this, Cropper);

		var _this = _possibleConstructorReturn(this, (Cropper.__proto__ || Object.getPrototypeOf(Cropper)).call(this, props));

		var cropper = props.tree.cropper;


		_this.imageMeta = null;
		_this._block = null;
		_this.$item = (0, _jquery2.default)(props.element).find('.react-grid-item').filter('[data-key=' + cropper.key + ']');

		_this.state = {
			pending: true,
			position: cropper.item.image.position,
			size: cropper.item.image.size || 'cover',
			width: _this.$item.width(),
			height: _this.$item.height(),
			top: _this.$item.position().top,
			left: _this.$item.position().left
		};
		return _this;
	}

	_createClass(Cropper, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var props = this.props;
			var cropper = props.tree.cropper;


			lib.util.getImageSize(cropper.item.image.src).then(function (res) {
				_this2.imageMeta = res;
				_this2.setState({ pending: false });
			});
		}

		/**
   * close cropper
   * `cropper`를 닫고, 변경된 이미지를 `grid`로 보낸다.
   */

	}, {
		key: '_onClose',
		value: function _onClose() {
			var props = this.props;

			props.api.cropper.close(props.tree.cropper.key, this._block.state.position, this._block.state.size);
		}

		/**
   * toggle image type
   * 직접 리사이즈를 사용하는지 기본(꽉채우는..)타입으로 사용할건지 변경하는 액션
   */

	}, {
		key: '_toggleImageType',
		value: function _toggleImageType() {
			var state = this.state,
			    props = this.props;


			if (state.size === 'cover') {
				var targetSize = '';
				var ratio = 0;
				if (state.height > state.width) {
					ratio = lib.number.getRatioForResize(state.height, this.imageMeta.height);
					targetSize = parseInt(this.imageMeta.width * ratio) + 'px ' + state.height + 'px';
				} else {
					ratio = lib.number.getRatioForResize(state.width, this.imageMeta.width);
					targetSize = state.width + 'px ' + parseInt(this.imageMeta.height * ratio) + 'px';
				}
				this.setState({
					position: '0 0',
					size: targetSize
				});
			} else {
				this.setState({
					position: '50% 50%',
					size: 'cover'
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var state = this.state,
			    props = this.props;


			if (state.pending) return null;

			return _react2.default.createElement(
				'div',
				{ className: 'ple-cropper' },
				_react2.default.createElement('span', { className: 'ple-cropper__bg' }),
				_react2.default.createElement(
					'div',
					{
						style: {
							width: state.width + 'px',
							height: state.height + 'px',
							top: state.top + 'px',
							left: state.left + 'px'
						},
						className: 'ple-cropper__wrap' },
					_react2.default.createElement(_Block2.default, {
						ref: function ref(r) {
							_this3._block = r;
						},
						src: props.tree.cropper.item.image.src,
						position: state.position,
						size: state.size,
						bgColor: props.tree.cropper.item.color || props.setting.body.blockColor }),
					_react2.default.createElement(
						'nav',
						{ className: 'ple-cropper__nav' },
						_react2.default.createElement(
							'button',
							{ type: 'button', onClick: function onClick() {
									return _this3._onClose();
								} },
							_react2.default.createElement(
								'i',
								{ className: 'ple-sp-ico ple-ico-close ple-abs' },
								'Close cropper'
							)
						),
						_react2.default.createElement(
							'button',
							{
								type: 'button',
								onClick: function onClick() {
									return _this3._toggleImageType();
								},
								className: (0, _classnames2.default)({
									'ple-cropper__nav-active': state.size !== 'cover'
								}) },
							_react2.default.createElement(
								'i',
								{ className: 'ple-sp-ico ple-ico-resize ple-abs' },
								'Toggle background size type'
							)
						)
					)
				)
			);
		}
	}]);

	return Cropper;
}(_react2.default.Component);

Cropper.displayName = 'Cropper';
exports.default = (0, _reactRedux.connect)(function (state) {
	return Object.assign({}, state, {});
})(Cropper);