import React from 'react';
import { useRecoilValue } from 'recoil';
import Toolbar from '~/components/Toolbar';
import * as panel from '~/store/panel';

const Body = () => {
  const files = useRecoilValue(panel.files);
  return (
    <div className="ple-body">
      <Toolbar/>
      {/*<p>.body</p>*/}
      <pre style={{
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap',
        padding: '30px',
        fontSize: '12px',
      }}>
        {JSON.stringify(files, null, 2)}
      </pre>
    </div>
  );
};
Body.displayName = 'Body';

export default Body;
