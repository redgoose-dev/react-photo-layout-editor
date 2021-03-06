import React, { useEffect } from 'react';

const File = props => {
  console.log(props)
  const onClick = () => {};

  return (
    <div
      type="button"
      draggable={true}
      style={{
        '--background-image': props.image ? `url('${props.image}')` : 'none',
      }}
      className={[
        'ple-file',
        props?.active && 'ple-file--active',
      ].filter(Boolean).join(' ')}
      onClick={onClick}>
      file item
    </div>
  );
};

export default File;
