import React from 'react';
import '../styles/tokens.css';

export const GlassCard = ({ children, className = '', hoverReveal = false, ...props }) => {
  const baseClass = "glass-panel";
  const hoverClass = hoverReveal ? "hover-lift" : "";

  return (
    <div className={`${baseClass} ${hoverClass} ${className}`} style={{ padding: '1.5rem' }} {...props}>
      {children}
    </div>
  );
};
