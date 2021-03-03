import { atom } from 'recoil';

export const open = atom({
  key: 'panelOpen',
  default: true,
});

export const files = atom({
  key: 'panelFiles',
  default: [],
});

export const upload = atom({
  key: 'baseUpload',
  default: null,
});
