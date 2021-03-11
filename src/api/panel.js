import * as callbacks from '~/libs/callbacks';

/**
 * control visible panel
 *
 * @param {*} store `panel.open`
 */
export function visible(store)
{
  if (!store) return;
  const [ open, setOpen ] = store;
  if (callbacks.isKey('update'))
  {
    callbacks.run('update', { type: 'togglePanel' });
  }
  else
  {
    setOpen(!open);
  }
}
