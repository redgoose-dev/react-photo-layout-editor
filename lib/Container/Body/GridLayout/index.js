"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactGridLayout = _interopRequireDefault(require("react-grid-layout"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Cropper = _interopRequireDefault(require("../../Cropper"));

var actions = _interopRequireWildcard(require("../../../actions"));

var libs = _interopRequireWildcard(require("../../../lib"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var timeStamp = [];

var GridLayout = /*#__PURE__*/function (_React$Component) {
  _inherits(GridLayout, _React$Component);

  var _super = _createSuper(GridLayout);

  function GridLayout(props) {
    _classCallCheck(this, GridLayout);

    return _super.call(this, props);
  }
  /**
   * on select block
   *
   * @param {String} key
   */


  _createClass(GridLayout, [{
    key: "_selectBlock",
    value: function _selectBlock() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var props = this.props;

      if (key === null) {
        props.api.grid.select([]);
        return;
      }

      switch (props.keyboard.keyName) {
        case 'CMD':
        case 'CTRL':
        case 'SHIFT':
          if (libs.object.isArray(props.tree.body.activeBlock)) {
            var newActiveBlock = Object.assign([], props.tree.body.activeBlock);

            if (newActiveBlock.indexOf(key) > -1) {
              newActiveBlock.splice(newActiveBlock.indexOf(key), 1);
            } else {
              newActiveBlock.push(key);
            }

            props.api.grid.select(newActiveBlock);
            return;
          }

          break;
      }

      props.api.grid.select([key]);
    }
    /**
     * On update blocks
     *
     * @param {String} type
     * @param {Array} layout
     * @param {HTMLElement} element
     */

  }, {
    key: "_updateBlocks",
    value: function _updateBlocks(type) {
      var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var props = this.props;
      /**
       * convert layout
       *
       * @return {Object}
       */

      function convertLayout() {
        var result = {};

        for (var i = 0; i < layout.length; i++) {
          result[layout[i].i.split('__')[1]] = layout[i];
        }

        return result;
      }

      switch (type) {
        case 'start':
          timeStamp[0] = new Date().getTime();
          break;

        case 'end':
          timeStamp[1] = new Date().getTime();

          if (timeStamp[1] - timeStamp[0] > 400) {
            var newLayout = convertLayout();
            var newGrid = {};
            Object.keys(props.tree.body.grid).forEach(function (k) {
              newGrid[k] = _objectSpread(_objectSpread({}, props.tree.body.grid[k]), {}, {
                layout: {
                  x: newLayout[k].x,
                  y: newLayout[k].y,
                  w: newLayout[k].w,
                  h: newLayout[k].h
                }
              });
            });
            props.dispatch(actions.body.updateBlocks(newGrid));
          }

          timeStamp = [];
          break;
      }
    }
    /**
     * Render item
     *
     * @param {String} k
     * @return {Component}
     */

  }, {
    key: "renderItem",
    value: function renderItem(k) {
      var _this = this;

      var props = this.props;
      var _props$tree$body = props.tree.body,
          activeBlock = _props$tree$body.activeBlock,
          grid = _props$tree$body.grid;
      var item = grid[k];
      var key = "".concat(item.indexPrefix, "__").concat(k);
      var active = !!(activeBlock && activeBlock.length && activeBlock.indexOf(k) > -1);
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: key,
        "data-grid": item.layout,
        "data-key": k,
        onClick: function onClick(event) {
          event.stopPropagation();

          _this._selectBlock(k, !!item.image);
        },
        style: {
          backgroundColor: item.color || props.setting.body.blockColor
        },
        className: (0, _classnames["default"])({
          'ple-grid__item-active': active
        })
      }, item.image && /*#__PURE__*/_react["default"].createElement("figure", {
        style: {
          backgroundImage: "url('".concat(item.image.src, "')"),
          backgroundPosition: item.image.position,
          backgroundSize: item.image.size
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var setting = props.tree.body.setting;
      var bodyWidth = setting.width * setting.column + setting.innerMargin * (setting.column - 1) + setting.outerMargin * 2;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-grid__wrap",
        onClick: function onClick() {
          return _this2._selectBlock();
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ple-grid__body",
        style: {
          width: "".concat(bodyWidth, "px")
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactGridLayout["default"], {
        autoSize: true,
        cols: setting.column,
        rowHeight: setting.height,
        width: bodyWidth,
        margin: [setting.innerMargin, setting.innerMargin],
        containerPadding: [setting.outerMargin, setting.outerMargin],
        onDragStart: function onDragStart() {
          return _this2._updateBlocks('start');
        },
        onDragStop: function onDragStop(layout, oldItem, newItem, placeholder, e, element) {
          return _this2._updateBlocks('end', layout, element);
        },
        onResizeStart: function onResizeStart() {
          return _this2._updateBlocks('start');
        },
        onResizeStop: function onResizeStop(layout, oldItem, newItem, placeholder, e, element) {
          return _this2._updateBlocks('end', layout, element);
        },
        style: {
          width: "100%",
          backgroundColor: setting.bgColor
        },
        className: "ple-grid"
      }, Object.keys(props.tree.body.grid).map(function (k) {
        return _this2.renderItem(k);
      })), props.tree.cropper.visible ? /*#__PURE__*/_react["default"].createElement(_Cropper["default"], null) : null));
    }
  }]);

  return GridLayout;
}(_react["default"].Component);

GridLayout.displayName = 'GridLayout';
GridLayout.defaultProps = {
  tree: null,
  dispatch: null
};

var _default = (0, _reactRedux.connect)(function (state) {
  return Object.assign({}, state, {});
})(GridLayout);

exports["default"] = _default;