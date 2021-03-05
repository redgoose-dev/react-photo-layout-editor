import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { RecoilRoot, useRecoilState } from 'recoil';
import * as callbacks from '~/libs/callbacks';
import * as body from '~/store/body';
import * as panel from '~/store/panel';
import Body from '~/components/Body';
import Panel from '~/components/Panel';

import Foo from './Foo';

/**
 * Component - Container
 */
const Container = forwardRef((props, ref) => {
  const [ ready, setReady ] = useState(false);
  const [ grid, setGrid ] = useRecoilState(body.grid);
  const [ files, setFiles ] = useRecoilState(panel.files);
  const [ preference, setPreference ] = useRecoilState(body.preference);
  const [ openPanel, setOpenPanel ] = useRecoilState(panel.open);
  const [ upload, setUpload ] = useRecoilState(panel.upload);

  // update data props
  useEffect(() => {
    if (props.grid !== grid) setGrid(props.grid);
    if (props.files !== files) setFiles(props.files);
    if (props.preference !== preference) setPreference({ ...preference, ...props.preference });
    if (props.openPanel !== openPanel) setOpenPanel(props.openPanel);
    if (props.upload !== upload) setUpload(props.upload);
  }, [
    props.grid,
    props.files,
    props.preference,
    props.openPanel,
    props.upload,
  ]);
  // mounted
  useEffect(() => {
    callbacks.init(props.callbacks);
    setReady(true);
    callbacks.run('init');
  }, []);

  // public methods
  useImperativeHandle(ref, () => ({
    // TODO: api 동작 프로세스
    // TODO: 외부에서 api 메서드를 호출한다. `_ref.current.api(address, value);`
    // TODO: 컴포넌트 메서드로 컨트롤을 한다고 하더라도 부모 컴포넌트에서 모든 값들을 컨트롤 할것이다. ex) callbacks.run('update', { type: 'togglePanel' })
    base()
    {
      console.log('call base()');
    },
  }));

  return ready && (
    <article className="ple">
      <div className="ple__body">
        <Body/>
      </div>
      <aside
        className={[
          'ple__side',
          openPanel && 'ple__side--on',
        ].filter(Boolean).join(' ')}>
        <Panel/>
      </aside>
    </article>
  );
});
Container.propTypes = {
  // grid data items
  grid: PropTypes.array,
  // upload files
  files: PropTypes.array,
  // preference
  preference: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    column: PropTypes.number,
    outerMargin: PropTypes.number,
    innerMargin: PropTypes.number,
    freeMode: PropTypes.bool,
    backgroundColor: PropTypes.string,
    blockColor: PropTypes.string,
  }),
  // open side panel
  openPanel: PropTypes.bool,
  // file upload. 이 항목의 값이 없다면 브라우저 내부에 임시로 저장된다.
  upload: PropTypes.shape({
    // upload script url
    url: PropTypes.string.isRequired,
    // formData 객체에서 업로드 파일항목 파라메터 이름
    formKey: PropTypes.string,
    // TODO: 아마 나중에는 헤더에 관련된 옵션도 필요할 것이다.
  }),
  // callback functions
  callbacks: PropTypes.shape({
    /**
     * init
     * 컴포넌트 초기화가 끝냈을때 호출
     */
    init: PropTypes.func,
    /**
     * uploadConvert
     * 업로드할때 파라메터를 덧붙이고 싶을때 사용하는 함수 (업로드 직전에 실행되어 파라메터를 교체할 수 있다.)
     */
    uploadConvert: PropTypes.func,
    /**
     * update (type, value)
     * 데이터가 변경되었을때 호출되는 콜백함수
     * @param String type `grid,files,preference,openPanel,upload`
     * @param any value
     */
    update: PropTypes.func,
    // TODO: 추후에 항목을 하나씩 추가할 예정이다.
  }),
};
Container.defaultProps = {
  grid: [],
  files: [],
  preference: {
    width: 100,
    height: 100,
    column: 5,
    outerMargin: 10,
    innerMargin: 10,
    freeMode: false,
    backgroundColor: 'rgba(255,255,255,1)',
    blockColor: 'rgba(211,211,211,1)',
  },
  openPanel: true,
  upload: null,
  callbacks: {},
};

/**
 * Component - PhotoLayoutEditor
 */
const PhotoLayoutEditor = forwardRef((props, ref) => (
  <RecoilRoot>
    <Container {...props} ref={ref}/>
  </RecoilRoot>
));
PhotoLayoutEditor.displayName = 'PhotoLayoutEditor';
export default PhotoLayoutEditor;
