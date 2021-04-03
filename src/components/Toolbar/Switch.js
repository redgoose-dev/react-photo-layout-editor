import React from 'react';
import PropTypes from 'prop-types';
import './Switch.scss';

const Switch = ({ name, id, checked, onChange }) => (
  <label className="ple-switch">
    <input
      type="checkbox"
      name={name}
      id={id}
      checked={checked}
      onChange={e => onChange(!!e.target.checked)}/>
    <i/>
  </label>
);
Switch.displayName = 'Switch';
Switch.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

export default Switch;