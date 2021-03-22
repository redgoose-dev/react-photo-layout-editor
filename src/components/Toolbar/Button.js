import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, active, focus, className, onClick, children }) => {
  return (
    <button
      type="button"
      title={title}
      className={[
        'ple-button',
        active && 'ple-button--active',
        focus && 'ple-button--focus',
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
  active: PropTypes.bool,
  focus: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
