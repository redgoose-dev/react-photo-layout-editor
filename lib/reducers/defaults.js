"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.side = exports.setting = void 0;
var setting = {
  base: {
    uploadScript: null,
    uploadParamsConvertFunc: null,
    updateStoreFunc: null
  },
  body: {
    setting: {
      width: 100,
      height: 100,
      column: 5,
      outerMargin: 10,
      innerMargin: 10,
      freeMode: false,
      bgColor: 'rgba(255,255,255,1)'
    },
    blockColor: 'rgba(211,211,211,1)',
    grid: []
  },
  side: {
    files: [],
    visible: true //progressPercent: null,

  }
};
exports.setting = setting;
var side = {
  files: {},
  visible: true,
  progressPercent: null
};
exports.side = side;