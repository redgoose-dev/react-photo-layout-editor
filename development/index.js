import React, { useRef, useEffect, useState } from 'react';
import { render } from 'react-dom';
import PhotoLayoutEditor from '~/components/PhotoLayoutEditor';
import './normalize.scss';
import '~/css/main.scss';

function App()
{
  const _ref = useRef();
  const [ grid, setGrid ] = useState([1,2,3]);
  const [ files, setFiles ] = useState(['apple', 'banana', 'mango']);

  return (
    <PhotoLayoutEditor
      ref={_ref}
      grid={grid}
      files={files}
      preference={{
        width: 200,
        height: 300,
      }}
      callbacks={{
        init: () => {
          console.warn('PhotoLayoutEditor init()');
          setTimeout(() => setGrid([4,5,6]), 3000);
        },
        updateGrid: function() {
          setGrid([7,8,9]);
        },
      }}
    />
  );
}

render(<App/>, document.getElementById('root'));
