"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery/dist/jquery.slim"));

var libs = _interopRequireWildcard(require("../lib"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    var _this = this;

    _classCallCheck(this, Keyboard);

    this.eventName = "PLE_".concat(libs.number.getTimeStamp());
    this.code = null;
    this.keyName = null;
    this.names = {
      17: 'CTRL',
      18: 'ALT',
      91: 'CMD',
      93: 'CMD',
      16: 'SHIFT'
    }; // init key down event

    (0, _jquery["default"])(window).on("keydown.".concat(this.eventName), function (e) {
      return _this._keyDown(e);
    });
  }
  /**
   * apply
   *
   * @param {Number} code
   */


  _createClass(Keyboard, [{
    key: "apply",
    value: function apply(code) {
      this.code = code;
      this.keyName = this.names[this.code] || null;
    }
    /**
     * key down event
     *
     * @param {Event} e
     */

  }, {
    key: "_keyDown",
    value: function _keyDown(e) {
      var _this2 = this;

      // apply keyCode
      this.apply(e.keyCode); // set events

      (0, _jquery["default"])(window).on("keyup.".concat(this.eventName), function () {
        return _this2._keyUp();
      }).on("contextmenu.".concat(this.eventName), function () {
        return _this2._keyUp();
      }).on("blur.".concat(this.eventName), function () {
        return _this2._keyUp();
      }).off("keydown.".concat(this.eventName));
    }
    /**
     * key up event
     *
     */

  }, {
    key: "_keyUp",
    value: function _keyUp() {
      var _this3 = this;

      // apply keyCode
      this.apply(null); // set events

      (0, _jquery["default"])(window).on("keydown.".concat(this.eventName), function (e) {
        return _this3._keyDown(e);
      }).off("contextmenu.".concat(this.eventName, " keyup.").concat(this.eventName, " blur.").concat(this.eventName));
    }
    /**
     * destroy event
     *
     */

  }, {
    key: "destroy",
    value: function destroy() {
      (0, _jquery["default"])(window).off("keydown.".concat(this.eventName, " contextmenu.").concat(this.eventName, " keyup.").concat(this.eventName, " blur.").concat(this.eventName));
    }
  }]);

  return Keyboard;
}();

exports["default"] = Keyboard;