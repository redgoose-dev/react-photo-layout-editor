import React  from 'react';
import PropTypes from 'prop-types';
import './File.scss';

const File = props => {
  return (
    <span
      type="button"
      draggable={true}
      className={[
        'ple-file',
        props.active && 'ple-file--active',
        props.className && props.className,
      ].filter(Boolean).join(' ')}
      onClick={props.onClick}>
      <em
        className="ple-file__image"
        style={{
          backgroundImage: props.image ? `url('${props.image}')` : 'none',
        }}/>
    </span>
  );
};
File.displayName = 'File';
File.propTypes = {
  active: PropTypes.bool.isRequired,
  image: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default File;
