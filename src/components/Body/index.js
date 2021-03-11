import React from 'react';
import { useRecoilValue } from 'recoil';
import Toolbar from '~/components/Toolbar';
import * as body from '~/store/body';

const Body = () => {
  const grid = useRecoilValue(body.grid);
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
        {JSON.stringify(grid, null, 2)}
      </pre>
    </div>
  );
};
Body.displayName = 'Body';

export default Body;
