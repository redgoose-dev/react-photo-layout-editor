import React, {} from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, onClick, className, children }) => {
  return (
    <button
      type="button"
      title={title}
      className={[
        'ple-button',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}>
      {children}
    </button>
  );
};
Button.displayName = 'Button';
Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
