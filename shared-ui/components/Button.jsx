import React from 'react';
import '../styles/tokens.css';

export const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const baseStyle = "btn-primary"; // Expand on this with classes or CSS modules later
  return (
    <button className={`${baseStyle} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
