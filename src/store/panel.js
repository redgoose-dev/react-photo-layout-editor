import { atom } from 'recoil';

export const visible = atom({
  key: 'panelPreference',
  default: true,
});

export const files = atom({
  key: 'panelFiles',
  default: [],
});
