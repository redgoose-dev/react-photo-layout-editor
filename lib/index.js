'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoLayoutEditor = function (_React$Component) {
	_inherits(PhotoLayoutEditor, _React$Component);

	function PhotoLayoutEditor() {
		_classCallCheck(this, PhotoLayoutEditor);

		// set store
		var _this = _possibleConstructorReturn(this, (PhotoLayoutEditor.__proto__ || Object.getPrototypeOf(PhotoLayoutEditor)).call(this));

		_this.store = (0, _redux.createStore)(_reducers2.default);

		// set api
		_this.api = new _API2.default(_this.store);
		return _this;
	}

	_createClass(PhotoLayoutEditor, [{
		key: 'render',
		value: function render() {
			var props = this.props;


			return _react2.default.createElement(
				_reactRedux.Provider,
				{ store: this.store },
				_react2.default.createElement(_Container2.default, { parent: { preference: props, api: this.api } })
			);
		}
	}]);

	return PhotoLayoutEditor;
}(_react2.default.Component);

PhotoLayoutEditor.displayName = 'PhotoLayoutEditor';
PhotoLayoutEditor.defaultProps = {
	body: {
		setting: {},
		blockColor: '#dddddd',
		grid: []
	},
	side: {
		files: [],
		visible: true
	},
	uploadScript: null,
	uploadParamsConvertFunc: null
};
exports.default = PhotoLayoutEditor;