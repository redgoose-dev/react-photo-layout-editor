"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _jquery = _interopRequireDefault(require("jquery/dist/jquery.slim"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Block = _interopRequireDefault(require("./Block"));

var lib = _interopRequireWildcard(require("../../lib"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Cropper = /*#__PURE__*/function (_React$Component) {
  _inherits(Cropper, _React$Component);

  var _super = _createSuper(Cropper);

  function Cropper(props) {
    var _this;

    _classCallCheck(this, Cropper);

    _this = _super.call(this, props);
    var cropper = props.tree.cropper;
    _this.imageMeta = null;
    _this._block = null;
    _this.$item = (0, _jquery["default"])(props.element).find('.react-grid-item').filter("[data-key=".concat(cropper.key, "]"));
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props;
      var cropper = props.tree.cropper;
      lib.util.getImageSize(cropper.item.image.src).then(function (res) {
        _this2.imageMeta = res;

        _this2.setState({
          pending: false
        });
      });
    }
    /**
     * close cropper
     * `cropper`를 닫고, 변경된 이미지를 `grid`로 보낸다.
     */

  }, {
    key: "_onClose",
    value: function _onClose() {
      var props = this.props;
      props.api.cropper.close(props.tree.cropper.key, this._block.state.position, this._block.state.size);
    }
    /**
     * toggle image type
     * 직접 리사이즈를 사용하는지 기본(꽉채우는..)타입으로 사용할건지 변경하는 액션
     */

  }, {
    key: "_toggleImageType",
    value: function _toggleImageType() {
      var state = this.state,
          props = this.props;

      if (state.size === 'cover') {
        var targetSize = '';
        var ratio = 0;

        if (state.height > state.width) {
          ratio = lib.number.getRatioForResize(state.height, this.imageMeta.height);
          targetSize = "".concat(parseInt(this.imageMeta.width * ratio), "px ").concat(state.height, "px");
        } else {
          ratio = lib.number.getRatioForResize(state.width, this.imageMeta.width);
          targetSize = "".concat(state.width, "px ").concat(parseInt(this.imageMeta.height * ratio), "px");
        }

        this.setState({
          position: '0 0',
          size: targetSize
        });
      } else {
        this.setState({
          position: "50% 50%",
          size: 'cover'
        });
      }
    }
    /**
     * on update block
     *
     * @param {object} state
     */

  }, {
    key: "onUpdateBlock",
    value: function onUpdateBlock(state) {
      this.setState(state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var state = this.state,
          props = this.props;
      if (state.pending) return null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-cropper"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "ple-cropper__bg"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: "".concat(state.width, "px"),
          height: "".concat(state.height, "px"),
          top: "".concat(state.top, "px"),
          left: "".concat(state.left, "px")
        },
        className: "ple-cropper__wrap"
      }, /*#__PURE__*/_react["default"].createElement(_Block["default"], {
        ref: function ref(r) {
          _this3._block = r;
        },
        src: props.tree.cropper.item.image.src,
        position: state.position,
        size: state.size,
        bgColor: props.tree.cropper.item.color || props.setting.body.blockColor,
        onUpdateBlock: function onUpdateBlock(e) {
          return _this3.onUpdateBlock(e);
        }
      }), /*#__PURE__*/_react["default"].createElement("nav", {
        className: "ple-cropper__nav"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this3._onClose();
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "ple-sp-ico ple-ico-close ple-abs"
      }, "Close cropper")), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this3._toggleImageType();
        },
        className: (0, _classnames["default"])({
          'ple-cropper__nav-active': state.size !== 'cover'
        })
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "ple-sp-ico ple-ico-resize ple-abs"
      }, "Toggle background size type")))));
    }
  }]);

  return Cropper;
}(_react["default"].Component);

Cropper.displayName = 'Cropper';

var _default = (0, _reactRedux.connect)(function (state) {
  return Object.assign({}, state, {});
})(Cropper);

exports["default"] = _default;