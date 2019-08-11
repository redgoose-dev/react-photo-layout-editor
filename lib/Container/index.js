"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _classnames = _interopRequireDefault(require("classnames"));

var actions = _interopRequireWildcard(require("../actions"));

var _Body = _interopRequireDefault(require("./Body"));

var _Side = _interopRequireDefault(require("./Side"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Container =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    var _this;

    _classCallCheck(this, Container);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this, props));
    _this.el = null;
    return _this;
  }

  _createClass(Container, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var props = this.props;

      if (!!props.setting.base.updateStoreFunc && typeof props.setting.base.updateStoreFunc === 'function' && (prevProps.tree.side.visible !== props.tree.side.visible || prevProps.tree.side.files !== props.tree.side.files || prevProps.tree.body.setting !== props.tree.body.setting || prevProps.tree.body.grid !== props.tree.body.grid)) {
        props.setting.base.updateStoreFunc();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props;
      props.dispatch(actions.core.init(props.parent.api, props.parent.preference || {
        side: {},
        body: {}
      }, this.el));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      return _react["default"].createElement("div", {
        ref: function ref(r) {
          _this2.el = r;
        },
        className: (0, _classnames["default"])('ple-editor', {
          'ple-side-active': props.tree.side.visible
        })
      }, props.setting && _react["default"].createElement("div", {
        className: "ple-wrap"
      }, _react["default"].createElement(_Body["default"], null), _react["default"].createElement(_Side["default"], null)));
    }
  }]);

  return Container;
}(_react["default"].Component);

Container.displayName = 'Container';
Container.defaultProps = {
  parent: {},
  dispatch: null,
  tree: {},
  setting: null
};

var _default = (0, _reactRedux.connect)(function (state) {
  return Object.assign({}, state, {});
})(Container);

exports["default"] = _default;