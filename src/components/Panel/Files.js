import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import File from './File';
import * as panel from '~/store/panel';

const Files = props => {
  const [ files, setFiles ] = useRecoilState(panel.files);
  return files?.length > 0 ? (
    <ul
      className={[
        'ple-files',
        props?.className && props.className,
      ].filter(Boolean).join(' ')}>
      {files.map((o, k) => (
        <li key={k}>
          <File {...o}/>
        </li>
      ))}
    </ul>
  ) : (
    <div className="ple-files-empty">
      .empty
    </div>
  );
}

export default Files;
