import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ title, active, focus, className, onClick, children }) => {
  return (
    <button
      type="button"
      title={title}
      className={[
        'ple-toolbar-button',
        active && 'ple-toolbar-button--active',
        focus && 'ple-toolbar-button--focus',
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
