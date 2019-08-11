"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var actions = _interopRequireWildcard(require("../actions"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Grid =
/*#__PURE__*/
function () {
  function Grid(store) {
    _classCallCheck(this, Grid);

    this.store = store;
  }
  /**
   * get keys in block
   *
   * @param {String} mode
   * @param {Array} keys
   * @return {Array}
   */


  _createClass(Grid, [{
    key: "getKeys",
    value: function getKeys() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var state = this.store.getState();
      var body = state.tree.body;
      var result = [];

      switch (mode) {
        case 'selected':
          return body.activeBlock;

        case 'value':
          result = [];
          keys.forEach(function (k) {
            if (body.grid[k]) {
              result.push(k);
            }
          });
          return result;

        case 'all':
        default:
          return Object.keys(body.grid).map(function (k) {
            return k;
          });
      }
    }
    /**
     * get blocks
     *
     * @param {String} mode
     * @param {Array} keys
     * @return {Object}
     */

  }, {
    key: "getBlocks",
    value: function getBlocks() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var state = this.store.getState();
      var body = state.tree.body;
      var selected = [];
      var result = {};

      switch (mode) {
        case 'selected':
          selected = this.getKeys('selected');
          break;

        case 'value':
          selected = this.getKeys('value', keys);
          break;

        case 'all':
        default:
          return body.grid;
      }

      selected.forEach(function (k) {
        if (!body.grid[k]) return;
        result[k] = body.grid[k];
      });
      return result;
    }
    /**
     * shuffle items
     *
     * @param {Object} options
     */

  }, {
    key: "shuffle",
    value: function shuffle() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var state = this.store.getState();
      var body = state.tree.body;
      var defaultOptions = {
        x: body.setting.column,
        y: 2,
        w: 2,
        h: 2
      }; // assign options

      options = Object.assign({}, defaultOptions, options);
      this.store.dispatch(actions.body.shuffleBlocks(options));
    }
    /**
     * assign image
     *
     * @param {Array} images
     */

  }, {
    key: "assignImages",
    value: function assignImages() {
      var images = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var state = this.store.getState();
      var body = state.tree.body;
      this.store.dispatch(actions.body.attachImages(images, body.setting.column, body.activeBlock));
    }
    /**
     * assign image
     *
     * @param {Number} key
     * @param {String} image
     */

  }, {
    key: "assignImage",
    value: function assignImage() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!(key !== null && image !== null)) return;
      this.store.dispatch(actions.body.attachImage(key, image));
    }
    /**
     * remove images
     *
     * @param {Array} keys
     */

  }, {
    key: "removeImages",
    value: function removeImages() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var state = this.store.getState();
      var newGrid = Object.assign({}, state.tree.body.grid);
      keys.forEach(function (k) {
        newGrid[k].image = null;
      });
      this.update(newGrid);
    }
    /**
     * add blocks
     *
     * @param {Array} blocks
     */

  }, {
    key: "add",
    value: function add() {
      var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var _this$store = this.store,
          getState = _this$store.getState,
          dispatch = _this$store.dispatch;
      var state = getState();
      var body = state.tree.body;
      var defaultOptions = {
        layout: {
          x: Object.keys(body.grid).length % body.setting.column,
          y: Infinity,
          w: 1,
          h: 1
        },
        color: null,
        image: null
      };
      /**
       * add block
       *
       * @param {Object} options
       */

      function block() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // assign option
        options = Object.assign({}, defaultOptions, options);
        options.layout = Object.assign({}, defaultOptions.layout, options.layout);
        options.image = options.image ? _objectSpread({
          src: null,
          position: '50% 50%',
          size: 'cover'
        }, options.image) : null;
        dispatch(actions.body.addBlock(options));
      } // checking blocks


      blocks = blocks && blocks.length ? blocks : [null]; // play add blocks

      blocks.forEach(function (o) {
        return block(o);
      });
    }
    /**
     * update blocks
     *
     * @param {Object} blocks
     */

  }, {
    key: "update",
    value: function update() {
      var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.store.dispatch(actions.body.updateBlocks(blocks));
    }
    /**
     * remove blocks
     *
     * @param {Array} keys
     */

  }, {
    key: "remove",
    value: function remove() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.store.dispatch(actions.body.removeBlock(keys));
    }
    /**
     * select blocks
     *
     * @param {Array} keys
     */

  }, {
    key: "select",
    value: function select() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      keys = keys.map(function (k) {
        return k.toString();
      });
      this.store.dispatch(actions.body.activeBlock(keys));
    }
    /**
     * un select blocks
     *
     * @param {Array} keys
     */

  }, {
    key: "unselect",
    value: function unselect() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var state = this.store.getState();
      var newActiveBlock = Object.assign([], state.tree.body.activeBlock);
      keys.forEach(function (k) {
        k = k.toString();

        if (newActiveBlock.indexOf(k) !== -1) {
          newActiveBlock.splice(newActiveBlock.indexOf(k), 1);
        }
      });
      this.store.dispatch(actions.body.activeBlock(newActiveBlock));
    }
    /**
     * toggle select all blocks
     *
     * @param {Boolean} isSelect
     */

  }, {
    key: "toggleSelectAll",
    value: function toggleSelectAll() {
      var isSelect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var state = this.store.getState();

      if (typeof isSelect !== 'boolean') {
        isSelect = !state.tree.body.activeBlock.length;
      }

      if (isSelect) {
        this.select(this.getKeys('all'));
      } else {
        this.select([]);
      }
    }
    /**
     * duplicate blocks
     *
     * @param {Array} keys
     */

  }, {
    key: "duplicate",
    value: function duplicate() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.store.dispatch(actions.body.duplicateBlock(keys));
    }
    /**
     * get preference
     *
     * @return {Object}
     */

  }, {
    key: "getPreference",
    value: function getPreference() {
      var state = this.store.getState();
      return state.tree.body.setting;
    }
    /**
     * set preference
     *
     * @param {Object} value
     */

  }, {
    key: "setPreference",
    value: function setPreference() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var newPreference = Object.assign({}, this.getPreference(), value);
      this.store.dispatch(actions.body.updateSetting(newPreference));
    }
  }]);

  return Grid;
}();

var _default = Grid;
exports["default"] = _default;