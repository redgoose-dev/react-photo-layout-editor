import React, { useEffect } from 'react';
import Toolbar from '~/components/Toolbar';
import './index.scoped.scss';

const Body = () => {
  return (
    <div className="body">
      <Toolbar/>
      <p>.body</p>
    </div>
  );
};
Body.displayName = 'Body';


export default Body;
