import React from 'react';

/**
 * iCanvass PDM Official Logo
 */
export const CrmLogo = ({ size = 36, className = '', style = {} }) => {
  return (
    <img
      src="/icanvass-logo.jpg"
      alt="iCanvass PDM"
      width={size}
      height={size}
      className={`rounded-2xl shadow-lg shadow-emerald-500/20 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        flexShrink: 0,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
    />
  );
};

export default CrmLogo;
