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
  const [ files, setFiles ] = useState([
    {
      image: 'https://goose.redgoose.me/data/upload/original/202103/hud-tadpole-001.jpg',
      active: false,
    },
    {
      image: 'https://goose.redgoose.me/data/upload/original/202010/project-002-001.jpg',
      active: false,
    },
    {
      image: 'https://goose.redgoose.me/data/upload/original/202003/double-generator-001.jpg',
      active: false,
    },
    {
      image: 'https://goose.redgoose.me/data/upload/original/201912/vortex.jpg',
      active: false,
    },
    {
      image: 'https://goose.redgoose.me/data/upload/original/201909/2019-09-17-001.jpg',
      active: false,
    },
  ]);
  const [ preference, setPreference ] = useState({
    width: 200,
    height: 300,
  });
  const [ openPanel, setOpenPanel ] = useState(true);

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
                setOpenPanel(value);
                break;
              case 'addFiles':
                console.log('add files');
                break;
            }
          },
        }}/>
    </>
  );
}

render(<App/>, document.getElementById('root'));
