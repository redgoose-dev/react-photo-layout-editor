import React, { useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilValue, useRecoilState } from 'recoil';
import * as base from '~/store/base';
import api from '~/api';
import * as util from '~/libs/util';

/**
 * Component - Container
 */
const Container = forwardRef((props, ref) => {
  const [ upload, setUpload ] = useRecoilState(base.upload);
  useImperativeHandle(ref, () => ({
    // TODO: api 동작 프로세스
    // TODO: 외부에서 api 메서드를 호출한다. `_ref.current.api(address, value);`
    // TODO: `address`값으로
    base()
    {
      console.log('call base()');
      // setUpload({
      //   ...upload,
      //   url: 'fooo',
      // });
    },
    body()
    {
      console.log('call body()');
    },
    panel()
    {
      console.log('call panel()');
    },
    run()
    {
      //
    },
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
