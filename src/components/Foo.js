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
          callbacks.run('updateGrid');
        }}>
        update grid
      </button>
      <button
        type="button"
        onClick={() => {
          setFiles([ 'a', 'b', 'm' ]);
        }}>
        update files
      </button>
    </nav>
  );
}

export default Foo;
