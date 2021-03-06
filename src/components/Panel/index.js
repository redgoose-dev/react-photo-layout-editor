import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Navigation from './Navigation';
import Files from './Files';

const Panel = () => {
  return (
    <div className="ple-panel">
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
