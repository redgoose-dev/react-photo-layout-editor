import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import './index.scoped.scss';

const Panel = () => {
  return (
    <div className="panel">
      <p>.panel</p>
      <p>space</p>
      <p>space</p>
      <p>space</p>
      <p>space</p>
      <p>space</p>
      <p>space</p>
      <p>space</p>
    </div>
  );
};
Panel.displayName = 'Panel';

export default Panel;
