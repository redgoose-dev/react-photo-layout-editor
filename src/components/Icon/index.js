import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Icon = ({ name, className }) => {
  let icon;
  switch(name)
  {
    case 'arrow-left':
      icon = (
        <polyline points="15 18 9 12 15 6"/>
      );
      break;
    case 'plus':
      icon = (
        <>
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </>
      );
      break;
    case 'shuffle':
      icon = (
        <>
          <polyline points="16 3 21 3 21 8"/>
          <line x1="4" y1="20" x2="21" y2="3"/>
          <polyline points="21 16 21 21 16 21"/>
          <line x1="15" y1="15" x2="21" y2="21"/>
          <line x1="4" y1="4" x2="9" y2="9"/>
        </>
      );
      break;
    case 'setting':
      icon = (
        <>
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </>
      );
      break;
    case 'maximize':
      icon = (
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
      );
      break;
    case 'input':
      icon = (
        <g transform="translate(3,3)">
          <path d="M18,8.4 L18,15.6 C18,16.9254834 16.9254834,18 15.6,18 L2.4,18 C1.0745166,18 0,16.9254834 0,15.6 L0,2.4 C0,1.0745166 1.0745166,0 2.4,0 L9.6,0"/>
          <polyline transform="translate(10,8) rotate(-180) translate(-10,-8) " points="7 5 13 5 13 11"/>
          <line x1="17" y1="1" x2="7" y2="11"/>
        </g>
      );
      break;
    case 'upload':
      icon = (
        <>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </>
      );
      break;
    case 'trash':
      icon = (
        <>
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </>
      );
      break;
    case 'x':
      icon = (
        <>
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </>
      );
      break;
    case 'slash':
      icon = (
        <>
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </>
      );
      break;
    case 'pen':
      icon = (
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      );
      break;
    case 'copy':
      icon = (
        <>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </>
      );
      break;
    case 'droplet':
      icon = (
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      )
      break;
    default:
      icon = (
        <polyline points="20 6 9 17 4 12"/>
      );
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={[
        'ple-icon',
        className,
      ].filter(Boolean).join(' ')}>
      {icon}
    </svg>
  );
};
Icon.displayName = 'Icon';
Icon.propTypes = {
  name: PropTypes.string,
};

export default Icon;
