import React from 'react';
import logoImage from './images/brooks_of_life_logo_1788251900987.jpg';

export const BROOKS_LOGO_SRC = logoImage;

export const BrooksLogo: React.FC<{ className?: string; alt?: string; size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom' }> = ({
  className = '',
  alt = 'Brooks of Life Schools of Ministry -UK- Crest',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    custom: ''
  };

  return (
    <img
      src={BROOKS_LOGO_SRC}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`object-contain rounded-md shadow-md ${sizeClasses[size]} ${className}`}
    />
  );
};

