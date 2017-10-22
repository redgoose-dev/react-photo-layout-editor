'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lib = require('../../../lib');

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item() {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
	}

	_createClass(Item, [{
		key: 'render',
		value: function render() {
			var props = this.props;


			var attr = Object.assign({}, lib.util.isTouchDevice() ? {
				onTouchStart: props.onTouchStart,
				onTouchMove: props.onTouchMove,
				onTouchEnd: props.onTouchEnd
			} : {
				onDragStart: props.onDragStart,
				onDragEnd: props.onDragEnd
			});

			return _react2.default.createElement(
				'li',
				null,
				_react2.default.createElement('span', _extends({
					type: 'button',
					'data-id': props.id,
					'data-image': props.image,
					draggable: true,
					onClick: props.onClick
				}, attr, {
					style: { backgroundImage: 'url(\'' + props.image + '\')' },
					className: (0, _classnames2.default)({ 'ple-sideItems__item-active': props.active }) }))
			);
		}
	}]);

	return Item;
}(_react2.default.Component);

Item.displayName = 'Item';
Item.defaultProps = {
	image: null, // image
	id: null, // id
	active: null, // active item
	onClick: null, // on click item
	onDragStart: null, // on drag start
	onDragEnd: null, // on drag end
	onTouchStart: null, // on touch start
	onTouchMove: null, // on touch move
	onTouchEnd: null // on touch end
};
exports.default = Item;