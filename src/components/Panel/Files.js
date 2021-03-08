import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import File from './File';
import * as panel from '~/store/panel';
import * as api from '~/api';

const Files = props => {
  const store = useRecoilState(panel.files);
  const [ files ] = store;

  const onClickFile = e => {
    e.stopPropagation();
  };

  return files?.length > 0 ? (
    <ul
      className={[
        'ple-files',
        props?.className && props.className,
      ].filter(Boolean).join(' ')}>
      {files.map((o, k) => (
        <li key={k} onClick={onClickFile}>
          <File
            active={o.active}
            image={o.image}
            onClick={() => api.files.select(store, k)}/>
        </li>
      ))}
    </ul>
  ) : (
    <div className="ple-files-empty">
      .empty
    </div>
  );
}
Files.displayName = 'Files';
Files.propTypes = {
  className: PropTypes.string,
};

export default Files;
