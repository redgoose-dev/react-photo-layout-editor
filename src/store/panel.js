import { atom, selector } from 'recoil';

export const open = atom({
  key: 'panelOpen',
  default: true,
});

export const files = atom({
  key: 'panelFiles',
  default: [],
});

export const filesExist = selector({
  key: 'panelFilesExist',
  get: ({ get }) => {
    const stateFiles = get(files);
    return stateFiles.length > 0;
  },
});

export const filesActiveExist = selector({
  key: 'panelFilesActiveExist',
  get: ({ get }) => {
    const stateFiles = get(files);
    if (stateFiles.length <= 0) return false;
    let active = false;
    stateFiles.forEach(o => {
      if (o.active) active = true;
    });
    return active;
  },
});
