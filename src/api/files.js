import * as callbacks from '~/libs/callbacks';
import * as keyboard from '~/libs/keyboard';

// TODO: 아이템이 추가되거나 삭제되면 이 값을 초기화 하기
let selectedFileKeys = [];

function updateFiles(store, files)
{
  const [ , setFiles ] = store;
  if (callbacks.isKey('update'))
  {
    callbacks.run('update', {
      type: 'files',
      value: files,
    });
  }
  else
  {
    setFiles(files);
  }
}

/**
 * select item
 *
 * @param {*} store `panel.files`
 * @param {Number} selectKey
 */
export function select(store, selectKey)
{
  if (!store) return;
  const [ files ] = store;
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
  // update
  updateFiles(store, newFiles);
}

/**
 * select all items
 *
 * @param {*} store `panel.files`
 */
export function selectAll(store)
{
  if (!store) return;
  const [ files ] = store;
  let selected = false;
  files.forEach(o => {
    if (o.active) selected = true;
  });
  let newFiles = files.map(o => ({
    ...o,
    active: !selected,
  }));
  // update
  updateFiles(store, newFiles);
}

/**
 * add item
 */
export function add()
{
  if (!callbacks.isKey('update')) return;
  callbacks.run('update', { type: 'addFiles' });
}

/**
 * remove items
 *
 * @param {*} store `panel.files`
 * @param {Array|Number} keys
 */
export function remove(store, keys)
{
  if (!store) return;
  keys = (typeof keys === 'number') ? [ keys ] : keys;
  if (keys.length <= 0) return;
  const [ files ] = store;
  let newFiles = files.map((o,k) => {
    return keys.indexOf(k) > -1 ? false : o;
  }).filter(Boolean);
  updateFiles(store, newFiles);
}
