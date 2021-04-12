"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery/dist/jquery.slim"));

var actions = _interopRequireWildcard(require("../actions"));

var lib = _interopRequireWildcard(require("../lib"));

var _object = require("../lib/object");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util = /*#__PURE__*/function () {
  function Util(store) {
    _classCallCheck(this, Util);

    this.store = store;
  }
  /**
   * Toggle side
   *
   * @param {Boolean|undefined} sw
   */


  _createClass(Util, [{
    key: "toggleSide",
    value: function toggleSide() {
      var sw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      try {
        var currentSw = this.store.getState().tree.side.visible;
        var targetSw = typeof sw === 'undefined' ? !currentSw : sw;
        this.store.dispatch(actions.side.visible(targetSw));
      } catch (e) {
        console.warn('Error action', e);
      }
    }
  }, {
    key: "export",
    value:
    /**
     * export
     *
     * @param {String} type
     * @param {Boolean} isInsertImage
     * @return {Array|Object}
     */
    function _export() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var isInsertImage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!type) return null;
      var state = this.store.getState();

      function side() {
        if (!isInsertImage) return [];
        var keys = state.api.side.getKeys('all');
        return state.api.side.getImages(keys);
      }

      function grid() {
        var result = state.api.grid.getBlocks('all');
        return Object.keys(result).sort().map(function (o) {
          delete result[o].indexPrefix;
          if (!isInsertImage && result[o] && result[o].image) delete result[o].image;
          return result[o];
        });
      }

      function preference() {
        return state.api.grid.getPreference();
      }

      switch (type) {
        case 'side':
          return side();

        case 'grid':
          return grid();

        case 'preference':
          return state.api.grid.getPreference();

        case 'all':
          return {
            side: side(),
            grid: grid(),
            preference: preference()
          };
          break;
      }

      return null;
    }
    /**
     * import
     *
     * @param {Array|Object} value
     * @param {Boolean} replace
     */

  }, {
    key: "import",
    value: function _import() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!value) return;
      var state = this.store.getState();

      function side() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (replace) state.api.side.clear();
        state.api.side.add(value);
      }

      function grid() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (replace) {
          var keys = state.api.grid.getKeys('all');
          state.api.grid.remove(keys);
        }

        state.api.grid.add(value);
      }

      if (value.side && (0, _object.isArray)(value.side)) side(value.side);
      if (value.grid && (0, _object.isArray)(value.grid)) grid(value.grid);
      if (value.preference && _typeof(value.preference) === 'object') state.api.grid.setPreference(value.preference);
    }
    /**
     * make image
     *
     * @param {String} format (jpg|png)
     * @param {Number} quality
     * @param {Number} sampling
     * @param {String} output
     * @return {Promise}
     */

  }, {
    key: "makeImage",
    value: function makeImage() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'jpg';
      var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : .75;
      var sampling = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      var output = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var defer = _jquery["default"].Deferred();

      var state = this.store.getState();
      var _state$tree$body = state.tree.body,
          setting = _state$tree$body.setting,
          grid = _state$tree$body.grid;
      lib.makingImage(state.element.querySelector('.ple-grid'), {
        setting: setting,
        grid: grid
      }, {
        format: format,
        quality: quality,
        sampling: sampling,
        output: output
      }).done(function (image) {
        defer.resolve(image);
      }).progress(function (total, current, image) {
        defer.notify(total, current, image);
      }).fail(function (error) {
        defer.reject(error);
      });
      return defer.promise();
    }
  }]);

  return Util;
}();

var _default = Util;
exports["default"] = _default;