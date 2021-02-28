import * as React from 'react';
import { render } from 'react-dom';
import PhotoLayoutEditor from '~/components/PhotoLayoutEditor';
import './normalize.scss';
import '~/css/main.scss';

let _ple;

render(
  <PhotoLayoutEditor
    ref={r => { _ple = r }}
    base={{}}
    body={{}}
    panel={{}}
  />,
  document.getElementById('root')
);
