"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Button = function Button(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])('ple-toolbar__block', props.className)
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    title: props.title,
    onClick: props.onClick
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _classnames["default"])('ple-sp-ico', 'ple-abs', props.iconClass)
  }, props.title)), !!props.children && /*#__PURE__*/_react["default"].createElement("div", {
    className: "ple-toolbar__pop"
  }, props.children));
};

var _default = Button;
exports["default"] = _default;