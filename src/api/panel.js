import * as callbacks from '~/libs/callbacks';

/**
 * control visible panel
 *
 * @param {*} store `panel.open`
 * @param {Boolean} sw
 */
export function visible(store, sw)
{
  if (!store) return;
  const [ open, setOpen ] = store;
  let newOpen = (sw === undefined) ? !open : sw;
  if (callbacks.isKey('update'))
  {
    callbacks.run('update', {
      type: 'togglePanel',
      value: newOpen,
    });
  }
  else
  {
    setOpen(newOpen);
  }
}
