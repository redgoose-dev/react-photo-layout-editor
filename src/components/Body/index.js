import React, { useEffect } from 'react';
import Toolbar from '~/components/Toolbar';

const Body = () => {
  return (
    <div className="ple-body">
      <Toolbar/>
      <p>.body</p>
    </div>
  );
};
Body.displayName = 'Body';


export default Body;
