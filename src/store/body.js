import { atom } from 'recoil';

export const setting = atom({
  key: 'bodySetting',
  default: {
    width: 100,
    height: 100,
    column: 5,
    outerMargin: 10,
    innerMargin: 10,
    freeMode: false,
    backgroundColor: 'rgba(255,255,255,1)',
    blockColor: 'rgba(211,211,211,1)',
  },
});

export const grid = atom({
  key: 'bodyGrid',
  default: [],
});
