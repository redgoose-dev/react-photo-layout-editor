const eventName = 'PLE_KEYBOARD';
const keyNames = {
  meta: 'meta',
  ctrl: 'ctrl',
  control: 'control',
  alt: 'alt',
  shift: 'shift',
};
let activeKeyNames = [];

/**
 * key down
 *
 * @param {KeyboardEvent} e
 */
function keyDown(e)
{
  if (!window) return;
  let key = keyNames[e.key.toLowerCase()];
  if (activeKeyNames.length > 0)
  {
    // 무언가가 하나 눌러진 상태에서 추가로 키를 눌렀을때
    if (key) activeKeyNames.push(key);
  }
  else
  {
    // 처음 키를 눌렀을때
    if (key) activeKeyNames = [key];
    window.on(`keyup.${eventName}`, keyUp);
    window.on(`contextmenu.${eventName}`, clear);
    window.on(`blur.${eventName}`, clear);
  }
}

/**
 * key up
 *
 * @param {KeyboardEvent} e
 */
function keyUp(e)
{
  if (!window) return;
  if (activeKeyNames.length === 0) return;
  let idx = activeKeyNames.indexOf(keyNames[e.key.toLowerCase()]);
  if (idx > -1)
  {
    activeKeyNames.splice(idx, 1);
  }
  if (activeKeyNames.length === 0)
  {
    window.off(`keyup.${eventName}`);
  }
}

/**
 * clear
 */
function clear()
{
  if (!window) return;
  activeKeyNames = [];
  window.off(`keyup.${eventName}`);
  window.off(`contextmenu.${eventName}`);
  window.off(`blur.${eventName}`);
}

/**
 * initial keyboard event
 */
export function initialEvent()
{
  if (!window) return;
  window.on(`keydown.${eventName}`, keyDown);
}

/**
 * get active key names
 *
 * @return {Array}
 */
export function getActiveKeyNames()
{
  return activeKeyNames;
}

/**
 * check active key name
 *
 * @param {String} key
 * @return {Boolean}
 */
export function checkActiveKeyName(key)
{
  return activeKeyNames.indexOf(key) > -1;
}

/**
 * get active key name
 *
 * @return {String}
 */
export function getActiveKeyName()
{
  return activeKeyNames.length > 0 ? activeKeyNames[0] : null;
}
