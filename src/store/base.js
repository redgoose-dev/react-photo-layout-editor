import { atom } from 'recoil';

export const upload = atom({
  key: 'baseUpload',
  default: {
    url: '', // TODO: 예전 `base.uploadScript`
    convertParams: null, // TODO: 예전 `base.uploadParamsConvertFunc`
  },
});

// export const store = atom({
//   key: 'baseStore',
//   default: {
//     updated: null, // TODO: 예전 `base.updateStoreFunc` 데이터가 변했을때 호출되는 부분인데 `callbacks` 부분에 편입시켜야 한다.
//   },
// });

export const callbacks = atom({
  key: 'baseCallbacks',
  default: {},
});
