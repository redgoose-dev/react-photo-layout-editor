"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var actions = _interopRequireWildcard(require("../actions"));

var lib = _interopRequireWildcard(require("../lib"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Side = /*#__PURE__*/function () {
  function Side(store) {
    _classCallCheck(this, Side);

    this.store = store;
    this.uploading = false;
  }
  /**
   * get id in item
   *
   * @param {String} mode
   * @param {Array} keys
   * @return {Array}
   */


  _createClass(Side, [{
    key: "getKeys",
    value: function getKeys() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var state = this.store.getState();
      var files = state.tree.side.files;
      var result = [];

      switch (mode) {
        case 'selected':
          Object.keys(files).forEach(function (o) {
            if (files[o].active) {
              result.push(parseInt(o));
            }
          });
          break;

        case 'value':
          keys.forEach(function (o) {
            if (files[o]) {
              result.push(parseInt(o));
            }
          });
          break;

        case 'all':
        default:
          result = Object.keys(files).map(function (o) {
            return parseInt(o);
          });
          break;
      }

      return result;
    }
    /**
     * get items
     *
     * @param {Array} keys
     * @return {Object}
     */

  }, {
    key: "getItems",
    value: function getItems() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var state = this.store.getState();
      var side = state.tree.side;
      keys = this.getKeys('value', keys);
      var result = {};
      keys.forEach(function (o) {
        if (side.files[o]) {
          result[o] = side.files[o];
        }
      });
      return result;
    }
    /**
     * get images
     *
     * @param {Array} keys
     * @return {Array}
     */

  }, {
    key: "getImages",
    value: function getImages() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var items = this.getItems(keys);
      return Object.keys(items).map(function (o) {
        return items[o].image;
      });
    }
    /**
     * Add files
     *
     * @param {Array} files
     * @return {Error}
     */

  }, {
    key: "add",
    value: function add(files) {
      try {
        if (!(files instanceof Array)) {
          throw new Error('not found files');
        }

        this.store.dispatch(actions.side.addFiles(files));
      } catch (e) {
        return e;
      }
    }
  }, {
    key: "selection",
    value:
    /**
     * selection items
     *
     * @param {Array} keys
     * @param {Boolean} active
     * @return {Error}
     */
    function selection() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      try {
        var selected = {};
        var getKeys = this.getKeys('value', keys);

        if (getKeys.length <= 0) {
          throw new Error('not found select item');
        }

        getKeys.forEach(function (o) {
          selected[o] = {
            key: o,
            active: active
          };
        });
        this.store.dispatch(actions.side.updateSelected(selected));
      } catch (e) {
        return e;
      }
    }
    /**
     * select items
     *
     * @param {Object} value
     */

  }, {
    key: "select",
    value: function select() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.store.dispatch(actions.side.updateSelected(value));
    }
    /**
     * toggle select all
     *
     * @param {Boolean} active
     */

  }, {
    key: "toggleSelectAll",
    value: function toggleSelectAll() {
      var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (typeof active === 'boolean') {
        var selected = this.getKeys('all');
        this.selection(selected, active);
      } else {
        var activeCount = this.getKeys('selected').length;
        var keys = this.getKeys('all');
        this.selection(keys, !(activeCount > 0));
      }
    }
    /**
     * remove items
     *
     * @param {Array} keys
     * @return {Error}
     */

  }, {
    key: "remove",
    value: function remove() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      try {
        if (!keys.length) {
          throw new Error('Not found items.');
        }

        var state = this.store.getState();
        var callback = state.setting.base.callback;
        var files = keys.map(function (n) {
          return state.tree.side.files[n].image;
        });
        this.store.dispatch(actions.side.removeFiles(keys));

        if (!!callback.sideRemove && typeof callback.sideRemove === 'function') {
          callback.sideRemove(files);
        }
      } catch (e) {
        return e;
      }
    }
    /**
     * Clear items
     */

  }, {
    key: "clear",
    value: function clear() {
      var keys = this.getKeys('all');
      var state = this.store.getState();
      var callback = state.setting.base.callback;
      var files = Object.keys(state.tree.side.files).map(function (n) {
        return state.tree.side.files[n].image;
      });
      this.store.dispatch(actions.side.removeFiles(keys));

      if (!!callback.sideRemove && typeof callback.sideRemove === 'function') {
        callback.sideRemove(files);
      }
    }
    /**
     * Upload files
     *
     * @param {FileList} files
     */

  }, {
    key: "upload",
    value: function upload(files) {
      var _this = this;

      if (this.uploading) return;
      var state = this.store.getState();
      var callback = state.setting.base.callback;
      this.uploading = true;

      if (!!callback.sideUploadStart && typeof callback.sideUploadStart === 'function') {
        callback.sideUploadStart();
      }

      lib.uploader(files, state.setting.base.uploadScript).progress(function (type, res) {
        switch (type) {
          case 'start':
            _this.store.dispatch(actions.side.updateProgress(0));

            break;

          case 'progress':
            var percent = parseInt(res.loaded / res.total * 100);

            _this.store.dispatch(actions.side.updateProgress(percent));

            if (!!callback.sideUploadProgress && typeof callback.sideUploadProgress === 'function') {
              callback.sideUploadProgress(res.loaded, res.total, percent);
            }

            break;

          case 'done':
            _this.store.dispatch(actions.side.updateProgress(null));

            if (!res.data) return;

            if (state.setting.base.uploadParamsConvertFunc) {
              var result = state.setting.base.uploadParamsConvertFunc(res.data);

              _this.store.dispatch(actions.side.addFiles([result]));
            } else {
              _this.store.dispatch(actions.side.addFiles([res.data.url]));
            }

            if (!!callback.sideUploadComplete && typeof callback.sideUploadComplete === 'function') {
              callback.sideUploadComplete(res.data);
            }

            return;
        }
      }).done(function () {
        _this.uploading = false;

        if (!!callback.sideUploadCompleteAll && typeof callback.sideUploadCompleteAll === 'function') {
          callback.sideUploadCompleteAll();
        }
      }).fail(function (error) {
        _this.uploading = false;

        if (!!callback.sideUploadFail && typeof callback.sideUploadFail === 'function') {
          callback.sideUploadFail(error);
        }
      });
    }
    /**
     * attach items to grid
     *
     * @param {Array} keys
     * @return {Error}
     */

  }, {
    key: "attachToGrid",
    value: function attachToGrid() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var state = this.store.getState();
      var body = state.tree.body;

      try {
        var selectedImages = this.getImages(keys);

        if (!selectedImages.length) {
          throw new Error('not found item.');
        }

        this.store.dispatch(actions.body.attachImages(selectedImages, body.setting.column, body.activeBlock));
      } catch (e) {
        return e;
      }
    }
  }]);

  return Side;
}();

var _default = Side;
exports["default"] = _default;