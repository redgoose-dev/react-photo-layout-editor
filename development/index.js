import React, { useRef, useEffect, useState } from 'react';
import { render } from 'react-dom';
import PhotoLayoutEditor from '~/components/PhotoLayoutEditor';
import useToggle from '~/libs/useToggle';
import './normalize.scss';
import '~/css/main.scss';
import './index.scss';

function App()
{
  const _ref = useRef();
  const [ grid, setGrid ] = useState([1,2,3]);
  const [ files, setFiles ] = useState(['apple', 'banana', 'mango']);
  const [ preference, setPreference ] = useState({
    width: 200,
    height: 300,
  });
  const [ openPanel, setOpenPanel ] = useToggle(true);
  const [ upload, setUpload ] = useState(!!false ? {
    url: '',
    formKey: null,
  } : null);

  return (
    <>
      <PhotoLayoutEditor
        ref={_ref}
        grid={grid}
        files={files}
        preference={preference}
        openPanel={openPanel}
        upload={upload}
        callbacks={{
          init: () => {
            console.warn('PhotoLayoutEditor init()');
            setTimeout(() => setGrid([4,5,6]), 3000);
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
            }
          },
        }}/>
    </>
  );
}

render(<App/>, document.getElementById('root'));
