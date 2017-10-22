'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Items = function (_React$Component) {
	_inherits(Items, _React$Component);

	function Items() {
		_classCallCheck(this, Items);

		return _possibleConstructorReturn(this, (Items.__proto__ || Object.getPrototypeOf(Items)).apply(this, arguments));
	}

	_createClass(Items, [{
		key: 'render',
		value: function render() {
			var props = this.props;


			return _react2.default.createElement(
				'div',
				{ className: 'ple-sideItems' },
				_react2.default.createElement(
					'div',
					{ className: 'ple-sideItems__wrap' },
					_react2.default.createElement(
						'ul',
						null,
						Object.keys(props.files).map(function (o) {
							return _react2.default.createElement(_Item2.default, {
								key: o,
								id: o,
								image: props.files[o].image,
								onDragStart: props.onDragStart,
								onDragEnd: props.onDragEnd,
								onTouchStart: props.onTouchStart,
								onTouchMove: props.onTouchMove,
								onTouchEnd: props.onTouchEnd,
								onClick: function onClick() {
									return props.onSelect(parseInt(o));
								},
								active: props.files[o].active });
						}),
						props.progress !== null && _react2.default.createElement(
							'li',
							{ className: 'ple-sideItems__loading' },
							_react2.default.createElement(
								'div',
								{ className: 'ple-sideItems__progress' },
								_react2.default.createElement('span', {
									className: 'ple-sideItems__bar',
									style: { height: props.progress + '%' } }),
								_react2.default.createElement(
									'span',
									{ className: 'ple-sideItems__percent' },
									props.progress + '%'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return Items;
}(_react2.default.Component);

Items.displayName = 'Items';
Items.defaultProps = {
	files: [], // files
	onSelect: function onSelect(key) {}, // on select event
	onDragStart: null, // on drag start
	onDragEnd: null, // on drag end
	onTouchStart: null, // on touch start
	onTouchMove: null, // on touch move
	onTouchEnd: null, // on touch end
	progress: null // on progress number
};
exports.default = Items;