import React, { forwardRef, createRef, useRef, useImperativeHandle, useEffect } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilValue } from 'recoil';
import * as base from '~/store/base';
import API from '~/api';
import * as util from '~/libs/util';

/**
 * Component - PhotoLayoutEditor
 */
const PhotoLayoutEditor = forwardRef((props, ref) => {
  return (
    <RecoilRoot>
      <Container {...props} ref={ref}/>
    </RecoilRoot>
  );
});
PhotoLayoutEditor.displayName = 'PhotoLayoutEditor';
export default PhotoLayoutEditor;

/**
 * component - Container
 */
const Container = forwardRef((props, ref) => {
  const upload = useRecoilValue(base.upload);
  // useImperativeHandle(ref, () => _ref.current);
  useImperativeHandle(ref, () => ({
    foo()
    {
      console.log('Container - fooo');
    }
  }));
  return (
    <article className="ple">
      <div className="ple__wrap">
        <p>photo-layout-editor component</p>
        <p>url: {upload.url}</p>
      </div>
    </article>
  );
});

// set API
export const api = new API();

export const foo = () => {
  // const setUpload = useSetRecoilValue(base.upload);
  // setUpload('foooooooOOOOooo');
}
