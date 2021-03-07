import * as callbacks from '~/libs/callbacks';
import * as keyboard from '~/libs/keyboard';

// TODO: 아이템이 추가되거나 삭제되면 이 값을 초기화 하기
let selectedFileKeys = [];

/**
 * select files
 *
 * @param {*} store
 * @param {Number} selectKey
 */
export function selectFiles(store, selectKey)
{
  if (!store) return;
  const [ files, setFiles ] = store;
  let newFiles;

  if (selectKey === undefined)
  {
    selectedFileKeys = [];
    newFiles = files.map(o => ({ ...o, active: false }));
  }
  else
  {
    switch (keyboard.getActiveKeyName())
    {
      case 'meta':
      case 'ctrl':
      case 'control':
      case 'alt':
        newFiles = files.map((o, k) => {
          if (k === selectKey && o.active)
          {
            let idx = selectedFileKeys.indexOf(selectKey);
            if (idx > -1) selectedFileKeys.splice(idx, 1);
          }
          else if (k === selectKey)
          {
            selectedFileKeys.push(k);
          }
          return {
            ...o,
            active: k === selectKey ? !o.active : o.active,
          };
        });
        break;
      case 'shift':
        let start = selectedFileKeys[selectedFileKeys.length-1];
        start = start === undefined ? 0 : start;
        let range = [ Math.min(start, selectKey), Math.max(start, selectKey) ];
        newFiles = files.map((o, k) => ({
          ...o,
          active: range[0] <= k && range[1] >= k,
        }));
        selectedFileKeys = [ selectKey ];
        break;
      default:
        newFiles = files.map((o, k) => {
          selectedFileKeys = (k === selectKey && o.active) ? [] : [ selectKey ];
          return {
            ...o,
            active: k === selectKey ? !o.active : false,
          };
        });
        break;
    }
  }

  if (callbacks.isKey('update'))
  {
    callbacks.run('update', { type: 'files', value: newFiles });
  }
  else
  {
    setFiles(newFiles);
  }
}

/**
 * select all files
 *
 * @param {*} store
 */
export function selectAllFiles(store)
{
  if (!store) return;
  const [ files, setFiles ] = store;
  // TODO: 작업예정
}
