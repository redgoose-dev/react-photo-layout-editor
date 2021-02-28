import React from 'react';
import { RecoilRoot } from 'recoil';
import API from '~/api';
import * as util from '~/libs/util';

class PhotoLayoutEditor extends React.Component {

  constructor(props)
  {
    super(props);
    // set api
    this.api = new API();
    console.log(props);
    // TODO: props값을 확인하여 recoil 업데이트
  }

  render ()
  {
    return (
      <RecoilRoot>
        <article className="ple">
          <div className="ple__wrap">
            <p>photo-layout-editor component</p>
            <p>qqqqqqq</p>
          </div>
        </article>
      </RecoilRoot>
    );
  }

}

PhotoLayoutEditor.displayName = 'PhotoLayoutEditor';

export default PhotoLayoutEditor;
