import React, { useRef, useEffect, useState } from 'react';
import { render } from 'react-dom';
import PhotoLayoutEditor from '~/components/PhotoLayoutEditor';
import useToggle from '~/libs/useToggle';
import * as util from './util';
import './normalize.scss';
import '~/css/main.scss';
import './index.scss';

function App()
{
  const _ref = useRef();
  const [ grid, setGrid ] = useState(util.pickGrid(3, 0));
  let [ files, setFiles ] = useState(util.pickFiles(10, 0));
  const [ preference, setPreference ] = useState({
    width: 100,
    height: 100,
  });
  const [ openPanel, setOpenPanel ] = useToggle(true);
  let filesLastKey = files.length;

  return (
    <>
      <PhotoLayoutEditor
        ref={_ref}
        grid={grid}
        files={files}
        preference={preference}
        openPanel={openPanel}
        callbacks={{
          init: () => {
            console.warn('PhotoLayoutEditor init()');
            // setTimeout(() => setFiles([4,5,6]), 3000);
          },
          update: ({ type, value }) => {
            switch (type)
            {
              case 'grid':
                setGrid(value);
                break;
              case 'files':
                setFiles(value);
                break;
              case 'preference':
                setPreference(value);
                break;
              case 'togglePanel':
                setOpenPanel();
                break;
              case 'addFiles':
                const step = 1;
                filesLastKey += step;
                let res = [
                  ...value,
                  ...util.pickFiles(step, filesLastKey),
                ];
                setFiles(res);
                break;
            }
          },
        }}/>
    </>
  );
}

render(<App/>, document.getElementById('root'));
