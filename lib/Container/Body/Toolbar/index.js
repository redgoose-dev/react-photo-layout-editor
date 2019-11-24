"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactRedux = require("react-redux");

var _jquery = _interopRequireDefault(require("jquery/dist/jquery.slim"));

var _reactSimpleColorpicker = _interopRequireDefault(require("react-simple-colorpicker"));

var actions = _interopRequireWildcard(require("../../../actions"));

var libs = _interopRequireWildcard(require("../../../lib"));

var _Button = _interopRequireDefault(require("./Button"));

var _EditLayoutSetting = _interopRequireDefault(require("./EditLayoutSetting"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Toolbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    var _this;

    _classCallCheck(this, Toolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toolbar).call(this, props));
    _this.state = {
      active: {
        setting: false,
        editBlockColor: false
      },
      visible: {
        setting: true,
        shuffle: true,
        add: true,
        select: true,
        edit: false,
        removeImage: false,
        duplicate: false,
        removeBlock: false,
        editColor: false
      },
      activeBlockCount: 0
    };
    return _this;
  }

  _createClass(Toolbar, [{
    key: "changeActive",
    value: function changeActive(keyName, userSW, event) {
      var _this2 = this;

      var state = this.state;
      var sw = userSW || !state.active[keyName];
      var cTarget = event ? event.currentTarget : null;

      if (sw) {
        (0, _jquery["default"])(document).on('click.pleToolbar', function (e) {
          if ((0, _jquery["default"])(e.target).closest('.ple-toolbar__pop').length) return;

          if (!(e.target === cTarget) && !(e.target.parentNode === cTarget)) {
            _this2.changeActive(keyName, false);
          }
        });
      } else {
        (0, _jquery["default"])(document).off('click.pleToolbar');
      }

      this.setState({
        active: _objectSpread({}, state.active, _defineProperty({
          setting: false,
          editColor: false
        }, keyName, sw))
      });
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      var _this3 = this;

      (0, _jquery["default"])(document).off('click.pleToolbar');
      return new Promise(function (reject) {
        _this3.setState({
          active: {
            setting: false,
            editColor: false
          }
        }, reject);
      });
    }
    /**
     * Submit edit setting
     *
     * @param {Object} state
     * @return {Boolean}
     */

  }, {
    key: "submitEditSetting",
    value: function submitEditSetting(state) {
      var _this4 = this;

      // update setting
      this.props.dispatch(actions.body.updateSetting(state)); // close palette

      libs.util.sleep(50).then(function () {
        return _this4.changeActive('setting', false);
      });
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var state = this.state,
          props = this.props;
      var activeBlockColor = '#fff';

      if (_typeof(props.tree.body.grid) === 'object' && libs.object.isArray(props.tree.body.activeBlock)) {
        var n = props.tree.body.activeBlock[0];
        activeBlockColor = props.tree.body.grid[n] && props.tree.body.grid[n].color ? props.tree.body.grid[n].color : props.setting.body.blockColor;
      }

      return _react["default"].createElement("nav", {
        className: "ple-toolbar"
      }, _react["default"].createElement("div", {
        className: "ple-toolbar__wrap"
      }, state.visible.setting && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-setting",
        className: (0, _classnames["default"])('ple-edit-setting', {
          'ple-toolbar__block-active': state.active.setting
        }),
        onClick: function onClick(e) {
          e.persist();

          if (!state.active.setting) {
            _this5.deactivate().then(function () {
              _this5.changeActive('setting', null, e);
            });
          }
        },
        title: "Edit preference"
      }, state.active.setting && _react["default"].createElement(_EditLayoutSetting["default"], {
        submit: function submit(e) {
          return _this5.submitEditSetting(e);
        },
        setting: props.tree.body.setting,
        defaultSetting: props.setting.body.setting
      })), state.visible.shuffle && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-arrow-random",
        onClick: function onClick() {
          return props.api.grid.shuffle();
        },
        title: "Shuffle block"
      }), state.visible.add && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-plus",
        onClick: function onClick() {
          return props.api.grid.add();
        },
        title: "Add block"
      }), state.visible.select && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-select",
        onClick: function onClick() {
          return props.api.grid.toggleSelectAll();
        },
        title: "Toggle select block"
      }), state.visible.edit && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-pencil",
        className: "ple-toolbar__block-key",
        onClick: function onClick() {
          return props.api.cropper.open(props.tree.body.activeBlock[0]);
        },
        title: "Edit block"
      }), state.visible.removeImage && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-empty",
        className: "ple-toolbar__block-key",
        onClick: function onClick() {
          return props.api.grid.removeImages(props.tree.body.activeBlock);
        },
        title: "Remove image in block"
      }), state.visible.duplicate && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-duplicate",
        className: "ple-toolbar__block-key",
        onClick: function onClick() {
          if (props.tree.body.activeBlock === null) {
            alert('Not found select block');
            return;
          }

          props.dispatch(actions.body.duplicateBlock(props.tree.body.activeBlock));
        },
        title: "Duplicate block"
      }), state.visible.removeBlock && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-trash",
        className: "ple-toolbar__block-key",
        onClick: function onClick() {
          if (props.tree.body.activeBlock === null) {
            alert('Not found select block');
            return;
          }

          props.api.grid.remove(props.tree.body.activeBlock);
        },
        title: "Remove block"
      }), state.visible.editColor && _react["default"].createElement(_Button["default"], {
        iconClass: "ple-ico-palette",
        className: (0, _classnames["default"])('ple-edit-color', 'ple-toolbar__block-key', {
          'ple-toolbar__block-active': state.active.editColor
        }),
        onClick: function onClick(e) {
          e.persist();

          if (!state.active.editColor) {
            _this5.deactivate().then(function () {
              return _this5.changeActive('editColor', null, e);
            });
          }
        },
        title: "Change color"
      }, _react["default"].createElement("div", {
        className: "ple-colorPicker__wrap"
      }, _react["default"].createElement(_reactSimpleColorpicker["default"], {
        onChange: function onChange(color) {
          if (!color) return;
          props.dispatch(actions.body.changeColorBlock(props.tree.body.activeBlock, color));
        },
        color: activeBlockColor,
        className: "ple-colorPicker__body"
      })))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = Object.assign({}, prevState); // update active block count

      newState.activeBlockCount = nextProps.tree.body.activeBlock.length; // select block

      if (prevState.activeBlockCount !== nextProps.tree.body.activeBlock.length) {
        var active = !!nextProps.tree.body.activeBlock.length;
        newState.visible = Object.assign({}, newState.visible, {
          edit: false,
          removeImage: false,
          duplicate: active,
          removeBlock: active,
          editColor: active
        });
      }

      if (nextProps.tree.body.activeBlock[0]) {
        // check image block
        var isImage = false;
        nextProps.tree.body.activeBlock.some(function (k) {
          if (nextProps.tree.body.grid[k].image) {
            isImage = true;
            return true;
          }
        }); // select image block

        var block = nextProps.tree.body.grid[nextProps.tree.body.activeBlock[0]];
        newState.visible = Object.assign({}, newState.visible, {
          removeImage: isImage,
          edit: !!(block && block.image)
        });
      }

      return _objectSpread({}, prevState, {}, newState);
    }
  }]);

  return Toolbar;
}(_react["default"].Component);

Toolbar.displayName = 'Toolbar';
Toolbar.defaultProps = {
  dispatch: null,
  tree: null
};

var _default = (0, _reactRedux.connect)(function (state) {
  return Object.assign({}, state, {});
})(Toolbar);

exports["default"] = _default;