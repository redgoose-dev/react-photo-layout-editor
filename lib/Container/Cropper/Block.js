'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery/dist/jquery.slim');

var _jquery2 = _interopRequireDefault(_jquery);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var controlEvent = {
	start: _lib.util.isTouchDevice() ? 'touchstart' : 'mousedown',
	move: _lib.util.isTouchDevice() ? 'touchmove' : 'mousemove',
	end: _lib.util.isTouchDevice() ? 'touchend' : 'mouseup'
};

var Block = function (_React$Component) {
	_inherits(Block, _React$Component);

	function Block(props) {
		_classCallCheck(this, Block);

		var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));

		_this.state = {
			position: props.position,
			size: props.size,
			isCover: props.size === 'cover'
		};

		_this._self = null;
		_this.$self = null;
		_this.$img = null;
		_this.moveStartInfo = {};
		_this.resizeStartInfo = {};
		return _this;
	}

	_createClass(Block, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			// set dom
			this.$self = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this._self));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var props = this.props;


			if (props.size !== nextProps.size) {
				this.setState({
					position: nextProps.position,
					size: nextProps.size,
					isCover: nextProps.size === 'cover'
				});
			}
		}
	}, {
		key: '_moveStart',
		value: function _moveStart(e) {
			var _this2 = this;

			e.stopPropagation();

			var state = this.state;

			// set image element

			this.$img = this.$self.find('img');

			this.moveStartInfo = {
				containerX: parseInt(state.position.split(' ')[0]),
				containerY: parseInt(state.position.split(' ')[1]),
				mouseX: (e.clientX || e.pageX || e.nativeEvent.touches[0].clientX) + (0, _jquery2.default)(window).scrollLeft(),
				mouseY: (e.clientY || e.pageY || e.nativeEvent.touches[0].clientY) + (0, _jquery2.default)(window).scrollTop()
			};

			(0, _jquery2.default)(document).on(controlEvent.move + '.move', function (e) {
				return _this2._moveIng(e);
			}).on(controlEvent.end + '.move', function (e) {
				return _this2._moveEnd(e);
			});
		}
	}, {
		key: '_moveIng',
		value: function _moveIng(e) {
			e.stopPropagation();

			var evt = e.type === 'touchmove' ? e.originalEvent.touches[0] : e;
			var mouse = {};
			var distance = {};

			mouse.x = (evt.clientX || evt.pageX) + (0, _jquery2.default)(window).scrollLeft();
			mouse.y = (evt.clientY || evt.pageY) + (0, _jquery2.default)(window).scrollTop();

			distance.x = this.moveStartInfo.containerX + (mouse.x - this.moveStartInfo.mouseX);
			distance.y = this.moveStartInfo.containerY + (mouse.y - this.moveStartInfo.mouseY);

			this.setState({
				position: parseInt(distance.x) + 'px ' + parseInt(distance.y) + 'px'
			});
		}
	}, {
		key: '_moveEnd',
		value: function _moveEnd(e) {
			e.preventDefault();

			this.$img = null;
			this.moveStartInfo = null;

			(0, _jquery2.default)(document).off(controlEvent.move + '.move').off(controlEvent.end + '.move');
		}
	}, {
		key: '_resizeStart',
		value: function _resizeStart(e) {
			var _this3 = this;

			e.stopPropagation();

			var state = this.state;


			this.$img = this.$self.find('img');
			this.resizeStartInfo = {
				title: e.currentTarget.title,
				width: this.$img.width(),
				height: this.$img.height(),
				mouseX: (e.clientX || e.pageX || e.nativeEvent.touches[0].clientX) + (0, _jquery2.default)(window).scrollLeft(),
				posX: parseInt(state.position.split(' ')[0]),
				posY: parseInt(state.position.split(' ')[1])
			};

			(0, _jquery2.default)(document).on(controlEvent.move + '.resize', function (e) {
				return _this3._resizeIng(e);
			}).on(controlEvent.end + '.resize', function (e) {
				return _this3._resizeEnd(e);
			});
		}
	}, {
		key: '_resizeIng',
		value: function _resizeIng(e) {
			e.stopPropagation();

			var size = {};
			var position = {};
			var ratio = 1;
			var distanceHeight = 0;
			var evt = e.type === 'touchmove' ? e.originalEvent.touches[0] : e;

			// set mouse position
			var distanceX = (evt.clientX || evt.pageX) + (0, _jquery2.default)(window).scrollLeft() - this.resizeStartInfo.mouseX;

			// set position and size
			switch (this.resizeStartInfo.title) {
				case 'resize-lt':
					position.x = this.resizeStartInfo.posX + distanceX;
					size.width = this.resizeStartInfo.width - distanceX;
					ratio = size.width / this.$img.get(0).naturalWidth;
					size.height = parseInt(this.$img.get(0).naturalHeight * ratio);
					distanceHeight = this.resizeStartInfo.height - size.height;
					position.y = this.resizeStartInfo.posY + distanceHeight;
					break;
				case 'resize-rt':
					position.x = this.resizeStartInfo.posX;
					size.width = this.resizeStartInfo.width + distanceX;
					ratio = size.width / this.$img.get(0).naturalWidth;
					size.height = parseInt(this.$img.get(0).naturalHeight * ratio);
					distanceHeight = this.resizeStartInfo.height - size.height;
					position.y = this.resizeStartInfo.posY + distanceHeight;
					break;
				case 'resize-lb':
					position.x = this.resizeStartInfo.posX + distanceX;
					position.y = this.resizeStartInfo.posY;
					size.width = this.resizeStartInfo.width - distanceX;
					ratio = size.width / this.$img.get(0).naturalWidth;
					size.height = parseInt(this.$img.get(0).naturalHeight * ratio);
					break;
				case 'resize-rb':
					position.x = this.resizeStartInfo.posX;
					position.y = this.resizeStartInfo.posY;
					size.width = this.resizeStartInfo.width + distanceX;
					ratio = size.width / this.$img.get(0).naturalWidth;
					size.height = parseInt(this.$img.get(0).naturalHeight * ratio);
					break;
				default:
					return;
			}

			// set image size

			this.setState({
				size: parseInt(size.width) + 'px ' + parseInt(size.height) + 'px',
				position: parseInt(position.x) + 'px ' + parseInt(position.y) + 'px'
			});
		}
	}, {
		key: '_resizeEnd',
		value: function _resizeEnd(e) {
			this.$img = null;
			this.resizeStartInfo = null;

			(0, _jquery2.default)(document).off(controlEvent.move + '.resize').off(controlEvent.end + '.resize');
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var state = this.state,
			    props = this.props;

			var size = state.size !== 'cover' ? state.size.split(' ') : state.size;
			var position = state.position.split(' ');

			return _react2.default.createElement(
				'figure',
				{
					ref: function ref(r) {
						_this4._self = r;
					},
					style: { backgroundColor: props.bgColor },
					className: 'ple-cropperBlock ple-cropper__block' },
				state.isCover ? _react2.default.createElement('span', {
					style: { backgroundImage: 'url(\'' + props.src + '\')' },
					className: 'ple-cropperBlock__image ple-cropperBlock__image-cover' }) : _react2.default.createElement(
					'span',
					{
						className: (0, _classnames2.default)('ple-cropperBlock__image', { 'ple-cropperBlock__image-resize': props.size !== 'cover' }) },
					_react2.default.createElement('img', {
						src: props.src,
						style: Object.assign({}, state.size !== 'cover' && {
							width: size[0],
							transform: 'translate(' + position[0] + ', ' + position[1] + ')'
						}),
						alt: 'image' })
				),
				_react2.default.createElement(
					'div',
					{
						onMouseDown: function onMouseDown(e) {
							return _this4._moveStart(e);
						},
						onTouchStart: function onTouchStart(e) {
							return _this4._moveStart(e);
						},
						style: Object.assign({}, state.size !== 'cover' && {
							width: size[0],
							height: size[1],
							transform: 'translate(' + position[0] + ', ' + position[1] + ')'
						}),
						className: (0, _classnames2.default)('ple-cropperBlock__control', { 'ple-cropperBlock__control-active': props.size !== 'cover' }) },
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							title: 'resize-lt',
							onMouseDown: function onMouseDown(e) {
								return _this4._resizeStart(e);
							},
							onTouchStart: function onTouchStart(e) {
								return _this4._resizeStart(e);
							},
							className: 'ple-cropperBlock__resize ple-cropperBlock__resize-lt' },
						_react2.default.createElement('i', { className: 'ple-sp-ico ple-abs ple-ico-clamp' })
					),
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							title: 'resize-rt',
							onMouseDown: function onMouseDown(e) {
								return _this4._resizeStart(e);
							},
							onTouchStart: function onTouchStart(e) {
								return _this4._resizeStart(e);
							},
							className: 'ple-cropperBlock__resize ple-cropperBlock__resize-rt' },
						_react2.default.createElement('i', { className: 'ple-sp-ico ple-abs ple-ico-clamp' })
					),
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							title: 'resize-lb',
							onMouseDown: function onMouseDown(e) {
								return _this4._resizeStart(e);
							},
							onTouchStart: function onTouchStart(e) {
								return _this4._resizeStart(e);
							},
							className: 'ple-cropperBlock__resize ple-cropperBlock__resize-lb' },
						_react2.default.createElement('i', { className: 'ple-sp-ico ple-abs ple-ico-clamp' })
					),
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							title: 'resize-rb',
							onMouseDown: function onMouseDown(e) {
								return _this4._resizeStart(e);
							},
							onTouchStart: function onTouchStart(e) {
								return _this4._resizeStart(e);
							},
							className: 'ple-cropperBlock__resize ple-cropperBlock__resize-rb' },
						_react2.default.createElement('i', { className: 'ple-sp-ico ple-abs ple-ico-clamp' })
					)
				)
			);
		}
	}]);

	return Block;
}(_react2.default.Component);

Block.displayName = 'Block';
Block.defaultProps = {
	src: '',
	position: '',
	size: '',
	bgColor: '#fff'
};
exports.default = Block;