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

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _Side = require('./Side');

var _Side2 = _interopRequireDefault(_Side);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
	_inherits(Container, _React$Component);

	function Container() {
		_classCallCheck(this, Container);

		var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));

		_this.el = null;
		return _this;
	}

	_createClass(Container, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var props = this.props;


			this.checkChangeStore(props, nextProps);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var props = this.props;


			props.dispatch(actions.core.init(props.parent.api, props.parent.preference || { side: {}, body: {} }, this.el));
		}
	}, {
		key: 'checkChangeStore',
		value: function checkChangeStore(prev, next) {
			if (!(next.setting.base.updateStoreFunc && typeof next.setting.base.updateStoreFunc === 'function')) return null;
			if (prev.tree.side.visible !== next.tree.side.visible || prev.tree.side.files !== next.tree.side.files || prev.tree.body.setting !== next.tree.body.setting || prev.tree.body.grid !== next.tree.body.grid) {
				next.setting.base.updateStoreFunc();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;


			return _react2.default.createElement(
				'div',
				{
					ref: function ref(r) {
						_this2.el = r;
					},
					className: (0, _classnames2.default)('ple-editor', { 'ple-side-active': props.tree.side.visible }) },
				props.setting && _react2.default.createElement(
					'div',
					{ className: 'ple-wrap' },
					_react2.default.createElement(_Body2.default, null),
					_react2.default.createElement(_Side2.default, null)
				)
			);
		}
	}]);

	return Container;
}(_react2.default.Component);

Container.displayName = 'Container';
Container.defaultProps = {
	parent: {},
	dispatch: null,
	tree: {},
	setting: null
};
exports.default = (0, _reactRedux.connect)(function (state) {
	return Object.assign({}, state, {});
})(Container);