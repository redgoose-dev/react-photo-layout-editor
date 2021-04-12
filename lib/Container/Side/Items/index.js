"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Item = _interopRequireDefault(require("./Item"));

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

var Items = /*#__PURE__*/function (_React$Component) {
  _inherits(Items, _React$Component);

  var _super = _createSuper(Items);

  function Items() {
    _classCallCheck(this, Items);

    return _super.apply(this, arguments);
  }

  _createClass(Items, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-sideItems"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-sideItems__wrap"
      }, /*#__PURE__*/_react["default"].createElement("ul", null, Object.keys(props.files).map(function (o) {
        return /*#__PURE__*/_react["default"].createElement(_Item["default"], {
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
          active: props.files[o].active
        });
      }), props.progress !== null && /*#__PURE__*/_react["default"].createElement("li", {
        className: "ple-sideItems__loading"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-sideItems__progress"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "ple-sideItems__bar",
        style: {
          height: "".concat(props.progress, "%")
        }
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "ple-sideItems__percent"
      }, "".concat(props.progress, "%")))))));
    }
  }]);

  return Items;
}(_react["default"].Component);

Items.displayName = 'Items';
Items.defaultProps = {
  files: [],
  // files
  onSelect: function onSelect(key) {},
  // on select event
  onDragStart: null,
  // on drag start
  onDragEnd: null,
  // on drag end
  onTouchStart: null,
  // on touch start
  onTouchMove: null,
  // on touch move
  onTouchEnd: null,
  // on touch end
  progress: null // on progress number

};
var _default = Items;
exports["default"] = _default;