import { atom, selector } from 'recoil';

export const preference = atom({
  key: 'bodyPreference',
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

export const gridSelectedBlocks = atom({
  key: 'bodyGridSelectedBlocks',
  default: [],
});

export const gridSelectedBlock = selector({
  key: 'bodyGridSelectedBlock',
  get: ({ get }) => {
    const stateGrid = get(grid);
    if (stateGrid.length <= 0) return false;
    let active = false;
    // TODO: 작업예정
    return active;
  },
});

export const gridSelectedBlockImage = selector({
  key: 'bodyGridSelectedBlockImage',
  get: ({ get }) => {
    const stateGrid = get(grid);
    if (stateGrid.length <= 0) return false;
    let active = false;
    // TODO: 작업예정
    return active;
  },
});
