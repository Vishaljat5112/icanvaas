import React from 'react';
import { cx } from '../../utils/classNames';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <span className={cx('badge', `badge-${variant}`, className)} {...props}>
      {Icon && <Icon size={12} className="shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
