import React from 'react';
import { useRecoilState } from 'recoil';
import Navigation from './Navigation';
import Files from './Files';
import * as panel from '~/store/panel';
import * as api from '~/api';

const Panel = () => {
  const storeFiles = useRecoilState(panel.files);
  return (
    <div
      className="ple-panel"
      onClick={() => api.files.select(storeFiles)}>
      <div className="ple-panel__wrap">
        <Navigation/>
        <div className="ple-panel__files">
          <Files/>
        </div>
      </div>
    </div>
  );
};
Panel.displayName = 'Panel';

export default Panel;
