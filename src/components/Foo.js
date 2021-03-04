import React, {} from 'react';
import { useRecoilState } from 'recoil';
import * as panel from '~/store/panel';
import * as callbacks from "~/libs/callbacks";

const Foo = () => {
  const [ files, setFiles ] = useRecoilState(panel.files);
  return (
    <nav>
      <button
        type="button"
        onClick={() => {
          callbacks.run('update', {
            type: 'grid',
            value: [ 7, 8, 9 ],
          });
        }}>
        update grid
      </button>
      <button
        type="button"
        onClick={() => {
          callbacks.run('update', {
            type: 'files',
            value: [ 'a', 'b', 'm' ],
          });
        }}>
        update files
      </button>
      <button
        type="button"
        onClick={() => {
          callbacks.run('update', { type: 'togglePanel' });
        }}>
        toggle panel
      </button>
    </nav>
  );
}

export default Foo;
