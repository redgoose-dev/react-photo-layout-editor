import { atom } from 'recoil';

export const upload = atom({
  key: 'baseUpload',
  default: {
    url: '', // TODO: 예전 `base.uploadScript`
    convertParams: null, // TODO: 예전 `base.uploadParamsConvertFunc`
  },
});

export const store = atom({
  key: 'baseStore',
  default: {
    updated: null, // TODO: 예전 `base.updateStoreFunc`
  },
});

export const callbacks = atom({
  key: 'baseCallbacks',
  default: {},
});
