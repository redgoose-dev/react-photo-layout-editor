"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _jquery = _interopRequireDefault(require("jquery/dist/jquery.slim"));

var _reactSimpleColorpicker = _interopRequireDefault(require("react-simple-colorpicker"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var EditLayoutSetting = /*#__PURE__*/function (_React$Component) {
  _inherits(EditLayoutSetting, _React$Component);

  var _super = _createSuper(EditLayoutSetting);

  function EditLayoutSetting(props) {
    var _this;

    _classCallCheck(this, EditLayoutSetting);

    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread(_objectSpread({}, props.defaultSetting), props.setting), {}, {
      popup_bgColor: false
    });
    return _this;
  }

  _createClass(EditLayoutSetting, [{
    key: "activeBgColorPopup",
    value: function activeBgColorPopup(sw, e) {
      var _this2 = this;

      var state = this.state;
      var cTarget = e ? e.currentTarget : null;
      sw = sw || !state.popup_bgColor;

      if (sw) {
        (0, _jquery["default"])(document).on('click.pleEditBgColor', function (e) {
          if ((0, _jquery["default"])(e.target).closest('.ple-edit-bgColor__popup').length) return;

          if (!(e.target === cTarget) && !(e.target.parentNode === cTarget)) {
            _this2.activeBgColorPopup(false);
          }
        });
      } else {
        (0, _jquery["default"])(document).off('click.pleEditBgColor');
      }

      this.setState({
        popup_bgColor: sw
      });
    }
  }, {
    key: "_submit",
    value: function _submit(e) {
      e.preventDefault();
      this.props.submit(this.state);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.setState(_objectSpread({}, this.props.defaultSetting));
    }
  }, {
    key: "_change",
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
    key: "_openBgColorPicker",
    value: function _openBgColorPicker(e) {
      e.persist();
      this.activeBgColorPopup(null, e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var state = this.state,
          props = this.props;
      return /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this3._submit(e);
        },
        className: "ple-edit-setting"
      }, /*#__PURE__*/_react["default"].createElement("fieldset", {
        className: "ple-edit-setting__form"
      }, /*#__PURE__*/_react["default"].createElement("legend", null, "Settings form"), /*#__PURE__*/_react["default"].createElement("h1", {
        className: "ple-edit-setting__title"
      }, "Settings"), /*#__PURE__*/_react["default"].createElement("dl", null, /*#__PURE__*/_react["default"].createElement("dt", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "frm_width"
      }, "Width")), /*#__PURE__*/_react["default"].createElement("dd", {
        className: "ple-type-input"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "number",
        name: "width",
        id: "frm_width",
        min: 1,
        max: 999,
        maxLength: 3,
        value: state.width,
        onChange: function onChange(e) {
          return _this3._change(e);
        },
        style: {
          width: '72px'
        },
        required: true
      }), /*#__PURE__*/_react["default"].createElement("span", null, "px"))), /*#__PURE__*/_react["default"].createElement("dl", null, /*#__PURE__*/_react["default"].createElement("dt", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "frm_height"
      }, "Height")), /*#__PURE__*/_react["default"].createElement("dd", {
        className: "ple-type-input"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "number",
        name: "height",
        id: "frm_height",
        min: 1,
        max: 999,
        value: state.height,
        onChange: function onChange(e) {
          return _this3._change(e);
        },
        style: {
          width: '72px'
        },
        required: true
      }), /*#__PURE__*/_react["default"].createElement("span", null, "px"))), /*#__PURE__*/_react["default"].createElement("dl", null, /*#__PURE__*/_react["default"].createElement("dt", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "frm_column"
      }, "Column")), /*#__PURE__*/_react["default"].createElement("dd", {
        className: "ple-type-input"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "number",
        name: "column",
        id: "frm_column",
        min: 1,
        max: 99,
        value: state.column,
        onChange: function onChange(e) {
          return _this3._change(e);
        },
        style: {
          width: '54px'
        },
        required: true
      }), /*#__PURE__*/_react["default"].createElement("span", null, "ea"))), /*#__PURE__*/_react["default"].createElement("dl", {
        className: "ple-type-input"
      }, /*#__PURE__*/_react["default"].createElement("dt", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "frm_outerMargin"
      }, "Outer margin")), /*#__PURE__*/_react["default"].createElement("dd", null, /*#__PURE__*/_react["default"].createElement("input", {
        type: "number",
        name: "outerMargin",
        id: "frm_outerMargin",
        min: 0,
        max: 500,
        value: state.outerMargin,
        onChange: function onChange(e) {
          return _this3._change(e);
        },
        style: {
          width: '58px'
        },
        required: true
      }), /*#__PURE__*/_react["default"].createElement("span", null, "px"))), /*#__PURE__*/_react["default"].createElement("dl", {
        className: "ple-type-input"
      }, /*#__PURE__*/_react["default"].createElement("dt", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "frm_innerMargin"
      }, "Inner margin")), /*#__PURE__*/_react["default"].createElement("dd", null, /*#__PURE__*/_react["default"].createElement("input", {
        type: "number",
        name: "innerMargin",
        id: "frm_innerMargin",
        min: 0,
        max: 500,
        value: state.innerMargin,
        onChange: function onChange(e) {
          return _this3._change(e);
        },
        style: {
          width: '58px'
        },
        required: true
      }), /*#__PURE__*/_react["default"].createElement("span", null, "px"))), /*#__PURE__*/_react["default"].createElement("dl", null, /*#__PURE__*/_react["default"].createElement("dt", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "frm_bgColor"
      }, "Bg color")), /*#__PURE__*/_react["default"].createElement("dd", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-edit-bgColor"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])('ple-edit-bgColor__inputBox', {
          'ple-edit-bgColor__inputBox-active': state.popup_bgColor
        })
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        name: "bgColor",
        id: "frm_bgColor",
        value: state.bgColor,
        onChange: function onChange(e) {
          return _this3._change(e);
        },
        onClick: function onClick(e) {
          return _this3._openBgColorPicker(e);
        },
        readOnly: true,
        required: true,
        className: "ple-edit-bgColor__input",
        style: {
          backgroundColor: state.bgColor
        }
      })), state.popup_bgColor && /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-edit-bgColor__popup"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-edit-bgColor__picker"
      }, /*#__PURE__*/_react["default"].createElement(_reactSimpleColorpicker["default"], {
        onChange: function onChange(color) {
          return _this3.setState({
            bgColor: color
          });
        },
        color: state.bgColor
      }))))))), /*#__PURE__*/_react["default"].createElement("nav", {
        className: "ple-edit-setting__buttons"
      }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this3._reset();
        }
      }, "Reset")), /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        className: "ple-submit"
      }, "Apply"))));
    }
  }]);

  return EditLayoutSetting;
}(_react["default"].Component);

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
    bgColor: 'rgba(255,255,255,1)'
  }
};
var _default = EditLayoutSetting;
exports["default"] = _default;