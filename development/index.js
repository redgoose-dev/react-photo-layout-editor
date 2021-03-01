import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import PhotoLayoutEditor, { api, foo } from '~/components/PhotoLayoutEditor';
import './normalize.scss';
import '~/css/main.scss';

function App()
{
  const _ref = useRef();
  useEffect(() => {
    _ref.current.foo();
  });
  return (
    <PhotoLayoutEditor
      ref={_ref}
      base={{}}
      body={{}}
      panel={{}}
    />
  );
}


render(
  <App/>,
  document.getElementById('root')
);

// setTimeout(function() {
//   // console.log(containerRef);
//   console.log(_ple)
// }, 500);

// console.log(_ple);
