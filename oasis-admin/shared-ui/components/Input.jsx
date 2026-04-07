import React from 'react';
import '../styles/tokens.css';

export const Input = ({ label, id, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      {label && <label htmlFor={id} style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>{label}</label>}
      <input
        id={id}
        {...props}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
          background: 'var(--glass-bg)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          boxShadow: 'var(--shadow-glass)'
        }}
      />
    </div>
  );
};
